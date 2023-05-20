import { Context, Schema } from 'koishi';
export declare const name = "ba-plugin";
export declare const usage: string;
export interface Config {
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context): void;
