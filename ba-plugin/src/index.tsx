//import区域
import { Context, Schema } from 'koishi';
import { guildConfig, guildPlugin } from './guild/index';
import { gachaplugin } from './gacha';
import { sanaefight } from './sanae-fight';
import {  alinplugin } from './ba-alin';
import { gachaConfig } from './gacha/gacha';
import { haoganjisuan, levcom } from './sanae-code';


//koishi定义区
export const name = "ba-plugin";
export const usage = "## 攻略数据来源于[bawiki](https://ba.gamekee.com/)、[AronaBot](https://doc.arona.diyigemt.com/)和大佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库\n" +
"## 十分感谢[Arona](https://doc.arona.diyigemt.com/)公开数据\n"+  
"更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
  "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)\n" +
  '\n' +
  "交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" +
  " ## 目前有以下功能:" + "\n" +
  " - 群友エルル的新抽卡模拟(ba)\n" +
  " - 群友早苗写的模拟总力战(总力)\n" +
  " - 群u早苗的攒钻计算(攒钻)\n" +
  " - Aronabot的攻略图和角色评分查询(攻略)\n" +
  " - 随机漫画和表情(攻略)\n"




export interface Config {
  //alin: alinConfig
  gacha: gachaConfig
  guild: guildConfig
}
//koishi控制台
export const Config: Schema<Config> = Schema.object({
 // alin: alinConfig,
  gacha: gachaConfig,
  guild: guildConfig,
})


//代码区

export async function apply(ctx: Context, config: Config) {
  ctx.plugin(guildPlugin, config)
  ctx.plugin(gachaplugin, config)
  ctx.plugin(sanaefight, config)
  ctx.plugin(alinplugin, config)  
  ctx.plugin(haoganjisuan, config)
  ctx.plugin(levcom, config)
  /*ctx.command('关闭插件',)
  .action(()=>{ctx.dispose(gachaplugin)})
  ctx.command('启动插件',)
  .action(()=>{ctx.plugin(gachaplugin,config)})*/
}