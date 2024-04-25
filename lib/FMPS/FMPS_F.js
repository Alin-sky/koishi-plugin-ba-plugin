"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_search = exports.move_file = exports.rootF = void 0;
const koishi_1 = require("koishi");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const log = "ba-plugin-FMPS";
const logger = new koishi_1.Logger(log);
const ctx = new koishi_1.Context();
//ba-plugin-FMPS-V1
//Alin's File Management and Processing System-beta
/**
 * koishi——data文件夹创建器，至多一个子文件夹
 * @param mainfile 主文件夹名称,
 * @param filename 子文件夹名称
 * @returns 文件夹路径
 */
async function rootF(mainfile, filename) {
    const mfile = mainfile ? mainfile : 'bap-FMDS';
    const filepath = filename ? '/' + filename : '';
    let root;
    for (let i = 0; i < 3; i++) {
        try {
            root = path.join(ctx.baseDir, 'data', (mfile + filepath));
            await fs.mkdir(root, { recursive: true });
            break;
        }
        catch (error) {
            if (i == 2) {
                logger.info('尝试创建文件夹' + i + '次后依旧出错');
            }
        }
    }
    return root;
}
exports.rootF = rootF;
/**
 * 文件移动函数
 * @param lpath 需要移动的文件路径
 * @param npath  要移动到的路径
 */
async function move_file(lpath, npath) {
    try {
        const targetPath = path.join(npath, path.basename(lpath));
        await fs.rename(lpath, targetPath);
        console.log(`文件已移动到${targetPath}`);
    }
    catch (error) {
        console.error('移动文件时发生错误:', error);
        throw error;
    }
}
exports.move_file = move_file;
/**
 * 文件搜索器,判断文件是否存在
 * @param filePath 文件路径
 */
async function file_search(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        // 如果没有错误，文件存在
        return true;
    }
    catch (error) {
        // 如果有错误，假设文件不存在
        return false;
    }
}
exports.file_search = file_search;
