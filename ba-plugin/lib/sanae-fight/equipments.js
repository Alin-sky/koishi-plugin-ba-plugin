"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necklace_t7 = exports.amulet_t7 = exports.watch_t7 = exports.badge_t7 = exports.hairpin_t7 = exports.bag_t7 = exports.boots_t7 = exports.gloves_t7 = exports.hat_t7 = void 0;
const class_1 = require("./class");
// 创建t7装备库
exports.hat_t7 = new class_1.Equipment("hat", 7, { "atk_multi": 0.4, "critical_dmg_plus": 1800 });
exports.gloves_t7 = new class_1.Equipment("gloves", 7, { "atk_multi": 0.35, "critical_plus": 350, "accuracy_plus": 200 });
exports.boots_t7 = new class_1.Equipment("boots", 7, { "atk_multi": 0.3, "hp_max_multi": 0.135 });
exports.bag_t7 = new class_1.Equipment("bag", 7, { "hp_max_plus": 7500, "defence_plus": 1300 });
exports.hairpin_t7 = new class_1.Equipment("hairpin", 7, { "hp_max_plus": 6500, "cc_res_multi": 0.28 });
exports.badge_t7 = new class_1.Equipment("badge", 7, { "hp_max_plus": 9500, "recovery_plus": 3200, "hp_max_multi": 0.22, "evasion_plus": 400 });
exports.watch_t7 = new class_1.Equipment("watch", 7, { "critical_plus": 360, "critical_dmg_plus": 2100, "hp_max_multi": 0.09 });
exports.amulet_t7 = new class_1.Equipment("amulet", 7, { "critical_res_plus": 360, "critical_dmg_res_plus": 2100, "critical_plus": 180 });
exports.necklace_t7 = new class_1.Equipment("necklace", 7, { "healing_multi": 0.35, "cc_power_multi": 0.35, "atk_multi": 0.08 });
