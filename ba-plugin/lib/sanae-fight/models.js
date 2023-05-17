"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binah_model = exports.himari_model = exports.ako_model = exports.ui_model = exports.akane_model = exports.maki_model = exports.mika_model = void 0;
const class_1 = require("./class");
const class_2 = require("./class");
const class_3 = require("./class");
const class_4 = require("./class");
const class_5 = require("./class");
const class_6 = require("./class");
const class_7 = require("./class");
const class_8 = require("./class");
const class_9 = require("./class");
const class_10 = require("./class");
const equipments_1 = require("./equipments");
const equipments_2 = require("./equipments");
const equipments_3 = require("./equipments");
const equipments_4 = require("./equipments");
const equipments_5 = require("./equipments");
const equipments_6 = require("./equipments");
const equipments_7 = require("./equipments");
const equipments_8 = require("./equipments");
// 创建一个占位用倍率公式，用于buff类技能伤害函数占位，输出为0
function zero(atk) {
    return 0;
}
// 建立mika模型
// mika的好感度计算公式
function mika_relationship_func(hearts) {
    if (hearts == 1) {
        return [0, 0, 0, 0];
    }
    else if (hearts <= 5 && hearts >= 2) {
        return [0, 3 * (hearts - 1), 0, 0];
    }
    else if (hearts <= 10 && hearts >= 6) {
        return [0, 12 + 4 * (hearts - 5), 0, 0];
    }
    else if (hearts <= 15 && hearts >= 11) {
        return [85 * (hearts - 10), 32 + 5 * (hearts - 10), 0, 0];
    }
    else if (hearts <= 20 && hearts >= 16) {
        return [425 + 102 * (hearts - 15), 57 + 7 * (hearts - 15), 0, 0];
    }
    else if (hearts <= 30 && hearts >= 21) {
        return [935 + 18 * (hearts - 20), 92 + 2 * (hearts - 20), 0, 0];
    }
    else if (hearts <= 40 && hearts >= 31) {
        return [1115 + 27 * (hearts - 30), 112 + 3 * (hearts - 30), 0, 0];
    }
    else if (hearts <= 50 && hearts >= 41) {
        return [1385 + 44 * (hearts - 40), 142 + 4 * (hearts - 40), 0, 0];
    }
    else {
        return [0, 0, 0, 0];
    }
}
// mika的普攻倍率
function mika_atk(atk) {
    return atk;
}
// mika的ex倍率，输出面板伤害。该技能存在额外修正，在使用时要注意，并且实际造成的伤害要比修正过后的低一些
function mika_ex(atk) {
    return 15.4 * atk * 0.775;
}
// mika的basic倍率，存在两种技能形态，伤害不统一
function mika_basic1(atk) {
    return 1.69 * atk;
}
function mika_basic2(atk) {
    return (1.69 + 3.39) * atk;
}
// mika的属性
let mikaStars = 7;
const mika_stars = new class_3.Stars(mikaStars, { 3: [32833, 2610, 4505], 4: [35472, 2910, 4966], 5: [39756, 3273, 5541] });
let mikaHearts = 20;
const mika_relationship = new class_4.Relationship(mikaHearts, mika_relationship_func);
const mika_status = new class_5.Status(32833, 2610, 115, 4505, 111, 1417, 25, 100, 2, 0.5, 1376, 450, 100, 100, 1);
const mika_properties = new class_1.Property("striker", "attacker", "front", "圣三一", "茶话会", "yellow", "red", "SMG", 25, 5, 5, { "street": "D", "outdoor": "A", "indoor": "S" });
const mika_exclusive_weapon = new class_6.Exclusive_weapon(50, { "hp_max_plus": [3530, 4413, 5295], "atk_plus": [396, 495, 594],
    "healing_plus": [0, 0, 0] }, { "restrain_rate_plus": 0.494 }, { "indoor": "SS" });
const mika_equipments = [equipments_1.hat_t7, equipments_5.badge_t7, equipments_6.watch_t7];
const mika_favorate = new class_1.Favorite();
const mika_attack = new class_8.Attack(0.77, 1.75, 2.2, 0.67, 0.53, mika_atk);
const mika_ex_skill = new class_7.Skill("Kyrie Eleison", 6, mika_ex, {}, {}, 4.25, 2);
const mika_basic_skill = new class_7.Skill("星の呼び声", 0, mika_basic1, {}, {}, 0.75, 1.5, "", mika_basic2);
const mika_passive_skill = new class_7.Skill("Gloria Patri", 0, zero, { "atk_multi": 0.266 }, {}, 66666, 0);
const mika_sub_skill = new class_7.Skill("Benedictio", 0, zero, { "critical_change": 66666, "caused_damage_rate": 1.242,
    "received_damage_rate": 0.879 }, {}, 66666, 0);
const mika_skills = [mika_ex_skill, mika_basic_skill, mika_passive_skill, mika_sub_skill];
let mika_level = 85;
exports.mika_model = new class_1.Student("未花", mika_stars, mika_level, mika_relationship, mika_status, mika_properties, mika_equipments, mika_exclusive_weapon, mika_favorate, mika_attack, mika_skills, 6.0);
// 建立maki模型
// maki的好感度计算公式
function maki_relationship_func(hearts) {
    if (hearts == 1) {
        return [0, 0, 0, 0];
    }
    else if (hearts >= 2 && hearts <= 5) {
        return [0, 2 * (hearts - 1), 0, 0];
    }
    else if (hearts >= 6 && hearts <= 10) {
        return [0, 8 + 3 * (hearts - 5), 0, 0];
    }
    else if (hearts >= 11 && hearts <= 15) {
        return [50 * (hearts - 10), 23 + 5 * (hearts - 10), 0, 0];
    }
    else if (hearts >= 16 && hearts <= 20) {
        return [250 + 60 * (hearts - 15), 48 + 6 * (hearts - 15), 0, 0];
    }
    else if (hearts >= 21 && hearts <= 30) {
        return [550 + 10 * (hearts - 20), 78 + 1 * (hearts - 20), 0, 0];
    }
    else if (hearts >= 31 && hearts <= 40) {
        return [650 + 16 * (hearts - 30), 88 + 2 * (hearts - 30), 0, 0];
    }
    else if (hearts >= 41 && hearts <= 50) {
        return [810 + 26 * (hearts - 40), 108 + 4 * (hearts - 40), 0, 0];
    }
    else {
        return [0, 0, 0, 0];
    }
}
// maki的普攻倍率，由于4技能追伤影响普攻，因此有两个倍率
function maki_atk1(atk) {
    return atk;
}
function maki_atk2(atk) {
    return (1 + 5 * 0.283) * atk;
}
// maki的ex倍率, 由于4技能追伤影响ex技能，因此有两个倍率
function maki_ex1(atk) {
    return 10.81 * atk;
}
function maki_ex2(atk) {
    return (10.81 + 5 * 0.283) * atk;
}
let makiStars = 7;
const maki_stars = new class_3.Stars(makiStars, { 3: [19243, 2387, 4360], 4: [20790, 2661, 4805], 5: [23195, 2993, 5361] });
const maki_heart = 20;
const maki_relationship = new class_4.Relationship(maki_heart, maki_relationship_func);
const maki_status = new class_5.Status(19243, 2387, 426, 4360, 98, 196, 245, 100, 2, 0.5, 1424, 750, 100, 100, 1);
const maki_properties = new class_1.Property("striker", "attacker", "back", "千年", "真理部", "yellow", "red", "MG", 45, 15, 5, { "street": "C", "outdoor": "S", "indoor": "C" });
const maki_exclusive_weapon = new class_6.Exclusive_weapon(50, { "hp_max_plus": [2086, 2608, 3129], "atk_plus": [362, 453, 543],
    "healing_plus": [0, 0, 0] }, { "atk_speed_plus": 2660 }, { "outdoor": "SS" });
const maki_equipments = [equipments_2.gloves_t7, equipments_4.hairpin_t7, equipments_6.watch_t7];
const maki_favorate = new class_1.Favorite();
const maki_attack = new class_8.Attack(0.67, 1.55, 1.73, 0.67, 1, maki_atk1, maki_atk2);
const maki_ex_skill = new class_7.Skill("世界をもっと色鮮やかに！", 5, maki_ex1, { "atk_multi": 0.545 }, {}, 2.8, 1, "", maki_ex2);
const maki_basic_skill = new class_7.Skill("くらえ、ペイントボール！", 0, zero, {}, { "defence_multi": -0.348, "marked_by_maki": 15 }, 1.5, 1);
const maki_passive_skill = new class_7.Skill("芸術的な演出", 0, zero, { "atk_speed_multi": 0.266 }, {}, 66666, 0);
const maki_sub_skill = new class_7.Skill("芸術の苦しみ", 0, zero, { "dmg_add": 0.283 }, {}, 66666, 0);
const maki_skills = [maki_ex_skill, maki_basic_skill, maki_passive_skill, maki_sub_skill];
let maki_level = 85;
exports.maki_model = new class_1.Student("真纪", maki_stars, maki_level, maki_relationship, maki_status, maki_properties, maki_equipments, maki_exclusive_weapon, maki_favorate, maki_attack, maki_skills, 4.8, 26.8);
// 建立akane模型
// akane的好感度计算公式
function akane_relationship_func(hearts) {
    if (hearts == 1) {
        return [0, 0, 0, 0];
    }
    else if (2 <= hearts && hearts <= 5) {
        return [0, 1 * (hearts - 1), 0, 0];
    }
    else if (6 <= hearts && hearts <= 10) {
        return [0, 4 + 1 * (hearts - 5), 0, 0];
    }
    else if (11 <= hearts && hearts <= 15) {
        return [64 * (hearts - 10), 9 + 2 * (hearts - 10), 0, 0];
    }
    else if (16 <= hearts && hearts <= 20) {
        return [320 + 77 * (hearts - 15), 19 + 2 * (hearts - 15), 0, 0];
    }
    else if (21 <= hearts && hearts <= 30) {
        return [705 + 13 * (hearts - 20), 29 + 1 * (hearts - 20), 0, 0];
    }
    else if (31 <= hearts && hearts <= 40) {
        return [835 + 20 * (hearts - 30), 39 + 1 * (hearts - 30), 0, 0];
    }
    else if (41 <= hearts && hearts <= 50) {
        return [1035 + 34 * (hearts - 40), 49 + 1 * (hearts - 40), 0, 0];
    }
    else {
        return [0, 0, 0, 0];
    }
}
// akane的普攻倍率
function akane_atk(atk) {
    return atk;
}
// akane的basic技能倍率
function akane_basic(atk) {
    return 7.53 * atk;
}
// akane的ex技能倍率
function akane_ex(atk) {
    return 8.76 * atk;
}
let akaneStars = 7;
const akane_stars = new class_3.Stars(akaneStars, { 2: [23151, 934, 4133], 3: [24694, 1036, 4517], 4: [26679, 1155, 4978], 5: [29765, 1299, 5555] }, 2);
const akane_heart = 20;
const akane_relationship = new class_4.Relationship(akane_heart, akane_relationship_func);
const akane_status = new class_5.Status(23151, 934, 102, 4133, 101, 1119, 203, 100, 2, 0.5, 980, 550, 100, 100, 1, 6);
const akane_properties = new class_1.Property("striker", "supporter", "middle", "千年", "C&C", "yellow", "red", "HG", 6, 6, 1, { "street": "A", "outdoor": "A", "indoor": "D" });
const akane_exclusive_weapon = new class_6.Exclusive_weapon(50, { "hp_max_plus": [2396, 2995, 3594], "atk_plus": [142, 177, 212],
    "healing_plus": [0, 0, 0] }, { "hp_max_plus": 6713 }, { "indoor": "B" });
const akane_equipments = [equipments_3.boots_t7, equipments_4.hairpin_t7, equipments_8.necklace_t7];
const akane_favorate = new class_1.Favorite();
const akane_attack = new class_8.Attack(0.67, 0.67, 1.87, 0.67, 0.53, akane_atk);
const akane_ex_skill = new class_7.Skill("優雅に排除します", 2, akane_ex, {}, { "defence_multi": -0.377 }, 2, 1);
const akane_basic_skill = new class_7.Skill("上品に貫きます", 0, akane_basic, {}, {}, 2, 1);
const akane_passive_skill = new class_7.Skill("速やかに前進します", 0, zero, { "move_speed_multi": 0.266 }, {}, 66666, 0);
const akane_sub_skill = new class_7.Skill("的確に制圧します", 0, zero, {}, { "evasion_multi": -0.127 }, 0.67, 0);
const akane_skills = [akane_ex_skill, akane_basic_skill, akane_passive_skill, akane_sub_skill];
let akane_level = 85;
exports.akane_model = new class_1.Student("茜", akane_stars, akane_level, akane_relationship, akane_status, akane_properties, akane_equipments, akane_exclusive_weapon, akane_favorate, akane_attack, akane_skills, 4.0, 41.8);
// 建立ui模型
// ui的好感度函数
function ui_relationship_func(hearts) {
    if (hearts == 1) {
        return [0, 0, 0, 0];
    }
    else if (2 <= hearts && hearts <= 5) {
        return [19 * (hearts - 1), 0, 0, 0];
    }
    else if (6 <= hearts && hearts <= 10) {
        return [76 + 28 * (hearts - 5), 0, 0, 0];
    }
    else if (11 <= hearts && hearts <= 15) {
        return [216 + 37 * (hearts - 10), 6 * (hearts - 10), 0, 0];
    }
    else if (16 <= hearts && hearts <= 20) {
        return [401 + 47 * (hearts - 15), 30 + 7 * (hearts - 15), 0, 0];
    }
    else if (21 <= hearts && hearts <= 30) {
        return [636 + 12 * (hearts - 20), 65 + 1 * (hearts - 20), 0, 0];
    }
    else if (31 <= hearts && hearts <= 40) {
        return [756 + 18 * (hearts - 30), 75 + 2 * (hearts - 30), 0, 0];
    }
    else if (41 <= hearts && hearts <= 50) {
        return [936 + 30 * (hearts - 40), 95 + 3 * (hearts - 40), 0, 0];
    }
    else {
        return [0, 0, 0, 0];
    }
}
// ui的攻击倍率
function ui_atk(atk) {
    return atk;
}
let uiStars = 6;
const ui_stars = new class_3.Stars(uiStars, { 3: [18050, 2516, 4639], 4: [19501, 2805, 5113], 5: [21757, 3155, 5705] });
const ui_heart = 20;
const ui_relationship = new class_4.Relationship(ui_heart, ui_relationship_func);
const ui_status = new class_5.Status(18050, 2516, 100, 4639, 941, 190, 209, 100, 2, 0.5, 1908, 750, 100, 100, 1, 7);
const ui_properties = new class_1.Property("striker", "supporter", "back", "圣三一", "图书委员会", "red", "red", "SR", 7, 7, 1, { "street": "B", "outdoor": "S", "indoor": "D" });
const ui_exclusive_weapon = new class_6.Exclusive_weapon(50, { "hp_max_plus": [1957, 2446, 2935],
    "atk_plus": [381, 477, 572], "healing_plus": [0, 0, 0] }, { "critical_plus": 190 }, { "outdoor": "SS" });
const ui_equipments = [equipments_2.gloves_t7, equipments_4.hairpin_t7, equipments_7.amulet_t7];
const ui_favorate = new class_1.Favorite();
const ui_attack = new class_8.Attack(1.4, 1.33, 2.47, 0.5, 0.53, ui_atk);
const ui_ex_skill = new class_7.Skill("古書の専門家", 3, zero, { "cost_multi": 0.5, "atk_multi": 0.161 }, {}, 2, 0);
const ui_basic_skill = new class_7.Skill("伝授されていく知識", 0, zero, { "critical_multi": 0.259 }, {}, 1.5, 0);
const ui_passive_skill = new class_7.Skill("専門家の知見", 0, zero, { "critical_multi": 0.266 }, {}, 66666, 0);
const ui_sub_skill = new class_7.Skill("神経過敏", 0, zero, { "atk_speed_multi": 0.459 }, {}, 0, 0);
const ui_skills = [ui_ex_skill, ui_basic_skill, ui_passive_skill, ui_sub_skill];
let ui_level = 85;
exports.ui_model = new class_1.Student("忧", ui_stars, ui_level, ui_relationship, ui_status, ui_properties, ui_equipments, ui_exclusive_weapon, ui_favorate, ui_attack, ui_skills, 5.5, 41.8);
// 建立简单的亚子与日鞠模型,部分参数置零或用ui模型中参数替代，该部分不参与任何计算，仅作为占位
const placeholder1 = { 0: [0, 0, 0] };
const placeholder2 = new class_4.Relationship(0, ui_relationship_func);
const placeholder3 = new class_5.Status(18050, 2516, 100, 4639, 941, 190, 209, 100, 2, 0.5, 1908, 750, 100, 100, 1, 7);
const placeholder4 = [equipments_2.gloves_t7, equipments_4.hairpin_t7, equipments_7.amulet_t7];
const placeholder5 = new class_8.Attack(0, 0, 0, 0, 0, zero);
const placeholder6 = [ui_ex_skill, ui_basic_skill, ui_passive_skill, ui_sub_skill];
exports.ako_model = new class_1.Student("亚子", new class_3.Stars(5, placeholder1), 85, placeholder2, placeholder3, ui_properties, placeholder4, ui_exclusive_weapon, ui_favorate, placeholder5, placeholder6);
exports.himari_model = new class_1.Student("日鞠", new class_3.Stars(6, placeholder1), 85, placeholder2, placeholder3, ui_properties, placeholder4, ui_exclusive_weapon, ui_favorate, placeholder5, placeholder6);
// 建立简单的大蛇模型
const binah_status = new class_9.Boss_status(7000000, 20000, 5000, 0, 1300, 100, 200, 20, 2, 0.8, 300, 3000, 2100000, 10, "yellow", "yellow", "outdoor", { "outdoor": "D" });
const binah_attack = new class_10.Boss_attack(1, 2.566, 2.168);
exports.binah_model = new class_2.Boss("Binah", "INSANE", binah_status, binah_attack, undefined);
