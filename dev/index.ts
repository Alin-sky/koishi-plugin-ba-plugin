//import区域
import { Context, Schema, h, Command } from 'koishi';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { Config } from '..';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { pathToFileURL } from 'url'
import { resolve } from 'path'



var uurl = ''
//声明服务器
export const alincloud = 'http://124.221.99.85:8088/'
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/'
const laocloud = 'https://bawiki.lgc2333.top/img/'
const url1 = 'https://arona.diyigemt.com/api/v1/image'
const cdn1 = 'https://arona.cdn.diyigemt.com/image'

export const alinplugin = ({
  apply(ctx: Context, config: Config) {
    uurl = alincloud
    console.log(uurl)
    console.log('已设置1服务器')


    //攻略系统&&角色评分系统
    ctx.command('攻略', "Arona的攻略图")
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
            "角色名称缺失和错误可以去GitHub反馈喵 \n"
        } else {
          if ((args[0]) === '1') {
            uurl = alincloud
            return '已设置1服务器'
          }
          if ((args[0]) === '2') {
            uurl = laocdn
            return '已设置2服务器'
          }
          if ((args[0]) === '3') {
            uurl = laocloud
            return '已设置3服务器'
          };

          if ((args[0]) === '随机表情' || (args[0]) === '抽表情') {
            let random = Math.floor(Math.random() * 107) + 1
            let random1 = random.toString().padStart(4, '0');
            return (h('image', { url: alincloud + 'emoji/' + random1 + '.jpg' }))
          }


          if ((args[0]) === '随机漫画' || (args[0]) === '抽漫画') {
            let random = Math.floor(Math.random() * 243) + 1
            let random1 = random.toString().padStart(4, '1');
            return (h('image', { url: alincloud + 'comic/' + random1 + '.jpg' }))
          }
          if ((args[0]) === '千里眼' || (args[0]) === '国际服千里眼') {
            return (h('image', { url: "https://cdnimg.gamekee.com/wiki2.0/images/w_2568/h_6088/829/43637/2023/6/25/334321.png" }))
          }
          if ((args[0]) === '国服千里眼') {
            return (h('image', { url: "https://cdnimg.gamekee.com/wiki2.0/images/w_1201/h_6403/829/148635/2023/7/1/508491.png" }))
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
        
          //新攻略匹配系统
          //图图下载函数
          // 导入fs模块，用于操作文件系统

          // 获取操作系统平台
          const platform = os.platform();



          // 调用函数，传入要遍历的文件夹路径
          function saveimg(url: string, path: string) {
            const file = fs.createWriteStream(path, { encoding: 'binary' });
            https.get(url, (response) => {
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
          //请求
          var outstu = (await ctx.http.get(url1 + '?name=' + args[0], { responseType: "json" }))
          saveimg((cdn1 + outstu.data[0].path), (path.resolve(__dirname) + (outstu.data[0].hash) + '.png'))
          //文件修改系统
          function data1() {
            let oldpath = (path.resolve(__dirname) + outstu.data[0].hash + '.png')
            let newpath = (path.resolve(__dirname) + "\\" + outstu.data[0].hash + '.png')
            fs.rename(oldpath, newpath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("文件位置和名称已更改");
              }
            })
          }
          data1()

          console.log(outstu)


          if (outstu.status == 200) {

            //返回
            setTimeout(() => {
              data1()
            }, 600);
            setTimeout(() => {
              session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu.data[0].hash}.png`)).href))
            }, 1200);


            //土方法的模糊匹配api
          } else {


            const Message = await session.send(
              h('at', { id: session.userId }) +
              '呜呜，没有找到对应攻略，\n'
              + '你要找的是这些吗？可以发送以下名称的序号来查看\n'
              + '1 ' + outstu.data[0].name + '\n'
              + '2 ' + outstu.data[1].name + '\n'
              + '3 ' + outstu.data[2].name + '\n'
              + '4 ' + outstu.data[3].name + '\n'
            )
            setTimeout(() => { session.bot.deleteMessage(session.channelId, Message[0]) }, 15000)
            let timeout = 15000//15s
            let obj = await session.prompt(timeout)
            if (!obj) {
              //撤回方法
              const message1 = await session.send(h('at', { id: session.userId })
                + '呜呜，等待超时，请重新触发指令')
              setTimeout(() => { session.bot.deleteMessage(session.channelId, message1[0]) }, 15000)
            } else if (['1', '2', '3', '4'].includes(obj)) {
              let numb = parseInt(obj)
              numb--

              let outstu1 = (await ctx.http.get(url1 + '?name=' + outstu.data[numb].name, { responseType: "json" }))
              saveimg((cdn1 + outstu1.data[0].path), (path.resolve(__dirname) + (outstu1.data[0].hash) + '.png'))
              datafs()
              //文件修改系统
              function datafs() {
                let oldpath = (path.resolve(__dirname) + outstu1.data[0].hash + '.png')
                let newpathwin = (path.resolve(__dirname) + "\\" + outstu1.data[0].hash + '.png')
                let newpathlinux = (path.resolve(__dirname) + "/" + outstu1.data[0].hash + '.png')
                if (platform === 'win32') {
                  var newpath = newpathwin
                  console.log('您的计算机系统是windows');
                } else if (platform === 'linux') {
                  var newpath = newpathlinux
                  console.log('您的计算机系统是linux');
                } else {
                  console.log('无法识别您的计算机系统');
                }
                fs.rename(oldpath, newpath, (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("文件位置和名称已更改");
                    fs.unlink(oldpath, (err) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("文件已删除");
                      }
                    });
                  }
                })
              }

              //延时返回
              setTimeout(() => {
                datafs()
                datafs()
              }, 600);
              setTimeout(() => {
                session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu1.data[0].hash}.png`)).href))
              }, 1200);

            } else {
              //撤回方法
              const message2 = await session.send(h('at', { id: session.userId })
                + '输入错误啦，请重新触发指令')
              setTimeout(() => { session.bot.deleteMessage(session.channelId, message2[0]) }, 15000)
            }

          }
          */




          var outstu = (await ctx.http.get(url1 + '?name=' + args[0], { responseType: "json" }))
          console.log(outstu)
          console.log(outstu.data[0].hash)
          console.log(cdn1 + outstu.data[0].path)

          var url = cdn1 + outstu.data[0].path
          var filename = "./" + (outstu.data[0].hash) + ".png"

          // 定义一个异步函数 downloadImage，接受一个 URL 和一个文件名作为参数
          const downloadImage = async (url: string, filename: string): Promise<void> => {
            // 使用 path.join 将当前代码文件所在的路径（__dirname）和文件名连接起来，得到完整的文件路径
            const filepath = path.join(__dirname, filename);
            try {
              // 使用 fs.access 尝试访问文件，如果文件存在，函数会成功执行，如果文件不存在，函数会抛出错误
              // 使用 promisify(fs.access) 将 fs.access 函数转换为返回 Promise 的函数
              await promisify(fs.access)(filepath);
              console.log('文件已存在，不需要下载');
            } catch {
              // 如果 fs.access 函数抛出错误，说明文件不存在，需要下载
              console.log('文件不存在，开始下载');
              // 返回一个新的 Promise
              return new Promise((resolve, reject) => {

                const file = fs.createWriteStream(filepath);

                https.get(url, (response) => {

                  promisify(pipeline)(response, file)
                    .then(() => resolve())
                    .catch((error) => reject(error))
                });
              });
            }
          };
          downloadImage(url, filename).catch(console.error);



          


          if (outstu.status == 200) {

            //返回
            setTimeout(() => {
              session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu.data[0].hash}.png`)).href))
            }, 100);
            setTimeout(() => {
              session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu.data[0].hash}.png`)).href))
            }, 1200);


            //土方法的模糊匹配api
          } else {


            const Message = await session.send(
              h('at', { id: session.userId }) +
              '呜呜，没有找到对应攻略，\n'
              + '你要找的是这些吗？可以发送以下名称的序号来查看\n'
              + '1 ' + outstu.data[0].name + '\n'
              + '2 ' + outstu.data[1].name + '\n'
              + '3 ' + outstu.data[2].name + '\n'
              + '4 ' + outstu.data[3].name + '\n'
            )
            setTimeout(() => { session.bot.deleteMessage(session.channelId, Message[0]) }, 15000)
            let timeout = 15000//15s
            let obj = await session.prompt(timeout)
          }








          //攻略功能函数尾巴1
        }
      })
    //插件函数尾巴2
  }
})


