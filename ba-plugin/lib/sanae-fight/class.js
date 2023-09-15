"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.Boss = exports.Boss_skill = exports.Boss_attack = exports.Boss_status = exports.Student = exports.Skill = exports.Attack = exports.Favorite = exports.Exclusive_weapon = exports.Equipment = exports.Property = exports.Status = exports.Relationship = exports.Stars = void 0;
// 星级类，用于接入学生类
// 星级属性是一个字典：{星级: [hp_max, atk, healing], ...}，该值应直接替换学生对应的基础属性
class Stars {
    constructor(stars, status, basic_stars = 3) {
        this.stars = stars;
        this.status = status;
        this.basic_stars = basic_stars;
        if (this.stars < this.basic_stars) {
            this.stars = this.basic_stars;
        }
        else if (this.stars > 7) {
            this.stars = 7;
        }
    }
}
exports.Stars = Stars;
// // 好感度类，用于接入学生类
// // 在建立学生模型时应该定义一个好感度函数，输出好感度加成属性的数组：[hp_max, atk, def, healing]，该值加算在基础属性上
class Relationship {
    constructor(hearts, bonus_func) {
        this.hearts = hearts;
        if (this.hearts < 1) {
            this.hearts = 1;
        }
        else if (this.hearts > 50) {
            this.hearts = 50;
        }
        this.bonus_func = bonus_func;
    }
}
exports.Relationship = Relationship;
// 状态属性类，用于接入学生类
class Status {
    constructor(hp_max, atk, defence, healing, accuracy, evasion, critical, critical_res, critical_dmg, critical_dmg_res, stability, shoot_range, cc_power, cc_res, recovery, hp_now = -1, others = {}) {
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
        this.hp_now = hp_now;
        if (hp_now == -1) {
            this.hp_now = this.hp_max;
        }
        this.others = others;
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
    }
    // 用于更新buff的函数，输入字典数组，将处理不掉的buff整合成一个字典并给others
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
    }
}
exports.Status = Status;
// 基本属性类，用于接入学生类
class Property {
    constructor(duty, occupation, location, school, club, atk_type, def_type, gun_type, mag_load, reload_count, hits, adaption) {
        this.duty = duty;
        this.occupation = occupation;
        this.location = location;
        this.school = school;
        this.club = club;
        this.atk_type = atk_type;
        this.def_type = def_type;
        this.gun_type = gun_type;
        this.mag_load = mag_load;
        this.reload_count = reload_count;
        this.hits = hits;
        this.adaption = adaption;
    }
}
exports.Property = Property;
// 装备类，用于接入学生类
class Equipment {
    constructor(form, level, status) {
        this.form = form;
        this.level = level;
        this.status = status;
    }
}
exports.Equipment = Equipment;
// 专武类，用于接入学生类，其中专武属性是一个字典，值是对应等级的属性数组，例：{atk_plus: [100, 200, 300], ...}
class Exclusive_weapon {
    constructor(level, status, skill_plus, adaption_plus) {
        this.level = level;
        this.status = status;
        this.skill_plus = skill_plus;
        this.adaption_plus = adaption_plus;
    }
}
exports.Exclusive_weapon = Exclusive_weapon;
// 爱用品类，用于接入学生类(暂未实现)
class Favorite {
}
exports.Favorite = Favorite;
// 普通攻击类，用于接入学生类
class Attack {
    constructor(atk_duration, atk_delay, reload_duration, reload_start_delay, reload_end_delay, rate_func1, rate_func2, rate_func3) {
        this.atk_duration = atk_duration;
        this.atk_delay = atk_delay;
        this.reload_duration = reload_duration;
        this.reload_start_delay = reload_start_delay;
        this.reload_end_delay = reload_end_delay;
        this.rate_func1 = rate_func1;
        this.rate_func2 = rate_func2;
        this.rate_func3 = rate_func3;
    }
}
exports.Attack = Attack;
// 技能类，用于接入学生类
class Skill {
    constructor(name, cost, damage_rate1, buff, debuff, duration, delay, message, damage_rate2, damage_rate3) {
        this.name = name;
        this.cost = cost;
        this.damage_rate1 = damage_rate1;
        this.buff = buff;
        this.debuff = debuff;
        this.duration = duration;
        this.delay = delay;
        this.damage_rate2 = damage_rate2;
        this.damage_rate3 = damage_rate3;
        this.message = message;
    }
}
exports.Skill = Skill;
// 学生类
class Student {
    constructor(name, stars, level, relationship, status, properties, equipments, exclusive_weapon, favorate, attack, skills, atk_time = 0, basic_time, buff = []) {
        this.name = name;
        this.stars = stars;
        this.level = level;
        this.relationship = relationship;
        this.status = status;
        this.properties = properties;
        this.equipments = equipments;
        this.exclusive_weapon = exclusive_weapon;
        this.favorate = favorate;
        this.attack = attack;
        this.skills = skills;
        this.buff = buff;
        this.atk_time = atk_time;
        this.basic_time = basic_time;
    }
    // 更新星级属性的函数
    update_stars() {
        let s = 5;
        if (this.stars.stars <= 5) {
            s = this.stars.stars;
        }
        this.status.hp_max = this.stars.status[s][0];
        this.status.atk = this.stars.status[s][1];
        this.status.healing = this.stars.status[s][2];
    }
    // 更新好感度带来的属性加成的函数
    update_relationship() {
        this.status.hp_max += this.relationship.bonus_func(this.relationship.hearts)[0];
        this.status.atk += this.relationship.bonus_func(this.relationship.hearts)[1];
        this.status.defence += this.relationship.bonus_func(this.relationship.hearts)[2];
        this.status.healing += this.relationship.bonus_func(this.relationship.hearts)[3];
    }
    // 更新专武属性与效果的函数
    update_exclusive_weapon() {
        if (this.stars.stars === 5) {
            let value = [
                this.exclusive_weapon.status["hp_max_plus"][0],
                this.exclusive_weapon.status["atk_plus"][0],
                this.exclusive_weapon.status["healing_plus"][0],
            ];
            this.status.hp_max += value[0];
            this.status.atk += value[1];
            this.status.healing += value[2];
            this.exclusive_weapon.level = 30;
        }
        if (this.stars.stars === 6) {
            let value = [
                this.exclusive_weapon.status["hp_max_plus"][1],
                this.exclusive_weapon.status["atk_plus"][1],
                this.exclusive_weapon.status["healing_plus"][1]
            ];
            this.status.hp_max += value[0];
            this.status.atk += value[1];
            this.status.healing += value[2];
            this.exclusive_weapon.level = 40;
            this.skills[2].name += "+";
            this.skills[2].buff = { ...this.skills[2].buff, ...this.exclusive_weapon.skill_plus };
        }
        if (this.stars.stars === 7) {
            let value = [
                this.exclusive_weapon.status["hp_max_plus"][2],
                this.exclusive_weapon.status["atk_plus"][2],
                this.exclusive_weapon.status["healing_plus"][2]
            ];
            this.status.hp_max += value[0];
            this.status.atk += value[1];
            this.status.healing += value[2];
            this.exclusive_weapon.level = 50;
            this.skills[2].name += "+";
            this.skills[2].buff = { ...this.skills[2].buff, ...this.exclusive_weapon.skill_plus };
            for (let [key, value] of Object.entries(this.exclusive_weapon.adaption_plus)) {
                if (key in this.properties.adaption) {
                    this.properties.adaption[key] = value;
                }
            }
        }
    }
    // 用于统合以上更新操作的函数
    update_status() {
        this.update_stars();
        this.update_relationship();
        this.update_exclusive_weapon();
    }
}
exports.Student = Student;
// boss属性类，用于接入boss类
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
exports.Boss_status = Boss_status;
// boss普通攻击类，用于接入boss类
class Boss_attack {
    constructor(rate, atk_duration, atk_delay) {
        this.rate = rate;
        this.atk_duration = atk_duration;
        this.atk_delay = atk_delay;
    }
}
exports.Boss_attack = Boss_attack;
// boss技能类，用于接入boss类（这里先占个坑，目前还没做，但是接进去了个空的类）
class Boss_skill {
}
exports.Boss_skill = Boss_skill;
// boss类
class Boss {
    constructor(name, difficulty, status, attack, skills, buff = [], dmg_rate = 1) {
        this.name = name;
        this.difficulty = difficulty;
        this.status = status;
        this.attack = attack;
        this.skills = skills;
        this.buff = buff;
        this.dmg_rate = dmg_rate;
    }
}
exports.Boss = Boss;
// 行动指令类，用于进行战斗过程信息交互
class Action {
    constructor(initiator, receiver, name, id, content, act_time, effect_time, duration = 0) {
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
exports.Action = Action;
