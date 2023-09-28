"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gacha = exports.gachaPool = exports.path = exports.gachaProbability = exports.gachaConfig = void 0;
/*抽卡实现模块*/
/*可能实现功能 UP池独立设置 */
const koishi_1 = require("koishi");
const ps_1 = require("./ps");
const url_1 = require("url");
const path_1 = require("path");
exports.gachaConfig = koishi_1.Schema.intersect([
    koishi_1.Schema.object({
        '日服默认UP角色': koishi_1.Schema.string().default("").description('默认日服UP的学生'),
        '国际服默认UP角色': koishi_1.Schema.string().default("").description('默认国际服UP的学生'),
    }).description('卡池设置'),
    koishi_1.Schema.object({
        'UP★★★': koishi_1.Schema.number().min(0).default(0.7).max(100).description('UP学生的概率'),
        '★★★': koishi_1.Schema.number().min(0).default(2.3).max(100).description('★★★学生的概率'),
        '★★': koishi_1.Schema.number().min(0).default(18.5).max(100).description('★★学生的概率'),
        '★': koishi_1.Schema.number().min(0).default(78.5).max(100).description('★学生的概率'),
    }).description('抽卡模拟器设置(双服通用)'),
]);
const PB = {};
function gachaProbability(config) {
    PB['UP'] = config['UP★★★'];
    PB['SSR'] = config['★★★'];
    PB['SR'] = config['★★'];
    PB['R'] = config['★'];
}
exports.gachaProbability = gachaProbability;
var RPool = [];
var SRPool = [];
var SSRPool = [];
var UPStu = [];
/*--------------------------------(分割线)----------------------------------*/
//初始化卡池
async function gachaPool(ctx, temporary) {
    const UP = temporary.server ? 'JUp' : 'IUp';
    const SERVER = temporary.server ? {} : { server: 0 };
    RPool = await ctx.database.get('student', { $and: [{ rare: 1 }, { limit: 0 }, SERVER] }, ['name']);
    SRPool = await ctx.database.get('student', { $and: [{ rare: 2 }, { limit: 0 }, SERVER] }, ['name']);
    if (await temporary.UPGacha) {
        SSRPool = await ctx.database.get('student', { $and: [{ rare: 3 }, { limit: 0 }, { [UP]: { $eq: false } }, SERVER] }, ['name']);
        UPStu = await ctx.database.get('student', { [UP]: { $eq: true } }, ['name']);
    }
    else {
        SSRPool = await ctx.database.get('student', { $and: [{ rare: 3 }, { limit: 0 }, SERVER] }, ['name']);
    }
    try {
        if (RPool.length == 0 || SRPool.length == 0 || SSRPool.length == 0) {
            throw ('初始化卡池失败');
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.gachaPool = gachaPool;
//重置卡池
function resetPool() {
    RPool = [];
    SRPool = [];
    SSRPool = [];
    UPStu = [];
}
//抽卡入口
async function gacha(ctx, args, user, UP) {
    let cardArray = []; //临时抽卡结果
    let temporary = {
        card: "",
        pickup: false,
        raindow: false,
        UPGacha: false,
        server: true, //服务器判断
    };
    temporary.UPGacha = UP;
    temporary.server = args[0] === '日服' ? true : false;
    await gachaPool(ctx, temporary);
    const GACHACOUNT = args[1] === '十连' ? 10 : 1;
    const STAT = await ctx.database.get('bauser', { userid: user });
    const NSTAT = args[0] === '日服' ? 'Jstat' : 'Istat';
    const USTAT = args[0] === '日服' ? temporary.UPGacha ? 'JUPstat' : 'JNstat' : temporary.UPGacha ? 'IUPstat' : 'INstat';
    await ctx.database.set('bauser', { userid: user }, { [NSTAT]: { $add: [{ $: NSTAT }, GACHACOUNT] }, [USTAT]: { $add: [{ $: USTAT }, GACHACOUNT] } });
    await baGacha(temporary, cardArray, ctx, user, GACHACOUNT);
    let image = await ps_1.gachaImage.result(cardArray, STAT[0][USTAT], RPool, SRPool);
    resetPool(); //重置卡池
    exports.path = temporary.raindow ?
        ((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../assets/color.gif')).href) :
        ((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../assets/blue.gif')).href);
    return image;
}
exports.gacha = gacha;
//抽卡启动时
async function baGacha(temporary, cardArray, ctx, user, GACHACOUNT) {
    for (let i = 0; i < GACHACOUNT; i++) {
        cardArray.push({ name: await gachaNormal(i, temporary, ctx, user), pickup: temporary.pickup });
    }
}
//抽卡进行时
async function gachaNormal(i, temporary, ctx, user) {
    temporary.pickup = false;
    const CARD = koishi_1.Random.weightedPick(PB);
    if (CARD === 'SSR' || CARD === 'UP') { //⭐⭐⭐
        temporary.raindow = true;
        const STAR = temporary.server ? 'Jstar' : 'Istar';
        await ctx.model.set('bauser', { userid: user }, { [STAR]: { $add: [{ $: STAR }, 1] } });
        if (CARD === 'UP') {
            await pickup(temporary, ctx, user); //UP判断
        }
        else {
            const USTAR = temporary.UPGacha ? temporary.server ? 'JUPstar' : 'IUPstar' : temporary.server ? 'JNstar' : 'INstar';
            await ctx.model.set('bauser', { userid: user }, { [USTAR]: { $add: [{ $: USTAR }, 1] } });
            temporary.card = SSRPool[koishi_1.Random.int(SSRPool.length)];
        }
    }
    else if (CARD === 'SR') { //⭐⭐
        temporary.card = SRPool[koishi_1.Random.int(SRPool.length)];
    }
    else { //⭐
        if (i == 9) {
            temporary.card = SRPool[koishi_1.Random.int(SRPool.length)];
        }
        else {
            temporary.card = RPool[koishi_1.Random.int(RPool.length)];
        }
    }
    return temporary.card.name;
}
//UP判断
async function pickup(temporary, ctx, user) {
    if (temporary.UPGacha) {
        const UPSTAR = temporary.server ? 'JUUPstar' : 'IUUPstar';
        await ctx.model.set('bauser', { userid: user }, { [UPSTAR]: { $add: [{ $: UPSTAR }, 1] } });
        temporary.pickup = true;
        temporary.card = UPStu[0];
    }
    else {
        const USTAR = temporary.server ? 'JNstar' : 'INstar';
        await ctx.model.set('bauser', { userid: user }, { [USTAR]: { $add: [{ $: USTAR }, 1] } });
        temporary.card = SSRPool[koishi_1.Random.int(SSRPool.length)];
    }
}
