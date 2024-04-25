
import { Context, Logger } from 'koishi';
import * as fs from 'fs/promises';
import * as path from 'path';

const log = "ba-plugin-FMPS";
const logger: Logger = new Logger(log);

const ctx = new Context();
//ba-plugin-FMPS-V1
//Alin's File Management and Processing System-beta

/**
 * koishi——data文件夹创建器，至多一个子文件夹
 * @param mainfile 主文件夹名称,
 * @param filename 子文件夹名称
 * @returns 文件夹路径
 */
export async function rootF(mainfile?, filename?) {
    const mfile = mainfile ? mainfile : 'bap-FMDS'
    const filepath = filename ? '/' + filename : '';
    let root: string;
    for (let i = 0; i < 3; i++) {
        try {
            root = path.join(ctx.baseDir, 'data', (mfile + filepath));
            await fs.mkdir(root, { recursive: true });
            break;
        } catch (error) {
            if (i == 2) {
                logger.info('尝试创建文件夹' + i + '次后依旧出错');
            }
        }
    }
    return root;
}


/**
 * 文件移动函数
 * @param lpath 需要移动的文件路径 
 * @param npath  要移动到的路径
 */
export async function move_file(lpath: string, npath: string) {
    try {
        const targetPath = path.join(npath, path.basename(lpath));
        await fs.rename(lpath, targetPath);
        console.log(`文件已移动到${targetPath}`);
    } catch (error) {
        console.error('移动文件时发生错误:', error);
        throw error;
    }
}

/**
 * 文件搜索器,判断文件是否存在
 * @param filePath 文件路径
 */

export async function file_search(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        // 如果没有错误，文件存在
        return true;
    } catch (error) {
        // 如果有错误，假设文件不存在
        return false;
    }
}
