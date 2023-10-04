import { Context, Eval } from 'koishi'
declare module 'koishi' {
  interface Tables {
    chess: Chess
  }
}
export interface Chess {
  chessId: number
  status: number
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
        chessId: { type: 'integer' },
        status: { type: 'integer', initial: 0, length: 1 },
        playerA: 'string',
        playerB: 'string',
        winner: 'string'
      }, {
        primary: 'chessId',
        autoInc: true
      });
    }
  }
  export async function clearChess(ctx: Context) {
    let connected = false;
    while (!connected) {
      if (ctx.database == null) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        connected = true;
        const data = await ctx.database.get('chess', { $or: [{ status: 1 }, { status: 0 }] });
        if (data.length > 0) {
          await ctx.database.set('chess', { $or: [{ status: 1 }, { status: 0 }] }, { status: 3 });
        }
      }
    }
  }

  export async function CreateChess(ctx, session, at) {
    await ctx.database.create('chess', { status: 0, playerA: session.userId, playerB: at });
  }
  export async function getChess(ctx, session) {
    await ctx.database.get('chess',{ userid: session.userId },{ 'value': { $add: [{ $: 'value' }, 1] } });
  }
  export async function queryChessA(ctx, session) {
    return await ctx.database.get('chess', { $and: [{ status: 0 }, { playerA: session.userId }] });
  }
  export async function queryChessB(ctx, session) {
    return await ctx.database.get('chess', { $and: [{ status: 0 }, { playerB: session.userId }] });
  }
  export async function queryChessN(ctx, session) {
    return await ctx.database.get('chess', { $and: [{ status: 1 }, { $or: [{ playerB: session.userId }, { playerA: session.userId }] }] });
  }
}
