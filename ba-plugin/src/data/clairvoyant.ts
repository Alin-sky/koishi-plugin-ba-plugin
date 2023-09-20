// 卡池类，用于记录卡池的时间以及up角色（没用上，想多了）
// class GachaPool {
//     name: string;
//     startTime: string;
//     endTime: string;
//     up1: string;
//     up2?: string;
//     up3?: string;
//     up4?: string;
//     up5?: string;

//     constructor(
//         name: string,
//         startTime: string,
//         endTime: string,
//         up1: string,
//         up2?: string,
//         up3?: string,
//         up4?: string,
//         up5?: string
//         ) {
//         this.name = name;
//         this.startTime = startTime;
//         this.endTime = endTime;
//         this.up1 = up1;
//         this.up2 = up2;
//         this.up3 = up3;
//         this.up4 = up4;
//         this.up5 = up5;         
//         }
// }


// // 千里眼预估卡池，时间可能随活动排期变化而更改（没用上）
// const pool0 = new GachaPool("轮椅池", "2023/5/16", "2023/5/29", "日鞠", "艾米");
// const pool1 = new GachaPool("温泉复刻池", "2023/5/30", "2023/6/13", "时雨", "和香（温泉）", "千夏（温泉）", "切利诺（温泉）");
// const pool2 = new GachaPool("圣诞池", "2023/6/13", "2023/6/27", "芹奈（圣诞节）", "花绘（圣诞节）");
// const pool3 = new GachaPool("新春2期池", "2023/6/27", "2023/7/11", "晴奈（正月）（限定）", "枫香（正月）（限定）");
// const pool4 = new GachaPool("情人节复刻池", "2023/7/11", "2023/7/25", "美弥", "濑名", "千寻");
// const pool5 = new GachaPool("2周年fes池", "2023/7/25", "2023/8/1", "未花（fes限定）");
// const pool6 = new GachaPool("局长池（送100抽）", "2023/8/1", "2023/8/11", "康娜", "惠");
// const pool7 = new GachaPool("古书馆复刻池", "2023/8/11", "2023/8/22", "樱子", "忧", "日向");
// const pool8 = new GachaPool("终章池1", "2023/8/22", "2023/9/5", "时（限定）", "渚（限定）");
// const pool9 = new GachaPool("终章池2", "2023/9/5", "2023/9/19", "小雪", "白子");
// const pool10 = new GachaPool("新春1期复刻池", "2023/9/19", "2023/10/3", "睦月（正月）（限定）", "阿露（正月）（限定）", "茜香（正月）", "佳代子（正月）", "遥香（正月）");
// const pool11 = new GachaPool("樱花活动复刻池", "2023/10/3", "2023/10/10", "伊树菜", "三森");
// const pool12 = new GachaPool("不忍之心复刻池", "2023/10/10", "2023/10/17", "果穗", "伊吕波", "枫", "月咏");
// const pool13 = new GachaPool("红冬活动复刻池", "2023/10/17", "2023/10/24", "切利诺", "玛里娜");
// const pool14 = new GachaPool("女仆游戏部池", "2023/10/24", "2023/11/6", "爱丽丝（女仆）", "时（兔女郎）");
// const pool15 = new GachaPool("甜点部复刻池", "2023/11/7", "2023/11/13", "玲纱", "夏", "和纱");
// const pool16 = new GachaPool("泳装1期复刻池", "2023/11/14", "2023/11/21", "梓（泳装）（限定）", "真白（泳装）（限定）", "日富美（泳装）");
// const pools = [pool0, pool1, pool2, pool3, pool4, pool5, pool6, pool7, pool8, pool9, pool10, pool11, pool12, pool13, pool14, 
//     pool15, pool16, ]

// 活动奖励类，用来记录活动的时间以及钻石奖励
class EventRewards {
    name: string;
    startTime: string;
    endTime: string;
    maintenance: number;
    normal: number;
    challenge: number; 
    
    constructor(
        name: string,
        startTime: string,
        endTime: string,
        maintenance: number,
        normal: number,
        challenge: number 
    ) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maintenance = maintenance;
        this.normal = normal;
        this.challenge = challenge
    }


}


// 千里眼预估活动，时间可能随活动排期变化而更改
const event0 = new EventRewards("白鸟区修复", "2023/9/8", "2023/9/26", 0, 780, 880);
const event1 = new EventRewards("新春1期复刻活动", "2023/9/26", "2023/10/10", 600, 1220, 750);
const event2 = new EventRewards("新任教师任务重置", "2023/9/26", "9999/12/30", 0, 1200, 0);
const event3 = new EventRewards("不忍之心复刻活动", "2023/10/17", "2023/10/24", 600, 1350, 460);
const event4 = new EventRewards("白亚的预告信活动", "2023/10/31", "2023/11/14", 600, 1110, 600);
const event5 = new EventRewards("登录活动", "2023/11/6", "2023/11/20", 0, 600, 0);
const event6 = new EventRewards("甜品部复刻活动", "2023/11/14", "2023/11/21", 600, 1720, 700);
const event7 = new EventRewards("龙武同舟", "2023/11/28", "2023/12/12", 600, 1350, 660);
const event8 = new EventRewards("登录活动", "2023/12/17", "2023/12/31", 0, 1200, 0);
const event9 = new EventRewards("水兔子活动", "2023/12/26", "2024/1/9", 600, 1680, 1080);
const weihu0 = new EventRewards("格里高利上线维护", "2024/1/9", "2024/16", 600, 0, 0)
const event10 = new EventRewards("复刻泳装3期", "2024/1/16", "2024/1/23", 600, 3420, 720);
const event11 = new EventRewards("水花子活动", "2024/1/23", "2024/2/8", 600, 1260, 720);
const event12 = new EventRewards("登录活动", "2024/1/28", "2024/2/11", 0, 1200, 0);
const event13 = new EventRewards("复刻泳装4期", "2024/2/13", "2024/2/20", 600, 2110, 300);
const events = [event0, event1, event2, event3, event4, event5, event6, event7, event8, event9, weihu0, event10, event11, event12, event13];

// 主线剧情奖励
class MainLine {
    name: string;
    startTime: string;
    diamond: number;

    constructor(name: string, startTime: string, diamond: number) {
        this.name = name;
        this.startTime = startTime;
        this.diamond = diamond;
    }  
}


// 主线剧情时间安排
const cp42a = new MainLine("第4章2上", "2023/12/12", 1200);
const cp42b = new MainLine("第4章2下", "2023/12/19", 840);
const mains = [cp42a,cp42b];


// 总力战奖励，结算为结束后一天
class RankBattle {
    name: string;
    startTime: string;
    endTime: string;
    basic: number;
    rank: number;

    constructor(name: string, startTime: string, endTime: string, basic: number = 650, rank: number = 1200) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.basic = basic;
        this.rank = rank
    }
}

//总力战安排
const binah_outdoor = new RankBattle("室外大蛇", "2023/9/19", "2023/9/26");
const goz_indoor = new RankBattle("室内goz", "2023/10/3", "2023/10/10");
const chesed_indoor = new RankBattle("室内球", "2023/10/17", "2023/10/24");
const blackwhite_street = new RankBattle("市街黑白", "2023/10/31", "2023/10/7");
const kaiten_outdoor = new RankBattle("室外寿司", "2023/11/14", "2023/11/21");
const peroro_outdoor = new RankBattle("室外鸡", "2023/11/28", "2023/12/5");
const hod_indoor = new RankBattle("室内hod", "2023/12/12", "2023/12/19");
const glgl_indoor = new RankBattle("室内格里高利", "2024/1/2", "2024/1/9");
const goz_outdoor = new RankBattle("室外goz", "2024/1/30", "2024/2/6");
const hovercraft_outdoor = new RankBattle("室外气垫船", "2024/2/27", "2024/3/5");
const battles = [binah_outdoor, goz_indoor, chesed_indoor, blackwhite_street, kaiten_outdoor, peroro_outdoor, hod_indoor, 
                glgl_indoor, goz_outdoor, hovercraft_outdoor];

//大决战奖励
class Armageddon {
    name: string;
    startTime: string;
    endTime: string;
    basic: number;

    constructor(name: string, startTime: string, endTime: string, basic: number = 650) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.basic = basic;
    }
}

//大决战安排
const binah_street_a = new Armageddon("市街大蛇", "2023/12/26", "2024/1/2");
const kaiten_street_a = new Armageddon("市街寿司", "2024/1/9", "2024/1/16");
const peroro_outdoor_a = new Armageddon("室外鸡", "2024/2/13", "2024/2/20");
const blackwhite_indoor_a = new Armageddon("室内黑白", "2024/3/12", "2024/3/19");
const combats = [binah_street_a, kaiten_street_a, peroro_outdoor_a, blackwhite_indoor_a];


// 计算部分
// 每日石头计算
function daily(check: boolean, jjc: number, days: number) {
    let dia = 20;
    if (check) {
        dia += 60;
    }
    return (dia + jjc) * days
}
// 每周石头计算
function weekly(days: number) {
    return 120 * (Math.floor(days / 7))
}
// 签到石头计算
function sign(days: number) {
    let turn = Math.floor(days / 10);
    let rest = days % 10;
    if (rest >= 5 && rest < 10) {
        return 150 * turn + 50
    } else {
        return 150 * turn
    }
}
// 活动以及维护石头计算
function eventDia(startTime: string, endTime: string, ability: number) {
    let start = new Date(startTime);
    let end = new Date(endTime);
    let dia = 0;
    for (let item of events) {
        if (new Date(item.startTime) >= start && new Date(item.startTime) <= end) {
            dia += item.maintenance + item.normal + item.challenge * ability / 100;
        }
    }
    return dia
}
// 看主线剧情石头计算
function mainStory(startTime: string, endTime: string) {
    let start = new Date(startTime);
    let end = new Date(endTime);
    let dia = 0;
    for (let item of mains) {
        if (new Date(item.startTime) >= start && new Date(item.startTime) < end) {
            dia += item.diamond;
        }
    }
    return dia
}
// 总力战石头计算
function rankDia(startTime: string, endTime: string, rank: string) {
    let start = new Date(startTime);
    let end = new Date(endTime);
    let dia = 0;
    for (let item of battles) {
        if (new Date(item.startTime) >= start && new Date(item.startTime) <= end) {
            if (rank === "1") {
                dia += item.basic + 1200;
            } else if (rank === "2" ) {
                dia += item.basic + 1000;
            } else if (rank === "3") {
                dia += item.basic + 800;
            } else if (rank === "4") {
                dia += item.basic + 600;
            } 
        }
    }
    return dia
}

// 大决战石头计算
function armageddonDia(startTime: string, endTime: string) {
    let start = new Date(startTime);
    let end = new Date(endTime);
    let dia = 0;
    for (let item of combats) {
        if (new Date(item.startTime) >= start && new Date(item.startTime) <= end) {
            dia += item.basic
        }
    }
    return dia
}


export function getMessage(input: string) {
    const timeRegex = /(\d{4})(?:年|\.|\/)(\d{1,2})(?:月|\.|\/)(\d{1,2})(?:日)?/;
    const timeMatch = input.match(timeRegex);
    let endTime = null;
    if (timeMatch) {
        const year = timeMatch[1];
        const month = timeMatch[2];
        const day = timeMatch[3];
        endTime = `${year}/${month}/${day}`;
    }
  
    const checkRegex1 = /月卡(有|无|没有)/;
    const checkRegex2 = /(有|无|没有)月卡/;
    let checkMatch = input.match(checkRegex2);
    let check = false;
    if (checkMatch) {
        check = checkMatch && checkMatch[1] === '有';
    } else {
        checkMatch = input.match(checkRegex1);
        if (checkMatch) {
            check = checkMatch && checkMatch[1] === '有';
        }
    }

    const jjcRegex = /jjc.*?(\d+)/;
    const jjcMatch = input.match(jjcRegex);
    const jjc = jjcMatch && parseInt(jjcMatch[1]);
  
    const challengeRegex = /挑战.*?(\d+)/;
    const challengeMatch = input.match(challengeRegex);
    const challenge = challengeMatch && parseInt(challengeMatch[1]);
  
    const rankRegex = /总力.*?(一|二|三|四|五|1|2|3|4|5)/;
    const rankMatch = input.match(rankRegex);
    const rankMap = { '一': '1', '二': '2', '三': '3', '四': '4', '五': '5', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5'};
    const rank = rankMatch && rankMap[rankMatch[1]];
  
    return [endTime, check, jjc, challenge, rank];
}
  

export function accumulate(endTime: string, check: boolean, jjc: number, ability: number, rank: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const startTime = `${year}/${month}/${day}`;
    // 计算时间差值（毫秒数）
    const timeDifference = new Date(endTime).getTime() - new Date(startTime).getTime();
    // 将时间差值转换为天数
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // 将大决战和总力战的收益算在一起
    let rankIncome = rankDia(startTime, endTime, rank) + armageddonDia(startTime, endTime);
    return [daily(check, jjc, days).toString() , weekly(days).toString() , sign(days).toString() , eventDia(startTime, endTime, ability).toString() ,
        mainStory(startTime, endTime).toString() , rankIncome.toString(), (daily(check, jjc, days) + weekly(days) + sign(days) + 
        eventDia(startTime, endTime, ability) + mainStory(startTime, endTime) + rankIncome).toString()]
}



