//import区域
import { Context, Schema, } from 'koishi';
import { guildConfig, guildPlugin } from './guild/index';
import { gachaplugin } from './gacha';
import { alinConfig, alinplugin } from './ba-alin';
import { GachaConfig } from './gacha/gacha';

import { alin_activ, alin_puppe, calculate_puppe } from './ba-alin/puppe';
import { } from "koishi-plugin-puppeteer";
import { sanae_code_favora, sanae_code_level, sanae_code_zanzuan, } from './sanae-code/index';
import { jingConfig, jingziqi } from './chess/jing';



//koishi定义区
export const name = "ba-plugin";
export const usage = "## 数据来源于[bawiki](https://ba.gamekee.com/)、[AronaBot](https://doc.arona.diyigemt.com/)、[shale.gg](https://schale.gg/)和大佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库\n" +
  "## 十分感谢[Arona](https://doc.arona.diyigemt.com/)公开数据\n" +
  "更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
  "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)\n" +
  '\n' +
  "交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" +
  " ## 目前有以下功能:" + "\n" +
  " - 群友エルル的新抽卡模拟(ba)\n" +
  " - 群友早苗写的：\n" +
  "   - 升级计算(升级)\n" +
  "   - 好感计算(好感计算)\n" +
  "   - 攒钻计算(攒钻)\n" +
  " - 升级、好感计算、攒钻转图片\n" +
  " - Aronabot的攻略图和角色评分查询(攻略)\n" +
  " - 随机漫画和表情(攻略)\n"




export interface Config {
  jing: jingConfig,
  alin: alinConfig,
  alin_puppe: alin_puppe,
  GachaGuild: {
    swit: boolean
    抽卡模拟器: GachaConfig,
    guild: guildConfig,
  }
}
//koishi控制台
export const Config: Schema<Config> = Schema.object({
  alin: alinConfig,
  alin_puppe: alin_puppe,
  GachaGuild: Schema.object({
    swit: Schema.boolean().default(true).description('模拟器开关'),
    guild: guildConfig.collapse().description('群组整活设置'),
    抽卡模拟器: GachaConfig.collapse().description('抽卡模拟器设置'),
  }).description('抽卡和整活相关配置'),
  jing: jingConfig.description('井字棋设置'),
})




//代码区

export async function apply(ctx: Context, config: Config) {
  ctx.plugin(jingziqi, config)
  ctx.plugin(guildPlugin, config)
  ctx.plugin(gachaplugin, config)
  ctx.plugin(alinplugin, config)
  if (config.alin_puppe.levelswit === true) {
    ctx.plugin(calculate_puppe, config)

  } else {
    ctx.plugin(sanae_code_favora)
    ctx.plugin(sanae_code_level)
    ctx.plugin(sanae_code_zanzuan)
  }
  if (config.GachaGuild.swit === false) {
    ctx.dispose(gachaplugin)
  } else {
    ctx.plugin(gachaplugin, config)
  }





}