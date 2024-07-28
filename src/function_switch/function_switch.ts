import { Context, Logger, Schema } from "koishi";
import { } from "@satorijs/adapter-qq";
import { Config } from '..';


export const inject = { required: ['canvas', 'database'] }

const logg = "ba-plugin-func_switch"
const log: Logger = new Logger(logg)

//表
declare module 'koishi' {
    interface Tables {
        bap_fswith: bap_fswith
    }
}

export interface bap_fswith {
    id: string
    guild_id: number
    gacha:string
    manga:string
}

export async function func_switch(ctx: Context, config: Config) {
    ctx.model.extend('bap_fswith', {
        id: 'string',
        guild_id: 'integer',
        gacha: 'string',
        manga: 'string',
    })
}
//先预留，之后看情况写
