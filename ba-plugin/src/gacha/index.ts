/*BA插件入口 */
import { Command, Context, h } from 'koishi'
import { gacha, gachaProbability, path } from '../gacha/gacha'
import { DB } from '../gacha/database'
import { pathToFileURL } from 'url'
import { Config } from '..'
declare module '../index' {
    interface Config {
        '日服默认UP角色': string,
        '国际服默认UP角色': string,
        '整活用群号': string
    }
}
export interface gachaConfig extends Config { }
export const gachaplugin = ({
    apply(ctx: Context, config: Config) {
        ctx.on('ready', async () => {
            gachaProbability(config);
            DB.stuTable(ctx)
            DB.stuUpdate(ctx)
            DB.BAUserTable(ctx)
        })
        ctx.command("ba", '抽卡模拟器').example("ba 日服 十连")
            .usage('使用说明：\n主指令默认调用普池,子指令ba.UP调用UP池.\n使用子指令 -h获取子指令详细说明')
            .action(async ({ session }, ...args) => {
                if(args.length==0){
                    return '使用help获得帮助'
                }
                await DB.setbauser(ctx, session);
                const FIRST_ERROR_MESSAGE = "抽卡模拟器普池\n示例：\nba 日服 十连\nba 国际服 单抽";
                const SECOND_ERROR_MESSAGE = "输入的参数个数不对";
                const THIRD_ERROR_MESSAGE = '没选对服';
                const FOURTH_ERROR_MESSAGE = '抽卡参数错误';
                if (args[0] == null) {
                    return FIRST_ERROR_MESSAGE
                }
                if (args.length !== 2) {
                    return SECOND_ERROR_MESSAGE
                }
                if (args[0] !== '日服' && args[0] !== '国际服') {
                    return THIRD_ERROR_MESSAGE
                }
                if ((args[1] !== '十连') && (args[1] !== '单抽')) {
                    return FOURTH_ERROR_MESSAGE
                }
                session.send('抽卡中...')
                let UP = false;
                let user = session.userId;
                let result = await gacha(ctx, args, user, UP)
                
                session.send(h('message', [session.author.username + '的抽卡结果：\n', h.image(pathToFileURL(path).href), h.image(result.get('buffer3'), 'image/png')]))
            })
        ctx.command('ba.up', 'UP池抽卡').example('ba.up 日服 单抽')
            .usage('说明：用于执行UP池抽取')
            .action(async ({ session }, ...args) => {
                if(args.length==0){
                    return '使用help获得帮助'
                }
                await DB.setbauser(ctx, session);
                const FIRST_ERROR_MESSAGE = "抽卡模拟器UP池\n示例：\nba.up 日服 十连\nba.up 国际服 单抽";
                const SECOND_ERROR_MESSAGE = "输入的参数个数不对";
                const THIRD_ERROR_MESSAGE = '没选对服';
                const FOURTH_ERROR_MESSAGE = '抽卡参数错误';
                const FIFTH_ERROR_MESSAGE = '当前未设置对应UP学生，暂时关闭对应UP池';
                const NUP = args[0] == '日服' ? 'JUP' : 'IUP';
                let student = await ctx.database.get('student', { [NUP]: { $eq: true } }, ['name']);
                console.log(student)
                if (args[0] == null) {
                    return FIRST_ERROR_MESSAGE
                }
                if (args.length !== 2) {
                    return SECOND_ERROR_MESSAGE
                }
                if (args[0] !== '日服' && args[0] !== '国际服') {
                    return THIRD_ERROR_MESSAGE
                }
                if ((args[1] !== '十连') && (args[1] !== '单抽')) {
                    return FOURTH_ERROR_MESSAGE
                }
                if (student.length < 1) {
                    return FIFTH_ERROR_MESSAGE
                }
                const UP = true;
                let user = session.userId;
                let result = await gacha(ctx, args, user, UP);
                session.send(h('message', [session.author.username + '的抽卡结果：\n', h.image(pathToFileURL(path).href), h.image(result.get('buffer3'), 'image/png')]));
            })
        ctx.command('ba.setup', '设置UP学生').example('ba.setup 日服 梓')
            .usage('说明：设置池UP学生\n参数：日服/国际服 名字')
            .action(async ({ }, ...args) => {
                if(args.length==0){
                    return '使用help获得帮助'
                }
                return await DB.setUP(ctx, args, config);
            })
        ctx.command('ba.getup', '获取当前UP学生').example('ba.getup')
            .action(async ({ session }, ...args) => {
                return await DB.getUP(ctx, args, session);
            })
        ctx.command('ba.addstu', '添加新学生').example('ba.addstu 梓 3 2 1')
            .usage('说明：添加新学生到数据库\n参数列表：\n名字：任意 稀有度：1-3(⭐) 限定：0/1/2(常/活/限) 服务器：0/1(日/国际)')
            .action(async ({ }, ...args) => {
                if(args.length==0){
                    return '使用help获得帮助'
                }
                return await DB.addStu(ctx, args);
            })
        ctx.command('ba.delstu', '删除学生').example('ba.delstu 梓')
            .action(async ({ }, ...args) => {
                if(args.length==0){
                    return '使用help获得帮助'
                }
                return await DB.delStu(ctx, args);
            })
        ctx.command('ba.stat', '统计抽卡记录').example('ba.stat')
            .action(async ({ session }, ...args) => {
                await DB.setbauser(ctx, session);
                if (args.length > 0) {
                    return '保留实现'
                }
                let user = session.userId;
                let data = await DB.bastat(ctx, user);
                session.send('用户:' + session.author.username +
                    '\n日服卡池抽卡次数:' + data[0].Jstat + '\n日服UP池抽卡次数:' + data[0].JNUPstat + '\n日服普池抽卡次数:' + data[0].JNstat +
                    '\n累计获得⭐⭐⭐学生：' + data[0].Jstar + '\n获得UP⭐⭐⭐学生：' + data[0].JUUPstar + '\nUP池获得⭐⭐⭐学生：' + data[0].JUPstar + '\n普池获得⭐⭐⭐学生：' + data[0].JNstar +
                    '\n国际服卡池抽卡次数:' + data[0].Istat + '\n国际服UP池抽卡次数:' + data[0].INUPstat + '\n国际服普池抽卡次数:' + data[0].INstat +
                    '\n累计获得⭐⭐⭐学生：' + data[0].Istar + '\n获得UP⭐⭐⭐学生：' + data[0].IUUPstar + '\nUP池获得⭐⭐⭐学生：' + data[0].IUPstar + '\n普池获得⭐⭐⭐学生：' + data[0].INstar
                )
            })
    }
})