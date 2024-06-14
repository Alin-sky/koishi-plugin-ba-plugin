//import区域
import { Context, Logger, Schema, Random } from 'koishi';
import { gacha_f } from './gacha/gacha_main';
import { guideConfig, guide_qq, guide_systeam } from './guide/guidesys';

import { cal_favorable, plugin_ass } from './calculate/cal_favor';
import { active_get } from './get-active/get_active';
import { FMPS } from './FMPS/FMPS';
import { file_search, rootF } from './FMPS/FMPS_F';
import { match_file, MatchStudentName } from './Snae_match/match';
import { cal_level } from './calculate/cal_level';

export const inject = ['canvas', 'puppeteer', "database"]

//export const using = ['canvas', 'puppeteer']

//koishi定义区
export const name = "ba-plugin";
export const usage = `
<div style="font-size:45px; font-weight:bold; font-style: italic; text-align:center;">
<span style="color: #66ccff;">BA</span>Plugin
<div style="border:1px solid #CCC"></div> 

</div>
<div style="border:2px solid #CCC"></div>

<div>
<div style="text-align:center;"> <h2>注意</h2></div>
<h4>1.0版本对绝大部分功能进行了重构，指令用法可能改变</h4>
<h4>第一次启动请等待下载资源1-2分钟，指令加载不出来请重启commands插件</h4>
<h4>如果有报错可尝试开启“每次重载都下载资源”，更新下资源</h4>
</div>

<div style="border:1px solid #CCC"></div> 
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
  <li> 玩家升级所需计算 </li>
  <li> 总力站档线及排名查询 </li>
  <li> 抽官方漫画 </li>
  <li> 抽卡模拟器 </li>
  <li> bawiki推图攻略 </li>
  <li> 活动查询 </li>
  <li> 数据自动更新 <li>
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
      <td>学生匹配、好感、升级的算法</td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/~shangxue">shangxue</a></td>
      <td>bawiki推图攻略的数据，还有些技术帮助~</td>
    </tr>
  </tbody>
</table>

`;

export interface plugin_Config {
  autoupd: "本地" | "云端"
  draw_modle: "canvas" | "puppeteer"
  auto_update: boolean
}

export const plugin_Config: Schema<plugin_Config> = Schema.intersect([
  Schema.object({
    autoupd: Schema.union([
      Schema.const('本地').description('本地'),
      Schema.const('云端').description('云端'),
    ]).description('选择数据更新方法  本地更新为实验性功能，不能保证稳定性和数据准确性').experimental().role('radio').default("云端"),
    draw_modle: Schema.union([
      Schema.const('canvas').description('canvas'),
      Schema.const('puppeteer').description('puppeteer'),
    ]).description('选择渲染方法').role('radio').required(),
    auto_update: Schema.boolean().default(true).experimental().description('是否每次重载都下载资源'),
  }).description('插件基础设置'),
])


export interface Config {
  plugin_config: plugin_Config
  qqconfig: guide_qq
  guide: guideConfig
}
//koishi控制台
export const Config: Schema<Config> = Schema.object({
  plugin_config: plugin_Config,
  qqconfig: guide_qq,
  guide: guideConfig,
})

//代码区

//Alin’s Auto Update v.rc 2024-05-22
const log = new Logger("ba-plugin")
const cos1 = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/'
const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
const jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F"
export const root_all_img = rootF("bap-img")
export async function apply(ctx: Context, config: Config) {
  const root_json = await rootF("bap-json")
  const root_guide = await rootF("bap-guidesys")
  const fmp = new FMPS(ctx)
  const random = new Random(() => Math.random())
  log.info(`渲染模式:${config.plugin_config.draw_modle == "canvas" ? "canvas" : 'puppeteer'}`)


  async function auto_data_update_function() {
    //抽样判断文件是否存在
    async function file_random_survey() {
      let status: boolean = false
      const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
      const newhash = await ctx.http.get(hashurl)
      const oldjson = await fmp.json_parse(root_json + "/hash.json")
      const stu_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`)
      for (let i = 0; i < newhash.length; i++) {
        try {
          await fmp.json_parse(`${root_json}/${oldjson[i].fname}`)
        } catch (e) {
          await fmp.file_download(hashurl, root_json, 'hash.json')
          for (let i = 0; i < newhash.length; i++) {
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`)
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
          }
          log.error(e)
          return status = false
        }
      }
      async function mod1() {
        const pluass = random.pick(plugin_ass, 20);
        const fileChecks = pluass.map(async i => {
          return await file_search(`${await root_all_img}/${i}.png`);
        });
        const results = await Promise.all(fileChecks);
        const status = results.every(result => result);
        return status
      }
      async function mod2() {
        const pluass = random.pick(stu_data, 30);
        const fileChecks = pluass.map(async i => {
          return await file_search(`${await root_all_img}/${(i as { Id_db: any }).Id_db}.png`);
        });
        const results = await Promise.all(fileChecks);
        const status = results.every(result => result);
        return status
      }
      async function mod3() {
        const pluass = random.pick(stu_data, 30);
        const fileChecks = pluass.map(async i => {
          return await file_search(`${await root_all_img}/${(i as { Id_db: any }).Id_db}_g.png`);
        });
        const results = await Promise.all(fileChecks);
        const status = results.every(result => result);
        return status
      }
      const statu1 = await mod1();
      const statu2 = await mod2()
      const statu3 = await mod3()
      if (!statu1 && !statu2 && !statu3) {
        return status = false
      } else {
        return status = true
      }
    }

    async function init_download() {
      log.info('⬇️ 开始下载插件必须资源，请稍等哦（*＾-＾*）')
      const hashurl = 'https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json'
      const newhash = await ctx.http.get(hashurl)
      for (let i = 0; i < newhash.length; i++) {
        try {
          await fmp.json_parse(`${root_json}/${newhash[i].fname}`)
        } catch (e) {
          await fmp.file_download(hashurl, root_json, 'hash.json')
          for (let i = 0; i < newhash.length; i++) {
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_guide, `${newhash[i].fname}`)
            await fmp.file_download((`${jsonurl}${newhash[i].fname}`), root_json, `${newhash[i].fname}`)
          }
          log.error(e)
        }
      }
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

        if (!await file_random_survey()) {
          log.info("🟡本地资源检测未通过");
          await init_download()
        }
        const stu_data = await fmp.json_parse(`${root_json}/sms_studata_toaro_stu.json`)
        if (!await file_search(`${await root_all_img}/${(stu_data[stu_data.length - 1] as { Id_db: any }).Id_db}.png`)) {
          await init_download()
        }

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
        if (!await file_random_survey()) {
          log.info("🟡本地资源随机检测未通过");
          await init_download()
        }
        if (config.plugin_config.auto_update) {
          log.info("🟡本地资源随机更新");
          await init_download()
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
  }

  if (config.plugin_config.autoupd == "云端") {
    await auto_data_update_function()
  } else {

  }

  //await init_download()

  try {
    //ctx.setInterval(async () => await initia(), 3 * 60 * 60 * 1000)
  } catch (e) {
    log.info(e)
  }

  ctx.plugin(guide_systeam, config)
  ctx.plugin(gacha_f, config)
  ctx.plugin(cal_favorable, config)
  ctx.plugin(cal_level)
  ctx.plugin(active_get, config)

}