/// <reference types="node" />
import { Context } from "koishi";
export interface UploadResult {
    Location: string;
    ETag: string;
    Bucket: string;
    Key: string;
}
export declare class FMPS {
    private ctx;
    constructor(ctx: Context);
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
    json_parse(path: string): Promise<any | null>;
    /**
     * json文件创建函数
     * @param path 生成文件存放的路径
     * @param fname 文件名
     * @param json 传入的内容
     * @returns 返回文件路径
     */
    json_create(dirPath: string, fname: string, json: any): Promise<string>;
    /**
     * buffer图像储存函数
     * @param buffer 传入的buffer
     * @param dirpath 要保存到的路径
     * @param fname 文件名，带格式
     */
    img_save(buffer: Buffer, dirpath: string, fname: string): Promise<void>;
    /**
     * 文件下载函数
     * @param url 传入下载的链接
     * @param dirPath 完整的文件存放的路径
     * @param fname 带拓展名的文件名
     */
    file_download(url: string, dirPath: string, fname: string): Promise<void>;
    /**
     * 模仿饼干🍪佬的自动补齐换皮别名和拼英
     * @param text 传入文本
     * @returns
     */
    complete_alias(text: string): string[];
    /**
     * 学生json数据的自动创建函数，爬取db
     * @param root 存储json文件的路径
     */
    match_auto_update(root: string): Promise<void>;
    /**
     * 芝士自动生成sanae match to arona键值表的函数
     * @param root 文件夹路径
     */
    sanae_match_refinement(root: string): Promise<void>;
    /**
     * 检测to arona部分的数据是否是精确匹配
     * @param sms_arona 传入sanae match systeam to arona data的json，使用json_parse解析
     */
    name_detection(sms_arona: any, type: any): Promise<void>;
    /**
     * 攻略系统的图片下载和调用函数
     * @param folderPath 传入的文件夹目录（一般是root）
     * @param imageUrl 图片url
     * @param imageName 图片名称，一般是哈希值，没有拓展名
     * @param loggers 是否开日志
     */
    guide_download_image(folderPath: string, imageUrl: string, imageName: string, loggers?: boolean): Promise<string>;
    /**
     * 文件删除函数
     * @param dirPath 文件夹路径
     * @param file 文件名称，缺省时将删除文件夹内全部内容
     */
    file_delete(dirPath: string, file?: string): Promise<void>;
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
    uploadFile(bucketName: string, region: string, objectKey: string, file_buffer: Buffer, SecretId: string, SecretKey: string): Promise<UploadResult>;
}
