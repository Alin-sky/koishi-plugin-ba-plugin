/*抽卡实现模块*/
/*可能实现功能 UP池独立设置 */
import { Context, Eval, Random, Schema } from 'koishi'
import { gachaImage } from './ps'
export interface gachaConfig {
    '日服默认UP角色': string
    '国际服默认UP角色': string
    'UP★★★': number
    '★★★': number
    '★★': number
    '★': number
}
export const gachaConfig: Schema<gachaConfig> = Schema.intersect([
    Schema.object({
        '日服默认UP角色': Schema.string().default("").description('默认日服UP的学生'),
        '国际服默认UP角色': Schema.string().default("").description('默认日服UP的学生'),
    }).description('卡池设置'),
    Schema.object({
        'UP★★★': Schema.number().min(0).default(0.7).max(100).description('UP学生的概率'),
        '★★★': Schema.number().min(0).default(2.3).max(100).description('★★★学生的概率'),
        '★★': Schema.number().min(0).default(18.5).max(100).description('★★学生的概率'),
        '★': Schema.number().min(0).default(78.5).max(100).description('★学生的概率'),
    }).description('卡池概率设置(双服通用))')]
)
//概率设置
interface Probability {
    [key: string]: number
}
const PB: Probability = {}
export function gachaProbability(config: gachaConfig) {
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
        server: true,//服务器判断
    }
    temporary.UPGacha = UP;
    temporary.server = args[0] === '日服' ? true : false;
    await gachaPool(ctx, temporary);
    const GACHACOUNT = args[1] === '十连' ? 10 : 1;
    const STAT = await ctx.database.get('bauser', { userid: user });
    const NSTAT = args[0] === '日服' ? 'Jstat' : 'Istat';
    const USTAT = args[0] === '日服' ? temporary.UPGacha ? 'JUPstat' : 'JNstat' : temporary.UPGacha ? 'IUPstat' : 'INstat';
    await ctx.database.set('bauser', { userid: user }, { [NSTAT]: { $add: [{ $: NSTAT }, GACHACOUNT] } as Eval<Number>, [USTAT]: { $add: [{ $: USTAT }, GACHACOUNT] } as Eval<Number> });
    await baGacha(temporary, cardArray, ctx, user, GACHACOUNT);
    let image = await gachaImage.result(cardArray, STAT[0][USTAT], RPool, SRPool);
    resetPool();//重置卡池
    path = temporary.raindow ? 'external/bagacha/assets/color.gif' : 'external/bagacha/assets/blue.gif';
    return image
}
//抽卡启动时
async function baGacha(temporary, cardArray, ctx: Context, user, GACHACOUNT) {
    for (let i = 0; i < GACHACOUNT; i++) {
        cardArray.push({ name: await gachaNormal(i, temporary, ctx, user), pickup: temporary.pickup })
    }
}
//抽卡进行时
async function gachaNormal(i, temporary, ctx: Context, user) {
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
    } else { //⭐
        if (i == 9) {
            temporary.card = SRPool[Random.int(SRPool.length)]
        } else {
            temporary.card = RPool[Random.int(RPool.length)]
        }
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