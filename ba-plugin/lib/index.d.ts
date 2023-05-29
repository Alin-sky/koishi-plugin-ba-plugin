import { Context, Schema } from 'koishi';
export declare const name = "ba-plugin";
export declare const usage: string;
export interface Config {
    server: number;
    JApersona: string;
    INpersona: string;
}
export declare const schema: Schema<Schemastery.ObjectS<{
    server: Schema<number, number>;
    JApersona: Schema<string, string>;
    INpersona: Schema<string, string>;
}>, Schemastery.ObjectT<{
    server: Schema<number, number>;
    JApersona: Schema<string, string>;
    INpersona: Schema<string, string>;
}>>;
export declare var jaup: any;
export declare var inup: any;
export declare function apply(ctx: Context, config: Config): void;
