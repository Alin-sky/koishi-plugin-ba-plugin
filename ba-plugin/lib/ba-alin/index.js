"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alinplugin = exports.alincloud = void 0;
//import区域
const koishi_1 = require("koishi");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const path_2 = require("path");
var uurl = '';
//声明服务器
exports.alincloud = 'http://124.221.99.85:8088/';
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/';
const laocloud = 'https://bawiki.lgc2333.top/img/';
const url1 = 'https://arona.diyigemt.com/api/v1/image';
const cdn1 = 'https://arona.cdn.diyigemt.com/image';
exports.alinplugin = ({
    apply(ctx, config) {
        uurl = exports.alincloud;
        console.log(uurl);
        console.log('已设置1服务器');
        //攻略系统&&角色评分系统
        ctx.command('攻略', "bawiki的攻略图和角色评分")
            .alias('杂图')
            .alias('查询')
            .alias('评测')
            .alias('测评')
            .alias('评分')
            .alias('角评')
            .alias('角色评分')
            .usage("发送“攻略”查看具体使用方法")
            .example('攻略 千里眼')
            .action(async ({ session }, ...args) => {
            if ((args[0]) == null) {
                return '使用方法：\n' +
                    '·发送：攻略+空格+内容 调用AronaBot的数据\n' +
                    '·发送：攻略+空格+随机表情 随机抽取社团聊天表情\n' +
                    '·发送：攻略+空格+随机漫画 随机抽取ba官方漫画\n' +
                    "攻略数据来源于：\n" +
                    '-doc.arona.diyigemt.com 【AronaBot】\n' +
                    "-ba.gamekee.com 【bawiki】\n" +
                    "-nonebot-plugin-bawiki的数据库\n" +
                    "角色名称缺失和错误可以去GitHub反馈喵 \n";
            }
            else {
                if ((args[0]) === '1') {
                    uurl = exports.alincloud;
                    return '已设置1服务器';
                }
                if ((args[0]) === '2') {
                    uurl = laocdn;
                    return '已设置2服务器';
                }
                if ((args[0]) === '3') {
                    uurl = laocloud;
                    return '已设置3服务器';
                }
                ;
                if ((args[0]) === '随机表情' || (args[0]) === '抽表情') {
                    let random = Math.floor(Math.random() * 75) + 1;
                    let random1 = random.toString().padStart(2, '0');
                    return ((0, koishi_1.h)('image', { url: uurl + 'emoji/' + 'Clanchat_Emoji_' + random1 + '_Tw' + '.png' }));
                }
                if ((args[0]) === '随机漫画' || (args[0]) === '抽漫画') {
                    let random = Math.floor(Math.random() * 230) + 1;
                    let random1 = random.toString().padStart(4, '1');
                    return ((0, koishi_1.h)('image', { url: exports.alincloud + 'comic/' + random1 + '.jpg' }));
                }
                if ((args[0]) === '千里眼' || (args[0]) === '国际服千里眼') {
                    return ((0, koishi_1.h)('image', { url: "https://cdnimg.gamekee.com/wiki2.0/images/w_2500/h_5336/829/43637/2023/6/10/585780.png" }));
                }
                /*
                function old (){
                for (const obj of data1) {
                  if (obj.name === args[0]) {
                    return h('image', { url: obj.link[0] })
                  }
                };
                for (const obj of data) {
                  if (obj.name === args[0]) {
                    return h('image', { url: uurl + 'student/' + obj.link[0] + '.png' })
                  }
                }
                for (const obj of data) {
                  if (obj.name != args[0]) {
                    let nullname =[
                      "呜呜，没有找到对应攻略图，换个名称试试吧。",
                      "呜呜，好像名字不对＞﹏＜",
                      "啊勒？没找到攻略图...呜呜",
                      "呜呜，没有对应图图"
                    ]
                    let ran = nullname[Math.floor(Math.random()*nullname.length)]
                    return ran
                  }
                }
              }
              */
                //新攻略匹配系统
                //图图下载函数
                function saveimg(url, path) {
                    const file = fs_1.default.createWriteStream(path, { encoding: 'binary' });
                    https_1.default.get(url, (response) => {
                        response.setEncoding('binary');
                        response.on('data', (chunk) => {
                            file.write(chunk);
                        });
                        response.on('end', () => {
                            file.end();
                            console.log(`图片保存成功： ${url} ||||| ${path}`);
                        });
                    });
                }
                var outstu = (await ctx.http.get(url1 + '?name=' + args[0], { responseType: "json" }));
                saveimg((cdn1 + outstu.data[0].path), (path_1.default.resolve(__dirname) + (outstu.data[0].hash) + '.png'));
                //文件修改系统
                function data1() {
                    let oldpath = (path_1.default.resolve(__dirname) + outstu.data[0].hash + '.png');
                    let newpath = (path_1.default.resolve(__dirname) + "\\" + outstu.data[0].hash + '.png');
                    fs_1.default.rename(oldpath, newpath, (err) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log("文件位置和名称已更改");
                        }
                    });
                }
                data1();
                console.log(outstu);
                if (outstu.status == 200) {
                    //返回
                    setTimeout(() => {
                        data1();
                    }, 600);
                    setTimeout(() => {
                        session.send(koishi_1.h.image((0, url_1.pathToFileURL)((0, path_2.resolve)(__dirname, `${outstu.data[0].hash}.png`)).href));
                    }, 1200);
                    //土方法的模糊匹配api
                }
                else {
                    session.send('呜呜，没有找到对应攻略，\n'
                        + '你要找的是这些吗？可以发送以下名称的序号来查看\n'
                        + '1 ' + outstu.data[0].name + '\n'
                        + '2 ' + outstu.data[1].name + '\n'
                        + '3 ' + outstu.data[2].name + '\n'
                        + '4 ' + outstu.data[3].name + '\n');
                    let timeout = 10000; //10s
                    let obj = await session.prompt(timeout);
                    if (!obj) {
                        session.send('呜呜，等待超时，请重新触发指令');
                    }
                    //匹配返图
                    if (['1', '2', '3', '4'].includes(obj)) {
                        let numb = parseInt(obj);
                        numb--;
                        let outstu1 = (await ctx.http.get(url1 + '?name=' + outstu.data[numb].name, { responseType: "json" }));
                        saveimg((cdn1 + outstu1.data[0].path), (path_1.default.resolve(__dirname) + (outstu1.data[0].hash) + '.png'));
                        datafs();
                        //文件修改系统
                        function datafs() {
                            let oldpath = (path_1.default.resolve(__dirname) + outstu1.data[0].hash + '.png');
                            let newpath = (path_1.default.resolve(__dirname) + "\\" + outstu1.data[0].hash + '.png');
                            fs_1.default.rename(oldpath, newpath, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                                else {
                                    console.log("文件位置和名称已更改");
                                    fs_1.default.unlink(oldpath, (err) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        else {
                                            console.log("文件已删除");
                                        }
                                    });
                                }
                            });
                        }
                        //延时返回
                        setTimeout(() => {
                            datafs();
                        }, 600);
                        setTimeout(() => {
                            session.send(koishi_1.h.image((0, url_1.pathToFileURL)((0, path_2.resolve)(__dirname, `${outstu1.data[0].hash}.png`)).href));
                        }, 1200);
                    }
                    else {
                        return '输入错误，请重新输入';
                    }
                }
                //尾巴1
            }
        });
        //尾巴2
    }
});
