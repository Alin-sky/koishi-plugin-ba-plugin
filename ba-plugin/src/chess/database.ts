import { Context } from 'koishi'
declare module 'koishi' {
  interface Tables {
    chess: Chess
  }
}
export interface Chess {
  chessId: string
  status: number //棋局状态 0预备，1进行，2结束，3废弃
  playerA: string
  playerB: string
  oneP: string
  twoP: string
  round: number
  down: string
  outcome: string
  id: number
  pieces: string[]
  winner: string
}

export module DB {
  export async function initialChessTable(ctx: Context) {
    if (ctx.model.tables.chess == undefined) {
      ctx.model.extend('chess', {
        chessId: { type: 'string' },
        status: { type: 'integer', initial: 0, length: 1 },
        playerA: 'string',
        playerB: 'string',
        winner: 'string'
      }, {
        primary: 'chessId'
      })
    }
  }
  //清理棋局
  export async function clearChess(ctx: Context) {
    const data = await ctx.database.get('chess', { $or: [{ status: 1 }, { status: 0 }] })
    if (data.length > 0) await ctx.database.set('chess', { $or: [{ status: 1 }, { status: 0 }] }, { status: 3 })
  }
  //创建棋局
  export async function CreateChess(ctx: Context, session, at) {
    const Id = await ctx.model.get('chess', {}, ['chessId'])
    let chessId = `${session.userId}To${at}:${Id.length}`
    await ctx.database.create('chess', { chessId: chessId, status: 0, playerA: session.userId, playerB: at })
  }
  //获取当前进行游戏
  export async function getNowChess(ctx: Context, player: string) {
    return await ctx.database.get('chess', { $and: [{ $or: [{ playerB: player }, { playerA: player }] }, { $or: [{ status: 1 }, { status: 0 }] }] })
  }
  //获取当前选手
  export async function queryChess(ctx: Context, session, ...args) {
    if (args[0] === "playerA") return await ctx.database.get('chess', { $and: [{ status: 0 }, { playerA: session.userId },] })
    else if (args[0] === "playerB") return await ctx.database.get('chess', { $and: [{ status: 0 }, { playerB: session.userId }] })
    else return await ctx.database.get('chess', { $and: [{ status: 1 }, { $or: [{ playerB: session.userId }, { playerA: session.userId }] }] })
  }
  //取消游戏
  export async function cancelChess(ctx: Context, session, player) {
    if (player === "playerA") await ctx.database.set('chess', { $and: [{ playerA: session.userId }, { status: 0 }] }, { status: 4 })
    else if (player === "playerB") await ctx.database.set('chess', { $and: [{ playerB: session.userId }, { status: 0 }] }, { status: 4 })
  }
  //获取准备中游戏
  export async function readyChess(ctx: Context, session, player) {
    if (player === "playerA") return await ctx.database.get('chess', { $and: [{ playerA: session.userId }, { status: 0 }] })
    else if (player === "playerB") return await ctx.database.get('chess', { $and: [{ playerB: session.userId }, { status: 0 }] })
  }
}
