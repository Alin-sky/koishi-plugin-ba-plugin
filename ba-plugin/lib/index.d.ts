import { Context, Schema } from 'koishi';
import { guildConfig } from './guild/index';
import { gachaConfig } from './gacha/gacha';
export declare const name = "ba-plugin";
export declare const usage: string;
export interface Config {
    gacha: gachaConfig;
    guild: guildConfig;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
