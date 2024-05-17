import { Context, h, Logger, Random, Schema } from "koishi";
import { getLevelMessage, levelCalculate } from "../sanae-code/level";

export const inject = { required: ['canvas'] }

//export const using = ['canvas']

const log = "ba-plugin-favorable"
const logger: Logger = new Logger(log)
const random = new Random(() => Math.random())


export async function cal_level(ctx: Context) {

    ctx.command("升级 <message:text>", "计算玩家升级所需")
        .alias('lvup')
        .alias('等级')
        .action((_, message) => {
            if (!message) {
                return "功能：\n" +
                    "1.简易计算玩家升级所需时间\n" +
                    "示例：升级 国服 10级50经验到80级满\n" +
                    "---------------\n" +
                    "2.自定义计算玩家升级所需时间\n" +
                    "示例：升级 自定义计算时间 10级50经验到90级 咖啡厅8级 jjc2次 碎钻3管 体力月卡有\n" +
                    "---------------\n" +
                    "3.自定义计算若干天后的等级（超过日服最高等级的部分将自动转化为熟练证书）\n" +
                    "示例：升级 自定义计算等级 10级50经验 咖啡厅8级 jjc2次 碎钻0管 体力月卡无 7天\n" +
                    "---------------\n" +
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