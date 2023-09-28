import { Context, Schema } from 'koishi'
import { getFavorLv } from './favorability'
import { favorCalculate } from './favorability'
import { getZZMessage } from './clairvoyant'
import { accumulateDia } from './clairvoyant'
import { getLevelMessage, levelCalculate } from './level'

export const name = 'haoganjisuan'



export const sanae_code_favora = ({
  apply(ctx: Context) {
    ctx.command("好感计算 <message:text>")
    .alias('羁绊计算')
      .action((_, message) => {
        if (!message) {
          return "标准输入: \n" +
            "1.从当前好感度计算：输入当前好感度和目标好感度\n" +
            "2.从1级好感度计算：只输入目标好感度\n" +
            "示例：\n" +
            "好感度计算 10-50\n"
        } else {
          let favorMessage = getFavorLv(message);
          if (typeof favorMessage === "string") {
            return favorMessage
          } else {
            return favorCalculate(favorMessage[0],
              favorMessage[1])
          }
        }
      })
  }
})



export const sanae_code_zanzuan = ({
  apply(ctx: Context) {
    ctx.command("攒钻 <message:text>", '青辉石计算器')
      .alias('算石头')
      .usage("发送“攒钻”查看具体使用方法")
      .example("攒钻 2023/7/27月卡有jjc30挑战100总力一档")
      .action((_, message) => {
        if (!message) {
          return "标准输入: \n" +
            "1.需要攒到的那天，使用年/月/日形式；\n" +
            "2.月卡有/无；\n" +
            "3.jjc一天拿多少钻；\n" +
            "4.活动的挑战关能拿多少\n" +
            "(100代表全拿，只能打两关就是40)；\n" +
            "5.总力是几档\n" +
            "1、2、3、4、5都需要输入喵，中间不需要空格\n" +
            "示例：\n" +
            "攒钻 2024/1/16月卡有jjc30挑战100总力一档"
        }
        let zzMessage = getZZMessage(message);
        if (typeof zzMessage === "string") {
          return zzMessage
        } else {
          return accumulateDia(zzMessage[0],
            zzMessage[1],
            zzMessage[2],
            zzMessage[3],
            zzMessage[4]
          )
        }
      })
  }
})


export const sanae_code_level = ({
  apply(ctx: Context) {
    ctx.command("升级 <message:text>")
    .alias('lvup')
    .alias('等级')
      .action((_, message) => {
        if (!message) {
          return "功能：\n" +
            "1.简易计算玩家升级所需时间（国服咖啡厅等级5，其余服务器8）\n" +
            "示例：升级 国服 10级50经验到75级满\n" +
            "2.自定义计算玩家升级所需时间\n" +
            "示例：升级 自定义计算时间 10级50经验到85级 咖啡厅8级 jjc2次 碎钻3管 体力月卡有\n" +
            "3.自定义计算若干天后的等级（超过日服最高等级的部分将自动转化为熟练证书）\n" +
            "示例：升级 自定义计算等级 10级50经验 咖啡厅8级 jjc2次 碎钻0管 体力月卡无 7天\n" +
            "4.自定义计算若干天获得的熟练证书（默认满级）\n" +
            "示例：升级 自定义计算熟练证书 咖啡厅8级 jjc2次 碎钻0管 体力月卡有 7天"
        } else {
          let levelMessage = getLevelMessage(message);
          if (typeof levelMessage === "string") {
            return levelMessage
          } else {

            let resultMessage = levelCalculate(levelMessage[0], 
              levelMessage[1], 
              levelMessage[2], 
              levelMessage[3], 
              levelMessage[4], 
              levelMessage[5], 
              levelMessage[6], 
              levelMessage[7], 
              levelMessage[8], 
              levelMessage[9])

            return resultMessage
          }
        }
      })
  }

})