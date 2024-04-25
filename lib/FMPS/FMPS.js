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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMPS = void 0;
const koishi_1 = require("koishi");
const console_1 = require("console");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const zh_cn_1 = __importDefault(require("zh_cn"));
const chinese_s2t_pro_1 = require("chinese-s2t-pro");
const cos_nodejs_sdk_v5_1 = __importDefault(require("cos-nodejs-sdk-v5"));
//ba-plugin-FMPS-V1
//Alin's File Management and Processing Systems v1.0-beta 2024-04-05 
//koishi api versions 
const schale_db_url = 'https://schale.gg/data/';
const log1 = "ba-plugin-FMPS";
const logger = new koishi_1.Logger(log1);
const student_data_cn = 'https://schale.gg/data/cn/students.json';
const student_data_jp = 'https://schale.gg/data/jp/students.json';
const student_data_tw = 'https://schale.gg/data/tw/students.json';
const student_data_kr = 'https://schale.gg/data/kr/students.json';
const student_data_zh = 'https://schale.gg/data/zh/students.json';
class FMPS {
    ctx;
    constructor(ctx) {
        this.ctx = ctx; // ctx
    }
    /**
     * 服务器选择函数，待写
     *     async server_selection() {

    }
     */
    /**
     * json解析函数
     * @param path json文件的路径
     * @returns 解析后的JSON对象或在出错时返回null
     */
    async json_parse(path) {
        const attempts = 3;
        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                const data = await fs.promises.readFile(path, { encoding: 'utf-8' });
                return JSON.parse(data);
            }
            catch (error) {
                logger.info(`尝试读取${path}失败，尝试次数：${attempt}`);
                if (attempt === attempts) {
                    logger.info(`尝试${attempt}次后依旧报错，停止尝试`);
                    return null; // 达到最大尝试次数，返回null
                }
                await new Promise(resolve => setTimeout(resolve, 500)); // 等待0.5s再次尝试
            }
        }
        return null; // 理论上不会执行到这里，但为了类型安全添加
    }
    /**
     * json文件创建函数
     * @param path 生成文件存放的路径
     * @param fname 文件名
     * @param json 传入的内容
     * @returns 返回文件路径
     */
    async json_create(dirPath, fname, json) {
        // 确保文件名以 .json 结尾
        if (!fname.endsWith('.json')) {
            fname += '.json';
        }
        // 构造完整的文件路径
        const filePath = path.join(dirPath, fname);
        // 将 JSON 对象转换为字符串
        const data = JSON.stringify(json, null, 2);
        // 异步写入文件
        await fs.promises.writeFile(filePath, data, 'utf8');
        // 返回文件路径
        return filePath;
    }
    /**
     * buffer图像储存函数
     * @param buffer 传入的buffer
     * @param dirpath 要保存到的路径
     * @param fname 文件名，带格式
     */
    async img_save(buffer, dirpath, fname) {
        try {
            // 确保目录存在，如果不存在则创建
            if (!fs.existsSync(dirpath)) {
                fs.mkdirSync(dirpath, { recursive: true });
            }
            // 构建完整的文件路径
            const filePath = path.join(dirpath, fname);
            // 将buffer写入文件
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    logger.info("出现错误：" + err);
                }
                else {
                    return filePath;
                }
            });
        }
        catch (e) {
            logger.info("出现错误：" + e);
        }
    }
    /**
     * 文件下载函数
     * @param url 传入下载的链接
     * @param dirPath 完整的文件存放的路径
     * @param fname 带拓展名的文件名
     */
    async file_download(url, dirPath, fname) {
        for (let i = 1; i <= 3; i++) {
            try {
                const response = await this.ctx.http.get(url, { responseType: 'arraybuffer' }); // 使用axios配置
                const buffer = Buffer.from(response); // response.data已经是ArrayBuffer
                const fullPath = path.join(dirPath, fname);
                // 确保目录存在
                await fs.promises.mkdir(dirPath, { recursive: true });
                // 将Buffer写入文件
                await fs.promises.writeFile(fullPath, buffer);
                //logger.info("文件下载成功");
                break; // 成功后退出循环
            }
            catch (error) {
                const status = error.response ? error.response.status : '无法获取';
                logger.info(`文件下载出现错误，进行第${i}次尝试: 
                Error: HTTP error! status: ${status}
                url:${url}
                `);
                if (i === 3) {
                    logger.info(`${i}次尝试后依旧出错😭`);
                    return error;
                }
            }
        }
    }
    /**
     * 模仿饼干🍪佬的自动补齐换皮别名和拼英
     * @param text 传入文本
     * @returns
     */
    complete_alias(text) {
        let o = [
            ["水", '水着', '泳装'],
            ["私服", '便服'],
            ["兔", '兔女郎'],
            ["温泉"],
            ["新年", "春", "正月"],
            ["应援", "拉拉", '应援团', "啦啦"],
            ["圣诞", "圣诞节"],
            ['妹抖', "女仆"],
            ["体操服", "体操", "运动", '体', "运动服"],
            ["单车", "骑行"],
            ['野营', "露营"],
            ["幼女", "幼", "铜", "小"],
            ['礼', "礼服"],
            ["新年", "春", "正月"],
            ['导游', "导"],
            ['乐队',]
        ];
        function conversions_pinyin(input) {
            // 将全角括号转换为半角括号
            input = input.replace(/（/g, '(').replace(/）/g, ')');
            // 匹配所有汉字以及括号内的内容
            const parts = input.split(/(\([^)]+\))/g);
            let result = '';
            parts.forEach(part => {
                if (part.startsWith('(') && part.endsWith(')')) {
                    // 如果是括号内的内容，去掉括号，转换为拼音，再加上括号
                    const content = part.slice(1, -1); // 去掉括号
                    const pinyinArray = (0, zh_cn_1.default)(content, { style: zh_cn_1.default.STYLE_NORMAL });
                    result += '(' + pinyinArray.join('') + ')';
                }
                else {
                    // 如果是汉字，转换为拼音
                    const pinyinArray = (0, zh_cn_1.default)(part, { style: zh_cn_1.default.STYLE_NORMAL });
                    result += pinyinArray.join('');
                }
            });
            return result;
        }
        const regex = /\(([^)]+)\)/g;
        const matches = text.match(regex);
        const names = text.split(/\([^)]+\)/);
        let extractedText = '';
        let output = [conversions_pinyin(text)];
        const type = [
            '泳装', '便服', '兔女郎',
            '温泉', '新年', '应援团',
            '圣诞节', '女仆', '运动服',
            '骑行', '露营', "小",
            '礼服', '正月', "导游", "乐队"
        ];
        if (matches) {
            for (const match of matches) {
                // 移除括号，只保留括号内的内容
                extractedText = match.slice(1, -1);
            }
        }
        if (type.includes(extractedText)) {
            let i = type.indexOf(extractedText);
            for (let ii = 0; ii < o[i].length; ii++) {
                output.push((names[0] + o[i][ii]));
                output.push((o[i][ii] + names[0]));
            }
            return output;
        }
        else {
            return output;
        }
    }
    /**
     * 学生json数据的自动创建函数，爬取db
     * @param root 存储json文件的路径
     */
    async match_auto_update(root) {
        const startTime = new Date().getTime();
        logger.info('正在进行本地学生数据更新...');
        const studata_cn = await this.ctx.http.get(student_data_cn);
        const studata_jp = await this.ctx.http.get(student_data_jp);
        const studata_kr = await this.ctx.http.get(student_data_kr);
        const studata_tw = await this.ctx.http.get(student_data_tw);
        const studata_zh = await this.ctx.http.get(student_data_zh);
        let arry = [];
        let nicname = await this.ctx.http.get('https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2Fsms_studata_main.json');
        try {
            for (let i = 0; i < studata_cn.length; i++) {
                let nic = [];
                let twtxt;
                let alias_cn = this.complete_alias((studata_cn[i].Name).replace(/（/g, '(').replace(/）/g, ')'));
                let alias_in = this.complete_alias((studata_tw[i].Name).replace(/（/g, '(').replace(/）/g, ')'));
                let nameEn = studata_cn[i].PathName;
                //暂时性的繁简互换方案
                if ((studata_jp[i].Name) == studata_tw[i].Name || studata_tw[i].Name == '') {
                    twtxt = (0, chinese_s2t_pro_1.simpleLine2TL)(studata_cn[i].Name);
                    twtxt = twtxt.replace(/（/g, '(').replace(/）/g, ')');
                }
                else {
                    twtxt = (studata_tw[i].Name).replace(/（/g, '(').replace(/）/g, ')');
                }
                if (nameEn.includes('_')) {
                    nameEn = nameEn.replace(/_(.+)/, ' (\$1)');
                }
                if (!nicname[i] || !nicname[i].NickName) {
                    try {
                        for (let i = 0; i < alias_cn.length; i++) {
                            nic.push(alias_cn[i]);
                        }
                    }
                    catch (error) {
                        logger.info('数据更新时发生错误-', error);
                    }
                }
                else {
                    nic = nicname[i].NickName;
                    for (let i = 0; i < alias_cn.length; i++) {
                        if (!nic.includes(alias_cn[i])) {
                            nic.push(alias_cn[i]);
                        }
                    }
                }
                arry.push({
                    "Id": (10000 + i).toString(),
                    "Id_db": studata_cn[i].Id,
                    "FirstName_jp": studata_jp[i].FamilyName,
                    "FirstName_zh": studata_cn[i].FamilyName,
                    "Name_jp": (studata_jp[i].Name).replace(/（/g, '(').replace(/）/g, ')'),
                    "Name_en": nameEn,
                    "Name_zh_tw": twtxt,
                    "Name_kr": studata_kr[i].Name,
                    "Name_zh_cn": (studata_cn[i].Name).replace(/（/g, '(').replace(/）/g, ')'),
                    "Name_zh_ft": (studata_zh[i].Name).replace(/（/g, '(').replace(/）/g, ')'),
                    "NickName": nic
                });
            }
        }
        catch (error) {
            logger.info('数据更新时发生错误', error);
        }
        const jsonString = JSON.stringify(arry, null, 2); // 使用缩进美化
        fs.writeFile(`${root}/sms_studata_main.json`, jsonString, (err) => {
            if (err) {
                logger.info('数据更新时发生错误', console_1.error);
            }
            else {
                const endTime = new Date().getTime(); // 获取结束时间的毫秒表示
                logger.info('数据更新完毕,用时' + ((endTime - startTime) * 0.001) + '秒');
            }
        });
    }
    /**
     * 芝士自动生成sanae match to arona键值表的函数
     * @param root 文件夹路径
     */
    async sanae_match_refinement(root) {
        const startTime = new Date().getTime();
        var arrys = [];
        const studata_zh = await this.ctx.http.get(student_data_zh);
        try {
            let extractedText = '';
            let to_arona_name = '';
            const type = [
                '泳装', '便服', '兔女郎',
                '温泉', '新年', '应援团',
                '圣诞节', '女仆', '运动服',
                '骑行', '露营', "幼女",
                '礼服', '正月', "导游", "乐队"
            ];
            const regex = /\(([^)]+)\)/g;
            const supplementary_name = await this.json_parse(root + '/sms_to_arona_data_revisions.json');
            let ss = 0;
            for (let i = 0; i < studata_zh.length; i++) {
                const db_name = (studata_zh[i].Name).replace(/（/g, '(').replace(/）/g, ')');
                const matches = db_name.match(regex);
                const names = db_name.split(/\([^)]+\)/);
                if (matches) {
                    for (const match of matches) {
                        //括号内(换皮)的内容
                        extractedText = match.slice(1, -1);
                    }
                    let i = type.indexOf(extractedText);
                    to_arona_name = (type[i] + names[0]);
                }
                else {
                    to_arona_name = names[0];
                }
                if (supplementary_name[ss].Id == (10000 + i).toString()) {
                    to_arona_name = supplementary_name[ss].MapName;
                    ss == ((supplementary_name.length) - 1) ? ss = ((supplementary_name.length) - 1) : ss++;
                }
                arrys.push({
                    "Id": (10000 + i).toString(),
                    "Id_db": studata_zh[i].Id,
                    "MapName": to_arona_name
                });
            }
        }
        catch (error) {
            logger.info('数据更新时发生错误-sanae_match_refinement', error);
        }
        const jsonString = JSON.stringify(arrys, null, 2); // 使用缩进美化
        fs.writeFile(`${root}/sms_studata_toaro_stu.json`, jsonString, (err) => {
            if (err) {
                logger.info('数据更新时发生错误', console_1.error);
            }
            else {
                const endTime = new Date().getTime(); // 获取结束时间的毫秒表示
                logger.info('sanae_match_to_arona_data数据生成完毕,用时' + ((endTime - startTime) * 0.001) + '秒');
            }
        });
    }
    /**
     * 检测to arona部分的数据是否是精确匹配
     * @param sms_arona 传入sanae match systeam to arona data的json，使用json_parse解析
     */
    async name_detection(sms_arona, type) {
        let key;
        let errnum = 0;
        if (type == 1) {
            key = "MapName";
        }
        else if (type == 2) {
            key = "Name";
        }
        const startTime = new Date().getTime();
        try {
            for (let i = 0; i < sms_arona.length; i++) {
                const url = 'https://arona.diyigemt.com/api/v2/image?name=' + sms_arona[i][key];
                let arona = await this.ctx.http.get(url);
                if (arona.code == 101) {
                    errnum++;
                    logger.info(`名称检测中发现有未精确匹配：
                    学生名称：${sms_arona[i][key]}
                    id:${i}
                    URL: ${url}
                    arona.code:${arona.code}
                    `);
                    logger.info('Arona return: ' + arona);
                    console.log(arona);
                }
            }
            const endTime = new Date().getTime(); // 获取结束时间的毫秒表示
            if (errnum != 0) {
                logger.info('⚠️ sanae_match_to_arona_data数据检测完毕，发现' + errnum + '个问题,用时' + ((endTime - startTime) * 0.001) + '秒');
            }
            else {
                logger.info('🟢 sanae_match_to_arona_data数据检测完毕，未发现问题,用时' + ((endTime - startTime) * 0.001) + '秒');
            }
        }
        catch (error) {
            logger.info('数据检测中发生错误：', error);
        }
    }
    /**
     * 攻略系统的图片下载和调用函数
     * @param folderPath 传入的文件夹目录（一般是root）
     * @param imageUrl 图片url
     * @param imageName 图片名称，一般是哈希值
     * @param loggers 是否开日志
     */
    async guide_download_image(folderPath, imageUrl, imageName, loggers) {
        const imagePath = path.join(folderPath, imageName + '.jpg');
        if (fs.existsSync(imagePath)) {
            loggers ? logger.info('🟢 文件已存在，使用本地文件') : '';
        }
        else {
            for (let i = 1; i < 4; i++) {
                try {
                    // 下载图片
                    const response = await this.ctx.http.get(imageUrl, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(response); // 修改这里
                    // 确保目录存在
                    await fs.promises.mkdir(folderPath, { recursive: true });
                    // 将Buffer写入文件
                    await fs.promises.writeFile(imagePath, buffer);
                    loggers ? logger.info('图片文件未找到，已成功下载 ⬇️') : '';
                    break;
                }
                catch (error) {
                    const status = error.response ? error.response.status : '无法获取';
                    logger.info(`文件下载出现错误，进行第${i}次尝试: Error: HTTP error! status: ${status}`);
                    if (i === 3) {
                        logger.info(`${i}次尝试后依旧出错😭`);
                    }
                }
            }
        }
        // 返回图片路径
        return imagePath;
    }
    /**
     * 文件删除函数
     * @param dirPath 文件夹路径
     * @param file 文件名称，缺省时将删除文件夹内全部内容
     */
    async file_delete(dirPath, file) {
        const fs = require('fs').promises;
        if (file) {
            const filePath = path.join(dirPath, file);
            try {
                await fs.unlink(filePath);
                logger.info(`文件 ${filePath} 已被删除`);
            }
            catch (error) {
                logger.info(`删除文件时出错: ${error}`);
            }
        }
        else {
            try {
                await fs.rmdir(dirPath, { recursive: true });
                logger.info(`目录 ${dirPath} 及其内容已被删除`);
            }
            catch (error) {
                logger.info(`删除目录时出错: ${error}`);
            }
        }
    }
    /**
     * cos的文件上传函数
     * @param bucketName 桶名
     * @param region 桶地域
     * @param objectKey 上传到 COS 的文件名
     * @param filePath 上传到 COS 的文件路径
     * @param SecretId
     * @param SecretKey
     * @returns
     */
    async uploadFile(bucketName, region, objectKey, file_buffer, SecretId, SecretKey) {
        const cos = new cos_nodejs_sdk_v5_1.default({
            SecretId: SecretId,
            SecretKey: SecretKey
        });
        try {
            return await new Promise((resolve, reject) => {
                cos.putObject({
                    Bucket: bucketName,
                    Region: region,
                    Key: ('mddata/' + objectKey),
                    Body: file_buffer,
                    onProgress: function (progressData) {
                        console.log(JSON.stringify(progressData));
                    }
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
exports.FMPS = FMPS;
