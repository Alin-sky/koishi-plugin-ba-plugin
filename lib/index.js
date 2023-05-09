"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = exports.jsx_runtime_1 = void 0;
const koishi_1 = require("koishi");
const data_1 = require("./data/data");
const test_1 = require("./data/test");
//
exports.jsx_runtime_1 = require("@satorijs/element/jsx-runtime");
exports.name = "ba-plugin";
exports.usage = "## 角色测评数据来源于<a href=\"https://ba.gamekee.com/\">bawiki</a>\n" +
    "更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
    "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)，\n" +
    " - 新增了群友早苗开发的总力战模拟功能";
exports.Config = koishi_1.Schema.object({});
// 星级类
class Stars {
    constructor(stars, status, basic_stars = 3) {
        this.stars = stars;
        this.status = status;
        this.basic_stars = basic_stars;
    }
}
// 创建好感度类，用于接入学生类
class Relationship {
    constructor(relationship, bonus_func) {
        this.relationship = relationship;
        this.bonus_func = bonus_func;
    }
}
class Status {
    constructor(hp_max, atk, defence, healing, accuracy, evasion, critical, critical_res, critical_dmg, critical_dmg_res, stability, shoot_range, cc_power, cc_res, recovery, mag_count, atk_type, def_type, adaption, others, hp_now = -1) {
        this.hp_max = hp_max;
        this.atk = atk;
        this.defence = defence;
        this.healing = healing;
        this.accuracy = accuracy;
        this.evasion = evasion;
        this.critical = critical;
        this.critical_res = critical_res;
        this.critical_dmg = critical_dmg * 10000;
        this.critical_dmg_res = critical_dmg_res * 10000;
        this.stability = stability;
        this.shoot_range = shoot_range;
        this.cc_power = cc_power;
        this.cc_res = cc_res;
        this.recovery = recovery;
        this.mag_count = mag_count;
        this.atk_type = atk_type;
        this.def_type = def_type;
        this.adaption = adaption;
        this.others = others;
        this.hp_max1 = hp_max;
        this.atk1 = atk;
        this.defence1 = defence;
        this.healing1 = healing;
        this.accuracy1 = accuracy;
        this.evasion1 = evasion;
        this.critical1 = critical;
        this.critical_res1 = critical_res;
        this.critical_dmg1 = critical_dmg;
        this.critical_dmg_res1 = critical_dmg_res;
        this.stability1 = stability;
        this.shoot_range1 = shoot_range;
        this.cc_power1 = cc_power;
        this.cc_res1 = cc_res;
        this.recovery1 = recovery;
        this.mag_count1 = mag_count;
        this.atk_type1 = atk_type;
        this.def_type1 = def_type;
        this.adaption1 = adaption;
        this.others1 = others;
        this.hp_now = hp_now;
        if (hp_now == -1) {
            this.hp_now = this.hp_max;
        }
    }
    // 用于记录基础属性的函数
    record() {
        this.hp_max1 = this.hp_max;
        this.atk1 = this.atk;
        this.defence1 = this.defence;
        this.healing1 = this.healing;
        this.accuracy1 = this.accuracy;
        this.evasion1 = this.evasion;
        this.critical1 = this.critical;
        this.critical_res1 = this.critical_res;
        this.critical_dmg1 = this.critical_dmg;
        this.critical_dmg_res1 = this.critical_dmg_res;
        this.stability1 = this.stability;
        this.shoot_range1 = this.shoot_range;
        this.cc_power1 = this.cc_power;
        this.cc_res1 = this.cc_res;
        this.recovery1 = this.recovery;
        this.mag_count1 = this.mag_count;
        this.atk_type1 = this.atk_type;
        this.def_type1 = this.def_type;
        this.adaption1 = this.adaption;
        this.others1 = this.others;
    }
    // 用于更新buff的函数
    update_buff_status(buff) {
        let dict_sums = {};
        for (let dict_item of buff) {
            for (let [key, value] of Object.entries(dict_item)) {
                if (key in dict_sums) {
                    dict_sums[key] += value;
                }
                else {
                    dict_sums[key] = value;
                }
            }
        }
        if (dict_sums["hp_max_plus"] !== undefined) {
            this.hp_max += dict_sums["hp_max_plus"];
            delete dict_sums["hp_max_plus"];
        }
        if (dict_sums["hp_max_multi"] !== undefined) {
            this.hp_max *= (1 + dict_sums["hp_max_multi"]);
            delete dict_sums["hp_max_multi"];
        }
        if (dict_sums["atk_plus"] !== undefined) {
            this.atk += dict_sums["atk_plus"];
            delete dict_sums["atk_plus"];
        }
        if (dict_sums["atk_multi"] !== undefined) {
            this.atk *= (1 + dict_sums["atk_multi"]);
            delete dict_sums["atk_multi"];
        }
        if (dict_sums["defence_plus"] !== undefined) {
            this.defence += dict_sums["defence_plus"];
            delete dict_sums["defence_plus"];
        }
        if (dict_sums["defence_multi"] !== undefined) {
            this.defence *= (1 + dict_sums["defence_multi"]);
            delete dict_sums["defence_multi"];
        }
        if (dict_sums["healing_plus"] !== undefined) {
            this.healing += dict_sums["healing_plus"];
            delete dict_sums["healing_plus"];
        }
        if (dict_sums["healing_multi"] !== undefined) {
            this.healing *= (1 + dict_sums["healing_multi"]);
            delete dict_sums["healing_multi"];
        }
        if (dict_sums["accuracy_plus"] !== undefined) {
            this.accuracy += dict_sums["accuracy_plus"];
            delete dict_sums["accuracy_plus"];
        }
        if (dict_sums["accuracy_multi"] !== undefined) {
            this.accuracy *= (1 + dict_sums["accuracy_multi"]);
            delete dict_sums["accuracy_multi"];
        }
        if (dict_sums["evasion_plus"] !== undefined) {
            this.evasion += dict_sums["evasion_plus"];
            delete dict_sums["evasion_plus"];
        }
        if (dict_sums["evasion_multi"] !== undefined) {
            this.evasion *= (1 + dict_sums["evasion_multi"]);
            delete dict_sums["evasion_multi"];
        }
        if (dict_sums["critical_plus"] !== undefined && this.critical !== 66666) {
            this.critical += dict_sums["critical_plus"];
            delete dict_sums["critical_plus"];
        }
        if (dict_sums["critical_multi"] !== undefined && this.critical !== 66666) {
            this.critical *= (1 + dict_sums["critical_multi"]);
            delete dict_sums["critical_multi"];
        }
        if (dict_sums["critical_change"] !== undefined) {
            this.critical = 66666;
            delete dict_sums["critical_change"];
        }
        if (dict_sums["critical_res_plus"] !== undefined) {
            this.critical_res += dict_sums["hp_max_plus"];
            delete dict_sums["critical_res_plus"];
        }
        if (dict_sums["critical_res_multi"] !== undefined) {
            this.critical_res *= (1 + dict_sums["critical_res_multi"]);
            delete dict_sums["critical_res_multi"];
        }
        if (dict_sums["critical_dmg_plus"] !== undefined) {
            this.critical_dmg += dict_sums["critical_dmg_plus"];
            delete dict_sums["critical_dmg_plus"];
        }
        if (dict_sums["critical_dmg_multi"] !== undefined) {
            this.critical_dmg *= (1 + dict_sums["critical_dmg_multi"]);
            delete dict_sums["critical_dmg_multi"];
        }
        if (dict_sums["critical_dmg_res_plus"] !== undefined) {
            this.critical_dmg_res += dict_sums["critical_dmg_res_plus"];
            delete dict_sums["critical_dmg_res_plus"];
        }
        if (dict_sums["critical_dmg_res_multi"] !== undefined) {
            this.critical_dmg_res *= (1 + dict_sums["critical_dmg_res_multi"]);
            delete dict_sums["critical_dmg_res_multi"];
        }
        if (dict_sums["stability_plus"] !== undefined) {
            this.stability += dict_sums["stability_plus"];
            delete dict_sums["stability_plus"];
        }
        if (dict_sums["stability_multi"] !== undefined) {
            this.stability *= (1 + dict_sums["stability_multi"]);
            delete dict_sums["stability_multi"];
        }
        if (dict_sums["range_plus"] !== undefined) {
            this.shoot_range += dict_sums["range_plus"];
            delete dict_sums["range_plus"];
        }
        if (dict_sums["range_multi"] !== undefined) {
            this.shoot_range *= (1 + dict_sums["range_multi"]);
            delete dict_sums["range_multi"];
        }
        if (dict_sums["cc_power_plus"] !== undefined) {
            this.cc_power += dict_sums["cc_power_plus"];
            delete dict_sums["cc_power_plus"];
        }
        if (dict_sums["cc_power_multi"] !== undefined) {
            this.cc_power *= (1 + dict_sums["cc_power_multi"]);
            delete dict_sums["cc_power_multi"];
        }
        if (dict_sums["cc_res_plus"] !== undefined) {
            this.cc_res += dict_sums["cc_res_plus"];
            delete dict_sums["cc_res_plus"];
        }
        if (dict_sums["cc_res_multi"] !== undefined) {
            this.cc_res *= (1 + dict_sums["cc_res_multi"]);
            delete dict_sums["cc_res_multi"];
        }
        if (dict_sums["recovery_plus"] !== undefined) {
            this.recovery += dict_sums["recovery_plus"];
            delete dict_sums["recovery_plus"];
        }
        if (dict_sums["recovery_multi"] !== undefined) {
            this.recovery *= (1 + dict_sums["recovery_multi"]);
            delete dict_sums["recovery_multi"];
        }
        this.others = dict_sums;
    }
    // 用于重置属性的函数，将当前属性重置为记录的属性
    reset_status() {
        this.hp_max = this.hp_max1;
        this.atk = this.atk1;
        this.defence = this.defence1;
        this.healing = this.healing1;
        this.accuracy = this.accuracy1;
        this.evasion = this.evasion1;
        this.critical = this.critical1;
        this.critical_res = this.critical_res1;
        this.critical_dmg = this.critical_dmg1;
        this.critical_dmg_res = this.critical_dmg_res1;
        this.stability = this.stability1;
        this.shoot_range = this.shoot_range1;
        this.cc_power = this.cc_power1;
        this.cc_res = this.cc_res1;
        this.recovery = this.recovery1;
        this.mag_count = this.mag_count1;
        this.atk_type = this.atk_type1;
        this.def_type = this.def_type1;
        this.adaption = this.adaption1;
        this.others = this.others1;
    }
}
// 装备类
class Equipment {
    constructor(form, level, status) {
        this.form = form;
        this.level = level;
        this.status = status;
    }
}
// 创建t7装备库
const hat_t7 = new Equipment("hat", 7, { "atk_multi": 0.4, "critical_dmg_plus": 1800 });
const gloves_t7 = new Equipment("gloves", 7, { "atk_multi": 0.35, "critical_plus": 350, "accuracy_plus": 200 });
const boots_t7 = new Equipment("boots", 7, { "atk_multi": 0.3, "hp_max_multi": 0.135 });
const bag_t7 = new Equipment("bag", 7, { "hp_max_plus": 7500, "defence_plus": 1300 });
const hairpin_t7 = new Equipment("hairpin", 7, { "hp_max_plus": 6500, "cc_res_multi": 0.28 });
const badge_t7 = new Equipment("badge", 7, { "hp_max_plus": 9500, "recovery_plus": 3200, "hp_max_multi": 0.22, "evasion_plus": 400 });
const watch_t7 = new Equipment("watch", 7, { "critical_plus": 360, "critical_dmg_plus": 2100, "hp_max_multi": 0.09 });
const amulet_t7 = new Equipment("amulet", 7, { "critical_res_plus": 360, "critical_dmg_res_plus": 2100, "critical_plus": 180 });
const necklace_t7 = new Equipment("necklace", 7, { "healing_multi": 0.35, "cc_power_multi": 0.35, "atk_multi": 0.08 });
// 创建普通攻击类
class Attack {
    constructor(rate, atk_duration, atk_delay, reload_duration, reload_start_delay, reload_end_delay, reload_count) {
        this.rate = rate;
        this.atk_duration = atk_duration;
        this.atk_delay = atk_delay;
        this.reload_duration = reload_duration;
        this.reload_start_delay = reload_start_delay;
        this.reload_end_delay = reload_end_delay;
        this.reload_count = reload_count;
    }
}
// 技能类
class Skill {
    constructor(name, cost, damage, buff, debuff, duration, delay, impart) {
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.buff = buff;
        this.debuff = debuff;
        this.duration = duration;
        this.delay = delay;
        this.impart = impart;
    }
}
class Student {
    constructor(name, stars, level, relationship, status, equipments, attack, skills, buff = [], dmg_rate = 1, position = [0, 0, 0], atk_time = 0, ex_time = 0, basic_time = 0, passive_time = 0, sub_time = 0) {
        this.name = name;
        this.stars = stars;
        this.level = level;
        this.relationship = relationship;
        this.status = status;
        this.equipments = equipments;
        this.attack = attack;
        this.skills = skills;
        this.buff = buff;
        this.dmg_rate = dmg_rate;
        this.position = position;
        this.atk_time = atk_time;
        this.ex_time = ex_time;
        this.basic_time = basic_time;
        this.passive_time = passive_time;
        this.sub_time = sub_time;
    }
    // 用于更新星级属性的函数
    update_stars() {
        let s = "5";
        if (parseInt(this.stars.stars) <= 5) {
            s = this.stars.stars;
        }
        this.status.hp_max = this.stars.status[s][0];
        this.status.atk = this.stars.status[s][1];
        this.status.healing = this.stars.status[s][2];
    }
    // 用于更新好感度带来的属性加成的函数
    update_relationship() {
        this.status.hp_max += this.relationship.bonus_func[0];
        this.status.atk += this.relationship.bonus_func[1];
        this.status.defence += this.relationship.bonus_func[2];
        this.status.healing += this.relationship.bonus_func[3];
    }
    // 用于更新专武属性与效果的函数
    update_exclusive_weapon() {
        if (parseInt(this.stars.stars) <= 4) {
            this.equipments[3].status = {};
            this.equipments[3].level = 0;
        }
        if (this.stars.stars === "5") {
            let value = [
                this.equipments[3].status["hp_max_plus"][0],
                this.equipments[3].status["atk_plus"][0],
                this.equipments[3].status["healing_plus"][0],
                this.equipments[3].status["exclusive2"],
            ];
            this.equipments[3].status = { "hp_max_plus": value[0], "atk_plus": value[1], "healing_plus": value[2] };
            this.equipments[3].level = 30;
        }
        if (this.stars.stars === "6") {
            let value = [
                this.equipments[3].status["hp_max_plus"][1],
                this.equipments[3].status["atk_plus"][1],
                this.equipments[3].status["healing_plus"][1],
                this.equipments[3].status["exclusive2"],
            ];
            this.equipments[3].status = { "hp_max_plus": value[0], "atk_plus": value[1], "healing_plus": value[2], "exclusive2": value[3] };
            this.equipments[3].level = 40;
            this.skills[2].name += "+";
            this.skills[2].buff = { ...this.skills[2].buff, ...{ exclusive2: value[3] } };
        }
        if (this.stars.stars === "7") {
            let value = [
                this.equipments[3].status["hp_max_plus"][1],
                this.equipments[3].status["atk_plus"][1],
                this.equipments[3].status["healing_plus"][1],
                this.equipments[3].status["exclusive2"],
            ];
            this.equipments[3].status = { "hp_max_plus": value[0], "atk_plus": value[1], "healing_plus": value[2], "exclusive2": value[3] };
            this.equipments[3].level = 50;
            this.skills[2].name += "+";
            this.skills[2].buff = { ...this.skills[2].buff, ...{ exclusive2: value[3] } };
            let d = this.status.adaption["exclusive3"];
            let keys = Object.keys(d);
            let values = Object.values(d);
            this.status.adaption[keys[0]] = values[0];
        }
    }
    // 用于统合以上更新操作的函数
    update_status() {
        this.update_stars();
        this.update_relationship();
        this.update_exclusive_weapon();
    }
}
class Boss_status {
    constructor(hp_max, atk, defence, received_dmg_res, accuracy, evasion, critical, critical_res, critical_dmg, critical_dmg_res, stability, shoot_range, groggy_gauge, groggy_duration, atk_type, def_type, land_form, adaption, hp_now = -1) {
        this.hp_max = hp_max;
        this.atk = atk;
        this.defence = defence;
        this.received_dmg_res = received_dmg_res;
        this.accuracy = accuracy;
        this.evasion = evasion;
        this.critical = critical;
        this.critical_res = critical_res;
        this.critical_dmg = critical_dmg * 10000;
        this.critical_dmg_res = critical_dmg_res * 10000;
        this.stability = stability;
        this.shoot_range = shoot_range;
        this.groggy_gauge = groggy_gauge;
        this.groggy_duration = groggy_duration;
        this.atk_type = atk_type;
        this.def_type = def_type;
        this.land_form = land_form;
        this.adaption = adaption;
        this.hp_max1 = hp_max;
        this.atk1 = atk;
        this.defence1 = defence;
        this.received_dmg_res1 = received_dmg_res;
        this.accuracy1 = accuracy;
        this.evasion1 = evasion;
        this.critical1 = critical;
        this.critical_res1 = critical_res;
        this.critical_dmg1 = critical_dmg;
        this.critical_dmg_res1 = critical_dmg_res;
        this.stability1 = stability;
        this.shoot_range1 = shoot_range;
        this.groggy_gauge1 = groggy_gauge;
        this.groggy_duration1 = groggy_duration;
        this.atk_type1 = atk_type;
        this.def_type1 = def_type;
        this.land_form1 = land_form;
        this.adaption1 = adaption;
        this.hp_now = hp_now;
        if (hp_now == -1) {
            this.hp_now = this.hp_max;
        }
    }
    // 用于记录基础属性的函数
    record() {
        this.hp_max1 = this.hp_max;
        this.atk1 = this.atk;
        this.defence1 = this.defence;
        this.received_dmg_res1 = this.received_dmg_res;
        this.accuracy1 = this.accuracy;
        this.evasion1 = this.evasion;
        this.critical1 = this.critical;
        this.critical_res1 = this.critical_res;
        this.critical_dmg1 = this.critical_dmg;
        this.critical_dmg_res1 = this.critical_dmg_res;
        this.stability1 = this.stability;
        this.shoot_range1 = this.shoot_range;
        this.groggy_gauge1 = this.groggy_gauge;
        this.groggy_duration1 = this.groggy_duration;
        this.atk_type1 = this.atk_type;
        this.def_type1 = this.def_type;
        this.land_form1 = this.land_form;
        this.adaption1 = this.adaption;
    }
    // 用于更新buff的函数
    update_buff_status(buff) {
        let dict_sums = {};
        for (let dict_item of buff) {
            for (let [key, value] of Object.entries(dict_item)) {
                if (key in dict_sums) {
                    dict_sums[key] += value;
                }
                else {
                    dict_sums[key] = value;
                }
            }
        }
        if (dict_sums["hp_max_plus"] !== undefined) {
            this.hp_max += dict_sums["hp_max_plus"];
            delete dict_sums["hp_max_plus"];
        }
        if (dict_sums["hp_max_multi"] !== undefined) {
            this.hp_max *= (1 + dict_sums["hp_max_multi"]);
            delete dict_sums["hp_max_multi"];
        }
        if (dict_sums["atk_plus"] !== undefined) {
            this.atk += dict_sums["atk_plus"];
            delete dict_sums["atk_plus"];
        }
        if (dict_sums["atk_multi"] !== undefined) {
            this.atk *= (1 + dict_sums["atk_multi"]);
            delete dict_sums["atk_multi"];
        }
        if (dict_sums["defence_plus"] !== undefined) {
            this.defence += dict_sums["defence_plus"];
            delete dict_sums["defence_plus"];
        }
        if (dict_sums["defence_multi"] !== undefined) {
            this.defence *= (1 + dict_sums["defence_multi"]);
            delete dict_sums["defence_multi"];
        }
        if (dict_sums["accuracy_plus"] !== undefined) {
            this.accuracy += dict_sums["accuracy_plus"];
            delete dict_sums["accuracy_plus"];
        }
        if (dict_sums["accuracy_multi"] !== undefined) {
            this.accuracy *= (1 + dict_sums["accuracy_multi"]);
            delete dict_sums["accuracy_multi"];
        }
        if (dict_sums["evasion_plus"] !== undefined) {
            this.evasion += dict_sums["evasion_plus"];
            delete dict_sums["evasion_plus"];
        }
        if (dict_sums["evasion_multi"] !== undefined) {
            this.evasion *= (1 + dict_sums["evasion_multi"]);
            delete dict_sums["evasion_multi"];
        }
        if (dict_sums["critical_plus"] !== undefined && this.critical !== 66666) {
            this.critical += dict_sums["critical_plus"];
            delete dict_sums["critical_plus"];
        }
        if (dict_sums["critical_multi"] !== undefined && this.critical !== 66666) {
            this.critical *= (1 + dict_sums["critical_multi"]);
            delete dict_sums["critical_multi"];
        }
        if (dict_sums["critical_change"] !== undefined) {
            this.critical = 66666;
            delete dict_sums["critical_change"];
        }
        if (dict_sums["critical_res_plus"] !== undefined) {
            this.critical_res += dict_sums["hp_max_plus"];
            delete dict_sums["critical_res_plus"];
        }
        if (dict_sums["critical_res_multi"] !== undefined) {
            this.critical_res *= (1 + dict_sums["critical_res_multi"]);
            delete dict_sums["critical_res_multi"];
        }
        if (dict_sums["critical_dmg_plus"] !== undefined) {
            this.critical_dmg += dict_sums["critical_dmg_plus"];
            delete dict_sums["critical_dmg_plus"];
        }
        if (dict_sums["critical_dmg_multi"] !== undefined) {
            this.critical_dmg *= (1 + dict_sums["critical_dmg_multi"]);
            delete dict_sums["critical_dmg_multi"];
        }
        if (dict_sums["critical_dmg_res_plus"] !== undefined) {
            this.critical_dmg_res += dict_sums["critical_dmg_res_plus"];
            delete dict_sums["critical_dmg_res_plus"];
        }
        if (dict_sums["critical_dmg_res_multi"] !== undefined) {
            this.critical_dmg_res *= (1 + dict_sums["critical_dmg_res_multi"]);
            delete dict_sums["critical_dmg_res_multi"];
        }
        if (dict_sums["stability_plus"] !== undefined) {
            this.stability += dict_sums["stability_plus"];
            delete dict_sums["stability_plus"];
        }
        if (dict_sums["stability_multi"] !== undefined) {
            this.stability *= (1 + dict_sums["stability_multi"]);
            delete dict_sums["stability_multi"];
        }
        if (dict_sums["range_plus"] !== undefined) {
            this.shoot_range += dict_sums["range_plus"];
            delete dict_sums["range_plus"];
        }
        if (dict_sums["range_multi"] !== undefined) {
            this.shoot_range *= (1 + dict_sums["range_multi"]);
            delete dict_sums["range_multi"];
        }
    }
    // 用于重置属性的函数，将当前属性重置为记录的属性
    reset_status() {
        this.hp_max = this.hp_max1;
        this.atk = this.atk1;
        this.defence = this.defence1;
        this.received_dmg_res = this.received_dmg_res1;
        this.accuracy = this.accuracy1;
        this.evasion = this.evasion1;
        this.critical = this.critical1;
        this.critical_res = this.critical_res1;
        this.critical_dmg = this.critical_dmg1;
        this.critical_dmg_res = this.critical_dmg_res1;
        this.stability = this.stability1;
        this.shoot_range = this.shoot_range1;
        this.groggy_gauge = this.groggy_gauge1;
        this.groggy_duration = this.groggy_duration1;
        this.atk_type = this.atk_type1;
        this.def_type = this.def_type1;
        this.land_form = this.land_form1;
        this.adaption = this.adaption1;
    }
}
// 创建boss普通攻击类
class Boss_attack {
    constructor(rate, atk_duration, atk_delay) {
        this.rate = rate;
        this.atk_duration = atk_duration;
        this.atk_delay = atk_delay;
    }
}
class Boss {
    constructor(name, difficulty, status, attack, skills, buff = [], dmg_rate = 1, position = [0, 0, 0]) {
        this.name = name;
        this.difficulty = difficulty;
        this.status = status;
        this.attack = attack;
        this.skills = skills;
        this.buff = buff;
        this.dmg_rate = dmg_rate;
        this.position = position;
    }
}
class Action {
    constructor(initiator, receiver, name, id, content = {}, act_time, effect_time, duration) {
        this.initiator = initiator;
        this.receiver = receiver;
        this.name = name;
        this.id = id;
        this.content = content;
        this.act_time = act_time;
        this.effect_time = effect_time;
        this.duration = duration;
    }
}
// 伤害计算函数
// 地形补正
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
// 装甲补正
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
// 等级差补正
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
// 安定浮动补正
function stability_correct(stability, face) {
    let lim_lower = stability / (stability + 1000) + 0.2;
    let lim_upper = 1;
    if (lim_lower <= 1) {
        return face * (lim_upper - lim_lower) + lim_lower;
    }
    else {
        return 1;
    }
}
// 防御力减伤补正
function def_correct(defence) {
    return 1 - defence / (defence + 1666.66);
}
// 暴击率与暴击伤害补正
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
// boss自带减伤率修正
function boss_dmg_res_correct(boss_dmg_res) {
    return 1 - boss_dmg_res;
}
// 命中率修正
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
// 总伤害修正
function caused_dmg_correct(attacker, defender, stability_face, critical_face, accuracy_face) {
    let land_form = defender.status.land_form;
    let attacker_land_adaption = attacker.status.adaption[land_form];
    let attacker_land_correct_rate = land_form_correct(attacker_land_adaption);
    let attacker_arm_correct_rate = armor_correct(attacker.status.atk_type, defender.status.def_type);
    // 特攻修正
    if (attacker instanceof Student) {
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
    // 特殊补正
    if (attacker instanceof Student) {
        if (attacker.status.others["caused_damage_rate"]) {
            attacker_dmg_rate_total = attacker_dmg_rate_total * attacker.status.others["caused_damage_rate"];
        }
    }
    return attacker_dmg_rate_total;
}
function raid49() {
    // 建立mika模型
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
    function mika_atk(atk) {
        return atk;
    }
    function mika_ex(atk) {
        return 15.4 * atk * 0.92;
    }
    function mika_basic1(atk) {
        return 1.69 * atk;
    }
    function mika_basic2(atk) {
        return (1.69 + 3.39) * atk;
    }
    const mika_stars = new Stars("7", { 3: [32833, 2610, 4505], 4: [35472, 2910, 4966], 5: [39756, 3273, 5541] });
    const mika_hearts = 30;
    const mika_relationship = new Relationship(mika_hearts, mika_relationship_func(mika_hearts));
    const mika_status = new Status(32833, 2610, 115, 4505, 111, 1417, 25, 100, 2, 0.5, 1376, 450, 100, 100, 1, 5, "yellow", "red", { "street": "D", "outdoor": "A", "indoor": "S", "exclusive3": { "indoor": "SS" } }, []);
    const mika_exclusive_weapon = new Equipment("exclusive_weapon", 50, { "hp_max_plus": [3530, 4413, 5295],
        "atk_plus": [396, 495, 594], "healing_plus": [0, 0, 0], "exclusive2": { "restrain_rate_plus": 0.494 } });
    const mika_equipments = [hat_t7, badge_t7, watch_t7, mika_exclusive_weapon];
    const mika_attack = new Attack(1, 0.77, 1.75, 2.2, 0.67, 0.53, 5);
    const mika_ex_skill = new Skill("Kyrie Eleison", 6, 15.4, {}, {}, 4.25, 2, "该技能会按敌人血量百分比增加同等百分比伤害");
    const mika_basic_skill = new Skill("星の呼び声", 0, 1.69, {}, {}, 0.75, 1.5, "每5次普攻发动1次，每发动3次召唤陨石伤害更高，取消射击动作的后摇，一般发动时间与换弹时间一致");
    const mika_passive_skill = new Skill("Gloria Patri", 0, 0, { "atk_multi": 0.266 }, {}, 66666, 0, "被动技能，开局发动，加百分比攻击力和贯通克制倍率");
    const mika_sub_skill = new Skill("Benedictio", 0, 0, { "critical_change": 66666, "caused_damage_rate": 1.242,
        "received_damage_rate": 0.879 }, {}, 66666, 0, "独立增伤与减伤乘区");
    const mika_skills = [mika_ex_skill, mika_basic_skill, mika_passive_skill, mika_sub_skill];
    const mika = new Student("未花", mika_stars, 85, mika_relationship, mika_status, mika_equipments, mika_attack, mika_skills);
    mika.atk_time = 6.0;
    // 建立maki模型
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
    function maki_atk1(atk) {
        return atk;
    }
    function maki_atk2(atk) {
        return (1 + 5 * 0.283) * atk;
    }
    const maki_stars = new Stars("7", { 3: [19243, 2387, 4360], 4: [20790, 2661, 4805], 5: [23195, 2993, 5361] });
    const maki_heart = 20;
    const maki_relationship = new Relationship(maki_heart, maki_relationship_func(maki_heart));
    const maki_status = new Status(19243, 2387, 426, 4360, 98, 196, 245, 100, 2, 0.5, 1424, 750, 100, 100, 1, 15, "yellow", "red", { "street": "C", "outdoor": "S", "indoor": "C", "exclusive3": { "outdoor": "SS" } }, []);
    const maki_exclusive_weapon = new Equipment("exclusive_weapon", 50, { "hp_max_plus": [2086, 2608, 3129],
        "atk_plus": [362, 453, 543], "healing_plus": [0, 0, 0], "exclusive2": { "atk_speed_plus": 2660 } });
    const maki_equipments = [gloves_t7, hairpin_t7, watch_t7, maki_exclusive_weapon];
    const maki_attack = new Attack(1, 0.67, 1.55, 1.73, 0.67, 1, 15);
    const maki_ex_skill = new Skill("世界をもっと色鮮やかに！", 5, 10.81, { "atk_multi": 0.545 }, {}, 2.8, 1, "11段");
    const maki_basic_skill = new Skill("くらえ、ペイントボール！", 0, 0, {}, { "defence_multi": -0.348, "marked_by_maki": 15 }, 1.5, 1, "每25s发动一次，标记并减防1名敌人，持续15s");
    const maki_passive_skill = new Skill("芸術的な演出", 0, 0, { "atk_speed_multi": 0.266 }, {}, 66666, 0, "被动技能，开局发动，加攻速");
    const maki_sub_skill = new Skill("芸術の苦しみ", 0, 0, { "dmg_add": 0.283 }, {}, 66666, 0, "只对标记单位生效的追伤，与攻击段数有关");
    const maki_skills = [maki_ex_skill, maki_basic_skill, maki_passive_skill, maki_sub_skill];
    const maki = new Student("真纪", maki_stars, 85, maki_relationship, maki_status, maki_equipments, maki_attack, maki_skills);
    maki.atk_time = 4.8;
    maki.basic_time = 26.8;
    // 建立akane模型
    function akane_relationship_func(hearts) {
        // return [hp, atk, defence, healing]
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
    function akane_atk(atk) {
        return atk;
    }
    function akane_basic(atk) {
        return 7.53 * atk;
    }
    function akane_ex(atk) {
        return 8.76 * atk;
    }
    const akane_stars = new Stars("7", { 2: [23151, 934, 4133], 3: [24694, 1036, 4517], 4: [26679, 1155, 4978], 5: [29765, 1299, 5555] });
    const akane_heart = 20;
    const akane_relationship = new Relationship(akane_heart, akane_relationship_func(akane_heart));
    const akane_status = new Status(23151, 934, 102, 4133, 101, 1119, 203, 100, 2, 0.5, 980, 550, 100, 100, 1, 6, "yellow", "red", { "street": "A", "outdoor": "A", "indoor": "D", "exclusive3": { "indoor": "B" } }, []);
    const akane_exclusive_weapon = new Equipment("exclusive_weapon", 50, { "hp_max_plus": [2396, 2995, 3594],
        "atk_plus": [142, 177, 212], "healing_plus": [0, 0, 0], "exclusive2": { "hp_max_plus": 6713 } });
    const akane_equipments = [boots_t7, hairpin_t7, necklace_t7, akane_exclusive_weapon];
    const akane_attack = new Attack(1, 0.67, 0.67, 1.87, 0.67, 0.53, 6);
    const akane_ex_skill = new Skill("優雅に排除します", 2, 8.76, {}, { "defence_multi": -0.377 }, 2, 1, "破防30s");
    const akane_basic_skill = new Skill("上品に貫きます", 0, 7.53, {}, {}, 2, 1, "每40s发动一次");
    const akane_passive_skill = new Skill("速やかに前進します", 0, 0, { "move_speed_multi": 0.266 }, {}, 66666, 0, "开局发动，加移速");
    const akane_sub_skill = new Skill("的確に制圧します", 0, 0, {}, { "evasion_multi": -0.127 }, 0.67, 0, "10%概率普攻触发，持续30s，cd5s");
    const akane_skills = [akane_ex_skill, akane_basic_skill, akane_passive_skill, akane_sub_skill];
    const akane = new Student("茜", akane_stars, 85, akane_relationship, akane_status, akane_equipments, akane_attack, akane_skills);
    akane.stars.basic_stars = 2;
    akane.atk_time = 4.0;
    akane.basic_time = 41.8;
    // 建立ui模型
    function ui_relationship_func(hearts) {
        // return [hp, atk, defence, healing]
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
    function ui_atk(atk) {
        return atk;
    }
    const ui_stars = new Stars("7", { 3: [18050, 2516, 4639], 4: [19501, 2805, 5113], 5: [21757, 3155, 5705] });
    const ui_heart = 20;
    const ui_relationship = new Relationship(ui_heart, ui_relationship_func(ui_heart));
    const ui_status = new Status(18050, 2516, 100, 4639, 941, 190, 209, 100, 2, 0.5, 1908, 750, 100, 100, 1, 7, "red", "red", { "street": "B", "outdoor": "S", "indoor": "D", "exclusive3": { "outdoor": "SS" } }, []);
    const ui_exclusive_weapon = new Equipment("exclusive_weapon", 50, { "hp_max_plus": [1957, 2446, 2935],
        "atk_plus": [381, 477, 572], "healing_plus": [0, 0, 0], "exclusive2": { "critical_plus": 190 } });
    const ui_equipments = [gloves_t7, hairpin_t7, amulet_t7, ui_exclusive_weapon];
    const ui_attack = new Attack(1, 1.4, 1.33, 2.47, 0.5, 0.53, 7);
    const ui_ex_skill = new Skill("古書の専門家", 3, 0, { "cost_multi": 0.5, "atk_multi": 0.161 }, {}, 2, 0, "2次减费50%，加攻46s");
    const ui_basic_skill = new Skill("伝授されていく知識", 0, 0, { "critical_multi": 0.259 }, {}, 1.5, 0, "每40s发动一次群体加暴击，持续33s");
    const ui_passive_skill = new Skill("専門家の知見", 0, 0, { "critical_multi": 0.266 }, {}, 66666, 0, "开局发动，加自己暴击");
    const ui_sub_skill = new Skill("神経過敏", 0, 0, { "atk_speed_multi": 0.459 }, {}, 0, 0, "ex使用时触发，持续20s加自己攻速");
    const ui_skills = [ui_ex_skill, ui_basic_skill, ui_passive_skill, ui_sub_skill];
    const ui = new Student("忧", ui_stars, 85, ui_relationship, ui_status, ui_equipments, ui_attack, ui_skills);
    ui.atk_time = 5.5;
    ui.basic_time = 41.8;
    // 建立简单的亚子与日鞠模型,部分参数置零或用ui模型中参数替代，该部分不参与任何计算，仅作为占位
    const placeholder1 = { 0: [0, 0, 0] };
    const placeholder2 = new Relationship(0, [0, 0, 0, 0]);
    const placeholder3 = new Status(18050, 2516, 100, 4639, 941, 190, 209, 100, 2, 0.5, 1908, 750, 100, 100, 1, 7, "red", "red", { "street": "B", "outdoor": "S", "indoor": "D", "exclusive3": { "outdoor": "SS" } }, []);
    const placeholder4 = [gloves_t7, hairpin_t7, amulet_t7, ui_exclusive_weapon];
    const placeholder5 = new Attack(0, 0, 0, 0, 0, 0, 0);
    const placeholder6 = [ui_ex_skill, ui_basic_skill, ui_passive_skill, ui_sub_skill];
    const ako = new Student("亚子", new Stars("6", placeholder1), 85, placeholder2, placeholder3, placeholder4, placeholder5, placeholder6);
    const himari = new Student("日鞠", new Stars("6", placeholder1), 85, placeholder2, placeholder3, placeholder4, placeholder5, placeholder6);
    // 建立简单的大蛇模型
    const binah_status = new Boss_status(7000000, 20000, 5000, 0, 1300, 100, 200, 20, 2, 0.8, 300, 3000, 2100000, 10, "yellow", "yellow", "outdoor", { "outdoor": "D" });
    const binah_attack = new Boss_attack(1, 2.566, 2.168);
    const binah = new Boss("Binah", "INSANE", binah_status, binah_attack, undefined);
    // 游戏主体
    // 游戏限制时长
    const total_time = 180;
    // 初始化游戏时间
    let game_time = 0;
    // 初始化费用，默认6人队满编，每人700cost回复力
    let cost = 0;
    let cost_rate = 6 * 700;
    // 基本属性加成生效，更新角色属性，并记录初始基础属性
    mika.update_status();
    mika.status.record();
    maki.update_status();
    maki.status.record();
    akane.update_status();
    akane.status.record();
    ui.update_status();
    ui.status.record();
    // 装备属性加成生效，计入buff栏
    if (parseInt(mika.stars.stars) >= 5) {
        delete mika.equipments[3].status["exclusive2"];
    }
    if (parseInt(mika.stars.stars) >= 5) {
        delete maki.equipments[3].status["exclusive2"];
    }
    if (parseInt(mika.stars.stars) >= 5) {
        delete akane.equipments[3].status["exclusive2"];
    }
    if (parseInt(mika.stars.stars) >= 5) {
        delete ui.equipments[3].status["exclusive2"];
    }
    for (let i = 0; i < 4; i++) {
        mika.buff.push(mika.equipments[i].status);
        maki.buff.push(maki.equipments[i].status);
        akane.buff.push(akane.equipments[i].status);
        ui.buff.push(ui.equipments[i].status);
    }
    // 后排属性加成，按亚子日鞠20好感度t7顶配专2计算，计入buff栏
    mika.buff.push({ "hp_max_plus": 3741 + 4780, "defence_plus": 4 + 28, "atk_plus": 328 + 445, "healing_plus": 508 + 339 });
    maki.buff.push({ "hp_max_plus": 3741 + 4780, "defence_plus": 4 + 28, "atk_plus": 328 + 445, "healing_plus": 508 + 339 });
    akane.buff.push({ "hp_max_plus": 3741 + 4780, "defence_plus": 4 + 28, "atk_plus": 328 + 445, "healing_plus": 508 + 339 });
    ui.buff.push({ "hp_max_plus": 3741 + 4780, "defence_plus": 4 + 28, "atk_plus": 328 + 445, "healing_plus": 508 + 339 });
    // 初始化记录本，用于记录战斗数据
    let notebook = [];
    // 日鞠发动sub skill
    cost_rate = 6 * 700 * 1.202;
    notebook.push(`游戏时间${game_time.toFixed(2)}：日鞠发动了技能「超天才清楚系病弱美少女の真骨頂」：cost回复力增加20.2%。`);
    // 亚子发动sub skill
    mika.buff.push({ "critical_dmg_multi": 0.173 });
    maki.buff.push({ "critical_dmg_multi": 0.173 });
    akane.buff.push({ "critical_dmg_multi": 0.173 });
    ui.buff.push({ "critical_dmg_multi": 0.173 });
    notebook.push(`游戏时间${game_time.toFixed(2)}：亚子发动了技能「サポートはお任せください」：我方全体暴击伤害增加17.3%。`);
    // mika发动passive skill
    mika.buff.push(mika.skills[2].buff);
    notebook.push(`游戏时间${game_time.toFixed(2)}：${mika.name}发动了技能「${mika.skills[2].name}」：${mika.name}的攻击力增加26.6%，贯通特效增加49.4%。`);
    // mika发动sub skill
    mika.buff.push(mika.skills[3].buff);
    notebook.push(`游戏时间${game_time.toFixed(2)}：${mika.name}发动了技能「${mika.skills[3].name}」：${mika.name}造成伤害增加24.2%，受到伤害减少12.1%，所有伤害必定暴击。`);
    // maki发动passive skill
    let maki_atk_speed_rate = (10000 + 2660) * (1 + 0.266) / 10000;
    maki.attack.atk_duration /= maki_atk_speed_rate;
    maki.attack.atk_delay /= maki_atk_speed_rate;
    maki.attack.reload_start_delay /= maki_atk_speed_rate;
    maki.attack.reload_end_delay /= maki_atk_speed_rate;
    maki.attack.reload_duration /= maki_atk_speed_rate;
    notebook.push(`游戏时间${game_time.toFixed(2)}：${maki.name}发动了技能「${maki.skills[2].name}」：${maki.name}的攻击速度增加2660 + 26.6%。`);
    // akane发动passive skill
    akane.buff.push(akane.skills[2].buff);
    notebook.push(`游戏时间${game_time.toFixed(2)}：${akane.name}发动了技能「${akane.skills[2].name}」：${akane.name}的移动增加26.6%，HP增加6713。`);
    // ui发动passive skill
    ui.buff.push(ui.skills[2].buff);
    notebook.push(`游戏时间${game_time.toFixed(2)}：${ui.name}发动了技能「${ui.skills[2].name}」：${ui.name}的暴击值增加190 + 26.6%。`);
    // binah发动4技能
    mika.buff.push({ "accuracy_multi": -0.2, "stability_multi": -0.5 });
    maki.buff.push({ "accuracy_multi": -0.2, "stability_multi": -0.5 });
    akane.buff.push({ "accuracy_multi": -0.2, "stability_multi": -0.5 });
    ui.buff.push({ "accuracy_multi": -0.2, "stability_multi": -0.5 });
    notebook.push(`游戏时间${game_time.toFixed(2)}：${binah.name}发动了技能「吹き荒れる砂塵」：我方全体命中值减少20%，安定值减少50%。`);
    // 更新状态值
    mika.status.update_buff_status(mika.buff);
    maki.status.update_buff_status(maki.buff);
    akane.status.update_buff_status(akane.buff);
    ui.status.update_buff_status(ui.buff);
    binah.status.update_buff_status(binah.buff);
    // 初始化普攻计数器
    let mika_atk_count = 0;
    let maki_atk_count = 0;
    let akane_atk_count = 0;
    let ui_atk_count = 0;
    // 初始化行动列表
    let action_list = [];
    // 初始化buff计时列表
    let buff_check = [];
    // 初始化自律技能计数、计时与控制节点
    let mika_basic_count = 0;
    let mika_basic_skill_on = true;
    let akane_sub_limit_count = 0;
    // 初始化技能轴节点
    let [s1, s2, s3, s4, s5, s6, s7, s8] = [true, true, true, true, true, true, true, true];
    // 初始化大蛇控制器
    let binah_ctrl = [];
    let binah_groggy_count = 0;
    let binah_dizzied_count = 0;
    let binah_dizzied_on = true;
    let binah_to2 = true;
    let binah_to3 = true;
    let start3 = false;
    let [s9, s10, s11, s12] = [true, true, true, true];
    // 定义状态更新函数
    function status_update(target, target_buff) {
        target.status.reset_status();
        target.status.update_buff_status(target_buff);
    }
    // 定义行动函数
    // 定义攻击类函数，自变量为action，返回修正后的实际伤害值
    function attack(action) {
        if (action.receiver instanceof Boss && action.initiator instanceof Student) {
            let damage = action.content(action.initiator.status.atk);
            let damage_correct = caused_dmg_correct(action.initiator, action.receiver, Math.random(), Math.random(), Math.random());
            let special_correct = 1;
            if (action.name === mika.skills[0].name) {
                special_correct = 1 + action.receiver.status.hp_now / action.receiver.status.hp_max;
            }
            let damage_real = damage * damage_correct * special_correct;
            action.receiver.status.hp_now -= damage_real;
            notebook.push(`游戏时间${game_time.toFixed(2)}s：${action.initiator.name}对${action.receiver.name}发动了「${action.name}」，造成了${damage_real.toFixed(0)}点伤害，伤害触发时间：${action.effect_time.toFixed(2)}s。`);
            notebook.push(`游戏时间${game_time.toFixed(2)}s：binah当前血量${binah.status.hp_now.toFixed(0)}`);
            return damage_real;
        }
        else {
            return 0;
        }
    }
    // 定义buff函数
    // 定义上buff函数，自变量为action，返回该buff是否被刷新
    function add_buff(action) {
        let buff = action.content;
        let index = action.receiver.buff.indexOf(buff);
        if (index > -1) {
            notebook.push(`游戏时间${game_time.toFixed(2)}：${action.initiator.name}对${action.receiver.name}发动了技能「${action.name}」，buff生效时间：${action.effect_time.toFixed(2)}s，持续时间：${action.duration}s。`);
            return true;
        }
        else {
            action.receiver.buff.push(buff);
            notebook.push(`游戏时间${game_time.toFixed(2)}：${action.initiator.name}对${action.receiver.name}发动了技能「${action.name}」，buff生效时间：${action.effect_time.toFixed(2)}s，持续时间：${action.duration}s。`);
            return false;
        }
    }
    // 定义移除buff函数，自变量为action，无返回值
    function remove_buff(action) {
        let buff = action.content;
        let index = action.receiver.buff.indexOf(buff);
        if (index > -1) {
            action.receiver.buff.splice(index, 1);
            notebook.push(`游戏时间${game_time.toFixed(2)}s：「${action.name}」已失效。`);
        }
    }
    // 游戏正式开始
    while (mika.status.hp_now > 0 && binah.status.hp_now > 0 && game_time <= total_time) {
        // 定义时间跳动周期
        const t = 0.005;
        // 从游戏第2秒开始增长cost，最多不超过10
        if (game_time >= 2) {
            cost += t * cost_rate / 10000;
        }
        if (cost >= 10) {
            cost = 10;
        }
        // 定义字典比较函数
        function isEqual(obj1, obj2) {
            const entries1 = Object.entries(obj1).sort();
            const entries2 = Object.entries(obj2).sort();
            if (entries1.length !== entries2.length) {
                return false;
            }
            return entries1.every(([key, value]) => Object.is(value, obj2[key]));
        }
        // 进行行动处理
        let action_list_copy = action_list;
        let buff_check_copy = buff_check;
        if (action_list_copy.length > 0) {
            for (let a of action_list_copy) {
                if (game_time >= a.effect_time) {
                    if (a.id === "damage") {
                        let d = attack(a);
                        binah_groggy_count += d;
                    }
                    else if (a.id === "buff") {
                        let mark = add_buff(a);
                        if (isEqual(a.content, { "atk_multi": 1.05 })) {
                            let index = a.receiver.buff.indexOf(ui.skills[0].buff);
                            if (index > -1) {
                                a.receiver.buff.splice(index, 1);
                                for (let i = 0; i < buff_check.length; i++) {
                                    if (isEqual(buff_check[i].content, ui.skills[0].buff)) {
                                        buff_check.splice(i, 1);
                                        notebook.push(`游戏时间${game_time.toFixed(2)}s：忧的ex技能buff被日鞠的ex技能buff顶掉了。`);
                                        break;
                                    }
                                }
                            }
                        }
                        if (isEqual(a.content, ui.skills[0].buff)) {
                            let index = a.receiver.buff.indexOf({ "atk_multi": 1.05 });
                            if (index > -1) {
                                a.receiver.buff.splice(index, 1);
                                for (let i = 0; i < buff_check.length; i++) {
                                    if (isEqual(buff_check[i].content, { "atk_multi": 1.05 })) {
                                        buff_check.splice(i, 1);
                                        notebook.push(`游戏时间${game_time.toFixed(2)}s：日鞠的ex技能buff被忧的ex技能buff顶掉了。`);
                                        break;
                                    }
                                }
                            }
                        }
                        if (mark) {
                            for (let i = 0; i < buff_check.length; i++) {
                                if (isEqual(buff_check[i].content, a.content)) {
                                    buff_check.splice(i, 1);
                                }
                            }
                        }
                        buff_check.push(a);
                    }
                    let index = action_list.indexOf(a);
                    action_list.splice(index, 1);
                }
            }
        }
        if (buff_check_copy.length > 0) {
            for (let b of buff_check_copy) {
                if (game_time >= b.effect_time + b.duration) {
                    remove_buff(b);
                    let index = buff_check.indexOf(b);
                    buff_check.splice(index, 1);
                }
            }
        }
        // mika自律攻击
        if (game_time >= mika.atk_time) {
            mika_atk_count += 1;
            action_list.push(new Action(mika, binah, "普通攻击", "damage", mika_atk, game_time, game_time + mika.attack.atk_duration, 0));
            if (mika_atk_count % mika.attack.reload_count === 0) {
                mika.atk_time += mika.attack.reload_start_delay + mika.attack.reload_duration + mika.attack.reload_end_delay;
                notebook.push(`游戏时间${game_time.toFixed(2)}s：未花换弹中...`);
            }
            else {
                mika.atk_time += mika.attack.atk_delay + mika.attack.atk_duration;
                mika_basic_skill_on = true;
            }
        }
        // mika basic skill
        if (mika_atk_count % 5 === 0 && mika_atk_count !== 0 && mika_basic_skill_on) {
            mika_basic_count += 1;
            if (mika_basic_count % 3 === 0) {
                action_list.push(new Action(mika, binah, "强化版" + mika.skills[1].name, "damage", mika_basic2, game_time + mika.attack.atk_delay, game_time + mika.attack.atk_delay + mika.skills[1].duration, 0));
            }
            else {
                action_list.push(new Action(mika, binah, mika.skills[1].name, "damage", mika_basic1, game_time + mika.attack.atk_delay, game_time + mika.attack.atk_delay + mika.skills[1].duration, 0));
            }
            mika.atk_time += mika.skills[1].duration + mika.skills[1].delay;
            mika_basic_skill_on = false;
        }
        // maki自律攻击
        if (game_time >= maki.atk_time) {
            maki_atk_count += 1;
            if (binah.buff.includes(maki.skills[1].debuff)) {
                action_list.push(new Action(maki, binah, "普通攻击", "damage", maki_atk2, game_time, game_time + maki.attack.atk_duration, 0));
            }
            else {
                action_list.push(new Action(maki, binah, "普通攻击", "damage", maki_atk1, game_time, game_time + maki.attack.atk_duration, 0));
            }
            if (maki_atk_count % maki.attack.reload_count === 0) {
                maki.atk_time += maki.attack.reload_start_delay + maki.attack.reload_duration + maki.attack.reload_end_delay;
                notebook.push(`游戏时间${game_time.toFixed(2)}s：真纪换弹中...`);
            }
            else {
                maki.atk_time += maki.attack.atk_delay + maki.attack.atk_duration;
            }
        }
        // maki basic skill
        if (game_time >= maki.basic_time) {
            action_list.push(new Action(maki, binah, maki.skills[1].name, "buff", maki.skills[1].debuff, game_time, game_time + maki.skills[1].duration, 15));
            maki.atk_time += maki.skills[1].duration + maki.skills[1].delay;
            maki.basic_time = game_time + 25;
        }
        // akane自律攻击
        if (game_time >= akane.atk_time) {
            akane_atk_count += 1;
            action_list.push(new Action(akane, binah, "普通攻击", "damage", akane_atk, game_time, game_time + akane.attack.atk_duration, 0));
            // akane的sub skill判定
            if (Math.random() <= 0.1 && akane_atk_count >= akane_sub_limit_count) {
                action_list.push(new Action(akane, binah, akane.skills[3].name, "buff", akane.skills[3].debuff, game_time, game_time + akane.skills[3].duration, 30));
                akane_sub_limit_count = akane_atk_count + 5;
            }
            if (akane_atk_count % akane.attack.reload_count === 0) {
                akane.atk_time += akane.attack.reload_start_delay + akane.attack.reload_duration + akane.attack.reload_end_delay;
                notebook.push(`游戏时间${game_time.toFixed(2)}s：茜换弹中...`);
            }
            else {
                akane.atk_time += akane.attack.atk_delay + akane.attack.atk_duration;
            }
        }
        // akane basic skill
        if (game_time >= akane.basic_time) {
            action_list.push(new Action(akane, binah, akane.skills[1].name, "damage", akane_basic, game_time, game_time + akane.skills[1].duration, 0));
            akane.atk_time += akane.skills[1].duration + akane.skills[1].delay;
            akane.basic_time = game_time + 40;
        }
        // ui自律攻击
        if (game_time >= ui.atk_time) {
            ui_atk_count += 1;
            action_list.push(new Action(ui, binah, "普通攻击", "damage", ui_atk, game_time, game_time + ui.attack.atk_duration, 0));
            if (ui_atk_count % ui.attack.reload_count === 0) {
                ui.atk_time += ui.attack.reload_start_delay + ui.attack.reload_duration + ui.attack.reload_end_delay;
                notebook.push(`游戏时间${game_time.toFixed(2)}s：忧换弹中...`);
            }
            else {
                ui.atk_time += ui.attack.atk_delay + ui.attack.atk_duration;
            }
        }
        // ui basic skill
        if (game_time >= ui.basic_time) {
            action_list.push(new Action(ui, mika, ui.skills[1].name, "buff", ui.skills[1].buff, game_time, game_time + ui.skills[1].duration, 33));
            action_list.push(new Action(ui, maki, ui.skills[1].name, "buff", ui.skills[1].buff, game_time, game_time + ui.skills[1].duration, 33));
            action_list.push(new Action(ui, akane, ui.skills[1].name, "buff", ui.skills[1].buff, game_time, game_time + ui.skills[1].duration, 33));
            action_list.push(new Action(ui, ui, ui.skills[1].name, "buff", ui.skills[1].buff, game_time, game_time + ui.skills[1].duration, 33));
            ui.atk_time += ui.skills[1].duration + ui.skills[1].delay;
            ui.basic_time = game_time + 40;
        }
        // 更新状态
        status_update(mika, mika.buff);
        status_update(maki, maki.buff);
        status_update(akane, akane.buff);
        status_update(ui, ui.buff);
        status_update(binah, binah.buff);
        // 运行技能轴
        if (cost >= 6.4 + 0.2 * Math.random() && s1) {
            // ui ex
            cost -= 3;
            action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time, game_time + ui.skills[0].duration, 33));
            ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
            s1 = false;
        }
        if (cost >= 9.8 + 0.2 * Math.random() && s2 && !s1) {
            // ako ex
            cost -= 3;
            action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff", { "critical_multi": 0.395, "critical_dmg_multi": 0.733 }, game_time, game_time + 1.5, 16));
            s2 = false;
        }
        if (cost >= 8.5 + 0.1 * Math.random() && s3 && !s2) {
            // mika himari ex
            cost -= 6;
            action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika_ex, game_time, game_time + mika.skills[0].duration, 0));
            action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", { "atk_multi": 1.05 }, game_time, game_time + 1.5, 15.47));
            mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
            s3 = false;
        }
        if (cost >= 2 && s4 && !s3) {
            // akane ex
            cost -= 2;
            action_list.push(new Action(akane, binah, akane.skills[0].name, "damage", akane_ex, game_time, game_time + akane.skills[0].duration, 0));
            action_list.push(new Action(akane, binah, akane.skills[0].name, "buff", akane.skills[0].debuff, game_time, game_time + akane.skills[0].duration, 30));
            akane.atk_time += akane.skills[0].duration + akane.skills[0].delay;
            s4 = false;
        }
        if (cost >= 3.9 + 0.2 * Math.random() && s5 && !s4) {
            // ui ex
            cost -= 3;
            action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time, game_time + ui.skills[0].duration, 33));
            ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
            s5 = false;
        }
        if (cost >= 9 + 0.5 * Math.random() && s6 && !s5) {
            // mika ako himari ex
            cost -= 9;
            action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff", { "critical_multi": 0.395, "critical_dmg_multi": 0.733 }, game_time, game_time + 1.5, 16));
            action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", { "atk_multi": 1.05 }, game_time, game_time + 1.5, 15.47));
            action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika_ex, game_time, game_time + mika.skills[0].duration, 0));
            mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
            s6 = false;
        }
        if (cost >= 2.0 + 0.2 * Math.random() && s7 && !s6) {
            // akane ex
            cost -= 2;
            action_list.push(new Action(akane, binah, akane.skills[0].name, "damage", akane_ex, game_time, game_time + akane.skills[0].duration, 0));
            action_list.push(new Action(akane, binah, akane.skills[0].name, "buff", akane.skills[0].debuff, game_time, game_time + akane.skills[0].duration, 30));
            akane.atk_time += akane.skills[0].duration + akane.skills[0].delay;
            s7 = false;
        }
        if (mika_atk_count % 5 == 0 && cost >= 3 + 0.4 * Math.random() && s8 && !s7) {
            // mika ex
            action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika_ex, game_time, game_time + mika.skills[0].duration, 0));
            mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
            s8 = false;
        }
        // 大蛇状态
        // 大蛇眩晕
        if (binah_groggy_count >= binah.status.groggy_gauge && binah_dizzied_on) {
            binah_ctrl.push(["dizzied", game_time, game_time + binah.status.groggy_duration]);
            binah_dizzied_count += 1;
            notebook.push(`游戏时间${game_time.toFixed(2)}：Binah进入了虚弱状态。`);
            binah_dizzied_on = false;
            binah_to2 = false;
            binah_to3 = false;
            if (binah_dizzied_count === 1) {
                binah_ctrl.push(["in_skill", game_time + binah.status.groggy_duration + 4.9,
                    game_time + binah.status.groggy_duration + 19.9]);
            }
        }
        // 大蛇解除眩晕
        if (binah_ctrl.length > 0) {
            for (let item of binah_ctrl) {
                if (item[0] === "dizzied") {
                    binah_to2 = false;
                    binah_to3 = false;
                    if (game_time >= item[2]) {
                        notebook.push(`游戏时间${game_time.toFixed(2)}：Binah解除了虚弱状态。`);
                        let index = binah_ctrl.indexOf(item);
                        binah_ctrl.splice(index, 1);
                        binah_groggy_count = 0;
                        binah_dizzied_on = true;
                        if (binah_dizzied_count === 1) {
                            binah_to2 = true;
                            binah_to3 = true;
                        }
                        else if (binah_dizzied_count === 2) {
                            binah_to3 = true;
                        }
                    }
                }
                else if (item[0] === "in_skill") {
                    if (game_time >= item[1] && game_time < item[2]) {
                        binah_to2 = false;
                    }
                    else if (game_time >= item[2]) {
                        let index = binah_ctrl.indexOf(item);
                        binah_ctrl.splice(index, 1);
                        if (binah_ctrl.length > 0) {
                            binah_to2 = false;
                        }
                        else {
                            binah_to2 = true;
                        }
                    }
                }
            }
        }
        // 大蛇转场
        if (binah.status.hp_now > 1500000 && binah.status.hp_now <= 4000000 && binah_to2) {
            if (game_time > 40 && game_time < 60) {
                notebook.push(`游戏时间${game_time.toFixed(2)}：Binah进入了2阶段，凹分失败，原因是在第1次虚弱时进行了过多的输出。`);
            }
            if (game_time >= 60) {
                notebook.push(`游戏时间${game_time.toFixed(2)}：Binah进入了2阶段，凹分失败，原因是伤害不足以在大蛇吐息结束后使其进入第2次虚弱。`);
            }
            break;
        }
        if (binah.status.hp_now > 0 && binah.status.hp_now <= 1500000 && binah_to3) {
            notebook.push(`游戏时间${game_time.toFixed(2)}：Binah进入了3阶段，将会继续输出至游戏结束。`);
            binah_to3 = false;
            mika.atk_time += 5.8;
            maki.atk_time += 3.4;
            akane.atk_time += 2.8;
            ui.atk_time += 4.5;
            start3 = true;
        }
        // 3阶段后的补刀措施：
        if (start3) {
            if (cost >= 3 + 0.2 * Math.random() && s9 && !s8) {
                // ako ex
                cost -= 3;
                action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff", { "critical_multi": 0.395, "critical_dmg_multi": 0.733 }, game_time, game_time + 1.5, 16));
                s9 = false;
            }
            if (cost >= 3 + 0.2 * Math.random() && s10 && !s9) {
                // ui ex
                cost -= 3;
                action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time, game_time + ui.skills[0].duration, 33));
                ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
                s10 = false;
            }
            if (cost >= 3 + 0.2 * Math.random() && s11 && !s10) {
                // himari ex
                cost -= 3;
                action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", { "atk_multi": 1.05 }, game_time, game_time + 1.5, 15.47));
                s11 = false;
            }
            if (cost >= 3 + 0.2 * Math.random() && s12 && !s11) {
                // mika ex
                action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika_ex, game_time, game_time + mika.skills[0].duration, 0));
                mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
                s12 = false;
            }
        }
        // 更新状态
        status_update(mika, mika.buff);
        status_update(maki, maki.buff);
        status_update(akane, akane.buff);
        status_update(ui, ui.buff);
        status_update(binah, binah.buff);
        // 跳跃到下一个时间点
        game_time += t;
    }
    // 判断游戏结果
    if (binah.status.hp_now <= 0) {
        notebook.push("VICTORY！");
        notebook.push(`游戏时间${game_time.toFixed(2)}`);
        notebook.push("正在结算分数......");
        game_time += 0.25;
        const time_score = -12800 * game_time + 9216000;
        const score = 6800000 + 10145600 - 12800 * game_time + 9216000;
        notebook.push("Battle Complete");
        notebook.push(`タイムスコア:${time_score.toFixed(0)}`);
        notebook.push("ボスの残りHPスコア:10145600");
        notebook.push("難易度スコア:6800000");
        notebook.push(`ランキングPt${score.toFixed(0)}取集獲得`);
    }
    else if (mika.status.hp_now <= 0 || game_time >= total_time) {
        notebook.push("游戏结束，学生失败！");
    }
    // 战斗记录都在notebook里
    return notebook;
}
// 定义给记录内容分行的操作函数（实际是忘记加换行符了）
function divide(notebook) {
    let book = [];
    for (let i of notebook) {
        book.push(i + "\n");
    }
    return book;
}
// 定义删减记录内容中所有普通攻击及其boss血量的函数
function simplify(notebook) {
    let notebook_copy = [notebook[0]];
    for (let i = 1; i < notebook.length; i++) {
        if (!notebook[i].includes("普通攻击")) {
            if (notebook[i].includes("当前血量") && notebook[i - 1].includes("普通攻击") || notebook[i].includes("换弹中")) {
                continue;
            }
            else {
                notebook_copy.push(notebook[i]);
            }
        }
    }
    return notebook_copy;
}
let latest = [];
function apply(ctx) {
    ctx.command("总力", '凹ba总力战')
        .alias('凹分')
        .alias('总力战')
        .example('总力 大蛇凹一次')
        .example('凹分 战斗记录')
        .action(async ({ session }, ...args) => {
        if ((args[0]) === '战斗记录') {
            if (latest.length > 0) {
                return latest;
            }
            else {
                return "啊嘞？战斗记录找不到了......";
            }
        }
        if ((args[0] == null)) {
            return "sensei，来做爱丽丝的朋友吧！\n" +
                "目前只支持碧蓝档案日服第49期总力战：Binah屋外战。\n" +
                "目前只支持模拟如下队伍：未花，真纪，茜，忧，亚子，日鞠。\n" +
                "请问sensei需要凹几次呢？\n" +
                "使用“总力 大蛇凹一次”，模拟1次战斗并展示成绩；\n" +
                "使用“总力 大蛇凹十次”，模拟10次战斗，并展示成绩与最佳成绩；\n" +
                "使用“总力 战斗记录”，返还最近一次的最佳战绩的简略战斗记录。\n" +
                "本期一档线为25112851，请sensei加油哦！\n\n" +
                "数据来源：schale.gg, bluearchive.wikiru.jp, 部分数据由@早苗 脑测得出;\n" +
                "计算公式来源：bilibili@夜猫咪喵喵猫；\n" +
                "模拟轴参考：bilibili@y千代：BV1VN411N7eR，目标分数25291624。\n" +
                "注意：模拟结果与实际有较大偏差，仅供参考。";
        }
        if ((args[0]) === "大蛇凹一次") {
            let result = raid49();
            result = divide(result);
            result = simplify(result);
            for (let i = 0; i < result.length; i++) {
                if (Object.is(result[i], "VICTORY！\n")) {
                    let result_reverse = result.reverse();
                    let score = result_reverse[0].match(/\d+/)[0];
                    let time = result_reverse[6].match(/\d+(\.\d+)?/)[0];
                    latest = result.reverse();
                    return `VICTORY！\n战斗时间：${time}\n获得分数：${score}`;
                }
                else if (result[i].includes("凹分失败")) {
                    let result_reverse = result.reverse();
                    let message = result_reverse[0];
                    latest = result.reverse();
                    return message;
                }
            }
        }
        if ((args[0] === '大蛇凹十次')) {
            let message10 = [];
            let ct = 0;
            let score_best = 0;
            let time_best = 0;
            latest = [];
            for (let i = 0; i < 10; i++) {
                ct += 1;
                let result = raid49();
                result = divide(result);
                result = simplify(result);
                for (let i = 0; i < result.length; i++) {
                    if (Object.is(result[i], "VICTORY！\n")) {
                        let result_reverse = result.reverse();
                        let score = result_reverse[0].match(/\d+/)[0];
                        let time = result_reverse[6].match(/\d+(\.\d+)?/)[0];
                        message10.push(`第${ct}次：战斗时间：${time}，获得分数：${score}\n`);
                        if (score >= score_best) {
                            score_best = score;
                            time_best = time;
                            latest = result.reverse();
                        }
                    }
                    else if (result[i].includes("凹分失败")) {
                        let result_reverse = result.reverse();
                        let message = result_reverse[0];
                        result.reverse();
                        message10.push(`第${ct}次：${message}\n`);
                    }
                }
            }
            const sum = message10.reduce((acc, curr) => acc + curr, "");
            return `10次战斗结果为：\n${sum}最佳成绩为：战斗时间：${time_best}，获得分数：${score_best}\n`;
        }
        else {
            return "呜呜~只能凹大蛇喵";
        }
    });
    //从此以下是阿林的代码
    //角色评分系统
    ctx.command('评分', "引用bawiki网站的角色评分")
        .alias('评测')
        .alias('测评')
        .example('评分 爱丽丝')
        .action(async ({ session }, ...args) => {
        function getValue(args) {
            for (const obj of data_1.data) {
                if (obj.name === args[0]) {
                    return obj.link[0];
                }
            }
            // 如果没有找到匹配的对象，则返回null或者其他默认值
            return null;
        }
        const result = getValue(args);
        return (result ? ((0, koishi_1.h)('image', { url: getValue(args) })) :
            "呜~，没有找到对应角色，换个名称试试吧"); // 打印匹配对象的第一个元素
    });
    //抽卡系统
    ctx.command("ba", '抽卡模拟器，目前只支持抽两个服的常驻池')
        .example('ba 日服来一井')
        .example('ba 国际服十连')
        .action(async ({ session }, ...args) => {
        if ((args[0]) === '日服来一井') {
            return (0, test_1.日服井)();
        }
        ;
        if ((args[0]) === '国际服来一井') {
            return (0, test_1.国际服井)();
        }
        ;
        if ((args[0]) === '日服十连') {
            return (0, test_1.日服十连)();
        }
        ;
        if ((args[0]) === '国际服十连') {
            return (0, test_1.国际服十连)();
        }
        return ('呜~好像输入错误了');
    });
    //千里眼
    ctx.command("千里眼", '国急服千里眼')
        .usage('国急服，急急急急急急急急急')
        .action(() => {
        return ((0, koishi_1.h)('image', { url: 'https://cdnimg.gamekee.com/wiki2.0/images/w_2476/h_6116/829/43637/2023/3/27/891147.png' }));
    });
}
exports.apply = apply;
