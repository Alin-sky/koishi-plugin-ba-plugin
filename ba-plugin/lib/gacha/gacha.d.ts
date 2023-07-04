import { Context, Schema } from 'koishi';
export interface gachaConfig {
    '日服默认UP角色': string;
    '国际服默认UP角色': string;
    'UP★★★': number;
    '★★★': number;
    '★★': number;
    '★': number;
}
export declare const gachaConfig: Schema<gachaConfig>;
export declare function gachaProbability(config: gachaConfig): void;
export declare var path: any;
export declare function gachaPool(ctx: Context, temporary: any): Promise<void>;
export declare function gacha(ctx: Context, args: string[], user: string, UP: any): Promise<Map<any, any>>;
