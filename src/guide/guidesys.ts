//import区域
import { Context, Schema, Session, Logger, h, Random, Command } from 'koishi';
import { FMPS } from '../FMPS/FMPS';
import { file_search, move_file, rootF } from '../FMPS/FMPS_F';
import { } from "@satorijs/adapter-qq";
import { Config, } from '..';
import { pathToFileURL } from 'url';
import path, { resolve } from 'path';
import { match_file, MatchArona, MatchMapName } from '../Snae_match/match';
import { Image } from '@koishijs/canvas';
//import zhCNi8n from '../locales/zh-CN.yml'

const log = "ba-plugin-guide"
const logger: Logger = new Logger(log)
const random = new Random(() => Math.random())
export const inject = ['canvas']

//Alin’s ba guide systems v3.2.1 2024-05-29
//配置项
export interface guide_qq {
  markdown_setting: {
    table: any
    qqguild: string
  },
}

export interface guideConfig {
  avatar: boolean
  logger: boolean
  time: number
}

export const guide_qq: Schema<guide_qq> = Schema.intersect([
  Schema.object({
    markdown_setting: Schema.object({
      table: Schema.array(Schema.object({
        MD模板id: Schema.string(),
        MD模板参数1: Schema.string(),
        MD模板参数2: Schema.string(),
        MD模板参数3: Schema.string(),
        MD模板参数4: Schema.string(),
      })).role('table'),
      qqguild: Schema.string().description('QQ频道id，可通过inspect获取，应该是纯数字'),
    }).collapse(),
  }).description('QQ官方bot设置,使用QQ频道来发送md图片'),
])

export const guideConfig: Schema<guideConfig> = Schema.intersect([
  Schema.object({
    avatar: Schema.boolean().default(true).description('模糊匹配时生成学生头像图（canvas）'),
    logger: Schema.boolean().default(true).description('每次攻略请求输出日志'),
    time: Schema.number().default(20000).description('攻略、抽卡系统的等待时间（单位：毫秒）'),
  }).description('攻略系统设置'),
])

//日服最大地图
export const maxmap_sms = 28;

export const synonyms: { [key: string]: string[] } = {
  "当前": ["目前", "现在", "此刻", "当下", "在办", "在开展", "在进行", "开展中", "进行中"],
  "竞技场": ["jjc", "pvp"],
  "榜": ["排名", "名次", "顺位"],
  "goz": ["高兹", "戈兹", "狗子", "GOZ"],
  "室外": ["野外", "户外", "野战", "屋外"],
  "室内": ["屋内"],
  "市街": ["街区", "街道", "市区"],
  "蛇": ["binah"],
  "格里高利": ["glgl", "额我略", "教皇"],
  "未来视": ["千里眼"],
  "PHT": ["pht"],
  "A-H.A": ["a-h.a", "aha"],
  "鸡": ["鸡斯拉", "佩洛洛斯拉", "佩洛洛吉拉", "坤"],
  "教学": ["教程", "指南"],
  "材料": ["素材"],
  "演习": ["考试"],
  "学院": ["学园"],
  "千年": ["千禧"],
  "红冬": ["赤冬"],
  "三一": ["崔尼蒂"],
  "阿比多斯": ["阿拜多斯"],
  "补习": ["补课"]
};

/*已到期，缅怀
export const alincloud = 'http://124.221.99.85:8088/'
export const FMPS_server_download = 'http://124.221.198.113:9123/download/data/'
export const FMPS_server_list = 'http://124.221.198.113:9123/download/'
*/

export const FMPS_server_download = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F"
export const guide_systeam = ({

  async apply(ctx: Context, config: Config) {
    ctx.i18n.define('zh-CN', require('../locales/zh-CN'))
    const root = await rootF("bap-guidesys")
    const root_guide = await rootF("bap-guidesys", "guide_aronaimg")
    const root_json = await rootF('bap-json')
    const root_img = await rootF("bap-img")

    const drawm = config.plugin_config.draw_modle == "canvas" ? "" : 'file://'

    const local_path = `${drawm}${root_img}`

    const arona_url = 'https://arona.diyigemt.com/api/v2'
    const arona_cdn = 'https://arona.cdn.diyigemt.com/image'
    const db_imgdata_url = 'https://schaledb.com/images/student/collection/'

    const fmp = new FMPS(ctx)
    const log_on = config.guide.logger
    const times = config.guide.time

    const mdid = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]['MD模板id']
    const mdkey1 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]['MD模板参数1']
    const mdkey2 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]['MD模板参数2']
    const mdkey3 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]['MD模板参数3']
    const mdkey4 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]['MD模板参数4']
    const qqguild_id = config.qqconfig.markdown_setting.qqguild
    /*
    const bucketName = config.qqconfig.markdown_setting.Bucketname
    const region = config.qqconfig.markdown_setting.Region
    const buckid = config.qqconfig.markdown_setting.SecretId
    const buckkey = config.qqconfig.markdown_setting.SecretKey
    */
    const canvas_fun = config.guide.avatar
    var mdswitch: boolean = false

    let mds: boolean = false
    if (config.qqconfig.markdown_setting.table[1]) {
      mds = true
    } else {
      if (mdkey2 && mdkey3 && mdkey4) {
        mds = true
      } else {
        mds = false
      }
    }
    if (mdid && mds && mdkey1 && qqguild_id) {
      logger.info('🟢 攻略已启用MD消息模板')
      mdswitch = true
    } else {
      logger.info("⚠️ md相关设置未完善,未启用MD模板")
      mdswitch = false
    }

    //本地生成json文件
    async function initialisation_locally_generated() {
      const startTime = new Date().getTime();

      await fmp.match_auto_update(root_json);
      await fmp.sanae_match_refinement(root_json);

      const stujson = await fmp.json_parse(`${root_json}/sms_studata_main.json`);
      logger.info('学生总数' + stujson.length);
      const smstoarona_json = await fmp.json_parse(root_json + '/sms_studata_toaro_stu.json');
      logger.info('to_arona_data学生总数' + smstoarona_json.length);
      const other_json = await fmp.json_parse(root_json + "/sms_othersmatchlib.json")
      logger.info('others_match总数' + other_json.length);
      //核验数据
      await fmp.name_detection(smstoarona_json, 1);
      await fmp.name_detection(other_json, 2)
      const endTime = new Date().getTime();
      logger.info('数据更新完毕！用时' + ((endTime - startTime) * 0.001) + '秒');
    }
    if (config.plugin_config.autoupd == "本地") {
      await initialisation_locally_generated();
    }


    async function initia() {
      const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
      const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F"
      const newhash = await ctx.http.get(hashurl)
      try {
        await fmp.file_download(hashurl, root_json, 'hash.json')
        const oldjson = await fmp.json_parse(root_json + "/hash.json")
        for (let i = 0; i < newhash.length; i++) {
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root, `${newhash[i].fname}`)
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
        }
        logger.info("🟢 json文件下载完毕")
      } catch (e) {
        logger.info("json文件下载出错：" + e)
      }
      for (let i = 0; i < newhash.length; i++) {
        if (/sms_/.test(newhash[i].fname)) {
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), match_file, `${newhash[i].fname}`)
        }
      }
    }
    //await initia()
    try {
      setInterval(async () => { await initia(), logger.info('⏱️ 定时攻略数据更新完毕') }, 6 * 60 * 60 * 1000)

    } catch (e) {
      logger.info(e)
    }

    /*
    async function updcos(object_name_key: string, img: Buffer) {
      try {
        const result = await fmp.uploadFile(bucketName, region, object_name_key, img, buckid, buckkey);
        console.log('上传成功', result);
        return result.Location
      } catch (e) {
        logger.info('cos上传失败', e);
      }
    }*/

    //md模板
    //变成臭虫alin的形状了
    function markdow_fuzzy(session, url, n1, n2, n3?, n4?, n5?, n6?,) {
      let three = null
      let four = null
      let five = null
      let six = null
      let img = null
      let imgurl = null

      let width = 720;
      let height = 410;
      let t1
      let t2

      if (!n5 && !n6) {
        height = 290
      }
      if (url) {
        img = {
          key: mdkey3,
          values: [`![img#${width}px #${height}px]`],
        }
        imgurl = {
          key: mdkey4,
          values: [`(${url})`],
        }
      }
      if (mdkey2 && mdkey3) {
        t1 = {
          key: mdkey1,
          values: [session.text('.mdtext')],
        }
        t2 = {
          key: mdkey2,
          values: ["点击按钮直接查询哦"],
        }
      } else {
        if (url) {
          imgurl = {
            key: mdkey1,
            values: [`${url}`],
          }
        }
      }
      if (n3) {
        three = {
          render_data: { label: n3, },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n3}`,
            enter: true,
          },
        }
      }
      if (n4) {
        four = {
          render_data: { label: n4, },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n4}`,
            enter: true,
          },
        }
      }
      if (n5) {
        five = {
          render_data: { label: n5, style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n5}`,
            enter: true,
          },
        }
      }
      if (n6) {
        six = {
          render_data: { label: n6, style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n6}`,
            enter: true,
          },
        }
      }
      return {
        msg_type: 2,
        msg_id: session.messageId,
        markdown: {
          custom_template_id: mdid,
          params: [
            t1,
            t2,
            img,
            imgurl,
          ]
        },
        keyboard: {
          content: {
            rows: [
              {
                // 第一行
                buttons: [
                  {
                    render_data: { label: n1, style: 1 },
                    action: {
                      type: 2, // 指令按钮
                      permission: { type: 2 }, // 所有人可点击
                      data: `/攻略 ${n1}`, // 点击后发送
                      enter: true, // 若 false 则填入输入框
                    },
                  },
                  {
                    render_data: { label: n2, style: 1 },
                    action: {
                      type: 2,
                      permission: { type: 2 },
                      data: `/攻略 ${n2}`,
                      enter: true,
                    },
                  },
                ]
              },
              {
                // 第二行
                buttons: [
                  three,
                  four,
                ],
              },
              {
                buttons: [
                  five,
                  six,
                ],
              },
            ],
          },
        },
      }
    }

    //头像生成函数
    async function create_guide_icon(type, n1, n2, n3?, n4?, n5?, n6?) {
      const nall = [n1, n2, n3, n4, n5, n6]
      let null_imgurl = `${local_path}/null_img_${random.int(1, 5)}.png`
      let againmatch = []
      const nullname = new Map(); // 用于存储字符串
      //日后可加上杂图和导航的头像图
      if (type == 'aronadata') {
        const names = [n1, n2,]
        names.push(n3)
        names.push(n4)
        const promises = names.map(async name => {
          const snematch = await MatchArona(name);
          if (snematch[0] == 'Student') {
            return snematch[1];
          } else {
            nullname.set(name, true)
            return name;
          }
        })
        againmatch = await Promise.all(promises);
      }
      const all_studata = await fmp.json_parse(root + '/sms_studata_toaro_stu.json')
      const mapNameToId = all_studata.reduce((acc, item) => {
        acc[item.MapName] = item.Id_db;
        return acc;
      }, {});
      const imgaarr = []
      let namearr = []
      let ids
      if (againmatch.length == 0) {
        namearr = nall.filter(i => i).map(i => i ? i : '')
        ids = [n1, n2, n3, n4, n5, n6].map
          (name => mapNameToId[name] ? `${local_path}/${mapNameToId[name]}.png` : null_imgurl);
      } else {
        namearr.push(againmatch[0], againmatch[1], againmatch[2], againmatch[3]);
        ids = [againmatch[0], againmatch[1], againmatch[2], againmatch[3]].map(
          name => nullname.get(name) ? null_imgurl : `${local_path}/${mapNameToId[name]}.png`
        );
      }
      for (let url of ids) {
        if (url) {
          const img = await ctx.canvas.loadImage(url); // 使用 loadImage 直接加载
          imgaarr.push(img);
        }
      }
      let height = 410
      const width = 720
      const f = namearr.length//循环次数
      if (f <= 4) { height = 290 }

      const canvas = await ctx.canvas.createCanvas(width, height)
      const ctximg = canvas.getContext('2d')
      ctximg.fillStyle = '#DFF7FF';
      ctximg.fillRect(0, 0, canvas.width, canvas.height)

      /*创建渐变，pupp不兼容，废弃
      const grd = ctximg.createLinearGradient(0, 0, canvas.width, 0);
      // 定义渐变的颜色
      grd.addColorStop(0, '#E0F8FF');
      grd.addColorStop(0.7, '#FFF1FC');
      grd.addColorStop(1, '#FFF1F1');
      ctximg.fillStyle = grd;
      ctximg.fillRect(0, 0, canvas.width, canvas.height);
      **/

      function insertLineBreaks(str: string, maxLength: number): string {
        let result = '';
        let currentLine = '';
        for (const char of str) {
          if (currentLine.length < maxLength) {
            currentLine += char;
          } else {
            result += currentLine + '\n';
            currentLine = char;
          }
        }
        result += currentLine; // 添加最后一行
        return result;
      }

      let vx = 70
      let vy = 70
      let wrap = 0
      for (let i = 0; i < f; i++) {
        ctximg.save(); // 保存当前画布状态
        ctximg.beginPath();
        ctximg.arc(vx, vy, 50, 0, Math.PI * 2);
        ctximg.clip();
        ctximg.drawImage(imgaarr[i], (-50 + vx), (-55 + vy), 100, 100 * 1.13);
        ctximg.restore(); // 恢复 到上一次保存的画布状态
        ctximg.closePath();
        ctximg.font = `bold 29px Arial`;
        ctximg.fillStyle = '#000000';
        const lines = insertLineBreaks(namearr[i], 9).split('\n');
        let ytextp; namearr[i].length > 10 ? ytextp = -20 : ytextp = 10
        let ytext = vy + ytextp
        const lineHeight = 30; // 假设每行的高度是 20px
        for (const line of lines) {
          ctximg.fillText(line, vx + 60, ytext);
          ytext += lineHeight;
        }
        wrap++
        vx += 340
        if (wrap == 2) {
          vx = 70
          vy += 130
          wrap = 0
        }
      }
      const data_buffer = canvas.toBuffer('image/png');
      return data_buffer
    }
    const sms_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`)

    function id_to_name(id) {
      if (id == "Student" || id == "MapFailedt" || id == "MapSuccess" || id == "Others") {
        return id
      } else {
        if (!(/^-?\d+(\.\d+)?$/.test(id))) {
          return id
        } else {
          const name = sms_data.filter(i => i.Id == id)
          return name[0].MapName
        }
      }
    }

    ctx.command('攻略 <message:text>', "Arona的攻略图")
      .alias('评分')
      .usage("发送“攻略”查看具体使用方法")
      .example('攻略 爱丽丝')
      .action(async ({ session }, message) => {
        let bot = {
          id: '',
          secret: ''
        }
        if (session.event.platform == 'qqguild') {
          bot.id = session.bot["parent"].config.id
          bot.secret = session.bot["parent"].config.secret

        } else if (session.event.platform == 'qq') {
          bot.id = session.bot.config.id
          bot.secret = session.bot.config.secret
        }

        let platfrom: boolean = false
        if (session.event.platform == 'qq' || session.event.platform == 'qqguild') {
          platfrom = true
        } else {
          platfrom = false
        }
        if (platfrom && mdswitch) {
          if (!message) {
            return (`
返回Arona的攻略图
使用方法：
🟢发送：攻略+空格+内容 调用AronaBot的数据
攻略图来自arona.diyigemt`)
          }
          const match_data_id = await MatchArona(message)
          const match_data = []
          match_data_id.map((i) => {
            const names = id_to_name(i)
            match_data.push(names)
          })
          console.log(match_data)

          let arodata
          if (match_data.length == 2) {
            try {
              arodata = await ctx.http.get(arona_url + '/image?name=' + match_data[1])
            } catch (error) {
              logger.info('向arona请求时发生错误', error)
              return session.text('.error')
            }
            await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
            await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
          } //模糊匹配
          else if (match_data.length <= 7 && match_data.length > 2) {

            //模糊匹配重复的暂时解决方案
            if (match_data.includes(message)) {
              let arodata
              try {
                arodata = await ctx.http.get(arona_url + '/image?name=' + message)
              } catch (error) {
                logger.info('向arona请求时发生错误', error)
                return session.text('.error')
              }
              if (!arodata.data) {
                return session.text('.no_guide')
              }
              if (arodata.code == 200) {
                await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
                await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
                return
              } else {
                let cosurl
                let rimg
                let i1 = 0, i2 = 0, i3 = 0, i4 = 0
                if (arodata.data.length == 2) {
                  i1 = 0, i2 = 1, i3 = 1, i4 = 1
                } else if (arodata.data.length == 3) {
                  i1 = 0, i2 = 1, i3 = 2, i4 = 2
                } else {
                  i1 = 0, i2 = 1, i3 = 2, i4 = 3
                }
                if (canvas_fun) {
                  rimg = await create_guide_icon(
                    'aronadata',
                    arodata.data[i1].name,
                    arodata.data[i2].name,
                    arodata.data[i3].name,
                    arodata.data[i4].name,)
                } else {
                  cosurl = false
                }
                if (mdswitch) {
                  cosurl = await fmp.img_to_channel(rimg, session.bot.config.id, session.bot.config.secret, qqguild_id)
                  console.log(cosurl)
                  let i1 = 0, i2 = 0, i3 = 0, i4 = 0
                  if (arodata.data.length == 2) {
                    i1 = 0, i2 = 1, i3 = 1, i4 = 1
                  } else if (arodata.data.length == 3) {
                    i1 = 0, i2 = 1, i3 = 2, i4 = 2
                  } else {
                    i1 = 0, i2 = 1, i3 = 2, i4 = 3
                  }
                  const md = markdow_fuzzy(
                    session,
                    cosurl,
                    arodata.data[i1].name,
                    arodata.data[i2].name,
                    arodata.data[i3].name,
                    arodata.data[i4].name,)
                  try {
                    await session.qq.sendMessage(session.channelId, md)
                  } catch (e) {
                    logger.info('发送md时发生错误:', e)
                    let bui = []
                    if (arodata.data.length == 2) {
                      bui = [0, 1]
                    } else if (arodata.data.length == 3) {
                      bui = [0, 1, 2]
                    } else {
                      bui = [0, 1, 2, 3]
                    }
                    const text = bui.map(
                      i => (`${i}.${arodata.data[i].name}\n`)).join('')
                    await session.send(`${session.text('.mdtext')}\n${text}`);
                  }
                } else {
                  const wait_mess = await session.prompt(times)
                  if (!wait_mess) {
                    const timeoutmess = await session.send(session.text('.outtime_return'))
                    setTimeout(() => {
                      try {
                        session.bot.deleteMessage(session.bot.selfId, timeoutmess[0])
                      } catch (e) {
                        logger.info('撤回时出错：', e)
                      }
                    }, times)
                  } else if (['1', '2', '3', '4'].includes(wait_mess)) {
                    let numb = parseInt(wait_mess)
                    if (arodata.data.length == 2) {
                      numb >= 2 ? numb = 2 : numb = 1
                    } else if (arodata.data.length == 3) {
                      numb >= 3 ? numb = 3 : numb = numb
                    }
                    numb--
                    try {
                      arodata = await ctx.http.get(arona_url + '/image?name=' + arodata.data[numb].name)
                    } catch (error) {
                      logger.info('向arona请求时发生错误', error)
                      return session.text('.error')
                    }
                    await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
                    await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
                  } else {
                    const etext = await session.send(session.text('.num_error'))
                    setTimeout(() => {
                      try {
                        session.bot.deleteMessage(session.bot.selfId, etext[0])
                      } catch (e) {
                        logger.info('撤回时出错：', e)
                      }
                    }, times)
                  }
                }
              }
            }
            let cosurl
            let rimg
            if (match_data[0] == 'Student' && canvas_fun) {
              //图渲函
              rimg = await create_guide_icon(
                match_data[0], match_data[1], match_data[2],
                match_data[3], match_data[4], match_data[5], match_data[6])
              cosurl = await fmp.img_to_channel(rimg, bot.id, bot.secret, qqguild_id)
            } else {
              cosurl = false
            }
            if (mdswitch) {
              console.log(cosurl)
              const md = await markdow_fuzzy(
                session,
                cosurl,
                match_data[1],
                match_data[2],
                match_data[3],
                match_data[4],
                match_data[5],
                match_data[6])
              try {
                if (session.event.platform == 'qq') {
                  await session.qq.sendMessage(session.channelId, md)
                } else if (session.event.platform == 'qqguide') {
                  await session.qqguild.sendMessage(session.channelId, md)
                }
              } catch (e) {
                logger.info('发送md时发生错误', e)
                const text = [1, 2, 3, 4, 5, 6].map(
                  i => match_data[i] ? `${i}.${match_data[i]}` : '').filter(Boolean).join('\n');
                await session.send(`${session.text('.match_text')}\n${text}`);
              }
            } else {
              const imgmess = await session.send(h.image(rimg, "image/png"));
              const text = [1, 2, 3, 4, 5, 6].map(
                i => match_data[i] ? `${i}.${match_data[i]}` : '').filter(Boolean).join('\n');
              const messid = await session.send(`${h('at', { id: session.userId })}\n${session.text('.match_text')}\n${text}`);
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, messid[0])
                  session.bot.deleteMessage(session.bot.selfId, imgmess[0])
                } catch (e) {
                  logger.info('撤回出错：', e)
                }
              }, times)
              //等待输入
              let wait_arry = [...(Array((match_data.length) - 1).keys())].map(i => (i + 1).toString());
              const wait_mess = await session.prompt(times)
              if (!wait_mess) {
                const timeoutmess = await session.send(session.text('.outtime_return'))
                setTimeout(() => {
                  try {
                    session.bot.deleteMessage(session.bot.selfId, timeoutmess[0])
                  } catch (e) {
                    logger.info('撤回时出错：', e)
                  }
                }, times)
                return
              } else if (wait_arry.includes(wait_mess)) {
                let numb = parseInt(wait_mess)
                let arodata
                try {
                  arodata = await ctx.http.get(arona_url + '/image?name=' + match_data[numb])
                } catch (error) {
                  logger.info('向arona请求时发生错误', error)
                  return session.text('.error')
                }
                await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
                await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
                return
              } else {
                const etext = await session.send(session.text('.num_error'))
                setTimeout(() => {
                  try {
                    session.bot.deleteMessage(session.bot.selfId, etext[0])
                  } catch (e) {
                    logger.info('撤回时出错：', e)
                  }
                }, times)
                return
              }
            }
            //苗匹配没有结果的情况
          } else if (match_data.length == 0) {
            let cosurl
            let rimg
            try {
              arodata = await ctx.http.get(arona_url + '/image?name=' + message)
            } catch (error) {
              logger.info('向arona请求时发生错误', error)
              return session.text('.error')
            }
            console.log(arodata)
            if (arodata.code == 200) {
              await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
              return (h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
            }
            if (!arodata.data) {
              return session.text('.no_guide')
            }
            let i1 = 0, i2 = 0, i3 = 0, i4 = 0
            if (arodata.data.length == 2) {
              i1 = 0, i2 = 1, i3 = 1, i4 = 1
            } else if (arodata.data.length == 3) {
              i1 = 0, i2 = 1, i3 = 2, i4 = 2
            } else {
              i1 = 0, i2 = 1, i3 = 2, i4 = 3
            }
            if (canvas_fun) {
              rimg = await create_guide_icon(
                'aronadata',
                arodata.data[i1].name,
                arodata.data[i2].name,
                arodata.data[i3].name,
                arodata.data[i4].name,)
              cosurl = await fmp.img_to_channel(rimg, session.bot.config.id, session.bot.config.secret, qqguild_id)
            } else {
              cosurl = false
            }
            if (mdswitch) {
              let i1 = 0, i2 = 0, i3 = 0, i4 = 0
              if (arodata.data.length == 2) {
                i1 = 0, i2 = 1, i3 = 1, i4 = 1
              } else if (arodata.data.length == 3) {
                i1 = 0, i2 = 1, i3 = 2, i4 = 2
              } else {
                i1 = 0, i2 = 1, i3 = 2, i4 = 3
              }
              const md = markdow_fuzzy(
                session,
                cosurl,
                arodata.data[i1].name,
                arodata.data[i2].name,
                arodata.data[i3].name,
                arodata.data[i4].name,)
              try {
                await session.qq.sendMessage(session.channelId, md)
              } catch (e) {
                logger.info('发送md时发生错误:', e)
                let bui = []
                if (arodata.data.length == 2) {
                  bui = [0, 1]
                } else if (arodata.data.length == 3) {
                  bui = [0, 1, 2]
                } else {
                  bui = [0, 1, 2, 3]
                }
                const text = bui.map(
                  i => (`${i}.${arodata.data[i].name}\n`)).join('')
                await session.send(`${session.text('.match_text')}\n${text}`);
              }
            } else {
              const wait_mess = await session.prompt(times)
              if (!wait_mess) {
                const timeoutmess = await session.send(session.text('.outtime_return'))
                setTimeout(() => {
                  try {
                    session.bot.deleteMessage(session.bot.selfId, timeoutmess[0])
                  } catch (e) {
                    logger.info('撤回时出错：', e)
                  }
                }, times)
              } else if (['1', '2', '3', '4'].includes(wait_mess)) {
                let numb = parseInt(wait_mess)
                if (arodata.data.length == 2) {
                  numb >= 2 ? numb = 2 : numb = 1
                } else if (arodata.data.length == 3) {
                  numb >= 3 ? numb = 3 : numb = numb
                }
                numb--
                try {
                  arodata = await ctx.http.get(arona_url + '/image?name=' + arodata.data[numb].name)
                } catch (error) {
                  logger.info('向arona请求时发生错误', error)
                  return session.text('.error')
                }
                await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
                await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
              } else {
                const etext = await session.send(session.text('.num_error'))
                setTimeout(() => {
                  try {
                    session.bot.deleteMessage(session.bot.selfId, etext[0])
                  } catch (e) {
                    logger.info('撤回时出错：', e)
                  }
                }, times)
              }
            }
          }
        } else {
          //非官方bot平台
          if (!message) {
            return (`
返回Arona的攻略图
使用方法：
🟢发送：攻略+空格+内容 调用AronaBot的数据
攻略图来自arona.diyigemt`)
          }
          const match_data_id = await MatchArona(message)
          console.log(match_data_id)

          const match_data = []
          match_data_id.map((i) => {
            const names = id_to_name(i)
            match_data.push(names)
          })
          console.log(match_data)

          let arodata
          if (match_data.length == 2) {
            try {
              arodata = await ctx.http.get(arona_url + '/image?name=' + match_data[1])
            } catch (error) {
              logger.info('向arona请求时发生错误', error)
              return session.text('.error')
            }
            await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
            await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
          } else if (match_data.length <= 7 && match_data.length > 2) {

            if (canvas_fun && await match_data[0] == 'Student') {
              //图渲函
              const rimg = await create_guide_icon(
                match_data[0], match_data[1], match_data[2],
                match_data[3], match_data[4], match_data[5], match_data[6])
              const imgmess = await session.send(h.image(rimg, "image/png"));
              const text = [1, 2, 3, 4, 5, 6].map(
                i => match_data[i] ? `${i}.${match_data[i]}` : '').filter(Boolean).join('\n');
              const messid = await session.send(`${h('at', { id: session.userId })}\n${session.text('.match_text')}\n${text}`);
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, messid[0])
                  session.bot.deleteMessage(session.bot.selfId, imgmess[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            } else {
              const text = [1, 2, 3, 4, 5, 6].map(
                i => match_data[i] ? `${i}.${match_data[i]}` : '').filter(Boolean).join('\n');
              const messid = await session.send(`${h('at', { id: session.userId })}\n${session.text('.match_text')}\n${text}`);
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.channelId, messid[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            }
            //等待输入
            let wait_arry = [...(Array((match_data.length) - 1).keys())].map(i => (i + 1).toString());
            const wait_mess = await session.prompt(times)
            if (!wait_mess) {
              const timeoutmess = await session.send(session.text('.outtime_return'))
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, timeoutmess[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            } else if (wait_arry.includes(wait_mess)) {
              let numb = parseInt(wait_mess)
              let arodata
              try {
                arodata = await ctx.http.get(arona_url + '/image?name=' + match_data[numb])
              } catch (error) {
                logger.info('向arona请求时发生错误', error)
                return session.text('.error')
              }
              await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
              await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
            } else {
              const etext = await session.send(session.text('.num_error'))
              /*
              ctx.setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, etext[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
              */
            }

            //苗匹配没有结果的情况
          } else if (match_data.length == 0) {
            let arodata
            try {
              arodata = await ctx.http.get(arona_url + '/image?name=' + message)
            } catch (error) {
              logger.info('向arona请求时发生错误', error)
              return session.text('.error')
            }
            if (!arodata.data) {
              return session.text('.no_guide')
            }
            if (canvas_fun) {
              if (arodata.code == 200) {
                await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
                if (arodata.data[0].hash === "977fdd7d8e065dbbdb8c10b42d98b1c2") return "没有这样的攻略哦"
                return (h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
              }
              let i1 = 0, i2 = 0, i3 = 0, i4 = 0
              if (arodata.data.length == 2) {
                i1 = 0, i2 = 1, i3 = 1, i4 = 1
              } else if (arodata.data.length == 3) {
                i1 = 0, i2 = 1, i3 = 2, i4 = 2
              } else {
                i1 = 0, i2 = 1, i3 = 2, i4 = 3
              }
              console.log(arodata)
              const rimg = await create_guide_icon(
                'aronadata',
                arodata.data[i1].name,
                arodata.data[i2].name,
                arodata.data[i3].name,
                arodata.data[i4].name,)
              const imgmess = await session.send(h.image(rimg, "image/png"));
              let bui = []
              if (arodata.data.length == 2) {
                bui = [0, 1]
              } else if (arodata.data.length == 3) {
                bui = [0, 1, 2]
              } else {
                bui = [0, 1, 2, 3]
              }
              const text = bui.map(
                i => (`${i + 1}.${arodata.data[i].name}\n`)).join('')
              const messid = await session.send(`${h('at', { id: session.userId })}\n${session.text('.match_text')}\n${text}`)
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, messid[0])
                  session.bot.deleteMessage(session.bot.selfId, imgmess[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            } else {
              let bui = []
              if (arodata.data.length == 2) {
                bui = [0, 1]
              } else if (arodata.data.length == 3) {
                bui = [0, 1, 2]
              } else {
                bui = [0, 1, 2, 3]
              }
              const text = bui.map(
                i => (`${i + 1}.${arodata.data[i].name}\n`)).join('')
              const messid = await session.send(`${h('at', { id: session.userId })}\n${session.text('.match_text')}\n${text}`)
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, messid[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            }
            const wait_mess = await session.prompt(times)
            if (!wait_mess) {
              const timeoutmess = await session.send(session.text('.outtime_return'))
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, timeoutmess[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
            } else if (['1', '2', '3', '4'].includes(wait_mess)) {
              let numb = parseInt(wait_mess)
              if (arodata.data.length == 2) {
                numb >= 2 ? numb = 2 : numb = 1
              } else if (arodata.data.length == 3) {
                numb >= 3 ? numb = 3 : numb = numb
              }
              numb--
              try {
                arodata = await ctx.http.get(arona_url + '/image?name=' + arodata.data[numb].name)
              } catch (error) {
                logger.info('向arona请求时发生错误', error)
                return session.text('.error')
              }
              await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodata.data[0].content), arodata.data[0].hash, log_on)
              await session.send(h.image(pathToFileURL(resolve(root_guide + '/' + (arodata.data[0].hash + '.jpg'))).href))
            } else {
              const etext = await session.send(session.text('.num_error'))
              /*
              ctx.setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, etext[0])
                } catch (e) {
                  logger.info('撤回时出错：', e)
                }
              }, times)
              */
            }
          }
        }
      })

    logger.info('🟢 攻略功能加载完毕')

    //bawiki关卡
    //Alin and shangxue ’s ba map-guide v1 2024-04-05
    const map_json = await fmp.json_parse(`${root_json}/map_guide_shangxue.json`)
    ctx.command('关卡 <message:text>', "bawiki的推图攻略")
      .alias('推图')
      .example('关卡 h12-3')
      .action(async ({ session }, message) => {

        if (!message) {
          if (session.event.platform == 'qq') {
            return `ba推图攻略
🟢@机器人并发送：/关卡+空格+内容
示例：@机器人 /关卡 12-3
数据来源于ba.gamekee
`
          } else {
            return `ba推图攻略
🟢发送：关卡+空格+内容
示例：关卡 12-3
数据来源于ba.gamekee     
`
          }
        } else {
          const map = MatchMapName(message)
          if (typeof map == "string") {
            if (map == "Error") {
              return session.text('.input_error')
            } else {
              try {
                console.log()
                const return_mess = map_json[map].map(i => { return h.image(i) })
                return return_mess
              } catch (e) {
                logger.info('出现错误' + e)
                return session.text('.error')
              }
            }
          }
        }
      })

    ctx.command('攻略/国际服千里眼')
      .alias('千里眼')
      .action(async ({ session }) => {
        const arodatas = await ctx.http.get(arona_url + '/image?name=' + '国际服千里眼')
        if (arodatas.code == 200) {
          await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodatas.data[0].content), (arodatas.data[0].hash), log_on)
          return (h.image(pathToFileURL(resolve(root_guide + '/' + (arodatas.data[0].hash + '.jpg'))).href))
        } else {
          return session.text('.error')
        }
      })

    ctx.command('攻略/国服千里眼')
      .action(async ({ session }) => {
        const arodatas = await ctx.http.get(arona_url + '/image?name=' + '国服未来视')
        if (arodatas.code == 200) {
          await fmp.guide_download_image(root_guide, (arona_cdn + '/s' + arodatas.data[0].content), (arodatas.data[0].hash), log_on)
          return (h.image(pathToFileURL(resolve(root_guide + '/' + (arodatas.data[0].hash + '.jpg'))).href))
        } else {
          return session.text('.error')
        }
      })

  }
})




