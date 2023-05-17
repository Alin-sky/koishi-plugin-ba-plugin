
//import区域
import { Context, Schema } from 'koishi'
import { cut_twenty, raid49 } from './sanae-fight/raid49';
import { simplify } from './sanae-fight/raid49';
import { data ,data1} from "./data/data";

import { pathToFileURL } from 'url'
import { resolve } from 'path'
import { 日服井,国际服井, 国际服十连,日服十连 } from './data/test';
import { url } from "inspector";
import { secureHeapUsed } from "crypto";
import { builtinModules } from 'module';



export const name = "ba-plugin";
export const usage = "## 数据来源于<a href=\"https://ba.gamekee.com/\">bawiki</a>\n"+
"更多功能正在疯狂开发中，有啥毛病可以去[GitHub](https://github.com/Alin-sky/koishi-plugin-ba-plugin)"+
"上提[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues)，\n"+
" ## 目前有以下功能" +"\n" +
" - 群友早苗写的模拟总力战\n" +
" - 攻略查询\n" +
" - 抽卡模拟器\n" +
" - 角色评分查询\n" 


export interface Config {}

export const Config: Schema<Config> = Schema.object({})




let latest: any[] = [];
export function apply(ctx: Context) {

  ctx.command("总力",'总力战模拟')  
  .alias('打')
  .alias('凹分')
  .action(async( {session},...args ) => {
   
    if((args [0])== null){
    return "sensei，来做爱丽丝的朋友吧！\n" + 
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
    "注意：模拟结果与实际有较大偏差，仅供参考。"
    }
    
      if ((args[0])=== '大蛇打一次'){
    let result = raid49();
    result = simplify(result);
    for (let i = 0; i < result.length; i++) {
      if (Object.is(result[i], "VICTORY！\n")) {
        let result_reverse = result.reverse();
        let score: number =  result_reverse[0].match(/\d+/)[0];
        let time: number = result_reverse[6].match(/\d+(\.\d+)?/)[0];
        latest = result.reverse();
        return `VICTORY！\n战斗时间：${time}\n获得分数：${score}`;
      } else if (result[i].includes("凹分失败")) {
        let result_reverse = result.reverse();
        let message = result_reverse[0];
        latest = result.reverse();
        return message;
      }
    }}
  
if ((args [0]) === '大蛇打十次' ){
    let message10 = [];
    let ct = 0;
    let score_best = 0;
    let time_best = 0;
    latest = [];
    for (let i =0; i < 10; i++) {
      ct += 1;
      let result = raid49();
      result = simplify(result);
      for (let i = 0; i < result.length; i++) {
        if (Object.is(result[i], "VICTORY！\n")) {
          let result_reverse = result.reverse();
          let score: number =  result_reverse[0].match(/\d+/)[0];
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
  if ((args[0])==='记录'){

    if (latest.length > 0) {
      let a = cut_twenty(latest);
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
      return <message forward>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
       {a[0]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[1]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[2]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[3]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[4]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[5]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[6]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[7]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[8]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[9]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[10]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[11]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[12]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[13]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[14]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[15]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[16]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[17]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[18]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[19]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[20]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[21]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[22]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[23]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[24]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[25]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[26]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[27]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[28]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[29]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[30]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[31]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[32]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[33]}
      </message>
      <message>
        <author user-id= {session.userId} nickname="ARONA" avatar="url"/>
        {a[34]}
      </message>
      <author user-id={session.userId} nickname="ARONA" avatar="url"/>
        {a[35]}
      </message>
      
      
  

    } else {
      return "啊嘞？战斗记录找不到了......"
    }}


  } )





//阿林代码区

ctx.command('评分',"引用bawiki的角色评分")
.alias('评测')
.alias('测评')
.example('评分 爱丽丝')
.action(async ({ session }, ...args) => {
    for (const obj of data) {
      if (obj.name === args[0]) {    
    return  <image url= {obj.link[0]} />
      }
      if ((args[0])==null ){
       return '使用方法：评分+空格+角色名称\n'+
       "角色名称缺失和错误欢迎去GitHub反馈 \n"+ 
       "数据来源于ba.gamekee.com"}
  }

});


//抽卡系统
ctx.command("ba",'抽卡模拟器，目前只支持抽两个服的常驻池')
.example('ba 日服来一井')
.example('ba 国际服十连')
.action(async({session},...args) =>{

    if((args[0]) === '日服来一井'){
        return 日服井()

    };
  
    if ((args[0]) === '国际服来一井'){
        return 国际服井()
        
    };
    if ((args[0]) === '日服十连' ){
     return 日服十连()
  };
  if ((args[0]) === '国际服十连' ){
    return 国际服十连()
 }




    return ('呜~好像输入错误了')
})
  

 ctx.command('攻略',"bawiki网站的攻略图")
 .alias('杂图')
 .alias('查询')
 .example('攻略 千里眼')
 .action(async ({ session }, ...args) => {
     for (const obj of data1) {
       if (obj.name === args[0]) {    
     return  <image url= {obj.link[0]} />
       }
       if ((args[0])==null ){
        return '使用方法：攻略+空格+内容\n'+
        "目前支持查询：千里眼  互动家具  评测总分  礼物 \n"+ 
        "体力规划  石头规划\n"+
        "数据来源于ba.gamekee.com"}
   }
 

 });
 










}
















  