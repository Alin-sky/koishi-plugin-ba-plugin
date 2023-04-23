import { Schema } from "koishi";
export declare const name = "ba-plugin";
export interface Config {
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: any): Promise<void>;
