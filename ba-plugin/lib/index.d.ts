import { Context, Schema } from 'koishi';
import { guildConfig } from './guild/index';
import { alinConfig } from './ba-alin';
import { gachaConfig } from './gacha/gacha';
export declare const name = "ba-plugin";
export declare const usage: string;
export interface Config {
    alin: alinConfig;
    gacha: gachaConfig;
    guild: guildConfig;
    group: string[];
    text: string;
    swit: boolean;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
