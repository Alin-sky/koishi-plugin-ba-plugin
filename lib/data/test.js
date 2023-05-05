"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.国际服井 = exports.日服井 = void 0;
const koishi_1 = require("koishi");
const url_1 = require("url");
const path_1 = require("path");
function 日服井() {
    function drawCards() {
        // 定义卡池
        const cardPool = {
            oneStar: [
                { name: "card1", imgUrl: "http://example.com/card1.jpg" },
                { name: "card2", imgUrl: "http://example.com/card2.jpg" },
                { name: "card3", imgUrl: "http://example.com/card3.jpg" },
            ],
            twoStar: [
                { name: "card4", imgUrl: "http://example.com/card4.jpg" },
                { name: "card5", imgUrl: "http://example.com/card5.jpg" },
                { name: "card6", imgUrl: "http://example.com/card6.jpg" },
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
                { name: "爱丽丝（女仆装）" },
                { name: "小雪" },
                { name: "日鞠" },
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
            ],
        };
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行200次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        let count = 0;
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else {
                card = cardPool.threeStar[Math.floor(Math.random() * 74)];
                drawResult.threeStar.push(card);
                count++;
            }
        }
        // 对抽出的卡片进行排序
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        let output = "";
        drawResult.threeStar.forEach((card) => {
            output += '⭐⭐⭐'
                + card.name
                + ':'
                + ((0, koishi_1.h)('image', { url: ((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname + '/photo/' + card.name + '.png')).href) }));
        });
        return "抽到的三星卡片数量为:" + count + '\n' + '抽到以下三星角色：\n' + output;
    }
    return (drawCards());
}
exports.日服井 = 日服井;
function 国际服井() {
    function drawCards() {
        // 定义卡池
        const cardPool = {
            oneStar: [
                { name: "card1", imgUrl: "http://example.com/card1.jpg" },
                { name: "card2", imgUrl: "http://example.com/card2.jpg" },
                { name: "card3", imgUrl: "http://example.com/card3.jpg" },
            ],
            twoStar: [
                { name: "card4", imgUrl: "http://example.com/card4.jpg" },
                { name: "card5", imgUrl: "http://example.com/card5.jpg" },
                { name: "card6", imgUrl: "http://example.com/card6.jpg" },
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
            ],
        };
        // 定义抽卡概率
        const probabilities = {
            oneStar: 0.785,
            twoStar: 0.185,
            threeStar: 0.03,
        };
        // 进行200次抽卡
        const drawResult = { oneStar: [], twoStar: [], threeStar: [] };
        let count = 0;
        for (let i = 0; i < 200; i++) {
            const rand = Math.random();
            let card;
            if (rand < probabilities.oneStar) {
                card = cardPool.oneStar[Math.floor(Math.random() * 3)];
                drawResult.oneStar.push(card);
            }
            else if (rand < probabilities.oneStar + probabilities.twoStar) {
                card = cardPool.twoStar[Math.floor(Math.random() * 3)];
                drawResult.twoStar.push(card);
            }
            else {
                card = cardPool.threeStar[Math.floor(Math.random() * 60)];
                drawResult.threeStar.push(card);
                count++;
            }
        }
        // 对抽出的卡片进行排序
        drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
        drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
        // 输出结果
        let output = "";
        drawResult.threeStar.forEach((card) => {
            output += '⭐⭐⭐'
                + card.name
                + ':'
                + ((0, koishi_1.h)('image', { url: ((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname + '/photo/' + card.name + '.png')).href) }));
        });
        return "抽到的三星卡片数量为:" + count + '\n' + '抽到以下三星角色：\n' + output;
    }
    return (drawCards());
}
exports.国际服井 = 国际服井;
