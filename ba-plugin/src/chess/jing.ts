import { Context, Schema, Session, h } from 'koishi'
import { DB } from './database'
import fs from 'fs'
import path from 'path'
import { Config } from '..'
import { BaAssetsPath } from '../gacha'
export interface Chess {
    chessId: number
    status: number//0就绪 1进行 2完成 3中止 4取消
    oneP: string
    twoP: string
}
export interface chessConfig {
    'PhotoToText': boolean
}
export const chessConfig: Schema<chessConfig> = Schema.object({
    'PhotoToText': Schema.boolean().default(true).description('井字棋图文模式'),
})
//胜利结果
const WIN: Array<Array<{ x: string, y: string }>> = [
    [{ x: '1', y: '1' }, { x: '1', y: '2' }, { x: '1', y: '3' }],
    [{ x: '2', y: '1' }, { x: '2', y: '2' }, { x: '2', y: '3' }],
    [{ x: '3', y: '1' }, { x: '3', y: '2' }, { x: '3', y: '3' }],

    [{ x: '1', y: '1' }, { x: '2', y: '1' }, { x: '3', y: '1' }],
    [{ x: '1', y: '2' }, { x: '2', y: '2' }, { x: '3', y: '2' }],
    [{ x: '1', y: '3' }, { x: '2', y: '3' }, { x: '3', y: '3' }],

    [{ x: '1', y: '1' }, { x: '2', y: '2' }, { x: '3', y: '3' }],
    [{ x: '1', y: '3' }, { x: '3', y: '2' }, { x: '3', y: '1' }],
]
declare module 'koishi' {
    //超时结束游戏事件
    interface Events {
        'chess-timeout'(...args: any[]): void
    }
}
//写入锁
const writeLock = {
    isLocked: false,
    async create() {
        while (this.isLocked) await new Promise(resolve => setTimeout(resolve, 100))
        this.isLocked = true
    },
    release() {
        this.isLocked = false
    },
}
export const chessplugin = ({
    apply(ctx: Context, config: Config) {
        ctx.on('chess-timeout', async (chessId) => {
            try {
                gameMap.delete(chessId)
                await ctx.model.set('chess', { chessId: chessId }, { status: 3 })
            } catch (error) {
                console.log('该排除错误了')
            }
        })
        ctx.on('ready', async () => {
            await DB.initialChessTable(ctx)
            await DB.clearChess(ctx)
        })
        const ModoriMomo = {
            playerBPath: 'midori_piece.png',
            playerBWinPath: 'midori_win.png',
            playerBLosePath: 'midori_lose.png',
            playerAPath: 'momo_piece.png',
            playerAWinPath: 'momo_win.png',
            playerALosePath: 'momo_lose.png'
        }
        const AronaPulana = {
            playerAPath: 'arona_piece.png',
            playerAWinPath: 'arona_win.png',
            playerALosePath: 'arona_lose.png',
            playerBPath: 'pulana_piece.png',
            playerBWinPath: 'pulana_win.png',
            playerBLosePath: 'pulana_lose.png'
        }
        const gameMap = new Map<string, ChessGame>()
        ctx.command("jing", 'BA井字棋').usage('使用说明：\njing/井 @某人邀请对战\n子指令：来/爬 应战\n子指令：落子 x y  下棋(xy为数字123).').alias("井").example("井 @arona").action(
            async ({ session }, ...args) => {
                if ((await ctx.database.stats()).tables.chess == undefined) await DB.initialChessTable(ctx)
                //判断是传参是@或者无参
                if (args.length == 0 || !(/^<at id/.test(args[0]))) return
                const AT = args[0].match(/<at id="([^"]+)"/)[1] //获取@对象
                const L1 = await DB.getNowChess(ctx, session.userId)
                const L2 = await DB.getNowChess(ctx, AT)
                if (L1.length > 0) return '你已经有对手了'
                if (L2.length > 0) return '你的对手在比赛'
                await DB.CreateChess(ctx, session, AT)
                await session.send(`${args[0]} 你已被邀请参加井字棋暗黑决斗~`)
                setTimeout(async () => {
                    let chess = await DB.readyChess(ctx, session, 'playerA')
                    if (chess.length > 0) {
                        await DB.cancelChess(ctx, session, 'playerA')
                        await session.send(`<at id="${session.userId}"/>对方无视了你，游戏已被自动取消~`)
                    }
                }, 15000)//超时取消

            })
        ctx.command('jing.reply').alias('来').usage('使用说明：\n来：迎战\n爬：拒绝').shortcut('爬', { options: { no: false } }).option('no', '-no 拒绝游戏').action(
            async ({ session, options }) => {
                if (options.no) {
                    const DATA = await DB.readyChess(ctx, session, 'playerB')
                    if (DATA.length == 0) return
                    await session.send(`<at id="${DATA[0].playerA}"/>~\n对方拒绝了你的邀请并不屑的看了你一眼.`)
                    await DB.cancelChess(ctx, session, 'playerB')
                } else {
                    const CHESS = await DB.queryChess(ctx, session, "playerB")
                    if (CHESS.length == 0) return
                    const game = gameMap.get(CHESS[0].chessId)
                    if (!game) {
                        const newGame = await startChess(ctx, CHESS, session)
                        gameMap.set(CHESS[0].chessId, newGame)
                        console.log(gameMap)
                        closeTimeoutChess(ctx, gameMap.get(CHESS[0].chessId), CHESS[0].chessId)
                    }
                }
            }
        )
        ctx.command('jing.down').alias('落子').usage('-m 切换模式\n棋局信息：获取当前棋局信息').option('status', '-status 棋局信息').shortcut('棋局信息', { options: { status: true } }).option('m', '-m 使用桃绿模式').action(
            async ({ session, options }, ...args) => {
                let chess = await DB.queryChess(ctx, session)
                if (chess.length == 0) return
                const game = gameMap.get(chess[0].chessId)
                if (options.status) {
                    await session.send(`棋局信息：`)
                    await session.send(`当前玩家A:<at id="${game.player1}"/>`)
                    await session.send(`当前玩家B:<at id="${game.player2}"/>`)
                    await session.send(`当前执棋者:<at id="${game.gameState.currentPlayer}"/>`)
                    return
                }
                let coord = ['1', '2', '3']
                let move = { x: args[0], y: args[1] }
                if (game.gameState.currentPlayer !== session.userId) return await session.send('轮到你下棋了？')
                if (!coord.includes(args[0]) || !coord.includes(args[1])) return await session.send('你这坐标有问题啊~')
                let playerImages = (options.m === undefined) ? AronaPulana : ModoriMomo
                let moveSuccess = await makeMove(move, game, session)//移动判断
                if (moveSuccess) {
                    let coordinate: any[] = config.chess.PhotoToText ? [[null, null, null], [null, null, null], [null, null, null]] : [['囗', '囗', '囗'], ['囗', '囗', '囗'], ['囗', '囗', '囗']]
                    if (config.chess.PhotoToText) {
                        //图片模式 性能未优化
                        let chessBGPath = 'chessBG.png'
                        let startX = 345//九宫格位置
                        let startY = 330
                        let cellSize = 120
                        const BG = await getImage(ctx, chessBGPath)
                        const O = await getImage(ctx, playerImages.playerAPath)
                        const X = await getImage(ctx, playerImages.playerBPath)
                        const canvas = ctx.canvas.createCanvas(BG.width, BG.height)
                        const context = canvas.getContext('2d')
                        context.drawImage(BG, 0, 0)
                        game.gameState.player1MoveLog.forEach(movelog => coordinate[movelog.x - 1][movelog.y - 1] = O)
                        game.gameState.player2MoveLog.forEach(movelog => coordinate[movelog.x - 1][movelog.y - 1] = X)
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                const x = startX + j * cellSize
                                const y = startY + i * cellSize
                                if (coordinate[i][j] !== null) context.drawImage(coordinate[i][j], x, y)
                            }
                        }
                        const callbackImage = canvas.toDataURL('image/png')
                        await session.send(h.image(callbackImage))
                    } else {
                        game.gameState.player1MoveLog.forEach(movelog => coordinate[movelog.x - 1][movelog.y - 1] = '⚪')
                        game.gameState.player2MoveLog.forEach(movelog => coordinate[movelog.x - 1][movelog.y - 1] = '❌')
                        await session.send(
                            '当前棋盘：\n' +
                            `${coordinate[0][0]}${coordinate[0][1]}${coordinate[0][2]}\n` +
                            `${coordinate[1][0]}${coordinate[1][1]}${coordinate[1][2]}\n` +
                            `${coordinate[2][0]}${coordinate[2][1]}${coordinate[2][2]}\n`
                        )
                    }
                    //结束判断
                    await gameOver(ctx, game, session, playerImages)
                }
                else return
            }
        )
    }

})
class ChessGame {
    player1: string
    player2: string
    gameState: {
        currentPlayer: string
        gameOver: boolean
        winner: string
        player1MoveLog: any[]
        player2MoveLog: any[]
        roundLog: number[]
    }
    constructor(player1: string, player2: string) {
        this.player1 = player1
        this.player2 = player2
        this.gameState = {
            currentPlayer: player1,//当前棋手
            gameOver: false,//结束
            winner: null,//赢家
            player1MoveLog: [],//玩家1落子记录
            player2MoveLog: [],//玩家2落子记录
            roundLog: []//回合
        }
    }
}
//关闭棋盘
function closeTimeoutChess(ctx: Context, game, chessId) {
    let lastState = JSON.stringify(game)
    let i = 0
    const intervalId = setInterval(() => {
        const currentState = JSON.stringify(game)
        if (currentState !== lastState) i = 0
        else i++
        lastState = currentState
        if (i == 12) {
            ctx.emit('chess-timeout', chessId)
            clearInterval(intervalId)
        }
        console.log("i=" + i)
    }, 5000)
}

async function makeMove(move, game: ChessGame, session: Session<never, never>) {
    //更换棋手
    const currentPlayerMoveLog = game.gameState.currentPlayer === game.player1 ? game.gameState.player1MoveLog : game.gameState.player2MoveLog
    const nextPlayerMoveLog = game.gameState.currentPlayer === game.player1 ? game.gameState.player2MoveLog : game.gameState.player1MoveLog
    if (currentPlayerMoveLog === game.gameState.player2MoveLog) game.gameState.roundLog.push(1)
    //第一次移动直接push
    if (currentPlayerMoveLog.length < 1 && currentPlayerMoveLog === game.gameState.player1MoveLog) {
        currentPlayerMoveLog.push(move)
        return true
    } else {
        //判断已有位置
        if (!currentPlayerMoveLog.some(MoveLog => MoveLog.x == move.x && MoveLog.y == move.y) && !nextPlayerMoveLog.some(MoveLog => MoveLog.x == move.x && MoveLog.y == move.y)) {
            currentPlayerMoveLog.push(move)
            //判断胜负
            if (currentPlayerMoveLog.length >= 3) {
                const isWin = WIN.some(winMode => winMode.every(win => currentPlayerMoveLog.some(MoveLog => MoveLog.x == win.x && MoveLog.y == win.y)))
                if (isWin) {
                    game.gameState.gameOver = true
                    game.gameState.winner = game.gameState.currentPlayer
                }
            }
            return true
        } else {
            await session.send('报告，爱丽丝已经攻占了这里(已有棋子)~')
            return false
        }
    }
}
async function gameOver(ctx: Context, game: ChessGame, session: Session<never, never>, playerImages: { playerAPath: any; playerAWinPath?: string; playerALosePath?: string; playerBPath: any; playerBWinPath?: string; playerBLosePath?: string }) {
    if (game.gameState.gameOver) {
        const WIN = game.gameState.winner === game.player1 ? await getImage(ctx, playerImages.playerAWinPath) : await getImage(ctx, playerImages.playerBWinPath)
        const LOSE = game.gameState.winner === game.player1 ? await getImage(ctx, playerImages.playerBLosePath) : await getImage(ctx, playerImages.playerALosePath)
        const loser = game.gameState.winner === game.player1 ? game.player2 : game.player1
        const winImg = `data:image/png;base64,${WIN.src.toString('base64')}`
        const loseImg = `data:image/png;base64,${LOSE.src.toString('base64')}`
        await ctx.database.set('chess', { $and: [{ status: 1 }, { $or: [{ playerA: game.player1 }, { playerB: game.player1 }] }] }, { status: 2, winner: game.gameState.currentPlayer })
        await session.send(`游戏已结束，胜者：<at id="${game.gameState.winner}"/>`)
        await session.send(h.image(winImg))
        await session.send(`败者：<at id="${loser}"/>`)
        await session.send(h.image(loseImg))
        await saveFile(ctx, game)
    } else if (game.gameState.player1MoveLog.length == 5) {
        await ctx.database.set('chess', { $and: [{ status: 1 }, { $or: [{ playerA: game.player1 }, { playerB: game.player1 }] }] }, { status: 2, winner: 'draw' })
        await session.send('游戏已结束，平局')
        await saveFile(ctx, game)
    } else {
        await session.send('轮到下一位选手')
        game.gameState.currentPlayer = (game.gameState.currentPlayer === game.player1) ? game.player2 : game.player1
    }
}
//开始游戏
async function startChess(ctx: Context, chess, session: Session<never, never>) {
    await ctx.database.set('chess', { chessId: chess[0].chessId }, { status: 1 })
    await session.send(`Game Start~ <at id="${chess[0].playerA}"/>`)
    return createGame(chess[0].playerA, chess[0].playerB)
}
//创建棋局
function createGame(player1: string, player2: string) {
    return new ChessGame(player1, player2)
}
async function getImage(ctx: Context, imgPath) {
    const imgAllPath = path.join(BaAssetsPath, imgPath)
    return await ctx.canvas.loadImage(imgAllPath)
}
//保存游戏记录
async function saveFile(ctx, game) {
    await writeLock.create()
    const Gamejson = JSON.stringify(game)
    let savepath = path.join(ctx.baseDir, 'data', 'assets', 'ba-plugin', 'temp', 'chessDemo.json')
    try {
        fs.appendFile(savepath, Gamejson, 'utf-8', (err) => {
            if (err) console.log('写入失败')
            else console.log('写入成功')
        })
    }
    catch (err) {
        writeLock.release()
        return
    } finally {
        writeLock.release()
    }
}
/*后续功能 复盘 赛后其他查胜率等 */