
//import区域
import { Context, Schema, Session, h } from 'koishi'
import { cut_twenty, raid49 } from './sanae-fight/raid49';
import { simplify } from './sanae-fight/raid49';
import { data, data1 } from './data/data';
import { accumulate } from './data/clairvoyant'
import { getMessage } from './data/clairvoyant'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import {
  日服up, 国际服井,
  日服up十连, output, cleardata,
  count3, count1, output101,
  output102, count2,
  count3up, upcard, 国际up,
  日服井, 国际服up十连,
  国际服常驻十连, 日服常驻十连,
  cardPool,
} from './data/test';
import { output103, nocai, } from './data/test';

import { gacha, gachaGroup, gachaProbability, path } from '../src/gacha/gacha'
import { DB } from './gacha/database'

import { plugin } from './guild/index'
import { gachaplugin } from './gacha'



//koishi定义区
export const name = "ba-plugin";
export const usage = "## 数据来源于[bawiki](https://ba.gamekee.com/)和大佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库\n" +
  "更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)" +
  "上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)\n" +
  '\n' +
  "交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" +
  " ## 此版本为alpha版\n"+
  " ## 目前有以下功能:" + "\n" +
  " - 群友エルル的新抽卡模拟器（ba）\n"+
  " - 群友早苗写的模拟总力战(总力)\n" +
  " - 群u早苗的攒钻计算(攒钻)\n" +
  " - 攻略图和角色评分查询(攻略)\n" +
  " - 随机漫画和表情(攻略)\n"

//声明服务器
const alincloud = 'http://124.221.99.85:8088/'
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/'
const laocloud = 'https://bawiki.lgc2333.top/img/'
var uurl = ''
export var jaup
export var inup

export interface Config {
    [x: string]: any;
}
//koishi控制台
export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    server: Schema.union([
      Schema.const(1).description('1服'),
      Schema.const(2).description('2服'),
      Schema.const(3).description('3服'),
    ]).role('radio').default(1).description('设置攻略图图源服务器'),
  }),
  //
Schema.object({
  '日服默认UP角色': Schema.string().default("爱丽丝").description('默认日服UP的学生'),
  '国际服默认UP角色': Schema.string().default("小春").description('默认国际服UP的学生'),
  整活用群号: Schema.string().default("").description('整活限定'),
  hour: Schema.union([1, 3, 8]).default(3).description('提醒频率,请使用整数'),
}).description('基本设置'),
Schema.object({
  'UP★★★': Schema.number().min(0).default(0.7).max(100).description('UP学生的概率'),
  '★★★': Schema.number().min(0).default(2.3).max(100).description('★★★学生的概率'),
  '★★': Schema.number().min(0).default(18.5).max(100).description('★★学生的概率'),
  '★': Schema.number().min(0).default(78.5).max(100).description('★学生的概率'),
}).description('卡池概率设置(双服通用))'),



]
)





//代码区
let latest: any[] = [];
export function apply(ctx: Context, config: Config,) {


  
  //控制台参数初始化
  ctx.on('ready', async () => {



    //sever设置
    if (config.server === 1) {
      uurl = alincloud
      console.log('已设置1服务器')
    }
    if (config.server === 2) {
      uurl = laocdn
      console.log('已设置2服务器')
    }
    if (config.server === 3) {
      uurl = laocloud
      console.log('已设置3服务器')
    }
    //防整活
    if (config.server > 3 || config.server < 1) {
      uurl = alincloud
      console.log('已自动设置1服务器')
    }

  }

  );

  //早苗佬的代码区

  //总力模拟
  ctx.command("总力", '总力战模拟')
    .alias('打')
    .alias('凹分')
    .usage("发送“总力”查看具体使用方法")
    .action(async ({ session }, ...args) => {

      if ((args[0]) == null) {
        let aout = ("sensei，来做爱丽丝的朋友吧！\n" +
          "目前只支持碧蓝档案日服第49期总力战：Binah屋外战。\n" +
          "目前只支持模拟如下队伍：未花，真纪，茜，忧，亚子，日鞠。\n" +
          "请问sensei需要凹几次呢？\n" +
          "发送“总力 大蛇打一次”，模拟1次战斗并展示成绩；\n" +
          "发送“ 总力 大蛇打十次”，模拟10次战斗，并展示成绩与最佳成绩；\n" +
          "发送“总力 记录”，返还最近一次的最佳战绩的简略战斗记录。\n" +
          "本期一档线为25112851，请sensei加油哦！\n\n" +
          "数据来源：schale.gg, bluearchive.wikiru.jp, 部分数据由 @早苗脑测得出;\n" +
          "计算公式来源：bilibili@夜猫咪喵喵猫；\n" +
          "模拟轴参考：bilibili@y千代：BV1VN411N7eR，目标分数25291624。\n" +
          "注意：模拟结果与实际有较大偏差，仅供参考。")
        return <message forward>
          <message>
            <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
            {aout}
          </message>
          <message>
            {(h('image', {url:'http://a1.qpic.cn/psc?/V52az0IC4FSzwy2ZEIPY13Zxqg2DtiRi/ruAMsa53pVQWN7FLK88i5sc0SiZ9MX*Zi3mglMaxKBpz9JGTK0r4OUB95rOVgPbcvdvIBqk3KpR.at6mNdiSNi3pZB.3NKxhWO8jyNfwL8U!/c&ek=1&kp=1&pt=0&bo=WgFZAVoBWQEBFzA!&tl=1&vuin=1549641467&tm=1684944000&dis_t=1684944504&dis_k=9252566cf3d9f534797e1014d986d259&sce=60-2-2&rf=0-0'}))}
          </message>
        </message>




      }

      if ((args[0]) === '大蛇打一次') {
        let result = raid49();
        result = simplify(result);
        for (let i = 0; i < result.length; i++) {
          if (Object.is(result[i], "VICTORY！\n")) {
            let result_reverse = result.reverse();
            let score: number = result_reverse[0].match(/\d+/)[0];
            let time: number = result_reverse[6].match(/\d+(\.\d+)?/)[0];
            latest = result.reverse();
            return `VICTORY！\n战斗时间：${time}\n获得分数：${score}`;
          } else if (result[i].includes("凹分失败")) {
            let result_reverse = result.reverse();
            let message = result_reverse[0];
            latest = result.reverse();
            return message;
          }
        }
      }

      if ((args[0]) === '大蛇打十次') {
        let message10 = [];
        let ct = 0;
        let score_best = 0;
        let time_best = 0;
        latest = [];
        for (let i = 0; i < 10; i++) {
          ct += 1;
          let result = raid49();
          result = simplify(result);
          for (let i = 0; i < result.length; i++) {
            if (Object.is(result[i], "VICTORY！\n")) {
              let result_reverse = result.reverse();
              let score: number = result_reverse[0].match(/\d+/)[0];
              let time: number = result_reverse[6].match(/\d+(\.\d+)?/)[0];
              message10.push(`第${ct}次：战斗时间：${time}，获得分数：${score}\n`);
              if (score >= score_best) {
                score_best = score;
                time_best = time;
                latest = result.reverse();
              }
            } else if (result[i].includes("凹分失败")) {
              let result_reverse = result.reverse();
              let message = result_reverse[0];
              result.reverse();
              message10.push(`第${ct}次：${message}`);
            }
          }
        }
        const sum = message10.reduce((acc, curr) => acc + curr, "");
        return `10次战斗结果为：\n${sum}最佳成绩为：战斗时间：${time_best}，获得分数：${score_best}\n`;
      }
      if ((args[0]) === '记录') {

        if (latest.length > 0) {
          let a = cut_twenty(latest);


          return <message forward>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[0]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[1]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[2]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[3]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[4]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[5]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[6]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[7]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[8]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[9]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[10]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[11]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[12]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[13]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[14]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[15]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[16]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[17]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[18]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[19]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[20]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[21]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[22]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[23]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[24]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[25]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[26]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[27]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[28]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[29]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[30]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[31]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[32]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[33]}
            </message>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a[34]}
            </message>
            <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
            {a[35]}
          </message>




        } else {
          return "啊嘞？战斗记录找不到了......"
        }
      }


    })



  /*
  MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM          rFFFFFFFFFFFFFFFFFFFFFFFrr           MM    FF          MMMM     MMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMM          FFFFFFFFFFFFFFFFFFFFFFFFFFFFFMMMMMFFFr         rFFFr                   MMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMM        rFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF       rFFFrrFFFFrrrr   rrF     MMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMM        FFMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFr    rrFrrFFrrrFFFFFFFFFFFFFF    MMMMMMMMMM
MMMMMMMMMMMMMMMMMM       rFMMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFMFFFFFFFFFFF    FFFrrFFFrrrrFFrFFFFFFFFFr    MMMMMMMMMM
MMMMMMMMMMMMMMMM      rFMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFrFFFFFFF    FFFrrFFFFFFFFFFFFFFFFFFF    MMMMMMMMMMM
MMMMMMMMMMMMMM     rFMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFFFF    FrrrrFFFFFFFrrFFFFFrrFFr   rMMMMMMMMMM
MMMMMMMMMMM      FMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  rFFF   rFFrrFFFFFFrrrrrFFFFrrrFr    MMMMMMMMMM
MMMMMMMMMF     FMMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFF     FFFrrrrrrrrrrFFFFrrrFF    MMMMMMMMMM
MMMMMMMM     FMMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFF      rrrFFFrrrrFFFFFrFFFF    MMMMMMMMMM
MMMMMM     FMMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFFF       rrFFFrrrrFFFFFFFr    MMMMMMMMMM
MMMMM     FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFFFF         rrrrrFFFFFFr    MMMMMMMMMMM
MMMM    rMMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FFFMMMF            rrrr      MMMMMMMMMMM
MMM    FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  FFFFFFFFFFFr                   MMMMMMMMM
M     FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  rFFFFFFFFFFFFFFFr        FF     MMMMMMMM
 FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  FFFFFFFFFFFFFFFFFFFFMFFFFFFF    MMMMMMM
FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFMF     MMMMM
MMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFrFFFFFFFFFFFFFFFFFFFFFFFFFFFFMF     MMMM
MMMFFFFFFMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFrrFFFFFFFFFFFFFFFFFFFFFFFFFr  rFMFFFFFFFFFFFFFFFFFFFFFFFFMMF     MMM
FMFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  FFFFFFFFFMFFFMF     FMFFFFFFFFFFFFFFFFFFFFFMF   FMFFFFFFFFFFFFFFFFFFFFFFFFFFFF     MM
FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFr  rFFFFFFFFFFFFFMr     FMFFFFFFFFFFFFFFFFFFFFFMr   FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF    MM
FMMMFFFFFFFFFFFFFFFFFFFFFFFFFMF   FFMFFFFFFFFFFFr      FMFFFFFFFFFFFFFFFFFFFFMM    FMMFFFFFFFFFFFFFFFFFFFFFFFFFFFFF    M
MMFFFFFFFFFFFFFFFFFFFFFFFFFFFF   rFFFFFFFFFFFFF        rMMFFFFFFFFFFFFFFFFFFFMF    rFFMMMFFFFFFFFFFFFFFFFFFFFFFFFFF     
FFFFFFFFFFFFFFFFFFFFFFFFFFFMFF   FMFFFFFMFMMFF     r    MMFFFFFFFFFFFFFFFFFFFFF            rFFMMFFMFFFFFFFFFFFFFFFFF    
FFFFFFFFFFFFFFFFFFFFFFFFFFFFF   rMMFFFFFMMMMr    FMM    FMFFFFFFFFFFFFFFFFFFFF                 FFMMMFFFFFFFFFFFFFFFFr   
FFFFFFFFFFFFFFFFFFFFFFFFFFFFF   FMMFFFFFrr       MMM    FMFFFFFFFFFFFFFFFFFFFF                    FMMFFFFFFFFFFFFFFFF   
FFFFFFFFFFFFFFFFFFFFFFFFFFFFr   FMr                     FMFFFFFFFFMMFFFFFFFFF        MMM            FFFFFFFFFFFFFFFFF   
FFFFFFFFFFFFFFFFFFFFFFFFFFFF                            FFFFFFFFFFFFMFFFFFFF      MMMMMMF             FMFFFFFFFFFFFFFF  
FFFFFFFFFFFFFFFFFFFFFFFFFFFF              MMMMM          rFFFFF    rMFFFFMF     MM                     FMFFFFFFFFFFFFF  
FFFFFFFFFFFFFFFFFFFFFFFFFF             MM                 FMMFr    rMFFFFF     MM   FMMMF               FFFFFFFFFFFFFFr 
FFFFFFFFFFFFFFFFFFFFFMMF            MMM                  FMMMr     FMFFFF     MM   rMMMFFMF            FFFFFFFFFFFFFFMF 
FFFFFFFFFFFFFFFFFFFFFF          MMMMMM    FMMMMMMF       MMMr      MMFF     MMM    FMFFFFFFF        MMMMFFFMMFFFFFFFMFr 
FFFFFFFFFFFFFFFFFFFMF         MMMMMMM    FMFFFFFFFF      MM        MM     FMMMM   FMFFFFFFFF         FMFFFFFFFFFFFFFFF  
FFFFFFFFFFFFFFFFFFMF          MMMMMM    FMFFFFFFFFFF                     MMMMM    FMMFFFFFFF    M     FFFFFFFFFFFFFFFF  
FFFFFFFFFFFFFFFFFFMF          MMMMMM    MFFFFFFFFFFFr        MM       MMMMMMMM    MMMFFFFFFFF   MM     FMFFFFFFFFFFFF   
FFFFFFFFFFFFFFFFFFFFr   FMF  MMMMMM    FMMFFFFFFFFFFF       MMMMMMMMMMMMMMMMMM    MMMFFFFFFFr   MMM     FMFFFFFFFFFFF   
FFFFFFFFFFFFFFFFFFFFFFFFFMF  MMMMMM    FMMFFFFFFFFFFr     MMMMMMMMMMMMMMMMMMMMM  MMMMFFFFFFF   MMMMM     FFFFFFFFFFFFF  
FFFFFFFFFFFFFFFFFFFFFFFFFMF  FMMMMMr   MMMMMFFMFFFFF    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMFFFFFF   MMMMMM    FFFFFFFFr      
FFFFFFFFFFFFFFFFFFFFFFFFFFF  FMMMMMMMMMMMMMFFFFFFFFF   MMMMMMMMMMMMMMMMMMMMMMMMF    FMFFFFF   MMMMMMMM    FMFMFMF       
FFFFFFFFFFFFFFFFFFFFFFFFFFF  FMMMMMMM  FMMMFFFFFFFF   FMMMMMMMMMMMMMMMMMMMMMMMMMM     FFr    MMMMMMMMM    rFMMFFr       
FFFFFFFFFFFFFFFFFFFFFFFFFFF  FMMMMMMM   rFMFFFFFFF   rMMMMMMMMMMMMMMMMMMMMMMMMMMMMM        MMMMMMMMMMM     FMMMF        
FFFFFFFFFFFFFFFFFFFFFFFFFFF  rMMMMMMMM    rFFFFFr   FMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMr     FFMF         
FFFFFFFFFFFFFF  FFFFFFFFFFF  rMMMMMMMMMF          rMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMF       MF          
FFFFFFFFFFFFFr  FFFFFFFFFFF   MMMMMMMMMMMMMrrrrFMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMr       F           
FFFFFFFFFFFFF   FFFFFFFFFFF   FMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM   Mr       MM      
FFFFFFFFFFFFF   FFFFFFFFMFF   rMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMr  rMM      rMM     M
FFFFFFFFFFFFF   FFFFFFFFFFFF  rMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM   MMM      rrr    MM
FFFFFFFFFFFFF    FMFFFFFFFFF   FMMMMMMMMMMMMMMMMMMMMMMMMMr           rrMMMMMMMMMMMMMMMMMMMMMMMMMMM   rMMMFr rrrFrrr    M
FFFFFFFFFFFFFr   FMFFFFFFFFF   rMMMMMMMMMMMMMMMMMMMMMMMMMr rrFFFFFrrrrrrFMMMMMMMMMMMMMMMMMMMMMMMMM   MMFFFFFFFFrr      M
FFFFFFFFFFFFFF   rMMFFFFFFFFF  rMMMMMMMMMMMMMMMMMMMMMMMMM  rrFFFFFFFrrr rMMMMMMMMMMMMMMMMMMMMMMM     FFrFrrrr       rr  
FFFFFFFFFFFFFF    FMFFFFFFFFF   MMMMMMMMMMMMMMMMMMMMMMMMMr  rFFFFFFrrr rMMMMMMMMMMMMMMMMMMMMMM       rFrrr        FMF   
FFFFFFFFFFFFFF     FFFFFFFMFF    MMMMMMMMMMMMMMMMMMMMMMMMM   rrFrrr  rMMMMMMMMMMMMMMMMMMMMM           r        FFMF     
FFFFFFFFFFFFFFF    rMMFFFFFFFF    MMMMMMMMMMMMMMMMMMMMMMMMMr        FMMMMMMMMMMMMMMMMMM        FMF          FMMMFF    MM
FFFFFFFFFFFFFFFF    FMFFFFFFFF        MMMMMMMMMMMMMMMMMMMMMMMMrrrMMMMMMMMMMMMMMMMMM         FMMFMM       FFMFMMF     MMM
FFFFFFFFFFFFFFFFr    FMFFFFFFMF           MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMr         FFMMMFFFFFF     FMMFMF     MMMM 
FFFFFFFFFFFFFFFFF     FMFFFFFFFF                rMMMMMMMMMMMMMMMMMMMMMMMr           FFMMMMMMFFFFFFMF    FMMF     MMMMM  
FFFFFFFFFFFFFFFFFFr    rFMFFFFFMF    FMFFr          MMMMMMMMMMMMMM            FFMMMFFFFFFFFFMMMMMMMMr   FF     MMMMMM   
FFFFFFFFFFFFFFFFFMFF     FFFFFFFFF    FMMMMMMFFF    MMMMMMMMMMMMM       FFMMMMFFMFFFFFMMFFFFMFFMMMFMMFr      MMMMMM     
FMFFFFFFFFFFr  FFFFFF      rFFFFFFr    FMMMFMMFF    MMMMMMMMMMMMM    FMMMMMMFFFFFFFFFFr   FFFFMFr         MMMMMM     FF 
rFFFFFFFFFFr     FFFFFF                FFMMFF       rMMMMMMMMMMMM      FFMMMFFFFFFFFF      FMMMr       MMMMMM      FMMF 
 
 
  */



  //攒钻计算系统
  ctx.command("攒钻 <message:text>", '青辉石计算器')
    .alias('算石头')
    .usage("发送“攒钻”查看具体使用方法")
    .example("攒钻 2023/7/27月卡有jjc30挑战100总力一档")
    .action((_, message) => {
      if (!message) {
        return "标准输入: \n" +
          "1.日期使用年/月/日形式；\n" +
          "2.月卡有/无；\n" +
          "3.jjc一天拿多少钻；\n" +
          "4.活动的挑战关能拿多少\n" +
          "(100代表全拿，只能打两关就是40)；\n" +
          "5.总力是几档\n" +
          "1、2、3、4、5都需要输入喵，中间不需要空格\n" +
          "示例：\n" +
          "攒钻 2023/7/27月卡有jjc30挑战100总力一档"
      }
      let a = getMessage(message);
      let b = [];
      if (a[0] && a[2] && a[3] !== null && a[4]) {
        b = accumulate(a[0], a[1], a[2], a[3], a[4]);
        return `日常奖励：${b[0]}
周常任务：${b[1]}
签到奖励：${b[2]}
活动奖励及维护补偿：${b[3]}
新开放剧情奖励：${b[4]}
总力战：${b[5]}
总计：${b[6]}
注意：计算结果与实际所得会存在一定偏差，仅供参考`
      } else {
        return "输入有误，请按标准重新输入\n" +
          "标准输入: \n" +
          "1.日期使用年/月/日形式；\n" +
          "2.月卡有/无；\n" +
          "3.jjc一天拿多少钻；\n" +
          "4.活动的挑战关能拿多少\n" +
          "(100代表全拿，只能打两关就是40)；\n" +
          "5.总力是几档\n" +
          "1、2、3、4、5都需要输入喵，中间不需要空格\n" +
          "示例：\n" +
          "攒钻 2023/7/27月卡有jjc30挑战100总力一档"
      }
    })



  //-----------------------------------------------------------------------------

  //阿林代码区

  //抽卡系统

  /*
    var alingroup = [//存储阿林群整活角色
      '春佳佬',
      '早苗',
      '苗门',
      'alin',
      '串串',
    ]
  
  
    ctx.command("ba", '碧蓝档案抽卡模拟器')
      .alias('抽卡')
      .alias('BA')
      .example('ba 日服up井')
      .usage("发送“ba”查看具体使用方法")
      .example('ba 国际服常驻十连')
      .action(async ({ session }, ...args) => {
  
  
        if ((args[0]) == null) {
          let a = "BlueArchive抽卡模拟器\n" +
            "日服常驻已添加实莉，国际服常驻已添加时雨\n" +
            "使用方法：ba+空格+国际服/日服+up/常驻+井/十连\n" +
            "例如：ba 日服常驻十连\n" +
            "ba 国际up井\n" +
            "也可以使用ba+空格+卡池代号抽卡\n" +
            "1：日服up井   2：国际服up井\n" +
            "3：日服up十连   4：国际服up十连\n" +
            "5：日服常驻十连   6：国际服常驻十连\n" +
            "7：日服常驻井   8：国际服常驻井\n" +
            "使用ba+空格+jup/iup+空格+角色 设定日服/国际服的up池角色\n" +
            '\n' +
            "使用ba+空格+name 查看up池角色名称（之后会优化交互的呜呜）\n" +
            "一星的概率是78.5%\n" +
            "二星的概率是18.5%\n" +
            "三星的概率是2.3%\n" +
            "up角的概率是0.7%"
          return <message forward>
            <message>
              <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
              {a}
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                角色对应名称图
                <image url={'http://124.221.99.85:8088/name.jpg'} />
              </message>
            </message>
          </message>
  
        } else {
  
          //急服名称检测
          if ((args[0]) === 'iup') {
            if (cardPool.limit.some(e => e.name === args[1])) {
              inup = '爱丽丝'
              return '啊哈哈...国急服还没实装呢'
            } else if ((cardPool.threeStar).some(e => e.name === args[1])
              || (cardPool.limit3).some(e => e.name === args[1])) {
              inup = (args[1])
              return '已设置国际服up角色为 ' + inup
            }
            else {
              inup = '爱丽丝'
              return '啊哈哈...角色名字不对喵'
            }
          }
  
          //日服名称检测
          if ((args[0]) === 'jup') {
            if ((cardPool.threeStar).some(e => e.name === args[1]) ||
              (cardPool.limit2).some(e => e.name === args[1])) {
              jaup = (args[1])
              return '已设置日服up角色为 ' + jaup
              //整活
            } else if ((alingroup).some(e => e === args[1])) {
              jaup = (args[1])
              return '整活成功，已设置日服up角色为 ' + jaup
            }
            else {
              jaup = '实莉'
              return '啊哈哈...角色名字不对喵'
            }
          };
  
  
  
          if ((args[0]) === '日服up井' ||
            (args[0]) === '1' || (args[0]) === '日服up池井') {
            日服up()
            if (count3up === 0) {
              var upout = '呜呜，没有抽到up角色'
            } else {
              var upout =
                <message>
                  <message>
                    <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
  
                    抽到了 {count3up} 个UP角色：
                  </message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} avatar="url" />
                  <message>
                    ⭐⭐⭐{upcard}X{count3up}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                  </message>
                </message>
            }
            return <message forward>
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                日服 {jaup} 池抽卡200次结果如下：{'\n'}
                抽到以下 {count3 + count3up} 个三星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} avatar="url" />
              {output.map((item) => (
                <message>
                  ⭐⭐⭐{item}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + item + '.jpg')).href} />
                </message>
              ))}
              <message>
                {upout}
                {cleardata()}
              </message>
            </message>
          }
  
  
          if ((args[0]) === '国际服up井' || (args[0]) === '2') {
            国际up()
            if (count3up === 0) {
              var upout = '呜呜，没有抽到up角色'
            } else {
              var upout =
                <message>
                  <message>
                    <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                    抽到了 {count3up} 个UP角色：
                  </message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} avatar="url" />
                  <message>
                    ⭐⭐⭐{upcard}X{count3up}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                  </message>
                </message>
            }
            return <message forward>
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                国际服 {inup} 池抽卡200次结果如下：{'\n'}
                抽到以下 {count3 + inup} 个三星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} avatar="url" />
              {output.map((item) => (
                <message>
                  ⭐⭐⭐{item}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + item + '.jpg')).href} />
                </message>
              ))}
              <message>
                {upout}
                {cleardata()}
              </message>
            </message>
          }
  
          //==================
  
          if ((args[0]) === '日服up十连' || (args[0]) === '3') {
            日服up十连()
            let three: any
            if (count3 === 0 && count3up === 0) {
              let oout: any = Math.floor(Math.random() * nocai.length)
              three = nocai[oout]
            } else {
              three =
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count3 + count3}个三星角色：
                </message>
            }
            if (count3up === 0) {
              var upout = ''
            } else {
              var upout =
                <message>
                  <message>
                    <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                    抽到了 {count3up} 个UP角色：
                  </message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} avatar="url" />
                  <message>
                    ⭐⭐⭐{upcard}X{count3up}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                  </message>
                </message>
            }
            return <message forward>
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                日服 {jaup} 池抽卡10次结果如下：{'\n'}
                抽到以下{count1}个一星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} acatar="url" />
              {output101.map((out101) => (
                <message>
                  ⭐{out101}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                </message>
              )
              )}
  
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                抽到以下{count2}个二星角色：
              </message>
              {output102.map((out102) => (
                <message>
                  ⭐⭐{out102}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                </message>
              )
              )}
              <message>
                {three}
              </message>
              {output103.map((out103) => (
                <message>
                  ⭐⭐⭐{out103}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                </message>
              ))}
              {upout}
              {cleardata()}
            </message>
          }
  
  
  
          if ((args[0]) === '国际服up十连' || (args[0]) === '4') {
            国际服up十连()
            let three: any
            if (count3 === 0 && count3up === 0) {
              let oout: any = Math.floor(Math.random() * nocai.length)
              three = nocai[oout]
            } else {
              three =
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count3 + count3}个三星角色：
                </message>
            }
            if (count3up === 0) {
              var upout = ''
            } else {
              var upout =
                <message>
                  <message>
                    <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                    抽到了 {count3up} 个UP角色：
                  </message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} avatar="url" />
                  <message>
                    ⭐⭐⭐{upcard}X{count3up}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                  </message>
                </message>
            }
            return <message forward>
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                国际服 {inup} 池抽卡10次结果如下：{'\n'}
                抽到以下{count1}个一星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} acatar="url" />
              {output101.map((out101) => (
                <message>
                  ⭐{out101}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                </message>
              )
              )}
  
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                抽到以下{count2}个二星角色：
              </message>
              {output102.map((out102) => (
                <message>
                  ⭐⭐{out102}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                </message>
              )
              )}
              <message>
                {three}
              </message>
              {output103.map((out103) => (
                <message>
                  ⭐⭐⭐{out103}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                </message>
              ))}
              {upout}
              {cleardata()}
            </message>
          }
          if ((args[0]) === '国际服常驻十连' || (args[0]) === '6') {
            国际服常驻十连()
            let three: any
            if (count3 === 0) {
              let oout: any = Math.floor(Math.random() * nocai.length)
              three = nocai[oout]
            } else {
              three =
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count3}个三星角色：
                </message>
            }
            console.log(three)
            return <message forward>
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                国际服常驻池抽卡10次结果如下：{'\n'}
                抽到以下{count1}个一星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} acatar="url" />
              {output101.map((out101) => (
                <message>
                  ⭐{out101}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                </message>
              )
              )}
  
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                抽到以下{count2}个二星角色：
              </message>
              {output102.map((out102) => (
                <message>
                  ⭐⭐{out102}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                </message>
              )
              )}
              <message>{three}</message>
              {output103.map((out103) => (
                <message>
                  ⭐⭐⭐{out103}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                </message>
              ))
              }
              {cleardata()}
            </message>
  
          }
  
  
  
          if ((args[0]) === '日服常驻十连' || (args[0]) === '5') {
            日服常驻十连()
            let three: any
            if (count3 === 0) {
              let oout: any = Math.floor(Math.random() * nocai.length)
              three = nocai[oout]
            } else {
              three =
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count3}个三星角色：
                </message>
            }
            console.log(three)
            return <message forward>
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                日服常驻池抽卡10次结果如下：{'\n'}
                抽到以下{count1}个一星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} acatar="url" />
              {output101.map((out101) => (
                <message>
                  ⭐{out101}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                </message>
              )
              )}
  
              <message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                抽到以下{count2}个二星角色：
              </message>
              {output102.map((out102) => (
                <message>
                  ⭐⭐{out102}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                </message>
              )
              )}
              <message>{three}</message>
              {output103.map((out103) => (
                <message>
                  ⭐⭐⭐{out103}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                </message>
              ))
              }
              {cleardata()}
            </message>
  
          }
  
          if ((args[0]) === '日服常驻井' || (args[0]) === '7') {
            日服井()
            return <message forward>
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                日服常驻池抽卡200次结果如下：{'\n'}
                抽到以下 {count3} 个三星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} avatar="url" />
              {output.map((item) => (
                <message>
                  ⭐⭐⭐{item}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + item + '.jpg')).href} />
                </message>
              ), cleardata()
              )}
            </message>
          };
  
          if ((args[0]) === '国际服常驻井' || (args[0]) === '8') {
            国际服井()
            return <message forward>
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                国际服常驻池抽卡200次结果如下：{'\n'}
                抽到以下 {count3} 个三星角色：
              </message>
              <author user-id={session.selfId}
                nickname={session.selfId} avatar="url" />
              {output.map((item) => (
                <message>
                  ⭐⭐⭐{item}
                  <image url={pathToFileURL(resolve
                    (__dirname, './data/photo/' + item + '.jpg')).href} />
                </message>
              ), cleardata()
              )}
            </message>
          };
  
          if ((args[0]) === 'name') {
            return "角色对应名称图" + <image url={'http://124.221.99.85:8088/name.jpg'} />
          }
  
        } {
          return '呜呜...输入错误了'
        }
      })
  
  */







  //攻略系统&&角色评分系统
  ctx.command('攻略', "bawiki的攻略图和角色评分")
    .alias('杂图')
    .alias('查询')
    .alias('评测')
    .alias('测评')
    .alias('评分')
    .alias('角评')
    .alias('角色评分')
    .usage("发送“攻略”查看具体使用方法")
    .example('攻略 千里眼')
    .action(async ({ session }, ...args) => {

      if ((args[0]) == null) {
        return '使用方法：攻略+空格+内容\n' +
          "目前攻略图支持查询：\n" +
          "千里眼  互动家具  评测总分  礼物 \n" +
          "体力规划  石头规划  制造  装备 \n" +
          '  发送：攻略+空格+角色名 查询角色评分图\n' +
          '  发送：攻略+空格+随机表情 随机抽取社团聊天表情\n' +
          '  发送：攻略+空格+随机漫画 随机抽取ba漫画\n' +
          "数据来源于ba.gamekee.com和大佬的bawiki-data数据库\n" +
          "学生评分只需名字即可，可以使用罗马音查询 \n" +
          "角色名称缺失和错误可以去GitHub反馈喵 \n" +
          "引用 @夜猫咪喵喵猫 的角色评分\n" +
          "2、3图源服务器来自大佬的数据库github.com/lgc-NB2Dev/bawiki-data\n" +
          "如果无法加载图片请发送‘攻略+空格+服务器代号’切换图源服务器\n" +
          "服务器代号：1、2、3，只需填入代号即可"
      } else {
        if ((args[0]) === '1') {
          uurl = alincloud
          return '已设置1服务器'
        }
        if ((args[0]) === '2') {
          uurl = laocdn
          return '已设置2服务器'
        }
        if ((args[0]) === '3') {
          uurl = laocloud
          return '已设置3服务器'
        };

        if ((args[0]) === '随机表情' || (args[0]) === '抽表情') {
          let random = Math.floor(Math.random() * 59) + 1
          let random1 = random.toString().padStart(2, '0');
          return (h('image',{url:uurl + 'emoji/' + 'Clanchat_Emoji_' + random1 + '_Tw' + '.png'} ))
        }


        if ((args[0]) === '随机漫画' || (args[0]) === '抽漫画') {
          let random = Math.floor(Math.random() * 218) + 1
          let random1 = random.toString().padStart(4, '1');
          return (h('image', { url: alincloud + 'comic/' + random1 + '.jpg' }))
        }


        for (const obj of data1) {
          if (obj.name === args[0]) {
            return h('image', { url: obj.link[0] })
          }
        };
        for (const obj of data) {
          if (obj.name === args[0]) {
            return h('image', { url: uurl + 'student/' + obj.link[0] + '.png' })
          }
        }
        for (const obj of data) {
          if (obj.name != args[0]) {
            return "呜呜，没有找到对应攻略图，换个名称试试吧。"
          }
        }
      }


      


      //尾巴1
    })

    

    ctx.plugin(plugin, config)
    ctx.plugin(gachaplugin, config)


  //尾巴2
}


















