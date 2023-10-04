/*抽卡实现模块*/
import { Context, Random, Schema } from 'koishi'
import { gachaImage } from './ps'
import { pathToFileURL } from 'url'
import { resolve } from 'path'

export interface GachaConfig {
    '日服默认UP角色': string
    '国际服默认UP角色': string
    '国服默认UP角色': string
    'UP★★★': number
    '★★★': number
    '★★': number
    '★': number
    group: string[]
    text: string
}
export const GachaConfig: Schema<GachaConfig> = Schema.intersect([
    Schema.object({
        group: Schema.array(String).role('table').description('抽卡模拟器黑名单群组'),
        text: Schema.string().description('黑名单群组回复内容')
    }).description('黑名单设置'),
    Schema.object({
        '日服默认UP角色': Schema.string().default("").description('默认日服UP的学生'),
        '国际服默认UP角色': Schema.string().default("").description('默认国际服UP的学生'),
        '国服默认UP角色': Schema.string().default("").description('默认国服UP的学生'),
    }).description('UP设置'),
    Schema.object({
        'UP★★★': Schema.number().min(0).default(0.7).max(100).description('UP学生的概率'),
        '★★★': Schema.number().min(0).default(2.3).max(100).description('★★★学生的概率'),
        '★★': Schema.number().min(0).default(18.5).max(100).description('★★学生的概率'),
        '★': Schema.number().min(0).default(78.5).max(100).description('★学生的概率'),
    }).description('概率设置')
]).description('抽卡模拟器设置')


//概率设置
interface Probability {
    [key: string]: number
}
export function gachaProbability(config: GachaConfig) {
    PB['UP'] = config['UP★★★']
    PB['SSR'] = config['★★★']
    PB['SR'] = config['★★']
    PB['R'] = config['★']
    lastPB['UP'] = config['UP★★★']
    lastPB['SSR'] = config['★★★']
    lastPB['SR'] = config['★★']
}
const PB: Probability = {}
const lastPB: Probability = {}
var RPool = []
var SRPool = []
var SSRPool = []
var UPStu = []
export var path //抽卡动画路径
/*--------------------------------(分割线)----------------------------------*/
//初始化卡池
export async function gachaPool(ctx: Context, args: string[], UP: boolean) {
    const poolMap = {
        '日服': { server: [2, 1, 0], serverup: 'JUP' },
        '国际服': { server: [2, 0], serverup: 'IUP' },
        '国服': { server: [2], serverup: 'CUP' },
    }
    try {
        RPool = await ctx.database.get('student', { rare: 1, limit: 0, server: poolMap[args[0]].server }, ['name']);
        SRPool = await ctx.database.get('student', { rare: 2, limit: 0, server: poolMap[args[0]].server }, ['name']);
        if (UP) {
            SSRPool = await ctx.database.get('student', { rare: 3, limit: 0, server: poolMap[args[0]].server, [poolMap[args[0]].serverup]: false }, ['name']);
            UPStu = await ctx.database.get('student', { rare: 3, server: poolMap[args[0]].server, [poolMap[args[0]].serverup]: true }, ['name']);
        } else {
            SSRPool = await ctx.database.get('student', { rare: 3, limit: 0, server: poolMap[args[0]].server }, ['name'])
        }
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
export async function gacha(ctx: Context, args: string[], session, UP: boolean) {
    let cardArray = []; //临时抽卡结果
    let gachaData = {
        card: "",  //临时单次结果
        pickup: false, //UP判断
        raindow: false, //出彩判断
        UPGacha: UP, //UP池判断
        server: args[0]//服务器判断
    }
    const gachaMap = {
        '日服': { table: 'bauserJP', Nstat: 'Jstat', Ustat: UP ? 'JUPstat' : 'JNstat', Ustar: UP ? 'JUPstar' : 'JNstar', UPstar: UP ? 'JUUPstar' : "" },
        '国际服': { table: 'bauserIN', Nstat: 'Istat', Ustat: UP ? 'IUPstat' : 'INstat', Ustar: UP ? 'IUPstar' : 'INstar', UPstar: UP ? 'IUUPstar' : "" },
        '国服': { table: 'bauserCN', Nstat: 'Cstat', Ustat: UP ? 'CUPstat' : 'CNstat', Ustar: UP ? 'CUPstar' : 'CNstar', UPstar: UP ? 'CUUPstar' : "" }
    }
    const user = session.userId;
    await gachaPool(ctx, args, UP);
    const gachaCount = args[1] === '十连' ? 10 : 1;
    const stat = await ctx.database.get(gachaMap[args[0]].table, { userid: session.userId });
    await ctx.database.set(gachaMap[args[0]].table, { userid: user }, {[gachaMap[args[0]].Nstat]: { $add: [{ $: gachaMap[args[0]].Nstat  }, gachaCount] },[gachaMap[args[0]].Ustat]: { $add: [{ $: gachaMap[args[0]].Ustat }, gachaCount] }});

    await baGacha(gachaData, cardArray, ctx, user, gachaCount, args, gachaMap);

    const IMG = await gachaImage.result(ctx,cardArray, stat[0][gachaMap[args[0]].Ustat], RPool, SRPool);
 

    resetPool();//重置卡池

    path = gachaData.raindow
        ? pathToFileURL(resolve(__dirname, '../assets/color.gif')).href
        : pathToFileURL(resolve(__dirname, '../assets/blue.gif')).href;
    
    return IMG
}
//抽卡启动时
async function baGacha(gachaData, cardArray: any[], ctx: Context, user, gachaCount, args: string[], gachaMap) {
    for (let i = 0; i < gachaCount; i++) {
        cardArray.push(
            { name: await gachaNormal(i, gachaData, ctx, user, args, gachaMap), pickup: gachaData.pickup }
        )
        
    }
}
//抽卡进行时
async function gachaNormal(i, gachaData, ctx: Context, user, args: string[], gachaMap) {
    gachaData.pickup = false;
    const cardtemp = Random.weightedPick(PB);
    const star = args[0] === '日服' ? 'Jstar' : args[0] === '国际服' ? 'Istar' : 'Cstar';
    const gachaProcess = async (type, getSSR) => {
        gachaData.raindow = true;
        await ctx.database.set(gachaMap[args[0]].table, { userid: user }, { [star]: { $add: [{ $: star }, 1] } });
        if (type === 'UP') {
            await pickup(gachaData, ctx, user, args, gachaMap)//UP判断
        } else {
            await ctx.database.set(gachaMap[args[0]].table, { userid: user }, { [gachaMap[args[0]].Ustar]: { $add: [{ $: gachaMap[args[0]].Ustar }, 1] } });
            gachaData.card = getSSR()
        }
    }
    if (cardtemp === 'SSR' || cardtemp === 'UP') {//⭐⭐⭐
        await gachaProcess(cardtemp, () => SSRPool[Random.int(SSRPool.length)]);
    } else if (cardtemp === 'SR') {//⭐⭐
        gachaData.card = SRPool[Random.int(SRPool.length)]
    } else { //⭐
        if (i == 9) {
            const lastCard = Random.weightedPick(lastPB)
            if (cardtemp === 'SSR' || cardtemp === 'UP') {
                await gachaProcess(lastCard, () => SSRPool[Random.int(SSRPool.length)]);
            } else if (cardtemp === 'SR') {//⭐⭐
                gachaData.card = SRPool[Random.int(SRPool.length)]
            } else {
                gachaData.card = RPool[Random.int(RPool.length)]
            }
        }
    }
    return gachaData.card.name
}
//UP判断
async function pickup(gachaData, ctx: Context, user, args, gachaMap) {
    if (gachaData.UPGacha) {
        await ctx.database.set(gachaMap[args[0]].table, { userid: user }, { [gachaMap[args[0]].UPstar]: { $add: [{ $: gachaMap[args[0]].UPstar }, 1] }  });
         gachaData.pickup = true;
        gachaData.card = UPStu[0];
    } else {
        await ctx.database.set(gachaMap[args[0]].table, { userid: user }, { [gachaMap[args[0]].Ustar]: { $add: [{ $: gachaMap[args[0]].Ustar }, 1] } });
        gachaData.card = SSRPool[Random.int(SSRPool.length)]
    }

}