"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cal_favorable = exports.plugin_ass = exports.draw_config = exports.using = exports.inject = void 0;
const koishi_1 = require("koishi");
const FMPS_F_1 = require("../FMPS/FMPS_F");
const FMPS_1 = require("../FMPS/FMPS");
const favorability_1 = require("../sanae-code/favorability");
const match_1 = require("../Snae_match/match");
exports.inject = { required: ['canvas'] };
exports.using = ['canvas'];
const log = "ba-plugin-favorable";
const logger = new koishi_1.Logger(log);
const random = new koishi_1.Random(() => Math.random());
exports.draw_config = koishi_1.Schema.intersect([
    koishi_1.Schema.object({
        modle: koishi_1.Schema.boolean().required().description('选择canvas渲染（canvas/puppeteer）'),
    }).description('渲染模式设置'),
]);
exports.plugin_ass = [
    'item_icon_favor_0',
    'item_icon_favor_1',
    'item_icon_favor_2',
    'item_icon_favor_3',
    'item_icon_favor_4',
    'item_icon_favor_5',
    'item_icon_favor_6',
    'item_icon_favor_7',
    'item_icon_favor_8',
    'item_icon_favor_9',
    'item_icon_favor_10',
    'item_icon_favor_11',
    'item_icon_favor_12',
    'item_icon_favor_13',
    'item_icon_favor_14',
    'item_icon_favor_15',
    'item_icon_favor_16',
    'item_icon_favor_17',
    'item_icon_favor_18',
    'item_icon_favor_19',
    'item_icon_favor_20',
    'item_icon_favor_21',
    'item_icon_favor_22',
    'item_icon_favor_23',
    'item_icon_favor_24',
    'item_icon_favor_25',
    'item_icon_favor_26',
    'item_icon_favor_27',
    'item_icon_favor_28',
    'item_icon_favor_29',
    'item_icon_favor_30',
    'item_icon_favor_31',
    'item_icon_favor_32',
    'item_icon_favor_33',
    'item_icon_favor_34',
    'item_icon_favor_lv2_0',
    'item_icon_favor_lv2_1',
    'item_icon_favor_lv2_2',
    'item_icon_favor_lv2_3',
    'item_icon_favor_lv2_4',
    'item_icon_favor_lv2_5',
    'item_icon_favor_lv2_6',
    'item_icon_favor_lv2_7',
    'item_icon_favor_lv2_8',
    'item_icon_favor_lv2_9',
    'item_icon_favor_lv2_10',
    'item_icon_favor_lv2_11',
    'item_icon_favor_lv2_12',
    'item_icon_favor_lv2_package',
    'item_icon_favor_ssr_2',
    'item_icon_favor_ssr_1',
    '1',
    '2',
    '3',
    '4',
    'arrow',
    'favologo',
    'level',
    'motou',
    'qhs',
    'rc',
    "pt",
    "au",
    'ag',
    'new_in',
    'z_ins',
    'z_tom',
    'z_hac',
    'z_ext',
    'z_veh',
    'z_har',
    'z_nor',
    '3sta_1',
    '3sta',
    '2sta_1',
    '2sta',
    '1sta',
    "meme_1",
    "meme_2",
    "meme_3",
    "meme_4",
    "meme_5",
    "meme_6",
    "meme_7",
    "meme_8",
    "meme_9",
    "meme_10",
    "background",
    "print_2",
    "print_1",
    "print_0",
    "pickup",
];
async function cal_favorable(ctx, config) {
    const fmp = new FMPS_1.FMPS(ctx);
    const root_img = await (0, FMPS_F_1.rootF)("bap-img");
    const root_json = await (0, FMPS_F_1.rootF)('bap-json');
    const drawm = config.drawconfig.modle ? "" : 'file://';
    /*
    暂时不做了，未完善的自动更新礼物信息，等之后再写，不退坑再说
        async function get_stu_favo() {
            try {
                const dbdata = await ctx.http.get("https://schale.gg/data/cn/students.json")
                let in_json_create_data = []
                for (let i = 0; i < dbdata.length; i++) {
                    in_json_create_data.push({
                        "id": dbdata[i].Id,
                        "name": dbdata[i].Name,
                        "FavorItemTags": dbdata[i].FavorItemTags,
                        "FavorItemUniqueTags": dbdata[i].FavorItemUniqueTags
                    })
                }
                const j = await fmp.json_create(ctx.baseDir, 'favor.json', (in_json_create_data))
                logger.info("本地抽卡数据更新完毕")
            } catch (e) {
                logger.info("出错惹呜呜" + e)
                return
            }
        }
        type Gift = {
            Id: number;
            Tags: string[];
            Name: string;
            Icon: string
            Rarity: string
        };
        type Character = {
            id: number;
            name: string;
            FavorItemTags: string[];
            FavorItemUniqueTags: string[];
        };
        const gifts: Gift[] = await fmp.json_parse("C:\\bap-10new\\koishi-app\\external\\ba-plugin\\src\\calculate\\liwu.json")
        const characters: Character[] = await fmp.json_parse("C:\\bap-10new\\koishi-app\\favor.json")
        async function cre_favor_list(gifts: Gift[], characters: Character[]): Promise<void> {
            let json = []
            for (const character of characters) {
                const allFavorTags = [...character.FavorItemTags, ...character.FavorItemUniqueTags];
                const favorGifts = gifts.map((gift) => {
                    const matchedTagsCount = gift.Tags.reduce((count, tag) =>
                        allFavorTags.includes(tag) ? count + 1 : count, 0);
                    return { giftId: gift.Id, matchCount: matchedTagsCount, Rarity: gift.Rarity, Icon: gift.Icon };
                }).filter(gift => gift.matchCount > 0)
                    .map(gift => ({
                        "preId": gift.giftId,
                        "matchCount": gift.matchCount,
                        "Rarity": gift.Rarity,
                        "Icon": gift.Icon
                    }));
    
                json.push({
                    "stuid": character.id,
                    "favorGifts": favorGifts
                })
            }
            await fmp.json_create(root, "favor.json", json)
        }
        await cre_favor_list(gifts, characters);
        await get_stu_favo()
        */
    const url = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json/favora_data.json';
    //await fmp.file_download(url, root, "favora_data.json")
    let toarojson;
    let favorjson;
    async function init() {
        try {
            //await fmp.file_download(url, root, "favora_data.json")
            toarojson = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
            favorjson = await fmp.json_parse(`${root_json}/favora_data.json`);
        }
        catch (e) {
            logger.info("更新数据出错：" + e);
        }
    }
    await init();
    async function creat_img(num, stu) {
        let favorlist = [];
        let stuid;
        if (stu) {
            stuid = toarojson.find(i => i.MapName == stu)?.Id_db;
            favorlist = favorjson.find(i => i.stuid == stuid)?.favorGifts;
        }
        let x = 50, y = 50, wi = 1100, hei = 350, rad = 40, wi1 = 525, x1 = 620, ys = 0;
        /*
        const motou = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/motou.png`)
        const favo_1 = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/1.png`)
        const favo_2 = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/2.png`)
        const favo_3 = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/3.png`)
        const favo_4 = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/4.png`)
        const richen = await ctx.canvas.loadImage(`${FMPS_server_download}favor_img/rc.png`)
        const kokoro = await ctx.canvas.loadImage("https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/favor_img/favologo.png")
        const arrow = await ctx.canvas.loadImage("https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/favor_img/arrow.png")
        */
        const motou = await ctx.canvas.loadImage(`${drawm}${root_img}/motou.png`);
        const favo_1 = await ctx.canvas.loadImage(`${drawm}${root_img}/1.png`);
        const favo_2 = await ctx.canvas.loadImage(`${drawm}${root_img}/2.png`);
        const favo_3 = await ctx.canvas.loadImage(`${drawm}${root_img}/3.png`);
        const favo_4 = await ctx.canvas.loadImage(`${drawm}${root_img}/4.png`);
        const richen = await ctx.canvas.loadImage(`${drawm}${root_img}/rc.png`);
        const kokoro = await ctx.canvas.loadImage(`${drawm}${root_img}/favologo.png`);
        const arrow = await ctx.canvas.loadImage(`${drawm}${root_img}/arrow.png`);
        async function draw_stuicon(stu) {
            ys = 400;
            const stuiconimg = await ctx.canvas.loadImage(`${drawm}${root_img}/${stuid}.png`);
            c.save(); // 保存当前画布状态
            c.beginPath();
            c.arc(350, 200, 125, 0, Math.PI * 2);
            c.fillStyle = '#000000';
            c.clip();
            c.drawImage(stuiconimg, 220, 70, 260, 260 * 1.13);
            c.restore(); // 恢复 到上一次保存的画布状态
            c.font = `bold 100px  Arial`;
            c.fillStyle = '#000000';
            c.fillText(stu, 550, 225);
        }
        function draw_rectangles(c, x, y, width, height, radius, color) {
            c.beginPath();
            c.moveTo(x + radius, y);
            c.arcTo(x + width, y, x + width, y + height, radius); // 右上角
            c.arcTo(x + width, y + height, x, y + height, radius);
            c.arcTo(x, y + height, x, y, radius);
            c.arcTo(x, y, x + width, y, radius);
            c.closePath();
            // 设置阴影
            c.shadowColor = 'rgba(0,0,0,0.3)';
            c.shadowBlur = 30;
            c.shadowOffsetX = 2;
            c.shadowOffsetY = 2;
            c.fillStyle = color;
            c.fill();
            c.restore();
        }
        function draw_txt(number, x, y, unit) {
            let units;
            unit ? units = '次' : units = '个';
            c.save();
            c.fillStyle = '#000000';
            c.shadowColor = 'rgba(0,0,0,0.4)';
            c.shadowBlur = 30;
            c.shadowOffsetX = 2;
            c.shadowOffsetY = 2;
            c.font = `bold 100px  Arial`;
            const text = number.toString() + units;
            c.fillText(text, x + 115, y + 150);
            c.font = `bold 60px  Arial`;
            c.restore();
        }
        function draw_box(favorlist) {
            if (favorlist.length == 0) {
                if (stu) {
                    ys = 0;
                    draw_rectangles(c, x, y + ys, wi, hei + 250, rad, '#FFDDF1');
                    ys = 250;
                    draw_rectangles(c, x, 450 + ys, wi1, hei, rad, '#FFCEF5');
                    draw_rectangles(c, x1, 450 + ys, wi1, hei, rad, '#FFCEF5');
                    draw_rectangles(c, x, 850 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x1, 850 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x, 1250 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x1, 1250 + ys, wi1, hei, rad, '#E3CDFF');
                    draw_rectangles(c, x, 1650 + ys, wi1, hei, rad, '#E3CDFF');
                    draw_rectangles(c, x1, 1650 + ys, wi1, hei, rad, '#E3CDFF');
                }
                else {
                    draw_rectangles(c, x, y + ys, wi, hei, rad, '#FFDDF1');
                    draw_rectangles(c, x, 450 + ys, wi1, hei, rad, '#FFCEF5');
                    draw_rectangles(c, x1, 450 + ys, wi1, hei, rad, '#FFCEF5');
                    draw_rectangles(c, x, 850 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x1, 850 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x, 1250 + ys, wi1, hei, rad, '#FFEFC0');
                    draw_rectangles(c, x1, 1250 + ys, wi1, hei, rad, '#E3CDFF');
                    draw_rectangles(c, x, 1650 + ys, wi1, hei, rad, '#E3CDFF');
                    draw_rectangles(c, x1, 1650 + ys, wi1, hei, rad, '#E3CDFF');
                }
            }
            else {
                let y = 700, x = 50;
                draw_rectangles(c, x, 50, wi, hei + 250, rad, '#FFDDF1');
                draw_rectangles(c, x, 300 + ys, wi1, hei, rad, '#FFCEF5');
                draw_rectangles(c, x1, 300 + ys, wi1, hei, rad, '#FFCEF5');
                draw_rectangles(c, x, y + ys, wi1, hei, rad, '#FFEFC0');
                draw_rectangles(c, x1, y + ys, wi1, hei, rad, '#E3CDFF');
                y += 400;
                for (let i = 0; i < favorlist.length; i++) {
                    if (favorlist[i].Rarity == 'SR') {
                        draw_rectangles(c, x, y + ys, wi1, hei, rad, '#FFEFC0');
                    }
                    else {
                        draw_rectangles(c, x, y + ys, wi1, hei, rad, '#E3CDFF');
                    }
                    i % 2 == 0 ? x = 620 : x = 50;
                    i % 2 != 0 ? y += 400 : '';
                }
            }
        }
        async function draw_text(favorlist) {
            if (favorlist.length == 0) {
                let ysss = 0;
                if (stu) {
                    ys -= 150;
                    ysss = 250;
                }
                c.fillText(`摸头`, x + 70, 550 + ys);
                c.drawImage(motou, x + 10, 615 + ysss, 110, 110);
                draw_txt(num[3], x, 550 + ys, true);
                c.fillText(`课程表(满级期望值)`, x1 + 20, 550 + ys);
                c.drawImage(richen, x1 + 30, 615 + ysss, 55, 110);
                draw_txt(num[4], x1, 550 + ys, true);
                c.fillText("金色礼物(普通)", x + 50, 950 + ys);
                c.drawImage(favo_1, x + 10, 1015 + ysss, 100, 100);
                draw_txt(num[5], x, 950 + ys, false);
                c.fillText("金色礼物(笑脸)", x1 + 50, 950 + ys);
                c.drawImage(favo_2, x1 + 10, 1015 + ysss, 100, 100);
                draw_txt(num[6], x1, 950 + ys, false);
                c.fillText("金色礼物(大笑脸)", x + 50, 1350 + ys);
                c.drawImage(favo_3, x + 10, 1415 + ysss, 100, 100);
                draw_txt(num[7], x, 1350 + ys, false);
                c.fillText("紫色礼物(笑脸)", x1 + 50, 1350 + ys);
                c.drawImage(favo_2, x1 + 10, 1415 + ysss, 100, 100);
                draw_txt(num[8], x1, 1350 + ys, false);
                c.fillText("紫色礼物(大笑脸)", x + 50, 1750 + ys);
                c.drawImage(favo_3, x + 10, 1815 + ysss, 100, 100);
                draw_txt(num[9], x, 1750 + ys, false);
                c.fillText("紫色礼物(爱心脸)", x1 + 50, 1750 + ys);
                c.drawImage(favo_4, x1 + 10, 1815 + ysss, 100, 100);
                draw_txt(num[10], x1, 1750 + ys, false);
            }
            else {
                let y = 800;
                c.fillText(`摸头`, x + 70, y);
                c.drawImage(motou, x + 10, y + 65, 110, 110);
                draw_txt(num[3], x, y, true);
                c.fillText(`课程表(满级期望值)`, x1 + 20, y);
                c.drawImage(richen, x1 + 30, y + 65, 55, 110);
                draw_txt(num[4], x1, y, true);
                y += 400;
                c.fillText("金色礼物(普通)", x + 50, y);
                c.drawImage(favo_1, x + 10, y + 65, 100, 100);
                draw_txt(num[5], x, y, false);
                c.fillText("紫色礼物(笑脸)", x1 + 50, y);
                c.drawImage(favo_2, x1 + 10, y + 65, 100, 100);
                draw_txt(num[8], x1, y, false);
                y += 400;
                for (let i = 0; i < favorlist.length; i++) {
                    const presents = ctx.canvas.loadImage(`${drawm}${root_img}/${favorlist[i].Icon}.png`);
                    c.drawImage(await presents, x - 20, y - 80, 255, 220);
                    if (favorlist[i].matchCount == 1) {
                        if (favorlist[i].Rarity == "SR") {
                            draw_txt("x" + num[6], x + 20, y + 40, false);
                        }
                        else {
                            draw_txt("x" + num[9], x + 20, y + 40, false);
                        }
                    }
                    else {
                        if (favorlist[i].Rarity == "SR") {
                            draw_txt("x" + num[7], x + 20, y + 40, false);
                        }
                        else {
                            draw_txt("x" + num[10], x + 20, y + 40, false);
                        }
                    }
                    i % 2 == 0 ? x = 620 : x = 50;
                    i % 2 != 0 ? y += 400 : '';
                }
            }
        }
        //乱,发低烧写的，能跑就行
        let height;
        if (stu) {
            height = (Math.round(favorlist.length / 2)) * 400;
            height += 1500;
            if (favorlist.length == 0) {
                height = 2300;
            }
        }
        else {
            height = 2048;
        }
        const canvas = await ctx.canvas.createCanvas(1200, height);
        const c = canvas.getContext('2d');
        c.fillStyle = '#FFFFFF';
        c.fillRect(0, 0, 1200, height);
        c.fillStyle = '#000000';
        let yss;
        stu ? yss = 250 : yss = 0;
        stu ? ys = 400 : yss = 0;
        draw_box(favorlist);
        c.drawImage(kokoro, 250, 90 + yss, 200, 160);
        c.drawImage(arrow, 550, 110 + yss, 110, 110);
        c.drawImage(kokoro, 750, 90 + yss, 200, 160);
        stu ? await draw_stuicon(stu) : '';
        c.fillStyle = '#000000';
        c.font = `bold 86px Arial`;
        let x_kkr1, x_kkr2;
        num[1] < 10 ? x_kkr1 = 325 : x_kkr1 = 300;
        num[2] == 100 ? x_kkr2 = 775 : x_kkr2 = 800;
        c.fillText(num[1], x_kkr1, 195 + yss);
        c.fillText(num[2], x_kkr2, 195 + yss);
        c.font = `bold 56px Arial`;
        c.fillText(`总经验:${num[0]},需满足以下任意一点`, x + 100, y + 300 + yss);
        await draw_text(favorlist);
        const img = canvas.toDataURL("image/png");
        return img;
    }
    const help_text = "好感度需求计算器\n" +
        "标准输入: \n" +
        "🟢1.从当前好感度计算：输入当前好感度和目标好感度\n" +
        "🟢2.从1级好感度计算：只输入目标好感度\n" +
        "🟢3.计算某一角色所需礼物：输入目标好感度和角色名称\n" +
        "示例：\n" +
        "好感计算 10-50 爱丽丝\n";
    logger.info("🟢 好感计算器加载完毕");
    ctx.command("好感计算 <arg1> <arg2>", "好感度需求计算器")
        .alias('好感')
        .action(async ({ session }, arg1, arg2) => {
        if (!arg1) {
            return help_text;
        }
        else if (!arg2) {
            try {
                let favor_lev = (0, favorability_1.getFavorLv)(arg1);
                let faovr;
                if (typeof favor_lev === "string") {
                    return favor_lev + "\n" + help_text;
                }
                else {
                    faovr = (0, favorability_1.calculate_numer)(favor_lev[0], favor_lev[1]);
                }
                const img = await creat_img(faovr);
                return (koishi_1.h.image(img));
            }
            catch (e) {
                logger.info("出现错误" + e);
            }
        }
        else {
            try {
                let innum;
                if (/^\d+$/.test(arg2)) {
                    innum = arg1 + "-" + arg2;
                    let favor_lev = (0, favorability_1.getFavorLv)(innum);
                    let faovr;
                    if (typeof favor_lev === "string") {
                        return favor_lev + "\n" + help_text;
                    }
                    else {
                        faovr = (0, favorability_1.calculate_numer)(favor_lev[0], favor_lev[1]);
                    }
                    const img = await creat_img(faovr);
                    return (koishi_1.h.image(img));
                }
                else {
                    let favor_lev = (0, favorability_1.getFavorLv)(arg1);
                    let faovr;
                    if (typeof favor_lev === "string") {
                        return favor_lev + "\n" + help_text;
                    }
                    else {
                        faovr = (0, favorability_1.calculate_numer)(favor_lev[0], favor_lev[1]);
                    }
                    const stus = (await (0, match_1.StudentMatch)(arg2))[1];
                    let stus_in;
                    stus ? stus_in = stus : stus_in = null;
                    stus ? '' : console.log("未匹配到内容");
                    const img = await creat_img(faovr, stus);
                    return (koishi_1.h.image(img));
                }
            }
            catch (e) {
                logger.info("出现错误" + e);
            }
        }
    });
}
exports.cal_favorable = cal_favorable;
