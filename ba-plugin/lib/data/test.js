"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.日服常驻十连 = exports.国际服常驻十连 = exports.国际服up十连 = exports.日服up十连 = exports.国际服井 = exports.日服井 = exports.国际up = exports.日服up = exports.cardPool = exports.cleardata = exports.nocai = exports.output103 = exports.output102 = exports.output101 = exports.upcard = exports.newcard = exports.pityCounter = exports.count3 = exports.count2 = exports.count1 = exports.count3up = exports.outputup = exports.cardname = exports.output = exports.turnout = exports.jsx_runtime_1 = void 0;
const index_1 = require("../index");
exports.jsx_runtime_1 = require("@satorijs/element/jsx-runtime");
exports.output = [];
exports.cardname = [];
exports.outputup = [];
exports.count3up = 0;
exports.count1 = 0; //一星计数器
exports.count2 = 0; //二星计数器
exports.count3 = 0; //三星计数器
exports.pityCounter = 0; // 保底计数器
exports.newcard = '';
exports.upcard = '';
exports.output101 = [];
exports.output102 = [];
exports.output103 = [];
exports.nocai = ['呜呜~没有彩', '没有彩，寄啦',
    '没有彩，再抽次试试吧', '阿罗娜没有给彩',
    '必  蓝  档  案', '阿罗娜把彩藏哪里了呢？'];
function cleardata() {
    //计数器
    exports.output = [];
    exports.outputup = [];
    exports.cardname = [];
    exports.count1 = 0;
    exports.count2 = 0;
    exports.count3 = 0;
    exports.count3up = 0;
    exports.pityCounter = 0;
    exports.output101 = [];
    exports.output102 = [];
    exports.output103 = [];
    exports.newcard = '';
    exports.upcard = '';
}
exports.cleardata = cleardata;
//卡池
exports.cardPool = {
    oneStar: [
        { name: "千夏", },
        { name: "好美", },
        { name: "芹奈", },
        { name: "明日奈", },
        { name: "柯托莉", },
        { name: "菲娜", },
        { name: "遥香", },
        { name: "朱莉", },
        { name: "志美子", },
        { name: "铃美", },
        { name: "小玉", },
    ],
    twoStar: [
        { name: "优香", },
        { name: "芹香", },
        { name: "爱莉", },
        { name: "桐乃", },
        { name: "枫香", },
        { name: "静子", },
        { name: "佳代子", },
        { name: "歌原", },
        { name: "晴", },
        { name: "花江", },
        { name: "花子", },
        { name: "小桃", },
        { name: "玛丽", },
        { name: "绫音", },
        { name: "明里", },
        { name: "朱音", },
        { name: "淳子", },
        { name: "知世", },
        { name: "莲见", },
        { name: "椿", },
        { name: "睦月", },
        { name: "野宫", },
    ],
    threeStar: [
        //三一
        { name: "日富美" },
        { name: "日富美（泳装）" },
        { name: "鹤城" },
        { name: "真白" },
        { name: "梓" },
        { name: "小春" },
        { name: "小夏" },
        { name: "优" },
        { name: "日向" },
        { name: "和纱" },
        { name: "芹奈（圣诞）" },
        { name: "花江（圣诞）" },
        { name: "美弥" },
        { name: "樱子" },
        { name: "玲纱" },
        //格黑娜
        { name: "阿露" },
        { name: "晴奈" },
        { name: "日奈" },
        { name: "伊织" },
        { name: "泉" },
        { name: "亚子" },
        { name: "千夏（温泉）" },
        { name: "濑名" },
        { name: "伊吕波" },
        { name: "惠" },
        { name: "佳代子（正月）" },
        { name: "遥香（正月）" },
        //千年
        { name: "艾米" },
        { name: "真纪" },
        { name: "尼禄" },
        { name: "堇" },
        { name: "响" },
        { name: "花凛" },
        { name: "爱丽丝" },
        { name: "绿" },
        { name: "柚子" },
        { name: "明日奈（兔女郎）" },
        { name: "千寻" },
        { name: "歌原（应援团）" },
        { name: "诺亚" },
        { name: "朱音（兔女郎）" },
        { name: "日鞠" },
        { name: "小雪" },
        { name: "爱丽丝（女仆装）" },
        { name: "时（兔女郎）" },
        //阿拜多斯，阿里乌斯
        { name: "星野" },
        { name: "白子" },
        { name: "白子（单车）" },
        { name: "茜香（正月）" },
        { name: "美咲" },
        { name: "日和" },
        { name: "敦子" },
        { name: "野宫（泳装）" },
        { name: "纱织" },
        //百鬼夜行，红冬，山海经，SRT，瓦尔基里
        { name: "瞬" },
        { name: "纱绫" },
        { name: "泉奈" },
        { name: "切里诺" },
        { name: "瞬（幼女）" },
        { name: "纱绫（私服）" },
        { name: "切里诺（温泉）" },
        { name: "和香（温泉）" },
        { name: "三森" },
        { name: "玛丽娜" },
        { name: "宫子" },
        { name: "咲" },
        { name: "美游" },
        { name: "枫" },
        { name: "月咏" },
        { name: "若藻（泳装）" },
        { name: "萌绘" },
        { name: "心奈" },
        { name: "时雨" },
        { name: "叶渚" },
        { name: "果穗" },
        { name: "琉美" },
        { name: "南" },
    ],
    JAUPpersona: [
        { jaup: index_1.jaup },
    ],
    INUPpersona: [
        { inup: index_1.inup },
    ],
};
function 日服up() {
    //删除up角
    for (var i = 0; i < exports.cardPool.threeStar.length; i++) {
        if (exports.cardPool.threeStar[i].name === index_1.jaup) {
            exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== index_1.jaup);
        }
    }
    console.log(exports.cardPool.threeStar);
    //主体
    function drawCards() {
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.023,
            UPpersona: 0.007
        };
        // 进行200次抽卡
        const drawResult = {
            oneStar: [], twoStar: [],
            threeStar: [], upcard: []
        };
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else if (rand < probabilities.oneStar
                + probabilities.twoStar
                + probabilities.threeStar) {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
            }
            else {
                exports.upcard = index_1.jaup;
                exports.count3up++;
            }
        }
        console.log(exports.upcard);
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        drawResult.threeStar.forEach((card) => {
            exports.output.push(card.name);
        });
    }
    return (drawCards());
}
exports.日服up = 日服up;
;
function 国际up() {
    //删除up角
    //删除日服角色
    exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== "叶渚"
        && card.name !== "南"
        && card.name !== "琉美"
        && card.name !== "果穗"
        && card.name !== "佳代子（正月）"
        && card.name !== "小雪"
        && card.name !== "惠"
        && card.name !== "爱丽丝（女仆装）"
        && card.name !== "时（兔女郎）"
        && card.name !== "玲纱"
        && card.name !== "芹奈（圣诞）"
        && card.name !== "花江（圣诞）"
        && card.name !== "美弥"
        && card.name !== "樱子"
        && card.name !== "遥香（正月）");
    for (var i = 0; i < exports.cardPool.threeStar.length; i++) {
        if (exports.cardPool.threeStar[i].name === index_1.inup) {
            exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== index_1.inup);
        }
    }
    //主体
    function drawCards() {
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.023,
            UPpersona: 0.007
        };
        // 进行200次抽卡
        const drawResult = {
            oneStar: [], twoStar: [],
            threeStar: [], upcard: []
        };
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else if (rand < probabilities.oneStar
                + probabilities.twoStar
                + probabilities.threeStar) {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
            }
            else {
                exports.upcard = index_1.inup;
                exports.count3up++;
            }
        }
        console.log(exports.upcard);
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        drawResult.threeStar.forEach((card) => {
            exports.output.push(card.name);
        });
    }
    return (drawCards());
}
exports.国际up = 国际up;
;
function 日服井() {
    function drawCards() {
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行200次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.forEach((card) => {
            exports.output.push(card.name);
        });
    }
    return (drawCards());
}
exports.日服井 = 日服井;
function 国际服井() {
    function drawCards() {
        //删除日服角色
        exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== "叶渚"
            && card.name !== "南"
            && card.name !== "琉美"
            && card.name !== "果穗"
            && card.name !== "佳代子（正月）"
            && card.name !== "小雪"
            && card.name !== "惠"
            && card.name !== "爱丽丝（女仆装）"
            && card.name !== "时（兔女郎）"
            && card.name !== "玲纱"
            && card.name !== "芹奈（圣诞）"
            && card.name !== "花江（圣诞）"
            && card.name !== "美弥"
            && card.name !== "樱子"
            && card.name !== "遥香（正月）");
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行200次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.forEach((card) => {
            exports.output.push(card.name);
        });
    }
    return (drawCards());
}
exports.国际服井 = 国际服井;
function 日服up十连() {
    function drawCards() {
        // 删除up角色
        for (var i = 0; i < exports.cardPool.threeStar.length; i++) {
            if (exports.cardPool.threeStar[i].name === index_1.jaup) {
                exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== index_1.jaup);
            }
        }
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.023,
            UPpersona: 0.007
        };
        // 进行10次抽卡
        const drawResult = {
            oneStar: [],
            twoStar: [], threeStar: [], upcard: [],
        };
        // 保底计数器
        for (let i = 0; i < 10; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 11)];
                drawResult.oneStar.push(card);
                exports.count1++;
                exports.pityCounter++;
                if (exports.pityCounter >= 10 && exports.count2 === 0 && exports.count3 === 0) {
                    // 如果已经连续十次没有抽到二星或三星卡片，则保底
                    const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
                    if (index !== -1) {
                        // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
                        drawResult.oneStar.pop();
                        card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                        drawResult.twoStar.push(card);
                        // 存储新抽到的卡片的名称
                        exports.count1--;
                        exports.count2++;
                        exports.pityCounter = 0;
                    }
                }
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                drawResult.twoStar.push(card);
                exports.count2++;
                exports.pityCounter = 0;
            }
            else if (rand <
                probabilities.oneStar + probabilities.twoStar + probabilities.threeStar) {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
                exports.pityCounter = 0;
            }
            else {
                exports.upcard = index_1.jaup;
                exports.count3up++;
                exports.pityCounter = 0;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        //1-star
        drawResult.oneStar.forEach((card) => {
            exports.output101.push(card.name);
        });
        //2-star
        drawResult.twoStar.forEach((card) => {
            exports.output102.push(card.name);
        });
        //3-star
        drawResult.threeStar.forEach((card) => {
            exports.output103.push(card.name);
        });
    }
    return (drawCards());
}
exports.日服up十连 = 日服up十连;
function 国际服up十连() {
    function drawCards() {
        // 删除up角色
        exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== "叶渚"
            && card.name !== "南"
            && card.name !== "琉美"
            && card.name !== "果穗"
            && card.name !== "佳代子（正月）"
            && card.name !== "小雪"
            && card.name !== "惠"
            && card.name !== "爱丽丝（女仆装）"
            && card.name !== "时（兔女郎）"
            && card.name !== "玲纱"
            && card.name !== "芹奈（圣诞）"
            && card.name !== "花江（圣诞）"
            && card.name !== "美弥"
            && card.name !== "樱子"
            && card.name !== "遥香（正月）");
        for (var i = 0; i < exports.cardPool.threeStar.length; i++) {
            if (exports.cardPool.threeStar[i].name === index_1.inup) {
                exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== index_1.inup);
            }
        }
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.023,
            UPpersona: 0.007
        };
        // 进行10次抽卡
        const drawResult = {
            oneStar: [],
            twoStar: [], threeStar: [], upcard: [],
        };
        // 保底计数器
        for (let i = 0; i < 10; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 11)];
                drawResult.oneStar.push(card);
                exports.count1++;
                exports.pityCounter++;
                if (exports.pityCounter >= 10 && exports.count2 === 0 && exports.count3 === 0) {
                    // 如果已经连续十次没有抽到二星或三星卡片，则保底
                    const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
                    if (index !== -1) {
                        // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
                        drawResult.oneStar.pop();
                        card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                        drawResult.twoStar.push(card);
                        // 存储新抽到的卡片的名称
                        exports.count1--;
                        exports.count2++;
                        exports.pityCounter = 0;
                    }
                }
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                drawResult.twoStar.push(card);
                exports.count2++;
                exports.pityCounter = 0;
            }
            else if (rand <
                probabilities.oneStar + probabilities.twoStar + probabilities.threeStar) {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
                exports.pityCounter = 0;
            }
            else {
                exports.upcard = index_1.inup;
                exports.count3up++;
                exports.pityCounter = 0;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        //1-star
        drawResult.oneStar.forEach((card) => {
            exports.output101.push(card.name);
        });
        //2-star
        drawResult.twoStar.forEach((card) => {
            exports.output102.push(card.name);
        });
        //3-star
        drawResult.threeStar.forEach((card) => {
            exports.output103.push(card.name);
        });
    }
    return (drawCards());
}
exports.国际服up十连 = 国际服up十连;
function 国际服常驻十连() {
    function drawCards() {
        //删除日服角色
        exports.cardPool.threeStar = exports.cardPool.threeStar.filter(card => card.name !== "叶渚"
            && card.name !== "南"
            && card.name !== "琉美"
            && card.name !== "果穗"
            && card.name !== "佳代子（正月）"
            && card.name !== "小雪"
            && card.name !== "惠"
            && card.name !== "爱丽丝（女仆装）"
            && card.name !== "时（兔女郎）"
            && card.name !== "玲纱"
            && card.name !== "芹奈（圣诞）"
            && card.name !== "花江（圣诞）"
            && card.name !== "美弥"
            && card.name !== "樱子"
            && card.name !== "遥香（正月）");
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行10次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        // 保底计数器
        for (let i = 0; i < 10; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 11)];
                drawResult.oneStar.push(card);
                exports.count1++;
                exports.pityCounter++;
                if (exports.pityCounter >= 10 && exports.count2 === 0 && exports.count3 === 0) {
                    // 如果已经连续十次没有抽到二星或三星卡片，则保底
                    const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
                    if (index !== -1) {
                        // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
                        drawResult.oneStar.pop();
                        card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                        drawResult.twoStar.push(card);
                        // 存储新抽到的卡片的名称
                        exports.count1--;
                        exports.count2++;
                        exports.pityCounter = 0;
                    }
                }
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                drawResult.twoStar.push(card);
                exports.count2++;
                exports.pityCounter = 0;
            }
            else {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
                exports.pityCounter = 0;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        //1-star
        drawResult.oneStar.forEach((card) => {
            exports.output101.push(card.name);
        });
        //2-star
        drawResult.twoStar.forEach((card) => {
            exports.output102.push(card.name);
        });
        //3-star
        drawResult.threeStar.forEach((card) => {
            exports.output103.push(card.name);
        });
    }
    return (drawCards());
}
exports.国际服常驻十连 = 国际服常驻十连;
function 日服常驻十连() {
    function drawCards() {
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行10次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        // 保底计数器
        for (let i = 0; i < 10; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = exports.cardPool.oneStar[Math.floor(Math.random() * 11)];
                drawResult.oneStar.push(card);
                exports.count1++;
                exports.pityCounter++;
                if (exports.pityCounter >= 10 && exports.count2 === 0 && exports.count3 === 0) {
                    // 如果已经连续十次没有抽到二星或三星卡片，则保底
                    const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
                    if (index !== -1) {
                        // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
                        drawResult.oneStar.pop();
                        card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                        drawResult.twoStar.push(card);
                        // 存储新抽到的卡片的名称
                        exports.count1--;
                        exports.count2++;
                        exports.pityCounter = 0;
                    }
                }
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = exports.cardPool.twoStar[Math.floor(Math.random() * 22)];
                drawResult.twoStar.push(card);
                exports.count2++;
                exports.pityCounter = 0;
            }
            else {
                card = exports.cardPool.threeStar[Math.floor(Math.random() * exports.cardPool.threeStar.length)];
                drawResult.threeStar.push(card);
                exports.count3++;
                exports.pityCounter = 0;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        //1-star
        drawResult.oneStar.forEach((card) => {
            exports.output101.push(card.name);
        });
        //2-star
        drawResult.twoStar.forEach((card) => {
            exports.output102.push(card.name);
        });
        //3-star
        drawResult.threeStar.forEach((card) => {
            exports.output103.push(card.name);
        });
    }
    return (drawCards());
}
exports.日服常驻十连 = 日服常驻十连;
