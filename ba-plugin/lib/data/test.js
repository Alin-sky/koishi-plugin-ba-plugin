"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.国际服井 = exports.日服井 = void 0;
const koishi_1 = require("koishi");
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
                { name: "日富美", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hifumi_Collection.png" },
                { name: "日富美（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hifumi_Swimsuit_Collection.png" },
                { name: "鹤城", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Tsurugi_Collection.png" },
                { name: "真白", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Mashiro_Collection.png" },
                { name: "梓", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Azusa_Collection.png" },
                { name: "小春", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Koharu_Collection.png" },
                { name: "小夏", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Natsu_Collection.png" },
                { name: "优", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Ui_Collection.png" },
                { name: "日向", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hinata_Collection.png" },
                { name: "和纱", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kazusa_Collection.png" },
                { name: "芹奈（圣诞）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Serina_Christmas_Collection.png" },
                { name: "花江（圣诞）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hanae_Christmas_Collection.png" },
                { name: "美弥", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Mine_Collection.png" },
                { name: "樱子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Sakurako_Collection.png" },
                //格黑娜
                { name: "阿露", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Aru_Collection.png" },
                { name: "晴奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Haruna_Collection.png" },
                { name: "日奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hina_Collection.png" },
                { name: "伊织", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Iori_Collection.png" },
                { name: "泉", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Izumi_Collection.png" },
                { name: "亚子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Ako_Collection.png" },
                { name: "千夏（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Chinatsu_HotSpring_Collection.png" },
                { name: "濑名", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Sena_Collection.png" },
                { name: "伊吕波", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Iroha_Collection.png" },
                { name: "惠", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Megu_Collection.png" },
                { name: "佳代子（正月）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kayoko_NewYear_Collection.png" },
                { name: "遥香（正月）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Haruka_NewYear_Collection.png" },
                //千年
                { name: "艾米", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Eimi_Collection.png" },
                { name: "真纪", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Maki_Collection.png" },
                { name: "尼禄", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Neru_Collection.png" },
                { name: "堇", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Sumire_Collection.png" },
                { name: "响", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hibiki_Collection.png" },
                { name: "花凛", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Karin_Collection.png" },
                { name: "爱丽丝", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Aris_Collection.png" },
                { name: "绿", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Midori_Collection.png" },
                { name: "柚子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Yuzu_Collection.png" },
                { name: "明日奈（兔女郎）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Asuna_Bunny_Collection.png" },
                { name: "千寻", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Chihiro_Collection.png" },
                { name: "歌原（应援团）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Utaha_Cheerleader_Collection.png" },
                { name: "诺亚", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Noa_Collection.png" },
                { name: "朱音（兔女郎）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Akane_Bunny_Collection.png" },
                { name: "爱丽丝（女仆装）", imgUrl: "https://cdnimg.gamekee.com/wiki2.0/images/w_1920/h_1080/829/43637/2023/3/22/661705.jpg" },
                { name: "小雪", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Koyuki_Collection.png" },
                { name: "日鞠", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Himari_Collection.png" },
                { name: "时（兔女郎）", imgUrl: "https://cdnimg.gamekee.com/wiki2.0/images/w_1920/h_1080/829/43637/2023/3/22/603677.jpg" },
                //阿拜多斯，阿里乌斯
                { name: "星野", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hoshino_Collection.png" },
                { name: "白子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shiroko_Collection.png" },
                { name: "白子（单车）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shiroko_Cycling_Collection.png" },
                { name: "茜香（正月）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Serika_NewYear_Collection.png" },
                { name: "美咲", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Misaki_Collection.png" },
                { name: "日和", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hiyori_Collection.png" },
                { name: "敦子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Atsuko_Collection.png" },
                { name: "野宫（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Nonomi_Swimsuit_Collection.png" },
                { name: "纱织", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saori_Collection.png" },
                //百鬼夜行，红冬，山海经，SRT，瓦尔基里
                { name: "瞬", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shun_Collection.png" },
                { name: "纱绫", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saya_Collection.png" },
                { name: "泉奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Izuna_Collection.png" },
                { name: "切里诺", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Cherino_Collection.png" },
                { name: "瞬（幼女）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shun_Small_Collection.png" },
                { name: "纱绫（私服）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saya_Casual_Collection.png" },
                { name: "切里诺（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Cherino_HotSpring_Collection.png" },
                { name: "和香（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Nodoka_HotSpring_Collection.png" },
                { name: "三森", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Mimori_Collection.png" },
                { name: "玛丽娜", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Marina_Collection.png" },
                { name: "宫子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Miyako_Collection.png" },
                { name: "咲", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saki_Collection.png" },
                { name: "美游", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Miyu_Collection.png" },
                { name: "枫", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kaede_Collection.png" },
                { name: "月咏", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Tsukuyo_Collection.png" },
                { name: "若藻（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Wakamo_Swimsuit_Collection.png" },
                { name: "萌绘", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Moe_Collection.png" },
                { name: "心奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kokona_Collection.png" },
                { name: "时雨", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shigure_Collection.png" },
                { name: "叶渚", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kanna_Collection.png" },
                { name: "果穗", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kaho_Collection.png" },
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
                card = cardPool.threeStar[Math.floor(Math.random() * 73)];
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
            output += '⭐⭐⭐' + card.name + ':' + ((0, koishi_1.h)('image', { url: card.imgUrl }));
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
                { name: "日富美", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hifumi_Collection.png" },
                { name: "日富美（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hifumi_Swimsuit_Collection.png" },
                { name: "鹤城", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Tsurugi_Collection.png" },
                { name: "真白", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Mashiro_Collection.png" },
                { name: "梓", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Azusa_Collection.png" },
                { name: "小春", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Koharu_Collection.png" },
                { name: "小夏", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Natsu_Collection.png" },
                { name: "优", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Ui_Collection.png" },
                { name: "日向", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hinata_Collection.png" },
                { name: "和纱", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kazusa_Collection.png" },
                //格黑娜
                { name: "阿露", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Aru_Collection.png" },
                { name: "晴奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Haruna_Collection.png" },
                { name: "日奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hina_Collection.png" },
                { name: "伊织", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Iori_Collection.png" },
                { name: "泉", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Izumi_Collection.png" },
                { name: "亚子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Ako_Collection.png" },
                { name: "千夏（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Chinatsu_HotSpring_Collection.png" },
                { name: "濑名", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Sena_Collection.png" },
                { name: "伊吕波", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Iroha_Collection.png" },
                //千年
                { name: "艾米", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Eimi_Collection.png" },
                { name: "真纪", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Maki_Collection.png" },
                { name: "尼禄", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Neru_Collection.png" },
                { name: "堇", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Sumire_Collection.png" },
                { name: "响", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hibiki_Collection.png" },
                { name: "花凛", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Karin_Collection.png" },
                { name: "爱丽丝", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Aris_Collection.png" },
                { name: "绿", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Midori_Collection.png" },
                { name: "柚子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Yuzu_Collection.png" },
                { name: "明日奈（兔女郎）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Asuna_Bunny_Collection.png" },
                { name: "千寻", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Chihiro_Collection.png" },
                { name: "歌原（应援团）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Utaha_Cheerleader_Collection.png" },
                { name: "诺亚", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Noa_Collection.png" },
                { name: "朱音（兔女郎）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Akane_Bunny_Collection.png" },
                //阿拜多斯，阿里乌斯
                { name: "星野", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hoshino_Collection.png" },
                { name: "白子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shiroko_Collection.png" },
                { name: "白子（单车）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shiroko_Cycling_Collection.png" },
                { name: "茜香（正月）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Serika_NewYear_Collection.png" },
                { name: "美咲", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Misaki_Collection.png" },
                { name: "日和", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Hiyori_Collection.png" },
                { name: "敦子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Atsuko_Collection.png" },
                { name: "野宫（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Nonomi_Swimsuit_Collection.png" },
                { name: "纱织", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saori_Collection.png" },
                //百鬼夜行，红冬，山海经，SRT，瓦尔基里
                { name: "瞬", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shun_Collection.png" },
                { name: "纱绫", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saya_Collection.png" },
                { name: "泉奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Izuna_Collection.png" },
                { name: "切里诺", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Cherino_Collection.png" },
                { name: "瞬（幼女）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Shun_Small_Collection.png" },
                { name: "纱绫（私服）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saya_Casual_Collection.png" },
                { name: "切里诺（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Cherino_HotSpring_Collection.png" },
                { name: "和香（温泉）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Nodoka_HotSpring_Collection.png" },
                { name: "三森", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Mimori_Collection.png" },
                { name: "玛丽娜", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Marina_Collection.png" },
                { name: "宫子", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Miyako_Collection.png" },
                { name: "咲", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Saki_Collection.png" },
                { name: "美游", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Miyu_Collection.png" },
                { name: "枫", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kaede_Collection.png" },
                { name: "月咏", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Tsukuyo_Collection.png" },
                { name: "若藻（泳装）", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Wakamo_Swimsuit_Collection.png" },
                { name: "萌绘", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Moe_Collection.png" },
                { name: "心奈", imgUrl: "https://ba.brightsu.cn/img/student/icon/Student_Portrait_Kokona_Collection.png" },
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
            output += '⭐⭐⭐' + card.name + ':' + ((0, koishi_1.h)('image', { url: card.imgUrl }));
        });
        return "抽到的三星卡片数量为:" + count + '\n' + '抽到以下三星角色：\n' + output;
    }
    return (drawCards());
}
exports.国际服井 = 国际服井;
