import { Equipment } from "./class";

// 创建t7装备库
export const hat_t7 = new Equipment("hat", 7, {"atk_multi": 0.4, "critical_dmg_plus": 1800});
export const gloves_t7 = new Equipment("gloves", 7, {"atk_multi": 0.35, "critical_plus": 350, "accuracy_plus": 200});
export const boots_t7 = new Equipment("boots", 7, {"atk_multi": 0.3, "hp_max_multi": 0.135});
export const bag_t7 = new Equipment("bag", 7, {"hp_max_plus": 7500, "defence_plus": 1300});
export const hairpin_t7 = new Equipment("hairpin", 7, {"hp_max_plus": 6500, "cc_res_multi": 0.28});
export const badge_t7 = new Equipment("badge", 7, {"hp_max_plus": 9500, "recovery_plus": 3200, "hp_max_multi": 0.22, "evasion_plus": 400});
export const watch_t7 = new Equipment("watch", 7, {"critical_plus": 360, "critical_dmg_plus": 2100, "hp_max_multi": 0.09});
export const amulet_t7 = new Equipment("amulet", 7, {"critical_res_plus": 360, "critical_dmg_res_plus": 2100, "critical_plus": 180});
export const necklace_t7 = new Equipment("necklace", 7, {"healing_multi": 0.35, "cc_power_multi": 0.35, "atk_multi": 0.08});