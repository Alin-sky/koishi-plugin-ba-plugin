import { Context, Schema } from 'koishi';
import { Config } from '..';
export declare const inject: string[];
export interface guide_qq {
    markdown_setting: {
        mdid: string;
        mdp1: string;
        mdp2: string;
        mdp3: string;
        mdp4: string;
        Bucketname: string;
        Region: string;
        SecretId: string;
        SecretKey: string;
    };
}
export interface guideConfig {
    avatar: boolean;
    logger: boolean;
    time: number;
    return: string;
    returnmd: string;
    timeout_text: string;
}
export declare const guide_qq: Schema<guide_qq>;
export declare const guideConfig: Schema<guideConfig>;
export declare const maxmap_sms = 25;
export declare const synonyms: {
    [key: string]: string[];
};
export declare const alincloud = "http://124.221.99.85:8088/";
export declare const FMPS_server_download = "http://124.221.198.113:9123/download/data/";
export declare const FMPS_server_list = "http://124.221.198.113:9123/download/";
export declare const guide_systeam: {
    apply(ctx: Context, config: Config): Promise<void>;
};
