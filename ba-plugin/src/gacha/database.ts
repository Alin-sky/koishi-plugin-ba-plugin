/*数据库操作模块*/
import fs from 'fs'
import { Context } from 'koishi'
import { Config } from '..'
import { StudentPool, macthmainpage, macthnextpage } from './data'
import path from 'path'
import { alincloud } from '../ba-alin'
import { createCanvas, loadImage } from 'canvas'
import { error } from 'console'
declare module 'koishi' {
    interface Tables {
        student: Student
        bauserIN: bauserIN
        bauserJP: bauserJP
        bauserCN: bauserCN
    }
}
export interface Student {
    name: string;
    rare: number;
    IUP: boolean;
    JUP: boolean;
    CUP: boolean;
    url: string;
    id: number;
    limit: number;//限定 0普通 1活动 2限定
    server: number;//实装 0国际服 1日服 2国服
}
export interface bauserIN {
    name: string
    userid: string
    Istat: number       //国际总抽卡次数
    INstat: number      //国际普通池次数
    IUPstat: number    //国际UP池次数
    Istar: number       //国际累计获得⭐⭐⭐
    INstar: number      //国际普通池⭐⭐⭐
    IUPstar: number     //国际UP池⭐⭐⭐
    IUUPstar: number    //国际UP池UP⭐⭐⭐

}
export interface bauserJP {
    name: string
    userid: string
    Jstat: number
    JNstat: number
    JUPstat: number
    Jstar: number
    JNstar: number
    JUPstar: number
    JUUPstar: number
}
export interface bauserCN {
    name: string
    userid: string
    Cstat: number
    CNstat: number
    CUPstat: number
    Cstar: number
    CNstar: number
    CUPstar: number
    CUUPstar: number
}
export module DB {
    //初始化学生表
    export async function stuTable(ctx: Context) {
        if (ctx.model.tables.student == undefined) {
            ctx.model.extend('student', {
                name: { type: 'string' },
                rare: { type: 'integer' },
                IUP: { type: 'boolean', initial: false },
                JUP: { type: 'boolean', initial: false },
                CUP: { type: 'boolean', initial: false },
                url: { type: 'string' },
                id: { type: 'integer' },
                limit: { type: 'integer', initial: 0 },
                server: { type: 'integer', initial: 0 }
            }, {
                unique: ['name'],
                primary: 'id',
                autoInc: true
            });
        }
    }
    //更新学生表
    export async function stuUpdate(ctx: Context) {
        let connected = false;
        while (!connected) {
            if (ctx.database == null) {
                await new Promise((resolve) => setTimeout(resolve, 500)); // 等待1秒钟
            } else {
                console.log('开始更新学生数据表');
                connected = true;
                const mainPage = 'https://ba.gamekee.com';
                let result = await ctx.http.get(mainPage);
                let errors = 0;
                for (let stu of StudentPool) {
                    const STUDENT = await ctx.database.get('student', { name: stu.name });
                    if (STUDENT.length==0||STUDENT[0].url == '' || STUDENT[0].url == null) {
                        let nextUrl = mainPage + macthmainpage(result, stu.name);
                        let retries = 0;
                        const MAX_RETRIES = 3;
                        while (retries < MAX_RETRIES) {
                            try {
                                let nextResult = await ctx.http.get(nextUrl);
                                console.log(nextUrl);
                                let lastUrl = macthnextpage(nextResult);
                                if (lastUrl !== '') {
                                    await ctx.database.create('student', { name: stu.name, rare: stu.rare, limit: stu.limit, server: stu.server, url: lastUrl });
                                }
                                break;
                            } catch (error) {
                                console.error(`从(${nextUrl})获取连接出错.`);
                                retries++;
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                if (retries == MAX_RETRIES) {
                                    console.error(`重试${MAX_RETRIES}次后依旧获取不到(${nextUrl}),预计结果为空`);
                                    errors++;
                                }
                            }
                        }

                    }
                }
               console.log(`学生数据表更新完毕,共有${errors}个学生的链接获取失败.`);
            }
        }
    }
    //抽卡统计表
    export async function BAUserTable(ctx: Context) {
        ctx.model.extend('bauserIN', {
            name: 'string', userid: 'string',
            Istat: { type: 'integer', initial: 0 },
            INstat: { type: 'integer', initial: 0 },
            IUPstat: { type: 'integer', initial: 0 },
            Istar: { type: 'integer', initial: 0 },
            INstar: { type: 'integer', initial: 0 },
            IUPstar: { type: 'integer', initial: 0 },
            IUUPstar: { type: 'integer', initial: 0 },

        }, {
            primary: 'userid',
            unique: ['userid'],
            autoInc: false
        })
        ctx.model.extend('bauserJP', {
            name: 'string', userid: 'string',
            Jstat: { type: 'integer', initial: 0 },
            JNstat: { type: 'integer', initial: 0 },
            JUPstat: { type: 'integer', initial: 0 },
            Jstar: { type: 'integer', initial: 0 },
            JNstar: { type: 'integer', initial: 0 },
            JUPstar: { type: 'integer', initial: 0 },
            JUUPstar: { type: 'integer', initial: 0 }
        }, {
            primary: 'userid',
            unique: ['userid'],
            autoInc: false
        })
        ctx.model.extend('bauserCN', {
            name: 'string', userid: 'string',
            Cstat: { type: 'integer', initial: 0 },
            CNstat: { type: 'integer', initial: 0 },
            CUPstat: { type: 'integer', initial: 0 },
            Cstar: { type: 'integer', initial: 0 },
            CNstar: { type: 'integer', initial: 0 },
            CUPstar: { type: 'integer', initial: 0 },
            CUUPstar: { type: 'integer', initial: 0 }
        }, {
            primary: 'userid',
            unique: ['userid'],
            autoInc: false
        })
    }
    //设置UP
    export async function setUP(ctx: Context, args: any[], config: Config) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.'
        const NOTSERVER_ERROR_MESSAGE = '请输入正确的服名.'
        const SAME_ERROR_MESSAGE = '检测到与当前UP学生名字相同,UP不变'
        const NOTFOUND_ERROR_MESSAGE = '找不到该学生,UP不变'
        const NOTSSR_ERROR_MESSAGE = '此学生非⭐⭐⭐学生,UP不变'
        const SERVER_ERROR_MESSAGE = '当前学生在国际服未实装,UP不变'
        const SERVER_ERROR2_MESSAGE = '当前学生在国服未实装,UP不变'
        const SERVERMAP = {
            '日服': { SERVER: '日服', DUP: '日服默认UP角色', SUP: 'JUP', SUUP: 'JUUP', SERVERN: 1 },
            '国际服': { SERVER: '国际服', DUP: '国际服默认UP角色', SUP: 'IUP', SUUP: 'IUUP', SERVERN: 0 },
            '国服': { SERVER: '国服', DUP: '国服默认UP角色', SUP: 'CUP', SUUP: 'CUUP', SERVERN: 2 },
        };
        if (args.length !== 2) {
            return LENGTH_ERROR_MESSAGE
        }
        if (args[0] !== '日服' && args[0] !== '国际服' && args[0] !== '国服') {
            return NOTSERVER_ERROR_MESSAGE
        }
        if (args[1] === '重置') {
            await ctx.database.set('student', {}, { [SERVERMAP[args[0]]['SUP']]: false });
            await defaultUP(config, ctx, SERVERMAP[args[0]]['DUP'], SERVERMAP[args[0]]['SUP']);
            return ('已重置' + SERVERMAP[args[0]]['SERVER'] + 'UP学生为默认UP:' + config[SERVERMAP[args[0]]['DUP']]);
        }
        let oldUP = await ctx.database.get('student', { [SERVERMAP[args[0]]['SUP']]: { $eq: true } }, ['name']);
        let newUP = await ctx.database.get('student', { name: [args[1]] })
        if (newUP.length < 1) {
            return NOTFOUND_ERROR_MESSAGE
        }
        if (newUP[0].rare !== 3) {
            return NOTSSR_ERROR_MESSAGE
        }
        if (args[0] === '国际服' && newUP[0].server === 1) {
            return SERVER_ERROR_MESSAGE
        }
        if (args[0] === '国服' && newUP[0].server !== 2) {
            return SERVER_ERROR2_MESSAGE
        }
        if (oldUP.length == 0 || oldUP[0].name !== newUP[0].name) {
            up()
            return ('已设置' + SERVERMAP[args[0]]['SERVER'] + 'Up学生为:' + newUP[0].name);
        } else {
            return SAME_ERROR_MESSAGE
        }
        async function up() {
            await ctx.database.set('student', {}, { [SERVERMAP[args[0]]['SUP']]: false });
            await ctx.database.set('student', { name: [args[1]] }, { [SERVERMAP[args[0]]['SUP']]: true });
            const TABLE = await args[0] === '日服' ? 'bauserJP' : args[0] === '国际服' ? 'bauserIN' : 'bauserCN'
            await ctx.database.set(TABLE, {}, { [SERVERMAP[args[0]]['SUP'] + 'star']: 0, [SERVERMAP[args[0]]['SUUP'] + 'star']: 0, [SERVERMAP[args[0]]['SUP'] + 'stat']: 0 });
        }
        async function defaultUP(config: Config, ctx: Context, DUP, SUP) {
            let UPStuname = config[DUP];
            await ctx.database.set('student', { name: [UPStuname] }, { [SUP]: true });
        }
    }
    //获取当前UP
    export async function getUP(ctx: Context, args: any[], session) {
        const UP = args[0] === '日服' ? 'JUP' : args[0] === '国际服' ? 'IUP' : 'CUP'
        const nowUP = await ctx.database.get('student', { [UP]: { $eq: true } }, ['name']);
        if (nowUP.length !== 0) {
            session.send(`${args[0]}当前UP角色是: ${nowUP[0].name}`);
        } else {
            session.send(`当前${args[0]}无UP角色.`);
        }

    }
    //添加学生
    export async function addStu(ctx: Context, args: any[]) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.'
        if (args.length !== 4) {
            return LENGTH_ERROR_MESSAGE
        }
        try {
            const PARAMETER_ERROR_MESSAGE = '稀有度等参数值不对'
            const SAME_ERROR_MESSAGE = '学生已存在'
            let regex = /^[1-3]+$/;
            let regex2 = /^[0-2]+$/;
            let regex3 = /^[0-2]+$/;
            if (!regex.test(args[1]) || !regex2.test(args[2]) || !regex3.test(args[3])) {
                throw PARAMETER_ERROR_MESSAGE
            }
            if ((await ctx.database.get('student', { name: args[0] })).length > 0) {
                throw SAME_ERROR_MESSAGE
            }
            await ctx.database.create('student', { name: args[0], rare: args[1], limit: args[2], server: args[3] });
            return ('成功添加新学生：' + args[0] + '\n稀有度为：' + args[1] + '⭐');
        } catch (error) {
            return (error);
        }
    }
    //删除学生
    export async function delStu(ctx: Context, args: any[]) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.'
        if (args.length > 1) {
            return LENGTH_ERROR_MESSAGE
        } else {
            await ctx.database.remove('student', { name: [args[0]] });
            return ('已清空名为：' + args[0] + ' 的学生档案');
        }
    }
    //获取抽卡统计数据
    export async function baStat(ctx: Context, session, args) {
        let data = {
            dataCN: await ctx.database.get('bauserCN', { userid: session.userId }),
            dataIN: await ctx.database.get('bauserIN', { userid: session.userId }),
            dataJP: await ctx.database.get('bauserJP', { userid: session.userId })
        }
        if (data.dataCN.length == 0) {
            await ctx.model.create('bauserCN', { name: session.author.username, userid: session.userId });
            data.dataCN = await ctx.database.get('bauserCN', { userid: session.userId });
        }
        if (data.dataIN.length == 0) {
            await ctx.model.create('bauserIN', { name: session.author.username, userid: session.userId });
            data.dataIN = await ctx.database.get('bauserIN', { userid: session.userId });
        }
        if (data.dataJP.length == 0) {
            await ctx.model.create('bauserJP', { name: session.author.username, userid: session.userId });
            data.dataJP = await ctx.database.get('bauserJP', { userid: session.userId });
        }
        let text = '用户:' + session.author.username + '模拟器抽卡记录' +
            '\n日服\n卡池抽卡次数:' + data.dataJP[0].Jstat + '\nUP池抽卡次数:' + data.dataJP[0].JUPstat + '\n普池抽卡次数:' + data.dataJP[0].JNstat +
            '\n累计获得⭐⭐⭐学生：' + data.dataJP[0].Jstar + '\n获得UP⭐⭐⭐学生：' + data.dataJP[0].JUUPstar + '\nUP池获得⭐⭐⭐学生：' + data.dataJP[0].JUPstar + '\n普池获得⭐⭐⭐学生：' + data.dataJP[0].JNstar +
            '\n国际服\n卡池抽卡次数:' + data.dataIN[0].Istat + '\nUP池抽卡次数:' + data.dataIN[0].IUPstat + '\n普池抽卡次数:' + data.dataIN[0].INstat +
            '\n累计获得⭐⭐⭐学生：' + data.dataIN[0].Istar + '\n获得UP⭐⭐⭐学生：' + data.dataIN[0].IUUPstar + '\nUP池获得⭐⭐⭐学生：' + data.dataIN[0].IUPstar + '\n普池获得⭐⭐⭐学生：' + data.dataIN[0].INstar +
            '\n国服\n卡池抽卡次数:' + data.dataCN[0].Cstat + '\nUP池抽卡次数:' + data.dataCN[0].CUPstat + '\n普池抽卡次数:' + data.dataCN[0].CNstat +
            '\n累计获得⭐⭐⭐学生：' + data.dataCN[0].Cstar + '\n获得UP⭐⭐⭐学生：' + data.dataCN[0].CUUPstar + '\nUP池获得⭐⭐⭐学生：' + data.dataCN[0].CUPstar + '\n普池获得⭐⭐⭐学生：' + data.dataCN[0].CNstar
        await session.send(text)
    }
    //初始化用户数据
    export async function setbauser(ctx: Context, session, args) {
        const TABLE = args[0] === '日服' ? 'bauserJP' : args[0] === '国际服' ? 'bauserIN' : 'bauserCN'
        try {
            const NOTFOUND_ERROR_MESSAGE = `未检测到用户${args[0]}数据`
            let temp = await ctx.database.get(TABLE, { userid: session.userId }, ['name']);
            if (temp.length < 1) {
                throw NOTFOUND_ERROR_MESSAGE
            }
        } catch (error) {
            await ctx.model.create(TABLE, { name: session.author.username, userid: session.userId });
            await session.send(error + '执行用户初始化');
        }
    }
    //重置表
    export async function clearTable(ctx: Context) {

         await ctx.database.drop('student');
    }
    //展示目前卡池
    export async function showStu(ctx: Context, args) {
        let cardpool = []
        let ServerMap = {
            '日服': { Server: await ctx.database.get('student', { server: [0, 1, 2], rare: 3 }, ['name', 'url']), name: 'JP' },
            '国际服': { Server: await ctx.database.get('student', { server: [0, 2], rare: 3 }, ['name', 'url']), name: 'IN' },
            '国服': { Server: await ctx.database.get('student', { server: [2], rare: 3 }, ['name', 'url']), name: 'CN' },
        }
        cardpool.push(await maker(ServerMap[args[0]].Server, ServerMap[args[0]].name))
        async function maker(server, name) {
            const SIZE = 150
            const COLS = 15
            const ROWS = Math.floor(server.length / COLS)
            const tempImagePath = path.resolve(__dirname, '../../assets/temp/' + name + '.png')//当前卡池图
            if (fs.existsSync(tempImagePath)) {
                let temp = await loadImage(tempImagePath);
                const canvas = createCanvas(temp.width, temp.height);
                const context = canvas.getContext('2d');
                context.drawImage(temp, 0, 0);
                let isEmpty = false
                // 判断是否最新卡池图
                const imageData = context.getImageData(((server.length - 1) % COLS) * SIZE, (ROWS * SIZE), SIZE, SIZE);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] !== 0) {
                        isEmpty = true
                        break
                    }
                }
                if (isEmpty) {
                    const dataUrl = canvas.toDataURL('image/png');
                    return new Map().set('buffer', dataUrl.split(',')[1]);
                } else {
                    return maker2(server, COLS, ROWS, SIZE, name);
                }
            } else {
                return maker2(server, COLS, ROWS, SIZE, name)
            }
        }
        async function maker2(server, COLS, ROWS, SIZE, name) {
            const BATCH_SIZE = 15
            const MAX_RETRIES = 3
            const RETRY_DELAY = 1000
            const canvas = createCanvas(COLS * SIZE, (ROWS + 1) * SIZE)
            const context = canvas.getContext('2d');
            let x = 0
            let y = 0
            for (let i = 0; i < server.length; i += BATCH_SIZE) {
                const batch = server.slice(i, i + BATCH_SIZE)
                for (const cardtemp of batch) {
                    let imageUrl
                    if (cardtemp.url == null) {
                        imageUrl = alincloud + 'stuimg' + '/assets/Student/' + cardtemp.name + '.png'
                    } else {
                        imageUrl = 'https:' + cardtemp.url
                    }
                    let retries = 0
                    while (retries < MAX_RETRIES) {
                        try {
                            const image = await loadImage(imageUrl);
                            context.drawImage(image, x, y, SIZE, SIZE);
                            x += SIZE;
                            if (x >= COLS * SIZE) {
                                x = 0;
                                y += SIZE;
                            }
                            break
                        }
                        catch (error) {
                            console.error(`获取图片出错: (${imageUrl})`, error);
                            retries++;
                            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
                        }
                    }
                    if (retries == MAX_RETRIES) {
                        throw new Error(`重试${MAX_RETRIES}次后依旧获取不到(${imageUrl})`);
                    }
                }
            }
            const save = fs.createWriteStream(path.resolve(__dirname, `../../assets/temp/${name}.png`));
            const stream = canvas.createPNGStream();
            stream.pipe(save);
            return new Promise((resolve) => {
                save.on('finish', () => {
                    const bufferData = canvas.toBuffer('image/png').toString('base64');
                    const resultMap = new Map().set('buffer', bufferData);
                    resolve(resultMap);
                });
            });
        }
        return cardpool
    }
}
