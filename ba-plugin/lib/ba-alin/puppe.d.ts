import { Context, Schema } from 'koishi';
import { Config } from '..';
export interface alin_puppe {
    levelswit: boolean;
    type: number;
    backdrop_filter: number;
    backdrop_url: string;
}
export declare const alin_puppe: Schema<alin_puppe>;
export declare const using: readonly ["puppeteer"];
export declare const calculate_puppe: (ctx: Context, config: Config) => void;
