//import区域
import { Context, Schema, } from 'koishi';
import { guildConfig } from './guild/index';
import { gachaplugin } from './gacha';
import { sanaefight } from './sanae-fight';
import { alinConfig, alinplugin } from './ba-alin';
import { gachaConfig } from './gacha/gacha';
import { haoganjisuan, levcom } from './sanae-code';


//koishi定义区
export const name = "ba-plugin";
export const usage = "## 攻略数据来源于[bawiki](https://ba.gamekee.com/)、[AronaBot](https://doc.arona.diyigemt.com/)和大佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库\n" +
  "## 十分感谢[Arona](https://doc.arona.diyigemt.com/)公开数据\n" +
  "更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
  "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)\n" +
  '\n' +
  "交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" +
  " ## 目前有以下功能:" + "\n" +
  " - 群友エルル的新抽卡模拟(ba)\n" +
  " - 群友早苗写的模拟总力模拟(总力)、升级计算(升级)、好感计算(好感)\n" +
  " - 群u早苗的攒钻计算(攒钻)\n" +
  " - Aronabot的攻略图和角色评分查询(攻略)\n" +
  " - 随机漫画和表情(攻略)\n"




export interface Config {
  alin: alinConfig
  gacha: gachaConfig
  guild: guildConfig
  group: string[]
  text: string
  swit: boolean

}
//koishi控制台
export const Config: Schema<Config> = Schema.object({
  alin: alinConfig,
  gacha: gachaConfig,
  guild: guildConfig,
  swit: Schema.boolean().default(true).description('抽卡模拟器全局开关'),
  group: Schema.array(String).role('table').description('抽卡模拟器黑名单群组'),
  text: Schema.string().description('黑名单群组回复内容')
})



//代码区

export async function apply(ctx: Context, config: Config) {

  //ctx.plugin(guildPlugin, config)
  ctx.plugin(gachaplugin, config)
  ctx.plugin(sanaefight, config)
  ctx.plugin(alinplugin, config)
  ctx.plugin(haoganjisuan, config)
  ctx.plugin(levcom, config)
  if (config.swit === false) { ctx.dispose(gachaplugin) } else {
    ctx.plugin(gachaplugin, config)
  }



}