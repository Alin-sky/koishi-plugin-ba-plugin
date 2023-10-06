/*BA插件模块 */
import { Context, Keys, Tables, h, } from 'koishi'
import { gacha, gachaProbability, path } from '../gacha/gacha'
import { DB } from '../gacha/database'
import { Config } from '..'

export const gachaplugin = ({
    apply(ctx: Context, config: Config) {
        ctx.on('ready', async () => {
            gachaProbability(config.GachaGuild.抽卡模拟器)
            await DB.stuTable(ctx)
            await DB.stuUpdate(ctx)
            await DB.BAUserTable(ctx)
        })
//功能为删除旧抽卡模拟器统计表，暂且保留
/*         ctx.on('bot-connect', async () => {
            let stat = ctx.model.tables
            if ('bauser' in stat) {
                await ctx.database.drop('bauser' as Keys<Tables, any>);
            }
        }) */
        ctx.on('command/before-execute',
            ({ session }) => {
                if (config.GachaGuild.抽卡模拟器.group.some(guildId => guildId === session.guildId)) {
                    if (session.content.startsWith('ba')) {
                        return config.GachaGuild.抽卡模拟器.text
                    }
                }
            }
        )
        ctx.command("ba", '抽卡模拟器').example("ba 日服 十连").option('pickup', ' <up>池子选择', { fallback: 'pt' })
            .shortcut('up', { options: { pickup: 'up' }, fuzzy: true })
            .shortcut('UP', { options: { pickup: 'up' }, fuzzy: true })
            .usage('使用说明：\nba：调用普池.\tup：调用UP池.\n参数列表：\n参数1：国际服/日服/国服.\n参数2：十连/单抽\n更多说明请使用子指令. -h')
            .action(async ({ session, options }, ...args) => {
                const FIRST_ERROR_MESSAGE = "输入的参数个数不对";
                const SECOND_ERROR_MESSAGE = '没选对服';
                const THIRD_ERROR_MESSAGE = '抽卡参数错误';
                const FOURTH_ERROR_MESSAGE = '当前未设置对应UP学生，暂时关闭对应UP池';
                await DB.setbauser(ctx, session, args)
                if (args.length == 0) {
                    return
                }
                if (args.length !== 2) {
                    return FIRST_ERROR_MESSAGE
                }

                if (args[0] !== '日服' && args[0] !== '国际服' && args[0] !== '国服') {
                    return SECOND_ERROR_MESSAGE
                }
                if ((args[1] !== '十连') && (args[1] !== '单抽')) {
                    return THIRD_ERROR_MESSAGE
                }
                let UP
                if (options.pickup == 'up') {
                    const NUP = args[0] === '日服' ? 'JUP' : args[0] === '国际服' ? 'IUP' : 'CUP';
                    let student = await ctx.database.get('student', { [NUP]: { $eq: true } }, ['name']);
                    if (student.length < 1) {
                        return FOURTH_ERROR_MESSAGE
                    }
                    UP = true;
                } else {
                    UP = false;
                }
                const Message = await session.send('抽卡中...')
                let result = await gacha(ctx, args, session, UP);

                setTimeout(() => { session.bot.deleteMessage(session.channelId, Message[0]) }, config.alin.time)
                session.send(h('message', [session.author.username + '的抽卡结果：\n',
                h.image(path), h.image(result.get('buffer'), 'image/png')]));
            })
        ctx.command('ba.set', '模拟器学生管理').example('ba.set 日服 梓').option('queryA', '<queryA> UP学生设置和获取当前UP').option('queryB', '<queryB> 学生管理', { authority: 3 })
            .shortcut('up学生获取', { options: { queryA: 'get' }, fuzzy: true })
            .shortcut('UP学生获取', { options: { queryA: 'get' }, fuzzy: true })
            .shortcut('学生添加', { options: { queryB: 'add' }, fuzzy: true })
            .shortcut('学生删除', { options: { queryB: 'remove' }, fuzzy: true })
            .alias('UP学生设置').usage('说明：学生管理，默认指令为设置UP池学生.\n快捷指令：' +
                '\nup学生获取--获取当前UP学生(参数列表：服务器 )' +
                '\nUP学生设置--设置当前UP学生(参数列表：服务器 学生名)' +
                '\n学生添加--添加学生到数据库(需权限)(参数列表:学生名 稀有度 限定值 服务器)' +
                '\n学生删除--从数据库删除学生(需权限)(参数列表:学生名)')
            .action(async ({ session, options }, ...args) => {
                if (args.length == 0) {
                    return
                }
                if (options.queryA == 'get') {
                    return await DB.getUP(ctx, args, session);
                } else if (options.queryB == 'add') {
                    return await DB.addStu(ctx, args);
                } else if (options.queryB == 'remove') {
                    return await DB.delStu(ctx, args);
                } else {
                    return await DB.setUP(ctx, args, config);
                }
            })
        ctx.command('ba.stat', '统计抽卡记录').example('ba.stat 日服').alias('抽卡记录').usage('模拟器指令均实现了无参数无响应.\n参数列表：服务器')
            .action(async ({ session }, ...args) => {
                if (args.length == 0) {
                    return
                }
                await DB.baStat(ctx, session, args);
            })
        ctx.command('清除抽卡数据库', '清除数据库', { hidden: true, authority: 3 })
            .action(async ({ session }) => {
                await DB.clearTable(ctx)
                session.send('已删除学生表')
            })
        ctx.command('ba.show', '展示当前卡池所有角色').alias('ba.卡池查询').alias('卡池查询').usage('参数列表：服务器').example('卡池查询 日服')
            .action(async ({ session }, ...args) => {
                if (args.length == 0) {
                    return
                }
                if (args[0] !== '日服' && args[0] !== '国际服' && args[0] !== '国服') {
                    return '请输入目标服务器'
                }
                let result = await DB.showStu(ctx, args)
                session.send(h('message', ['目前' + args[0] + '卡池实装3星：\n', h.image(result[0].get('buffer'), 'image/png')]));
            })
    }
})
