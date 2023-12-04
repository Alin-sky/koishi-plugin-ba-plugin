/*数据库操作模块*/
import fs from 'fs'
import { Context } from 'koishi'
import { Config } from '..'
import { wikiToSchale, getData, getHeadUrl, macthTable, macthTagA } from './data'
import path from 'path'
import { alincloud } from '../ba-alin'
declare module 'koishi' {
    interface Tables {
        stu_gacha: stuGacha//卡池表
        bauserIN: bauserIN
        bauserJP: bauserJP
        bauserCN: bauserCN//统计表
        stu_alias: stuAlias//别名表
        stu_data: stuData//学生数据表
        stu_info: stuInfo//学生情报表
    }
}
export interface stuGacha {
    name: string
    rare: number
    IUP: boolean
    JUP: boolean
    CUP: boolean
    url: string
    limit: number//限定 0普通 1限定 2活动 
    server: number//实装  1日服 2国际服 3国服
}
export interface stuData {
    stu_name: string//名字
    stu_id: number//id
    bulletType: string//攻击属性
    armorType: string //护甲类型
    battleAdaptation: number[]//地形streetBattleAdaptation: number//市区地形 outdoorBattleAdaptation: number//室外地形 indoorBattleAdaptation: number//室内地形
    equipment: string[]//装备
    stabilityPoint: number//稳定性
    attackPower: number[]// attackPower1: number//基础攻击 1级attackPower100: number//基础攻击 100级
    maxHP: number[]//maxHP1: number//基础HPmaxHP100: number//基础HP
    defensePower: number[]//defensePower1: number//基础防御defensePower100: number//基础防御
    healPower: number[]//healPower1: number//治愈力healPower100: number//治愈力
    dodgePoint: number//闪避
    accuracyPoint: number//命中
    criticalPoint: number//会心值
    criticalDamageRate: number//会心伤害值
    ammoCount: number//弹夹容量
    ammoCost: number//普攻消耗
    range: number//射程
    regenCost: number//cost恢复力
    skill: string[]//技能
    favorStat: {}//favorStatType//好感属性类型favorStatValue//每级好感属性增加数值
    weapon: string[]//专武数据
    gear: string[]//爱用品
}
export interface stuInfo {
    stu_name: string//名字
    familyName: string//姓
    schoolYear: string//年级
    characterAge: string//年龄
    birthday: string//生日
    charHeightMetric: string//身高
    school: string//学校
    club: string//社团
    weaponType: string//武器类型
    release_server: string[]//实装服务器
    starGrade: number//星级
    position: string//站位
    tacticRole: string//角色功能
    islimited: number//限定
}
export interface stuAlias {
    stu_name: string
    stu_alias: string[]
}
export interface bauserIN {
    name: string
    userid: string
    stat: number       //国际总抽卡次数
    Nstat: number      //国际普通池次数
    UPstat: number    //国际UP池次数
    star: number       //国际累计获得⭐⭐⭐
    Nstar: number      //国际普通池⭐⭐⭐
    UPstar: number     //国际UP池⭐⭐⭐
    UUPstar: number    //国际UP池UP⭐⭐⭐

}
export interface bauserJP {
    name: string
    userid: string
    stat: number
    Nstat: number
    UPstat: number
    star: number
    Nstar: number
    UPstar: number
    UUPstar: number
}
export interface bauserCN {
    name: string
    userid: string
    stat: number
    Nstat: number
    UPstat: number
    star: number
    Nstar: number
    UPstar: number
    UUPstar: number
}
export module DB {
    export async function initTable(ctx: Context) {
        console.log('Init database.')
        await initStuGachaTable(ctx)
        await initStuAliasTable(ctx)
        await initBaUserTable(ctx)
        await initstuDataTable(ctx)
        await initstuDataInfo(ctx)
    }
    async function initStuGachaTable(ctx: Context) {
        if (ctx.model.tables.stu_gacha === undefined) {
            ctx.model.extend('stu_gacha', {
                name: { type: 'string' },
                rare: { type: 'integer' },
                IUP: { type: 'boolean', initial: false },
                JUP: { type: 'boolean', initial: false },
                CUP: { type: 'boolean', initial: false },
                url: { type: 'string' },
                limit: { type: 'integer' },
                server: { type: 'integer' }
            }, {
                primary: 'name',
            })
        }
    }
    async function initStuAliasTable(ctx: Context) {
        if (ctx.model.tables.stu_alias == undefined) {
            ctx.model.extend('stu_alias', {
                stu_name: { type: 'string' },
                stu_alias: { type: 'list' },
            }, {
                primary: 'stu_name'
            })
        }
    }
    async function initBaUserTable(ctx: Context) {
        if (ctx.model.tables.stu_data == undefined) {
            ctx.model.extend('bauserIN', {
                name: 'string', userid: 'string',
                stat: { type: 'integer', initial: 0 },
                Nstat: { type: 'integer', initial: 0 },
                UPstat: { type: 'integer', initial: 0 },
                star: { type: 'integer', initial: 0 },
                Nstar: { type: 'integer', initial: 0 },
                UPstar: { type: 'integer', initial: 0 },
                UUPstar: { type: 'integer', initial: 0 },
            }, {
                primary: 'userid',
                unique: ['userid'],
                autoInc: false
            })
            ctx.model.extend('bauserJP', {
                name: 'string', userid: 'string',
                stat: { type: 'integer', initial: 0 },
                Nstat: { type: 'integer', initial: 0 },
                UPstat: { type: 'integer', initial: 0 },
                star: { type: 'integer', initial: 0 },
                Nstar: { type: 'integer', initial: 0 },
                UPstar: { type: 'integer', initial: 0 },
                UUPstar: { type: 'integer', initial: 0 }
            }, {
                primary: 'userid',
                unique: ['userid'],
                autoInc: false
            })
            ctx.model.extend('bauserCN', {
                name: 'string', userid: 'string',
                stat: { type: 'integer', initial: 0 },
                Nstat: { type: 'integer', initial: 0 },
                UPstat: { type: 'integer', initial: 0 },
                star: { type: 'integer', initial: 0 },
                Nstar: { type: 'integer', initial: 0 },
                UPstar: { type: 'integer', initial: 0 },
                UUPstar: { type: 'integer', initial: 0 }
            }, {
                primary: 'userid',
                unique: ['userid'],
                autoInc: false
            })
        }
    }
    async function initstuDataTable(ctx: Context) {
        if (ctx.model.tables.stu_data == undefined) {
            console.log("初始化学生数据表")
            ctx.model.extend('stu_data', {
                stu_name: { type: 'string' },
                stu_id: { type: 'integer' },
                bulletType: { type: 'string' },
                armorType: { type: 'string' },
                battleAdaptation: { type: 'list' },
                equipment: { type: 'list' },
                stabilityPoint: { type: 'integer' },
                attackPower: { type: 'list' },
                maxHP: { type: 'list' },
                defensePower: { type: 'list' },
                healPower: { type: 'list' },
                dodgePoint: { type: 'integer' },
                accuracyPoint: { type: 'integer' },
                criticalPoint: { type: 'integer' },
                criticalDamageRate: { type: 'integer' },
                ammoCount: { type: 'integer' },
                ammoCost: { type: 'integer' },
                range: { type: 'integer' },
                regenCost: { type: 'integer' },
                skill: { type: 'json' },
                favorStat: { type: 'json' },
                weapon: { type: 'json' },
                gear: { type: 'json' }
            }, {
                primary: 'stu_name'
            })
        }
    }
    async function initstuDataInfo(ctx: Context) {
        if (ctx.model.tables.stu_info == undefined) {
            ctx.model.extend('stu_info', {
                stu_name: { type: 'string' },
                familyName: { type: 'string' },
                schoolYear: { type: 'string' },
                characterAge: { type: 'string' },
                birthday: { type: 'string' },
                charHeightMetric: { type: 'string' },
                school: { type: 'string' },
                club: { type: 'string' },
                weaponType: { type: 'string' },
                release_server: { type: 'list' },
                starGrade: { type: 'integer' },
                position: { type: 'string' },
                tacticRole: { type: 'string' },
                islimited: { type: 'integer' }
            }, {
                primary: 'stu_name'
            })
        }
    }
    export async function updateStu(ctx: Context) {
        let schaleDBUrl = 'https://schale.gg/data/zh/students.min.json'
        let aliasUrl = 'https://bawiki.lgc2333.top/data/stu_alias.json'
        console.log('Update student data.')
        let schaleDBData = await getData(ctx, schaleDBUrl)
        let aliasData = await getData(ctx, aliasUrl)
        await updateStuAlias(ctx, aliasData)
        await updateStuData(ctx, schaleDBData)
        await updateStuInfo(ctx, schaleDBData)
        await updateStuGacha(ctx)
        console.log('Update completed.')
    }
    async function updateStuAlias(ctx: Context, aliasData) {
        let stunames = Object.keys(aliasData)
        await stunames.forEach(stu => {
            ctx.model.upsert('stu_alias', [{
                stu_name: stu,
                stu_alias: aliasData[stu]
            }])
        })

    }
    async function updateStuData(ctx: Context, schaleDBData) {
        await schaleDBData.forEach(data => {
            let BattleAdaptation = [data.StreetBattleAdaptation, data.OutdoorBattleAdaptation, data.IndoorBattleAdaptation]
            let AttackPower = [data.AttackPower1, data.AttackPower100]
            let MaxHP = [data.MaxHP1, data.MaxHP100]
            let DefensePower = [data.DefensePower1, data.DefensePower100]
            let HealPower = [data.HealPower1, data.HealPower100]
            let FavorStat = { FavorStatType: data.FavorStatType, FavorStatValue: data.FavorStatValue, FavorAlts: data.FavorAlts }
            ctx.model.upsert('stu_data', [{
                stu_name: data.Name,
                stu_id: data.Id,
                bulletType: data.BulletType,
                armorType: data.ArmorType,
                battleAdaptation: BattleAdaptation,
                equipment: data.Equipment,
                stabilityPoint: data.StabilityPoint,
                attackPower: AttackPower,
                maxHP: MaxHP,
                defensePower: DefensePower,
                healPower: HealPower,
                dodgePoint: data.DodgePoint,
                accuracyPoint: data.AccuracyPoint,
                criticalPoint: data.CriticalPoint,
                criticalDamageRate: data.CriticalDamageRate,
                ammoCount: data.AmmoCount,
                ammoCost: data.AmmoCost,
                range: data.Range,
                regenCost: data.RegenCost,
                skill: data.Skills,
                favorStat: FavorStat,
                weapon: data.Weapon,
                gear: data.Gear
            }])

        })
    }
    async function updateStuInfo(ctx: Context, schaleDBData) {
        await schaleDBData.forEach(data => {
            ctx.model.upsert('stu_info', [{
                stu_name: data.Name,
                school: data.School,
                club: data.Club,
                starGrade: data.StarGrade,
                tacticRole: data.TacticRole,
                position: data.Position,
                weaponType: data.WeaponType,
                familyName: data.FamilyName,
                schoolYear: data.SchoolYear,
                characterAge: data.CharacterAge,
                birthday: data.Birthday,
                charHeightMetric: data.CharHeightMetric,
                islimited: data.IsLimited,
                release_server: data.IsReleased
            }])
        })
    }
    async function updateStuGacha(ctx: Context) {
        const mainPage = 'https://ba.gamekee.com'
        let result = await ctx.http.get(mainPage)
        let match = macthTagA(result)//全部<a>
        let schale = await ctx.model.get('stu_info', {}, ['stu_name', 'starGrade', 'release_server', 'islimited'])
        match.forEach(async m => {
            let r = /<a[^>]*\btitle="([^"]*)"[^>]*>/
            let title = m.match(r)//title
            if (title != null) {
                let T
                if (title[1] in wikiToSchale) T = wikiToSchale[title[1]]
                else T = title[1].replace(/（/g, '(').replace(/）/g, ')')
                schale.forEach(async stu => {
                    let i = 0
                    if (stu.stu_name === T) {
                        let nextUrl = mainPage + await macthTable(match, title[1])
                        let stuUrl = await getHeadUrl(ctx, nextUrl)
                        for (const bl of stu.release_server) {
                            if (bl == 'true') i++
                        }
                        await ctx.model.upsert('stu_gacha', [{ name: T, rare: stu.starGrade, url: stuUrl, limit: stu.islimited, server: i }])
                    }
                })
            }
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
            '国际服': { SERVER: '国际服', DUP: '国际服默认UP角色', SUP: 'IUP', SUUP: 'IUUP', SERVERN: 2 },
            '国服': { SERVER: '国服', DUP: '国服默认UP角色', SUP: 'CUP', SUUP: 'CUUP', SERVERN: 3 },
        }
        if (args.length !== 2) return LENGTH_ERROR_MESSAGE
        if (args[0] !== '日服' && args[0] !== '国际服' && args[0] !== '国服') return NOTSERVER_ERROR_MESSAGE
        if (args[1] === '重置') {
            await ctx.database.set('stu_gacha', {}, { [SERVERMAP[args[0]]['SUP']]: false })
            await defaultUP(config, ctx, SERVERMAP[args[0]]['DUP'], SERVERMAP[args[0]]['SUP'])
            return ('已重置' + SERVERMAP[args[0]]['SERVER'] + 'UP学生为默认UP:' + config[SERVERMAP[args[0]]['DUP']])
        }
        let oldUP = await ctx.database.get('stu_gacha', { [SERVERMAP[args[0]]['SUP']]: { $eq: true } }, ['name'])
        let newUP = await ctx.database.get('stu_gacha', { name: [args[1]] })
        if (newUP.length < 1) return NOTFOUND_ERROR_MESSAGE
        if (newUP[0].rare !== 3) return NOTSSR_ERROR_MESSAGE
        if (args[0] === '国际服' && newUP[0].server === 1) return SERVER_ERROR_MESSAGE
        if (args[0] === '国服' && newUP[0].server !== 3) return SERVER_ERROR2_MESSAGE
        if (oldUP.length == 0 || oldUP[0].name !== newUP[0].name) {
            up()
            return ('已设置' + SERVERMAP[args[0]]['SERVER'] + 'Up学生为:' + newUP[0].name)
        } else return SAME_ERROR_MESSAGE
        //设置新UP
        async function up() {
            await ctx.database.set('stu_gacha', {}, { [SERVERMAP[args[0]]['SUP']]: false })
            await ctx.database.set('stu_gacha', { name: [args[1]] }, { [SERVERMAP[args[0]]['SUP']]: true })
            const TABLE = await args[0] === '日服' ? 'bauserJP' : args[0] === '国际服' ? 'bauserIN' : 'bauserCN'
            await ctx.database.set(TABLE, {}, { [SERVERMAP[args[0]]['SUP'] + 'star']: 0, [SERVERMAP[args[0]]['SUUP'] + 'star']: 0, [SERVERMAP[args[0]]['SUP'] + 'stat']: 0 })
        }
        //默认UP
        async function defaultUP(config: Config, ctx: Context, DUP, SUP) {
            let UPStuname = config[DUP]
            await ctx.database.set('stu_gacha', { name: [UPStuname] }, { [SUP]: true })
        }
    }
    //获取当前UP
    export async function getUP(ctx: Context, args: any[], session) {
        const UP = args[0] === '日服' ? 'JUP' : args[0] === '国际服' ? 'IUP' : 'CUP'
        const nowUP = await ctx.database.get('stu_gacha', { [UP]: { $eq: true } }, ['name'])
        if (nowUP.length !== 0) session.send(`${args[0]}当前UP角色是: ${nowUP[0].name}`)
        else session.send(`当前${args[0]}无UP角色.`)
    }
    //添加学生
    export async function addStu(ctx: Context, args: any[]) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.'
        if (args.length !== 4) return LENGTH_ERROR_MESSAGE
        try {
            const PARAMETER_ERROR_MESSAGE = '稀有度等参数值不对'
            const SAME_ERROR_MESSAGE = '学生已存在'
            let regex = /^[1-3]+$/
            let regex2 = /^[0-2]+$/
            let regex3 = /^[1-3]+$/
            if (!regex.test(args[1]) || !regex2.test(args[2]) || !regex3.test(args[3])) throw PARAMETER_ERROR_MESSAGE
            if ((await ctx.database.get('stu_gacha', { name: args[0] })).length > 0) throw SAME_ERROR_MESSAGE
            await ctx.database.create('stu_gacha', { name: args[0], rare: args[1], limit: args[2], server: args[3] })
            return ('成功添加新学生：' + args[0] + '\n稀有度为：' + args[1] + '⭐')
        } catch (error) {
            return (error)
        }
    }
    //删除学生
    export async function delStu(ctx: Context, args: any[]) {
        const LENGTH_ERROR_MESSAGE = '请输入正确的参数列表.'
        if (args.length > 1) return LENGTH_ERROR_MESSAGE
        else {
            await ctx.database.remove('stu_gacha', { name: [args[0]] })
            return ('已清空名为：' + args[0] + ' 的学生档案')
        }
    }
    //获取抽卡统计数据
    export async function baStat(ctx: Context, session, args) {
        const TABLE = args[0] === '日服' ? 'bauserJP' : args[0] === '国际服' ? 'bauserIN' : 'bauserCN'
        let data = await ctx.database.get(TABLE, { userid: session.userId })
        if (data.length == 0) {
            await ctx.model.create(TABLE, { name: session.author.username, userid: session.userId })
            data = await ctx.database.get(TABLE, { userid: session.userId })
        }
        let text = `用户：${session.author.username}的模拟器抽卡记录\n` + `\t\t${args[0]}：\n` +
            `累计抽卡次数：${data[0].stat}\nUP池抽卡次数：${data[0].UPstat}\n普池抽卡次数：${data[0].Nstat}\n` +
            `累计⭐⭐⭐学生：${data[0].star}\nUP⭐⭐⭐学生：${data[0].UUPstar}\n` +
            `UP池获得⭐⭐⭐学生：${data[0].UPstar}\n普池获得⭐⭐⭐学生：${data[0].Nstar}`
        await session.send(text)
    }
    //初始化用户数据
    export async function initBauser(ctx: Context, session, args) {
        const TABLE = args[0] === '日服' ? 'bauserJP' : args[0] === '国际服' ? 'bauserIN' : 'bauserCN'
        try {
            const NOTFOUND_ERROR_MESSAGE = `未检测到用户${args[0]}数据。`
            let temp = await ctx.database.get(TABLE, { userid: session.userId }, ['name'])
            if (temp.length < 1) throw NOTFOUND_ERROR_MESSAGE
        } catch (error) {
            await ctx.model.create(TABLE, { name: session.author.username, userid: session.userId })
            await session.send(error + '\n执行用户初始化')
        }
    }
    //删除学生表
    export async function clearTable(ctx: Context) {
        // await ctx.database.drop('student')
    }
    //展示目前卡池
    export async function showStu(ctx: Context, BaTempPath, args) {
        let cardpool = []
        let ServerMap = {
            '日服': { Server: await ctx.database.get('stu_gacha', { server: [3, 2, 1], rare: 3 }, ['name', 'url']), name: 'JP' },
            '国际服': { Server: await ctx.database.get('stu_gacha', { server: [3, 2], rare: 3 }, ['name', 'url']), name: 'IN' },
            '国服': { Server: await ctx.database.get('stu_gacha', { server: [3], rare: 3 }, ['name', 'url']), name: 'CN' },
        }
        cardpool.push(await maker(ctx, ServerMap[args[0]].Server, ServerMap[args[0]].name, BaTempPath))
        return cardpool
        async function maker(ctx: Context, server, name: any, BaTempPath: string) {
            const SIZE = 150
            const COLS = 15
            const ROWS = Math.floor(server.length / COLS)
            const tempImagePath = path.join(BaTempPath, `${name}.png`)//当前卡池图
            if (fs.existsSync(tempImagePath)) {
                let temp = await ctx.canvas.loadImage(tempImagePath)
                const canvas = await ctx.canvas.createCanvas(temp.width, temp.height)
                const context = canvas.getContext('2d')
                await context.drawImage(temp, 0, 0)
                let isEmpty = false
                // 判断是否最新卡池图
                const imageData = context.getImageData(((server.length - 1) % COLS) * SIZE, (ROWS * SIZE), SIZE, SIZE)
                const data = imageData.data
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] !== 0) {
                        isEmpty = true
                        break
                    }
                }
                if (isEmpty) return temp.src
                else return maker2(server, COLS, ROWS, SIZE, name,tempImagePath)
            } else return maker2(server, COLS, ROWS, SIZE, name,tempImagePath)
        }
        //卡池图生成
        async function maker2(server: string | any[], COLS: number, ROWS: number, SIZE: number, name: any,tempImagePath) {
            const BATCH_SIZE = 15
            const MAX_RETRIES = 3
            const RETRY_DELAY = 1000
            const canvas = ctx.canvas.createCanvas(COLS * SIZE, (ROWS + 1) * SIZE)
            const context = canvas.getContext('2d')
            let x = 0
            let y = 0
            for (let i = 0; i < server.length; i += BATCH_SIZE) {
                const batch = server.slice(i, i + BATCH_SIZE)
                for (const cardtemp of batch) {
                    let url = encodeURIComponent(cardtemp.name)
                    let imageUrl = cardtemp.url == null ? (alincloud + 'stuimg' + '/assets/Student/' + url + '.png') : 'https:' + cardtemp.url
                    let retries = 0
                    while (retries < MAX_RETRIES) {
                        try {
                            const image = await ctx.canvas.loadImage(imageUrl)
                            context.drawImage(image, x, y, SIZE, SIZE)
                            x += SIZE
                            if (x >= COLS * SIZE) {
                                x = 0
                                y += SIZE
                            }
                            break
                        }
                        catch (error) {
                            console.error(`获取图片出错: (${imageUrl})`, error)
                            retries++
                            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
                        }
                    }
                    if (retries == MAX_RETRIES) throw new Error(`重试${MAX_RETRIES}次后依旧获取不到(${imageUrl})`)
                }
            }
            const buffer = canvas.toBuffer('image/png')
            await fs.promises.writeFile(tempImagePath, buffer)
            return buffer
        }
    }
}