/*抽卡实现*/
/*可能实现功能 UP池独立设置  井(图片处理过于耗费时间)*/
import { Context, Eval, Random, Schema, h } from 'koishi'
import { Config } from '../index'
import { gachaImageOne, gachaImageTen } from './ps'
declare module '../gacha/index' {
    interface Config {
        'UP★★★': number
        '★★★': number
        '★★': number
        '★': number
    }
}
//概率设置
interface Probability {
    [key: string]: number
}
const PB: Probability = {}
export function gachaProbability(config: Config) {
    PB['UP'] = config['UP★★★']
    PB['SSR'] = config['★★★']
    PB['SR'] = config['★★']
    PB['R'] = config['★']
}
var RPool = []
var SRPool = []
var SSRPool = []
var UPStu = []
export var path //抽卡动画路径
/*--------------------------------(分割线)----------------------------------*/
//初始化卡池
export async function gachaPool(ctx: Context, temporary) {
    const UP = temporary.server ? 'JUp' : 'IUp';
    const SERVER = temporary.server ? {} : { server: 0 };
    RPool = await ctx.database.get('student', { $and: [{ rare: 1 }, { limit: 0 }, SERVER] }, ['name']);
    SRPool = await ctx.database.get('student', { $and: [{ rare: 2 }, { limit: 0 }, SERVER] }, ['name']);
    if (await temporary.UPGacha) {
        SSRPool = await ctx.database.get('student', { $and: [{ rare: 3 }, { limit: 0 }, { [UP]: { $eq: false } }, SERVER] }, ['name']);
        UPStu = await ctx.database.get('student', { [UP]: { $eq: true } }, ['name']);
    } else {
        SSRPool = await ctx.database.get('student', { $and: [{ rare: 3 }, { limit: 0 }, SERVER] }, ['name'])
    }
    try {
        if (RPool.length == 0 || SRPool.length == 0 || SSRPool.length == 0) {
            throw ('初始化卡池失败');
        }
    } catch (error) {
        console.log(error)
    }
}
//重置卡池
function resetPool() {
    RPool = []
    SRPool = []
    SSRPool = []
    UPStu = []
}
//抽卡入口
export async function gacha(ctx: Context, args: string[], user: string, UP) {
    let cardArray = []; //临时抽卡结果
    let temporary = {
        card: "",  //临时单次结果
        pickup: false, //UP判断
        raindow: false, //出彩判断
        UPGacha: false, //UP池判断
        server: true
    }
    temporary.UPGacha = UP;
    temporary.server = args[0] === '日服' ? true : false;
    await gachaPool(ctx, temporary);
    const GACHACOUNT = args[1] === '十连' ? 10 : 1;
    const GACHAFUNCTION = args[1] === '十连' ? gacha10 : gacha1;
    const GACHAIMAGEFUNCTION = args[1] === '十连' ? gachaImageTen : gachaImageOne;
    const NSTAT = args[0] === '日服' ? 'Jstat' : 'Istat';
    const USTAT = args[0] === '日服' ? temporary.UPGacha ? 'JNUPstat' : 'JNstat' : temporary.UPGacha ? 'INUPstat' : 'INstat';
    await ctx.database.set('bauser', { userid: user }, { [NSTAT]: { $add: [{ $: NSTAT }, GACHACOUNT] } as Eval<Number>, [USTAT]: { $add: [{ $: USTAT }, GACHACOUNT] } as Eval<Number> });
    const STAT = await ctx.database.get('bauser', { userid: user });
    await GACHAFUNCTION(temporary, cardArray, ctx, user);
    let image = await GACHAIMAGEFUNCTION(temporary, cardArray, STAT[0][USTAT], RPool, SRPool);
    path = temporary.raindow ? 'node_modules/koishi-plugin-ba-plugin/lib/assets/color.gif' : 
    'node_modules/koishi-plugin-ba-plugin/lib/assets/blue.gif';
    resetPool();
    return image;
}
//单抽
async function gacha1(temporary, cardArray, ctx: Context, user) {
    cardArray.push({ name: await gachaNormal(temporary, ctx, user), pickup: temporary.pickup })
}
//十抽
async function gacha10(temporary, cardArray, ctx: Context, user) {
    for (let i = 0; i < 10; i++) {
        if (i < 9) {
            cardArray.push({ name: await gachaNormal(temporary, ctx, user), pickup: temporary.pickup })
        } else {
            cardArray.push({ name: await gachaFloor(temporary, ctx, user), pickup: temporary.pickup })
        }
    }
}
//保底
async function gachaFloor(temporary, ctx: Context, user) {
    temporary.pickup = false;
    const CARD = Random.weightedPick(PB);
    if (CARD === 'SSR' || CARD === 'UP') {//⭐⭐⭐
        temporary.raindow = true;
        const STAR = temporary.server ? 'Jstar' : 'Istar';
        await ctx.model.set('bauser', { userid: user }, { [STAR]: { $add: [{ $: STAR }, 1] } as Eval<Number> });
        if (CARD === 'UP') {
            await pickup(temporary, ctx, user)//UP判断
        } else {
            const USTAR = temporary.UPGacha ? temporary.server ? 'JUPstar' : 'IUPstar' : temporary.server ? 'JNstar' : 'INstar';
            await ctx.model.set('bauser', { userid: user }, { [USTAR]: { $add: [{ $: USTAR }, 1] } as Eval<Number> });
            temporary.card = SSRPool[Random.int(SSRPool.length)]
        }
    } else {//⭐⭐
        temporary.card = SRPool[Random.int(RPool.length)]
    }
    return temporary.card.name
}
//普通
async function gachaNormal(temporary, ctx: Context, user) {
    temporary.pickup = false;
    const CARD = Random.weightedPick(PB);
    if (CARD === 'SSR' || CARD === 'UP') {//⭐⭐⭐
        temporary.raindow = true;
        const STAR = temporary.server ? 'Jstar' : 'Istar';
        await ctx.model.set('bauser', { userid: user }, { [STAR]: { $add: [{ $: STAR }, 1] } as Eval<Number> });
        if (CARD === 'UP') {
            await pickup(temporary, ctx, user)//UP判断
        } else {
            const USTAR = temporary.UPGacha ? temporary.server ? 'JUPstar' : 'IUPstar' : temporary.server ? 'JNstar' : 'INstar';
            await ctx.model.set('bauser', { userid: user }, { [USTAR]: { $add: [{ $: USTAR }, 1] } as Eval<Number> });
            temporary.card = SSRPool[Random.int(SSRPool.length)]
        }
    } else if (CARD === 'SR') {//⭐⭐
        temporary.card = SRPool[Random.int(SRPool.length)]
    } else {//⭐
        temporary.card = RPool[Random.int(RPool.length)]
    }
    return temporary.card.name
}
//UP判断
async function pickup(temporary, ctx: Context, user) {
    if (temporary.UPGacha) {
        const UPSTAR = temporary.server ? 'JUUPstar' : 'IUUPstar';
        await ctx.model.set('bauser', { userid: user }, { [UPSTAR]: { $add: [{ $: UPSTAR }, 1] } as Eval<Number> });
        temporary.pickup = true;
        temporary.card = UPStu[0];
    } else {
        const USTAR = temporary.server ? 'JNstar' : 'INstar';
        await ctx.model.set('bauser', { userid: user }, { [USTAR]: { $add: [{ $: USTAR }, 1] } as Eval<Number> });
        temporary.card = SSRPool[Random.int(SSRPool.length)]
    }

}
//整活   
export async function gachaGroup(session, config) {
    let groupPool = await session.bot.getGuildMemberList(config.guild);
    let groupCard = groupPool[Random.int(0, groupPool.length)];
    session.send('随便抽个群友撅:\n' + h.image(groupCard.avatar) + '\n他的名字是 ' + groupCard.username);
}