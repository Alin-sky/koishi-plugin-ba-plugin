"use strict";
//sanae’s ba-Calculate the required favourability value v2 2023
Object.defineProperty(exports, "__esModule", { value: true });
exports.favorCalculate = exports.getFavorLv = exports.calculate_numer = void 0;
const expRequirement = {
    1: 15, 2: 30, 3: 30, 4: 35, 5: 35, 6: 35, 7: 40, 8: 40, 9: 40, 10: 60, 11: 90, 12: 105, 13: 120, 14: 140, 15: 160, 16: 180, 17: 205,
    18: 230, 19: 255, 20: 285, 21: 315, 22: 345, 23: 375, 24: 410, 25: 445, 26: 480, 27: 520, 28: 560, 29: 600, 30: 645, 31: 690, 32: 735,
    33: 780, 34: 830, 35: 880, 36: 930, 37: 985, 38: 1040, 39: 1095, 40: 1155, 41: 1215, 42: 1275, 43: 1335, 44: 1400, 45: 1465, 46: 1530,
    47: 1600, 48: 1670, 49: 1740, 50: 1815, 51: 1890, 52: 1965, 53: 2040, 54: 2120, 55: 2200, 56: 2280, 57: 2365, 58: 2450, 59: 2535,
    60: 2625, 61: 2715, 62: 2805, 63: 2895, 64: 2990, 65: 3085, 66: 3180, 67: 3280, 68: 3380, 69: 3480, 70: 3585, 71: 3690, 72: 3795,
    73: 3900, 74: 4010, 75: 4120, 76: 4230, 77: 4345, 78: 4460, 79: 4575, 80: 4695, 81: 4815, 82: 4935, 83: 5055, 84: 5180, 85: 5305,
    86: 5430, 87: 5560, 88: 5690, 89: 5820, 90: 5955, 91: 6090, 92: 6225, 93: 6360, 94: 6500, 95: 6640, 96: 6780, 97: 6925, 98: 7070,
    99: 7215, 100: 7365
};
const expSupply = {
    "  -摸头": 15,
    "  -课程表（满级期望值）": 31.25,
    "  -金色礼物（普通）": 20,
    "  -金色礼物（笑脸）": 40,
    "  -金色礼物（大笑脸）": 60,
    "  -紫色礼物（笑脸）": 60,
    "  -紫色礼物（大笑脸）": 180,
    "  -紫色礼物（爱心脸）": 240,
};
function sumFavorablility(startLevel, endLevel) {
    let sum = 0;
    for (let key in expRequirement) {
        let level = parseInt(key, 10);
        if (level >= startLevel && level < endLevel) {
            sum += expRequirement[level];
        }
    }
    return [sum, startLevel, endLevel];
}
// 好感度获取计算
function calculate(exp) {
    let result = [`好感度从${exp[1]}级到${exp[2]}级，总计经验${exp[0]}，共需：\n`];
    const keys = Object.keys(expSupply);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let count = Math.ceil(exp[0] / expSupply[key]);
        if (key == "  -摸头" || key == "  -课程表（满级期望值）") {
            result.push(`${key}:${count}次${i < keys.length - 1 ? '  或者' : ''}\n`);
        }
        else {
            result.push(`${key}:${count}个${i < keys.length - 1 ? '  或者' : ''}\n`);
        }
    }
    return result;
}
//只返回所需个数，魔改上面的函数，用于好感计算v2版
function calculate_numer(startLevel, endLevel) {
    const exp = sumFavorablility(startLevel, endLevel);
    const keys = Object.keys(expSupply);
    const num = [exp[0], exp[1], exp[2]];
    for (let i = 0; i < keys.length; i++) {
        num.push(Math.ceil(exp[0] / expSupply[keys[i]]));
    }
    return num;
}
exports.calculate_numer = calculate_numer;
function getFavorLv(input) {
    let startLevel = 1;
    let endLevel = 100;
    const levelRegex = /(\d+(?:\.\d+)?)/g;
    const levelMatch = input.match(levelRegex);
    if (levelMatch) {
        if (levelMatch.length == 1) {
            if (Number.isInteger(parseFloat(levelMatch[0]))) {
                if (parseInt(levelMatch[0]) >= 1) {
                    if (parseInt(levelMatch[0]) <= 100) {
                        endLevel = parseInt(levelMatch[0]);
                    }
                    else {
                        return "哼～最高好感度无法超过100级！";
                    }
                }
                else {
                    return "好感度最低为1级！";
                }
            }
            else {
                return "好感度等级只能是整数！";
            }
        }
        else {
            if (Number.isInteger(parseFloat(levelMatch[0]))) {
                if (parseInt(levelMatch[0]) >= 1) {
                    if (parseInt(levelMatch[0]) <= 100) {
                        startLevel = parseInt(levelMatch[0]);
                    }
                    else {
                        return "哼～最高好感度无法超过100级！";
                    }
                }
                else {
                    return "好感度最低为1级！";
                }
            }
            else {
                return "好感度等级只能是整数！";
            }
            if (Number.isInteger(parseFloat(levelMatch[1]))) {
                if (parseInt(levelMatch[1]) >= parseInt(levelMatch[0])) {
                    if (parseInt(levelMatch[1]) <= 100) {
                        endLevel = parseInt(levelMatch[1]);
                    }
                    else {
                        return "哼～最高好感度无法超过100级！";
                    }
                }
                else {
                    return "目标好感度必须高于起始好感度！";
                }
            }
            else {
                return "好感度等级只能是整数！";
            }
        }
    }
    else {
        return "未匹配到好感度值";
    }
    return [startLevel, endLevel];
}
exports.getFavorLv = getFavorLv;
// 计算好感度需求
function favorCalculate(startLevel, endLevel) {
    return calculate(sumFavorablility(startLevel, endLevel));
}
exports.favorCalculate = favorCalculate;
