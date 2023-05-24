import { Context, Random, Schema, h } from "koishi";
export const jsx_runtime_1 = require("@satorijs/element/jsx-runtime");
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import { format } from "path";
import { count } from "console";
import { createReadStream } from "fs";
import { name } from '../index';
import { nthArg } from "lodash";




export var turnout: string

export let output = []
export let cardname = []
export function clearOutput() {
  output = [];
  cardname = []
  count3pro = 0
}

export var count3pro = 0



export function 日服井() {

  function drawCards() {
    // 定义卡池


    const cardPool = {
      oneStar: [
        { name: "card1" },
        { name: "card2" },
        { name: "card3" },
      ],
      twoStar: [
        { name: "card4" },
        { name: "card5" },
        { name: "card6" },
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
        { name: "琉美" },
        { name: "南" },
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

    for (let i = 0; i < 200; i++) {
      const rand = Math.random();
      let card: { name: string; imgUrl?: string; };
      if (rand < probabilities.oneStar) {
        card = cardPool.oneStar[Math.floor(Math.random() * 3)];
        drawResult.oneStar.push(card);
      } else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 3)];
        drawResult.twoStar.push(card);
      } else {
        card = cardPool.threeStar[Math.floor(Math.random() * 77)];
        drawResult.threeStar.push(card);
        count3pro++;

      }

    }

    // 对抽出的卡片进行排序
    // 对抽出的卡片进行排序
    drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));

    // 输出结果
    drawResult.threeStar.forEach((card) => {
      output.push(card.name);
    });

  }
  return (drawCards());

}






export function 国际服井() {
  function drawCards() {
    // 定义卡池
    const cardPool = {
      oneStar: [
        { name: "card1" },
        { name: "card2" },
        { name: "card3" },
      ],
      twoStar: [
        { name: "card4" },
        { name: "card5" },
        { name: "card6" },
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
        { name: "日鞠" },
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
    for (let i = 0; i < 200; i++) {
      const rand = Math.random();
      let card: { name: string; imgUrl?: string; };
      if (rand < probabilities.oneStar) {
        card = cardPool.oneStar[Math.floor(Math.random() * 3)];
        drawResult.oneStar.push(card);
      } else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 3)];
        drawResult.twoStar.push(card);
      } else {
        card = cardPool.threeStar[Math.floor(Math.random() * 61)];
        drawResult.threeStar.push(card);
        count3pro++;
      }
    }

    // 对抽出的卡片进行排序
    drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));

    drawResult.threeStar.forEach((card) => {
      output.push(card.name);
    });

  }
  return (drawCards());
}







export let count1 = 0;//一星计数器
export let count2 = 0;//二星计数器
export let count3 = 0;//三星计数器
export let pityCounter = 0; // 保底计数器
export let newcard = ''
export let output101 = []
export let output102 =[]
export let output103 =[]
export var nocai = ['呜呜~没有彩', '没有彩，寄啦',
      '没有彩，再抽次试试吧', '阿罗娜没有给彩',
       '必  蓝  档  案', '阿罗娜把彩藏哪里了呢？']
export function cleardata(){ //“清零太上皇”函数
  //计数器
  count1 = 0
  count2 = 0
  count3 = 0
  pityCounter = 0
  output101 = []
  output102 = []
  output103 = []
  newcard = null
}



export function 日服十连() {
  function drawCards() {
    // 定义卡池
    const cardPool = {
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
    };

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
      let card: { name: any; };
      if (rand < probabilities.oneStar) {
        card = cardPool.oneStar[Math.floor(Math.random() * 11)];
        drawResult.oneStar.push(card);
        count1++;
        pityCounter++;
        if (pityCounter >= 10 && count2 === 0 && count3 === 0) {
          // 如果已经连续十次没有抽到二星或三星卡片，则保底
          const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
          if (index !== -1) {
            // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
            newcard = cardPool.twoStar[Math.floor(Math.random() * 22)].name;
            // 存储新抽到的卡片的名称
            count1--;
            count2++;
            pityCounter = 0;
          }
        }
      }
      else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 22)];
        drawResult.twoStar.push(card);

        count2++;
        pityCounter = 0;
      }
      else {
        card = cardPool.threeStar[Math.floor(Math.random() * 77)];
        drawResult.threeStar.push(card);
        count3++;
        pityCounter = 0;
      }
    }

    // 对抽出的卡片进行排序
    drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
    // 输出结果
    //1-star
    drawResult.oneStar.forEach((card) => {
      output101.push(card.name);
    });
    //2-star
    drawResult.twoStar.forEach((card) => {
      output102.push(card.name);
    });
    //3-star
    drawResult.threeStar.forEach((card) => {
      output103.push(card.name);
    });


  }
  return (drawCards());
}







export function 国际服十连() {
  function drawCards() {
    // 定义卡池
    const cardPool = {
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
        { name: "芹奈", },
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
        { name: "日鞠" },
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
      let card: { name: any; };
      if (rand < probabilities.oneStar) {
        card = cardPool.oneStar[Math.floor(Math.random() * 11)];
        drawResult.oneStar.push(card);
        count1++;
        pityCounter++;
        if (pityCounter >= 10 && count2 === 0 && count3 === 0) {
          // 如果已经连续十次没有抽到二星或三星卡片，则保底
          const index = drawResult.oneStar.findIndex(c => c.name !== card.name);
          if (index !== -1) {
            // 找到一个不是当前抽到的卡片的一星卡片，将其替换为一个二星卡片
            newcard = cardPool.twoStar[Math.floor(Math.random() * 22)].name;
            // 存储新抽到的卡片的名称
            count1--;
            count2++;
            pityCounter = 0;
          }
        }
      }
      else if (rand < probabilities.oneStar + probabilities.twoStar) {
        card = cardPool.twoStar[Math.floor(Math.random() * 22)];
        drawResult.twoStar.push(card);

        count2++;
        pityCounter = 0;
      }
      else {
        card = cardPool.threeStar[Math.floor(Math.random() * 61)];
        drawResult.threeStar.push(card);
        count3++;
        pityCounter = 0;
      }
    }

    // 对抽出的卡片进行排序
    drawResult.oneStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.twoStar.sort((a, b) => a.name.localeCompare(b.name));
    drawResult.threeStar.sort((a, b) => a.name.localeCompare(b.name));
    // 输出结果
    //1-star
    drawResult.oneStar.forEach((card) => {
      output101.push(card.name);
    });
    //2-star
    drawResult.twoStar.forEach((card) => {
      output102.push(card.name);
    });
    //3-star
    drawResult.threeStar.forEach((card) => {
      output103.push(card.name);
    });



  }
  return (drawCards());

}




