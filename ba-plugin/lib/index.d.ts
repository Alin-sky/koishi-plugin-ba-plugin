import { Context, Schema } from 'koishi';
export declare const name = "ba-plugin";
export declare const usage: string;
export declare var jaup: any;
export declare var inup: any;
export interface Config {
    server: number;
    JApersona: string;
    INpersona: string;
}
export declare const schema: Schema<Schemastery.ObjectS<{
    JApersona: Schema<string, string>;
    INpersona: Schema<string, string>;
    server: Schema<number, number>;
}>, Schemastery.ObjectT<{
    JApersona: Schema<string, string>;
    INpersona: Schema<string, string>;
    server: Schema<number, number>;
}>>;
export declare function apply(ctx: Context, config: Config): void;
