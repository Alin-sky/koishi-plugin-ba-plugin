export declare class Stars {
    stars: number;
    status: {
        [key: number]: number[];
    };
    basic_stars: number;
    constructor(stars: number, status: {
        [key: number]: number[];
    }, basic_stars?: number);
}
export declare class Relationship {
    hearts: number;
    bonus_func: (hearts: number) => [number, number, number, number];
    constructor(hearts: number, bonus_func: (hearts: number) => [number, number, number, number]);
}
export declare class Status {
    hp_max: number;
    atk: number;
    defence: number;
    healing: number;
    accuracy: number;
    evasion: number;
    critical: number;
    critical_res: number;
    critical_dmg: number;
    critical_dmg_res: number;
    stability: number;
    shoot_range: number;
    cc_power: number;
    cc_res: number;
    recovery: number;
    hp_max1: number;
    atk1: number;
    defence1: number;
    healing1: number;
    accuracy1: number;
    evasion1: number;
    critical1: number;
    critical_res1: number;
    critical_dmg1: number;
    critical_dmg_res1: number;
    stability1: number;
    shoot_range1: number;
    cc_power1: number;
    cc_res1: number;
    recovery1: number;
    hp_now: number;
    others: any;
    constructor(hp_max: number, atk: number, defence: number, healing: number, accuracy: number, evasion: number, critical: number, critical_res: number, critical_dmg: number, critical_dmg_res: number, stability: number, shoot_range: number, cc_power: number, cc_res: number, recovery: number, hp_now?: number, others?: any);
    record(): void;
    update_buff_status(buff: Record<string, number>[]): void;
    reset_status(): void;
}
export declare class Property {
    duty: string;
    occupation: string;
    location: string;
    school: string;
    club: string;
    atk_type: string;
    def_type: string;
    gun_type: string;
    mag_load: number;
    reload_count: number;
    hits: number;
    adaption: Record<string, string>;
    constructor(duty: string, occupation: string, location: string, school: string, club: string, atk_type: string, def_type: string, gun_type: string, mag_load: number, reload_count: number, hits: number, adaption: Record<string, string>);
}
export declare class Equipment {
    form: string;
    level: number;
    status: {
        [key: string]: any;
    };
    constructor(form: string, level: number, status: {
        [key: string]: any;
    });
}
export declare class Exclusive_weapon {
    level: number;
    status: {
        [key: string]: any;
    };
    skill_plus: {
        [key: string]: any;
    };
    adaption_plus: {
        [key: string]: string;
    };
    constructor(level: number, status: {
        [key: string]: any;
    }, skill_plus: {
        [key: string]: any;
    }, adaption_plus: {
        [key: string]: string;
    });
}
export declare class Favorite {
}
export declare class Attack {
    atk_duration: number;
    atk_delay: number;
    reload_duration: number;
    reload_start_delay: number;
    reload_end_delay: number;
    rate_func1: (atk: number) => number;
    rate_func2?: (atk: number) => number;
    rate_func3?: (atk: number) => number;
    constructor(atk_duration: number, atk_delay: number, reload_duration: number, reload_start_delay: number, reload_end_delay: number, rate_func1: (atk: number) => number, rate_func2?: (atk: number) => number, rate_func3?: (atk: number) => number);
}
export declare class Skill {
    name: string;
    cost: number;
    damage_rate1: (atk: number) => number;
    buff: Record<string, number>;
    debuff: Record<string, number>;
    duration: number;
    delay: number;
    message?: string;
    damage_rate2?: (atk: number) => number;
    damage_rate3?: (atk: number) => number;
    constructor(name: string, cost: number, damage_rate1: (atk: number) => number, buff: Record<string, number>, debuff: Record<string, number>, duration: number, delay: number, message?: string, damage_rate2?: (atk: number) => number, damage_rate3?: (atk: number) => number);
}
export declare class Student {
    name: string;
    stars: Stars;
    level: number;
    relationship: Relationship;
    status: Status;
    properties: Property;
    equipments: [Equipment, Equipment, Equipment];
    exclusive_weapon: Exclusive_weapon;
    favorate: Favorite;
    attack: Attack;
    skills: [Skill, Skill, Skill, Skill];
    atk_time: number;
    basic_time?: number;
    buff: Record<string, number>[];
    constructor(name: string, stars: Stars, level: number, relationship: Relationship, status: Status, properties: Property, equipments: [Equipment, Equipment, Equipment], exclusive_weapon: Exclusive_weapon, favorate: Favorite, attack: Attack, skills: [Skill, Skill, Skill, Skill], atk_time?: number, basic_time?: number, buff?: Record<string, number>[]);
    update_stars(): void;
    update_relationship(): void;
    update_exclusive_weapon(): void;
    update_status(): void;
}
export declare class Boss_status {
    hp_max: number;
    atk: number;
    defence: number;
    received_dmg_res: number;
    accuracy: number;
    evasion: number;
    critical: number;
    critical_res: number;
    critical_dmg: number;
    critical_dmg_res: number;
    stability: number;
    shoot_range: number;
    groggy_gauge: number;
    groggy_duration: number;
    atk_type: string;
    def_type: string;
    land_form: string;
    adaption: {
        [key: string]: any;
    };
    hp_max1: number;
    atk1: number;
    defence1: number;
    received_dmg_res1: number;
    accuracy1: number;
    evasion1: number;
    critical1: number;
    critical_res1: number;
    critical_dmg1: number;
    critical_dmg_res1: number;
    stability1: number;
    shoot_range1: number;
    groggy_gauge1: number;
    groggy_duration1: number;
    atk_type1: string;
    def_type1: string;
    land_form1: string;
    adaption1: {
        [key: string]: any;
    };
    hp_now: number;
    constructor(hp_max: number, atk: number, defence: number, received_dmg_res: number, accuracy: number, evasion: number, critical: number, critical_res: number, critical_dmg: number, critical_dmg_res: number, stability: number, shoot_range: number, groggy_gauge: number, groggy_duration: number, atk_type: string, def_type: string, land_form: string, adaption: {
        [key: string]: any;
    }, hp_now?: number);
    record(): void;
    update_buff_status(buff: Record<string, number>[]): void;
    reset_status(): void;
}
export declare class Boss_attack {
    rate: number;
    atk_duration: number;
    atk_delay: number;
    constructor(rate: number, atk_duration: number, atk_delay: number);
}
export declare class Boss_skill {
}
export declare class Boss {
    name: string;
    difficulty: string;
    status: Boss_status;
    attack: Boss_attack;
    skills: Boss_skill[];
    buff: Record<string, number>[];
    dmg_rate: number;
    constructor(name: string, difficulty: string, status: Boss_status, attack: Boss_attack, skills: Boss_skill[], buff?: Record<string, number>[], dmg_rate?: number);
}
export declare class Action {
    initiator: Student | Boss;
    receiver: Student | Boss;
    name: string;
    id: string;
    content: any;
    act_time: number;
    effect_time: number;
    duration: number;
    constructor(initiator: Student | Boss, receiver: Student | Boss, name: string, id: string, content: any, act_time: number, effect_time: number, duration?: number);
}
