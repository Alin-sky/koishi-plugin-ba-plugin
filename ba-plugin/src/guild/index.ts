import { clearInterval } from "timers"
import { Context, h } from "koishi"
import { Config } from ".."
import { resolve } from "path"
import { pathToFileURL } from "url"
import { gachaGroup } from "../gacha/gacha"
declare module '../index' {
  interface Config {
    hour: number
  }
}
export interface Config1 extends Config {
}
let tempMessage;
let tempMessage2 = [];
export const plugin = ({
  apply(ctx: Context, config: Config1) {
    let interval;
    let timeOut;
    ctx.on('dispose', () => {
      clearInterval(interval)
      clearTimeout(timeOut)
    });
    ctx.on('message-deleted', async (session) => {
      tempMessage = await session.bot.getMessage(session.channelId, session.messageId)
      if (tempMessage2.length < 5) {
        tempMessage2.push(tempMessage)
      } else {
        await tempMessage2.shift()
        tempMessage2.push(tempMessage)
      }
    });
    ctx.command('穿山甲到底说了什么', '防撤回')
      .action(({ session }, ...args) => {
        if (args.length !== 1) {
          return ('参数数量不对');
        } else {
          let temp = Number(args[0].replace((/[０-９]/g), (c) => {
            return String.fromCharCode(c.charCodeAt(0) - 65248);
          }))
          if (tempMessage2.length == 0) {
            return ('当前没保存任何撤回消息');
          } else if (tempMessage2.length < temp) {
            return ('输入的参数不对，请注意当前撤回消息数量');
          } else {
            if (Number.isNaN(temp)) {
              return ('请输入合法数字1-5');
            } else {
              session.send('第' + temp + '条撤回消息：\n' +
               tempMessage2[temp - 1].author.username + '的撤回内容:\n' + tempMessage2[temp - 1].content);
            }
          }
        }
      });
    ctx.command('提醒小助手','提醒睡觉小助手',/*{hidden: true }*/).action(({ session }, ...args) => {
      if (args.length == 1) {
        if (args[0] === '启动') {
          if (config.整活用群号 == '') {
            return '请先设置信息'
          }
          let nowTime = new Date()
          let nextTime = new Date(nowTime)
          let nextHour = nowTime.getHours() + (config.hour - nowTime.getHours() % config.hour)
          nextTime.setHours(nextHour, 0, 0, 0)
          const timeDiff = nextTime.getTime() - nowTime.getTime()
          const seconds = Math.floor(timeDiff / 1000)
          const hours = Math.floor(seconds / 3600)
          const minutes = Math.floor((seconds % 3600) / 60)
          const remainingSeconds = seconds % 60
          const formattedTime = `${hours}:${minutes}:${remainingSeconds}`
          console.log(formattedTime)
          console.log(nextTime.toTimeString())
          session.send('提醒小助手已启动.\n将在' + formattedTime + '后开始第一次提醒.')
          timeOut = setTimeout(() => { start() }, timeDiff) //)
        } else if (args[0] === '关闭') {
          clearInterval(interval)
          session.send('提醒小助手已关闭')
          console.log('关闭提醒')
        }
      } else { return ('参数不对') };
    });
    ctx.command('这个指令是实验性的', '实现了群组隔离', /*{hidden: true }*/)
      .action(async ({ session }, ...args) => {
        if (session.guildId === config.整活用群号) {
          await gachaGroup(session, config)
        } else {
          return '你无权调用他群指令'
        }
      })
    //提醒小助手启动函数，请注意检查循环时间避免被风控
    function start() {
      let time = new Date().getTime();
      interval = setInterval(() => {
        let time2 = new Date().getTime();
        ctx.bots[0].sendMessage(config.整活用群号, h.image(pathToFileURL(resolve(__dirname, '../../assets/提醒睡觉.jpg')).href));
        console.log('执行一次');
        if ((time2 - time) < (config.hour * 1000 * 60 * 60)) {
          clearInterval(interval);
          console.log('计时异常');
        };
      }, (config.hour * 1000 * 60 * 60));
    };
  }
})


