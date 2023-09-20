"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levcom = exports.haoganjisuan = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
const favorability_1 = require("./favorability");
const favorability_2 = require("./favorability");
const level_1 = require("./level");
const level_2 = require("./level");
exports.name = 'haoganjisuan';
exports.Config = koishi_1.Schema.object({});
const haoganjisuan = function apply(ctx) {
    ctx.command("好感计算 <message:text>", "好感度需求计算器")
        .alias('好感')
        .alias('羁绊计算')
        .usage("发送“好感计算”查看具体使用方法")
        .action((_, message) => {
        if (!message) {
            return "标准输入: \n" +
                "1.从当前好感度计算：输入当前好感度和目标好感度\n" +
                "2.从1级好感度计算：只输入目标好感度\n" +
                "示例：\n" +
                "好感计算 10-50\n";
        }
        else {
            let favorMessage = (0, favorability_1.getFavorLv)(message);
            if (typeof favorMessage === "string") {
                return favorMessage;
            }
            else {
                return (0, favorability_2.favorCalculate)(favorMessage[0], favorMessage[1]);
            }
        }
    });
};
exports.haoganjisuan = haoganjisuan;
const levcom = function apply1(ctx) {
    ctx.command("升级 <message:text>", "升级计算器")
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
                "示例：升级 自定义计算熟练证书 咖啡厅8级 jjc2次 碎钻0管 体力月卡有 7天";
        }
        else {
            let levelMessage = (0, level_2.getLevelMessage)(message);
            if (typeof levelMessage === "string") {
                return levelMessage;
            }
            else {
                return (0, level_1.levelCalculate)(levelMessage[0], levelMessage[1], levelMessage[2], levelMessage[3], levelMessage[4], levelMessage[5], levelMessage[6], levelMessage[7], levelMessage[8], levelMessage[9]);
            }
        }
    });
};
exports.levcom = levcom;
