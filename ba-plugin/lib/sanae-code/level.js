"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelMessage = exports.levelCalculate = void 0;
// 每级经验条（从该级升到下一级的经验）
const expLevel = {
    1: 8, 2: 10, 3: 15, 4: 21, 5: 28, 6: 36, 7: 45, 8: 55, 9: 66, 10: 79, 11: 93, 12: 108, 13: 124, 14: 141, 15: 159, 16: 178, 17: 198,
    18: 219, 19: 241, 20: 265, 21: 288, 22: 312, 23: 337, 24: 363, 25: 390, 26: 418, 27: 447, 28: 477, 29: 508, 30: 581, 31: 658, 32: 734,
    33: 814, 34: 897, 35: 982, 36: 1069, 37: 1159, 38: 1251, 39: 1346, 40: 1443, 41: 1543, 42: 1645, 43: 1750, 44: 1857, 45: 1966, 46: 2078,
    47: 2192, 48: 2309, 49: 2428, 50: 2550, 51: 2674, 52: 2800, 53: 2929, 54: 3060, 55: 3194, 56: 3330, 57: 3469, 58: 3610, 59: 3754,
    60: 3900, 61: 4048, 62: 4199, 63: 4352, 64: 4508, 65: 4666, 66: 4831, 67: 5007, 68: 5186, 69: 5369, 70: 5556, 71: 5747, 72: 5942,
    73: 6141, 74: 6344, 75: 6552, 76: 6768, 77: 6989, 78: 7216, 79: 7449, 80: 7682, 81: 7915, 82: 8148, 83: 8381, 84: 8883, 85: 9460,
    86: 10614, 87: 10614
};
// 咖啡厅每小时体力生产
const cafe = { 1: 3.83, 2: 6.36, 3: 9.29, 4: 12.62, 5: 16.36, 6: 19.49, 7: 22.32, 8: 25.15 };
// 日常体力获取
const dailyMisson = {
    "社团登录": 10,
    "每日登录": 50,
    "课程表任务": 50,
    "18点登录": 50
};
// 周常体力获取
const weeklyMisson = {
    "课程表9次": 150,
    "登录5天": 200,
    "日常签到3": 50,
    "日常签到8": 100
};
// 每日有偿体力获取
// jjc商店体力获取与消耗
function jjcShop(times) {
    let energy = 90 + 90 * times;
    let cost = 45 + 45 * times + 10 * times;
    return [energy, cost];
}
// 碎钻体力获取与消耗
function breakDia(times) {
    let energy = 120 * times;
    let cost = 0;
    if (times >= 0 && times <= 3) {
        cost = 30 * times;
    }
    else if (times >= 4 && times <= 6) {
        cost = 3 * 30 + 60 * (times - 3);
    }
    else if (times >= 7 && times <= 9) {
        cost = 3 * 30 + 3 * 60 + 100 * (times - 6);
    }
    else if (times >= 10 && times <= 12) {
        cost = 3 * 30 + 3 * 60 + 3 * 100 + 150 * (times - 9);
    }
    else if (times >= 13 && times <= 15) {
        cost = 3 * 30 + 3 * 60 + 3 * 100 + 3 * 150 + 200 * (times - 12);
    }
    else if (times >= 16 && times <= 20) {
        cost = 3 * 30 + 3 * 60 + 3 * 100 + 3 * 150 + 3 * 200 + 300 * (times - 15);
    }
    else {
        cost = 0;
    }
    return [energy, cost];
}
// 氪金道具体力获取
// 体力月卡购买数量计算
function countCard(days) {
    return 25 * Math.ceil(days / 14);
}
// 每日有偿体力规划方案
class Plan {
    constructor(name, jjc, breakDia, card) {
        this.name = name;
        this.jjc = jjc;
        this.breakDia = breakDia;
        this.card = card;
    }
}
const plan0 = new Plan("无额外购买体力", 0, 0, false);
const plan1 = new Plan("jjc2", 2, 0, false);
const plan2 = new Plan("jjc2+3管", 2, 3, false);
const plan3 = new Plan("jjc2+3管+体力月卡", 2, 3, true);
const plan4 = new Plan("jjc2+6管+体力月卡", 2, 6, true);
const plan5 = new Plan("jjc4+20管+体力月卡", 4, 20, true);
const plans = [plan0, plan1, plan2, plan3, plan4, plan5];
// 总计经验计算
function sumExp(startLevel, startExp, endLevel, endExp) {
    let sum = 0;
    for (let key in expLevel) {
        let level = parseInt(key, 10);
        if (level >= startLevel && level < endLevel) {
            sum += expLevel[level];
        }
    }
    sum = sum - startExp + endExp;
    return [sum, startLevel, startExp, endLevel, endExp];
}
// 每日体力计算
function dailyEnergy(cafeLv, jjc, card, breakDias) {
    // 固定回体，6分钟1点
    let fixedRecovery = 24 * 60 / 6;
    // 咖啡厅体力，每隔12小时收菜一次，一天两次
    let cafeEnergy = 2 * Math.floor(cafe[cafeLv] * 12);
    // 日常任务获取体力
    let normalDaily = 0;
    for (let key in dailyMisson) {
        normalDaily += dailyMisson[key];
    }
    // jjc商店购买体力
    let jjcEnergy = 0;
    let jjcCost = 0;
    if (jjc != 0) {
        jjcEnergy = jjcShop(jjc - 1)[0];
        jjcCost = jjcShop(jjc - 1)[1];
    }
    // 体力月卡
    let cardEnergy = 0;
    if (card) {
        cardEnergy = 150;
    }
    // 碎钻买体力
    let diaEnergy = breakDia(breakDias)[0];
    let diaCost = breakDia(breakDias)[1];
    return [fixedRecovery + cafeEnergy + normalDaily + jjcEnergy + cardEnergy + diaEnergy, jjcCost, diaCost];
}
// 升级计算
function levelCalculate(mark, startLevel, startExp, endLevel, endExp, cafe, jjc, card, breakDia, days) {
    let exp = sumExp(startLevel, startExp, endLevel, endExp);
    // 写入文本头
    let result = [];
    if (exp[2] == 0) {
        if (exp[4] == 0) {
            result.push(`玩家等级从${exp[1]}级到${exp[3]}级，总计经验${exp[0]}，规划方案如下：\n`);
        }
        else {
            result.push(`玩家等级从${exp[1]}级到${exp[3]}级满，总计经验${exp[0]}，规划方案如下：\n`);
        }
    }
    else {
        if (exp[4] == 0) {
            result.push(`玩家等级从${exp[1]}级${exp[2]}经验到${exp[3]}级，总计经验${exp[0]}，规划方案如下：\n`);
        }
        else {
            result.push(`玩家等级从${exp[1]}级${exp[2]}经验到${exp[3]}级满，总计经验${exp[0]}，规划方案如下：\n`);
        }
    }
    // 区分因游戏进度不同导致的不同服务器的咖啡厅等级上限
    let cafeRank = 1;
    if (mark === "国服") {
        cafeRank = 5;
    }
    else if (mark === "国际服" || mark === "日服") {
        cafeRank = 8;
    }
    else {
        if (cafe !== undefined) {
            cafeRank = cafe;
        }
    }
    // 初始化结果参数
    let dayCost = 0;
    let jjcCost_sum = 0;
    let diaCost_sum = 0;
    let cardCost_count = 0;
    let cardCost_sum = 0;
    // 给定服务器，按已有的方案计算并写入结果
    if (mark === "国服" || mark === "国际服" || mark === "日服") {
        for (let plan of plans) {
            jjc = plan.jjc;
            card = plan.card;
            breakDia = plan.breakDia;
            jjcCost_sum = 0;
            diaCost_sum = 0;
            let Exp_d = dailyEnergy(cafeRank, jjc, card, breakDia)[0];
            let jjcCost_d = dailyEnergy(cafeRank, jjc, card, breakDia)[1];
            let diaCost_d = dailyEnergy(cafeRank, jjc, card, breakDia)[2];
            let day = 1;
            let exp_sum = 0;
            while (true) {
                exp_sum += Exp_d;
                jjcCost_sum += jjcCost_d;
                diaCost_sum += diaCost_d;
                if (day % 7 == 2) {
                    exp_sum += weeklyMisson["课程表9次"];
                }
                if (day % 7 == 5) {
                    exp_sum += weeklyMisson["登录5天"];
                }
                if (day % 10 == 3) {
                    exp_sum += weeklyMisson["日常签到3"];
                }
                if (day % 10 == 8) {
                    exp_sum += weeklyMisson["日常签到8"];
                }
                if (exp_sum >= exp[0]) {
                    break;
                }
                else {
                    day++;
                }
            }
            dayCost = day;
            if (card) {
                cardCost_count = Math.ceil(dayCost / 14);
                cardCost_sum = cardCost_count * 25;
            }
            if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`·${plan.name}:需要${dayCost}天。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗青辉石${diaCost_sum}个。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else {
                result.push(`·${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
        }
    }
    else if (mark === "自定义计算时间") {
        // 自定义计算时间，并写入计算结果
        if (cafe !== undefined && jjc !== undefined && breakDia !== undefined && card !== undefined) {
            let Exp_d = dailyEnergy(cafe, jjc, card, breakDia)[0];
            let jjcCost_d = dailyEnergy(cafe, jjc, card, breakDia)[1];
            let diaCost_d = dailyEnergy(cafe, jjc, card, breakDia)[2];
            let day = 1;
            let exp_sum = 0;
            while (true) {
                exp_sum += Exp_d;
                jjcCost_sum += jjcCost_d;
                diaCost_sum += diaCost_d;
                if (day % 7 == 2) {
                    exp_sum += weeklyMisson["课程表9次"];
                }
                if (day % 7 == 5) {
                    exp_sum += weeklyMisson["登录5天"];
                }
                if (day % 10 == 3) {
                    exp_sum += weeklyMisson["日常签到3"];
                }
                if (day % 10 == 8) {
                    exp_sum += weeklyMisson["日常签到8"];
                }
                if (exp_sum >= exp[0]) {
                    break;
                }
                else {
                    day++;
                }
            }
            dayCost = day;
            if (card) {
                cardCost_count = Math.ceil(dayCost / 14);
                cardCost_sum = cardCost_count * 25;
            }
            if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，无额外购买体力:需要${dayCost}天。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管:需要${dayCost}天，共消耗青辉石${diaCost_sum}个。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，体力月卡:需要${dayCost}天，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。\n`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+体力月卡:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管+体力月卡:需要${dayCost}天，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
            else {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管+体力月卡:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。\n`);
            }
        }
    }
    else if (mark === "自定义计算等级") {
        // 清空文本头
        result = [];
        // 自定义计算等级，并写入计算结果 
        if (cafe !== undefined && jjc !== undefined && breakDia !== undefined && card !== undefined && days !== undefined) {
            let Exp_d = dailyEnergy(cafe, jjc, card, breakDia)[0];
            let jjcCost_d = dailyEnergy(cafe, jjc, card, breakDia)[1];
            let diaCost_d = dailyEnergy(cafe, jjc, card, breakDia)[2];
            let exp_income = 0;
            let final_level = exp[1];
            let final_exp = 0;
            let certificate = 0;
            if (card) {
                cardCost_count = Math.ceil(days / 14);
                cardCost_sum = cardCost_count * 25;
            }
            for (let d = 1; d <= days; d++) {
                exp_income += Exp_d;
                jjcCost_sum += jjcCost_d;
                diaCost_sum += diaCost_d;
                if (d % 7 == 2) {
                    exp_income += weeklyMisson["课程表9次"];
                }
                if (d % 7 == 5) {
                    exp_income += weeklyMisson["登录5天"];
                }
                if (d % 10 == 3) {
                    exp_income += weeklyMisson["日常签到3"];
                }
                if (d % 10 == 8) {
                    exp_income += weeklyMisson["日常签到8"];
                }
            }
            for (let key in expLevel) {
                let level = parseInt(key, 10);
                if (level == exp[1]) {
                    exp_income = exp_income - expLevel[level] + exp[2];
                    if (exp_income <= 0) {
                        final_level = level;
                        final_exp = exp_income + expLevel[level];
                        break;
                    }
                }
                if (level > exp[1]) {
                    exp_income -= expLevel[level];
                    if (exp_income <= 0) {
                        final_level = level;
                        final_exp = exp_income + expLevel[level];
                        break;
                    }
                }
                // 经验溢出日服最高上限转化为熟练证书
                if (level == 87 && exp_income > 0) {
                    final_level = 87;
                    final_exp = expLevel[87];
                    certificate = exp_income;
                    if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
                        result.push(`咖啡厅等级${cafe}，无额外购买体力，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个。`);
                    }
                    else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
                        result.push(`咖啡厅等级${cafe}，jjc${jjc}，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个。`);
                    }
                    else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
                        result.push(`咖啡厅等级${cafe}，${breakDia}管，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个。`);
                    }
                    else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
                        result.push(`咖啡厅等级${cafe}，体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
                    }
                    else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
                        result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
                    }
                    else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
                        result.push(`咖啡厅等级${cafe}，jjc${jjc}+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
                    }
                    else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
                        result.push(`咖啡厅等级${cafe}，${breakDia}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
                    }
                    else {
                        result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至87级${expLevel[87]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
                    }
                    return result;
                }
            }
            if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，无额外购买体力，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗青辉石${diaCost_sum}个。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
        }
    }
    else if (mark === "自定义计算熟练证书") {
        // 清空文本头
        result = [];
        // 自定义计算熟练证书，并写入计算结果 
        if (cafe !== undefined && jjc !== undefined && breakDia !== undefined && card !== undefined && days !== undefined) {
            let Exp_d = dailyEnergy(cafe, jjc, card, breakDia)[0];
            let jjcCost_d = dailyEnergy(cafe, jjc, card, breakDia)[1];
            let diaCost_d = dailyEnergy(cafe, jjc, card, breakDia)[2];
            let exp_income = 0;
            let certificate = 0;
            if (card) {
                cardCost_count = Math.ceil(days / 14);
                cardCost_sum = cardCost_count * 25;
            }
            for (let d = 1; d <= days; d++) {
                exp_income += Exp_d;
                jjcCost_sum += jjcCost_d;
                diaCost_sum += diaCost_d;
                if (d % 7 == 2) {
                    exp_income += weeklyMisson["课程表9次"];
                }
                if (d % 7 == 5) {
                    exp_income += weeklyMisson["登录5天"];
                }
                if (d % 10 == 3) {
                    exp_income += weeklyMisson["日常签到3"];
                }
                if (d % 10 == 8) {
                    exp_income += weeklyMisson["日常签到8"];
                }
            }
            certificate = exp_income;
            if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，无额外购买体力，${days}天可以获得熟练证书${certificate}个。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管，${days}天可以获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
            }
            else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
                result.push(`咖啡厅等级${cafe}，${breakDia}管+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            else {
                result.push(`咖啡厅等级${cafe}，jjc${jjc}+${breakDia}管+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
            }
            return result;
        }
    }
    else {
        return result;
    }
    return result;
}
exports.levelCalculate = levelCalculate;
// 读取输入信息
function getLevelMessage(input) {
    // 初始化输出参数
    let mark = "";
    let startLevel = 1;
    let startExp = 0;
    let endLevel = 87;
    let endExp = 0;
    let cafe = 1;
    let jjc = 0;
    let breakDia = 0;
    let card = false;
    let days = 0;
    // 匹配功能标志
    const functionRegex = /国服|国际服|日服|自定义计算时间|自定义计算等级|自定义计算熟练证书/;
    const functionMatch = input.match(functionRegex);
    if (functionMatch) {
        mark = functionMatch[0];
        if (mark === "国服") {
            cafe = 5;
        }
        if (mark === "国际服") {
            cafe = 8;
        }
        if (mark === "日服") {
            cafe = 8;
        }
    }
    else {
        return "未匹配到正确功能";
    }
    // 按功能标志进行参数匹配
    if (mark === "国服" || mark === "国际服" || mark === "日服") {
        // 不支持输入目标经验值
        const wrongRegex = /\d+(?:\.\d+)?级(?:(?:\d+(?:\.\d+)?)经验)?.*?(?:\d+(?:\.\d+)?)级(?:\d+(?:\.\d+)?)经验/;
        if (wrongRegex.test(input)) {
            return "计算的最后一天经验值会溢出，因此请不要在目标等级后输入目标经验";
        }
        // 匹配xx级（xx经验）——xx级（满），匹配两个，标准输入，唯一可以计算带起始经验值的方法
        const simpleRegex1 = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?.*?(\d+(?:\.\d+)?)级(满?)?/;
        // 匹配xx级（满），匹配一个，作为目标等级
        const simpleRegex2 = /(\d+(?:\.\d+)?)级(满?)?/;
        // 匹配xx-xx（满），匹配两个，简易输入，无法计算带起始经验值的方法
        const simpleRegex3 = /(\d+(?:\.\d+)?)[^\d]+(\d+(?:\.\d+)?)(满)?/;
        // 匹配xx（满），匹配一个，作为目标等级，再匹配不到就报错
        const simpleRegex4 = /(\d+(?:\.\d+)?)(满?)?/;
        const simpleMatch1 = input.match(simpleRegex1);
        if (simpleMatch1) {
            if (simpleMatch1[1]) {
                startLevel = parseFloat(simpleMatch1[1]);
            }
            if (simpleMatch1[2]) {
                startExp = parseFloat(simpleMatch1[2]);
            }
            if (simpleMatch1[3]) {
                endLevel = parseFloat(simpleMatch1[3]);
            }
            if (simpleMatch1[4]) {
                endExp = expLevel[parseFloat(simpleMatch1[3])];
            }
        }
        else {
            const simpleMatch2 = input.match(simpleRegex2);
            if (simpleMatch2) {
                if (simpleMatch2[1]) {
                    endLevel = parseFloat(simpleMatch2[1]);
                }
                if (simpleMatch2[2]) {
                    endExp = expLevel[simpleMatch2[1]];
                }
            }
            else {
                const simpleMatch3 = input.match(simpleRegex3);
                if (simpleMatch3) {
                    if (simpleMatch3[1]) {
                        startLevel = parseFloat(simpleMatch3[1]);
                    }
                    if (simpleMatch3[2]) {
                        endLevel = parseFloat(simpleMatch3[2]);
                    }
                    if (simpleMatch3[3]) {
                        endExp = expLevel[parseFloat(simpleMatch3[2])];
                    }
                }
                else {
                    const simpleMatch4 = input.match(simpleRegex4);
                    if (simpleMatch4) {
                        if (simpleMatch4[1]) {
                            endLevel = parseFloat(simpleMatch4[1]);
                        }
                        if (simpleMatch4[2]) {
                            endExp = expLevel[simpleMatch4[1]];
                        }
                    }
                    else {
                        return "未匹配到等级参数";
                    }
                }
            }
        }
        // 数值合理性检测
        if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
            return "检测到非整数输入，请检查输入";
        }
        if (startLevel < 1) {
            return "等级最低为1级";
        }
        if (mark === "国服" && endLevel > 75) {
            return "国服当前最高等级为75级";
        }
        if (mark == "国际服" && endLevel > 85) {
            return "国际服当前最高等级为85级";
        }
        if (mark === "日服" && endLevel > 87) {
            return "日服当前最高等级为87级";
        }
        if (endLevel < startLevel) {
            return "目标等级不能低于初始等级";
        }
        if (startExp > expLevel[startLevel]) {
            return "检测到初始经验值高出该等级经验值上限";
        }
        if (endLevel == startLevel && startExp > endExp) {
            return "同等级时目标经验值不能低于初始经验值";
        }
        if (startLevel === undefined || startExp === undefined || endLevel === undefined || endExp === undefined) {
            return "检测到数值缺失，请检查输入";
        }
    }
    else if (mark === "自定义计算时间") {
        // 不支持输入目标经验值
        const wrongRegex = /\d+(?:\.\d+)?级(?:(?:\d+(?:\.\d+)?)经验)?.*?(?:\d+(?:\.\d+)?)级(?:\d+(?:\.\d+)?)经验/;
        if (wrongRegex.test(input)) {
            return "计算的最后一天经验值会溢出，因此请不要在目标等级后输入目标经验";
        }
        // 匹配现在等级与目标等级，原则与简易计算一致
        const timeRegex1 = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?.*?(\d+(?:\.\d+)?)级(满?)?/;
        const timeRegex2 = /(\d+(?:\.\d+)?)级(满?)?/;
        const timeRegex3 = /(\d+(?:\.\d+)?)[^\d]+(\d+(?:\.\d+)?)(满)?/;
        const timeRegex4 = /(\d+(?:\.\d+)?)(满?)?/;
        const timeMatch1 = input.match(timeRegex1);
        if (timeMatch1) {
            if (timeMatch1[1]) {
                startLevel = parseFloat(timeMatch1[1]);
            }
            if (timeMatch1[2]) {
                startExp = parseFloat(timeMatch1[2]);
            }
            if (timeMatch1[3]) {
                endLevel = parseFloat(timeMatch1[3]);
            }
            if (timeMatch1[4]) {
                endExp = expLevel[parseFloat(timeMatch1[3])];
            }
        }
        else {
            const timeMatch2 = input.match(timeRegex2);
            if (timeMatch2) {
                if (timeMatch2[1]) {
                    endLevel = parseFloat(timeMatch2[1]);
                }
                if (timeMatch2[2]) {
                    endExp = expLevel[timeMatch2[1]];
                }
            }
            else {
                const timeMatch3 = input.match(timeRegex3);
                if (timeMatch3) {
                    if (timeMatch3[1]) {
                        startLevel = parseFloat(timeMatch3[1]);
                    }
                    if (timeMatch3[2]) {
                        endLevel = parseFloat(timeMatch3[2]);
                    }
                    if (timeMatch3[3]) {
                        endExp = expLevel[parseFloat(timeMatch3[2])];
                    }
                }
                else {
                    const timeMatch4 = input.match(timeRegex4);
                    if (timeMatch4) {
                        if (timeMatch4[1]) {
                            endLevel = parseFloat(timeMatch4[1]);
                        }
                        if (timeMatch4[2]) {
                            endExp = expLevel[timeMatch4[1]];
                        }
                    }
                    else {
                        return "未匹配到等级参数";
                    }
                }
            }
        }
        // 角色等级经验数值合理性验证
        if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
            return "检测到角色等级/经验非整数输入，请检查输入";
        }
        if (startLevel < 1) {
            return "等级最低为1级";
        }
        if (endLevel > 87) {
            return "日服当前最高等级为87级";
        }
        if (startExp > expLevel[startLevel]) {
            return "检测到初始经验值高出该等级经验值上限";
        }
        if (endLevel < startLevel) {
            return "目标等级不能低于初始等级";
        }
        if (endLevel == startLevel && startExp > endExp) {
            return "同等级时目标经验值不能低于初始经验值";
        }
        if (startLevel === undefined || startExp === undefined || endLevel === undefined || endExp === undefined) {
            return "检测到等级/经验数值缺失，请检查输入";
        }
        // 匹配咖啡厅等级
        const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
        const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
        const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
        const cafeMatch1 = input.match(cafeRegex1);
        if (cafeMatch1) {
            cafe = parseFloat(cafeMatch1[1]);
        }
        else {
            const cafeMatch2 = input.match(cafeRegex2);
            if (cafeMatch2) {
                cafe = parseFloat(cafeMatch2[1]);
            }
            else {
                const cafeMatch3 = input.match(cafeRegex3);
                if (cafeMatch3) {
                    cafe = parseFloat(cafeMatch3[1]);
                }
                else {
                    return "未匹配到咖啡厅等级";
                }
            }
        }
        // 咖啡厅等级数值合理性验证
        if (!Number.isInteger(cafe)) {
            return "检测到咖啡厅等级非整数输入，请检查输入";
        }
        if (cafe < 1) {
            return "咖啡厅等级最低为1级";
        }
        if (cafe > 8) {
            return "当前日服咖啡厅最高等级为8级";
        }
        if (cafe === undefined) {
            return "检测到咖啡厅等级数值缺失，请检查输入";
        }
        // 匹配jjc商店体力购买次数
        const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcMatch1 = input.match(jjcRegex1);
        if (jjcMatch1) {
            jjc = parseFloat(jjcMatch1[1]);
        }
        else {
            const jjcMatch2 = input.match(jjcRegex2);
            if (jjcMatch2) {
                jjc = parseFloat(jjcMatch2[1]);
            }
            else {
                const jjcMatch3 = input.match(jjcRegex3);
                if (jjcMatch3) {
                    jjc = parseFloat(jjcMatch3[1]) + 1;
                }
                else {
                    const jjcMatch4 = input.match(jjcRegex4);
                    if (jjcMatch4) {
                        jjc = parseFloat(jjcMatch4[1]) + 1;
                    }
                    else {
                        return "未匹配到jjc商店购买体力次数";
                    }
                }
            }
        }
        // jjc商店购买次数合理性验证
        if (!Number.isInteger(jjc)) {
            return "检测到jjc商店购买体力次数非整数输入，请检查输入";
        }
        if (jjc > 4) {
            return "每日最多购买4次jjc商店";
        }
        if (jjc === undefined) {
            return "检测到jjc商店购买体力次数数值缺失，请检查输入";
        }
        // 匹配碎钻次数
        const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
        const diaRegex2 = /(\d+(?:\.\d+)?)管/;
        const diaMatch1 = input.match(diaRegex1);
        if (diaMatch1) {
            breakDia = parseFloat(diaMatch1[1]);
        }
        else {
            const diaMatch2 = input.match(diaRegex2);
            if (diaMatch2) {
                breakDia = parseFloat(diaMatch2[1]);
            }
            else {
                return "未匹配到碎钻购买体力次数";
            }
        }
        // 碎钻次数合理性验证
        if (!Number.isInteger(breakDia)) {
            return "检测到碎钻购买体力次数非整数输入，请检查输入";
        }
        if (breakDia > 20) {
            return "每日最多碎钻购买20次体力";
        }
        if (jjc === undefined) {
            return "检测到碎钻购买体力次数数值缺失，请检查输入";
        }
        // 匹配体力月卡有无
        const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
        const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
        const cardMatch1 = input.match(cardRegex1);
        if (cardMatch1) {
            if (cardMatch1[1] === "有") {
                card = true;
            }
        }
        else {
            const cardMatch2 = input.match(cardRegex2);
            if (cardMatch2) {
                if (cardMatch2[1] === "有") {
                    card = true;
                }
            }
            else {
                return "未匹配到体力月卡信息";
            }
        }
    }
    else if (mark === "自定义计算等级") {
        // 匹配现有等级
        const levelRegex = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?/;
        const levelMatch = input.match(levelRegex);
        if (levelMatch) {
            if (levelMatch[1]) {
                startLevel = parseFloat(levelMatch[1]);
            }
            if (levelMatch[2]) {
                startExp = parseFloat(levelMatch[2]);
            }
        }
        else {
            return "未匹配到等级参数";
        }
        // 角色等级经验数值合理性验证
        if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
            return "检测到角色等级/经验非整数输入，请检查输入";
        }
        if (startLevel < 1) {
            return "等级最低为1级";
        }
        if (startExp > expLevel[startLevel]) {
            return "检测到初始经验值高出该等级经验值上限";
        }
        if (startLevel === undefined || startExp === undefined || endLevel === undefined || endExp === undefined) {
            return "检测到等级/经验数值缺失，请检查输入";
        }
        // 匹配咖啡厅等级
        const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
        const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
        const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
        const cafeMatch1 = input.match(cafeRegex1);
        if (cafeMatch1) {
            cafe = parseFloat(cafeMatch1[1]);
        }
        else {
            const cafeMatch2 = input.match(cafeRegex2);
            if (cafeMatch2) {
                cafe = parseFloat(cafeMatch2[1]);
            }
            else {
                const cafeMatch3 = input.match(cafeRegex3);
                if (cafeMatch3) {
                    cafe = parseFloat(cafeMatch3[1]);
                }
                else {
                    return "未匹配到咖啡厅等级";
                }
            }
        }
        // 咖啡厅等级数值合理性验证
        if (!Number.isInteger(cafe)) {
            return "检测到咖啡厅等级非整数输入，请检查输入";
        }
        if (cafe < 1) {
            return "咖啡厅等级最低为1级";
        }
        if (cafe > 8) {
            return "当前日服咖啡厅最高等级为8级";
        }
        if (cafe === undefined) {
            return "检测到咖啡厅等级数值缺失，请检查输入";
        }
        // 匹配jjc商店体力购买次数
        const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcMatch1 = input.match(jjcRegex1);
        if (jjcMatch1) {
            jjc = parseFloat(jjcMatch1[1]);
        }
        else {
            const jjcMatch2 = input.match(jjcRegex2);
            if (jjcMatch2) {
                jjc = parseFloat(jjcMatch2[1]);
            }
            else {
                const jjcMatch3 = input.match(jjcRegex3);
                if (jjcMatch3) {
                    jjc = parseFloat(jjcMatch3[1]) + 1;
                }
                else {
                    const jjcMatch4 = input.match(jjcRegex4);
                    if (jjcMatch4) {
                        jjc = parseFloat(jjcMatch4[1]) + 1;
                    }
                    else {
                        return "未匹配到jjc商店购买体力次数";
                    }
                }
            }
        }
        // jjc商店购买次数合理性验证
        if (!Number.isInteger(jjc)) {
            return "检测到jjc商店购买体力次数非整数输入，请检查输入";
        }
        if (jjc > 4) {
            return "每日最多购买4次jjc商店";
        }
        if (jjc === undefined) {
            return "检测到jjc商店购买体力次数数值缺失，请检查输入";
        }
        // 匹配碎钻次数
        const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
        const diaRegex2 = /(\d+(?:\.\d+)?)管/;
        const diaMatch1 = input.match(diaRegex1);
        if (diaMatch1) {
            breakDia = parseFloat(diaMatch1[1]);
        }
        else {
            const diaMatch2 = input.match(diaRegex2);
            if (diaMatch2) {
                breakDia = parseFloat(diaMatch2[1]);
            }
            else {
                return "未匹配到碎钻购买体力次数";
            }
        }
        // 碎钻次数合理性验证
        if (!Number.isInteger(breakDia)) {
            return "检测到碎钻购买体力次数非整数输入，请检查输入";
        }
        if (breakDia > 20) {
            return "每日最多碎钻购买20次体力";
        }
        if (jjc === undefined) {
            return "检测到碎钻购买体力次数数值缺失，请检查输入";
        }
        // 匹配体力月卡有无
        const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
        const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
        const cardMatch1 = input.match(cardRegex1);
        if (cardMatch1) {
            if (cardMatch1[1] === "有") {
                card = true;
            }
        }
        else {
            const cardMatch2 = input.match(cardRegex2);
            if (cardMatch2) {
                if (cardMatch2[1] === "有") {
                    card = true;
                }
            }
            else {
                return "未匹配到体力月卡信息";
            }
        }
        // 匹配执行天数
        const dayRegex = /(\d+(?:\.\d+)?)天/;
        const dayMatch = input.match(dayRegex);
        if (dayMatch) {
            days = parseFloat(dayMatch[1]);
        }
        else {
            return "未匹配到执行天数";
        }
        // 天数合理性验证
        if (!Number.isInteger(days)) {
            return "检测到执行天数非整数输入，请检查输入";
        }
        if (days == 0) {
            return "至少执行1天";
        }
        if (days >= 10000) {
            return `已经肝了${Math.floor(days / 365)}年多了，休息一下吧(*^▽^*)`;
        }
        if (days === undefined) {
            return "检测到执行天数数值缺失，请检查输入";
        }
    }
    else if (mark == "自定义计算熟练证书") {
        // 匹配咖啡厅等级
        const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
        const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
        const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
        const cafeMatch1 = input.match(cafeRegex1);
        if (cafeMatch1) {
            cafe = parseFloat(cafeMatch1[1]);
        }
        else {
            const cafeMatch2 = input.match(cafeRegex2);
            if (cafeMatch2) {
                cafe = parseFloat(cafeMatch2[1]);
            }
            else {
                const cafeMatch3 = input.match(cafeRegex3);
                if (cafeMatch3) {
                    cafe = parseFloat(cafeMatch3[1]);
                }
                else {
                    return "未匹配到咖啡厅等级";
                }
            }
        }
        // 咖啡厅等级数值合理性验证
        if (!Number.isInteger(cafe)) {
            return "检测到咖啡厅等级非整数输入，请检查输入";
        }
        if (cafe < 1) {
            return "咖啡厅等级最低为1级";
        }
        if (cafe > 8) {
            return "当前日服咖啡厅最高等级为8级";
        }
        if (cafe === undefined) {
            return "检测到咖啡厅等级数值缺失，请检查输入";
        }
        // 匹配jjc商店体力购买次数
        const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
        const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
        const jjcMatch1 = input.match(jjcRegex1);
        if (jjcMatch1) {
            jjc = parseFloat(jjcMatch1[1]);
        }
        else {
            const jjcMatch2 = input.match(jjcRegex2);
            if (jjcMatch2) {
                jjc = parseFloat(jjcMatch2[1]);
            }
            else {
                const jjcMatch3 = input.match(jjcRegex3);
                if (jjcMatch3) {
                    jjc = parseFloat(jjcMatch3[1]) + 1;
                }
                else {
                    const jjcMatch4 = input.match(jjcRegex4);
                    if (jjcMatch4) {
                        jjc = parseFloat(jjcMatch4[1]) + 1;
                    }
                    else {
                        return "未匹配到jjc商店购买体力次数";
                    }
                }
            }
        }
        // jjc商店购买次数合理性验证
        if (!Number.isInteger(jjc)) {
            return "检测到jjc商店购买体力次数非整数输入，请检查输入";
        }
        if (jjc > 4) {
            return "每日最多购买4次jjc商店";
        }
        if (jjc === undefined) {
            return "检测到jjc商店购买体力次数数值缺失，请检查输入";
        }
        // 匹配碎钻次数
        const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
        const diaRegex2 = /(\d+(?:\.\d+)?)管/;
        const diaMatch1 = input.match(diaRegex1);
        if (diaMatch1) {
            breakDia = parseFloat(diaMatch1[1]);
        }
        else {
            const diaMatch2 = input.match(diaRegex2);
            if (diaMatch2) {
                breakDia = parseFloat(diaMatch2[1]);
            }
            else {
                return "未匹配到碎钻购买体力次数";
            }
        }
        // 碎钻次数合理性验证
        if (!Number.isInteger(breakDia)) {
            return "检测到碎钻购买体力次数非整数输入，请检查输入";
        }
        if (breakDia > 20) {
            return "每日最多碎钻购买20次体力";
        }
        if (jjc === undefined) {
            return "检测到碎钻购买体力次数数值缺失，请检查输入";
        }
        // 匹配体力月卡有无
        const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
        const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
        const cardMatch1 = input.match(cardRegex1);
        if (cardMatch1) {
            if (cardMatch1[1] === "有") {
                card = true;
            }
        }
        else {
            const cardMatch2 = input.match(cardRegex2);
            if (cardMatch2) {
                if (cardMatch2[1] === "有") {
                    card = true;
                }
            }
            else {
                return "未匹配到体力月卡信息";
            }
        }
        // 匹配执行天数
        const dayRegex = /(\d+(?:\.\d+)?)天/;
        const dayMatch = input.match(dayRegex);
        if (dayMatch) {
            days = parseFloat(dayMatch[1]);
        }
        else {
            return "未匹配到执行天数";
        }
        // 天数合理性验证
        if (!Number.isInteger(days)) {
            return "检测到执行天数非整数输入，请检查输入";
        }
        if (days == 0) {
            return "至少执行1天";
        }
        if (days >= 10000) {
            return `已经肝了${Math.floor(days / 365)}年多了，休息一下吧(*^▽^*)`;
        }
        if (days === undefined) {
            return "检测到执行天数数值缺失，请检查输入";
        }
    }
    return [mark, startLevel, startExp, endLevel, endExp, cafe, jjc, card, breakDia, days];
}
exports.getLevelMessage = getLevelMessage;
