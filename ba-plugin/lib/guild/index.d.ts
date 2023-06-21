/**
 * q
 */
import { Context, Schema } from "koishi";
import { Config } from "..";
export interface guildConfig {
    hour: number;
    整活用群号: string;
}
export declare const guildConfig: Schema<guildConfig>;
export declare const guildPlugin: {
    apply(ctx: Context, config: Config): void;
};
export declare function gachaGroup(session: any, config: Config): Promise<string>;
