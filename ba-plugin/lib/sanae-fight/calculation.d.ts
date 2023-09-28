import { Student } from "./class";
import { Boss } from "./class";
export declare function land_form_correct(adaption: string): number;
export declare function armor_correct(atk_type: string, def_type: string): number;
export declare function level_correct(atk_lv: number, def_lv: number): number;
export declare function stability_correct(stability: number, face: number): number;
export declare function def_correct(defence: number): number;
export declare function critical_correct(atk_critical: number, atk_critical_dmg: number, def_critical_res: number, def_critical_dmg_res: number, face: number): number;
export declare function boss_dmg_res_correct(boss_dmg_res: number): number;
export declare function accuracy_correct(accuracy: number, evasion: number, face: number): number;
export declare function caused_dmg_correct(attacker: Student, defender: Boss, stability_face: number, critical_face: number, accuracy_face: number): number;