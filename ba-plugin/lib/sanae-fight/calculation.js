"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caused_dmg_correct = exports.accuracy_correct = exports.boss_dmg_res_correct = exports.critical_correct = exports.def_correct = exports.stability_correct = exports.level_correct = exports.armor_correct = exports.land_form_correct = void 0;
const class_1 = require("./class");
// 伤害计算
// 地形补正函数，输入适应性评级（"A"之类），输出倍率
function land_form_correct(adaption) {
    if (adaption === "SS") {
        return 1.3;
    }
    else if (adaption === "S") {
        return 1.2;
    }
    else if (adaption === "A") {
        return 1.1;
    }
    else if (adaption === "B") {
        return 1.0;
    }
    else if (adaption === "C") {
        return 0.9;
    }
    else if (adaption === "D") {
        return 0.8;
    }
    else {
        return 0;
    }
}
exports.land_form_correct = land_form_correct;
// 装甲补正函数，输入攻击类型与防御类型，输出倍率
function armor_correct(atk_type, def_type) {
    if (atk_type === "red") {
        if (def_type === "red") {
            return 2;
        }
        else if (def_type === "purple" || "blue") {
            return 0.5;
        }
        else {
            return 1;
        }
    }
    else if (atk_type === "yellow") {
        if (def_type === "red") {
            return 0.5;
        }
        else if (def_type === "yellow") {
            return 2;
        }
        else {
            return 1;
        }
    }
    else if (atk_type === "blue") {
        if (def_type === "yellow") {
            return 0.5;
        }
        else if (def_type === "blue") {
            return 2;
        }
        else {
            return 1;
        }
    }
    else if (atk_type === "purple") {
        if (def_type === "yellow") {
            return 0.5;
        }
        else if (def_type === "purple") {
            return 2;
        }
        else {
            return 1;
        }
    }
    else {
        return 0;
    }
}
exports.armor_correct = armor_correct;
// 等级差补正函数，如果攻击者的等级低于防御者，每一级减少造成的伤害2%，最高60%。输入两方的等级，输出倍率
function level_correct(atk_lv, def_lv) {
    if (atk_lv >= def_lv) {
        return 1;
    }
    else {
        let rate = 1 - 0.02 * (def_lv - atk_lv);
        if (rate <= 0.4) {
            return 0.4;
        }
        else {
            return rate;
        }
    }
}
exports.level_correct = level_correct;
// 安定浮动补正函数，以随机数控制安定幅度，输如当前安定值和随机数，输出倍率（有0.2的基础安定倍率）
function stability_correct(stability, face) {
    let lim_lower = stability / (stability + 1000) + 0.2;
    let lim_upper = 1;
    if (lim_lower < 1) {
        return face * (lim_upper - lim_lower) + lim_lower;
    }
    else {
        return 1;
    }
}
exports.stability_correct = stability_correct;
// 防御力补正函数，输入防御者的防御力，输出其受伤倍率（1-防御减伤倍率）
function def_correct(defence) {
    return 1 - defence / (defence + 1666.66);
}
exports.def_correct = def_correct;
// 暴击率与暴击伤害补正函数，输入攻击者的暴击爆伤，防御者的爆抗爆伤抗，以及随机数，输出倍率（若不暴击就是1）
function critical_correct(atk_critical, atk_critical_dmg, def_critical_res, def_critical_dmg_res, face) {
    let critical_rate = (atk_critical - def_critical_res) / (atk_critical - def_critical_res + 666.66);
    let critical_dmg_rate = (atk_critical_dmg - def_critical_dmg_res) / 10000;
    // 必暴修正，认为66666暴击是必定暴击
    if (atk_critical === 66666) {
        return critical_dmg_rate;
    }
    if (face <= critical_rate && critical_rate !== 66666) {
        return critical_dmg_rate;
    }
    else {
        return 1;
    }
}
exports.critical_correct = critical_correct;
// boss自带减伤率补正函数，输入boss减伤率，输出其受伤倍率（1-减伤率）
function boss_dmg_res_correct(boss_dmg_res) {
    return 1 - boss_dmg_res;
}
exports.boss_dmg_res_correct = boss_dmg_res_correct;
// 命中率补正函数，输入攻击者的命中，防御者的闪避，以及随机数，输出倍率（未命中为0）
function accuracy_correct(accuracy, evasion, face) {
    let accuracy_rate = 1;
    if (accuracy > evasion) {
        accuracy_rate = 1;
    }
    else {
        accuracy_rate = 700 / (evasion - accuracy + 700);
    }
    if (face <= accuracy_rate) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.accuracy_correct = accuracy_correct;
// 学生造成总伤害修正，输入学生类实例，boss类实例，3个独立随机数，输出总伤害修正倍率
function caused_dmg_correct(attacker, defender, stability_face, critical_face, accuracy_face) {
    let land_form = defender.status.land_form;
    let attacker_land_adaption = attacker.properties.adaption[land_form];
    let attacker_land_correct_rate = land_form_correct(attacker_land_adaption);
    let attacker_arm_correct_rate = armor_correct(attacker.properties.atk_type, defender.status.def_type);
    // 特攻修正
    if (attacker instanceof class_1.Student) {
        if (attacker.status.others["restrain_rate_plus"] && attacker_arm_correct_rate >= 1.9) {
            attacker_arm_correct_rate += attacker.status.others["restrain_rate_plus"];
        }
    }
    let attacker_level_correct_rate = level_correct(85, 80);
    let attacker_stability_correct_rate = stability_correct(attacker.status.stability, stability_face);
    let attacker_penetrate_def_dmg_rate = def_correct(defender.status.defence);
    let attacker_crit_dmg_rate = critical_correct(attacker.status.critical, attacker.status.critical_dmg, defender.status.critical_res, defender.status.critical_dmg_res, critical_face);
    let attacker_penetrate_dmg_resist_rate = boss_dmg_res_correct(defender.status.received_dmg_res);
    let attacker_accuracy_correct_rate = accuracy_correct(attacker.status.accuracy, defender.status.evasion, accuracy_face);
    let attacker_dmg_rate_total = attacker_land_correct_rate * attacker_arm_correct_rate * attacker_level_correct_rate *
        attacker_stability_correct_rate * attacker_penetrate_def_dmg_rate * attacker_crit_dmg_rate *
        attacker_penetrate_dmg_resist_rate * attacker_accuracy_correct_rate;
    // 特殊乘区补正——mika
    if (attacker.status.others["caused_damage_rate"] !== undefined) {
        attacker_dmg_rate_total = attacker_dmg_rate_total * attacker.status.others["caused_damage_rate"];
    }
    return attacker_dmg_rate_total;
}
exports.caused_dmg_correct = caused_dmg_correct;
