//import区域
import { Context, Schema, h, Command, Logger } from 'koishi';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { Config } from '..';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { pathToFileURL } from 'url'
import { resolve } from 'path'

const log1 = "ba-plugin"
const logger: Logger = new Logger(log1)



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
      .example('攻略 爱丽丝')
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
            return (h('image', { url: "https://cdnimg.gamekee.com/wiki2.0/images/w_2540/h_5392/829/43637/2023/7/16/106554.png" }))
          }
          if ((args[0]) === '国服千里眼') {
            return (h('image', { url: "https://cdnimg.gamekee.com/wiki2.0/images/w_1201/h_5677/829/148635/2023/7/24/622750.png" }))
          }

//GPT4帮写的新攻略系统

          var outstu = (await ctx.http.get(url1 + '?name=' + args[0], { responseType: "json" }))
          logger.info("url地址：" + cdn1 + outstu.data[0].path)

          var url = cdn1 + outstu.data[0].path
          var filename = (outstu.data[0].hash) + ".png"


          //下载函数
          const downloadImage = async (url: string, filename: string): Promise<void> => {
            // 使用 path.join 将当前代码文件所在的路径（__dirname）和文件名连接起来，得到完整的文件路径
            const filepath = path.join(__dirname, filename);
            try {

              await promisify(fs.access)(filepath);
              logger.info("文件已经找到，将使用本地文件")

            } catch {
              // 如果 fs.access 函数抛出错误，说明文件不存在，需要下载
              logger.info("文件未找到，需要下载，已开始下载")
              // 返回一个新的 Promise
              return new Promise((resolve, reject) => {
                const file = fs.createWriteStream(filepath);
                https.get(url, (response) => {

                  promisify(pipeline)(response, file)
                    .then(() => resolve())
                    .catch((error) => reject(error))
                });
              }
              );
            }

          };


          if (outstu.status == 200) {
            await downloadImage(url, filename).catch(console.error);
            session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu.data[0].hash}.png`)).href))


            //土方法的模糊匹配api
          } else if (outstu.status == 101) {
            //模糊匹配返回内容
            const Message = await session.send(
              h('at', { id: session.userId }) +
              '呜呜，没有找到对应攻略，\n'
              + '你要找的是这些吗？可以发送以下名称的序号来查看\n'
              + '1 ' + outstu.data[0].name + '\n'
              + '2 ' + outstu.data[1].name + '\n'
              + '3 ' + outstu.data[2].name + '\n'
              + '4 ' + outstu.data[3].name + '\n'
            )
            //模糊匹配撤回
            setTimeout(() => { session.bot.deleteMessage(session.channelId, Message[0]) }, 20000)
            let timeout = 20000//15s
            let obj = await session.prompt(timeout)
            if (!obj) {

              const message1 = await session.send(h('at', { id: session.userId })
                + '呜呜，等待超时，请重新触发指令')
              setTimeout(() => { session.bot.deleteMessage(session.channelId, message1[0]) }, 20000)

            } else if (['1', '2', '3', '4'].includes(obj)) {
              //重新请求
              let numb = parseInt(obj)
              numb--
              let outstu1 = (await ctx.http.get(url1 + '?name=' + outstu.data[numb].name, { responseType: "json" }))
              let url = cdn1 + outstu1.data[0].path
              let filename = (outstu1.data[0].hash) + ".png"

              await downloadImage(url, filename).catch(console.error);
              session.send(h.image(pathToFileURL(resolve(__dirname, `${outstu1.data[0].hash}.png`)).href))


            } else {
              //撤回方法
              const message2 = await session.send(h('at', { id: session.userId })
                + '输入错误了呜呜，请重新触发指令')
              setTimeout(() => { session.bot.deleteMessage(session.channelId, message2[0]) }, 20000)
            }
          }

          //攻略功能函数尾巴1
        }
      })
    //插件函数尾巴2
  }
})


