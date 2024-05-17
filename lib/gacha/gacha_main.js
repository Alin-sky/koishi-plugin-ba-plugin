"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gacha_f = exports.inject = void 0;
const koishi_1 = require("koishi");
const FMPS_F_1 = require("../FMPS/FMPS_F");
const FMPS_1 = require("../FMPS/FMPS");
const match_1 = require("../Snae_match/match");
exports.inject = { required: ['canvas', 'database'] };
//Alin’s ba-gacha-systems v3.1 2024-05-05
const log = "ba-plugin-gacha";
const logger = new koishi_1.Logger(log);
const random = new koishi_1.Random(() => Math.random());
const url1 = 'https://schale.gg/images/student/icon/';
const cosurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/gacha-img/';
async function gacha_f(ctx, config) {
    const root_json = await (0, FMPS_F_1.rootF)("bap-json");
    const root_img = await (0, FMPS_F_1.rootF)("bap-img");
    const fmp = new FMPS_1.FMPS(ctx);
    const mdid = config.qqconfig.markdown_setting.mdid;
    const mdkey1 = config.qqconfig.markdown_setting.mdp1;
    const mdkey2 = config.qqconfig.markdown_setting.mdp2;
    const drawm = config.drawconfig.modle ? "" : 'file://';
    var mdswitch = false;
    let backimg = "https://s21.ax1x.com/2024/03/14/pFg9ZSf.png";
    async function init_gacha() {
        try {
            const dbdata = await ctx.http.get("https://schale.gg/data/cn/students.json");
            let in_json_create_data = [[], []];
            in_json_create_data[0].push(...gacha_json[0]);
            for (let i = 0; i < dbdata.length; i++) {
                in_json_create_data[1].push({
                    "id": dbdata[i].Id,
                    //"PersonalNam": dbdata[i].PersonalNam,
                    "IsReleased": dbdata[i].IsReleased,
                    "StarGrade": dbdata[i].StarGrade,
                    "IsLimited": dbdata[i].IsLimited,
                });
            }
            console.log(in_json_create_data);
            const j = await fmp.json_create(root_json, 'gacha_data.json', (in_json_create_data));
            gacha_json = await fmp.json_parse(j);
            logger.info("本地抽卡数据更新完毕");
        }
        catch (e) {
            logger.info("出错惹呜呜" + e);
            return;
        }
    }
    let gacha_json;
    try {
        //还要写一个选择不同资源服务的，等fmps完善了再写
        const i = await fmp.file_download(('https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json/gacha_data.json'), root_json, "gacha_data.json");
        gacha_json = await fmp.json_parse(root_json + "/gacha_data.json");
        ctx.setInterval(async () => gacha_json = await fmp.json_parse(root_json + "/gacha_data.json"), 3 * 60 * 60 * 1000);
    }
    catch (e) {
        logger.info("出现错误" + e + "正在尝试本地更新抽卡数据");
        await init_gacha();
    }
    const pick = gacha_json[0];
    //init_gacha()
    ctx.model.extend('bap_db', {
        id: 'string',
        serverid: 'integer',
        gacha_data_cn: 'list',
        gacha_data_in: 'list',
        gacha_data_jp: 'list',
    });
    const sms_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
    const all_pick_id = (() => {
        const nowTime = new Date();
        const cnp = nowTime < new Date(pick[0].pick_cn_time[1]) && nowTime > new Date(pick[0].pick_cn_time[0]) ? pick[0].now_pick_cn : [];
        const inp = nowTime < new Date(pick[0].pick_in_time[1]) && nowTime > new Date(pick[0].pick_in_time[0]) ? pick[0].now_pick_in : [];
        const jpp = nowTime < new Date(pick[0].pick_jp_time[1]) && nowTime > new Date(pick[0].pick_jp_time[0]) ? pick[0].now_pick_jp : [];
        return [cnp, inp, jpp];
    })();
    const all_pick_name = (() => {
        const cnp = all_pick_id[0].map(i => id_to_name(i));
        const inp = all_pick_id[1].map(i => id_to_name(i));
        const jpp = all_pick_id[2].map(i => id_to_name(i));
        return [cnp, inp, jpp];
    })();
    function id_to_name(id) {
        const name = sms_data.filter(i => i.Id_db == id);
        return name[0].MapName;
    }
    function name_to_id(name) {
        if (name.length == 0) {
            return;
        }
        const id = sms_data.filter(i => i.MapName == name);
        return id[0].Id_db;
    }
    function stu_server_jud(stuid) {
        const cns = gacha_json[1].filter(i => i.id == stuid)[0].IsReleased[2];
        const ins = gacha_json[1].filter(i => i.id == stuid)[0].IsReleased[1];
        const jps = gacha_json[1].filter(i => i.id == stuid)[0].IsReleased[0];
        let servid;
        if (jps) {
            servid = 0;
        }
        if (ins) {
            servid = 1;
        }
        if (cns) {
            servid = 2;
        }
        return servid;
    }
    function stu_sta_jud(stuid) {
        const star = gacha_json[1].filter(i => i.id == stuid)[0].StarGrade;
        if (star != 3) {
            return false;
        }
        else {
            return true;
        }
    }
    function cal_muzhu(gacha) {
        let muzhu = 0;
        for (let i = 0; i < gacha[1].length; i++) {
            switch (gacha[1][i]) {
                case 1:
                    muzhu++;
                    break;
                case 2:
                    muzhu += 10;
                    break;
                case 3:
                    muzhu += 50;
                    break;
                case "pick":
                    muzhu += 50;
                    break;
            }
        }
        return muzhu;
    }
    function serverid_to_text(serid) {
        let text;
        switch (serid) {
            case 0:
                text = "日服";
                break;
            case 1:
                text = "国际服";
                break;
            case 2:
                text = "国服";
                break;
        }
        return text;
    }
    async function gacha_push(uid, serid, gacha) {
        let user_data;
        try {
            user_data = await ctx.database.get("bap_db", uid);
        }
        catch (e) {
            logger.info(e);
        }
        if (user_data.length == 0) {
            if (serid == 0) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_jp: gacha[0]
                    }
                ]);
            }
            else if (serid == 1) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_in: gacha[0]
                    }
                ]);
            }
            else if (serid == 2) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_jp: gacha[0]
                    }
                ]);
            }
            return gacha[0].length;
        }
        else {
            if (user_data[0].gacha_data_jp.lenght > 1000) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_jp: []
                    }
                ]);
                return 0;
            }
            else if (user_data[0].gacha_data_in.lenght > 1000) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_in: []
                    }
                ]);
                return 0;
            }
            else if (user_data[0].gacha_data_cn.lenght > 1000) {
                await ctx.database.upsert("bap_db", [
                    {
                        id: uid,
                        serverid: serid,
                        gacha_data_jp: []
                    }
                ]);
                return 0;
            }
        }
        let new_data;
        switch (serid) {
            case 0:
                new_data = [...user_data[0].gacha_data_jp, ...gacha[0].map(i => { return i.toString(); })];
                break;
            case 1:
                new_data = [...user_data[0].gacha_data_in, ...gacha[0].map(i => { return i.toString(); })];
                break;
            case 2:
                new_data = [...user_data[0].gacha_data_cn, ...gacha[0].map(i => { return i.toString(); })];
                break;
        }
        if (serid == 0) {
            await ctx.database.upsert("bap_db", [
                {
                    id: uid,
                    serverid: serid,
                    gacha_data_jp: new_data
                }
            ]);
        }
        else if (serid == 1) {
            await ctx.database.upsert("bap_db", [
                {
                    id: uid,
                    serverid: serid,
                    gacha_data_in: new_data
                }
            ]);
        }
        else if (serid == 2) {
            await ctx.database.upsert("bap_db", [
                {
                    id: uid,
                    serverid: serid,
                    gacha_data_cn: new_data
                }
            ]);
        }
        return new_data.length;
    }
    /**
     * @param serid 0日 1国际 2国 3日井 4国际井 5国服井
     */
    function markdown_gacha_sub(session, serid, muzhushi, stuname) {
        let stunames = '';
        let mdtext = '';
        if (stuname == 'Not matched' || !stuname || stuname == 'Not 3star' || stuname == 'Not Released') {
            stuname == 'Not matched' ? mdtext = '呜呜呜，未匹配到学生，' : '';
            stuname == 'Not 3star' ? mdtext = '暂不支持up非三星角色，' : '';
            stuname == 'Not Released' ? mdtext = '呜呜，该学生未实装，' : '';
            stunames = '';
        }
        else {
            stunames = stuname;
        }
        let pools = ['', ''];
        switch (serid) {
            case 0:
                pools[0] = "日服";
                pools[1] = '十连';
                break;
            case 1:
                pools[0] = "国际服";
                pools[1] = '十连';
                break;
            case 2:
                pools[0] = "国服";
                pools[1] = '十连';
                break;
            case 3:
                pools[0] = "日服";
                pools[1] = '一井';
                break;
            case 4:
                pools[0] = "国际服";
                pools[1] = '一井';
                break;
            case 5:
                pools[0] = "国服";
                pools[1] = '一井';
                break;
        }
        return {
            msg_type: 2,
            msg_id: session.messageId,
            markdown: {
                custom_template_id: mdid,
                params: [
                    {
                        key: mdkey1,
                        values: [`${mdtext}正在抽${pools[1]}${pools[0]}的${stunames == '' ? '常驻' : stunames}池子，请稍等哦`],
                    },
                    {
                        key: mdkey2,
                        values: ["💎总共获得神明精髓：" + muzhushi + "个"],
                    },
                ]
            },
            keyboard: {
                content: {
                    rows: [
                        {
                            buttons: [
                                {
                                    render_data: { label: "再抽一次", style: 2 },
                                    action: {
                                        type: 2,
                                        permission: { type: 2 },
                                        data: `/${pools[0]}${pools[1]} ${stunames}`,
                                        enter: true,
                                    },
                                },
                                {
                                    render_data: { label: "查看菜单", style: 2 },
                                    action: {
                                        type: 2,
                                        permission: { type: 2 },
                                        data: `/抽卡`,
                                        enter: true,
                                    },
                                },
                            ]
                        },
                    ],
                },
            },
        };
    }
    function markdown_gacha_main(session) {
        const list1_cn = (() => {
            const a = all_pick_name[0].length;
            let button = [];
            for (let i = 0; i < a; i++) {
                button.push({
                    render_data: { label: `国服:${all_pick_name[0][i]}`, style: 0 },
                    action: {
                        type: 2,
                        permission: { type: 2 },
                        data: `/国服十连 ${all_pick_name[0][i]}`,
                        enter: false,
                    },
                });
            }
            return button;
        })();
        const list1_in = (() => {
            const a = all_pick_name[1].length;
            let button = [];
            for (let i = 0; i < a; i++) {
                button.push({
                    render_data: { label: `国际服:${all_pick_name[1][i]}`, style: 0 },
                    action: {
                        type: 2,
                        permission: { type: 2 },
                        data: `/国际服十连 ${all_pick_name[1][i]}`,
                        enter: false,
                    },
                });
            }
            return button;
        })();
        const list1_jp = (() => {
            const a = all_pick_name[2].length;
            let button = [];
            let list = {};
            for (let i = 0; i < a; i++) {
                button.push({
                    render_data: { label: `日服:${all_pick_name[2][i]}`, style: 0 },
                    action: {
                        type: 2,
                        permission: { type: 2 },
                        data: `/日服十连 ${all_pick_name[2][i]}`,
                        enter: false,
                    },
                });
            }
            return button;
        })();
        return {
            msg_type: 2,
            msg_id: session.messageId,
            markdown: {
                custom_template_id: mdid,
                params: [
                    {
                        key: mdkey1,
                        values: ["🟢手动@机器人并发送:/卡池选项+空格+up角色"],
                    },
                    {
                        key: mdkey2,
                        values: ["当前卡池："],
                    },
                ]
            },
            keyboard: {
                content: {
                    rows: [
                        {
                            buttons: list1_cn
                        },
                        {
                            buttons: list1_in
                        },
                        {
                            buttons: list1_jp
                        },
                        {
                            buttons: [
                                {
                                    render_data: { label: "日服一井", style: 2 },
                                    action: {
                                        type: 2,
                                        permission: { type: 2 },
                                        data: `/日服一井`,
                                        enter: false,
                                    },
                                },
                                {
                                    render_data: { label: "国际服一井", style: 2 },
                                    action: {
                                        type: 2,
                                        permission: { type: 2 },
                                        data: `/国际服一井`,
                                        enter: false,
                                    },
                                },
                                {
                                    render_data: { label: "国服一井", style: 2 },
                                    action: {
                                        type: 2,
                                        permission: { type: 2 },
                                        data: `/国服一井`,
                                        enter: false,
                                    },
                                },
                            ]
                        },
                    ],
                },
            },
        };
    }
    var mdswitch = false;
    if (mdid && mdkey1 && mdkey2) {
        logger.info('🟢 抽卡已启用MD消息模板');
        mdswitch = true;
    }
    else {
        logger.info("⚠️ md相关设置未完善,未启用MD模板");
        mdswitch = false;
    }
    /**
    * 渲染器，规范传入stu_gacha
    * @param stu_gacha 抽卡结果
    */
    async function creat_img(stu_gacha, print, serverid) {
        const image = await ctx.canvas.loadImage(`${drawm}${root_img}/background.png`);
        const canvas = await ctx.canvas.createCanvas(2048, 1200);
        const back = [
            await ctx.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/2sta.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/3sta.png`),
        ];
        const ctximg = canvas.getContext('2d');
        ctximg.drawImage(image, 0, 0);
        let x = 100;
        let y = 100;
        let move = 106;
        let z = 42;
        const printimg = await ctx.canvas.loadImage(`${drawm}${root_img}/print_${serverid}.png`);
        for (let i = 0; i < 10; i++) {
            const image = await ctx.canvas.loadImage(`${drawm}${root_img}/${stu_gacha[0][i]}_g.png`);
            const pick = await ctx.canvas.loadImage(`${drawm}${root_img}/pickup.png`);
            ctximg.save();
            if (stu_gacha[1][i] == 'pick') {
                ctximg.drawImage(back[3], x, y + 5, 400, 520);
            }
            else {
                ctximg.drawImage(back[stu_gacha[1][i]], x, y + 5, 400, 520);
            }
            ctximg.beginPath();
            ctximg.moveTo(x + move, y + move + 8);
            ctximg.lineTo((x + move) + 243, y + move + 8); // 上边          
            ctximg.lineTo((x + move) + 243 - z, (y + move) + 240); // 右边          
            ctximg.lineTo(x + move - z, (y + move) + 242); // 下边            
            ctximg.lineTo(x + move, y + move + 10); // 左边
            ctximg.closePath();
            ctximg.clip();
            ctximg.drawImage(image, x + move - 40, y + move, 280, 260);
            ctximg.restore();
            if (stu_gacha[1][i] == 'pick') {
                ctximg.drawImage(pick, x + 50, y + 90);
            }
            x += 340;
            if (i == 4) {
                y += 400;
                x = 100;
            }
        }
        ctximg.font = `bold 50px Arial`;
        ctximg.fillStyle = '#FFFFFF';
        ctximg.drawImage(printimg, 1450, 980);
        ctximg.fillText(print, 1650, 1090);
        const buffers = canvas.toDataURL('image/png');
        return buffers;
    }
    async function draw_200_img(stu_gacha) {
        const pick = await ctx.canvas.loadImage(`${drawm}${root_img}/pickup.png`);
        const image = await ctx.canvas.loadImage(`${drawm}${root_img}/background.png`);
        const canvas = await ctx.canvas.createCanvas(2048, 1200);
        const back = [
            await ctx.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/2sta_1.png`),
            await ctx.canvas.loadImage(`${drawm}${root_img}/3sta_1.png`),
        ];
        const c = canvas.getContext('2d');
        c.drawImage(image, 0, 0);
        const ids = stu_gacha[0];
        const levels = stu_gacha[1];
        const intermediateResult = ids.reduce((acc, id, index) => {
            if (!acc[id]) {
                acc[id] = { stuid: id, rep: 0, star: 0 };
            }
            acc[id].rep += 1;
            acc[id].star = levels[index];
            return acc;
        }, {});
        const final_stu_json = Object.values(intermediateResult);
        async function draw_char(id, star, x, y) {
            let m = 0.45;
            let move = 109;
            let z = 42;
            const stu_img = await ctx.canvas.loadImage(`${drawm}${root_img}/${id}_g.png`);
            c.save();
            if (star == 4) {
                c.drawImage(back[3], x * m, y * m + 5, 400 * m, 520 * m);
            }
            else {
                c.drawImage(back[star], x * m, y * m + 5, 400 * m, 520 * m);
            }
            c.beginPath();
            c.moveTo((x + move) * m, (y + move + 15) * m);
            c.lineTo(((x + move) + 236) * m, (y + move + 15) * m); // 上边          
            c.lineTo(((x + move) + 236 - z) * m, ((y + move) + 250) * m); // 右边          
            c.lineTo((x + move - z) * m, ((y + move) + 250) * m); // 下边            
            c.lineTo((x + move) * m, (y + move + 15) * m); // 左边
            //c.stroke()//路径
            c.closePath();
            c.clip();
            c.drawImage(stu_img, (x + move - 40) * m, (y + move) * m, 280 * m, 260 * m);
            c.restore();
        }
        c.font = `bold 40px Arial`;
        c.fillStyle = '#000000';
        let x_move = 130, y_move = 183, y3 = 0, y2 = 670, y1 = 0, x3p = 50, x2p = 50, x1p = 50;
        let l1 = 0, l2 = 0, l3 = 0;
        for (let i = 0; i < final_stu_json.length; i++) {
            if (final_stu_json[i].star == 3) {
                l1++;
            }
            if (l1 <= 11) {
                y2 = 430;
                y1 = 1240;
            }
            else {
                y2 = 800;
                y1 = 1620;
            }
        }
        for (let i = 0; i < final_stu_json.length; i++) {
            switch (final_stu_json[i].star) {
                case 4: {
                    await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x3p, y3);
                    c.drawImage(pick, x3p * 0.45 + 20, (y3 * 0.45) + 41, 80, 28);
                    c.fillText("x" + (final_stu_json[i].rep).toString(), (x3p * 0.45) + x_move, y3 * 0.45 + y_move);
                    x3p += 400;
                    if (x3p > 4200) {
                        y3 += 400;
                        x3p = 50;
                    }
                    break;
                }
                case 3: {
                    await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x3p, y3);
                    c.fillText("x" + (final_stu_json[i].rep).toString(), (x3p * 0.45) + x_move, y3 * 0.45 + y_move);
                    x3p += 400;
                    if (x3p > 4200) {
                        y3 += 400;
                        x3p = 50;
                    }
                    break;
                }
                case 2: {
                    await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x2p, y2);
                    c.fillText("x" + (final_stu_json[i].rep).toString(), (x2p * 0.45) + x_move, (y2 * 0.45) + y_move);
                    x2p += 400;
                    if (x2p > 4200) {
                        y2 += 400;
                        x2p = 50;
                    }
                    break;
                }
                case 1: {
                    await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x1p, y1);
                    c.fillText("x" + (final_stu_json[i].rep).toString(), (x1p * 0.45) + x_move, (y1 * 0.45) + y_move);
                    x1p += 400;
                    if (x1p > 4200) {
                        y1 += 400;
                        x1p = 50;
                    }
                    break;
                }
            }
        }
        const buffers = canvas.toDataURL('image/png');
        return buffers;
    }
    /**
     * up十连
     * @param IsReleased 2国 1国际 0日
     * @param stu up角db-id
     */
    function gacha_10(IsReleased, stu) {
        const released_1 = ((gacha_json[1].filter(i => i.StarGrade == 1)).filter(a => a.IsLimited == 0)).filter(i => i.IsReleased[IsReleased]).map(i => i.id);
        const released_2 = ((gacha_json[1].filter(i => i.StarGrade == 2)).filter(a => a.IsLimited == 0)).filter(i => i.IsReleased[IsReleased]).map(i => i.id);
        const released_3 = ((gacha_json[1].filter(i => i.StarGrade == 3)).filter(a => a.IsLimited == 0)).filter(i => i.IsReleased[IsReleased]).map(i => i.id);
        let stu_10 = [];
        let stu_sta = [];
        let safeguards = 0; //保底数
        const pickp = stu ? 0.007 : 0;
        for (let i = 0; i < 10; i++) {
            const sta = random.weightedPick({
                "1": 0.785,
                "2": 0.185,
                "3": (0.03 - pickp),
                "pick": pickp
            });
            if (i == 9 && safeguards == 0) {
                stu_10.push(random.pick(released_2));
                stu_sta.push(2);
                break;
            }
            switch (sta) {
                case "1":
                    {
                        stu_10.push(random.pick(released_1));
                        stu_sta.push(1);
                    }
                    break;
                case "2":
                    {
                        stu_10.push(random.pick(released_2));
                        stu_sta.push(2);
                        safeguards++;
                    }
                    break;
                case "3":
                    {
                        stu_10.push(random.pick(released_3));
                        stu_sta.push(3);
                        safeguards++;
                    }
                    break;
                case "pick":
                    {
                        stu_10.push(stu);
                        stu_sta.push("pick");
                        safeguards++;
                    }
                    break;
            }
        }
        return [stu_10, stu_sta];
    }
    function gacha_200(IsReleased, stu) {
        let g_200 = [[], []];
        for (let i = 0; i < 20; i++) {
            const gacha = gacha_10(IsReleased, stu);
            g_200[0].push(...gacha[0]);
            g_200[1].push(...gacha[1].map(i => { i == "pick" ? i = 4 : i; return i; }));
        }
        return g_200;
    }
    ctx.command('ba抽卡 <message:text>', "ba十连和吃井模拟")
        .alias('抽卡')
        .alias("抽一井")
        .alias("井")
        .alias("gacha")
        .action(async ({ session }, message) => {
        function help_text(qq) {
            const i1 = qq ? '🟢手动@机器人并发送:/' : '🟢发送: ';
            const i2 = qq ? '@机器人 /' : '';
            return `
ba抽卡模拟器
使用方法：
${i1}卡池选项+空格+up角色"
卡池选项：
▫️国服一井  
▪️国服十连  
▫️国际服一井  
▪️国际服十连  
▫️日服一井  
▪️日服十连
缺省up角色将抽取常驻池
示例：
${i2}国服十连 爱丽丝
        `;
        }
        switch (message) {
            case '国服一井': {
                return session.execute('国服一井');
            }
            case '国服十连': {
                return session.execute('国服十连');
            }
            case '国际服一井': {
                return session.execute('国际服一井');
            }
            case '国际服十连': {
                return session.execute('国际服十连');
            }
            case '日服一井': {
                return session.execute('日服一井');
            }
            case '日服十连': {
                return session.execute('日服十连');
            }
        }
        const now_gacha = ['-日服：', ...all_pick_name[2], '-国际服：', ...all_pick_name[1], '-国服：', ...all_pick_name[0]].join('\n');
        if (session.event.platform == 'qq' && mdswitch) {
            const md = markdown_gacha_main(session);
            try {
                await session.qq.sendMessage(session.channelId, md);
            }
            catch (e) {
                logger.info('发送md时发生错误', e);
                return help_text(true) + "🆙目前up角色：\n" + now_gacha;
            }
        }
        else {
            return help_text(false) + "🆙目前up角色：\n" + now_gacha;
        }
    });
    //不想封装了，能跑就行
    ctx.command("ba抽卡/日服十连 <message:text>")
        .action(async ({ session }, message) => {
        const uid = session.event.user.id;
        if (!message) {
            const stu_gacha = gacha_10(0);
            const print = await gacha_push(uid, 0, stu_gacha);
            const img = await creat_img(stu_gacha, print, 0);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, 0, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽日服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_10(0);
                const print = await gacha_push(uid, 0, stu_gacha);
                const img = await creat_img(stu_gacha, print, 0);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 0, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽取日服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_10(0);
                const print = await gacha_push(uid, 0, stu_gacha);
                const img = await creat_img(stu_gacha, print, 0);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 0, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽取日服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const stu_gacha = gacha_10(0, id);
                const print = await gacha_push(uid, 0, stu_gacha);
                const img = await creat_img(stu_gacha, print, 0);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, 0, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                const sername = serverid_to_text(0);
                await session.send('正在抽取' + sername + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_10(0, id);
                const print = await gacha_push(uid, 0, stu_gacha);
                const img = await creat_img(stu_gacha, print, 0);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    ctx.command("ba抽卡/国际服十连 <message:text>")
        .action(async ({ session }, message) => {
        const uid = session.event.user.id;
        if (!message) {
            const stu_gacha = gacha_10(1);
            const print = await gacha_push(uid, 1, stu_gacha);
            const img = await creat_img(stu_gacha, print, 1);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, 1, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽取国际服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_10(1);
                const print = await gacha_push(uid, 1, stu_gacha);
                const img = await creat_img(stu_gacha, print, 1);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 1, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽取国际服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (stu_server_jud(id) < 1) {
                const stu_gacha = gacha_10(1);
                const print = await gacha_push(uid, 1, stu_gacha);
                const img = await creat_img(stu_gacha, print, 1);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 1, muzhu, 'Not Released');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜，该学生未实装，抽取国际服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_10(1);
                const print = await gacha_push(uid, 1, stu_gacha);
                const img = await creat_img(stu_gacha, print, 1);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 1, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽取国际服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const stu_gacha = gacha_10(1, id);
                const print = await gacha_push(uid, 1, stu_gacha);
                const img = await creat_img(stu_gacha, print, 1);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, 1, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                const id = name_to_id(student[1]);
                const sername = serverid_to_text(1);
                await session.send('正在抽取' + sername + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_10(1, id);
                const print = await gacha_push(uid, 1, stu_gacha);
                const img = await creat_img(stu_gacha, print, 1);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    ctx.command("ba抽卡/国服十连 <message:text>")
        .action(async ({ session }, message) => {
        const server_id = 2;
        const uid = session.event.user.id;
        if (!message) {
            const stu_gacha = gacha_10(server_id);
            const print = await gacha_push(uid, server_id, stu_gacha);
            const img = await creat_img(stu_gacha, print, server_id);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, server_id, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽取国服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_10(2);
                const print = await gacha_push(uid, 2, stu_gacha);
                const img = await creat_img(stu_gacha, print, 2);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 2, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽取国服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (stu_server_jud(id) < 2) {
                const stu_gacha = gacha_10(2);
                const print = await gacha_push(uid, 2, stu_gacha);
                const img = await creat_img(stu_gacha, print, 2);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, server_id, muzhu, 'Not Released');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜，该学生未实装，抽取国服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_10(server_id);
                const print = await gacha_push(uid, server_id, stu_gacha);
                const img = await creat_img(stu_gacha, print, server_id);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, server_id, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽取国服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const stu_gacha = gacha_10(server_id, id);
                const print = await gacha_push(uid, server_id, stu_gacha);
                const img = await creat_img(stu_gacha, print, server_id);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, server_id, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                const id = name_to_id(student[1]);
                const sername = serverid_to_text(server_id);
                await session.send('正在抽取' + sername + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_10(server_id, id);
                const print = await gacha_push(uid, server_id, stu_gacha);
                const img = await creat_img(stu_gacha, print, server_id);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    ctx.command('ba抽卡/日服一井 <message:text>')
        .action(async ({ session }, message) => {
        const server_ids = 0;
        if (!message) {
            const stu_gacha = gacha_200(server_ids);
            const img = await draw_200_img(stu_gacha);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, 3, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽一井日服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 3, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽一井日服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 3, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽一井日服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, 3, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                await session.send('正在抽一井日服' + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    ctx.command('ba抽卡/国际服一井 <message:text>')
        .action(async ({ session }, message) => {
        const server_ids = 1;
        if (!message) {
            const stu_gacha = gacha_200(server_ids);
            const img = await draw_200_img(stu_gacha);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, 4, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽一井国际服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 4, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽一井国际服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (stu_server_jud(id) < server_ids) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 4, muzhu, 'Not Released');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜，该学生未实装，抽取国际服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 4, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽一井国际服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const id = name_to_id(student[1]);
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, 4, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                const id = name_to_id(student[1]);
                await session.send('正在抽一井国际服' + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    ctx.command('ba抽卡/国服一井 <message:text>')
        .action(async ({ session }, message) => {
        const server_ids = 2;
        if (!message) {
            const stu_gacha = gacha_200(server_ids);
            const img = await draw_200_img(stu_gacha);
            const muzhu = cal_muzhu(stu_gacha);
            if (session.event.platform == 'qq' && mdswitch) {
                const md = markdown_gacha_sub(session, 5, muzhu);
                await session.qq.sendMessage(session.channelId, md);
            }
            else {
                await session.send('正在抽一井国服常驻池子，请老师稍等哦');
                await session.send("总共获得神明精髓：" + muzhu + "个");
            }
            return koishi_1.h.image(img);
        }
        else {
            const student = await (0, match_1.StudentMatch)(message);
            console.log(student);
            if (student[0] != "Student" || student.length == 0) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 5, muzhu, 'Not matched');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，未匹配到学生，正在抽一井国服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            const id = name_to_id(student[1]);
            if (stu_server_jud(id) < server_ids) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 5, muzhu, 'Not Released');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜，该学生未实装，抽取一井国服常驻池子，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (!stu_sta_jud(id)) {
                const stu_gacha = gacha_200(server_ids);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                if (session.event.platform == 'qq' && mdswitch) {
                    const md = markdown_gacha_sub(session, 5, muzhu, 'Not 3star');
                    await session.qq.sendMessage(session.channelId, md);
                }
                else {
                    await session.send('呜呜呜，暂不支持up非三星角色，抽一井国服常驻池子中，请老师稍等哦');
                    await session.send("总共获得神明精髓：" + muzhu + "个");
                }
                return koishi_1.h.image(img);
            }
            if (session.event.platform == 'qq' && mdswitch) {
                const id = name_to_id(student[1]);
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                const md = markdown_gacha_sub(session, 5, muzhu, student[1]);
                await session.qq.sendMessage(session.channelId, md);
                return koishi_1.h.image(img);
            }
            else {
                const id = name_to_id(student[1]);
                await session.send('正在抽一井国服' + student[1] + '池子，请老师稍等哦');
                const stu_gacha = gacha_200(server_ids, id);
                const img = await draw_200_img(stu_gacha);
                const muzhu = cal_muzhu(stu_gacha);
                session.send("总共获得神明精髓：" + muzhu + "个");
                return koishi_1.h.image(img);
            }
        }
    });
    logger.info('🟢 抽卡模拟器加载完毕');
    //Alin’s ba random—manga v2 20244-04-05
    let manga_jsondata = await fmp.json_parse(`${root_json}/manga_main.json`);
    ctx.setInterval(async () => manga_jsondata = await fmp.json_parse(`${root_json}/manga_main.json`), 3 * 60 * 60 * 1000);
    if (!manga_jsondata) {
        logger.info('数据读取出错');
        return;
    }
    ctx.command('抽漫画', '随机抽取ba官方漫画')
        .action(async () => {
        try {
            const ii = random.int(0, manga_jsondata.length);
            console.log(ii);
            return koishi_1.h.image(manga_jsondata[ii].wikiurl);
        }
        catch (e) {
            logger.info(e);
            return '呜呜呜，出错了';
        }
    });
    logger.info('🟢 随机漫画加载完毕');
}
exports.gacha_f = gacha_f;
