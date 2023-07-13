"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
/*数据库操作模块*/
const fs_1 = __importDefault(require("fs"));
const data_1 = require("./data");
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const ba_alin_1 = require("../ba-alin");
var DB;
(function (DB) {
    //初始化学生表
    async function stuTable(ctx) {
        ctx.model.extend('student', { name: 'string', rare: 'integer', IUP: { type: 'boolean', initial: false }, JUP: { type: 'boolean', initial: false }, url: { type: 'string', initial: 'null' }, id: 'integer', limit: { type: 'integer', initial: 0 }, server: { type: 'integer', initial: 0 } }, { unique: ['name'] });
    }
    DB.stuTable = stuTable;
    //更新学生表
    async function stuUpdate(ctx) {
        let connected = false;
        while (!connected) {
            if (ctx.database == null) {
                console.log('等待数据库实例');
                await new Promise((resolve) => setTimeout(resolve, 1000)); // 等待1秒钟
            }
            else {
                connected = true;
                for (let stu of data_1.StudentPool) {
                    const STUDENT = await ctx.database.get('student', { name: stu.name });
                    if (STUDENT.length === 0) {
                        ctx.database.create('student', { name: stu.name, rare: stu.rare, limit: stu.limit, server: stu.server });
                    }
                }
            }
        }
    }
    DB.stuUpdate = stuUpdate;
    //数据统计表
    async function BAUserTable(ctx) {
        ctx.model.extend('bauser', {
            name: 'string', userid: 'string',
            Istat: { type: 'integer', initial: 0 }, INstat: { type: 'integer', initial: 0 }, IUPstat: { type: 'integer', initial: 0 },
            Jstat: { type: 'integer', initial: 0 }, JNstat: { type: 'integer', initial: 0 }, JUPstat: { type: 'integer', initial: 0 },
            Istar: { type: 'integer', initial: 0 }, INstar: { type: 'integer', initial: 0 }, IUPstar: { type: 'integer', initial: 0 }, IUUPstar: { type: 'integer', initial: 0 },
            Jstar: { type: 'integer', initial: 0 }, JNstar: { type: 'integer', initial: 0 }, JUPstar: { type: 'integer', initial: 0 }, JUUPstar: { type: 'integer', initial: 0 }
        }, { primary: ['userid'], unique: ['userid'], autoInc: false });
    }
    DB.BAUserTable = BAUserTable;
    //设置UP
    async function setUP(ctx, args, config) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.';
        const NOSERVER_ERROR_MESSAGE = '请输入正确的服名.';
        const SAME_ERROR_MESSAGE = '检测到与当前UP学生名字相同,UP不变';
        const NOTFOUND_ERROR_MESSAGE = '找不到该学生,UP不变';
        const NOTSSR_ERROR_MESSAGE = '此学生非⭐⭐⭐学生,UP不变';
        const SERVER_ERROR_MESSAGE = '当前学生在国际服未实装,UP不变';
        const SERVER = args[0] === '日服' ? '日服' : '国际服';
        const DUP = args[0] === '日服' ? '日服默认UP角色' : '国际服默认UP角色';
        const SUP = args[0] === '日服' ? 'JUP' : 'IUP';
        const SUUP = args[0] === '日服' ? 'JUUP' : 'IUUP';
        const SERVERN = args[0] === '日服' ? 1 : 0;
        let oldUP = await ctx.database.get('student', { [SUP]: { $eq: true } }, ['name']);
        if (args.length !== 2) {
            return LENGTH_ERROR_MESSAGE;
        }
        if (args[0] !== '日服' && args[0] !== '国际服') {
            return NOSERVER_ERROR_MESSAGE;
        }
        if (args[1] === '重置') {
            await ctx.database.set('student', {}, { [SUP]: false });
            defaultUP(config, ctx, DUP, SUP);
            return ('已重置' + SERVER + 'UP学生为默认UP:' + config[DUP]);
        }
        let newUP = await ctx.database.get('student', { name: [args[1]] });
        if (newUP.length < 1) {
            return NOTFOUND_ERROR_MESSAGE;
        }
        if (newUP[0].rare !== 3) {
            return NOTSSR_ERROR_MESSAGE;
        }
        if (args[0] === '国际服' && newUP[0].server === 1) {
            return SERVER_ERROR_MESSAGE;
        }
        if (oldUP.length == 0) {
            up();
            return ('已设置' + SERVER + 'Up学生为:' + newUP[0].name);
        }
        if (oldUP[0].name === newUP[0].name) {
            return SAME_ERROR_MESSAGE;
        }
        else {
            up();
            return ('已设置' + SERVER + 'Up学生为:' + newUP[0].name);
        }
        async function up() {
            await ctx.database.set('student', {}, { [SUP]: false });
            await ctx.database.set('student', { name: [args[1]] }, { [SUP]: true });
            await ctx.database.set('bauser', {}, { [SUP + 'star']: 0, [SUUP + 'star']: 0, [SUP + 'stat']: 0 });
        }
        async function defaultUP(config, ctx, DUP, SUP) {
            let UPStuname = config[DUP];
            await ctx.database.set('student', { name: [UPStuname] }, { [SUP]: true });
        }
    }
    DB.setUP = setUP;
    //获取当前UP
    async function getUP(ctx, args, session) {
        const LENGTH_ERROR_MESSAGE = '无需参数.';
        if (args.length > 0) {
            return LENGTH_ERROR_MESSAGE;
        }
        const JUP = await ctx.database.get('student', { JUP: { $eq: true } }, ['name']);
        const IUP = await ctx.database.get('student', { IUP: { $eq: true } }, ['name']);
        if (JUP.length !== 0) {
            session.send('日服当前UP角色是：' + JUP[0].name);
        }
        else {
            session.send('当前日服无UP角色.');
        }
        if (IUP.length !== 0) {
            session.send('国际服当前UP角色是：' + IUP[0].name);
        }
        else {
            session.send('当前国际服无UP角色.');
        }
    }
    DB.getUP = getUP;
    //添加学生
    async function addStu(ctx, args) {
        const TIP_MESSAGE = "删除学生\t delstu 名字 \n示例：\ndelstu 日奈\n使用-h 获取详细帮助";
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.';
        if (args.length == 0) {
            return TIP_MESSAGE;
        }
        if (args.length !== 4) {
            return LENGTH_ERROR_MESSAGE;
        }
        try {
            const PARAMETER_ERROR_MESSAGE = '稀有度等参数值不对';
            const SAME_ERROR_MESSAGE = '学生已存在';
            let regex = /^[1-3]+$/;
            let regex2 = /^[0-2]+$/;
            let regex3 = /^[0-1]+$/;
            if (!regex.test(args[1]) || !regex2.test(args[2]) || !regex3.test(args[3])) {
                throw PARAMETER_ERROR_MESSAGE;
            }
            if ((await ctx.database.get('student', { name: args[0] })).length > 0) {
                throw SAME_ERROR_MESSAGE;
            }
            await ctx.database.create('student', { name: args[0], rare: args[1], limit: args[2], server: args[3] });
            return ('成功添加新学生：' + args[0] + '\n稀有度为：' + args[1] + '⭐');
        }
        catch (error) {
            return (error);
        }
    }
    DB.addStu = addStu;
    //删除学生
    async function delStu(ctx, args) {
        const TIP_MESSAGE = "删除学生\t delstu 名字 \n示例：\ndelstu 日奈\n使用-h 获取详细帮助";
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.';
        if (args.length == 0) {
            return TIP_MESSAGE;
        }
        else if (args.length > 1) {
            return LENGTH_ERROR_MESSAGE;
        }
        else {
            await ctx.database.remove('student', { name: [args[0]] });
            return ('已清空名为：' + args[0] + ' 的学生档案');
        }
    }
    DB.delStu = delStu;
    //获取抽卡统计数据
    async function baStat(ctx, user) {
        return await ctx.database.get('bauser', { userid: user });
    }
    DB.baStat = baStat;
    //初始化用户数据
    async function setbauser(ctx, session) {
        try {
            const NOTFOUND_ERROR_MESSAGE = '未检测到用户数据';
            let temp = await ctx.database.get('bauser', { userid: session.userId }, ['name']);
            if (temp.length < 1) {
                throw NOTFOUND_ERROR_MESSAGE;
            }
        }
        catch (error) {
            await ctx.model.create('bauser', { name: session.author.username, userid: session.userId });
            await session.send(error + '\n执行用户初始化');
        }
    }
    DB.setbauser = setbauser;
    //重置表
    async function clearTable(ctx) {
        ctx.database.drop('student');
        ctx.database.drop('bauser');
    }
    DB.clearTable = clearTable;
    //展示目前卡池
    async function showStu(ctx) {
        let cardpool = [];
        let IServer = await ctx.database.get('student', { server: 0, rare: 3 }, ['name']);
        let JServer = await ctx.database.get('student', { server: 1, rare: 3 }, ['name']);
        let IN = '国际服';
        let JP = '日服';
        cardpool.push(await maker(IServer, IN));
        cardpool.push(await maker(JServer, JP));
        async function maker(server, S) {
            const SIZE = 150;
            const COLS = 15;
            const ROWS = Math.floor(server.length / COLS);
            const tempImagePath = path_1.default.resolve(__dirname, '../../assets/temp/' + S + '.png');
            if (fs_1.default.existsSync(tempImagePath)) {
                let temp = await jimp_1.default.read(tempImagePath);
                let isEmpty = true;
                temp.scan(((server.length % COLS - 1) * SIZE), (ROWS * SIZE), SIZE, SIZE, (_x, _y, index) => {
                    const ALPHA = temp.bitmap.data[index + 3];
                    if (ALPHA === 0 || ALPHA === undefined) {
                    }
                    else {
                        return isEmpty = false;
                    }
                });
                if (isEmpty) {
                    return maker2(server, COLS, ROWS, SIZE, S);
                }
                else {
                    return new Map().set('buffer', (await temp.getBase64Async(jimp_1.default.MIME_PNG)));
                }
            }
            else {
                return maker2(server, COLS, ROWS, SIZE, S);
            }
        }
        async function maker2(server, COLS, ROWS, SIZE, S) {
            const BATCH_SIZE = 15;
            const MAX_RETRIES = 3;
            const PROMISES = [];
            const RETRY_DELAY = 1000;
            for (let i = 0; i < server.length; i += BATCH_SIZE) {
                const BATCH = server.slice(i, i + BATCH_SIZE);
                let batchPromises = BATCH.map(async (cardtemp) => {
                    const imageUrl = ba_alin_1.alincloud + 'stuimg' + '/assets/Student/' + cardtemp.name + '.png';
                    let retries = 0;
                    while (retries < MAX_RETRIES) {
                        try {
                            const image = await jimp_1.default.read(imageUrl);
                            return image.resize(SIZE, SIZE);
                        }
                        catch (error) {
                            console.error(`获取图片出错: (${imageUrl})`, error);
                            retries++;
                            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
                        }
                    }
                    throw new Error(`重试${MAX_RETRIES}次后依旧获取不到(${imageUrl})`);
                });
                PROMISES.push(...batchPromises);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            let tableImage = new jimp_1.default(COLS * SIZE, (ROWS + 1) * SIZE);
            await Promise.all(PROMISES).then(async (img) => {
                img.forEach((img, index) => {
                    let col = index % COLS;
                    let row = Math.floor(index / COLS);
                    tableImage.composite(img, col * SIZE, row * SIZE);
                });
            });
            await tableImage.writeAsync(path_1.default.resolve(__dirname, '../../assets/temp/' + S + '.png'));
            return new Map().set('buffer', (await tableImage.getBase64Async(jimp_1.default.MIME_PNG)));
        }
        return cardpool;
    }
    DB.showStu = showStu;
})(DB || (exports.DB = DB = {}));
