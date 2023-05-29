// 卡池类，用于记录卡池的时间以及up角色（没用上，想多了）
class GachaPool {
    name: string;
    startTime: string;
    endTime: string;
    up1: string;
    up2?: string;
    up3?: string;
    up4?: string;
    up5?: string;

    constructor(
        name: string,
        startTime: string,
        endTime: string,
        up1: string,
        up2?: string,
        up3?: string,
        up4?: string,
        up5?: string
        ) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.up1 = up1;
        this.up2 = up2;
        this.up3 = up3;
        this.up4 = up4;
        this.up5 = up5;         
        }
}


// 千里眼预估卡池，时间可能随活动排期变化而更改（没用上）
const pool0 = new GachaPool("轮椅池", "2023/5/16", "2023/5/29", "日鞠", "艾米");
const pool1 = new GachaPool("温泉复刻池", "2023/5/30", "2023/6/13", "时雨", "和香（温泉）", "千夏（温泉）", "切利诺（温泉）");
const pool2 = new GachaPool("圣诞池", "2023/6/13", "2023/6/27", "芹奈（圣诞节）", "花绘（圣诞节）");
const pool3 = new GachaPool("新春2期池", "2023/6/27", "2023/7/11", "晴奈（正月）（限定）", "枫香（正月）（限定）");
const pool4 = new GachaPool("情人节复刻池", "2023/7/11", "2023/7/25", "美弥", "濑名", "千寻");
const pool5 = new GachaPool("2周年fes池", "2023/7/25", "2023/8/1", "未花（fes限定）");
const pool6 = new GachaPool("局长池（送100抽）", "2023/8/1", "2023/8/11", "康娜", "惠");
const pool7 = new GachaPool("古书馆复刻池", "2023/8/11", "2023/8/22", "樱子", "忧", "日向");
const pool8 = new GachaPool("终章池1", "2023/8/22", "2023/9/5", "时（限定）", "渚（限定）");
const pool9 = new GachaPool("终章池2", "2023/9/5", "2023/9/19", "小雪", "白子");
const pool10 = new GachaPool("新春1期复刻池", "2023/9/19", "2023/10/3", "睦月（正月）（限定）", "阿露（正月）（限定）", "茜香（正月）", "佳代子（正月）", "遥香（正月）");
const pool11 = new GachaPool("樱花活动复刻池", "2023/10/3", "2023/10/10", "伊树菜", "三森");
const pool12 = new GachaPool("不忍之心复刻池", "2023/10/10", "2023/10/17", "果穗", "伊吕波", "枫", "月咏");
const pool13 = new GachaPool("红冬活动复刻池", "2023/10/17", "2023/10/24", "切利诺", "玛里娜");
const pool14 = new GachaPool("女仆游戏部池", "2023/10/24", "2023/11/6", "爱丽丝（女仆）", "时（兔女郎）");
const pool15 = new GachaPool("甜点部复刻池", "2023/11/7", "2023/11/13", "玲纱", "夏", "和纱");
const pool16 = new GachaPool("泳装1期复刻池", "2023/11/14", "2023/11/21", "梓（泳装）（限定）", "真白（泳装）（限定）", "日富美（泳装）");
const pools = [pool0, pool1, pool2, pool3, pool4, pool5, pool6, pool7, pool8, pool9, pool10, pool11, pool12, pool13, pool14, 
    pool15, pool16, ]

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
const event0 = new EventRewards("十字神名搜查活动", "2023/5/16", "2023/5/29", 0, 0, 320);
const event1 = new EventRewards("vol2上篇7天任务", "2023/5/23", "2023/5/29", 600, 1200, 0);
const event2 = new EventRewards("温泉复刻活动", "2023/5/30", "2023/6/13", 0, 1085, 750);
const event3 = new EventRewards("圣诞节活动", "2023/6/13", "2023/6/27", 600, 1830, 700);
const event4 = new EventRewards("圣诞节登录活动", "2023/6/13", "2023/6/27", 0, 600, 0);
const event5 = new EventRewards("新春2期活动", "2023/6/27", "2023/7/11", 600, 1120, 660);
const event6 = new EventRewards("情人节复刻活动", "2023/7/11", "2023/7/25", 600, 1000, 850);
const event7 = new EventRewards("看主线活动", "2023/6/27", "2023/7/10", 0, 1240, 0);
const event8 = new EventRewards("终章登录活动", "2023/7/25", "2023/8/13", 600, 2280, 0);
const event9 = new EventRewards("终章色彩大战", "2023/8/1", "2023/8/10", 0, 6920, 0);
const event10 = new EventRewards("古书馆复刻活动", "2023/8/11", "2023/8/22", 600, 1060, 820);
const event11 = new EventRewards("终章方舟占领战", "2023/8/22", "2023/9/4", 600, 1715, 350);
const event12 = new EventRewards("终章方舟决战+白鸟区修复", "2023/9/5", "2023/9/18", 600, 2600, 0);
const event13 = new EventRewards("新春1期复刻活动", "2023/9/19", "2023/10/3", 600, 620, 750);
const event14 = new EventRewards("不忍之心复刻活动", "2023/10/10", "2023/10/17", 600, 750, 460);
const event15 = new EventRewards("白亚的预告信活动", "2023/10/24", "2023/11/7", 600, 910, 600);
const event16 = new EventRewards("登录活动", "2023/10/24", "2023/11/7", 0, 600, 0);
const event17 = new EventRewards("甜品部复刻活动", "2023/11/7", "2023/11/13", 600, 1720, 700);
const events = [event0, event1, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12, event13, event14, 
    event15, event16, event17,]

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
const cp2a = new MainLine("发条花上篇", "2023/5/23", 650);
const cp2b = new MainLine("发条花下篇", "2023/6/6", 650);
const end12 = new MainLine("终章1、2", "2023/7/25", 2160);
const end3 = new MainLine("终章3", "2023/8/22", 960);
const end4 = new MainLine("终章4", "2023/9/5", 1800);
const mains = [cp2a, cp2b, end12, end3, end4,];


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

const binah_street = new RankBattle("市街大蛇", "2023/5/23", "2023/5/29");
const chesed_indoor = new RankBattle("室内球", "2023/6/6", "2023/6/12");
const peroro_indoor = new RankBattle("室内鸡", "2023/6/20", "2023/6/26");
const hiero_indoor = new RankBattle("室内主教", "2023/7/4", "2023/7/10");
const blackwhite_indoor = new RankBattle("室内黑白", "2023/7/18", "2023/7/24");
const hiero_street = new RankBattle("市街主教", "2023/8/29", "2023/9/4");
const goz_indoor = new RankBattle("室内goz", "2023/9/12", "2023/9/18");
const binah_outdoor = new RankBattle("室外大蛇", "2023/9/26", "2023/10/2");
const chesed_indoor2 = new RankBattle("室内球", "2023/10/10", "2023/10/16");
const blackwhite_street = new RankBattle("市街黑白", "2023/10/24", "2023/10/30");
const kaiten_outdoor = new RankBattle("室外寿司", "2023/11/7", "2023/11/13");
const battles = [binah_street, chesed_indoor, peroro_indoor, hiero_indoor, blackwhite_indoor, hiero_street, goz_indoor, 
    binah_outdoor, chesed_indoor2, blackwhite_street, kaiten_outdoor, ]

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
  
    const rankRegex = /总力(一|二|三|四|五|1|2|3|4|5)/;
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
    return [daily(check, jjc, days).toString() , weekly(days).toString() , sign(days).toString() , eventDia(startTime, endTime, ability).toString() ,
        mainStory(startTime, endTime).toString() , rankDia(startTime, endTime, rank).toString(), (daily(check, jjc, days) + weekly(days) + sign(days) + 
        eventDia(startTime, endTime, ability) + mainStory(startTime, endTime) + rankDia(startTime, endTime, rank)).toString()]
}



