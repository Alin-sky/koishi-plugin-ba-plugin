/** 
 * q
 */


import { clearInterval } from "timers"
import { Command, Context, Random, Schema, h } from "koishi"
import path, { resolve } from "path"
import { pathToFileURL } from "url"
import { Config } from ".."
import Jimp from "jimp"
export interface guildConfig {
  hour: number
  整活用群号: string
}
export const guildConfig: Schema<guildConfig> = Schema.object(
  {
    整活用群号: Schema.string().default("").description('整活限定'),
    hour: Schema.union([1, 3, 8]).default(3).description('提醒频率,请使用整数')
  }
)
let tempMessage;
let tempMessage2 = [];
export const guildPlugin = ({
  apply(ctx: Context, config: Config) {
    let interval;
    let timeOut;
    ctx.on('dispose', () => {
      clearInterval(interval)
      clearTimeout(timeOut)
    });
    ctx.on('message-deleted', async (session) => {
      if (session.channelId === config.guild.整活用群号) {
        tempMessage = await session.bot.getMessage(session.channelId, session.messageId)
        if (tempMessage2.length < 5) {
          tempMessage2.push(tempMessage)
        } else {
          await tempMessage2.shift()
          tempMessage2.push(tempMessage)
        }
      } else return
    });
    ctx.command('穿山甲到底说了什么', '防撤回', { hidden: true } as Partial<Command.Config>)
      .action(async ({ session }, ...args) => {
        if (session.guildId !== config.guild.整活用群号) {
          return '本指令仅限alin群调用'
        }
        if (args.length !== 1) {
          return ('参数数量不对')
        }
        let temp = Number(args[0].replace((/[０-９]/g), (c) => { return String.fromCharCode(c.charCodeAt(0) - 65248) }))
        if (tempMessage2.length == 0) {
          return ('当前没保存任何撤回消息');
        } else if (tempMessage2.length < temp) {
          session.send('当前保存的撤回信息只有' + tempMessage2.length + '条')
          return ('请注意当前撤回消息数量')
        } else {
          if (Number.isNaN(temp)) {
            return ('请输入合法数字1-5')
          } else {
            const MESSAGE = await session.send('第' + temp + '条撤回消息：\n' + tempMessage2[temp - 1].author.username + '的撤回内容:\n' + tempMessage2[temp - 1].content)
            setTimeout(() => { session.bot.deleteMessage(session.channelId, MESSAGE[0]) }, 5000)
          }
        }
      })
    ctx.command('提醒小助手', '提醒睡觉小助手', { hidden: true } as Partial<Command.Config>)
      .action(({ session }, ...args) => {
        if (config.guild.整活用群号 == '') { return '请先设置信息' }
        if (args.length !== 1) { return ('参数数量不对') }
        if (args[0] === '启动') {
          let nowTime = new Date()
          let nextTime = new Date(nowTime)
          let nextHour = nowTime.getHours() + (config.guild.hour - nowTime.getHours() % config.guild.hour)
          nextTime.setHours(nextHour, 0, 0, 0)
          const TIMEDIFF = nextTime.getTime() - nowTime.getTime()
          const SECONDS = Math.floor(TIMEDIFF / 1000)
          const HOURS = Math.floor(SECONDS / 3600)
          const MINUTES = Math.floor((SECONDS % 3600) / 60)
          const SECOND = SECONDS % 60
          const TIME = `${HOURS}:${MINUTES}:${SECOND}`
          session.send('提醒小助手已启动.\n将在' + TIME + '后开始第一次提醒.')
          timeOut = setTimeout(() => { start() }, TIMEDIFF)
        } else if (args[0] === '关闭') {
          clearInterval(interval)
          session.send('提醒小助手已关闭')
          console.log('关闭提醒')
        } else return '参数错误'
      })
    ctx.command('抽群U', '(beta版)群组隔离', { hidden: true } as Partial<Command.Config>)
      .action(async ({ session }, ...args) => {
        if (session.guildId === config.guild.整活用群号) {
          await gachaGroup(session, config)
        } else {
          return '群限定指令.'
        }
      })
    //提醒小助手启动函数，请注意检查循环时间避免被风控
    function start() {
      let time = new Date().getTime();
      interval = setInterval(() => {
        let time2 = new Date().getTime();
        ctx.bots[0].sendMessage(config.guild.整活用群号, h.image(pathToFileURL(resolve(__dirname, '../../assets/提醒睡觉.jpg')).href));
        console.log('执行一次');
        if ((time2 - time) < (config.guild.hour * 1000 * 60 * 60)) {
          clearInterval(interval);
          console.log('计时异常');
        };
      }, (config.guild.hour * 1000 * 60 * 60));
    };
  }
})
//整活   
export async function gachaGroup(session, config: Config) {
  let groupPool = await session.bot.getGuildMemberList(config.guild.整活用群号);
  const OWNER = groupPool.filter(member => member.roles[0] === 'owner');
  const ADMIN = groupPool.filter(member => member.roles[0] === 'admin');
  const MEMBER = groupPool.filter(member => member.roles[0] === 'member');
  const PB = {
    ownerPB: OWNER.length,
    adminPB: ADMIN.length,
    memberPB: MEMBER.length
  }
  let cards = []
  let outputImage = new Map()
  for (let i = 0; i < 10; i++) {
    const CARD = Random.weightedPick(PB);
    switch (CARD) {
      case 'ownerPB':
        let ownercard = OWNER[Random.int(OWNER.length)].avatar
        cards.push(ownercard)
        break;
      case 'adminPB':
        let admincard = ADMIN[Random.int(ADMIN.length)].avatar
        cards.push(admincard)
        break
      case 'memberPB':
        let membercard = MEMBER[Random.int(MEMBER.length)].avatar
        cards.push(membercard)
        break
      default:
        return '出故障了捏'
    }
  }
  let gachaBG = await Jimp.read(path.resolve(__dirname, '../../assets/gachaBG.png'))
  let tempCard = await Jimp.read(path.resolve(__dirname, '../../assets/☆card.png'))
  let cardsImage = cards.map(async (cardtemp) => {
    return await Jimp.read(cardtemp)
  })
  await Promise.all(cardsImage).then(async (img) => {
    let width = (gachaBG.getWidth() - (tempCard.getWidth() * 5)) / 2
    let height1 = gachaBG.getHeight() / 4 - tempCard.getHeight() / 2
    let height2 = gachaBG.getHeight() / 2 - tempCard.getHeight() / 3
    img.forEach((img, index) => {
      if (index < 5) { gachaBG.composite(img, width + tempCard.getWidth() * index, height1) }
      else { gachaBG.composite(img, width + tempCard.getWidth() * (index - 5), height2) }
    })
  })
  const BUFFER = await gachaBG.getBufferAsync(Jimp.MIME_PNG)
  let image = await outputImage.set('buffer3', BUFFER)
  await session.send(h('message', [session.author.username + '的抽卡结果：\n', h.image(image.get('buffer3'), 'image/png')]))
}