import { Context, Schema, Session, h } from 'koishi';
import { DB } from './database';
import fs from 'fs'
import { createCanvas, loadImage } from 'canvas'
import path from 'path';
import { Config } from '..';
export interface Chess {
    chessId: number
    status: number
    oneP: string
    twoP: string
}
const WINMODES: Array<Array<{ x: string, y: string }>> = [
    [{ x: '1', y: '1' }, { x: '1', y: '2' }, { x: '1', y: '3' }],
    [{ x: '2', y: '1' }, { x: '2', y: '2' }, { x: '2', y: '3' }],
    [{ x: '3', y: '1' }, { x: '3', y: '2' }, { x: '3', y: '3' }],

    [{ x: '1', y: '1' }, { x: '2', y: '1' }, { x: '3', y: '1' }],
    [{ x: '1', y: '2' }, { x: '2', y: '2' }, { x: '3', y: '2' }],
    [{ x: '1', y: '3' }, { x: '2', y: '3' }, { x: '3', y: '3' }],

    [{ x: '1', y: '1' }, { x: '2', y: '2' }, { x: '3', y: '3' }],
    [{ x: '1', y: '3' }, { x: '3', y: '2' }, { x: '3', y: '1' }],
]

const writeLock = {
    isLocked: false,
    async create() {
        while (this.isLocked) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.isLocked = true;
    },
    release() {
        this.isLocked = false;
    },
}

export interface jingConfig {
    'photototext': boolean;
}
export const jingConfig: Schema<jingConfig> = Schema.object({
    'photototext': Schema.boolean().default(true).description('井字棋图文模式'),
})

export const jingziqi = ({
    apply(ctx: Context, config: Config) {
        ctx.on('ready', async () => {
            await DB.initialChessTable(ctx);
            await DB.clearChess(ctx);
        })
        const gameMap = new Map<string, ChessGame>();
        ctx.command("jing", '井字棋').usage('使用说明：\njing @某人邀请对战.\n子指令：来井 应战.\n子指令：落子 x y  进行下棋(xy为数字123).').alias("井").action(
            async ({ session }, ...args) => {
                if (args.length == 0) {
                    return;
                }
                if ((await ctx.database.stats()).tables.chess == undefined) {
                    await DB.initialChessTable(ctx);
                }
                const ERROR_MESSAGE = "请@xx开始对局";
                const REGEX = /^<at id/;
                if (REGEX.test(args[0])) {
                    const REGEX2 = /<at id="([^"]+)"/;
                    const AT = args[0].match(REGEX2)[1];
                    const L1 = await ctx.database.get('chess', { $and: [{ playerA: session.userId }, { $or: [{ status: 1 }, { status: 0 }] }] })
                    const L2 = await ctx.database.get('chess', { $and: [{ playerB: AT }, { $or: [{ status: 1 }, { status: 0 }] }] })
                    if (L1.length > 0) {
                        return '你已经有对手了'
                    }
                    if (L2.length > 0) {
                        return '你的对手在比赛'
                    }
                    await DB.CreateChess(ctx, session, AT);
                    await session.send(`${args[0]} 来一把井字棋暗黑决斗吧~`);
                    setTimeout(async () => {
                        const chess = await ctx.database.get('chess', { $and: [{ playerA: session.userId }, { status: 0 }] })
                        if (chess.length > 0) {
                            await ctx.database.set('chess', { $and: [{ playerA: session.userId }, { status: 0 }] }, { status: 4 })
                            await session.send(`<at id="${session.userId}"/>对方并没有理你，游戏已被自动取消~`)

                        }
                    }, 30000)
                } else {
                    return ERROR_MESSAGE;
                }
            })
        ctx.command('jing.reply').alias('来井').shortcut('爬', { options: { no: false } }).option('no', '-no 拒绝游戏')
            .action(
                async ({ session, options }) => {
                    console.log(options.no)
                    if (options.no) {
                        const DATA = await ctx.database.get('chess', { $and: [{ playerB: session.userId }, { status: 0 }] })
                        await session.send(`<at id="${DATA[0].playerA}"/>~\n对方拒绝了你的邀请并不屑的看了你一眼.`)
                        if (DATA.length > 0) {
                            await ctx.database.set('chess', { $and: [{ playerB: session.userId }, { status: 0 }] }, { status: 4 });
                        }
                    } else {
                        const CHESS = await DB.queryChessB(ctx, session);
                        if (CHESS.length == 0) {
                            return '现在没人和你下棋';
                        }
                        const game = gameMap.get(CHESS[0].chessId);
                        if (!game) {
                            const newGame = await startChess(ctx, CHESS, session);
                            gameMap.set(CHESS[0].chessId, newGame);
                        }
                    }
                }
            )
        ctx.command('jing.xia').alias('落子').option('status', '-status 棋局信息').shortcut('棋局信息', { options: { status: true } }).action(
            async ({ session, options }, ...args) => {
                let chess = await DB.queryChessN(ctx, session);
                const game = gameMap.get(chess[0].chessId);
                if (options.status) {
                    await session.send(`棋局信息：
                    当前玩家A:<at id =${game.player1}/>.当前玩家B:<at id =${game.player2}/>
                    当前执棋者：<at id =${game.gameState.currentPlayer}>`);
                    return;
                } else {
                    if (!game) {
                        await session.send('请先使用 @xx 开始对局');
                    } else {
                        if (game.gameState.currentPlayer !== session.userId) {
                            await session.send('你不是当前的下棋选手.');
                        } else if (!['1', '2', '3'].includes(args[0]) || !['1', '2', '3'].includes(args[1])) {
                            await session.send('你的坐标有问题啊~');
                        } else {
                            let move = { x: args[0], y: args[1] }
                            let nextplay = await makeMove(move, game, session);
                            if (nextplay) {
                                if (config.jing.photototext) {
                                    //图片模式 性能未优化
                                    const BG = await loadImage(path.resolve(__dirname, '../assets/pulana.PNG'))
                                    const X = await loadImage(path.resolve(__dirname, '../assets/pulana.PNG'))
                                    const O = await loadImage(path.resolve(__dirname, '../assets/arona.PNG'))
                                    const canvas =createCanvas(BG.width,BG.height);
                                    const context = canvas.getContext('2d');
                                    let coordinate = [
                                        [null, null, null],
                                        [null, null, null],
                                        [null, null, null],
                                    ]
                                    game.gameState.player1MoveLog.forEach((movelog) => {
                                        coordinate[movelog.x - 1][movelog.y - 1] = O
                                    })
                                    game.gameState.player2MoveLog.forEach((movelog) => {
                                        coordinate[movelog.x - 1][movelog.y - 1] = X
                                    })
                                    let startX = 345;
                                    let startY = 330;
                                    let cellSize = 120;
                                    for (let i = 0; i < 3; i++) {
                                        for (let j = 0; j < 3; j++) {
                                            const x = startX + j * cellSize;
                                            const y = startY + i * cellSize;
                                            try {
                                                context.drawImage(coordinate[i][j], x, y);
                                            } catch (error) {
                                                continue;
                                            }

                                        }
                                    }
                                    const callbackImage = await canvas.toBuffer('image/png');
                                    await session.send(h.image(callbackImage, 'image/png'))

                                } else {
                                    let coordinate = [
                                        ['囗', '囗', '囗'],
                                        ['囗', '囗', '囗'],
                                        ['囗', '囗', '囗'],
                                    ]
                                    game.gameState.player1MoveLog.forEach((movelog) => {
                                        coordinate[movelog.x - 1][movelog.y - 1] = '⚪';
                                    })
                                    game.gameState.player2MoveLog.forEach((movelog) => {
                                        coordinate[movelog.x - 1][movelog.y - 1] = '❌';
                                    })
                                    await session.send(`当前棋盘：
            ${coordinate[0][0]}${coordinate[0][1]}${coordinate[0][2]}
            ${coordinate[1][0]}${coordinate[1][1]}${coordinate[1][2]}
            ${coordinate[2][0]}${coordinate[2][1]}${coordinate[2][2]}
                                        `);
                                }
                                await gameOver(ctx, game, session);
                            } else return;
                        }
                    }

                }
            }


        )
    }

})
class ChessGame {
    player1: string;
    player2: string;
    gameState: {
        currentPlayer: string;
        gameOver: boolean;
        winner: string;
        player1MoveLog: any[];
        player2MoveLog: any[];
        roundLog: number[];
    };
    constructor(player1: string, player2: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameState = {
            currentPlayer: player1,
            gameOver: false,
            winner: null,
            player1MoveLog: [],
            player2MoveLog: [],
            roundLog: []
        };
    }
}

async function makeMove(move, game: ChessGame, session: Session<never, never>) {
    const currentPlayerMoveLog = game.gameState.currentPlayer === game.player1 ? game.gameState.player1MoveLog : game.gameState.player2MoveLog;
    const nextPlayerMoveLog = game.gameState.currentPlayer === game.player1 ? game.gameState.player2MoveLog : game.gameState.player1MoveLog;
    if (currentPlayerMoveLog.length < 1 && currentPlayerMoveLog === game.gameState.player1MoveLog) {
        currentPlayerMoveLog.push(move);
        return true;
    } else {
        if (!currentPlayerMoveLog.some(MoveLog => MoveLog.x == move.x && MoveLog.y == move.y) && !nextPlayerMoveLog.some(MoveLog => MoveLog.x == move.x && MoveLog.y == move.y)) {
            currentPlayerMoveLog.push(move)
            if (currentPlayerMoveLog.length >= 3) {
                const isWin = WINMODES.some(winMode =>
                    winMode.every(win =>
                        currentPlayerMoveLog.some(MoveLog =>
                            MoveLog.x == win.x && MoveLog.y == win.y
                        )
                    )
                )
                if (isWin) {
                    game.gameState.gameOver = true;
                    game.gameState.winner = game.gameState.currentPlayer;
                }
            }
            return true
        } else {
            await session.send('这个位置已经有棋子了');
            return false
        }
    }
    if (game.gameState.roundLog.length === 0 && currentPlayerMoveLog == game.gameState.player2MoveLog) {
        game.gameState.roundLog.push(1);
    } else if (currentPlayerMoveLog == game.gameState.player2MoveLog) {
        game.gameState.roundLog.push(game.gameState.roundLog[game.gameState.roundLog.length - 1] + 1);
    }
}

async function startChess(ctx: Context, chess: Chess[], session: Session<never, never>) {
    await ctx.database.set('chess', { $and: [{ playerB: session.userId }, { status: 0 }] }, { status: 1 });
    const player = await ctx.database.get('chess', { $and: [{ playerB: session.userId }, { status: 1 }] });
    await session.send(`Game Start~
    <at id="${player[0].playerA}"/>`);
    return createGame(player[0].playerA, player[0].playerB);
}
function createGame(player1: string, player2: string) {
    return new ChessGame(player1, player2);
}
async function gameOver(ctx: Context, game: ChessGame, session: Session<never, never>) {
    if (game.gameState.gameOver) {
        await ctx.database.set('chess', { $and: [{ status: 1 }, { $or: [{ playerA: game.player1 }, { playerB: game.player1 }] }] }, { status: 2, winner: game.gameState.currentPlayer });
        await session.send(`游戏已结束，胜利者:
         <at id="${game.gameState.winner}"/>`);
        await saveFile(game);
    } else if (game.gameState.player1MoveLog.length == 5) {
        await ctx.database.set('chess', { $and: [{ status: 1 }, { $or: [{ playerA: game.player1 }, { playerB: game.player1 }] }] }, { status: 2, winner: 'draw' });
        await session.send('游戏已结束，平局');
        await saveFile(game);
    } else {
        await session.send('轮到下一位选手');
        game.gameState.currentPlayer = (game.gameState.currentPlayer === game.player1) ? game.player2 : game.player1;
    }
}
async function saveFile(game) {
    await writeLock.create();
    console.log('开始保存复盘');
    const Gamejson = JSON.stringify(game);
    let savepath = path.join(__dirname, '../../../../data/chessDemo.json')
    try {
        fs.appendFile(savepath, game, 'utf-8', (err) => {
            if (err){
                console.log('写入失败')
            }else{
                console.log('写入成功')
            }
        })
    }
    catch (err) {
   
    } finally {
        writeLock.release();
    }

}
/*后续功能 复盘 赛后其他查胜率等 */