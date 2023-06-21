"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = void 0;
//import区域
const koishi_1 = require("koishi");
const index_1 = require("./guild/index");
const gacha_1 = require("./gacha");
const sanae_fight_1 = require("./sanae-fight");
const ba_alin_1 = require("./ba-alin");
const gacha_2 = require("./gacha/gacha");
//koishi定义区
exports.name = "ba-plugin";
exports.usage = "## 数据来源于[bawiki](https://ba.gamekee.com/)和大佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库\n" +
    "更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
    "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)\n" +
    '\n' +
    "交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" +
    " ## 目前有以下功能:" + "\n" +
    " - 群友エルル的新抽卡模拟器（ba）\n" +
    " - 群友早苗写的模拟总力战(总力)\n" +
    " - 群u早苗的攒钻计算(攒钻)\n" +
    " - 攻略图和角色评分查询(攻略)\n" +
    " - 随机漫画和表情(攻略)\n";
//koishi控制台
exports.Config = koishi_1.Schema.object({
    // alin: alinConfig,
    gacha: gacha_2.gachaConfig,
    guild: index_1.guildConfig,
});
//代码区
async function apply(ctx, config) {
    ctx.plugin(index_1.guildPlugin, config);
    ctx.plugin(gacha_1.gachaplugin, config);
    ctx.plugin(sanae_fight_1.sanaefight, config);
    ctx.plugin(ba_alin_1.alinplugin, config);
    /*ctx.command('关闭插件',)
    .action(()=>{ctx.dispose(gachaplugin)})
    ctx.command('启动插件',)
    .action(()=>{ctx.plugin(gachaplugin,config)})*/
}
exports.apply = apply;
