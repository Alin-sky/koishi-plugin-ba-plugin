import { Context, Schema } from "koishi";
import { Config } from '..';
export declare const inject: {
    required: string[];
};
export declare const using: string[];
export interface draw_config {
    modle: boolean;
}
export declare const draw_config: Schema<draw_config>;
export declare const plugin_ass: string[];
export declare function cal_favorable(ctx: Context, config: Config): Promise<void>;
