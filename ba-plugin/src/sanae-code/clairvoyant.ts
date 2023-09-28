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
const event14 = new EventRewards("学漫同人物语", "2024/2/20", "2024/3/5", 600, 1500, 540);
const event15 = new EventRewards("复刻运动会一期", "2024/3/5", "2024/3/14", 0, 1440, 1080);
const event16 = new EventRewards("复刻运动会二期", "2024/3/14", "2024/3/26", 600, 600, 1080);
const events = [event1, event2, event3, event4, event5, event6, event7, event8, event9, weihu0, event10, event11, event12, event13, event14, event15, event16];

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
const blackwhite_street = new RankBattle("市街黑白", "2023/10/31", "2023/11/7");
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
function rankDia(startTime: string, endTime: string, rank: number) {
    let start = new Date(startTime);
    let end = new Date(endTime);
    let dia = 0;
    for (let item of battles) {
        if (new Date(item.startTime) >= start && new Date(item.startTime) <= end) {
            if (rank == 1) {
                dia += item.basic + 1200;
            } else if (rank == 2 ) {
                dia += item.basic + 1000;
            } else if (rank == 3) {
                dia += item.basic + 800;
            } else if (rank == 4) {
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
            dia += item.basic;
        }
    }
    return dia
}


export function getZZMessage(input: string): string | any[] {
    // 匹配日期
    const timeRegex = /(\d{4})(?:年|\.|\/)(\d{1,2})(?:月|\.|\/)(\d{1,2})(?:日)?/;
    const timeMatch = input.match(timeRegex);
    let endTime = "";
    if (timeMatch) {
        const year = parseInt(timeMatch[1]);
        const month = parseInt(timeMatch[2]);
        const day = parseInt(timeMatch[3]);
        // 日期合理性验证
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        if (day == currentDay && month == currentMonth && year == currentYear) {
            return "今天的钻已经到账啦，试着从明天开攒吧~"
        } else if (day < currentDay && month <= currentMonth && year <= currentYear) {
            return "百川东到海，何时复西归。"
        } else if (month < currentMonth && year <= currentYear) {
            return "流水落花春去也，天上人间。"
        } else if (year < currentYear) {
            return "少壮不努力,老大徒伤悲。"
        } else {
            endTime = `${year}/${month}/${day}`;
        }
    } else {
        return "未匹配到日期信息，请按“年/月/日”格式输入目标日期"
    }
    // 匹配月卡
    const checkRegex1 = /月卡(有|无|没有)/;
    const checkRegex2 = /(有|无|没有)月卡/;
    let checkMatch1 = input.match(checkRegex1);
    let check = false;
    if (checkMatch1) {
        check = checkMatch1[1] === '有';
    } else {
       let checkMatch2 = input.match(checkRegex2);
        if (checkMatch2) {
            check = checkMatch2[1] === '有';
        } else {
            return "未匹配到月卡信息"
        }
    }
    // 匹配jjc每日收入
    let jjc = 0;
    const jjcRegex = /jjc.*?(\d+)/;
    const jjcMatch = input.match(jjcRegex);
    if (jjcMatch) {
        jjc = parseInt(jjcMatch[1]);
    } else {
        return "未匹配到每日jjc收入"
    }
    // 匹配挑战完成比例%
    let challenge = 0;
    const challengeRegex = /挑战.*?(\d+)/;
    const challengeMatch = input.match(challengeRegex);
    if (challengeMatch) {
        challenge = parseInt(challengeMatch[1]);
    } else {
        return "未匹配到活动挑战任务完成比例"
    }
    // 匹配总力战档位
    let rank = 0;
    const rankRegex = /总力.*?(一|二|三|四|五|1|2|3|4|5)/;
    const rankMatch = input.match(rankRegex);
    const rankMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5};
    if (rankMatch) {
        rank = rankMap[rankMatch[1]];
    } else {
        return "未匹配到总力战档位，若不参加总力战请按5档进行输入"
    }

    return [endTime, check, jjc, challenge, rank]
}
  

export function accumulateDia(endTime: string, check: boolean, jjc: number, challenge: number, rank: number) {
    // 获取当前时间
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
    let result: string[] = [];
    result.push(`-日常奖励：${daily(check, jjc, days)}\n`);
    result.push(`-周常任务：${weekly(days)}\n`);
    result.push(`-签到奖励：${sign(days)}\n`);
    result.push(`-活动奖励及维护补偿：${eventDia(startTime, endTime, challenge)}\n`);
    result.push(`-新开放剧情奖励：${mainStory(startTime, endTime)}\n`);
    result.push(`-总力战+大决战：${rankIncome}\n`);
    result.push(`-总计：${daily(check, jjc, days) + weekly(days) + sign(days) + eventDia(startTime, endTime, challenge) + mainStory(startTime, endTime) + rankIncome}\n`);
    result.push("注意：计算结果与实际所得会存在一定偏差，仅供参考");
    
    return result
}



