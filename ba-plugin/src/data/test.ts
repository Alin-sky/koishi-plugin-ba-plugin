import { Context, Schema, h } from "koishi";
//
export function 日服井() {
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
        { name: "日富美", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hihumi_Collection.webp" },
        { name: "日富美（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0058_Collection.webp" },
        { name: "鹤城", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Tsurugi_Collection.webp" },
        { name: "真白", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Mashiro_Collection.webp" },
        { name: "梓", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Azusa_Collection.webp" },
        { name: "小春", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Koharu_Collection.webp" },
        { name: "小夏", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0155_Collection.webp" },
        { name: "优", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0169_Collection.webp" },
        { name: "日向", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hinata_Collection.webp" },
        { name: "和纱", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Kazusa_Collection.webp" },
        { name: "芹奈（圣诞）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0194_Collection.webp" },
        { name: "花江（圣诞）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0195_Collection.webp" },
        { name: "美弥", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0152_Collection.webp" },
        { name: "樱子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Sakurako_Collection.webp" },
        //格黑娜
        { name: "阿露", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Aru_Collection.webp" },
        { name: "晴奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Haruna_Collection.webp" },
        { name: "日奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hina_Collection.webp" },
        { name: "伊织", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Iori_Collection.webp" },
        { name: "泉", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Izumi_Collection.webp" },
        { name: "亚子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_ako_Collection.webp" },
        { name: "千夏（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0163_Collection.webp" },
        { name: "濑名", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Sena_Collection.webp" },
        { name: "伊吕波", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0156_Collection.webp" },
        { name: "惠", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0088_Collection.webp" },
        { name: "佳代子（正月）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0086_Collection.webp" },
        { name: "遥香（正月）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0087_Collection.webp" },
        //千年
        { name: "艾米", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Eimi_Collection.webp" },
        { name: "真纪", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Maki_Collection.webp" },
        { name: "尼禄", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Neru_Collection.webp" },
        { name: "堇", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Sumire_Collection.webp" },
        { name: "响", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hibiki_Collection.webp" },
        { name: "花凛", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Karin_Collection.webp" },
        { name: "爱丽丝", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp" },
        { name: "绿", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Midori_Collection.webp" },
        { name: "柚子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Yuzu_Collection.webp" },
        { name: "明日奈（兔女郎）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0098_Collection.webp" },
        { name: "千寻", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0160_Collection.webp" },
        { name: "歌原（应援团）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0182_Collection.webp" },
        { name: "诺亚", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0095_Collection.webp" },
        { name: "朱音（兔女郎）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0099_Collection.webp" },
        { name: "爱丽丝（女仆装）", imgUrl: "https://cdnimg.gamekee.com/wiki2.0/images/w_1920/h_1080/829/43637/2023/3/22/661705.jpg" },
        { name: "小雪", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0198_Collection.webp" },
        { name: "日鞠", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0159_Collection.webp" },
        { name: "时（兔女郎）", imgUrl: "https://cdnimg.gamekee.com/wiki2.0/images/w_1920/h_1080/829/43637/2023/3/22/603677.jpg" },
        //阿拜多斯，阿里乌斯
        { name: "星野", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hoshino_Collection.webp" },
        { name: "白子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shiroko_Collection.webp" },
        { name: "白子（单车）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shiroko_ridingsuit_Collection.webp" },
        { name: "茜香（正月）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Serika_newyear_Collection.webp" },
        { name: "美咲", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Misaki_Collection.webp" },
        { name: "日和", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hiyori_Collection.webp" },
        { name: "敦子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Atsuko_Collection.webp" },
        { name: "野宫（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0092_Collection.webp" },
        { name: "纱织", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saori_Collection.webp" },
        //百鬼夜行，红冬，山海经，SRT，瓦尔基里
        { name: "瞬", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shun_Collection.webp" },
        { name: "纱绫", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saya_Collection.webp" },
        { name: "泉奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Izuna_Collection.webp" },
        { name: "切里诺", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Cherino_Collection.webp" },
        { name: "瞬（幼女）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0066_Collection.webp" },
        { name: "纱绫（私服）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saya_Casual_Collection.webp" },
        { name: "切里诺（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0164_Collection.webp" },
        { name: "和香（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0165_Collection.webp" },
        { name: "三森", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Mimori_Collection.webp" },
        { name: "玛丽娜", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Marina_Collection.webp" },
        { name: "宫子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Miyako_Collection.webp" },
        { name: "咲", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0144_Collection.webp" },
        { name: "美游", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0145_Collection.webp" },
        { name: "枫", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Kaede_Collection.webp" },
        { name: "月咏", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0114_Collection.webp" },
        { name: "若藻（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0175_Collection.webp" },
        { name: "萌绘", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Moe_Collection.webp" },
        { name: "心奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0137_Collection.webp" },
        { name: "时雨", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shigure_Collection.webp" },
        { name: "叶渚", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0170_Collection.webp" },
        { name: "果穗", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0107_Collection.webp" },
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
      } else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 3)];
        drawResult.twoStar.push(card);
      } else {
        card = cardPool.threeStar[Math.floor(Math.random() * 73)];
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
      output += '⭐⭐⭐' + card.name +':'+ (h('image', { url: card.imgUrl}));
    });

    return "抽到的三星卡片数量为:" + count +'\n' +'抽到以下三星角色：\n' + output;
  }
  return (drawCards());
}


export function 国际服井() {
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
        { name: "日富美", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hihumi_Collection.webp" },
        { name: "日富美（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0058_Collection.webp" },
        { name: "鹤城", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Tsurugi_Collection.webp" },
        { name: "真白", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Mashiro_Collection.webp" },
        { name: "梓", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Azusa_Collection.webp" },
        { name: "小春", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Koharu_Collection.webp" },
        { name: "小夏", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0155_Collection.webp" },
        { name: "优", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0169_Collection.webp" },
        { name: "日向", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hinata_Collection.webp" },
        { name: "和纱", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Kazusa_Collection.webp" },
        //格黑娜
        { name: "阿露", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Aru_Collection.webp" },
        { name: "晴奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Haruna_Collection.webp" },
        { name: "日奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hina_Collection.webp" },
        { name: "伊织", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Iori_Collection.webp" },
        { name: "泉", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Izumi_Collection.webp" },
        { name: "亚子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_ako_Collection.webp" },
        { name: "千夏（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0163_Collection.webp" },
        { name: "濑名", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Sena_Collection.webp" },
        { name: "伊吕波", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0156_Collection.webp" },
        //千年
        { name: "艾米", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Eimi_Collection.webp" },
        { name: "真纪", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Maki_Collection.webp" },
        { name: "尼禄", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Neru_Collection.webp" },
        { name: "堇", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Sumire_Collection.webp" },
        { name: "响", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hibiki_Collection.webp" },
        { name: "花凛", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Karin_Collection.webp" },
        { name: "爱丽丝", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Aris_Collection.webp" },
        { name: "绿", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Midori_Collection.webp" },
        { name: "柚子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Yuzu_Collection.webp" },
        { name: "明日奈（兔女郎）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0098_Collection.webp" },
        { name: "千寻", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0160_Collection.webp" },
        { name: "歌原（应援团）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0182_Collection.webp" },
        { name: "诺亚", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0095_Collection.webp" },
        { name: "朱音（兔女郎）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0099_Collection.webp" },
        //阿拜多斯，阿里乌斯
        { name: "星野", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hoshino_Collection.webp" },
        { name: "白子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shiroko_Collection.webp" },
        { name: "白子（单车）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shiroko_ridingsuit_Collection.webp" },
        { name: "茜香（正月）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Serika_newyear_Collection.webp" },
        { name: "美咲", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Misaki_Collection.webp" },
        { name: "日和", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Hiyori_Collection.webp" },
        { name: "敦子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Atsuko_Collection.webp" },
        { name: "野宫（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0092_Collection.webp" },
        { name: "纱织", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saori_Collection.webp" },
        //百鬼夜行，红冬，山海经，SRT，瓦尔基里
        { name: "瞬", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Shun_Collection.webp" },
        { name: "纱绫", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saya_Collection.webp" },
        { name: "泉奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Izuna_Collection.webp" },
        { name: "切里诺", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Cherino_Collection.webp" },
        { name: "瞬（幼女）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0066_Collection.webp" },
        { name: "纱绫（私服）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Saya_Casual_Collection.webp" },
        { name: "切里诺（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0164_Collection.webp" },
        { name: "和香（温泉）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0165_Collection.webp" },
        { name: "三森", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Mimori_Collection.webp" },
        { name: "玛丽娜", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Marina_Collection.webp" },
        { name: "宫子", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Miyako_Collection.webp" },
        { name: "咲", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0144_Collection.webp" },
        { name: "美游", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0145_Collection.webp" },
        { name: "枫", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Kaede_Collection.webp" },
        { name: "月咏", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0114_Collection.webp" },
        { name: "若藻（泳装）", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0175_Collection.webp" },
        { name: "萌绘", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_Moe_Collection.webp" },
        { name: "心奈", imgUrl: "https://schale.gg/images/student/collection/Student_Portrait_CH0137_Collection.webp" },
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
      } else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 3)];
        drawResult.twoStar.push(card);
      } else {
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
      output += '⭐⭐⭐' + card.name +':'+ (h('image', { url: card.imgUrl}));
    });

    return "抽到的三星卡片数量为:" + count +'\n' +'抽到以下三星角色：\n' + output;
  }
  return (drawCards());
}

