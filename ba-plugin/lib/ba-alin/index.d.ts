import { Context, Schema } from 'koishi';
import { Config } from '..';
export interface alinConfig {
    time: number;
}
export declare const alinConfig: Schema<alinConfig>;
export declare const alincloud = "http://124.221.99.85:8088/";
export declare const alinplugin: {
    apply(ctx: Context, config: Config): void;
};
