"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanaefight = exports.inup = exports.jaup = void 0;
const jsx_runtime_1 = require("@satorijs/element/jsx-runtime");
//import区域
const koishi_1 = require("koishi");
const raid49_1 = require("./raid49");
const raid49_2 = require("./raid49");
const clairvoyant_1 = require("../data/clairvoyant");
const clairvoyant_2 = require("../data/clairvoyant");
let latest = [];
var uurl = '';
//声明服务器
const alincloud = 'http://124.221.99.85:8088/';
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/';
const laocloud = 'https://bawiki.lgc2333.top/img/';
exports.sanaefight = ({
    apply(ctx, config) {
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
                    "注意：模拟结果与实际有较大偏差，仅供参考。");
                return (0, jsx_runtime_1.jsxs)("message", { forward: true, children: [(0, jsx_runtime_1.jsxs)("message", { children: [(0, jsx_runtime_1.jsx)("author", { "user-id": session.selfId, nickname: session.selfId, avatar: "url" }), aout] }), (0, jsx_runtime_1.jsx)("message", { children: ((0, koishi_1.h)('image', { url: 'http://a1.qpic.cn/psc?/V52az0IC4FSzwy2ZEIPY13Zxqg2DtiRi/ruAMsa53pVQWN7FLK88i5sc0SiZ9MX*Zi3mglMaxKBpz9JGTK0r4OUB95rOVgPbcvdvIBqk3KpR.at6mNdiSNi3pZB.3NKxhWO8jyNfwL8U!/c&ek=1&kp=1&pt=0&bo=WgFZAVoBWQEBFzA!&tl=1&vuin=1549641467&tm=1684944000&dis_t=1684944504&dis_k=9252566cf3d9f534797e1014d986d259&sce=60-2-2&rf=0-0' })) })] });
            }
            if ((args[0]) === '大蛇打一次') {
                let result = (0, raid49_1.raid49)();
                result = (0, raid49_2.simplify)(result);
                for (let i = 0; i < result.length; i++) {
                    if (Object.is(result[i], "VICTORY！\n")) {
                        let result_reverse = result.reverse();
                        let score = result_reverse[0].match(/\d+/)[0];
                        let time = result_reverse[6].match(/\d+(\.\d+)?/)[0];
                        latest = result.reverse();
                        return `VICTORY！\n战斗时间：${time}\n获得分数：${score}`;
                    }
                    else if (result[i].includes("凹分失败")) {
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
                    let result = (0, raid49_1.raid49)();
                    result = (0, raid49_2.simplify)(result);
                    for (let i = 0; i < result.length; i++) {
                        if (Object.is(result[i], "VICTORY！\n")) {
                            let result_reverse = result.reverse();
                            let score = result_reverse[0].match(/\d+/)[0];
                            let time = result_reverse[6].match(/\d+(\.\d+)?/)[0];
                            message10.push(`第${ct}次：战斗时间：${time}，获得分数：${score}\n`);
                            if (score >= score_best) {
                                score_best = score;
                                time_best = time;
                                latest = result.reverse();
                            }
                        }
                        else if (result[i].includes("凹分失败")) {
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
                    let a = (0, raid49_1.cut_twenty)(latest);
                    return (0, jsx_runtime_1.jsx)("message", { forward: true, children: a.map((msg) => ((0, jsx_runtime_1.jsxs)("message", { children: [(0, jsx_runtime_1.jsx)("author", { "user-id": session.selfId, nickname: session.selfId, avatar: "url" }), msg] }))) });
                }
                else {
                    return "啊嘞？战斗记录找不到了......";
                }
            }
        });
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
                    "1.需要攒到的那天，使用年/月/日形式；\n" +
                    "2.月卡有/无；\n" +
                    "3.jjc一天拿多少钻；\n" +
                    "4.活动的挑战关能拿多少\n" +
                    "(100代表全拿，只能打两关就是40)；\n" +
                    "5.总力是几档\n" +
                    "1、2、3、4、5都需要输入喵，中间不需要空格\n" +
                    "示例：\n" +
                    "攒钻 2023/11/14月卡有jjc30挑战100总力一档";
            }
            let a = (0, clairvoyant_2.getMessage)(message);
            let b = [];
            if (a[0] && a[2] && a[3] !== null && a[4]) {
                b = (0, clairvoyant_1.accumulate)(a[0], a[1], a[2], a[3], a[4]);
                return `日常奖励：${b[0]}
周常任务：${b[1]}
签到奖励：${b[2]}
活动奖励及维护补偿：${b[3]}
新开放剧情奖励：${b[4]}
总力战：${b[5]}
总计：${b[6]}
注意：计算结果与实际所得会存在一定偏差，仅供参考`;
            }
            else {
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
                    "攒钻 2023/7/27月卡有jjc30挑战100总力一档";
            }
        });
    }
});
