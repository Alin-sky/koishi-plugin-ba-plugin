"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.root_all_img = exports.Config = exports.usage = exports.name = exports.using = exports.inject = void 0;
//import区域
const koishi_1 = require("koishi");
const gacha_main_1 = require("./gacha/gacha_main");
const guidesys_1 = require("./guide/guidesys");
const cal_favor_1 = require("./calculate/cal_favor");
const get_active_1 = require("./get-active/get_active");
const FMPS_1 = require("./FMPS/FMPS");
const FMPS_F_1 = require("./FMPS/FMPS_F");
const match_1 = require("./Snae_match/match");
const cal_level_1 = require("./calculate/cal_level");
exports.inject = ['canvas', 'puppeteer'];
exports.using = ['canvas', 'puppeteer'];
//koishi定义区
exports.name = "ba-plugin";
exports.usage = `
<div style="font-size:45px; font-weight:bold; font-style: italic; text-align:center;">
<span style="color: #66ccff;">BA</span>Plugin
<div style="border:1px solid #CCC"></div> 

</div>
<h2>1.0版本对绝大部分功能进行了重构</h2>
<h3>第一次启动请等待下载资源1-2分钟，指令加载不出来请重启commands插件</h3>

<h2>数据来源于:</h2>
<ul>
  <li> <a href="https://ba.gamekee.com/"> bawiki  </a> </li>
  <li> <a href="https://doc.arona.diyigemt.com/"> AronaBot </a> </li>
  <li> <a href="https://schale.gg/"> shale.gg </a> </li>
  <li> <a href="https://github.com/lgc-NB2Dev/bawiki-data"> 饼干大佬的ba-wiki数据库  </a> </li>
  <li> <a href="https://arona.ai/"> Arona.ai </a> </li>
  <li> <a href="https://arona.icu/main"> 什亭之匣 </a> </li>
  <li> <a href="https://bluearchive.wikiru.jp/"> 日站wiki </a> </li>
</ul>
<div style="border:1px solid #CCC"></div> 

<h2>目前功能:</h2>
<ul>
  <li> Aronabot的攻略图 </li>
  <li> 角色好感升级所需计算 </li>
  <li> 玩家升级计算 </li>
  <li> 总力站档线及排名查询 </li>
  <li> 抽官方漫画 </li>
  <li> 抽卡模拟器 </li>
  <li> bawiki推图攻略 </li>
  <li> 活动查询 </li>
</ul>
<table>
  <thead>
    <tr>
      <th>贡献者</th>
      <th>内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/Sanaene">Sanaene</a></td>
      <td>攻略匹配、好感、升级的算法</td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/~shangxue">shangxue</a></td>
      <td>bawiki推图攻略的数据，还有些技术帮助~</td>
    </tr>
  </tbody>
</table>
`;
//koishi控制台
exports.Config = koishi_1.Schema.object({
    qqconfig: guidesys_1.guide_qq,
    guide: guidesys_1.guideConfig,
});
//代码区
const log = new koishi_1.Logger("ba-plugin");
const cos1 = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/';
exports.root_all_img = (0, FMPS_F_1.rootF)("bap-img");
async function apply(ctx, config) {
    const root_json = await (0, FMPS_F_1.rootF)("bap-json");
    const root_guide = await (0, FMPS_F_1.rootF)("bap-guidesys");
    const fmp = new FMPS_1.FMPS(ctx);
    async function init_download() {
        log.info('⬇️ 开始下载插件必须资源，请稍等哦（*＾-＾*）');
        try {
            const stu_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
            const stulen = stu_data.length;
            for (let i = 0; i < stulen; i++) {
                await fmp.file_download(`${cos1}stu_icon_db_png/${stu_data[i].Id_db}.png`, await exports.root_all_img, stu_data[i].Id_db + '.png');
                const num = Math.round((i / stulen) * 100);
                if (num == 25 || num == 50 || num == 75 || num == 95) {
                    log.info('头像_1下载进度' + num + '%');
                }
            }
            log.info('✔️（1/3）学生头像_1下载完毕');
            for (let i = 0; i < stulen; i++) {
                await fmp.file_download(`${cos1}gacha-img/${stu_data[i].Id_db}.png`, await exports.root_all_img, stu_data[i].Id_db + '_g.png');
                const num = Math.round((i / stulen) * 100);
                if (num == 25 || num == 50 || num == 75 || num == 95) {
                    log.info('头像_2下载进度' + num + '%');
                }
            }
            log.info('✔️（2/3）学生头像_2下载完毕');
            for (let i = 0; i < cal_favor_1.plugin_ass.length; i++) {
                await fmp.file_download(`${cos1}img_file/${cal_favor_1.plugin_ass[i]}.png`, await exports.root_all_img, cal_favor_1.plugin_ass[i] + '.png');
                const num = Math.round((i / cal_favor_1.plugin_ass.length) * 100);
                if (num == 25 || num == 50 || num == 75 || num == 95) {
                    log.info('资源文件下载进度' + num + '%');
                }
            }
            log.info('✔️（3/3）资源下载完毕');
        }
        catch (e) {
            log.error('出现错误' + e);
            return;
        }
    }
    async function initia() {
        log.info("🟡 正在更新json文件");
        const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json';
        const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F";
        const newhash = await ctx.http.get(hashurl);
        const oldjson = await fmp.json_parse(root_json + "/hash.json");
        function arraysEqual(a, b) {
            if (a.length !== b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (Object.keys(a[i]).length !== Object.keys(b[i]).length)
                    return false;
                for (let key in a[i]) {
                    if (a[i][key] !== b[i][key])
                        return false;
                }
            }
            return true;
        }
        if (!arraysEqual(newhash, oldjson)) {
            log.info("☁️🆕🟡云hash更新");
            await init_download();
        }
        else {
            log.info("☁️   🟢云hash未更新");
            //二次检测
            for (let i = 0; i < newhash.length; i++) {
                const jsons = await fmp.json_parse(`${root_json}/${oldjson[i].fname}`);
                if (jsons == null) {
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`);
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`);
                }
            }
            return;
        }
        for (let i = 1; i < 4; i++) {
            try {
                await fmp.file_download(hashurl, root_json, 'hash.json');
                for (let i = 0; i < newhash.length; i++) {
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`);
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`);
                }
                for (let i = 0; i < newhash.length; i++) {
                    if (/sms_/.test(newhash[i].fname)) {
                        await fmp.file_download((`${jsonurl}${newhash[i].fname}`), match_1.match_file, `${newhash[i].fname}`);
                    }
                }
                break;
            }
            catch (e) {
                if (i < 3) {
                    log.info("🟡json文件下载出错：进行第" + i + "次尝试" + e);
                }
                else {
                    log.info("🔴" + i + "次尝试后依旧出错" + e);
                    break;
                }
            }
        }
        log.info("🟢 json文件更新完毕");
    }
    const fileb = await fmp.json_parse(root_json + "/hash.json");
    if (fileb == null) {
        const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json';
        const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F";
        const newhash = await ctx.http.get(hashurl);
        await fmp.file_download(hashurl, root_json, 'hash.json');
        for (let i = 1; i < 4; i++) {
            try {
                await fmp.file_download(hashurl, root_json, 'hash.json');
                for (let i = 0; i < newhash.length; i++) {
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`);
                    await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`);
                }
                for (let i = 0; i < newhash.length; i++) {
                    if (/sms_/.test(newhash[i].fname)) {
                        await fmp.file_download((`${jsonurl}${newhash[i].fname}`), match_1.match_file, `${newhash[i].fname}`);
                    }
                }
                break;
            }
            catch (e) {
                if (i < 3) {
                    log.info("🟡json文件下载出错：进行第" + i + "次尝试" + e);
                }
                else {
                    log.info("🔴" + i + "次尝试后依旧出错" + e);
                    break;
                }
            }
        }
    }
    await initia();
    try {
        ctx.setInterval(async () => await initia(), 3 * 60 * 60 * 1000);
    }
    catch (e) {
        log.info(e);
    }
    ctx.plugin(guidesys_1.guide_systeam, config);
    ctx.plugin(gacha_main_1.gacha_f, config);
    ctx.plugin(cal_favor_1.cal_favorable);
    ctx.plugin(cal_level_1.cal_level);
    ctx.plugin(get_active_1.active_get, config);
}
exports.apply = apply;
