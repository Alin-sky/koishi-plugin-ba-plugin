import { Context } from 'koishi';
import { Config } from '..';
declare module 'koishi' {
    interface Tables {
        student: Student;
        bauser: BAUser;
    }
}
export interface Student {
    name: string;
    rare: number;
    IUP: boolean;
    JUP: boolean;
    url: string;
    id: number;
    limit: number;
    server: number;
}
export interface BAUser {
    name: string;
    userid: string;
    Istat: number;
    INstat: number;
    IUPstat: number;
    Jstat: number;
    JNstat: number;
    JUPstat: number;
    Istar: number;
    INstar: number;
    IUPstar: number;
    IUUPstar: number;
    Jstar: number;
    JNstar: number;
    JUPstar: number;
    JUUPstar: number;
}
export declare namespace DB {
    function stuTable(ctx: Context): Promise<void>;
    function stuUpdate(ctx: Context): Promise<void>;
    function BAUserTable(ctx: Context): Promise<void>;
    function setUP(ctx: Context, args: any[], config: Config): Promise<string>;
    function getUP(ctx: Context, args: any[], session: any): Promise<string>;
    function addStu(ctx: Context, args: any[]): Promise<any>;
    function delStu(ctx: Context, args: any[]): Promise<string>;
    function baStat(ctx: Context, user: any): Promise<Pick<BAUser, import("koishi").Keys<BAUser, any>>[]>;
    function setbauser(ctx: Context, session: any): Promise<void>;
    function clearTable(ctx: Context): Promise<void>;
    function showStu(ctx: Context): Promise<any[]>;
}
