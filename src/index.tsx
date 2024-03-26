//import区域
import { Context, Logger, Schema, } from 'koishi';
import { gacha_f } from './gacha/gacha_main';
import { guideConfig, guide_qq, guide_systeam } from './guide/guidesys';
import { } from "@satorijs/server-temp";
import { cal_favorable, plugin_ass } from './calculate/cal_favor';
import { active_get } from './get-active/get_active';
import { FMPS } from './FMPS/FMPS';
import { file_search, rootF } from './FMPS/FMPS_F';
import { match_file } from './Snae_match/match';
import { cal_level } from './calculate/cal_level';

export const inject = ['canvas', 'puppeteer']

export const using = ['canvas', 'puppeteer']




//koishi定义区
export const name = "ba-plugin";
export const usage = `
<div style="font-size:45px; font-weight:bold; font-style: italic; text-align:center;">
<span style="color: #66ccff;">BA</span>Plugin
<div style="border:1px solid #CCC"></div> 

</div>
<h2>1.0版本对绝大部分功能进行了重构</h2>
<h3>第一次启动请等待下载资源1-2分钟，指令加载不出来请重启commands插件</h3>

<h2>数据来源于:</h2>
<ul>
  <li> <a href="https://ba.gamekee.com/"> bawiki  </a> </li>
  <li> <a href="https://doc.arona.diyigemt.com/"> AronaBot </a> </li>
  <li> <a href="https://schale.gg/"> shale.gg </a> </li>
  <li> <a href="https://github.com/lgc-NB2Dev/bawiki-data"> 饼干大佬的ba-wiki数据库  </a> </li>
  <li> <a href="https://arona.ai/"> Arona.ai </a> </li>
  <li> <a href="https://arona.icu/main"> 什亭之匣 </a> </li>
  <li> <a href="https://bluearchive.wikiru.jp/"> 日站wiki </a> </li>
</ul>
<div style="border:1px solid #CCC"></div> 

<h2>目前功能:</h2>
<ul>
  <li> Aronabot的攻略图 </li>
  <li> 角色好感升级所需计算 </li>
  <li> 玩家升级计算 </li>
  <li> 总力站档线及排名查询 </li>
  <li> 抽官方漫画 </li>
  <li> 抽卡模拟器 </li>
  <li> bawiki推图攻略 </li>
  <li> 活动查询 </li>
</ul>
<table>
  <thead>
    <tr>
      <th>贡献者</th>
      <th>内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/Sanaene">Sanaene</a></td>
      <td>攻略匹配、好感、升级的算法</td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/~shangxue">shangxue</a></td>
      <td>bawiki推图攻略的数据，还有些技术帮助~</td>
    </tr>
  </tbody>
</table>
`;


/*
'\n' +
"交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)\n" + "\n" +
"1.0版本对官方bot进行了适配，按钮等功能需要填入模板id\n" +
" ## 目前有以下功能:" + "\n" +
" - 群友早苗写的：\n" +
"   - 升级计算(升级)\n" +
"   - 好感计算(好感计算)\n" +
"   - 攒钻计算(攒钻)\n" +
" - 升级、好感计算、攒钻转图片输出\n" +
" - Aronabot的攻略图和角色评分查询(攻略)\n" +
" - 抽卡模拟器\n" +
" - 定期自动数据更新(需填入数据库服务器)-beta\n" +
" - 随机漫画和表情(攻略)\n"
*/


export interface Config {
  qqconfig: guide_qq
  guide: guideConfig
  // functionswitch: function_switch
}
//koishi控制台
export const Config: Schema<Config> = Schema.object({
  qqconfig: guide_qq,
  guide: guideConfig,

})


//代码区



const log = new Logger("ba-plugin")

const cos1 = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/'
export const root_all_img = rootF("bap-img")
export async function apply(ctx: Context, config: Config) {
  const root_json = await rootF("bap-json")
  const root_guide = await rootF("bap-guidesys")
  const fmp = new FMPS(ctx)

  async function init_download() {
    log.info('⬇️ 开始下载插件必须资源，请稍等哦（*＾-＾*）')
    try {
      const stu_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`)
      const stulen = stu_data.length
      for (let i = 0; i < stulen; i++) {
        await fmp.file_download(`${cos1}stu_icon_db_png/${stu_data[i].Id_db}.png`, await root_all_img, stu_data[i].Id_db + '.png')
        const num = Math.round((i / stulen) * 100)
        if (num == 25 || num == 50 || num == 75 || num == 95) {
          log.info('头像_1下载进度' + num + '%')
        }
      }
      log.info('✔️（1/3）学生头像_1下载完毕')

      for (let i = 0; i < stulen; i++) {
        await fmp.file_download(`${cos1}gacha-img/${stu_data[i].Id_db}.png`, await root_all_img, stu_data[i].Id_db + '_g.png')
        const num = Math.round((i / stulen) * 100)
        if (num == 25 || num == 50 || num == 75 || num == 95) {
          log.info('头像_2下载进度' + num + '%')
        }
      }
      log.info('✔️（2/3）学生头像_2下载完毕')

      for (let i = 0; i < plugin_ass.length; i++) {
        await fmp.file_download(`${cos1}img_file/${plugin_ass[i]}.png`, await root_all_img, plugin_ass[i] + '.png')
        const num = Math.round((i / plugin_ass.length) * 100)
        if (num == 25 || num == 50 || num == 75 || num == 95) {
          log.info('资源文件下载进度' + num + '%')
        }
      }
      log.info('✔️（3/3）资源下载完毕')

    } catch (e) {
      log.error('出现错误' + e)
      return
    }
  }

  async function initia() {
    log.info("🟡 正在更新json文件")
    const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
    const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F"
    const newhash = await ctx.http.get(hashurl)
    const oldjson = await fmp.json_parse(root_json + "/hash.json")

    function arraysEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (Object.keys(a[i]).length !== Object.keys(b[i]).length) return false;
        for (let key in a[i]) {
          if (a[i][key] !== b[i][key]) return false;
        }
      }
      return true;
    }
    if (!arraysEqual(newhash, oldjson)) {
      log.info("☁️🆕🟡云hash更新");
      await init_download()
    } else {
      log.info("☁️   🟢云hash未更新");
      //二次检测
      for (let i = 0; i < newhash.length; i++) {
        const jsons = await fmp.json_parse(`${root_json}/${oldjson[i].fname}`)
        if (jsons == null) {
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`)
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
        }
      }
      return
    }
    for (let i = 1; i < 4; i++) {
      try {
        await fmp.file_download(hashurl, root_json, 'hash.json')

        for (let i = 0; i < newhash.length; i++) {
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`)
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
        }
        for (let i = 0; i < newhash.length; i++) {
          if (/sms_/.test(newhash[i].fname)) {
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), match_file, `${newhash[i].fname}`)
          }
        }
        break
      } catch (e) {
        if (i < 3) {
          log.info("🟡json文件下载出错：进行第" + i + "次尝试" + e)
        } else {
          log.info("🔴" + i + "次尝试后依旧出错" + e)
          break
        }
      }
    }
    log.info("🟢 json文件更新完毕")
  }


  const fileb = await fmp.json_parse(root_json + "/hash.json")
  if (fileb == null) {
    const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
    const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F"
    const newhash = await ctx.http.get(hashurl)
    await fmp.file_download(hashurl, root_json, 'hash.json');
    for (let i = 1; i < 4; i++) {
      try {
        await fmp.file_download(hashurl, root_json, 'hash.json')

        for (let i = 0; i < newhash.length; i++) {
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`)
          await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
        }
        for (let i = 0; i < newhash.length; i++) {
          if (/sms_/.test(newhash[i].fname)) {
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), match_file, `${newhash[i].fname}`)
          }
        }
        break
      } catch (e) {
        if (i < 3) {
          log.info("🟡json文件下载出错：进行第" + i + "次尝试" + e)
        } else {
          log.info("🔴" + i + "次尝试后依旧出错" + e)
          break
        }
      }
    }
  }

  await initia()

  try {
    ctx.setInterval(async () => await initia(), 3 * 60 * 60 * 1000)
  } catch (e) {
    log.info(e)
  }



  ctx.plugin(guide_systeam, config)
  ctx.plugin(gacha_f, config)
  ctx.plugin(cal_favorable)
  ctx.plugin(cal_level)
  ctx.plugin(active_get, config)

}