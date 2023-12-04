import { clearInterval } from "timers"
import { Context, Schema, h } from "koishi"
import { Config } from ".."
export interface guildConfig {
  hour: number
  guildId: string
}
export const guildConfig: Schema<guildConfig> = Schema.object(
  {
    guildId: Schema.string().default("").description('整活限定群号'),
    hour: Schema.number().max(8).min(1).default(3).description('提醒频率,请使用整数')
  }
)
let deletedMessage
let deletedMessageArray = []
export const guildPlugin = ({
  apply(ctx: Context, config: Config) {
    let interval
    let timeOut
    ctx.on('dispose', () => {
      clearInterval(interval)
      clearTimeout(timeOut)
    })
    ctx.on('message-deleted', async (session) => {
      if (session.channelId === config.GachaGuild.guild.guildId) {
        deletedMessage = await session.bot.getMessage(session.channelId, session.messageId)
        if (deletedMessageArray.length < 5) deletedMessageArray.push(deletedMessage)
        else await deletedMessageArray.shift().push(deletedMessage)
      } else return
    })
    //等待koishi处理好获取撤回消息API
    ctx.command('穿山甲到底说了什么', '防撤回', { hidden: true }).alias('啊')
      .action(async ({ session }, ...args) => {
        if (session.channelId !== config.GachaGuild.guild.guildId || args.length !== 1) return
        let temp = Number(args[0].replace((/[０-９]/g), c => { return String.fromCharCode(c.charCodeAt(0) - 65248) }))//匹配全角数字
        if (deletedMessageArray.length == 0) return '当前没保存任何撤回消息'
        else if (deletedMessageArray.length < temp) return '撤回信息保存数量只有' + deletedMessageArray.length + '条'
        else if (Number.isNaN(temp)) return '请输入合法数字1-5'
        else {
          const MESSAGE = await session.send(deletedMessageArray[temp - 1].user.name + '的撤回内容:\n' + deletedMessageArray[temp - 1].content)
          console.log(MESSAGE)
          //   setTimeout(() => { session.bot.deleteMessage(session.channelId, MESSAGE[0]) }, 1000) 官方bot暂时不能撤回消息
        }
      })
    //QQ暂不允许发送主动消息，功能暂时失效
    ctx.command('提醒小助手', '提醒睡觉小助手')
      .action(({ session }, ...args) => {
        if (config.GachaGuild.guild.guildId === '' || session.channelId !== config.GachaGuild.guild.guildId || args.length !== 1) return
        if (args[0] === '启动') {
          if (timeOut !== null && timeOut !== undefined) return '萝卜子已经启动了~'
          const nowTime = new Date().getTime()
          const nextTime = nowTime - (nowTime % (config.GachaGuild.guild.hour * 60 * 60 * 1000)) + config.GachaGuild.guild.hour * 60 * 60 * 1000
          const TIMEDIFF = new Date(nextTime - nowTime)
          const formattedTime = TIMEDIFF.toLocaleTimeString('zh-cn', { timeZone: 'GMT+0' })
          session.send('亚托莉已启动\n将在' + formattedTime + '后开始第一次提醒.')
          timeOut = setTimeout(() => start(), TIMEDIFF.getTime())
        } else if (args[0] === '关闭') {
          clearInterval(interval)
          session.send('亚托莉已关闭')
          console.log('关闭提醒')
        } else return
      })
    //提醒小助手启动函数
    function start() {
      let time = new Date().getTime()
      interval = setInterval(() => {
        let time2 = new Date().getTime()
        ctx.bots[0].sendMessage(config.GachaGuild.guild.guildId, h.image(`https://pic3.zhimg.com/v2-9c94502fb67086032355c52f13c530ea_b.webp?consumer=ZHI_MENG`))
        console.log('执行一次')
        if ((time2 - time) < (config.GachaGuild.guild.hour * 1000 * 60 * 60)) {
          clearInterval(interval)
          console.log('计时异常')
        }
      }, (config.GachaGuild.guild.hour * 1000 * 60 * 60))
    }
  }
})