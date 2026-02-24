var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/locales/zh-CN.yml
var require_zh_CN = __commonJS({
  "src/locales/zh-CN.yml"(exports2, module2) {
    module2.exports = { commands: { 攻略: { messages: { error: "呜呜，出错惹😿，老师稍后再试试？", no_guide: "呜呜，没有找到对应的攻略😿", input_error: "呜呜，输入有误", match_text: "呜呜，没有匹配到结果,sensei要找的是这些吗？输入序号查看", outtime_return: "呜呜，等待超时，请重新触发指令", mdtext: "sensei！这是爱丽丝找到的内容", num_error: "呜呜，输入的不是指定序号，请重新触发指令" } }, 好感计算: { messages: { error: "呜呜，出错惹😿，老师稍后再试试？", "lev>100": "哼～最高好感度无法超过100级!", "lev<1": "好感度最低为1级", "lev:int": "好感度等级只能是整数", "lev>lev": "目标好感度必须高于起始好感度！", "lev=null": "未匹配到好感度值" } }, 总力档线: { messages: { error: "呜呜，出错惹😿，老师稍后再试试", wait: "请老师稍等哦，正在获取数据" } }, 大决战档线: { messages: { error: "呜呜，出错惹😿，老师稍后再试试", wait: "请老师稍等哦，正在获取数据" } }, 关卡: { messages: { error: "呜呜，出错惹😿，老师稍后再试试？", no_guide: "呜呜，没有找到对应的攻略😿", input_error: "呜呜，输入有误", match_text: "呜呜，没有匹配到结果,sensei要找的是这些吗？输入序号查看", outtime_return: "呜呜，等待超时，请重新触发指令", mdtext: "sensei！这是爱丽丝找到的内容", num_error: "呜呜，输入的不是指定序号，请重新触发指令" } } }, _config: { templateConfig1: "xxx" } };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Config: () => Config,
  apply: () => apply,
  inject: () => inject,
  name: () => name,
  plugin_Config: () => plugin_Config,
  root_all_img: () => root_all_img,
  usage: () => usage
});
module.exports = __toCommonJS(src_exports);
var import_koishi9 = require("koishi");

// src/gacha/gacha_main.ts
var import_koishi5 = require("koishi");

// src/FMPS/FMPS_F.ts
var import_koishi = require("koishi");
var fs = __toESM(require("fs/promises"));
var path = __toESM(require("path"));
var log = "ba-plugin-FMPS";
var logger = new import_koishi.Logger(log);
var ctx = new import_koishi.Context();
async function rootF(mainfile, filename) {
  const mfile = mainfile ? mainfile : "bap-FMDS";
  const filepath = filename ? "/" + filename : "";
  let root;
  for (let i = 0; i < 3; i++) {
    try {
      root = path.join(ctx.baseDir, "data", mfile + filepath);
      await fs.mkdir(root, { recursive: true });
      break;
    } catch (error2) {
      if (i == 2) {
        logger.info("尝试创建文件夹" + i + "次后依旧出错");
      }
    }
  }
  return root;
}
__name(rootF, "rootF");
async function file_search(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error2) {
    return false;
  }
}
__name(file_search, "file_search");

// src/FMPS/FMPS.ts
var import_koishi2 = require("koishi");
var import_console = require("console");
var path2 = __toESM(require("path"));
var fs2 = __toESM(require("fs"));
var import_zh_cn = __toESM(require("zh_cn"));
var import_chinese_s2t_pro = require("chinese-s2t-pro");
var import_crypto = __toESM(require("crypto"));
var log1 = "ba-plugin-FMPS";
var logger2 = new import_koishi2.Logger(log1);
var student_data_cn = "https://schaledb.com/data/cn/students.json";
var student_data_jp = "https://schaledb.com/data/jp/students.json";
var student_data_tw = "https://schaledb.com/data/tw/students.json";
var student_data_kr = "https://schaledb.com/data/kr/students.json";
var student_data_zh = "https://schaledb.com/data/zh/students.json";
var FMPS = class {
  static {
    __name(this, "FMPS");
  }
  ctx;
  constructor(ctx3) {
    this.ctx = ctx3;
  }
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
  async json_parse(path4) {
    const attempts = 3;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const data = await fs2.promises.readFile(path4, { encoding: "utf-8" });
        return JSON.parse(data);
      } catch (error2) {
        logger2.info(`尝试读取${path4}失败，尝试次数：${attempt}`);
        if (attempt === attempts) {
          logger2.info(`尝试${attempt}次后依旧报错，停止尝试`);
          return null;
        }
        await new Promise((resolve3) => setTimeout(resolve3, 500));
      }
    }
    return null;
  }
  /**
   * json文件创建函数
   * @param path 生成文件存放的路径
   * @param fname 文件名
   * @param json 传入的内容
   * @returns 返回文件路径
   */
  async json_create(dirPath, fname, json) {
    if (!fname.endsWith(".json")) {
      fname += ".json";
    }
    const filePath = path2.join(dirPath, fname);
    const data = JSON.stringify(json, null, 2);
    await fs2.promises.writeFile(filePath, data, "utf8");
    return filePath;
  }
  /**
   * buffer图像储存函数
   * @param buffer 传入的buffer
   * @param dirpath 要保存到的路径
   * @param fname 文件名，带格式
   */
  async img_save(buffer, dirpath, fname) {
    try {
      if (!fs2.existsSync(dirpath)) {
        fs2.mkdirSync(dirpath, { recursive: true });
      }
      const filePath = path2.join(dirpath, fname);
      fs2.writeFile(filePath, buffer, (err) => {
        if (err) {
          logger2.info("出现错误：" + err);
        } else {
          return filePath;
        }
      });
    } catch (e) {
      logger2.info("出现错误：" + e);
    }
  }
  /**
   * 文件下载函数
   * @param url 传入下载的链接
   * @param dirPath 完整的文件存放的路径
   * @param fname 带拓展名的文件名
   */
  async file_download(url, dirPath, fname) {
    for (let i = 1; i <= 3; i++) {
      try {
        const response = await this.ctx.http.get(url, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response);
        const fullPath = path2.join(dirPath, fname);
        await fs2.promises.mkdir(dirPath, { recursive: true });
        await fs2.promises.writeFile(fullPath, buffer);
        break;
      } catch (error2) {
        const status = error2.response ? error2.response.status : "无法获取";
        logger2.info(`文件下载出现错误，进行第${i}次尝试: 
                Error: HTTP error! status: ${status}
                url:${url}
                `);
        if (i === 3) {
          logger2.info(`${i}次尝试后依旧出错😭`);
          return error2;
        }
      }
    }
  }
  /**
   * 模仿饼干🍪佬的自动补齐换皮别名和拼英
   * @param text 传入文本
   * @returns 
   */
  complete_alias(text) {
    let o = [
      ["水", "水着", "泳装"],
      ["私服", "便服"],
      ["兔", "兔女郎"],
      ["温泉"],
      ["新年", "春", "正月"],
      ["应援", "拉拉", "应援团", "啦啦"],
      ["圣诞", "圣诞节"],
      ["妹抖", "女仆"],
      ["体操服", "体操", "运动", "体", "运动服"],
      ["单车", "骑行"],
      ["野营", "露营"],
      ["幼女", "幼", "铜", "小"],
      ["礼", "礼服"],
      ["新年", "春", "正月"],
      ["导游", "导"],
      ["乐队"]
    ];
    function conversions_pinyin(input) {
      input = input.replace(/（/g, "(").replace(/）/g, ")");
      const parts = input.split(/(\([^)]+\))/g);
      let result = "";
      parts.forEach((part) => {
        if (part.startsWith("(") && part.endsWith(")")) {
          const content = part.slice(1, -1);
          const pinyinArray = (0, import_zh_cn.default)(content, { style: import_zh_cn.default.STYLE_NORMAL });
          result += "(" + pinyinArray.join("") + ")";
        } else {
          const pinyinArray = (0, import_zh_cn.default)(part, { style: import_zh_cn.default.STYLE_NORMAL });
          result += pinyinArray.join("");
        }
      });
      return result;
    }
    __name(conversions_pinyin, "conversions_pinyin");
    const regex = /\(([^)]+)\)/g;
    const matches = text.match(regex);
    const names = text.split(/\([^)]+\)/);
    let extractedText = "";
    let output = [conversions_pinyin(text)];
    const type = [
      "泳装",
      "便服",
      "兔女郎",
      "温泉",
      "新年",
      "应援团",
      "圣诞节",
      "女仆",
      "运动服",
      "骑行",
      "露营",
      "小",
      "礼服",
      "正月",
      "导游",
      "乐队"
    ];
    if (matches) {
      for (const match of matches) {
        extractedText = match.slice(1, -1);
      }
    }
    if (type.includes(extractedText)) {
      let i = type.indexOf(extractedText);
      for (let ii = 0; ii < o[i].length; ii++) {
        output.push(names[0] + o[i][ii]);
        output.push(o[i][ii] + names[0]);
      }
      return output;
    } else {
      return output;
    }
  }
  /**
   * 学生生日爬取
   * @param root 存储json文件的路径
   */
  async student_birthdays_get(root) {
    const studata_jp = await this.ctx.http.get(student_data_jp);
    const studata_cn = await this.ctx.http.get(student_data_cn);
    let arry = [];
    try {
      for (let i = 0; i < studata_jp.length; i++) {
        arry.push(
          {
            "Id": (1e4 + i).toString(),
            "Id_db": studata_jp[i].Id,
            "Name": studata_cn[i].Name,
            "Birthday": studata_jp[i].Birthday
          }
        );
      }
    } catch (e) {
      logger2.info("数据更新时发生错误", e);
    }
    const jsonString = JSON.stringify(arry, null, 2);
    fs2.writeFile(`${root}/studata_birthdays.json`, jsonString, (err) => {
      if (err) {
        logger2.info("数据更新时发生错误", import_console.error);
      } else {
        logger2.info("数据更新完毕");
      }
    });
  }
  /**
   * 学生json数据的自动创建函数，爬取db
   * @param root 存储json文件的路径
   */
  async match_auto_update(root) {
    const startTime = (/* @__PURE__ */ new Date()).getTime();
    logger2.info("正在进行本地学生数据更新...");
    const studata_cn = await this.ctx.http.get(student_data_cn);
    const studata_jp = await this.ctx.http.get(student_data_jp);
    const studata_kr = await this.ctx.http.get(student_data_kr);
    const studata_tw = await this.ctx.http.get(student_data_tw);
    const studata_zh = await this.ctx.http.get(student_data_zh);
    let arry = [];
    let nicname = await this.ctx.http.get("https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2Fsms_studata_main.json");
    try {
      for (let i = 0; i < studata_cn.length; i++) {
        let nic = [];
        let twtxt;
        let alias_cn = this.complete_alias(studata_cn[i].Name.replace(/（/g, "(").replace(/）/g, ")"));
        let alias_in = this.complete_alias(studata_tw[i].Name.replace(/（/g, "(").replace(/）/g, ")"));
        let nameEn = studata_cn[i].PathName;
        if (studata_jp[i].Name == studata_tw[i].Name || studata_tw[i].Name == "") {
          twtxt = (0, import_chinese_s2t_pro.simpleLine2TL)(studata_cn[i].Name);
          twtxt = twtxt.replace(/（/g, "(").replace(/）/g, ")");
        } else {
          twtxt = studata_tw[i].Name.replace(/（/g, "(").replace(/）/g, ")");
        }
        if (nameEn.includes("_")) {
          nameEn = nameEn.replace(/_(.+)/, " ($1)");
        }
        if (!nicname[i] || !nicname[i].NickName) {
          try {
            for (let i2 = 0; i2 < alias_cn.length; i2++) {
              nic.push(alias_cn[i2]);
            }
          } catch (error2) {
            logger2.info("数据更新时发生错误-", error2);
          }
        } else {
          nic = nicname[i].NickName;
          for (let i2 = 0; i2 < alias_cn.length; i2++) {
            if (!nic.includes(alias_cn[i2])) {
              nic.push(alias_cn[i2]);
            }
          }
        }
        arry.push(
          {
            "Id": (1e4 + i).toString(),
            "Id_db": studata_cn[i].Id,
            "FirstName_jp": studata_jp[i].FamilyName,
            "FirstName_zh": studata_cn[i].FamilyName,
            "Name_jp": studata_jp[i].Name.replace(/（/g, "(").replace(/）/g, ")"),
            "Name_en": nameEn,
            "Name_zh_tw": twtxt,
            "Name_kr": studata_kr[i].Name,
            "Name_zh_cn": studata_cn[i].Name.replace(/（/g, "(").replace(/）/g, ")"),
            "Name_zh_ft": studata_zh[i].Name.replace(/（/g, "(").replace(/）/g, ")"),
            "NickName": nic
          }
        );
      }
    } catch (error2) {
      logger2.info("数据更新时发生错误", error2);
    }
    const jsonString = JSON.stringify(arry, null, 2);
    fs2.writeFile(`${root}/sms_studata_main.json`, jsonString, (err) => {
      if (err) {
        logger2.info("数据更新时发生错误", import_console.error);
      } else {
        const endTime = (/* @__PURE__ */ new Date()).getTime();
        logger2.info("数据更新完毕,用时" + (endTime - startTime) * 1e-3 + "秒");
      }
    });
  }
  /**
   * 芝士自动生成sanae match to arona键值表的函数
   * @param root 文件夹路径
   */
  async sanae_match_refinement(root) {
    const startTime = (/* @__PURE__ */ new Date()).getTime();
    var arrys = [];
    const studata_zh = await this.ctx.http.get(student_data_zh);
    try {
      let extractedText = "";
      let to_arona_name = "";
      const type = [
        "泳装",
        "便服",
        "兔女郎",
        "温泉",
        "新年",
        "应援团",
        "圣诞节",
        "女仆",
        "运动服",
        "骑行",
        "露营",
        "幼女",
        "礼服",
        "正月",
        "导游",
        "乐队"
      ];
      const regex = /\(([^)]+)\)/g;
      const supplementary_name = await this.json_parse(root + "/sms_to_arona_data_revisions.json");
      let ss = 0;
      for (let i = 0; i < studata_zh.length; i++) {
        const db_name = studata_zh[i].Name.replace(/（/g, "(").replace(/）/g, ")");
        const matches = db_name.match(regex);
        const names = db_name.split(/\([^)]+\)/);
        if (matches) {
          for (const match of matches) {
            extractedText = match.slice(1, -1);
          }
          let i2 = type.indexOf(extractedText);
          to_arona_name = type[i2] + names[0];
        } else {
          to_arona_name = names[0];
        }
        if (supplementary_name[ss].Id == (1e4 + i).toString()) {
          to_arona_name = supplementary_name[ss].MapName;
          ss == supplementary_name.length - 1 ? ss = supplementary_name.length - 1 : ss++;
        }
        arrys.push(
          {
            "Id": (1e4 + i).toString(),
            "Id_db": studata_zh[i].Id,
            "MapName": to_arona_name
          }
        );
      }
    } catch (error2) {
      logger2.info("数据更新时发生错误-sanae_match_refinement", error2);
    }
    const jsonString = JSON.stringify(arrys, null, 2);
    fs2.writeFile(`${root}/sms_studata_toaro_stu.json`, jsonString, (err) => {
      if (err) {
        logger2.info("数据更新时发生错误", import_console.error);
      } else {
        const endTime = (/* @__PURE__ */ new Date()).getTime();
        logger2.info("sanae_match_to_arona_data数据生成完毕,用时" + (endTime - startTime) * 1e-3 + "秒");
      }
    });
  }
  /**
   * 检测to arona部分的数据是否是精确匹配
   * @param sms_arona 传入sanae match systeam to arona data的json，使用json_parse解析
   */
  async name_detection(sms_arona, type) {
    let key;
    let errnum = 0;
    if (type == 1) {
      key = "MapName";
    } else if (type == 2) {
      key = "Name";
    }
    const startTime = (/* @__PURE__ */ new Date()).getTime();
    try {
      for (let i = 0; i < sms_arona.length; i++) {
        const url = "https://arona.diyigemt.com/api/v2/image?name=" + sms_arona[i][key];
        let arona = await this.ctx.http.get(url);
        if (arona.code == 101) {
          errnum++;
          logger2.info(`名称检测中发现有未精确匹配：
                    学生名称：${sms_arona[i][key]}
                    id:${i}
                    URL: ${url}
                    arona.code:${arona.code}
                    `);
          logger2.info("Arona return: " + arona);
          console.log(arona);
        }
      }
      const endTime = (/* @__PURE__ */ new Date()).getTime();
      if (errnum != 0) {
        logger2.info("⚠️ sanae_match_to_arona_data数据检测完毕，发现" + errnum + "个问题,用时" + (endTime - startTime) * 1e-3 + "秒");
      } else {
        logger2.info("🟢 sanae_match_to_arona_data数据检测完毕，未发现问题,用时" + (endTime - startTime) * 1e-3 + "秒");
      }
    } catch (error2) {
      logger2.info("数据检测中发生错误：", error2);
    }
  }
  /**
   * 刷新机器人的令牌并上传图片到指定频道,抄的上学的，上学抄的22的（）
   * @param data - 图片数据或者文件路径(buffer)
   * @param appId - 机器人AppID
   * @param secret - 机器人Secret
   * @param channelId - 频道ID
   */
  async img_to_channel(data, appId, secret, channelId) {
    async function refreshToken(bot2) {
      const { access_token: accessToken, expires_in: expiresIn } = await this.ctx.http.post("https://bots.qq.com/app/getAppAccessToken", {
        appId: bot2.appId,
        clientSecret: bot2.secret
      });
      bot2.token = accessToken;
      await this.ctx.setTimeout(() => refreshToken.bind(this)(bot2), (expiresIn - 30) * 1e3);
    }
    __name(refreshToken, "refreshToken");
    const bot = { appId, secret, channelId };
    await refreshToken.bind(this)(bot);
    const payload = new FormData();
    payload.append("msg_id", "0");
    payload.append("file_image", new Blob([data], { type: "image/png" }), "image.jpg");
    await this.ctx.http.post(`https://api.sgroup.qq.com/channels/${bot.channelId}/messages`, payload, {
      headers: {
        Authorization: `QQBot ${bot["token"]}`,
        "X-Union-Appid": bot.appId
      }
    });
    const md5 = import_crypto.default.createHash("md5").update(data).digest("hex").toUpperCase();
    return `https://gchat.qpic.cn/qmeetpic/0/0-0-${md5}/0`;
  }
  /**
   * 攻略系统的图片下载和调用函数
   * @param folderPath 传入的文件夹目录（一般是root）
   * @param imageUrl 图片url
   * @param imageName 图片名称，一般是哈希值，没有拓展名
   * @param loggers 是否开日志
   */
  async guide_download_image(folderPath, imageUrl, imageName, loggers) {
    const imagePath = path2.join(folderPath, imageName + ".jpg");
    if (fs2.existsSync(imagePath)) {
      loggers ? logger2.info("🟢 文件已存在，使用本地文件") : "";
    } else {
      for (let i = 1; i < 4; i++) {
        try {
          const response = await this.ctx.http.get(imageUrl, { responseType: "arraybuffer" });
          const buffer = Buffer.from(response);
          await fs2.promises.mkdir(folderPath, { recursive: true });
          await fs2.promises.writeFile(imagePath, buffer);
          loggers ? logger2.info("图片文件未找到，已成功下载 ⬇️") : "";
          break;
        } catch (error2) {
          const status = error2.response ? error2.response.status : "无法获取";
          logger2.info(`文件下载出现错误，进行第${i}次尝试: Error: HTTP error! status: ${status}`);
          if (i === 3) {
            logger2.info(`${i}次尝试后依旧出错😭`);
          }
        }
      }
    }
    return imagePath;
  }
  /**
   * 文件删除函数
   * @param dirPath 文件夹路径
   * @param file 文件名称，缺省时将删除文件夹内全部内容
   */
  async file_delete(dirPath, file) {
    const fs3 = require("fs").promises;
    if (file) {
      const filePath = path2.join(dirPath, file);
      try {
        await fs3.unlink(filePath);
        logger2.info(`文件 ${filePath} 已被删除`);
      } catch (error2) {
        logger2.info(`删除文件时出错: ${error2}`);
      }
    } else {
      try {
        await fs3.rmdir(dirPath, { recursive: true });
        logger2.info(`目录 ${dirPath} 及其内容已被删除`);
      } catch (error2) {
        logger2.info(`删除目录时出错: ${error2}`);
      }
    }
  }
  /**
   * 将Unix时间戳转换为指定时区的时间字符串，格式为YYYY-MM-DDTHH:mm:ss+HH:MM。
   * @param {number} timestamp - Unix时间戳（秒）
   * @returns {string} 返回格式化的时间字符串
   */
  formatTimestamp(timestamp) {
    const offset = 8;
    const date = new Date(timestamp * 1e3);
    const localDate = new Date(date.getTime() + offset * 36e5);
    let isoString = localDate.toISOString();
    let dateTime = isoString.slice(0, 19);
    const sign = offset < 0 ? "-" : "+";
    const hoursOffset = String(Math.floor(Math.abs(offset))).padStart(2, "0");
    const minutesOffset = String(Math.abs(offset) * 60 % 60).padStart(2, "0");
    const offsetString = `${sign}${hoursOffset}:${minutesOffset}`;
    return `${dateTime}${offsetString}`;
  }
};

// src/guide/guidesys.ts
var import_koishi3 = require("koishi");
var import_url = require("url");
var import_path = require("path");
var log2 = "ba-plugin-guide";
var logger3 = new import_koishi3.Logger(log2);
var random = new import_koishi3.Random(() => Math.random());
var guide_qq = import_koishi3.Schema.intersect([
  import_koishi3.Schema.object({
    markdown_setting: import_koishi3.Schema.object({
      table: import_koishi3.Schema.array(import_koishi3.Schema.object({
        MD模板id: import_koishi3.Schema.string(),
        MD模板参数1: import_koishi3.Schema.string(),
        MD模板参数2: import_koishi3.Schema.string(),
        MD模板参数3: import_koishi3.Schema.string(),
        MD模板参数4: import_koishi3.Schema.string()
      })).role("table"),
      qqguild: import_koishi3.Schema.string().description("QQ频道id，可通过inspect获取，应该是纯数字")
    }).collapse()
  }).description("QQ官方bot设置,使用QQ频道来发送md图片")
]);
var guideConfig = import_koishi3.Schema.intersect([
  import_koishi3.Schema.object({
    avatar: import_koishi3.Schema.boolean().default(true).description("模糊匹配时生成学生头像图（canvas）"),
    logger: import_koishi3.Schema.boolean().default(true).description("每次攻略请求输出日志"),
    time: import_koishi3.Schema.number().default(2e4).description("攻略、抽卡系统的等待时间（单位：毫秒）")
  }).description("攻略系统设置")
]);
var maxmap_sms = 28;
var synonyms = {
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
var guide_systeam = {
  async apply(ctx3, config) {
    ctx3.i18n.define("zh-CN", require_zh_CN());
    const root = await rootF("bap-guidesys");
    const root_guide = await rootF("bap-guidesys", "guide_aronaimg");
    const root_json = await rootF("bap-json");
    const root_img = await rootF("bap-img");
    const drawm = config.plugin_config.draw_modle == "canvas" ? "" : "file://";
    const local_path = `${drawm}${root_img}`;
    const arona_url = "https://arona.diyigemt.com/api/v2";
    const arona_cdn = "https://arona.cdn.diyigemt.com/image";
    const db_imgdata_url = "https://schaledb.com/images/student/collection/";
    const fmp2 = new FMPS(ctx3);
    const log_on = config.guide.logger;
    const times = config.guide.time;
    const mdid = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板id"];
    const mdkey1 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数1"];
    const mdkey2 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数2"];
    const mdkey3 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数3"];
    const mdkey4 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数4"];
    const qqguild_id = config.qqconfig.markdown_setting.qqguild;
    const canvas_fun = config.guide.avatar;
    var mdswitch = false;
    let mds = false;
    if (config.qqconfig.markdown_setting.table[1]) {
      mds = true;
    } else {
      if (mdkey2 && mdkey3 && mdkey4) {
        mds = true;
      } else {
        mds = false;
      }
    }
    if (mdid && mds && mdkey1 && qqguild_id) {
      logger3.info("🟢 攻略已启用MD消息模板");
      mdswitch = true;
    } else {
      logger3.info("⚠️ md相关设置未完善,未启用MD模板");
      mdswitch = false;
    }
    async function initialisation_locally_generated() {
      const startTime = (/* @__PURE__ */ new Date()).getTime();
      await fmp2.match_auto_update(root_json);
      await fmp2.sanae_match_refinement(root_json);
      const stujson = await fmp2.json_parse(`${root_json}/sms_studata_main.json`);
      logger3.info("学生总数" + stujson.length);
      const smstoarona_json = await fmp2.json_parse(root_json + "/sms_studata_toaro_stu.json");
      logger3.info("to_arona_data学生总数" + smstoarona_json.length);
      const other_json = await fmp2.json_parse(root_json + "/sms_othersmatchlib.json");
      logger3.info("others_match总数" + other_json.length);
      await fmp2.name_detection(smstoarona_json, 1);
      await fmp2.name_detection(other_json, 2);
      const endTime = (/* @__PURE__ */ new Date()).getTime();
      logger3.info("数据更新完毕！用时" + (endTime - startTime) * 1e-3 + "秒");
    }
    __name(initialisation_locally_generated, "initialisation_locally_generated");
    if (config.plugin_config.autoupd == "本地") {
      await initialisation_locally_generated();
    }
    async function initia() {
      const hashurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json";
      const jsonurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F";
      const newhash = await ctx3.http.get(hashurl2);
      try {
        await fmp2.file_download(hashurl2, root_json, "hash.json");
        const oldjson = await fmp2.json_parse(root_json + "/hash.json");
        for (let i = 0; i < newhash.length; i++) {
          await fmp2.file_download(`${jsonurl2}${newhash[i].fname}`, root, `${newhash[i].fname}`);
          await fmp2.file_download(`${jsonurl2}${newhash[i].fname}`, root_json, `${newhash[i].fname}`);
        }
        logger3.info("🟢 json文件下载完毕");
      } catch (e) {
        logger3.info("json文件下载出错：" + e);
      }
      for (let i = 0; i < newhash.length; i++) {
        if (/sms_/.test(newhash[i].fname)) {
          await fmp2.file_download(`${jsonurl2}${newhash[i].fname}`, match_file, `${newhash[i].fname}`);
        }
      }
    }
    __name(initia, "initia");
    try {
      setInterval(async () => {
        await initia(), logger3.info("⏱️ 定时攻略数据更新完毕");
      }, 6 * 60 * 60 * 1e3);
    } catch (e) {
      logger3.info(e);
    }
    function markdow_fuzzy(session, url, n1, n2, n3, n4, n5, n6) {
      let three = null;
      let four = null;
      let five = null;
      let six = null;
      let img = null;
      let imgurl = null;
      let width = 720;
      let height = 410;
      let t1;
      let t2;
      if (!n5 && !n6) {
        height = 290;
      }
      if (url) {
        img = {
          key: mdkey3,
          values: [`![img#${width}px #${height}px]`]
        };
        imgurl = {
          key: mdkey4,
          values: [`(${url})`]
        };
      }
      if (mdkey2 && mdkey3) {
        t1 = {
          key: mdkey1,
          values: [session.text(".mdtext")]
        };
        t2 = {
          key: mdkey2,
          values: ["点击按钮直接查询哦"]
        };
      } else {
        if (url) {
          imgurl = {
            key: mdkey1,
            values: [`${url}`]
          };
        }
      }
      if (n3) {
        three = {
          render_data: { label: n3 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n3}`,
            enter: true
          }
        };
      }
      if (n4) {
        four = {
          render_data: { label: n4 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n4}`,
            enter: true
          }
        };
      }
      if (n5) {
        five = {
          render_data: { label: n5, style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n5}`,
            enter: true
          }
        };
      }
      if (n6) {
        six = {
          render_data: { label: n6, style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: `/攻略 ${n6}`,
            enter: true
          }
        };
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
            imgurl
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
                      type: 2,
                      // 指令按钮
                      permission: { type: 2 },
                      // 所有人可点击
                      data: `/攻略 ${n1}`,
                      // 点击后发送
                      enter: true
                      // 若 false 则填入输入框
                    }
                  },
                  {
                    render_data: { label: n2, style: 1 },
                    action: {
                      type: 2,
                      permission: { type: 2 },
                      data: `/攻略 ${n2}`,
                      enter: true
                    }
                  }
                ]
              },
              {
                // 第二行
                buttons: [
                  three,
                  four
                ]
              },
              {
                buttons: [
                  five,
                  six
                ]
              }
            ]
          }
        }
      };
    }
    __name(markdow_fuzzy, "markdow_fuzzy");
    async function create_guide_icon(type, n1, n2, n3, n4, n5, n6) {
      const nall = [n1, n2, n3, n4, n5, n6];
      let null_imgurl = `${local_path}/null_img_${random.int(1, 5)}.png`;
      let againmatch = [];
      const nullname = /* @__PURE__ */ new Map();
      if (type == "aronadata") {
        const names = [n1, n2];
        names.push(n3);
        names.push(n4);
        const promises2 = names.map(async (name2) => {
          const snematch = await MatchArona(name2);
          if (snematch[0] == "Student") {
            return snematch[1];
          } else {
            nullname.set(name2, true);
            return name2;
          }
        });
        againmatch = await Promise.all(promises2);
      }
      const all_studata = await fmp2.json_parse(root + "/sms_studata_toaro_stu.json");
      const mapNameToId = all_studata.reduce((acc, item) => {
        acc[item.MapName] = item.Id_db;
        return acc;
      }, {});
      const imgaarr = [];
      let namearr = [];
      let ids;
      if (againmatch.length == 0) {
        namearr = nall.filter((i) => i).map((i) => i ? i : "");
        ids = [n1, n2, n3, n4, n5, n6].map((name2) => mapNameToId[name2] ? `${local_path}/${mapNameToId[name2]}.png` : null_imgurl);
      } else {
        namearr.push(againmatch[0], againmatch[1], againmatch[2], againmatch[3]);
        ids = [againmatch[0], againmatch[1], againmatch[2], againmatch[3]].map(
          (name2) => nullname.get(name2) ? null_imgurl : `${local_path}/${mapNameToId[name2]}.png`
        );
      }
      for (let url of ids) {
        if (url) {
          const img = await ctx3.canvas.loadImage(url);
          imgaarr.push(img);
        }
      }
      let height = 410;
      const width = 720;
      const f = namearr.length;
      if (f <= 4) {
        height = 290;
      }
      const canvas = await ctx3.canvas.createCanvas(width, height);
      const ctximg = canvas.getContext("2d");
      ctximg.fillStyle = "#DFF7FF";
      ctximg.fillRect(0, 0, canvas.width, canvas.height);
      function insertLineBreaks(str, maxLength) {
        let result = "";
        let currentLine = "";
        for (const char of str) {
          if (currentLine.length < maxLength) {
            currentLine += char;
          } else {
            result += currentLine + "\n";
            currentLine = char;
          }
        }
        result += currentLine;
        return result;
      }
      __name(insertLineBreaks, "insertLineBreaks");
      let vx = 70;
      let vy = 70;
      let wrap = 0;
      for (let i = 0; i < f; i++) {
        ctximg.save();
        ctximg.beginPath();
        ctximg.arc(vx, vy, 50, 0, Math.PI * 2);
        ctximg.clip();
        ctximg.drawImage(imgaarr[i], -50 + vx, -55 + vy, 100, 100 * 1.13);
        ctximg.restore();
        ctximg.closePath();
        ctximg.font = `bold 29px Arial`;
        ctximg.fillStyle = "#000000";
        const lines = insertLineBreaks(namearr[i], 9).split("\n");
        let ytextp;
        namearr[i].length > 10 ? ytextp = -20 : ytextp = 10;
        let ytext = vy + ytextp;
        const lineHeight = 30;
        for (const line of lines) {
          ctximg.fillText(line, vx + 60, ytext);
          ytext += lineHeight;
        }
        wrap++;
        vx += 340;
        if (wrap == 2) {
          vx = 70;
          vy += 130;
          wrap = 0;
        }
      }
      const data_buffer = canvas.toBuffer("image/png");
      return data_buffer;
    }
    __name(create_guide_icon, "create_guide_icon");
    const sms_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
    function id_to_name(id) {
      if (id == "Student" || id == "MapFailedt" || id == "MapSuccess" || id == "Others") {
        return id;
      } else {
        if (!/^-?\d+(\.\d+)?$/.test(id)) {
          return id;
        } else {
          const name2 = sms_data.filter((i) => i.Id == id);
          return name2[0].MapName;
        }
      }
    }
    __name(id_to_name, "id_to_name");
    ctx3.command("攻略 <message:text>", "Arona的攻略图").alias("评分").usage("发送“攻略”查看具体使用方法").example("攻略 爱丽丝").action(async ({ session }, message) => {
      let bot = {
        id: "",
        secret: ""
      };
      if (session.event.platform == "qqguild") {
        bot.id = session.bot["parent"].config.id;
        bot.secret = session.bot["parent"].config.secret;
      } else if (session.event.platform == "qq") {
        bot.id = session.bot.config.id;
        bot.secret = session.bot.config.secret;
      }
      let platfrom = false;
      if (session.event.platform == "qq" || session.event.platform == "qqguild") {
        platfrom = true;
      } else {
        platfrom = false;
      }
      if (platfrom && mdswitch) {
        if (!message) {
          return `
返回Arona的攻略图
使用方法：
🟢发送：攻略+空格+内容 调用AronaBot的数据
攻略图来自arona.diyigemt`;
        }
        const match_data_id = await MatchArona(message);
        const match_data = [];
        match_data_id.map((i) => {
          const names = id_to_name(i);
          match_data.push(names);
        });
        console.log(match_data);
        let arodata;
        if (match_data.length == 2) {
          try {
            arodata = await ctx3.http.get(arona_url + "/image?name=" + match_data[1]);
          } catch (error2) {
            logger3.info("向arona请求时发生错误", error2);
            return session.text(".error");
          }
          await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata.data[0].content, arodata.data[0].hash, log_on);
          await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata.data[0].hash + ".jpg"))).href));
        } else if (match_data.length <= 7 && match_data.length > 2) {
          if (match_data.includes(message)) {
            let arodata2;
            try {
              arodata2 = await ctx3.http.get(arona_url + "/image?name=" + message);
            } catch (error2) {
              logger3.info("向arona请求时发生错误", error2);
              return session.text(".error");
            }
            if (!arodata2.data) {
              return session.text(".no_guide");
            }
            if (arodata2.code == 200) {
              await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
              await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href));
              return;
            } else {
              let cosurl2;
              let rimg2;
              let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
              if (arodata2.data.length == 2) {
                i1 = 0, i2 = 1, i3 = 1, i4 = 1;
              } else if (arodata2.data.length == 3) {
                i1 = 0, i2 = 1, i3 = 2, i4 = 2;
              } else {
                i1 = 0, i2 = 1, i3 = 2, i4 = 3;
              }
              if (canvas_fun) {
                rimg2 = await create_guide_icon(
                  "aronadata",
                  arodata2.data[i1].name,
                  arodata2.data[i2].name,
                  arodata2.data[i3].name,
                  arodata2.data[i4].name
                );
              } else {
                cosurl2 = false;
              }
              if (mdswitch) {
                cosurl2 = await fmp2.img_to_channel(rimg2, session.bot.config.id, session.bot.config.secret, qqguild_id);
                console.log(cosurl2);
                let i12 = 0, i22 = 0, i32 = 0, i42 = 0;
                if (arodata2.data.length == 2) {
                  i12 = 0, i22 = 1, i32 = 1, i42 = 1;
                } else if (arodata2.data.length == 3) {
                  i12 = 0, i22 = 1, i32 = 2, i42 = 2;
                } else {
                  i12 = 0, i22 = 1, i32 = 2, i42 = 3;
                }
                const md = markdow_fuzzy(
                  session,
                  cosurl2,
                  arodata2.data[i12].name,
                  arodata2.data[i22].name,
                  arodata2.data[i32].name,
                  arodata2.data[i42].name
                );
                try {
                  await session.qq.sendMessage(session.channelId, md);
                } catch (e) {
                  logger3.info("发送md时发生错误:", e);
                  let bui = [];
                  if (arodata2.data.length == 2) {
                    bui = [0, 1];
                  } else if (arodata2.data.length == 3) {
                    bui = [0, 1, 2];
                  } else {
                    bui = [0, 1, 2, 3];
                  }
                  const text = bui.map(
                    (i) => `${i}.${arodata2.data[i].name}
`
                  ).join("");
                  await session.send(`${session.text(".mdtext")}
${text}`);
                }
              } else {
                const wait_mess = await session.prompt(times);
                if (!wait_mess) {
                  const timeoutmess = await session.send(session.text(".outtime_return"));
                  setTimeout(() => {
                    try {
                      session.bot.deleteMessage(session.bot.selfId, timeoutmess[0]);
                    } catch (e) {
                      logger3.info("撤回时出错：", e);
                    }
                  }, times);
                } else if (["1", "2", "3", "4"].includes(wait_mess)) {
                  let numb = parseInt(wait_mess);
                  if (arodata2.data.length == 2) {
                    numb >= 2 ? numb = 2 : numb = 1;
                  } else if (arodata2.data.length == 3) {
                    numb >= 3 ? numb = 3 : numb = numb;
                  }
                  numb--;
                  try {
                    arodata2 = await ctx3.http.get(arona_url + "/image?name=" + arodata2.data[numb].name);
                  } catch (error2) {
                    logger3.info("向arona请求时发生错误", error2);
                    return session.text(".error");
                  }
                  await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
                  await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href));
                } else {
                  const etext = await session.send(session.text(".num_error"));
                  setTimeout(() => {
                    try {
                      session.bot.deleteMessage(session.bot.selfId, etext[0]);
                    } catch (e) {
                      logger3.info("撤回时出错：", e);
                    }
                  }, times);
                }
              }
            }
          }
          let cosurl;
          let rimg;
          if (match_data[0] == "Student" && canvas_fun) {
            rimg = await create_guide_icon(
              match_data[0],
              match_data[1],
              match_data[2],
              match_data[3],
              match_data[4],
              match_data[5],
              match_data[6]
            );
            cosurl = await fmp2.img_to_channel(rimg, bot.id, bot.secret, qqguild_id);
          } else {
            cosurl = false;
          }
          if (mdswitch) {
            console.log(cosurl);
            const md = await markdow_fuzzy(
              session,
              cosurl,
              match_data[1],
              match_data[2],
              match_data[3],
              match_data[4],
              match_data[5],
              match_data[6]
            );
            try {
              if (session.event.platform == "qq") {
                await session.qq.sendMessage(session.channelId, md);
              } else if (session.event.platform == "qqguide") {
                await session.qqguild.sendMessage(session.channelId, md);
              }
            } catch (e) {
              logger3.info("发送md时发生错误", e);
              const text = [1, 2, 3, 4, 5, 6].map(
                (i) => match_data[i] ? `${i}.${match_data[i]}` : ""
              ).filter(Boolean).join("\n");
              await session.send(`${session.text(".match_text")}
${text}`);
            }
          } else {
            const imgmess = await session.send(import_koishi3.h.image(rimg, "image/png"));
            const text = [1, 2, 3, 4, 5, 6].map(
              (i) => match_data[i] ? `${i}.${match_data[i]}` : ""
            ).filter(Boolean).join("\n");
            const messid = await session.send(`${(0, import_koishi3.h)("at", { id: session.userId })}
${session.text(".match_text")}
${text}`);
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, messid[0]);
                session.bot.deleteMessage(session.bot.selfId, imgmess[0]);
              } catch (e) {
                logger3.info("撤回出错：", e);
              }
            }, times);
            let wait_arry = [...Array(match_data.length - 1).keys()].map((i) => (i + 1).toString());
            const wait_mess = await session.prompt(times);
            if (!wait_mess) {
              const timeoutmess = await session.send(session.text(".outtime_return"));
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, timeoutmess[0]);
                } catch (e) {
                  logger3.info("撤回时出错：", e);
                }
              }, times);
              return;
            } else if (wait_arry.includes(wait_mess)) {
              let numb = parseInt(wait_mess);
              let arodata2;
              try {
                arodata2 = await ctx3.http.get(arona_url + "/image?name=" + match_data[numb]);
              } catch (error2) {
                logger3.info("向arona请求时发生错误", error2);
                return session.text(".error");
              }
              await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
              await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href));
              return;
            } else {
              const etext = await session.send(session.text(".num_error"));
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, etext[0]);
                } catch (e) {
                  logger3.info("撤回时出错：", e);
                }
              }, times);
              return;
            }
          }
        } else if (match_data.length == 0) {
          let cosurl;
          let rimg;
          try {
            arodata = await ctx3.http.get(arona_url + "/image?name=" + message);
          } catch (error2) {
            logger3.info("向arona请求时发生错误", error2);
            return session.text(".error");
          }
          console.log(arodata);
          if (arodata.code == 200) {
            await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata.data[0].content, arodata.data[0].hash, log_on);
            return import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata.data[0].hash + ".jpg"))).href);
          }
          if (!arodata.data) {
            return session.text(".no_guide");
          }
          let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
          if (arodata.data.length == 2) {
            i1 = 0, i2 = 1, i3 = 1, i4 = 1;
          } else if (arodata.data.length == 3) {
            i1 = 0, i2 = 1, i3 = 2, i4 = 2;
          } else {
            i1 = 0, i2 = 1, i3 = 2, i4 = 3;
          }
          if (canvas_fun) {
            rimg = await create_guide_icon(
              "aronadata",
              arodata.data[i1].name,
              arodata.data[i2].name,
              arodata.data[i3].name,
              arodata.data[i4].name
            );
            cosurl = await fmp2.img_to_channel(rimg, session.bot.config.id, session.bot.config.secret, qqguild_id);
          } else {
            cosurl = false;
          }
          if (mdswitch) {
            let i12 = 0, i22 = 0, i32 = 0, i42 = 0;
            if (arodata.data.length == 2) {
              i12 = 0, i22 = 1, i32 = 1, i42 = 1;
            } else if (arodata.data.length == 3) {
              i12 = 0, i22 = 1, i32 = 2, i42 = 2;
            } else {
              i12 = 0, i22 = 1, i32 = 2, i42 = 3;
            }
            const md = markdow_fuzzy(
              session,
              cosurl,
              arodata.data[i12].name,
              arodata.data[i22].name,
              arodata.data[i32].name,
              arodata.data[i42].name
            );
            try {
              await session.qq.sendMessage(session.channelId, md);
            } catch (e) {
              logger3.info("发送md时发生错误:", e);
              let bui = [];
              if (arodata.data.length == 2) {
                bui = [0, 1];
              } else if (arodata.data.length == 3) {
                bui = [0, 1, 2];
              } else {
                bui = [0, 1, 2, 3];
              }
              const text = bui.map(
                (i) => `${i}.${arodata.data[i].name}
`
              ).join("");
              await session.send(`${session.text(".match_text")}
${text}`);
            }
          } else {
            const wait_mess = await session.prompt(times);
            if (!wait_mess) {
              const timeoutmess = await session.send(session.text(".outtime_return"));
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, timeoutmess[0]);
                } catch (e) {
                  logger3.info("撤回时出错：", e);
                }
              }, times);
            } else if (["1", "2", "3", "4"].includes(wait_mess)) {
              let numb = parseInt(wait_mess);
              if (arodata.data.length == 2) {
                numb >= 2 ? numb = 2 : numb = 1;
              } else if (arodata.data.length == 3) {
                numb >= 3 ? numb = 3 : numb = numb;
              }
              numb--;
              try {
                arodata = await ctx3.http.get(arona_url + "/image?name=" + arodata.data[numb].name);
              } catch (error2) {
                logger3.info("向arona请求时发生错误", error2);
                return session.text(".error");
              }
              await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata.data[0].content, arodata.data[0].hash, log_on);
              await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata.data[0].hash + ".jpg"))).href));
            } else {
              const etext = await session.send(session.text(".num_error"));
              setTimeout(() => {
                try {
                  session.bot.deleteMessage(session.bot.selfId, etext[0]);
                } catch (e) {
                  logger3.info("撤回时出错：", e);
                }
              }, times);
            }
          }
        }
      } else {
        if (!message) {
          return `
返回Arona的攻略图
使用方法：
🟢发送：攻略+空格+内容 调用AronaBot的数据
攻略图来自arona.diyigemt`;
        }
        const match_data_id = await MatchArona(message);
        console.log(match_data_id);
        const match_data = [];
        match_data_id.map((i) => {
          const names = id_to_name(i);
          match_data.push(names);
        });
        console.log(match_data);
        let arodata;
        if (match_data.length == 2) {
          try {
            arodata = await ctx3.http.get(arona_url + "/image?name=" + match_data[1]);
          } catch (error2) {
            logger3.info("向arona请求时发生错误", error2);
            return session.text(".error");
          }
          await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata.data[0].content, arodata.data[0].hash, log_on);
          await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata.data[0].hash + ".jpg"))).href));
        } else if (match_data.length <= 7 && match_data.length > 2) {
          if (canvas_fun && await match_data[0] == "Student") {
            const rimg = await create_guide_icon(
              match_data[0],
              match_data[1],
              match_data[2],
              match_data[3],
              match_data[4],
              match_data[5],
              match_data[6]
            );
            const imgmess = await session.send(import_koishi3.h.image(rimg, "image/png"));
            const text = [1, 2, 3, 4, 5, 6].map(
              (i) => match_data[i] ? `${i}.${match_data[i]}` : ""
            ).filter(Boolean).join("\n");
            const messid = await session.send(`${(0, import_koishi3.h)("at", { id: session.userId })}
${session.text(".match_text")}
${text}`);
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, messid[0]);
                session.bot.deleteMessage(session.bot.selfId, imgmess[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          } else {
            const text = [1, 2, 3, 4, 5, 6].map(
              (i) => match_data[i] ? `${i}.${match_data[i]}` : ""
            ).filter(Boolean).join("\n");
            const messid = await session.send(`${(0, import_koishi3.h)("at", { id: session.userId })}
${session.text(".match_text")}
${text}`);
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.channelId, messid[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          }
          let wait_arry = [...Array(match_data.length - 1).keys()].map((i) => (i + 1).toString());
          const wait_mess = await session.prompt(times);
          if (!wait_mess) {
            const timeoutmess = await session.send(session.text(".outtime_return"));
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, timeoutmess[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          } else if (wait_arry.includes(wait_mess)) {
            let numb = parseInt(wait_mess);
            let arodata2;
            try {
              arodata2 = await ctx3.http.get(arona_url + "/image?name=" + match_data[numb]);
            } catch (error2) {
              logger3.info("向arona请求时发生错误", error2);
              return session.text(".error");
            }
            await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
            await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href));
          } else {
            const etext = await session.send(session.text(".num_error"));
          }
        } else if (match_data.length == 0) {
          let arodata2;
          try {
            arodata2 = await ctx3.http.get(arona_url + "/image?name=" + message);
          } catch (error2) {
            logger3.info("向arona请求时发生错误", error2);
            return session.text(".error");
          }
          if (!arodata2.data) {
            return session.text(".no_guide");
          }
          if (canvas_fun) {
            if (arodata2.code == 200) {
              await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
              if (arodata2.data[0].hash === "977fdd7d8e065dbbdb8c10b42d98b1c2") return "没有这样的攻略哦";
              return import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href);
            }
            let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
            if (arodata2.data.length == 2) {
              i1 = 0, i2 = 1, i3 = 1, i4 = 1;
            } else if (arodata2.data.length == 3) {
              i1 = 0, i2 = 1, i3 = 2, i4 = 2;
            } else {
              i1 = 0, i2 = 1, i3 = 2, i4 = 3;
            }
            console.log(arodata2);
            const rimg = await create_guide_icon(
              "aronadata",
              arodata2.data[i1].name,
              arodata2.data[i2].name,
              arodata2.data[i3].name,
              arodata2.data[i4].name
            );
            const imgmess = await session.send(import_koishi3.h.image(rimg, "image/png"));
            let bui = [];
            if (arodata2.data.length == 2) {
              bui = [0, 1];
            } else if (arodata2.data.length == 3) {
              bui = [0, 1, 2];
            } else {
              bui = [0, 1, 2, 3];
            }
            const text = bui.map(
              (i) => `${i + 1}.${arodata2.data[i].name}
`
            ).join("");
            const messid = await session.send(`${(0, import_koishi3.h)("at", { id: session.userId })}
${session.text(".match_text")}
${text}`);
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, messid[0]);
                session.bot.deleteMessage(session.bot.selfId, imgmess[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          } else {
            let bui = [];
            if (arodata2.data.length == 2) {
              bui = [0, 1];
            } else if (arodata2.data.length == 3) {
              bui = [0, 1, 2];
            } else {
              bui = [0, 1, 2, 3];
            }
            const text = bui.map(
              (i) => `${i + 1}.${arodata2.data[i].name}
`
            ).join("");
            const messid = await session.send(`${(0, import_koishi3.h)("at", { id: session.userId })}
${session.text(".match_text")}
${text}`);
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, messid[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          }
          const wait_mess = await session.prompt(times);
          if (!wait_mess) {
            const timeoutmess = await session.send(session.text(".outtime_return"));
            setTimeout(() => {
              try {
                session.bot.deleteMessage(session.bot.selfId, timeoutmess[0]);
              } catch (e) {
                logger3.info("撤回时出错：", e);
              }
            }, times);
          } else if (["1", "2", "3", "4"].includes(wait_mess)) {
            let numb = parseInt(wait_mess);
            if (arodata2.data.length == 2) {
              numb >= 2 ? numb = 2 : numb = 1;
            } else if (arodata2.data.length == 3) {
              numb >= 3 ? numb = 3 : numb = numb;
            }
            numb--;
            try {
              arodata2 = await ctx3.http.get(arona_url + "/image?name=" + arodata2.data[numb].name);
            } catch (error2) {
              logger3.info("向arona请求时发生错误", error2);
              return session.text(".error");
            }
            await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodata2.data[0].content, arodata2.data[0].hash, log_on);
            await session.send(import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodata2.data[0].hash + ".jpg"))).href));
          } else {
            const etext = await session.send(session.text(".num_error"));
          }
        }
      }
    });
    logger3.info("🟢 攻略功能加载完毕");
    const map_json = await fmp2.json_parse(`${root_json}/map_guide_shangxue.json`);
    ctx3.command("关卡 <message:text>", "bawiki的推图攻略").alias("推图").example("关卡 h12-3").action(async ({ session }, message) => {
      if (!message) {
        if (session.event.platform == "qq") {
          return `ba推图攻略
🟢@机器人并发送：/关卡+空格+内容
示例：@机器人 /关卡 12-3
数据来源于ba.gamekee
`;
        } else {
          return `ba推图攻略
🟢发送：关卡+空格+内容
示例：关卡 12-3
数据来源于ba.gamekee     
`;
        }
      } else {
        const map = MatchMapName(message);
        if (typeof map == "string") {
          if (map == "Error") {
            return session.text(".input_error");
          } else {
            try {
              console.log();
              const return_mess = map_json[map].map((i) => {
                return import_koishi3.h.image(i);
              });
              return return_mess;
            } catch (e) {
              logger3.info("出现错误" + e);
              return session.text(".error");
            }
          }
        }
      }
    });
    ctx3.command("攻略/国际服千里眼").alias("千里眼").action(async ({ session }) => {
      const arodatas = await ctx3.http.get(arona_url + "/image?name=国际服千里眼");
      if (arodatas.code == 200) {
        await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodatas.data[0].content, arodatas.data[0].hash, log_on);
        return import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodatas.data[0].hash + ".jpg"))).href);
      } else {
        return session.text(".error");
      }
    });
    ctx3.command("攻略/国服千里眼").action(async ({ session }) => {
      const arodatas = await ctx3.http.get(arona_url + "/image?name=国服未来视");
      if (arodatas.code == 200) {
        await fmp2.guide_download_image(root_guide, arona_cdn + "/s" + arodatas.data[0].content, arodatas.data[0].hash, log_on);
        return import_koishi3.h.image((0, import_url.pathToFileURL)((0, import_path.resolve)(root_guide + "/" + (arodatas.data[0].hash + ".jpg"))).href);
      } else {
        return session.text(".error");
      }
    });
  }
};

// src/Snae_match/match.ts
var import_koishi4 = require("koishi");
var ctx2 = new import_koishi4.Context();
var fmp = new FMPS(ctx2);
var match_file = __dirname;
function DeleteSpace(input) {
  if (typeof input !== "string") {
    throw new TypeError("DeleteSpace 函数期望一个字符串类型的输入");
  }
  return input.replace(/\s+/g, "");
}
__name(DeleteSpace, "DeleteSpace");
function TransToSmall(input) {
  return input.replace(/[A-Za-z]+/g, (match) => match.toLowerCase());
}
__name(TransToSmall, "TransToSmall");
function TransToHalf(input) {
  input = input.replace(/—+/g, "-");
  let half = "";
  for (const char of input) {
    const insideCode = char.charCodeAt(0);
    if (65281 <= insideCode && insideCode <= 65374) {
      half += String.fromCharCode(insideCode - 65248);
    } else {
      half += char;
    }
  }
  return half;
}
__name(TransToHalf, "TransToHalf");
function pretreat(input) {
  input = DeleteSpace(input);
  input = TransToHalf(input);
  input = TransToSmall(input);
  return input;
}
__name(pretreat, "pretreat");
async function ExactMatchName(input) {
  let result = [];
  input = pretreat(input);
  const root = await rootF("bap-json");
  const NameData = await fmp.json_parse(`${root}/sms_studata_main.json`);
  const ExactNameData = NameData.map((student) => {
    const processedStudent = {};
    for (const key in student) {
      if (typeof student[key] === "string") {
        processedStudent[key] = pretreat(student[key]);
      } else if (Array.isArray(student[key])) {
        processedStudent[key] = student[key].map((nickname) => pretreat(nickname));
      }
    }
    return processedStudent;
  });
  for (const student of ExactNameData) {
    if (student.FirstName_jp == input) {
      result.push(student.Id);
    }
    if (student.FirstName_zh == input) {
      result.push(student.Id);
    }
    if (student.Name_en == input) {
      result.push(student.Id);
    }
    if (student.Name_jp == input) {
      result.push(student.Id);
    }
    if (student.Name_kr == input) {
      result.push(student.Id);
    }
    if (student.Name_zh_cn == input) {
      result.push(student.Id);
    }
    if (student.Name_zh_ft == input) {
      result.push(student.Id);
    }
    if (student.Name_zh_tw == input) {
      result.push(student.Id);
    }
    for (const name2 of student.NickName) {
      if (name2 == input) {
        result.push(student.Id);
      }
    }
  }
  const result_set = new Set(result);
  return Array.from(result_set);
}
__name(ExactMatchName, "ExactMatchName");
function JaccardSimilarity(str1, str2) {
  const arr1 = str1.split("");
  const arr2 = str2.split("");
  const intersectionSize = arr1.filter((item) => arr2.includes(item)).length;
  const unionSize = arr1.length + arr2.length - intersectionSize;
  const similarity = intersectionSize / unionSize;
  return similarity;
}
__name(JaccardSimilarity, "JaccardSimilarity");
async function JaccardFuzzyMatch(input) {
  input = pretreat(input);
  const root = await rootF("bap-json");
  const NameData = await fmp.json_parse(`${root}/sms_studata_main.json`);
  const ExactNameData = NameData.map((student) => {
    const processedStudent = {};
    for (const key in student) {
      if (typeof student[key] === "string") {
        processedStudent[key] = pretreat(student[key]);
      } else if (Array.isArray(student[key])) {
        processedStudent[key] = student[key].map((nickname) => pretreat(nickname));
      }
    }
    return processedStudent;
  });
  const StudentList = ExactNameData.map((names) => {
    const SetStudent = {};
    SetStudent.Id = names.Id;
    let FirstNames = [names.FirstName_jp, names.FirstName_zh];
    const FirstNames_set = new Set(FirstNames);
    SetStudent.FirstNames = Array.from(FirstNames_set);
    let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
    const Names_set = new Set(Names);
    SetStudent.Names = Array.from(Names_set);
    SetStudent.NickNames = names.NickName;
    return SetStudent;
  });
  let results = [];
  for (const student of StudentList) {
    let FirstName_result = 0;
    for (const name2 of student.FirstNames) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaccardSimilarity(name_nozi, input_nozi);
      if (r > FirstName_result) {
        FirstName_result = r;
      }
    }
    let Name_result = 0;
    for (const name2 of student.Names) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaccardSimilarity(name_nozi, input_nozi);
      if (r > Name_result) {
        Name_result = r;
      }
    }
    let NickName_result = 0;
    for (const name2 of student.NickNames) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaccardSimilarity(name_nozi, input_nozi);
      if (r > NickName_result) {
        NickName_result = r;
      }
    }
    results.push([student.Id, FirstName_result, Name_result, NickName_result]);
  }
  let finalResults = [];
  for (const result of results) {
    finalResults.push([result[0], Math.max(result[1], result[2], result[3])]);
  }
  let JaccardResults = [];
  finalResults.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < finalResults.length; i++) {
    if (finalResults[i][1] != 0) {
      JaccardResults[i] = finalResults[i];
    }
  }
  return JaccardResults;
}
__name(JaccardFuzzyMatch, "JaccardFuzzyMatch");
function JaroWinklerDistance(str1, str2) {
  function jaroSimilarity(s1, s2) {
    const maxDistance = Math.max(Math.floor(Math.max(s1.length, s2.length) / 2) - 1, 1);
    const matches = new Array(Math.min(s1.length, s2.length)).fill(false);
    let matchCount = 0;
    for (let i = 0; i < s1.length; i++) {
      const start = Math.max(0, i - maxDistance);
      const end = Math.min(i + maxDistance + 1, s2.length);
      for (let j = start; j < end; j++) {
        if (!matches[j] && s1[i] === s2[j]) {
          matches[j] = true;
          matchCount++;
          break;
        }
      }
    }
    if (matchCount === 0) {
      return 0;
    }
    let t = 0;
    let k = 0;
    for (let i = 0; i < s1.length; i++) {
      if (matches[i]) {
        while (!matches[k]) {
          k++;
        }
        if (s1[i] !== s2[k]) {
          t++;
        }
        k++;
      }
    }
    return 1 / 3 * (matchCount / s1.length + matchCount / s2.length + (matchCount - t) / matchCount);
  }
  __name(jaroSimilarity, "jaroSimilarity");
  const jaroSimilarityScore = jaroSimilarity(str1, str2);
  const prefixScale = 0.05;
  let prefixLength = 0;
  for (let i = 0; i < Math.min(3, Math.min(str1.length, str2.length)); i++) {
    if (str1[i] === str2[i]) {
      prefixLength++;
    } else {
      break;
    }
  }
  return jaroSimilarityScore + prefixLength * prefixScale * (1 - jaroSimilarityScore);
}
__name(JaroWinklerDistance, "JaroWinklerDistance");
async function JaroWinklerFuzzyMatch(input) {
  input = pretreat(input);
  const root = await rootF("bap-json");
  const NameData = await fmp.json_parse(`${root}/sms_studata_main.json`);
  const ExactNameData = NameData.map((student) => {
    const processedStudent = {};
    for (const key in student) {
      if (typeof student[key] === "string") {
        processedStudent[key] = pretreat(student[key]);
      } else if (Array.isArray(student[key])) {
        processedStudent[key] = student[key].map((nickname) => pretreat(nickname));
      }
    }
    return processedStudent;
  });
  const StudentList = ExactNameData.map((names) => {
    const SetStudent = {};
    SetStudent.Id = names.Id;
    let FirstNames = [names.FirstName_jp, names.FirstName_zh];
    const FirstNames_set = new Set(FirstNames);
    SetStudent.FirstNames = Array.from(FirstNames_set);
    let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
    const Names_set = new Set(Names);
    SetStudent.Names = Array.from(Names_set);
    SetStudent.NickNames = names.NickName;
    return SetStudent;
  });
  let results = [];
  for (const student of StudentList) {
    let FirstName_result = 0;
    for (const name2 of student.FirstNames) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaroWinklerDistance(name_nozi, input_nozi);
      if (r > FirstName_result) {
        FirstName_result = r;
      }
    }
    let Name_result = 0;
    for (const name2 of student.Names) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaroWinklerDistance(name_nozi, input_nozi);
      if (r > Name_result) {
        Name_result = r;
      }
    }
    let NickName_result = 0;
    for (const name2 of student.NickNames) {
      const zi_input = input.indexOf("子");
      const zi_lib = name2.indexOf("子");
      let input_nozi = "";
      let name_nozi = "";
      if (zi_input != -1 && zi_lib != -1 && input !== "子") {
        input_nozi = input.replace("子", "");
        name_nozi = name2.replace("子", "");
      } else {
        input_nozi = input;
        name_nozi = name2;
      }
      let r = JaroWinklerDistance(name_nozi, input_nozi);
      if (r > NickName_result) {
        NickName_result = r;
      }
    }
    results.push([student.Id, FirstName_result, Name_result, NickName_result]);
  }
  let FirstNameResults = new Array(5);
  let NameResults = new Array(5);
  let NickNameResults = new Array(5);
  let possibleFirstNameResults = [];
  let possibleNameResults = [];
  let possibleNickNameResults = [];
  for (const result of results) {
    possibleFirstNameResults.push([result[0], result[1]]);
    possibleNameResults.push([result[0], result[2]]);
    possibleNickNameResults.push([result[0], result[3]]);
  }
  possibleFirstNameResults.sort((a, b) => b[1] - a[1]);
  possibleNameResults.sort((a, b) => b[1] - a[1]);
  possibleNickNameResults.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < 5; i++) {
    if (possibleFirstNameResults[i][1] != 0) {
      FirstNameResults[i] = possibleFirstNameResults[i];
    } else {
      FirstNameResults[i] = ["0", 0];
    }
    if (possibleNameResults[i][1] != 0) {
      NameResults[i] = possibleNameResults[i];
    } else {
      NameResults[i] = ["0", 0];
    }
    if (possibleNickNameResults[i][1] != 0) {
      NickNameResults[i] = possibleNickNameResults[i];
    } else {
      NickNameResults[i] = ["0", 0];
    }
  }
  const filteredFirstNameResults = FirstNameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const filteredNameResults = NameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const filteredNickNameResults = NickNameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const combinedResults_FN = [...filteredFirstNameResults, ...filteredNameResults];
  let finalResults_FN = [];
  function processArray(arr) {
    let processedArray = [];
    for (const [str, num] of arr) {
      let mark = false;
      for (let i = 0; i < processedArray.length; i++) {
        if (str === processedArray[i][0]) {
          processedArray[i][1] = Math.max((num + processedArray[i][1]) / 2 + 0.1, num, processedArray[i][1]);
          mark = true;
        }
      }
      if (!mark) {
        processedArray.push([str, num]);
      }
    }
    return processedArray;
  }
  __name(processArray, "processArray");
  finalResults_FN = processArray(combinedResults_FN);
  finalResults_FN.sort((a, b) => b[1] - a[1]);
  let possibleResults = [];
  const combinedResults_NN = [...finalResults_FN, ...filteredNickNameResults];
  possibleResults = processArray(combinedResults_NN);
  possibleResults.sort((a, b) => b[1] - a[1]);
  let JaroWinklerDistanceResults = [];
  possibleResults.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < possibleResults.length; i++) {
    if (possibleResults[i][1] >= 0.2) {
      JaroWinklerDistanceResults[i] = possibleResults[i];
    }
  }
  return JaroWinklerDistanceResults;
}
__name(JaroWinklerFuzzyMatch, "JaroWinklerFuzzyMatch");
function TransToPinyin(input) {
  const zh2 = require("zh_cn");
  const pinyinArray = zh2(input, { style: zh2.STYLE_TONE });
  const pinyinString = pinyinArray.map((item) => item).join(" ");
  return pinyinString;
}
__name(TransToPinyin, "TransToPinyin");
function LevenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      dp[i][j] = 0;
    }
  }
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}
__name(LevenshteinDistance, "LevenshteinDistance");
function LevenshteinSimilarityScore(s1, s2) {
  const distance = LevenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  const similarityScore = 1 - distance / maxLength;
  return similarityScore;
}
__name(LevenshteinSimilarityScore, "LevenshteinSimilarityScore");
async function LevenshteinFuzzyMatch(input) {
  input = TransToPinyin(pretreat(input));
  const root = await rootF("bap-json");
  const NameData = await fmp.json_parse(`${root}/sms_studata_main.json`);
  const ExactNameData = NameData.map((student) => {
    const processedStudent = {};
    for (const key in student) {
      if (typeof student[key] === "string") {
        processedStudent[key] = TransToPinyin(pretreat(student[key]));
      } else if (Array.isArray(student[key])) {
        processedStudent[key] = student[key].map((nickname) => TransToPinyin(pretreat(nickname)));
      }
    }
    return processedStudent;
  });
  const StudentList = ExactNameData.map((names) => {
    const SetStudent = {};
    SetStudent.Id = names.Id;
    let FirstNames = [names.FirstName_jp, names.FirstName_zh];
    const FirstNames_set = new Set(FirstNames);
    SetStudent.FirstNames = Array.from(FirstNames_set);
    let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
    const Names_set = new Set(Names);
    SetStudent.Names = Array.from(Names_set);
    SetStudent.NickNames = names.NickName;
    return SetStudent;
  });
  let results = [];
  for (const student of StudentList) {
    let FirstName_result = 0;
    for (const name2 of student.FirstNames) {
      let r = LevenshteinSimilarityScore(name2, input);
      if (r > FirstName_result) {
        FirstName_result = r;
      }
    }
    let Name_result = 0;
    for (const name2 of student.Names) {
      let r = LevenshteinSimilarityScore(name2, input);
      if (r > Name_result) {
        Name_result = r;
      }
    }
    let NickName_result = 0;
    for (const name2 of student.NickNames) {
      let r = LevenshteinSimilarityScore(name2, input);
      if (r > NickName_result) {
        NickName_result = r;
      }
    }
    results.push([student.Id, FirstName_result, Name_result, NickName_result]);
  }
  let FirstNameResults = new Array(5);
  let NameResults = new Array(5);
  let NickNameResults = new Array(5);
  let possibleFirstNameResults = [];
  let possibleNameResults = [];
  let possibleNickNameResults = [];
  for (const result of results) {
    possibleFirstNameResults.push([result[0], result[1]]);
    possibleNameResults.push([result[0], result[2]]);
    possibleNickNameResults.push([result[0], result[3]]);
  }
  possibleFirstNameResults.sort((a, b) => b[1] - a[1]);
  possibleNameResults.sort((a, b) => b[1] - a[1]);
  possibleNickNameResults.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < 5; i++) {
    if (possibleFirstNameResults[i][1] != 0) {
      FirstNameResults[i] = possibleFirstNameResults[i];
    } else {
      FirstNameResults[i] = ["0", 0];
    }
    if (possibleNameResults[i][1] != 0) {
      NameResults[i] = possibleNameResults[i];
    } else {
      NameResults[i] = ["0", 0];
    }
    if (possibleNickNameResults[i][1] != 0) {
      NickNameResults[i] = possibleNickNameResults[i];
    } else {
      NickNameResults[i] = ["0", 0];
    }
  }
  const filteredFirstNameResults = FirstNameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const filteredNameResults = NameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const filteredNickNameResults = NickNameResults.filter((item) => !(item[0] === "0" && item[1] === 0));
  const combinedResults_FN = [...filteredFirstNameResults, ...filteredNameResults];
  let finalResults_FN = [];
  function processArray(arr) {
    let processedArray = [];
    for (const [str, num] of arr) {
      let mark = false;
      for (let i = 0; i < processedArray.length; i++) {
        if (str === processedArray[i][0]) {
          processedArray[i][1] = Math.max(num, processedArray[i][1]);
          mark = true;
        }
      }
      if (!mark) {
        processedArray.push([str, num]);
      }
    }
    return processedArray;
  }
  __name(processArray, "processArray");
  finalResults_FN = processArray(combinedResults_FN);
  finalResults_FN.sort((a, b) => b[1] - a[1]);
  let possibleResults = [];
  const combinedResults_NN = [...finalResults_FN, ...filteredNickNameResults];
  possibleResults = processArray(combinedResults_NN);
  possibleResults.sort((a, b) => b[1] - a[1]);
  let LevenshteinDistanceResults = [];
  possibleResults.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < possibleResults.length; i++) {
    if (possibleResults[i][1] >= 0.5) {
      LevenshteinDistanceResults[i] = possibleResults[i];
    }
  }
  return LevenshteinDistanceResults;
}
__name(LevenshteinFuzzyMatch, "LevenshteinFuzzyMatch");
async function FuzzyMatchName(input) {
  const MatchResult_J = await JaccardFuzzyMatch(input);
  const MatchResult_JW = await JaroWinklerFuzzyMatch(input);
  const MatchResult_L = await LevenshteinFuzzyMatch(input);
  let JWresult = [];
  let J_JW = [];
  for (let i = 0; i < MatchResult_JW.length; i++) {
    MatchResult_JW[i][1] /= 1.1;
    for (let j = 0; j < MatchResult_J.length; j++) {
      if (MatchResult_J[j][0] === MatchResult_JW[i][0]) {
        J_JW.push(MatchResult_J[j]);
      }
    }
  }
  if (MatchResult_JW.length != J_JW.length) {
    return [];
  }
  for (let i = 0; i < MatchResult_JW.length; i++) {
    if (J_JW[i]) {
      JWresult.push([J_JW[i][0], MatchResult_JW[i][1] * 0.55 + J_JW[i][1] * 0.45]);
    }
  }
  JWresult.sort((a, b) => b[1] - a[1]);
  const combinedResults = [...JWresult, ...MatchResult_L];
  let finalResults = [];
  function processArray(arr) {
    let processedArray = [];
    let nopush = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i][0] === arr[j][0]) {
          nopush.push(arr[i][0]);
          processedArray.push([arr[i][0], arr[i][1] * 0.5 + arr[j][1] * 0.5 + 0.15]);
          break;
        }
      }
      if (nopush.indexOf(arr[i][0]) === -1) {
        if (JWresult.indexOf(arr[i]) !== -1) {
          if (arr[i][1] >= 0.454) {
            processedArray.push(arr[i]);
          }
        } else {
          if (arr[i][1] >= 0.5) {
            processedArray.push(arr[i]);
          }
        }
      }
    }
    return processedArray;
  }
  __name(processArray, "processArray");
  finalResults = processArray(combinedResults);
  finalResults.sort((a, b) => b[1] - a[1]);
  return finalResults;
}
__name(FuzzyMatchName, "FuzzyMatchName");
async function MatchStudentName(input) {
  const ExactResults = ExactMatchName(input);
  if ((await ExactResults).length != 0) {
    if ((await ExactResults).length > 6) {
      let ExactResults5 = [];
      for (let i = 0; i < 6; i++) {
        ExactResults5.push(ExactResults[i]);
      }
      return ExactResults5;
    } else {
      return ExactResults;
    }
  } else {
    const FuzzyResults = await FuzzyMatchName(input);
    let FuzzyResults_nonum = [];
    for (const result of FuzzyResults) {
      FuzzyResults_nonum.push(result[0]);
    }
    if (FuzzyResults_nonum.length != 0) {
      if (FuzzyResults_nonum.length > 6) {
        let FuzzyResults_nonum5 = [];
        for (let i = 0; i < 6; i++) {
          FuzzyResults_nonum5.push(FuzzyResults_nonum[i]);
        }
        return FuzzyResults_nonum5;
      } else {
        return FuzzyResults_nonum;
      }
    } else {
      return [];
    }
  }
}
__name(MatchStudentName, "MatchStudentName");
function MatchMapName(input) {
  let a = "";
  let b = "";
  let mark = "";
  input = pretreat(input);
  if (input.length > 14) {
    return "Error";
  }
  const regex1 = /(\d+)[-_,.;~](\d+)/;
  const match1 = input.match(regex1);
  if (match1) {
    if (match1.length === 3) {
      a = match1[1];
      b = match1[2];
    } else {
      return "Error";
    }
  } else {
    return "Error";
  }
  const regexH = /(困难|h|hard)+/;
  const matchH = input.match(regexH);
  if (matchH) {
    mark = "h";
  }
  if (a && b) {
    if (parseInt(a) != 0 && parseInt(a) > maxmap_sms) {
      return "报错：日服最新地图为" + maxmap_sms + "图。";
    }
    if (parseInt(b) != 0 && mark === "" && parseInt(b) > 5) {
      return "报错：只有各普通关卡1-5图的攻略。";
    } else if (parseInt(b) != 0 && mark === "h" && parseInt(b) > 3) {
      return "报错：只有各困难关卡1-3图的攻略。";
    }
  }
  return mark + a + "-" + b;
}
__name(MatchMapName, "MatchMapName");
async function MatchOthers(input) {
  const root = await rootF("bap-json");
  const OthersData = await fmp.json_parse(`${root}/sms_othersmatchlib.json`);
  for (const names of OthersData) {
    if (names.Name === input) {
      return [names.Name];
    }
    for (const nickname of names.Nickname) {
      if (nickname === input) {
        return [names.Name];
      }
    }
  }
  input = pretreat(input);
  for (const names of OthersData) {
    if (names.Name === input) {
      return [names.Name];
    }
    for (const nickname of names.Nickname) {
      if (nickname === input) {
        return [names.Name];
      }
    }
  }
  let keywords_result = [];
  for (const names of OthersData) {
    for (const Keyword of names.Keywords) {
      if (Keyword in synonyms) {
        const words = [...[Keyword], ...synonyms[Keyword]];
        for (const word of words) {
          if (input.includes(word)) {
            keywords_result.push(Keyword);
            break;
          }
        }
      } else {
        if (input.includes(Keyword)) {
          keywords_result.push(Keyword);
        }
      }
    }
  }
  const result_set = new Set(keywords_result);
  keywords_result = Array.from(result_set);
  let items = [];
  for (const keyword of keywords_result) {
    for (const names of OthersData) {
      if (names.Keywords.includes(keyword)) {
        items.push(names.Name);
      }
    }
  }
  const stringCount = {};
  items.forEach((str) => {
    stringCount[str] = (stringCount[str] || 0) + 1;
  });
  const stringCountArray = Object.keys(stringCount).map((str) => ({
    string: str,
    count: stringCount[str]
  }));
  stringCountArray.sort((a, b) => b.count - a.count);
  const result = stringCountArray.map((entry) => entry.string);
  if (result.length > 5) {
    return result.slice(0, 5);
  } else {
    return result;
  }
}
__name(MatchOthers, "MatchOthers");
async function StudentMatch(input) {
  const root = await rootF("bap-json");
  const AronaNameData = await fmp.json_parse(`${root}/sms_studata_toaro_stu.json`);
  const TryStudentMatch = MatchStudentName(input);
  if ((await TryStudentMatch).length != 0) {
    for (let i = 0; i < (await TryStudentMatch).length; i++) {
      for (const student of AronaNameData) {
        if (student.Id === TryStudentMatch[i]) {
          TryStudentMatch[i] = student.MapName;
          break;
        }
      }
    }
    return [...["Student"], ...await TryStudentMatch];
  } else {
    return [];
  }
}
__name(StudentMatch, "StudentMatch");
async function MatchArona(input) {
  function MapMatch(input2) {
    const TryMapMatch = MatchMapName(input2);
    if (TryMapMatch !== "" && TryMapMatch !== "Error") {
      if (TryMapMatch.includes("报错")) {
        return ["MapFailed", TryMapMatch];
      } else {
        return ["MapSuccess", TryMapMatch];
      }
    } else {
      return [];
    }
  }
  __name(MapMatch, "MapMatch");
  async function OthersMatch(input2) {
    const TryOthersMatch = await MatchOthers(input2);
    if (TryOthersMatch.length != 0) {
      return [...["Others"], ...TryOthersMatch];
    } else {
      return [];
    }
  }
  __name(OthersMatch, "OthersMatch");
  async function StudentMatch2(input2) {
    const root = await rootF("bap-json");
    const AronaNameData = await fmp.json_parse(`${root}/sms_studata_toaro_stu.json`);
    const TryStudentMatch = await MatchStudentName(input2);
    if (TryStudentMatch.length != 0) {
      for (let i = 0; i < TryStudentMatch.length; i++) {
        for (const student of AronaNameData) {
          if (student.Id === TryStudentMatch[i]) {
            TryStudentMatch[i] = student.MapName;
            break;
          }
        }
      }
      return [...["Student"], ...TryStudentMatch];
    } else {
      return [];
    }
  }
  __name(StudentMatch2, "StudentMatch");
  const m = ["地图", "主线", "走格子"];
  const o = ["杂图", "攻略", "活动"];
  const s = ["学生", "人物"];
  for (const str of m) {
    if (input.includes(str)) {
      return MapMatch(input.replace(str, ""));
    }
  }
  for (const str of o) {
    if (input.includes(str)) {
      if (pretreat(input) === "杂图") {
        return OthersMatch(input);
      } else {
        return OthersMatch(input.replace(str, ""));
      }
    }
  }
  for (const str of s) {
    if (input.includes(str)) {
      return await StudentMatch2(input.replace(str, ""));
    }
  }
  const resultM = MapMatch(input);
  if (resultM.length != 0) {
    return resultM;
  }
  const resultO = OthersMatch(input);
  if ((await resultO).length != 0) {
    return resultO;
  }
  const resultS = await StudentMatch2(input);
  if (resultS.length != 0) {
    return resultS;
  } else {
    return [];
  }
}
__name(MatchArona, "MatchArona");

// src/gacha/gacha_main.ts
var log3 = "ba-plugin-gacha";
var logger4 = new import_koishi5.Logger(log3);
var random2 = new import_koishi5.Random(() => Math.random());
async function gacha_f(ctx3, config) {
  const root_json = await rootF("bap-json");
  const root_img = await rootF("bap-img");
  const fmp2 = new FMPS(ctx3);
  const mdid = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板id"];
  const mdkey1 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数1"];
  const mdkey2 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数2"];
  const mdkey3 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数3"];
  const mdkey4 = config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[0]["MD模板参数4"];
  const qqguild_id = config.qqconfig.markdown_setting.qqguild;
  const drawm = config.plugin_config.draw_modle == "canvas" ? "" : "file://";
  var mdswitch = false;
  const sms_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
  async function get_gacha_stu() {
    const utimetamp = Math.floor(Date.now() / 1e3);
    const wiki_data = await ctx3.http.get(`https://ba.gamekee.com/v1/activity/query?active_at=${utimetamp}`, {
      headers: {
        "game-alias": "ba"
      }
    });
    let now_pick_cn = [];
    let now_pick_in = [];
    let now_pick_jp = [];
    let pick_cn_time = [];
    let pick_in_time = [];
    let pick_jp_time = [];
    for (let i = 0; i < wiki_data.data.length; i++) {
      if (/卡池/.test(wiki_data.data[i].title) && utimetamp >= wiki_data.data[i].begin_at && utimetamp <= wiki_data.data[i].end_at) {
        const txt = wiki_data.data[i].title;
        const regex = /[\u4e00-\u9fa5]+/g;
        const matches = txt.match(regex);
        matches ? matches.join("") : "";
        if (wiki_data.data[i].pub_area == "国服") {
          pick_cn_time.push(fmp2.formatTimestamp(wiki_data.data[i].begin_at));
          pick_cn_time.push(fmp2.formatTimestamp(wiki_data.data[i].end_at));
          for (let ii = 1; ii < matches.length; ii++) {
            const stuid = await StudentMatch(matches[ii]);
            const stuids = id_to_dbid(stuid[1]);
            now_pick_cn.push(stuids);
          }
        } else if (wiki_data.data[i].pub_area == "日服") {
          pick_jp_time.push(fmp2.formatTimestamp(wiki_data.data[i].begin_at));
          pick_jp_time.push(fmp2.formatTimestamp(wiki_data.data[i].end_at));
          for (let ii = 1; ii < matches.length; ii++) {
            const stuid = await StudentMatch(matches[ii]);
            const stuids = id_to_dbid(stuid[1]);
            now_pick_jp.push(stuids);
          }
        } else if (wiki_data.data[i].pub_area == "国际服") {
          pick_in_time.push(fmp2.formatTimestamp(wiki_data.data[i].begin_at));
          pick_in_time.push(fmp2.formatTimestamp(wiki_data.data[i].end_at));
          for (let ii = 1; ii < matches.length; ii++) {
            const stuid = await StudentMatch(matches[ii]);
            const stuids = id_to_dbid(stuid[1]);
            now_pick_in.push(stuids);
          }
        }
      }
    }
    console.log({
      now_pick_cn,
      pick_cn_time,
      now_pick_jp,
      pick_jp_time,
      now_pick_in,
      pick_in_time
    });
    return {
      now_pick_cn,
      pick_cn_time,
      now_pick_jp,
      pick_jp_time,
      now_pick_in,
      pick_in_time
    };
  }
  __name(get_gacha_stu, "get_gacha_stu");
  async function init_gacha() {
    try {
      const dbdata = await ctx3.http.get("https://schaledb.com/data/cn/students.json");
      let in_json_create_data = [[], []];
      const autoupd = await get_gacha_stu();
      in_json_create_data[0].push(autoupd);
      for (let i = 0; i < dbdata.length; i++) {
        in_json_create_data[1].push({
          "id": dbdata[i].Id,
          "IsReleased": dbdata[i].IsReleased,
          "StarGrade": dbdata[i].StarGrade,
          "IsLimited": dbdata[i].IsLimited
        });
      }
      const j = await fmp2.json_create(root_json, "gacha_data.json", in_json_create_data);
      gacha_json = await fmp2.json_parse(j);
      logger4.info("✔️ 本地抽卡数据更新完毕");
    } catch (e) {
      logger4.info("出错惹呜呜" + e);
      return;
    }
  }
  __name(init_gacha, "init_gacha");
  let gacha_json;
  try {
    const i = await fmp2.file_download("https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json/gacha_data.json", root_json, "gacha_data.json");
    gacha_json = await fmp2.json_parse(root_json + "/gacha_data.json");
  } catch (e) {
    logger4.info("出现错误" + e + "正在尝试本地更新抽卡数据");
    await init_gacha();
  }
  if (config.plugin_config.autoupd == "本地") {
    logger4.info("正在尝试本地更新抽卡数据");
    await init_gacha();
  }
  const pick = gacha_json[0];
  ctx3.model.extend("bap_db", {
    id: "string",
    serverid: "integer",
    gacha_data_cn: "list",
    gacha_data_in: "list",
    gacha_data_jp: "list"
  });
  const all_pick_id = (() => {
    const nowTime = /* @__PURE__ */ new Date();
    const cnp = nowTime < new Date(pick[0].pick_cn_time[1]) && nowTime > new Date(pick[0].pick_cn_time[0]) ? pick[0].now_pick_cn : [];
    const inp = nowTime < new Date(pick[0].pick_in_time[1]) && nowTime > new Date(pick[0].pick_in_time[0]) ? pick[0].now_pick_in : [];
    const jpp = nowTime < new Date(pick[0].pick_jp_time[1]) && nowTime > new Date(pick[0].pick_jp_time[0]) ? pick[0].now_pick_jp : [];
    return [cnp, inp, jpp];
  })();
  const all_pick_name = (() => {
    const cnp = all_pick_id[0].map((i) => id_to_name(i)).map((i) => pick[0].fes_cn ? i + "(fes)" : i);
    const inp = all_pick_id[1].map((i) => id_to_name(i)).map((i) => pick[0].fes_in ? i + "(fes)" : i);
    const jpp = all_pick_id[2].map((i) => id_to_name(i)).map((i) => pick[0].fes_jp ? i + "(fes)" : i);
    return [cnp, inp, jpp];
  })();
  function id_to_name(id) {
    const name2 = sms_data.filter((i) => i.Id_db == id);
    return name2[0].MapName;
  }
  __name(id_to_name, "id_to_name");
  function id_to_dbid(id) {
    const ids = sms_data.filter((i) => i.Id == id);
    return ids[0].Id_db;
  }
  __name(id_to_dbid, "id_to_dbid");
  function name_to_id(name2) {
    if (name2.length == 0) {
      return;
    }
    const id = sms_data.filter((i) => i.MapName == name2);
    return id[0].Id_db;
  }
  __name(name_to_id, "name_to_id");
  function stu_server_jud(stuid) {
    const cns = gacha_json[1].filter((i) => i.id == stuid)[0].IsReleased[2];
    const ins = gacha_json[1].filter((i) => i.id == stuid)[0].IsReleased[1];
    const jps = gacha_json[1].filter((i) => i.id == stuid)[0].IsReleased[0];
    let servid;
    if (jps) {
      servid = 0;
    }
    if (ins) {
      servid = 1;
    }
    if (cns) {
      servid = 2;
    }
    return servid;
  }
  __name(stu_server_jud, "stu_server_jud");
  function stu_sta_jud(stuid) {
    const star = gacha_json[1].filter((i) => i.id == stuid)[0].StarGrade;
    if (star != 3) {
      return false;
    } else {
      return true;
    }
  }
  __name(stu_sta_jud, "stu_sta_jud");
  function cal_muzhu(gacha) {
    let muzhu = 0;
    for (let i = 0; i < gacha[1].length; i++) {
      switch (gacha[1][i]) {
        case 1:
          muzhu++;
          break;
        case 2:
          muzhu += 10;
          break;
        case 3:
          muzhu += 50;
          break;
        case "pick":
          muzhu += 50;
          break;
      }
    }
    return muzhu;
  }
  __name(cal_muzhu, "cal_muzhu");
  function serverid_to_text(serid) {
    let text;
    switch (serid) {
      case 0:
        text = "日服";
        break;
      case 1:
        text = "国际服";
        break;
      case 2:
        text = "国服";
        break;
    }
    return text;
  }
  __name(serverid_to_text, "serverid_to_text");
  async function gacha_push(uid, serid, gacha) {
    let user_data;
    try {
      user_data = await ctx3.database.get("bap_db", uid);
    } catch (e) {
      logger4.info(e);
    }
    if (user_data.length == 0) {
      if (serid == 0) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_jp: gacha[0]
          }
        ]);
      } else if (serid == 1) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_in: gacha[0]
          }
        ]);
      } else if (serid == 2) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_jp: gacha[0]
          }
        ]);
      }
      return gacha[0].length;
    } else {
      if (user_data[0].gacha_data_jp.lenght > 1e3) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_jp: []
          }
        ]);
        return 0;
      } else if (user_data[0].gacha_data_in.lenght > 1e3) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_in: []
          }
        ]);
        return 0;
      } else if (user_data[0].gacha_data_cn.lenght > 1e3) {
        await ctx3.database.upsert("bap_db", [
          {
            id: uid,
            serverid: serid,
            gacha_data_jp: []
          }
        ]);
        return 0;
      }
    }
    let new_data;
    switch (serid) {
      case 0:
        new_data = [...user_data[0].gacha_data_jp, ...gacha[0].map((i) => {
          return i.toString();
        })];
        break;
      case 1:
        new_data = [...user_data[0].gacha_data_in, ...gacha[0].map((i) => {
          return i.toString();
        })];
        break;
      case 2:
        new_data = [...user_data[0].gacha_data_cn, ...gacha[0].map((i) => {
          return i.toString();
        })];
        break;
    }
    if (serid == 0) {
      await ctx3.database.upsert("bap_db", [
        {
          id: uid,
          serverid: serid,
          gacha_data_jp: new_data
        }
      ]);
    } else if (serid == 1) {
      await ctx3.database.upsert("bap_db", [
        {
          id: uid,
          serverid: serid,
          gacha_data_in: new_data
        }
      ]);
    } else if (serid == 2) {
      await ctx3.database.upsert("bap_db", [
        {
          id: uid,
          serverid: serid,
          gacha_data_cn: new_data
        }
      ]);
    }
    return new_data.length;
  }
  __name(gacha_push, "gacha_push");
  function markdown_gacha_sub(session, serid, muzhushi, url, stuname) {
    let stunames = "";
    let mdtext = "";
    if (stuname == "Not matched" || !stuname || stuname == "Not 3star" || stuname == "Not Released") {
      stuname == "Not matched" ? mdtext = "呜呜呜，未匹配到学生，" : "";
      stuname == "Not 3star" ? mdtext = "暂不支持up非三星角色，" : "";
      stuname == "Not Released" ? mdtext = "呜呜，该学生未实装，" : "";
      stunames = "";
    } else {
      stunames = stuname;
    }
    let pools = ["", ""];
    switch (serid) {
      case 0:
        pools[0] = "日服";
        pools[1] = "十连";
        break;
      case 1:
        pools[0] = "国际服";
        pools[1] = "十连";
        break;
      case 2:
        pools[0] = "国服";
        pools[1] = "十连";
        break;
      case 3:
        pools[0] = "日服";
        pools[1] = "一井";
        break;
      case 4:
        pools[0] = "国际服";
        pools[1] = "一井";
        break;
      case 5:
        pools[0] = "国服";
        pools[1] = "一井";
        break;
    }
    return {
      msg_type: 2,
      msg_id: session.messageId,
      markdown: {
        custom_template_id: mdid,
        params: [
          {
            key: mdkey1,
            values: [`${mdtext}抽${pools[1]}${pools[0]}的${stunames == "" ? "常驻" : stunames}池子结果如下`]
          },
          {
            key: mdkey2,
            values: ["💎总共获得神明精髓：" + muzhushi + "个"]
          },
          {
            key: mdkey3,
            values: [`![img#1024px #600px]`]
          },
          {
            key: mdkey4,
            values: [`(${url})`]
          }
        ]
      },
      keyboard: {
        content: {
          rows: [
            {
              buttons: [
                {
                  render_data: { label: "再抽一次", style: 1 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/${pools[0]}${pools[1]} ${stunames}`,
                    enter: true
                  }
                },
                {
                  render_data: { label: "查看菜单", style: 1 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/抽卡`,
                    enter: true
                  }
                }
              ]
            }
          ]
        }
      }
    };
  }
  __name(markdown_gacha_sub, "markdown_gacha_sub");
  function markdown_gacha_main(session) {
    const list1_cn = (() => {
      const a = all_pick_name[0].length;
      let button = [];
      for (let i = 0; i < a; i++) {
        button.push(
          {
            render_data: { label: `国服:${all_pick_name[0][i]}`, style: 1 },
            action: {
              type: 2,
              permission: { type: 2 },
              data: `/国服十连 ${all_pick_name[0][i]}`,
              enter: false
            }
          }
        );
      }
      return button;
    })();
    const list1_in = (() => {
      const a = all_pick_name[1].length;
      let button = [];
      for (let i = 0; i < a; i++) {
        button.push(
          {
            render_data: { label: `国际服:${all_pick_name[1][i]}`, style: 1 },
            action: {
              type: 2,
              permission: { type: 2 },
              data: `/国际服十连 ${all_pick_name[1][i]}`,
              enter: false
            }
          }
        );
      }
      return button;
    })();
    const list1_jp = (() => {
      const a = all_pick_name[2].length;
      let button = [];
      let list = {};
      for (let i = 0; i < a; i++) {
        button.push(
          {
            render_data: { label: `日服:${all_pick_name[2][i]}`, style: 1 },
            action: {
              type: 2,
              permission: { type: 2 },
              data: `/日服十连 ${all_pick_name[2][i]}`,
              enter: false
            }
          }
        );
      }
      return button;
    })();
    return {
      msg_type: 2,
      msg_id: session.messageId,
      markdown: {
        custom_template_id: mdid,
        params: [
          {
            key: mdkey1,
            values: ["🟢手动@机器人并发送:/卡池选项+空格+up角色"]
          },
          {
            key: mdkey2,
            values: ["当前卡池："]
          }
        ]
      },
      keyboard: {
        content: {
          rows: [
            {
              buttons: list1_cn
            },
            {
              buttons: list1_in
            },
            {
              buttons: list1_jp
            },
            {
              buttons: [
                {
                  render_data: { label: "日服一井", style: 4 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/日服一井`,
                    enter: false
                  }
                },
                {
                  render_data: { label: "国际服一井", style: 4 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/国际服一井`,
                    enter: false
                  }
                },
                {
                  render_data: { label: "国服一井", style: 4 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/国服一井`,
                    enter: false
                  }
                }
              ]
            }
          ]
        }
      }
    };
  }
  __name(markdown_gacha_main, "markdown_gacha_main");
  var mdswitch = false;
  if (mdid && mdkey1 && mdkey2 && mdkey3 && mdkey4 && mdid && qqguild_id) {
    logger4.info("🟢 抽卡已启用MD消息模板");
    mdswitch = true;
  } else {
    logger4.info("⚠️ md相关设置未完善,未启用MD模板");
    mdswitch = false;
  }
  async function draw_particle(star) {
    const canvas = await ctx3.canvas.createCanvas(500, 800);
    const c = canvas.getContext("2d");
    const tri = await ctx3.canvas.loadImage(`${drawm}${root_img}/tri_${star}.png`);
    let wids = config.plugin_config.draw_modle == "canvas" ? "width" : "naturalWidth";
    let heis = config.plugin_config.draw_modle == "canvas" ? "height" : "naturalHeight";
    let x = 0;
    let y = 0;
    let move = 100;
    let z = 105;
    const y2 = 130;
    const move_x = 310;
    c.beginPath();
    c.moveTo(x + move, y + move - y2);
    c.lineTo(x + move + move_x, y + move - y2);
    c.lineTo(x + move + move_x - z, y + move + move_x + y2);
    c.lineTo(x + move - z, y + move + move_x + y2);
    c.lineTo(x + move, y + move - y2);
    c.closePath();
    c.translate(250, 400);
    let is = 15;
    star == 2 ? is = 10 : is = 18;
    for (let i = 0; i < is; i++) {
      c.clip();
      c.restore();
      let width = tri[wids];
      let height = tri[heis];
      let wid, hei;
      const xp = random2.int(0, 50);
      const yp = random2.int(0, 200);
      let loght;
      if (yp > 120) {
        loght = true;
      } else {
        loght = false;
      }
      wid = width, hei = height;
      if (loght) {
        c.globalAlpha = 0.9;
        c.filter = "brightness(950%)";
        const hwp = random2.real(0.2, 0.4);
        width = width * hwp;
        height = height * hwp;
        c.shadowColor = "rgba(255,255,255,1)";
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
      } else {
        c.shadowColor = "rgba(255,255,255,0)";
        const hwp = random2.int(1, 3);
        c.globalAlpha = 0.35;
        c.filter = "brightness(160%)";
        width = width * hwp;
        height = height * hwp;
      }
      c.rotate(Math.PI / random2.int(0, 10));
      c.drawImage(tri, -wid / 2 + xp, -hei / 2 + yp, width, height);
      c.filter = "none";
    }
    c.globalAlpha = 0;
    return canvas.toBuffer("image/png");
  }
  __name(draw_particle, "draw_particle");
  async function creat_img(stu_gacha, print, serverid) {
    const image = await ctx3.canvas.loadImage(`${drawm}${root_img}/background.png`);
    const canvas = await ctx3.canvas.createCanvas(2048, 1200);
    const back = [
      await ctx3.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/2sta.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/3sta.png`)
    ];
    const ctximg = canvas.getContext("2d");
    ctximg.drawImage(image, 0, 0);
    let x = 100;
    let y = 100;
    let move = 106;
    let z = 42;
    const printimg = await ctx3.canvas.loadImage(`${drawm}${root_img}/print_${serverid}.png`);
    for (let i = 0; i < 10; i++) {
      const image2 = await ctx3.canvas.loadImage(`${drawm}${root_img}/${stu_gacha[0][i]}_g.png`);
      const pick2 = await ctx3.canvas.loadImage(`${drawm}${root_img}/pickup.png`);
      ctximg.save();
      if (stu_gacha[1][i] == "pick") {
        ctximg.drawImage(back[3], x, y + 5, 400, 520);
      } else {
        ctximg.drawImage(back[stu_gacha[1][i]], x, y + 5, 400, 520);
      }
      ctximg.beginPath();
      ctximg.moveTo(x + move, y + move + 8);
      ctximg.lineTo(x + move + 243, y + move + 8);
      ctximg.lineTo(x + move + 243 - z, y + move + 240);
      ctximg.lineTo(x + move - z, y + move + 242);
      ctximg.lineTo(x + move, y + move + 10);
      ctximg.closePath();
      ctximg.clip();
      ctximg.drawImage(image2, x + move - 40, y + move, 280, 260);
      ctximg.restore();
      if (stu_gacha[1][i] == "pick") {
        ctximg.drawImage(pick2, x + 50, y + 90);
        const particle = await ctx3.canvas.loadImage(await draw_particle(3));
        ctximg.drawImage(particle, x, y);
      } else if (stu_gacha[1][i] == "3") {
        const particle = await ctx3.canvas.loadImage(await draw_particle(3));
        ctximg.drawImage(particle, x, y);
      } else if (stu_gacha[1][i] == "2") {
        const particle = await ctx3.canvas.loadImage(await draw_particle(2));
        ctximg.drawImage(particle, x, y);
      }
      x += 340;
      if (i == 4) {
        y += 400;
        x = 100;
      }
    }
    ctximg.font = `bold 50px Arial`;
    ctximg.fillStyle = "#FFFFFF";
    ctximg.drawImage(printimg, 1450, 980);
    ctximg.fillText(print, 1650, 1090);
    const buffers = canvas.toBuffer("image/png");
    return buffers;
  }
  __name(creat_img, "creat_img");
  async function draw_200_img(stu_gacha) {
    const pick2 = await ctx3.canvas.loadImage(`${drawm}${root_img}/pickup.png`);
    const image = await ctx3.canvas.loadImage(`${drawm}${root_img}/background.png`);
    const canvas = await ctx3.canvas.createCanvas(2048, 1200);
    const back = [
      await ctx3.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/1sta.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/2sta_1.png`),
      await ctx3.canvas.loadImage(`${drawm}${root_img}/3sta_1.png`)
    ];
    const c = canvas.getContext("2d");
    c.drawImage(image, 0, 0);
    const ids = stu_gacha[0];
    const levels = stu_gacha[1];
    const intermediateResult = ids.reduce((acc, id, index) => {
      if (!acc[id]) {
        acc[id] = { stuid: id, rep: 0, star: 0 };
      }
      acc[id].rep += 1;
      acc[id].star = levels[index];
      return acc;
    }, {});
    const final_stu_json = Object.values(intermediateResult);
    async function draw_char(id, star, x, y) {
      let m = 0.45;
      let move = 109;
      let z = 42;
      const stu_img = await ctx3.canvas.loadImage(`${drawm}${root_img}/${id}_g.png`);
      c.save();
      if (star == 4) {
        c.drawImage(back[3], x * m, y * m + 5, 400 * m, 520 * m);
      } else {
        c.drawImage(back[star], x * m, y * m + 5, 400 * m, 520 * m);
      }
      c.beginPath();
      c.moveTo((x + move) * m, (y + move + 15) * m);
      c.lineTo((x + move + 236) * m, (y + move + 15) * m);
      c.lineTo((x + move + 236 - z) * m, (y + move + 250) * m);
      c.lineTo((x + move - z) * m, (y + move + 250) * m);
      c.lineTo((x + move) * m, (y + move + 15) * m);
      c.closePath();
      c.clip();
      c.drawImage(stu_img, (x + move - 40) * m, (y + move) * m, 280 * m, 260 * m);
      c.restore();
    }
    __name(draw_char, "draw_char");
    c.font = `bold 40px Arial`;
    c.fillStyle = "#000000";
    let x_move = 130, y_move = 183, y3 = 0, y2 = 670, y1 = 0, x3p = 50, x2p = 50, x1p = 50;
    let l1 = 0, l2 = 0, l3 = 0;
    for (let i = 0; i < final_stu_json.length; i++) {
      if (final_stu_json[i].star == 3) {
        l1++;
      }
      if (l1 <= 11) {
        y2 = 430;
        y1 = 1240;
      } else {
        y2 = 800;
        y1 = 1620;
      }
    }
    for (let i = 0; i < final_stu_json.length; i++) {
      switch (final_stu_json[i].star) {
        case 4: {
          await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x3p, y3);
          c.drawImage(pick2, x3p * 0.45 + 20, y3 * 0.45 + 41, 80, 28);
          c.fillText("x" + final_stu_json[i].rep.toString(), x3p * 0.45 + x_move, y3 * 0.45 + y_move);
          x3p += 400;
          if (x3p > 4200) {
            y3 += 400;
            x3p = 50;
          }
          break;
        }
        case 3: {
          await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x3p, y3);
          c.fillText("x" + final_stu_json[i].rep.toString(), x3p * 0.45 + x_move, y3 * 0.45 + y_move);
          x3p += 400;
          if (x3p > 4200) {
            y3 += 400;
            x3p = 50;
          }
          break;
        }
        case 2: {
          await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x2p, y2);
          c.fillText("x" + final_stu_json[i].rep.toString(), x2p * 0.45 + x_move, y2 * 0.45 + y_move);
          x2p += 400;
          if (x2p > 4200) {
            y2 += 400;
            x2p = 50;
          }
          break;
        }
        case 1: {
          await draw_char(final_stu_json[i].stuid, final_stu_json[i].star, x1p, y1);
          c.fillText("x" + final_stu_json[i].rep.toString(), x1p * 0.45 + x_move, y1 * 0.45 + y_move);
          x1p += 400;
          if (x1p > 4200) {
            y1 += 400;
            x1p = 50;
          }
          break;
        }
      }
    }
    const buffers = canvas.toBuffer("image/png");
    return buffers;
  }
  __name(draw_200_img, "draw_200_img");
  function gacha_10(IsReleased, stu) {
    const released_1 = gacha_json[1].filter((i) => i.StarGrade == 1).filter((a) => a.IsLimited == 0).filter((i) => i.IsReleased[IsReleased]).map((i) => i.id);
    const released_2 = gacha_json[1].filter((i) => i.StarGrade == 2).filter((a) => a.IsLimited == 0).filter((i) => i.IsReleased[IsReleased]).map((i) => i.id);
    const released_3 = gacha_json[1].filter((i) => i.StarGrade == 3).filter((a) => a.IsLimited == 0).filter((i) => i.IsReleased[IsReleased]).map((i) => i.id);
    let stu_10 = [];
    let stu_sta = [];
    let safeguards = 0;
    const pickp = stu ? 7e-3 : 0;
    let sername = "";
    let suoying = 0;
    switch (IsReleased) {
      case 0:
        sername = "jp";
        break;
      case 1:
        sername = "in";
        break;
      case 2:
        sername = "cn";
        break;
    }
    let arry = [];
    if (pick[0][`fes_${sername}`]) {
      arry[0] = 0.755;
      arry[1] = 0.185;
      arry[2] = 0.06;
    } else {
      arry[0] = 0.785;
      arry[1] = 0.185;
      arry[2] = 0.03;
    }
    for (let i = 0; i < 10; i++) {
      const sta = random2.weightedPick({
        "1": arry[0],
        "2": arry[1],
        "3": arry[2] - pickp,
        "pick": pickp
      });
      if (i == 9 && safeguards == 0) {
        stu_10.push(random2.pick(released_2));
        stu_sta.push(2);
        break;
      }
      switch (sta) {
        case "1":
          {
            stu_10.push(random2.pick(released_1));
            stu_sta.push(1);
          }
          break;
        case "2":
          {
            stu_10.push(random2.pick(released_2));
            stu_sta.push(2);
            safeguards++;
          }
          break;
        case "3":
          {
            stu_10.push(random2.pick(released_3));
            stu_sta.push(3);
            safeguards++;
          }
          break;
        case "pick":
          {
            stu_10.push(stu);
            stu_sta.push("pick");
            safeguards++;
          }
          break;
      }
    }
    return [stu_10, stu_sta];
  }
  __name(gacha_10, "gacha_10");
  function gacha_200(IsReleased, stu) {
    let g_200 = [[], []];
    for (let i = 0; i < 20; i++) {
      const gacha = gacha_10(IsReleased, stu);
      g_200[0].push(...gacha[0]);
      g_200[1].push(...gacha[1].map((i2) => {
        i2 == "pick" ? i2 = 4 : i2;
        return i2;
      }));
    }
    return g_200;
  }
  __name(gacha_200, "gacha_200");
  ctx3.command("ba抽卡 <message:text>", "ba十连和吃井模拟").alias("抽卡").alias("抽一井").alias("井").alias("gacha").action(async ({ session }, message) => {
    function help_text(qq) {
      const i1 = qq ? "🟢手动@机器人并发送:/" : "🟢发送: ";
      const i2 = qq ? "@机器人 /" : "";
      return `
ba抽卡模拟器
使用方法：
${i1}卡池选项+空格+up角色"
卡池选项：
▫️国服一井  
▪️国服十连  
▫️国际服一井  
▪️国际服十连  
▫️日服一井  
▪️日服十连
缺省up角色将抽取常驻池
示例：
${i2}国服十连 爱丽丝
        `;
    }
    __name(help_text, "help_text");
    switch (message) {
      case "国服一井": {
        return session.execute("国服一井");
      }
      case "国服十连": {
        return session.execute("国服十连");
      }
      case "国际服一井": {
        return session.execute("国际服一井");
      }
      case "国际服十连": {
        return session.execute("国际服十连");
      }
      case "日服一井": {
        return session.execute("日服一井");
      }
      case "日服十连": {
        return session.execute("日服十连");
      }
    }
    const now_gacha = ["-日服：", ...all_pick_name[2], "-国际服：", ...all_pick_name[1], "-国服：", ...all_pick_name[0]].join("\n");
    if (session.event.platform == "qq" && mdswitch) {
      const md = markdown_gacha_main(session);
      try {
        await session.qq.sendMessage(session.channelId, md);
      } catch (e) {
        logger4.info("发送md时发生错误", e);
        return help_text(true) + "🆙目前up角色：\n" + now_gacha;
      }
    } else {
      return help_text(false) + "🆙目前up角色：\n" + now_gacha;
    }
  });
  ctx3.command("ba抽卡/日服十连 <message:text>").action(async ({ session }, message) => {
    const uid = session.event.user.id;
    if (!message) {
      const stu_gacha = gacha_10(0);
      const print = await gacha_push(uid, 0, stu_gacha);
      const img = await creat_img(stu_gacha, print, 0);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 0, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽日服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_10(0);
        const print = await gacha_push(uid, 0, stu_gacha);
        const img = await creat_img(stu_gacha, print, 0);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 0, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽取日服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_10(0);
        const print = await gacha_push(uid, 0, stu_gacha);
        const img = await creat_img(stu_gacha, print, 0);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 0, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽取日服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const stu_gacha = gacha_10(0, id);
        const print = await gacha_push(uid, 0, stu_gacha);
        const img = await creat_img(stu_gacha, print, 0);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        let fess = "";
        if (pick[0].now_pick_jp.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        const md = markdown_gacha_sub(session, 0, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        const sername = serverid_to_text(0);
        let fess = "";
        if (pick[0].now_pick_jp.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        await session.send("正在抽取" + sername + stuname + "的池子，请老师稍等哦");
        const stu_gacha = gacha_10(0, id);
        const print = await gacha_push(uid, 0, stu_gacha);
        const img = await creat_img(stu_gacha, print, 0);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  ctx3.command("ba抽卡/国际服十连 <message:text>").action(async ({ session }, message) => {
    const uid = session.event.user.id;
    if (!message) {
      const stu_gacha = gacha_10(1);
      const print = await gacha_push(uid, 1, stu_gacha);
      const img = await creat_img(stu_gacha, print, 1);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 1, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽取国际服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_10(1);
        const print = await gacha_push(uid, 1, stu_gacha);
        const img = await creat_img(stu_gacha, print, 1);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 1, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽取国际服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (stu_server_jud(id) < 1) {
        const stu_gacha = gacha_10(1);
        const print = await gacha_push(uid, 1, stu_gacha);
        const img = await creat_img(stu_gacha, print, 1);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 1, muzhu, imgurl, "Not Released");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜，该学生未实装，抽取国际服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_10(1);
        const print = await gacha_push(uid, 1, stu_gacha);
        const img = await creat_img(stu_gacha, print, 1);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 1, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽取国际服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const stu_gacha = gacha_10(1, id);
        const print = await gacha_push(uid, 1, stu_gacha);
        const img = await creat_img(stu_gacha, print, 1);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        let fess = "";
        if (pick[0].now_pick_in.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        const md = markdown_gacha_sub(session, 1, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        const id2 = id_to_dbid(student[1]);
        const sername = serverid_to_text(1);
        let fess = "";
        if (pick[0].now_pick_in.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        await session.send("正在抽取" + sername + stuname + "的池子，请老师稍等哦");
        const stu_gacha = gacha_10(1, id2);
        const print = await gacha_push(uid, 1, stu_gacha);
        const img = await creat_img(stu_gacha, print, 1);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  ctx3.command("ba抽卡/国服十连 <message:text>").action(async ({ session }, message) => {
    const server_id = 2;
    const uid = session.event.user.id;
    if (!message) {
      const stu_gacha = gacha_10(server_id);
      const print = await gacha_push(uid, server_id, stu_gacha);
      const img = await creat_img(stu_gacha, print, server_id);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, server_id, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽取国服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_10(2);
        const print = await gacha_push(uid, 2, stu_gacha);
        const img = await creat_img(stu_gacha, print, 2);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 2, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽取国服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (stu_server_jud(id) < 2) {
        const stu_gacha = gacha_10(2);
        const print = await gacha_push(uid, 2, stu_gacha);
        const img = await creat_img(stu_gacha, print, 2);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, server_id, muzhu, imgurl, "Not Released");
          await session.qq.sendMessage(session.channelId, md);
        } else {
          await session.send("呜呜，该学生未实装，抽取国服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_10(server_id);
        const print = await gacha_push(uid, server_id, stu_gacha);
        const img = await creat_img(stu_gacha, print, server_id);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, server_id, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽取国服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const stu_gacha = gacha_10(server_id, id);
        const print = await gacha_push(uid, server_id, stu_gacha);
        const img = await creat_img(stu_gacha, print, server_id);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        let fess = "";
        if (pick[0].now_pick_cn.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        const md = markdown_gacha_sub(session, server_id, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        const id2 = id_to_dbid(student[1]);
        const sername = serverid_to_text(server_id);
        let fess = "";
        if (pick[0].now_pick_cn.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        await session.send("正在抽取" + sername + stuname + "的池子，请老师稍等哦");
        const stu_gacha = gacha_10(server_id, id2);
        const print = await gacha_push(uid, server_id, stu_gacha);
        const img = await creat_img(stu_gacha, print, server_id);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  ctx3.command("ba抽卡/日服一井 <message:text>").action(async ({ session }, message) => {
    const server_ids = 0;
    if (!message) {
      const stu_gacha = gacha_200(server_ids);
      const img = await draw_200_img(stu_gacha);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 3, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽一井日服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 3, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽一井日服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 3, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽一井日服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const stu_gacha = gacha_200(server_ids, id);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        let fess = "";
        if (pick[0].now_pick_jp.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        const md = markdown_gacha_sub(session, 3, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        let fess = "";
        if (pick[0].now_pick_jp.includes(id) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id) + fess;
        await session.send("正在抽一井日服的" + stuname + "池子，请老师稍等哦");
        const stu_gacha = gacha_200(server_ids, id);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  ctx3.command("ba抽卡/国际服一井 <message:text>").action(async ({ session }, message) => {
    const server_ids = 1;
    if (!message) {
      const stu_gacha = gacha_200(server_ids);
      const img = await draw_200_img(stu_gacha);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 4, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽一井国际服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 4, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽一井国际服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (stu_server_jud(id) < server_ids) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 4, muzhu, imgurl, "Not Released");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜，该学生未实装，抽取国际服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 4, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽一井国际服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const id2 = id_to_dbid(student[1]);
        const stu_gacha = gacha_200(server_ids, id2);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        let fess = "";
        if (pick[0].now_pick_in.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        const md = markdown_gacha_sub(session, 4, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        const id2 = id_to_dbid(student[1]);
        let fess = "";
        if (pick[0].now_pick_in.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        await session.send("正在抽一井国际服的" + stuname + "池子，请老师稍等哦");
        const stu_gacha = gacha_200(server_ids, id2);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  ctx3.command("ba抽卡/国服一井 <message:text>").action(async ({ session }, message) => {
    const server_ids = 2;
    if (!message) {
      const stu_gacha = gacha_200(server_ids);
      const img = await draw_200_img(stu_gacha);
      const muzhu = cal_muzhu(stu_gacha);
      if (session.event.platform == "qq" && mdswitch) {
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 5, muzhu, imgurl);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        await session.send("正在抽一井国服常驻池子，请老师稍等哦");
        await session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    } else {
      const student = await StudentMatch(message);
      console.log(student);
      if (student[0] != "Student" || student.length == 0) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 5, muzhu, imgurl, "Not matched");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，未匹配到学生，正在抽一井国服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      const id = id_to_dbid(student[1]);
      if (stu_server_jud(id) < server_ids) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 5, muzhu, imgurl, "Not Released");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜，该学生未实装，抽取一井国服常驻池子，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (!stu_sta_jud(id)) {
        const stu_gacha = gacha_200(server_ids);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        if (session.event.platform == "qq" && mdswitch) {
          const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
          const md = markdown_gacha_sub(session, 5, muzhu, imgurl, "Not 3star");
          await session.qq.sendMessage(session.channelId, md);
          return;
        } else {
          await session.send("呜呜呜，暂不支持up非三星角色，抽一井国服常驻池子中，请老师稍等哦");
          await session.send("总共获得神明精髓：" + muzhu + "个");
          return import_koishi5.h.image(img, "image/jpg");
        }
      }
      if (session.event.platform == "qq" && mdswitch) {
        const id2 = id_to_dbid(student[1]);
        let fess = "";
        if (pick[0].now_pick_cn.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        const stu_gacha = gacha_200(server_ids, id2);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        const imgurl = await fmp2.img_to_channel(img, session.bot.config.id, session.bot.config.secret, qqguild_id);
        const md = markdown_gacha_sub(session, 5, muzhu, imgurl, stuname);
        await session.qq.sendMessage(session.channelId, md);
        return;
      } else {
        const id2 = id_to_dbid(student[1]);
        let fess = "";
        if (pick[0].now_pick_cn.includes(id2) && pick[0].fes_cn) {
          fess = "(fes)";
        }
        const stuname = id_to_name(id2) + fess;
        await session.send("正在抽一井国服的" + stuname + "池子，请老师稍等哦");
        const stu_gacha = gacha_200(server_ids, id2);
        const img = await draw_200_img(stu_gacha);
        const muzhu = cal_muzhu(stu_gacha);
        session.send("总共获得神明精髓：" + muzhu + "个");
        return import_koishi5.h.image(img, "image/jpg");
      }
    }
  });
  logger4.info("🟢 抽卡模拟器加载完毕");
  let manga_jsondata = await fmp2.json_parse(`${root_json}/manga_main.json`);
  if (!manga_jsondata) {
    logger4.info("数据读取出错");
    return;
  }
  ctx3.command("抽漫画", "随机抽取ba官方漫画").action(async () => {
    try {
      const ii = random2.int(0, manga_jsondata.length);
      console.log(ii);
      return import_koishi5.h.image(manga_jsondata[ii].wikiurl);
    } catch (e) {
      logger4.info(e);
      return "呜呜呜，出错了";
    }
  });
  logger4.info("🟢 随机漫画加载完毕");
}
__name(gacha_f, "gacha_f");

// src/calculate/cal_favor.ts
var import_koishi6 = require("koishi");

// src/sanae-code/favorability.ts
var expRequirement = {
  1: 15,
  2: 30,
  3: 30,
  4: 35,
  5: 35,
  6: 35,
  7: 40,
  8: 40,
  9: 40,
  10: 60,
  11: 90,
  12: 105,
  13: 120,
  14: 140,
  15: 160,
  16: 180,
  17: 205,
  18: 230,
  19: 255,
  20: 285,
  21: 315,
  22: 345,
  23: 375,
  24: 410,
  25: 445,
  26: 480,
  27: 520,
  28: 560,
  29: 600,
  30: 645,
  31: 690,
  32: 735,
  33: 780,
  34: 830,
  35: 880,
  36: 930,
  37: 985,
  38: 1040,
  39: 1095,
  40: 1155,
  41: 1215,
  42: 1275,
  43: 1335,
  44: 1400,
  45: 1465,
  46: 1530,
  47: 1600,
  48: 1670,
  49: 1740,
  50: 1815,
  51: 1890,
  52: 1965,
  53: 2040,
  54: 2120,
  55: 2200,
  56: 2280,
  57: 2365,
  58: 2450,
  59: 2535,
  60: 2625,
  61: 2715,
  62: 2805,
  63: 2895,
  64: 2990,
  65: 3085,
  66: 3180,
  67: 3280,
  68: 3380,
  69: 3480,
  70: 3585,
  71: 3690,
  72: 3795,
  73: 3900,
  74: 4010,
  75: 4120,
  76: 4230,
  77: 4345,
  78: 4460,
  79: 4575,
  80: 4695,
  81: 4815,
  82: 4935,
  83: 5055,
  84: 5180,
  85: 5305,
  86: 5430,
  87: 5560,
  88: 5690,
  89: 5820,
  90: 5955,
  91: 6090,
  92: 6225,
  93: 6360,
  94: 6500,
  95: 6640,
  96: 6780,
  97: 6925,
  98: 7070,
  99: 7215,
  100: 7365
};
var expSupply = {
  "  -摸头": 15,
  "  -课程表（满级期望值）": 31.25,
  "  -金色礼物（普通）": 20,
  "  -金色礼物（笑脸）": 40,
  "  -金色礼物（大笑脸）": 60,
  "  -紫色礼物（笑脸）": 120,
  "  -紫色礼物（大笑脸）": 180,
  "  -紫色礼物（爱心脸）": 240
};
function sumFavorablility(startLevel, endLevel) {
  let sum = 0;
  for (let key in expRequirement) {
    let level = parseInt(key, 10);
    if (level >= startLevel && level < endLevel) {
      sum += expRequirement[level];
    }
  }
  return [sum, startLevel, endLevel];
}
__name(sumFavorablility, "sumFavorablility");
function calculate_numer(startLevel, endLevel) {
  const exp = sumFavorablility(startLevel, endLevel);
  const keys = Object.keys(expSupply);
  const num = [exp[0], exp[1], exp[2]];
  for (let i = 0; i < keys.length; i++) {
    num.push(Math.ceil(exp[0] / expSupply[keys[i]]));
  }
  return num;
}
__name(calculate_numer, "calculate_numer");
function getFavorLv(input, session) {
  let startLevel = 1;
  let endLevel = 100;
  const levelRegex = /(\d+(?:\.\d+)?)/g;
  const levelMatch = input.match(levelRegex);
  if (levelMatch) {
    if (levelMatch.length == 1) {
      if (Number.isInteger(parseFloat(levelMatch[0]))) {
        if (parseInt(levelMatch[0]) >= 1) {
          if (parseInt(levelMatch[0]) <= 100) {
            endLevel = parseInt(levelMatch[0]);
          } else {
            return session.text(".lev>100");
          }
        } else {
          return session.text(".lev<1");
        }
      } else {
        return session.text(".lev==int");
      }
    } else {
      if (Number.isInteger(parseFloat(levelMatch[0]))) {
        if (parseInt(levelMatch[0]) >= 1) {
          if (parseInt(levelMatch[0]) <= 100) {
            startLevel = parseInt(levelMatch[0]);
          } else {
            return session.text(".lev>100");
          }
        } else {
          return session.text(".lev<1");
        }
      } else {
        return session.text(".lev==int");
      }
      if (Number.isInteger(parseFloat(levelMatch[1]))) {
        if (parseInt(levelMatch[1]) >= parseInt(levelMatch[0])) {
          if (parseInt(levelMatch[1]) <= 100) {
            endLevel = parseInt(levelMatch[1]);
          } else {
            return session.text(".lev>100");
          }
        } else {
          return session.text(".lev>lev");
        }
      } else {
        return session.text(".lev==int");
      }
    }
  } else {
    return session.text(".lev=null");
  }
  return [startLevel, endLevel];
}
__name(getFavorLv, "getFavorLv");

// src/calculate/cal_favor.ts
var log4 = "ba-plugin-favorable";
var logger5 = new import_koishi6.Logger(log4);
var random3 = new import_koishi6.Random(() => Math.random());
var plugin_ass = [
  "item_icon_favor_0",
  "item_icon_favor_1",
  "item_icon_favor_2",
  "item_icon_favor_3",
  "item_icon_favor_4",
  "item_icon_favor_5",
  "item_icon_favor_6",
  "item_icon_favor_7",
  "item_icon_favor_8",
  "item_icon_favor_9",
  "item_icon_favor_10",
  "item_icon_favor_11",
  "item_icon_favor_12",
  "item_icon_favor_13",
  "item_icon_favor_14",
  "item_icon_favor_15",
  "item_icon_favor_16",
  "item_icon_favor_17",
  "item_icon_favor_18",
  "item_icon_favor_19",
  "item_icon_favor_20",
  "item_icon_favor_21",
  "item_icon_favor_22",
  "item_icon_favor_23",
  "item_icon_favor_24",
  "item_icon_favor_25",
  "item_icon_favor_26",
  "item_icon_favor_27",
  "item_icon_favor_28",
  "item_icon_favor_29",
  "item_icon_favor_30",
  "item_icon_favor_31",
  "item_icon_favor_32",
  "item_icon_favor_33",
  "item_icon_favor_34",
  "item_icon_favor_lv2_0",
  "item_icon_favor_lv2_1",
  "item_icon_favor_lv2_2",
  "item_icon_favor_lv2_3",
  "item_icon_favor_lv2_4",
  "item_icon_favor_lv2_5",
  "item_icon_favor_lv2_6",
  "item_icon_favor_lv2_7",
  "item_icon_favor_lv2_8",
  "item_icon_favor_lv2_9",
  "item_icon_favor_lv2_10",
  "item_icon_favor_lv2_11",
  "item_icon_favor_lv2_12",
  "item_icon_favor_lv2_package",
  "item_icon_favor_ssr_2",
  "item_icon_favor_ssr_1",
  "1",
  "2",
  "3",
  "4",
  "arrow",
  "favologo",
  "level",
  "motou",
  "qhs",
  "rc",
  "pt",
  "au",
  "ag",
  "new_in",
  "z_ins",
  "z_tom",
  "z_hac",
  "z_ext",
  "z_veh",
  "z_har",
  "z_nor",
  "3sta_1",
  "3sta",
  "2sta_1",
  "2sta",
  "1sta",
  "meme_1",
  "meme_2",
  "meme_3",
  "meme_4",
  "meme_5",
  "meme_6",
  "meme_7",
  "meme_8",
  "meme_9",
  "meme_10",
  "meme_11",
  "meme_12",
  "meme_13",
  "meme_14",
  "meme_15",
  "null_img_1",
  "null_img_2",
  "null_img_3",
  "null_img_4",
  "null_img_5",
  "background",
  "print_2",
  "print_1",
  "print_0",
  "pickup",
  "tri_3",
  "tri_2"
];
async function cal_favorable(ctx3, config) {
  const fmp2 = new FMPS(ctx3);
  const root_img = await rootF("bap-img");
  const root_json = await rootF("bap-json");
  const drawm = config.plugin_config.draw_modle == "canvas" ? "" : "file://";
  async function local_update() {
    async function get_stu_favo() {
      let in_json_create_data = [];
      try {
        const dbdata = await ctx3.http.get("https://schaledb.com/data/cn/students.json");
        for (let i = 0; i < dbdata.length; i++) {
          in_json_create_data.push({
            "id": dbdata[i].Id,
            "name": dbdata[i].Name,
            "FavorItemTags": dbdata[i].FavorItemTags,
            "FavorItemUniqueTags": dbdata[i].FavorItemUniqueTags
          });
        }
        await fmp2.json_create(root_json, "favor_stu_tap.json", in_json_create_data);
      } catch (e) {
        logger5.info("出错惹呜呜" + e);
        return;
      }
    }
    __name(get_stu_favo, "get_stu_favo");
    async function cre_favor_list() {
      const gifts = await fmp2.json_parse(`${root_json}/liwu_list_rep.json`);
      const characters = await fmp2.json_parse(`${root_json}/favor_stu_tap.json`);
      let json = [];
      for (const character of characters) {
        const allFavorTags = [...character.FavorItemTags, ...character.FavorItemUniqueTags];
        const favorGifts = gifts.map((gift) => {
          const matchedTagsCount = gift.Tags.reduce((count, tag) => allFavorTags.includes(tag) ? count + 1 : count, 0);
          return { giftId: gift.Id, matchCount: matchedTagsCount, Rarity: gift.Rarity, Icon: gift.Icon };
        }).filter((gift) => gift.matchCount > 0).map((gift) => ({
          "preId": gift.giftId,
          "matchCount": gift.matchCount,
          "Rarity": gift.Rarity,
          "Icon": gift.Icon
        }));
        json.push({
          "stuid": character.id,
          "favorGifts": favorGifts
        });
      }
      await fmp2.json_create(root_json, "favora_data.json", json);
      logger5.info("✔️ 本地好感数据更新完毕");
    }
    __name(cre_favor_list, "cre_favor_list");
    await get_stu_favo();
    await cre_favor_list();
  }
  __name(local_update, "local_update");
  if (config.plugin_config.autoupd == "本地") {
    await local_update();
  }
  const url = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json/favora_data.json";
  let toarojson;
  let favorjson;
  async function init() {
    try {
      toarojson = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
      favorjson = await fmp2.json_parse(`${root_json}/favora_data.json`);
    } catch (e) {
      logger5.info("更新数据出错：" + e);
    }
  }
  __name(init, "init");
  await init();
  async function creat_img(num, stu) {
    let favorlist = [];
    let stuid;
    const sms_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
    if (stu) {
      stuid = sms_data.filter((i) => i.Id == stu)[0].Id_db;
      favorlist = favorjson.find((i) => i.stuid == stuid)?.favorGifts;
    }
    let x = 50, y = 50, wi = 1100, hei = 350, rad = 40, wi1 = 525, x1 = 620, ys = 0;
    const motou = await ctx3.canvas.loadImage(`${drawm}${root_img}/motou.png`);
    const favo_1 = await ctx3.canvas.loadImage(`${drawm}${root_img}/1.png`);
    const favo_2 = await ctx3.canvas.loadImage(`${drawm}${root_img}/2.png`);
    const favo_3 = await ctx3.canvas.loadImage(`${drawm}${root_img}/3.png`);
    const favo_4 = await ctx3.canvas.loadImage(`${drawm}${root_img}/4.png`);
    const richen = await ctx3.canvas.loadImage(`${drawm}${root_img}/rc.png`);
    const kokoro = await ctx3.canvas.loadImage(`${drawm}${root_img}/favologo.png`);
    const arrow = await ctx3.canvas.loadImage(`${drawm}${root_img}/arrow.png`);
    async function draw_stuicon(stu2) {
      ys = 400;
      const stuiconimg = await ctx3.canvas.loadImage(`${drawm}${root_img}/${stuid}.png`);
      c.save();
      c.beginPath();
      c.arc(350, 200, 125, 0, Math.PI * 2);
      c.fillStyle = "#000000";
      c.clip();
      c.drawImage(stuiconimg, 220, 70, 260, 260 * 1.13);
      c.restore();
      c.font = `bold 100px  Arial`;
      c.fillStyle = "#000000";
      const stuname = sms_data.filter((i) => i.Id_db == stuid)[0].MapName;
      c.fillText(stuname, 550, 225);
    }
    __name(draw_stuicon, "draw_stuicon");
    function draw_rectangles(c2, x2, y2, width, height2, radius, color) {
      c2.beginPath();
      c2.moveTo(x2 + radius, y2);
      c2.arcTo(x2 + width, y2, x2 + width, y2 + height2, radius);
      c2.arcTo(x2 + width, y2 + height2, x2, y2 + height2, radius);
      c2.arcTo(x2, y2 + height2, x2, y2, radius);
      c2.arcTo(x2, y2, x2 + width, y2, radius);
      c2.closePath();
      c2.shadowColor = "rgba(0,0,0,0.3)";
      c2.shadowBlur = 30;
      c2.shadowOffsetX = 2;
      c2.shadowOffsetY = 2;
      c2.fillStyle = color;
      c2.fill();
      c2.restore();
    }
    __name(draw_rectangles, "draw_rectangles");
    function draw_txt(number, x2, y2, unit) {
      let units;
      unit ? units = "次" : units = "个";
      c.save();
      c.fillStyle = "#000000";
      c.shadowColor = "rgba(0,0,0,0.4)";
      c.shadowBlur = 30;
      c.shadowOffsetX = 2;
      c.shadowOffsetY = 2;
      c.font = `bold 100px  Arial`;
      const text = number.toString() + units;
      c.fillText(text, x2 + 115, y2 + 150);
      c.font = `bold 60px  Arial`;
      c.restore();
    }
    __name(draw_txt, "draw_txt");
    function draw_box(favorlist2) {
      if (favorlist2.length == 0) {
        if (stu) {
          ys = 0;
          draw_rectangles(c, x, y + ys, wi, hei + 250, rad, "#FFDDF1");
          ys = 250;
          draw_rectangles(c, x, 450 + ys, wi1, hei, rad, "#FFCEF5");
          draw_rectangles(c, x1, 450 + ys, wi1, hei, rad, "#FFCEF5");
          draw_rectangles(c, x, 850 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x1, 850 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x, 1250 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x1, 1250 + ys, wi1, hei, rad, "#E3CDFF");
          draw_rectangles(c, x, 1650 + ys, wi1, hei, rad, "#E3CDFF");
          draw_rectangles(c, x1, 1650 + ys, wi1, hei, rad, "#E3CDFF");
        } else {
          draw_rectangles(c, x, y + ys, wi, hei, rad, "#FFDDF1");
          draw_rectangles(c, x, 450 + ys, wi1, hei, rad, "#FFCEF5");
          draw_rectangles(c, x1, 450 + ys, wi1, hei, rad, "#FFCEF5");
          draw_rectangles(c, x, 850 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x1, 850 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x, 1250 + ys, wi1, hei, rad, "#FFEFC0");
          draw_rectangles(c, x1, 1250 + ys, wi1, hei, rad, "#E3CDFF");
          draw_rectangles(c, x, 1650 + ys, wi1, hei, rad, "#E3CDFF");
          draw_rectangles(c, x1, 1650 + ys, wi1, hei, rad, "#E3CDFF");
        }
      } else {
        let y2 = 700, x2 = 50;
        draw_rectangles(c, x2, 50, wi, hei + 250, rad, "#FFDDF1");
        draw_rectangles(c, x2, 300 + ys, wi1, hei, rad, "#FFCEF5");
        draw_rectangles(c, x1, 300 + ys, wi1, hei, rad, "#FFCEF5");
        draw_rectangles(c, x2, y2 + ys, wi1, hei, rad, "#FFEFC0");
        draw_rectangles(c, x1, y2 + ys, wi1, hei, rad, "#E3CDFF");
        y2 += 400;
        for (let i = 0; i < favorlist2.length; i++) {
          if (favorlist2[i].Rarity == "SR") {
            draw_rectangles(c, x2, y2 + ys, wi1, hei, rad, "#FFEFC0");
          } else {
            draw_rectangles(c, x2, y2 + ys, wi1, hei, rad, "#E3CDFF");
          }
          i % 2 == 0 ? x2 = 620 : x2 = 50;
          i % 2 != 0 ? y2 += 400 : "";
        }
      }
    }
    __name(draw_box, "draw_box");
    async function draw_text(favorlist2) {
      if (favorlist2.length == 0) {
        let ysss = 0;
        if (stu) {
          ys -= 150;
          ysss = 250;
        }
        c.fillText(`摸头`, x + 70, 550 + ys);
        c.drawImage(motou, x + 10, 615 + ysss, 110, 110);
        draw_txt(num[3], x, 550 + ys, true);
        c.fillText(`课程表(满级期望值)`, x1 + 20, 550 + ys);
        c.drawImage(richen, x1 + 30, 615 + ysss, 55, 110);
        draw_txt(num[4], x1, 550 + ys, true);
        c.fillText("金色礼物(普通)", x + 50, 950 + ys);
        c.drawImage(favo_1, x + 10, 1015 + ysss, 100, 100);
        draw_txt(num[5], x, 950 + ys, false);
        c.fillText("金色礼物(笑脸)", x1 + 50, 950 + ys);
        c.drawImage(favo_2, x1 + 10, 1015 + ysss, 100, 100);
        draw_txt(num[6], x1, 950 + ys, false);
        c.fillText("金色礼物(大笑脸)", x + 50, 1350 + ys);
        c.drawImage(favo_3, x + 10, 1415 + ysss, 100, 100);
        draw_txt(num[7], x, 1350 + ys, false);
        c.fillText("紫色礼物(笑脸)", x1 + 50, 1350 + ys);
        c.drawImage(favo_2, x1 + 10, 1415 + ysss, 100, 100);
        draw_txt(num[8], x1, 1350 + ys, false);
        c.fillText("紫色礼物(大笑脸)", x + 50, 1750 + ys);
        c.drawImage(favo_3, x + 10, 1815 + ysss, 100, 100);
        draw_txt(num[9], x, 1750 + ys, false);
        c.fillText("紫色礼物(爱心脸)", x1 + 50, 1750 + ys);
        c.drawImage(favo_4, x1 + 10, 1815 + ysss, 100, 100);
        draw_txt(num[10], x1, 1750 + ys, false);
      } else {
        let y2 = 800;
        c.fillText(`摸头`, x + 70, y2);
        c.drawImage(motou, x + 10, y2 + 65, 110, 110);
        draw_txt(num[3], x, y2, true);
        c.fillText(`课程表(满级期望值)`, x1 + 20, y2);
        c.drawImage(richen, x1 + 30, y2 + 65, 55, 110);
        draw_txt(num[4], x1, y2, true);
        y2 += 400;
        c.fillText("金色礼物(普通)", x + 50, y2);
        c.drawImage(favo_1, x + 10, y2 + 65, 100, 100);
        draw_txt(num[5], x, y2, false);
        c.fillText("紫色礼物(笑脸)", x1 + 50, y2);
        c.drawImage(favo_2, x1 + 10, y2 + 65, 100, 100);
        draw_txt(num[8], x1, y2, false);
        y2 += 400;
        for (let i = 0; i < favorlist2.length; i++) {
          const presents = ctx3.canvas.loadImage(`${drawm}${root_img}/${favorlist2[i].Icon}.png`);
          c.drawImage(await presents, x - 20, y2 - 80, 255, 220);
          if (favorlist2[i].matchCount == 1) {
            if (favorlist2[i].Rarity == "SR") {
              draw_txt("x" + num[6], x + 20, y2 + 40, false);
            } else {
              draw_txt("x" + num[9], x + 20, y2 + 40, false);
            }
          } else {
            if (favorlist2[i].Rarity == "SR") {
              draw_txt("x" + num[7], x + 20, y2 + 40, false);
            } else {
              draw_txt("x" + num[10], x + 20, y2 + 40, false);
            }
          }
          i % 2 == 0 ? x = 620 : x = 50;
          i % 2 != 0 ? y2 += 400 : "";
        }
      }
    }
    __name(draw_text, "draw_text");
    let height;
    if (stu) {
      height = Math.round(favorlist.length / 2) * 400;
      height += 1550;
      if (favorlist.length == 0) {
        height = 2350;
      }
    } else {
      height = 2100;
    }
    const canvas = await ctx3.canvas.createCanvas(1200, height);
    const c = canvas.getContext("2d");
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, 1200, height);
    c.fillStyle = "#000000";
    let yss;
    stu ? yss = 250 : yss = 0;
    stu ? ys = 400 : yss = 0;
    draw_box(favorlist);
    c.drawImage(kokoro, 250, 90 + yss, 200, 160);
    c.drawImage(arrow, 550, 110 + yss, 110, 110);
    c.drawImage(kokoro, 750, 90 + yss, 200, 160);
    stu ? await draw_stuicon(stu) : "";
    c.fillStyle = "#000000";
    c.font = `bold 86px Arial`;
    let x_kkr1, x_kkr2;
    num[1] < 10 ? x_kkr1 = 325 : x_kkr1 = 300;
    num[2] == 100 ? x_kkr2 = 775 : x_kkr2 = 800;
    c.fillText(num[1], x_kkr1, 195 + yss);
    c.fillText(num[2], x_kkr2, 195 + yss);
    c.font = `bold 56px Arial`;
    c.fillText(`总经验:${num[0]},需满足以下任意一点`, x + 100, y + 300 + yss);
    c.font = `bold 30px Arial`;
    c.fillText(`数据来源：https://schaledb.com/                      https://ba.gamekee.com`, 50, height - 20);
    c.font = `bold 55px Arial`;
    await draw_text(favorlist);
    const img = canvas.toDataURL("image/png");
    return img;
  }
  __name(creat_img, "creat_img");
  const help_text = "好感度需求计算器\n标准输入: \n🟢1.从当前好感度计算：输入当前好感度和目标好感度\n🟢2.从1级好感度计算：只输入目标好感度\n🟢3.计算某一角色所需礼物：输入目标好感度和角色名称\n使用示例：\n好感 10-50 爱丽丝\n";
  logger5.info("🟢 好感计算器加载完毕");
  ctx3.i18n.define("zh-CN", require_zh_CN());
  ctx3.command("好感计算 <arg1> <arg2>", "好感度需求计算器").alias("好感").action(async ({ session }, arg1, arg2) => {
    if (!arg1) {
      return help_text;
    } else if (!arg2) {
      try {
        let favor_lev = getFavorLv(arg1, session);
        let faovr;
        if (typeof favor_lev === "string") {
          return favor_lev + "\n" + help_text;
        } else {
          faovr = calculate_numer(favor_lev[0], favor_lev[1]);
        }
        const img = await creat_img(faovr);
        return import_koishi6.h.image(img);
      } catch (e) {
        logger5.info("出现错误-1:" + e);
        return session.text(".error");
      }
    } else {
      try {
        let innum;
        if (/^\d+$/.test(arg2[0])) {
          innum = arg1 + "-" + arg2[0];
          let favor_lev = getFavorLv(innum, session);
          let faovr;
          if (typeof favor_lev === "string") {
            return favor_lev + "\n" + help_text;
          } else {
            faovr = calculate_numer(favor_lev[0], favor_lev[1]);
          }
          const img = await creat_img(faovr);
          return import_koishi6.h.image(img);
        } else {
          let favor_lev = getFavorLv(arg1, session);
          let faovr;
          if (typeof favor_lev === "string") {
            return favor_lev + "\n" + help_text;
          } else {
            faovr = calculate_numer(favor_lev[0], favor_lev[1]);
          }
          const stus = (await StudentMatch(arg2))[1];
          let stus_in;
          stus ? stus_in = stus : stus_in = null;
          stus ? "" : console.log("未匹配到内容");
          const img = await creat_img(faovr, stus_in);
          return import_koishi6.h.image(img);
        }
      } catch (e) {
        logger5.info(e);
        return session.text(".error");
      }
    }
  });
}
__name(cal_favorable, "cal_favorable");

// src/get-active/get_active.ts
var import_koishi7 = require("koishi");
var import_url2 = require("url");
var import_path2 = require("path");
var log5 = "ba-plugin-get-active";
var logger6 = new import_koishi7.Logger(log5);
var random4 = new import_koishi7.Random(() => Math.random());
async function active_get(ctx3, config) {
  const root_act = await rootF("bap-active");
  const root_img = await rootF("bap-img");
  const fmp2 = new FMPS(ctx3);
  const mdid = config.qqconfig.markdown_setting.table.length == 1 ? config.qqconfig.markdown_setting.table[0]["MD模板id"] : config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[1]["MD模板id"];
  const mdkey1 = config.qqconfig.markdown_setting.table.length == 1 ? config.qqconfig.markdown_setting.table[0]["MD模板参数1"] : config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[1]["MD模板参数1"];
  const mdkey2 = config.qqconfig.markdown_setting.table.length == 1 ? config.qqconfig.markdown_setting.table[0]["MD模板参数2"] : config.qqconfig.markdown_setting.table.length == 0 ? null : config.qqconfig.markdown_setting.table[1]["MD模板参数2"];
  const drawm = config.plugin_config.draw_modle == "canvas" ? "" : "file://";
  var mdswitch = false;
  if (mdid && mdkey1 && mdid) {
    logger6.info("🟢 总力获取功能已启用MD消息模板");
    mdswitch = true;
  } else {
    logger6.info("⚠️ md相关设置未完善,未启用MD模板");
    mdswitch = false;
  }
  function markdown(session) {
    let t2;
    mdkey2 ? t2 = {
      key: mdkey2,
      values: ["点击按钮直接查询哦"]
    } : "";
    return {
      msg_type: 2,
      msg_id: session.messageId,
      markdown: {
        custom_template_id: mdid,
        params: [
          {
            key: mdkey1,
            values: ["总力战和大决战档线查询，支持日服、国服官服、国服B服"]
          },
          t2
        ]
      },
      keyboard: {
        content: {
          rows: [
            {
              buttons: [
                {
                  render_data: { label: "国服官服", style: 2 },
                  action: {
                    type: 2,
                    // 指令按钮
                    permission: { type: 2 },
                    data: `/总力档线 官服`,
                    enter: true
                  }
                },
                {
                  render_data: { label: "国服B服", style: 2 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/总力档线 B服`,
                    enter: true
                  }
                }
              ]
            },
            {
              buttons: [
                {
                  render_data: { label: "日服总力", style: 2 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/总力档线 日服`,
                    enter: true
                  }
                },
                {
                  render_data: { label: "日服大决战", style: 2 },
                  action: {
                    type: 2,
                    permission: { type: 2 },
                    data: `/大决战档线`,
                    enter: true
                  }
                }
              ]
            }
          ]
        }
      }
    };
  }
  __name(markdown, "markdown");
  async function 大决战获取() {
    for (let i = 1; i <= 5; i++) {
      try {
        const page = await ctx3.puppeteer.page();
        await page.goto("https://arona.ai/egraph");
        await page.waitForSelector(".MuiBox-root.css-tucewo");
        await page.waitForSelector(".MuiBox-root.css-1tu59u4");
        await page.waitForSelector(".MuiBox-root.css-14syrz5");
        const delay = /* @__PURE__ */ __name((ms) => new Promise((resolve3) => setTimeout(resolve3, ms)), "delay");
        await delay(5e3);
        const web_time = await page.$(".MuiBox-root.css-1tu59u4");
        const grade_line = await page.$(".MuiBox-root.css-tucewo");
        const imageUrls = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll(".MuiBox-root.css-14syrz5 img"));
          return images.map((img) => img.getAttribute("src"));
        });
        const w_time = (await page.evaluate((el) => el.innerText, web_time)).split(" ");
        const g_line = (await page.evaluate((el) => el.innerText, grade_line)).split("\n");
        if (g_line && !g_line.includes("— 0 /Hr")) {
          return {
            time: w_time[2] + w_time[3] + w_time[4] + w_time[6],
            urls: imageUrls,
            hard_1: [g_line[1], g_line[2]],
            hard_2: [g_line[4], g_line[5]],
            hard_3: [g_line[7], g_line[8]]
          };
        }
        await page.close();
      } catch (e) {
        if (i == 5) {
          logger6.error("尝试" + i + "次后依旧出错" + e);
          break;
        }
        logger6.error("出现错误,第" + i + "次重试" + e);
      }
    }
  }
  __name(大决战获取, "大决战获取");
  async function zongli_get_jp() {
    for (let i = 1; i <= 5; i++) {
      try {
        const page = await ctx3.puppeteer.page();
        await page.goto("https://arona.ai/graph");
        await page.waitForSelector(".MuiBox-root.css-tucewo");
        await page.waitForSelector(".MuiBox-root.css-1f11ikm");
        await page.waitForSelector(".MuiBox-root.css-1tu59u4");
        const delay = /* @__PURE__ */ __name((ms) => new Promise((resolve3) => setTimeout(resolve3, ms)), "delay");
        await delay(5e3);
        const grade_line = await page.$(".MuiBox-root.css-tucewo");
        const grade_people = await page.$(".MuiBox-root.css-1f11ikm");
        const web_time = await page.$(".MuiBox-root.css-1tu59u4");
        const pei_time = await page.$(".MuiBox-root.css-1m93l24");
        const g_line = (await page.evaluate((el) => el.innerText, grade_line)).split("\n");
        const g_people = (await page.evaluate((el) => el.innerText, grade_people)).split("\n");
        const w_time = (await page.evaluate((el) => el.innerText, web_time)).split(" ");
        const p_time = await page.evaluate((el) => el.innerText, pei_time);
        if (g_line && !g_line.includes("— 0 /Hr")) {
          return {
            time: w_time[2] + w_time[3] + w_time[4] + w_time[6],
            p_time,
            hard_1: [g_line[1], g_line[2]],
            hard_2: [g_line[4], g_line[5]],
            hard_3: [g_line[7], g_line[8]],
            tm: [g_people[19], g_people[20]],
            ins: [g_people[16], g_people[17]],
            ex: [g_people[13], g_people[14]],
            hc: [g_people[10], g_people[11]],
            vh: [g_people[7], g_people[8]],
            hd: [g_people[4], g_people[5]]
          };
        }
        await page.close();
      } catch (e) {
        if (i == 5) {
          logger6.error("尝试" + i + "次后依旧出错" + e);
          break;
        }
        logger6.error("出现错误,第" + i + "次重试" + e);
      }
    }
  }
  __name(zongli_get_jp, "zongli_get_jp");
  async function zongli_get_cn(type) {
    function Timestamp(Timestamp2) {
      let now = new Date(Timestamp2), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
      return [y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d), now.toTimeString()];
    }
    __name(Timestamp, "Timestamp");
    const url_list = "https://api.arona.icu/api/season/list";
    const url_rank = "https://api.arona.icu/api/v2/rank/new/charts";
    const url_top = "https://api.arona.icu/api/v2/rank/list_top";
    const url_problem = "https://api.arona.icu/api/v2/rank/list_by_last_rank";
    const head_cfg = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "ba-token uuz:uuz"
      }
    };
    try {
      const icu_list = await ctx3.http.post(url_list, { "server": type }, head_cfg);
      let season = icu_list.data.length - 1;
      let list_top = await ctx3.http.post(url_top, {
        "server": type,
        "season": season
      }, head_cfg);
      if (list_top.code == 400) {
        season--;
        list_top = await ctx3.http.post(url_top, {
          "server": type,
          "season": season
        }, head_cfg);
      }
      const data = {
        "server": type,
        "season": season
      };
      const response = await ctx3.http.post(url_rank, data, head_cfg);
      const porblem = await ctx3.http.post(url_problem, {
        "server": type,
        "season": season,
        "dataType": 0,
        "tryNumber": 0
      }, head_cfg);
      const tp1 = !list_top.data[0] ? null : list_top.data[0];
      const tp2 = !list_top.data[1] ? null : list_top.data[1];
      const tp3 = !list_top.data[2] ? null : list_top.data[2];
      let li10k;
      if (type == 1) {
        if (response.data.data.hasOwnProperty("120000")) {
          li10k = response.data.data["10000"][response.data.data["10000"].length - 1];
        } else {
          li10k = null;
        }
      } else {
        if (response.data.data.hasOwnProperty("96000")) {
          li10k = response.data.data["10000"][response.data.data["10000"].length - 1];
        } else {
          li10k = null;
        }
      }
      let li15_20k;
      if (type == 1) {
        if (response.data.data.hasOwnProperty("15000")) {
          li15_20k = response.data.data["15000"][response.data.data["15000"].length - 1];
        } else {
          li15_20k = null;
        }
      } else {
        if (response.data.data.hasOwnProperty("20000")) {
          li15_20k = response.data.data["20000"][response.data.data["20000"].length - 1];
        } else {
          li15_20k = null;
        }
      }
      let li20_30k;
      if (type == 1) {
        if (response.data.data.hasOwnProperty("20000")) {
          li20_30k = response.data.data["20000"][response.data.data["20000"].length - 1];
        } else {
          li20_30k = null;
        }
      } else {
        if (response.data.data.hasOwnProperty("20000")) {
          li20_30k = response.data.data["30000"][response.data.data["30000"].length - 1];
        } else {
          li20_30k = null;
        }
      }
      let li50_48k;
      if (type == 1) {
        if (response.data.data.hasOwnProperty("50000")) {
          li50_48k = response.data.data["50000"][response.data.data["50000"].length - 1];
        } else {
          li50_48k = null;
        }
      } else {
        if (response.data.data.hasOwnProperty("48000")) {
          li50_48k = response.data.data["48000"][response.data.data["48000"].length - 1];
        } else {
          li50_48k = null;
        }
      }
      let li120_96k;
      if (type == 1) {
        if (response.data.data.hasOwnProperty("120000")) {
          li120_96k = response.data.data["120000"][response.data.data["120000"].length - 1];
        } else {
          li120_96k = null;
        }
      } else {
        if (response.data.data.hasOwnProperty("96000")) {
          li120_96k = response.data.data["96000"][response.data.data["96000"].length - 1];
        } else {
          li120_96k = null;
        }
      }
      return {
        time: Timestamp(response.data.time[response.data.time.length - 1]),
        boss: icu_list.data[0],
        hard_1: !porblem.data[0] ? null : porblem.data[0],
        hard_2: !porblem.data[1] ? null : porblem.data[1],
        hard_3: !porblem.data[2] ? null : porblem.data[2],
        top_1: tp1,
        top_2: tp2,
        top_3: tp3,
        li1: response.data.data["1"][response.data.data["1"].length - 1],
        li1k: response.data.data["1000"][response.data.data["1000"].length - 1],
        li3k: response.data.data["3000"][response.data.data["3000"].length - 1],
        li5k: response.data.data["5000"][response.data.data["5000"].length - 1],
        li8k: response.data.data["8000"][response.data.data["8000"].length - 1],
        li10k,
        li15_20k,
        li20_30k,
        li50_48k,
        li120_96k
      };
    } catch (error2) {
      logger6.error(error2);
    }
  }
  __name(zongli_get_cn, "zongli_get_cn");
  async function h_img(hard) {
    let img;
    switch (hard) {
      case "TM":
      case "Torment":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_tom.png`);
        break;
      case "INS":
      case "Insane":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_ins.png`);
        break;
      case "EX":
      case "Extreme":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_ext.png`);
        break;
      case "HC":
      case "HardCore":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_hac.png`);
        break;
      case "VH":
      case "VeryHard":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_veh.png`);
        break;
      case "H":
      case "Hard":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_har.png`);
        break;
      case "N":
      case "Normal":
        img = await ctx3.canvas.loadImage(`${drawm}${root_img}/z_nor.png`);
        break;
    }
    return img;
  }
  __name(h_img, "h_img");
  async function draw_list_jp(data) {
    let height;
    height = 540;
    const canvas = await ctx3.canvas.createCanvas(700, height);
    const c = canvas.getContext("2d");
    const pt = await ctx3.canvas.loadImage(`${drawm}${root_img}/pt.png`);
    const au = await ctx3.canvas.loadImage(`${drawm}${root_img}/au.png`);
    const ag = await ctx3.canvas.loadImage(`${drawm}${root_img}/ag.png`);
    async function mod_1() {
      let x = 20, rad = 20, y = 10, wid = 660, hei = 220;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#CFDCFF";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.fillText("日服总力各档线分数", 225, 50);
      c.drawImage(pt, 50, 60);
      c.fillText(data.hard_1[0], 30, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_1[1], 50, 200);
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.drawImage(au, 300, 60);
      c.fillText(data.hard_2[0], 270, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_2[1], 280, 200);
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.drawImage(ag, 550, 60);
      c.fillText(data.hard_3[0], 530, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_3[1], 540, 200);
    }
    __name(mod_1, "mod_1");
    async function mod_2() {
      let x = 20, rad = 20, y = 250, wid = 660, hei = 240;
      const color1 = "#004085";
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#E0F0FF";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 25px Arial`;
      c.fillText("日服总力各难度人数及占比", 210, 280);
      const h1 = await h_img("TM");
      c.drawImage(h1, 25, 290, 150, 60);
      c.fillText(data.tm[0], 50, 360);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.tm[1], 50, 380);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
      const h22 = await h_img("INS");
      c.drawImage(h22, 275, 290, 150, 60);
      c.fillText(data.ins[0], 310, 360);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.ins[1], 310, 380);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
      const h32 = await h_img("EX");
      c.drawImage(h32, 525, 290, 150, 60);
      c.fillText(data.ex[0], 550, 360);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.ex[1], 550, 380);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
      const h42 = await h_img("HC");
      c.drawImage(h42, 25, 380, 150, 60);
      c.fillText(data.hc[0], 50, 450);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.hc[1], 50, 470);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
      const h52 = await h_img("VH");
      c.drawImage(h52, 275, 380, 150, 60);
      c.fillText(data.vh[0], 310, 450);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.vh[1], 310, 470);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
      const h6 = await h_img("H");
      c.drawImage(h6, 525, 380, 150, 60);
      c.fillText(data.hd[0], 550, 450);
      c.font = `bold 20px Arial`;
      c.fillStyle = color1;
      c.fillText(data.hd[1], 550, 470);
      c.font = `bold 25px Arial`;
      c.fillStyle = "#000000";
    }
    __name(mod_2, "mod_2");
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, 700, height);
    c.fillStyle = "#000000";
    c.font = `bold 20px Arial`;
    c.fillText("数据来源:https://arona.ai", 20, 520);
    c.fillText("更新时间：" + data.time, 300, 520);
    await mod_1();
    await mod_2();
    c.beginPath();
    c.stroke();
    const img = await canvas.toBuffer("image/png");
    fmp2.img_save(img, root_act, "list_jp.png");
    return root_act + "/list_jp.png";
  }
  __name(draw_list_jp, "draw_list_jp");
  async function draw_list(data, type) {
    let height;
    height = 900;
    const canvas = await ctx3.canvas.createCanvas(700, height);
    const c = canvas.getContext("2d");
    const pt = await ctx3.canvas.loadImage(`${drawm}${root_img}/pt.png`);
    const au = await ctx3.canvas.loadImage(`${drawm}${root_img}/au.png`);
    const ag = await ctx3.canvas.loadImage(`${drawm}${root_img}/ag.png`);
    async function mod_1() {
      let x = 20, rad = 20, y = 10, wid = 660, hei = 250;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#CFDCFF";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 30px Arial`;
      c.fillText("各档线分数", 275, 50);
      if (data.top_1 == null) {
        c.drawImage(pt, 50, 60);
        c.fillText("暂无信息", 30, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText("暂无信息", 45, 200);
      } else {
        c.drawImage(pt, 50, 60);
        c.fillText(data.top_1.bestRankingPoint, 30, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText(data.top_1.battleTime, 45, 200);
        const h1 = await h_img(data.top_1.hard);
        c.drawImage(h1, 25, 195, 150, 60);
      }
      if (data.top_2 == null) {
        c.drawImage(au, 300, 60);
        c.fillText("暂无信息", 290, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText("暂无信息", 295, 200);
      } else {
        c.fillStyle = "#000000";
        c.font = `bold 30px Arial`;
        c.drawImage(au, 300, 60);
        c.fillText(data.top_2.bestRankingPoint, 290, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText(data.top_2.battleTime, 295, 200);
        const h22 = await h_img(data.top_2.hard);
        c.drawImage(h22, 275, 195, 150, 60);
        c.fillStyle = "#000000";
        c.font = `bold 30px Arial`;
      }
      if (data.top_3 == null) {
        c.drawImage(ag, 550, 60);
        c.fillText("暂无信息", 550, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText("暂无信息", 545, 200);
      } else {
        c.drawImage(ag, 550, 60);
        c.fillText(data.top_3.bestRankingPoint, 550, 170);
        c.fillStyle = "#00687D";
        c.font = `bold 25px Arial`;
        c.fillText(data.top_3.battleTime, 545, 200);
        const h32 = await h_img(data.top_3.hard);
        c.drawImage(h32, 525, 195, 150, 60);
      }
    }
    __name(mod_1, "mod_1");
    async function mod_2() {
      let x = 20, rad = 20, y = 270, wid = 660, hei = 140;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#E0F0FF";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 25px Arial`;
      c.fillText("各难度最低排名", 270, 305);
      if (!data.hard_1) {
        c.fillText("暂无数据呜", 60, 380);
      } else {
        const h1 = await h_img(data.hard_1.hard);
        c.drawImage(h1, 25, 310, 150, 60);
        c.fillText(data.hard_1.rank, 60, 380);
      }
      if (!data.hard_2) {
        c.fillText("暂无数据呜", 310, 380);
      } else {
        const h22 = await h_img(data.hard_2.hard);
        c.drawImage(h22, 275, 310, 150, 60);
        c.fillText(data.hard_2.rank, 310, 380);
      }
      if (!data.hard_3) {
        c.fillText("暂无数据呜", 540, 380);
      } else {
        const h32 = await h_img(data.hard_3.hard);
        c.drawImage(h32, 525, 310, 150, 60);
        c.fillText(data.hard_3.rank, 560, 380);
      }
    }
    __name(mod_2, "mod_2");
    async function mod_3(type2) {
      let x = 20, rad = 20, y = 420, wid = 360, hei = 430;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#FFDFFC";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 25px Arial`;
      c.fillText("第1:", 60, 460);
      c.fillText("第1000:", 60, 500);
      c.fillText("第3000:", 60, 540);
      c.fillText("第5000:", 60, 580);
      c.fillText("第8000:", 60, 620);
      c.fillText("第10000:", 60, 660);
      c.fillText(type2 == 1 ? "第15000:" : "第20000:", 60, 700);
      c.fillText(type2 == 1 ? "第20000:" : "第30000:", 60, 740);
      c.fillText(type2 == 1 ? "第50000:" : "第48000:", 60, 780);
      c.fillText(type2 == 1 ? "第120000:" : "第96000:", 60, 820);
      c.fillStyle = "#36007D";
      c.font = `bold 25px Arial`;
      c.fillText(data.li1, 220, 460);
      c.fillText(data.li1k, 220, 500);
      c.fillText(data.li3k, 220, 540);
      c.fillText(data.li5k, 220, 580);
      if (type2 == 2) {
        c.fillStyle = "#665B00";
        c.font = `bold 25px Arial`;
      }
      c.fillText(data.li8k, 220, 620);
      if (!data.li10k) {
        c.fillText("暂无数据呜", 220, 660);
      } else {
        c.fillText(data.li10k, 220, 660);
      }
      if (!data.li15_20k) {
        c.fillText("暂无数据呜", 220, 700);
      } else {
        c.fillText(data.li15_20k, 220, 700);
      }
      c.fillStyle = "#665B00";
      c.font = `bold 25px Arial`;
      if (!data.li20_30k) {
        c.fillText("暂无数据咪", 220, 740);
      } else {
        c.fillText(data.li20_30k, 220, 740);
      }
      if (type2 == 2) {
        c.fillStyle = "#4A4A4A";
        c.font = `bold 25px Arial`;
      }
      if (!data.li50_48k) {
        c.fillText("暂无数据喵", 220, 780);
      } else {
        c.fillText(data.li50_48k, 220, 780);
      }
      c.fillStyle = "#4A4A4A";
      c.font = `bold 25px Arial`;
      if (!data.li120_96k) {
        c.fillText("暂无数据咪", 220, 820);
      } else {
        c.fillText(data.li120_96k, 220, 820);
      }
      c.fillStyle = "#000000";
      c.font = `bold 25px Arial`;
      c.fillText("数据来源：什亭之匣 https://arona.icu", 20, 880);
    }
    __name(mod_3, "mod_3");
    async function mod_4() {
      let x = 390, rad = 20, y = 420, wid = 290, hei = 265;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#FFE6E6";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 20px Arial`;
      c.fillText("更新时间：", 400, 455);
      c.font = `bold 23px Arial`;
      c.fillStyle = "#002E6B";
      c.fillText(data.time[0], 400, 480);
      const timeWithoutTimeZone = data.time[1].replace(/ \([^)]+\)/, "");
      const timeMatch = data.time[1].match(/ \(([^)]+)\)/);
      const timeZone = timeMatch ? timeMatch[1] : "未匹配到时区";
      c.fillText(timeWithoutTimeZone, 400, 510);
      c.fillText(timeZone, 400, 530);
      c.fillStyle = "#000000";
      c.font = `bold 20px Arial`;
      const serv = type == 1 ? "官服" : "B服";
      c.fillStyle = "#5C0C0C";
      c.fillText(serv + "当前总力：", 400, 560);
      c.fillStyle = "#000000";
      c.fillText("第" + data.boss.season + "期", 400, 585);
      c.fillText(data.boss.map.value, 400, 610);
      c.fillText(data.boss.boss, 450, 610);
      c.fillText("开始：" + data.boss.startTime, 400, 645);
      c.fillText("结束：" + data.boss.endTime, 400, 670);
    }
    __name(mod_4, "mod_4");
    async function mod_5() {
      const i = random4.int(1, 15);
      const image = await ctx3.canvas.loadImage(`${drawm}${root_img}/meme_${i}.png`);
      console.log(image);
      let newWidth, newHeight, maxWidth = 180, maxHeight = 180;
      let wids = config.plugin_config.draw_modle == "canvas" ? "width" : "naturalWidth";
      let heis = config.plugin_config.draw_modle == "canvas" ? "height" : "naturalHeight";
      const originalWidth = image[wids];
      const originalHeight = image[heis];
      const widthRatio = maxWidth / originalWidth;
      const heightRatio = maxHeight / originalHeight;
      const scale = Math.min(widthRatio, heightRatio, 1);
      newWidth = originalWidth * scale;
      newHeight = originalHeight * scale;
      let x = 460, rad = 20, y = 700, wid = newWidth, hei = newHeight;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.clip();
      c.drawImage(image, 460, 700, newWidth, newHeight);
      c.stroke();
      c.closePath();
    }
    __name(mod_5, "mod_5");
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, 700, height);
    c.fillStyle = "#000000";
    c.font = `bold 30px Arial`;
    await mod_1();
    await mod_2();
    await mod_3(type);
    await mod_4();
    await mod_5();
    c.beginPath();
    c.stroke();
    const img = await canvas.toBuffer("image/png");
    fmp2.img_save(img, root_act, "list_cn_" + type + ".png");
    return root_act + "/list_cn_" + type + ".png";
  }
  __name(draw_list, "draw_list");
  async function draw_dajuezhan(data) {
    let height;
    height = 320;
    const canvas = await ctx3.canvas.createCanvas(700, height);
    const c = canvas.getContext("2d");
    const pt = await ctx3.canvas.loadImage(`${drawm}${root_img}/pt.png`);
    const au = await ctx3.canvas.loadImage(`${drawm}${root_img}/au.png`);
    const ag = await ctx3.canvas.loadImage(`${drawm}${root_img}/ag.png`);
    async function mod_1() {
      let x = 10, rad = 20, y = 10, wid = 680, hei = 220;
      c.beginPath();
      c.moveTo(x + rad, y);
      c.arcTo(x + wid, y, x + wid, y + hei, rad);
      c.arcTo(x + wid, y + hei, x, y + hei, rad);
      c.arcTo(x, y + hei, x, y, rad);
      c.arcTo(x, y, x + wid, y, rad);
      c.closePath();
      c.fillStyle = "#AAE6D1";
      c.fill();
      c.restore();
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.fillText("日服大决战各档线分数", 225, 50);
      c.drawImage(pt, 50, 60);
      c.fillText(data.hard_1[0], 30, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_1[1], 40, 200);
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.drawImage(au, 300, 60);
      c.fillText(data.hard_2[0], 270, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_2[1], 270, 200);
      c.fillStyle = "#000000";
      c.font = `bold 28px Arial`;
      c.drawImage(ag, 550, 60);
      c.fillText(data.hard_3[0], 530, 170);
      c.fillStyle = "#01CC00";
      c.font = `bold 23px Arial`;
      c.fillText(data.hard_3[1], 530, 200);
    }
    __name(mod_1, "mod_1");
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, 700, height);
    c.fillStyle = "#000000";
    c.font = `bold 23px Arial`;
    c.fillText("数据来源:https://arona.ai", 20, 280);
    c.fillText("更新时间：" + data.time, 320, 280);
    await mod_1();
    c.beginPath();
    c.stroke();
    const img = await canvas.toBuffer("image/png");
    fmp2.img_save(img, root_act, "dajuezhan_jp.png");
    return root_act + "/dajuezhan_jp.png";
  }
  __name(draw_dajuezhan, "draw_dajuezhan");
  const cacheInstances = {};
  function getCacheFunction(type) {
    if (cacheInstances[type]) {
      return cacheInstances[type];
    }
    let cache = null;
    let cacheTime = null;
    const cacheDuration = 2 * 60 * 1e3;
    const cacheFunction = /* @__PURE__ */ __name(async function() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (cache !== null && now - cacheTime < cacheDuration) {
        console.log("返回缓存结果");
        return cache;
      }
      console.log("调用原函数");
      const func = await zongli_get_cn(type);
      cache = await draw_list(func, type);
      cacheTime = now;
      return cache;
    }, "cacheFunction");
    cacheInstances[type] = cacheFunction;
    return cacheFunction;
  }
  __name(getCacheFunction, "getCacheFunction");
  let cacheFunctionInstance = null;
  async function getCache_jp() {
    if (cacheFunctionInstance) {
      return cacheFunctionInstance;
    }
    let cache = null;
    let cacheTime = null;
    const cacheDuration = 5 * 60 * 1e3;
    const cacheFunction = /* @__PURE__ */ __name(async function() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (cache !== null && now - cacheTime < cacheDuration) {
        console.log("返回缓存结果");
        return cache;
      }
      console.log("调用原函数");
      const func = await zongli_get_jp();
      cache = await draw_list_jp(func);
      cacheTime = now;
      return cache;
    }, "cacheFunction");
    cacheFunctionInstance = cacheFunction;
    return cacheFunction;
  }
  __name(getCache_jp, "getCache_jp");
  let cacheFunction_dajuezhan = null;
  async function getCache_dajuezhan() {
    if (cacheFunction_dajuezhan) {
      return cacheFunction_dajuezhan;
    }
    let cache = null;
    let cacheTime = null;
    const cacheDuration = 5 * 60 * 1e3;
    const cacheFunction = /* @__PURE__ */ __name(async function() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (cache !== null && now - cacheTime < cacheDuration) {
        console.log("返回缓存结果");
        return cache;
      }
      console.log("调用原函数");
      const func = await 大决战获取();
      cache = await draw_dajuezhan(func);
      cacheTime = now;
      return cache;
    }, "cacheFunction");
    cacheFunction_dajuezhan = cacheFunction;
    return cacheFunction;
  }
  __name(getCache_dajuezhan, "getCache_dajuezhan");
  ctx3.i18n.define("zh-CN", require_zh_CN());
  ctx3.command("总力档线 <message:text>", "总力站信息查询").alias("总力").action(async ({ session }, message) => {
    if (session.event.platform == "qq" && mdswitch) {
      if (!message) {
        try {
          await session.qq.sendMessage(session.channelId, markdown(session));
        } catch (e) {
          logger6.info("发送md时发生错误", e);
          return "总力战档线查询，支持日服、国服官服、国服B服\n还支持大决战查询哦\n使用方法：\n🟢@机器人并发送:/总力档线+空格+服务器";
        }
      }
      if (/日/.test(message)) {
        try {
          session.send(session.text(".wait"));
          const cacheFunction = await getCache_jp();
          const result = await cacheFunction();
          return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(result)).href);
        } catch (e) {
          logger6.info(e);
          return session.text(".error");
        }
      } else if (/b/.test(message) || /B/.test(message)) {
        try {
          const cacheFunction = getCacheFunction(2);
          const paths = await cacheFunction();
          return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(paths)).href);
        } catch (e) {
          logger6.info(e);
          return session.text(".error");
        }
      } else {
        try {
          const cacheFunction = getCacheFunction(1);
          const paths = await cacheFunction();
          return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(paths)).href);
        } catch (e) {
          logger6.info(e);
          return session.text(".error");
        }
      }
    } else {
      if (!message) {
        try {
          const cacheFunction = await getCacheFunction(1);
          console.log(cacheFunction);
          const paths = await cacheFunction();
          console.log(paths);
          session.send(import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(paths)).href));
          return "总力战档线查询，支持日服、国服官服、国服B服\n使用方法：\n🟢总力档线+空格+服务器";
        } catch (e) {
          logger6.info(e);
          return session.text(".error");
        }
      } else {
        if (/日/.test(message)) {
          try {
            session.send("请老师稍等哦，正在获取数据");
            const cacheFunction = await getCache_jp();
            const result = await cacheFunction();
            return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(result)).href);
          } catch (e) {
            logger6.info(e);
            return session.text(".error");
          }
        } else if (/b/.test(message) || /B/.test(message)) {
          try {
            const cacheFunction = getCacheFunction(2);
            const paths = await cacheFunction();
            return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(paths)).href);
          } catch (e) {
            logger6.info(e);
            return session.text(".error");
          }
        } else {
          try {
            const cacheFunction = await getCacheFunction(1);
            console.log(cacheFunction);
            const paths = await cacheFunction();
            console.log(paths);
            return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(paths)).href);
          } catch (e) {
            logger6.info(e);
            return session.text(".error");
          }
        }
      }
    }
  });
  ctx3.command("大决战档线").alias("大决战").action(async ({ session }) => {
    try {
      session.send(session.text(".wait"));
      const cacheFunction = await getCache_dajuezhan();
      const result = await cacheFunction();
      return import_koishi7.h.image((0, import_url2.pathToFileURL)((0, import_path2.resolve)(result)).href);
    } catch (e) {
      logger6.info(e);
      return session.text(".error");
    }
  });
  const A = 0.6;
  async function draw_active(wiki_data) {
    function jud_time(begin_at) {
      const now = Math.floor(Date.now() / 1e3);
      if (begin_at > now) {
        return false;
      } else {
        return true;
      }
    }
    __name(jud_time, "jud_time");
    function calculateTime(begin_at, end_at) {
      const date_end = new Date(begin_at * 1e3);
      const date_be = new Date(end_at * 1e3);
      const year_be = date_be.getFullYear();
      const year_end = date_end.getFullYear();
      const month_be = date_be.getMonth() + 1;
      const month_end = date_end.getMonth() + 1;
      const day_be = date_be.getDate();
      const day_end = date_end.getDate();
      const hours_be = date_be.getHours();
      const hours_end = date_end.getHours();
      const minutes_be = date_be.getMinutes();
      const minutes_end = date_end.getMinutes();
      const now = Math.floor(Date.now() / 1e3);
      const remainingTimeInSeconds = end_at - now;
      const howlong = begin_at - now;
      const lday = Math.floor(howlong / (3600 * 24));
      const lhour = Math.floor(howlong % (3600 * 24) / 3600);
      const lmin = Math.floor(howlong % 3600 / 60);
      const remainingDays = Math.floor(remainingTimeInSeconds / (3600 * 24));
      const remainingHours = Math.floor(remainingTimeInSeconds % (3600 * 24) / 3600);
      const remainingMinutes = Math.floor(remainingTimeInSeconds % 3600 / 60);
      let remainingString = "";
      let type = "";
      if (remainingTimeInSeconds > 0) {
        if (howlong > 0) {
          type = "还有:";
          remainingString = `${lday}天${lhour}小时${lmin}分`;
        } else {
          type = "还剩:";
          remainingString = `${remainingDays}天${remainingHours}小时${remainingMinutes}分`;
        }
      } else {
        remainingString = "已结束";
      }
      const be_time = `${year_be}年 ${month_be}月 ${day_be}日 ${hours_be}时 ${minutes_be}分`;
      const end_time = `${year_end}年 ${month_end}月 ${day_end}日 ${hours_end}时 ${minutes_end}分`;
      return [end_time, be_time, type, remainingString];
    }
    __name(calculateTime, "calculateTime");
    function insertLineBreaks(str, maxLength) {
      let result = "";
      let currentLine = "";
      for (const char of str) {
        if (currentLine.length < maxLength) {
          currentLine += char;
        } else {
          result += currentLine + "\n";
          currentLine = char;
        }
      }
      result += currentLine;
      return result;
    }
    __name(insertLineBreaks, "insertLineBreaks");
    let acvimg = [];
    let yls = 30 * A, yrs = 30 * A;
    let s = 0;
    for (let i = 0; i < wiki_data.data.length; i++) {
      if (!(wiki_data.data[i].picture == "")) {
        acvimg.push(await ctx3.canvas.loadImage("https:" + wiki_data.data[i].picture));
        let drawm_hei;
        config.plugin_config.draw_modle == "canvas" ? drawm_hei = "height" : drawm_hei = "naturalHeight";
        const m = 260 / acvimg[i - s][drawm_hei];
        const hei2 = acvimg[i - s][drawm_hei] * m;
        jud_time(wiki_data.data[i].begin_at) ? yls += hei2 + 160 * A : yrs += hei2 + 160 * A;
      } else {
        jud_time(wiki_data.data[i].begin_at) ? yls += 140 * A : yrs += 140 * A;
        s++;
      }
    }
    let height;
    yls > yrs ? height = yls : height = yrs;
    const canvas = await ctx3.canvas.createCanvas(1600 * A, (height + 450) * (A * 1.35));
    const c = canvas.getContext("2d");
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, 1600 * A, (height + 500) * (A * 1.35));
    let x = 30 * A, rad = 20 * A, y = 30 * A, wid = 700 * A, hei = 150 * A, color = "", yl = 230 * A, yr = 230 * A;
    c.beginPath();
    c.moveTo(x + rad, y);
    c.arcTo(x + wid, y, x + wid, y + hei, rad);
    c.arcTo(x + wid, y + hei, x, y + hei, rad);
    c.arcTo(x, y + hei, x, y, rad);
    c.arcTo(x, y, x + wid, y, rad);
    c.closePath();
    c.fillStyle = "#C9FFB0";
    c.fill();
    c.restore();
    c.fillStyle = "#000000";
    c.font = `bold ${50 * A}px Arial`;
    c.fillText("进行中", (x + 50) * A, (y + 90) * A);
    c.fillStyle = "#000000";
    c.font = `bold ${40 * A}px Arial`;
    c.fillText("当前时间：", (x + 300) * A, (y + 60) * A);
    c.fillText((/* @__PURE__ */ new Date()).toLocaleString(), (x + 300) * A, (y + 100) * A);
    let xr = 800 * A;
    c.beginPath();
    c.moveTo(xr + rad, y);
    c.arcTo(xr + wid, y, xr + wid, y + hei, rad);
    c.arcTo(xr + wid, y + hei, xr, y + hei, rad);
    c.arcTo(xr, y + hei, xr, y, rad);
    c.arcTo(xr, y, xr + wid, y, rad);
    c.closePath();
    c.fillStyle = "#FFF1B3";
    c.fill();
    c.restore();
    c.fillStyle = "#000000";
    c.font = `bold ${50 * A}px Arial`;
    c.fillText("即将开始：", xr + 50 * A, (y + 90) * A);
    let ss = 0, ypush = 0;
    for (let i = 0; i < wiki_data.data.length; i++) {
      ypush = 0;
      const timetemp = calculateTime(wiki_data.data[i].begin_at, wiki_data.data[i].end_at);
      const swin = wiki_data.data[i].pub_area + jud_time(wiki_data.data[i].begin_at);
      switch (swin) {
        case "日服true":
          color = "#EBDBFF";
          x = 30 * A;
          y = yl;
          break;
        case "日服false":
          color = "#D8C8ED";
          x = 800 * A;
          y = yr;
          break;
        case "国际服true":
          color = "#D4ECFF";
          x = 30 * A;
          y = yl;
          break;
        case "国际服false":
          color = "#ABC2E3";
          x = 800 * A;
          y = yr;
          break;
        case "国服true":
          color = "#FFD8D8";
          x = 30 * A;
          y = yl;
          break;
        case "国服false":
          color = "#E5ADAD";
          x = 800 * A;
          y = yr;
          break;
      }
      if (!(wiki_data.data[i].picture == "")) {
        let drawm_hei;
        config.plugin_config.draw_modle == "canvas" ? drawm_hei = "height" : drawm_hei = "naturalHeight";
        let drawm_wid;
        config.plugin_config.draw_modle == "canvas" ? drawm_wid = "width" : drawm_wid = "naturalWidth";
        const m = 250 * A / acvimg[i - ss][drawm_hei];
        const hei2 = acvimg[i - ss][drawm_hei] * m;
        const widimg = acvimg[i - ss][drawm_wid] * m;
        const move = 150 * A;
        c.beginPath();
        c.moveTo(x + rad, y);
        c.arcTo(x + wid, y, x + wid + move, y + hei2 + move, rad);
        c.arcTo(x + wid, y + hei2 + move, x + move, y + hei2 + move, rad);
        c.arcTo(x, y + hei2 + move, x, y, rad);
        c.arcTo(x, y, x + wid, y, rad);
        c.closePath();
        c.fillStyle = color;
        c.fill();
        c.restore();
        if (wiki_data.data[i].title.length > 32) {
          ypush = 20 * A;
          y += ypush;
          c.drawImage(acvimg[i - ss], x + 30 * A, y + 50 * A, widimg, hei2);
          y -= ypush;
        } else {
          c.drawImage(acvimg[i - ss], x + 30 * A, y + 50 * A, widimg, hei2);
        }
        c.fillStyle = "#001D42";
        c.font = `bold ${21 * A}px Arial`;
        c.fillText("开始时间：" + timetemp[0], x + 50 * A, y + hei2 + 80 * A + ypush);
        c.fillStyle = "#420000";
        c.fillText("结束时间：" + timetemp[1], x + 50 * A, y + hei2 + 110 * A + ypush);
        c.fillStyle = "#000000";
        c.font = `bold ${30 * A}px Arial`;
        c.fillText(timetemp[2], x + 450 * A, y + hei2 + 90 * A);
        if (timetemp[2] == "还有:") {
          c.fillStyle = "#A30000";
        } else {
          c.fillStyle = "#005AA3";
        }
        c.fillText(timetemp[3], x + 450 * A, y + hei2 + 120 * A);
        jud_time(wiki_data.data[i].begin_at) ? yl += hei2 : yr += hei2;
      } else {
        ss++;
        c.beginPath();
        c.moveTo(x + rad, y);
        c.arcTo(x + wid, y, x + wid, y + hei, rad);
        c.arcTo(x + wid, y + hei, x, y + hei, rad);
        c.arcTo(x, y + hei, x, y, rad);
        c.arcTo(x, y, x + wid, y, rad);
        c.closePath();
        c.fillStyle = color;
        c.fill();
        c.restore();
        c.fillStyle = "#001D42";
        c.font = `bold ${21 * A}px Arial`;
        c.fillText("开始时间：" + timetemp[0], x + 50 * A, y + 90 * A);
        c.fillStyle = "#420000";
        c.fillText("结束时间：" + timetemp[1], x + 50 * A, y + 120 * A);
        c.fillStyle = "#000000";
        c.font = `bold ${30 * A}px Arial`;
        c.fillText(timetemp[2], x + 450 * A, y + 90 * A);
        if (timetemp[2] == "还有:") {
          c.fillStyle = "#A30000";
        } else {
          c.fillStyle = "#005AA3";
        }
        c.fillText(timetemp[3], x + 450 * A, y + 120 * A);
      }
      c.fillStyle = "#000000";
      c.font = `bold ${25 * A}px Arial`;
      const lines = insertLineBreaks(wiki_data.data[i].title, 32).split("\n");
      let ytext = y + 30 * A;
      const lineHeight = 30 * A;
      for (const line of lines) {
        c.fillText(line, x, ytext);
        ytext += lineHeight;
      }
      jud_time(wiki_data.data[i].begin_at) ? yl += 155 * A : yr += 155 * A;
    }
    const img = canvas.toDataURL("image/png");
    return img;
  }
  __name(draw_active, "draw_active");
  let cachedImageGeneratorInstance = null;
  async function createCachedImageGenerator(wiki_data) {
    if (await cachedImageGeneratorInstance) {
      return await cachedImageGeneratorInstance;
    }
    let cache = null;
    let cacheTime = null;
    const cacheDuration = 2 * 60 * 1e3;
    const cachedImageGenerator = /* @__PURE__ */ __name(async function() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (cache !== null && cacheTime !== null && now - cacheTime < cacheDuration) {
        console.log("使用缓存");
        return cache;
      }
      console.log("缓存刷新或创建");
      cache = await draw_active(wiki_data);
      cacheTime = now;
      return cache;
    }, "cachedImageGenerator");
    cachedImageGeneratorInstance = await cachedImageGenerator;
    return cachedImageGenerator;
  }
  __name(createCachedImageGenerator, "createCachedImageGenerator");
  logger6.info("🟢 总力获取加载完毕");
  ctx3.command("活动日程", "ba活动查询").alias("活动").action(async ({ session }) => {
    const utimetamp = Math.floor(Date.now() / 1e3);
    const wiki_data = await ctx3.http.get(`https://ba.gamekee.com/v1/activity/query?active_at=${utimetamp}`, {
      headers: {
        "game-alias": "ba"
      }
    });
    const cachedGenerator = await (await createCachedImageGenerator(wiki_data))();
    session.send(await import_koishi7.h.image(await cachedGenerator));
  });
  logger6.info("🟢 活动获取功能加载完毕");
}
__name(active_get, "active_get");

// src/calculate/cal_level.ts
var import_koishi8 = require("koishi");

// src/sanae-code/level.ts
var expLevel = {
  1: 8,
  2: 10,
  3: 15,
  4: 21,
  5: 28,
  6: 36,
  7: 45,
  8: 55,
  9: 66,
  10: 79,
  11: 93,
  12: 108,
  13: 124,
  14: 141,
  15: 159,
  16: 178,
  17: 198,
  18: 219,
  19: 241,
  20: 265,
  21: 288,
  22: 312,
  23: 337,
  24: 363,
  25: 390,
  26: 418,
  27: 447,
  28: 477,
  29: 508,
  30: 581,
  31: 658,
  32: 734,
  33: 814,
  34: 897,
  35: 982,
  36: 1069,
  37: 1159,
  38: 1251,
  39: 1346,
  40: 1443,
  41: 1543,
  42: 1645,
  43: 1750,
  44: 1857,
  45: 1966,
  46: 2078,
  47: 2192,
  48: 2309,
  49: 2428,
  50: 2550,
  51: 2674,
  52: 2800,
  53: 2929,
  54: 3060,
  55: 3194,
  56: 3330,
  57: 3469,
  58: 3610,
  59: 3754,
  60: 3900,
  61: 4048,
  62: 4199,
  63: 4352,
  64: 4508,
  65: 4666,
  66: 4831,
  67: 5007,
  68: 5186,
  69: 5369,
  70: 5556,
  71: 5747,
  72: 5942,
  73: 6141,
  74: 6344,
  75: 6552,
  76: 6768,
  77: 6989,
  78: 7216,
  79: 7449,
  80: 7682,
  81: 7915,
  82: 8148,
  83: 8381,
  84: 8883,
  85: 9460,
  86: 10614,
  87: 12922,
  88: 17538,
  89: 26770,
  90: 0
};
var max_cn_lev = 83;
var max_in_lev = 90;
var max_jp_lev = 90;
var cafe = { 1: 3.83, 2: 6.36, 3: 9.29, 4: 12.62, 5: 16.36, 6: 19.49, 7: 22.32, 8: 25.15 };
var dailyMisson = {
  "社团登录": 10,
  "每日登录": 50,
  "课程表任务": 50,
  "18点登录": 50
};
var weeklyMisson = {
  "课程表9次": 150,
  "登录5天": 200,
  "日常签到3": 50,
  "日常签到8": 100
};
function jjcShop(times) {
  let energy = 90 + 90 * times;
  let cost = 45 + 45 * times + 10 * times;
  return [energy, cost];
}
__name(jjcShop, "jjcShop");
function breakDia(times) {
  let energy = 120 * times;
  let cost = 0;
  if (times >= 0 && times <= 3) {
    cost = 30 * times;
  } else if (times >= 4 && times <= 6) {
    cost = 3 * 30 + 60 * (times - 3);
  } else if (times >= 7 && times <= 9) {
    cost = 3 * 30 + 3 * 60 + 100 * (times - 6);
  } else if (times >= 10 && times <= 12) {
    cost = 3 * 30 + 3 * 60 + 3 * 100 + 150 * (times - 9);
  } else if (times >= 13 && times <= 15) {
    cost = 3 * 30 + 3 * 60 + 3 * 100 + 3 * 150 + 200 * (times - 12);
  } else if (times >= 16 && times <= 20) {
    cost = 3 * 30 + 3 * 60 + 3 * 100 + 3 * 150 + 3 * 200 + 300 * (times - 15);
  } else {
    cost = 0;
  }
  return [energy, cost];
}
__name(breakDia, "breakDia");
var Plan = class {
  static {
    __name(this, "Plan");
  }
  name;
  jjc;
  breakDia;
  card;
  constructor(name2, jjc, breakDia2, card) {
    this.name = name2;
    this.jjc = jjc;
    this.breakDia = breakDia2;
    this.card = card;
  }
};
var plan0 = new Plan("无额外购买体力", 0, 0, false);
var plan1 = new Plan("jjc2", 2, 0, false);
var plan2 = new Plan("jjc2+3管", 2, 3, false);
var plan3 = new Plan("jjc2+3管+体力月卡", 2, 3, true);
var plan4 = new Plan("jjc2+6管+体力月卡", 2, 6, true);
var plan5 = new Plan("jjc4+20管+体力月卡", 4, 20, true);
var plans = [plan0, plan1, plan2, plan3, plan4, plan5];
function sumExp(startLevel, startExp, endLevel, endExp) {
  let sum = 0;
  for (let key in expLevel) {
    let level = parseInt(key, 10);
    if (level >= startLevel && level < endLevel) {
      sum += expLevel[level];
    }
  }
  sum = sum - startExp + endExp;
  return [sum, startLevel, startExp, endLevel, endExp];
}
__name(sumExp, "sumExp");
function dailyEnergy(cafeLv, jjc, card, breakDias) {
  let fixedRecovery = 24 * 60 / 6;
  let cafeEnergy = 2 * Math.floor(cafe[cafeLv] * 12);
  let normalDaily = 0;
  for (let key in dailyMisson) {
    normalDaily += dailyMisson[key];
  }
  let jjcEnergy = 0;
  let jjcCost = 0;
  if (jjc != 0) {
    jjcEnergy = jjcShop(jjc - 1)[0];
    jjcCost = jjcShop(jjc - 1)[1];
  }
  let cardEnergy = 0;
  if (card) {
    cardEnergy = 150;
  }
  let diaEnergy = breakDia(breakDias)[0];
  let diaCost = breakDia(breakDias)[1];
  return [fixedRecovery + cafeEnergy + normalDaily + jjcEnergy + cardEnergy + diaEnergy, jjcCost, diaCost];
}
__name(dailyEnergy, "dailyEnergy");
function levelCalculate(mark, startLevel, startExp, endLevel, endExp, cafe2, jjc, card, breakDia2, days) {
  let exp = sumExp(startLevel, startExp, endLevel, endExp);
  let result = [];
  if (exp[2] == 0) {
    if (exp[4] == 0) {
      result.push(`玩家等级从${exp[1]}级到${exp[3]}级，总计经验${exp[0]}，规划方案如下：
`);
    } else {
      result.push(`玩家等级从${exp[1]}级到${exp[3]}级满，总计经验${exp[0]}，规划方案如下：
`);
    }
  } else {
    if (exp[4] == 0) {
      result.push(`玩家等级从${exp[1]}级${exp[2]}经验到${exp[3]}级，总计经验${exp[0]}，规划方案如下：
`);
    } else {
      result.push(`玩家等级从${exp[1]}级${exp[2]}经验到${exp[3]}级满，总计经验${exp[0]}，规划方案如下：
`);
    }
  }
  let cafeRank = 1;
  if (mark === "国服") {
    cafeRank = 8;
  } else if (mark === "国际服" || mark === "日服") {
    cafeRank = 8;
  } else {
    if (cafe2 !== void 0) {
      cafeRank = cafe2;
    }
  }
  let dayCost = 0;
  let jjcCost_sum = 0;
  let diaCost_sum = 0;
  let cardCost_count = 0;
  let cardCost_sum = 0;
  if (mark === "国服" || mark === "国际服" || mark === "日服") {
    for (let plan of plans) {
      jjc = plan.jjc;
      card = plan.card;
      breakDia2 = plan.breakDia;
      jjcCost_sum = 0;
      diaCost_sum = 0;
      let Exp_d = dailyEnergy(cafeRank, jjc, card, breakDia2)[0];
      let jjcCost_d = dailyEnergy(cafeRank, jjc, card, breakDia2)[1];
      let diaCost_d = dailyEnergy(cafeRank, jjc, card, breakDia2)[2];
      let day = 1;
      let exp_sum = 0;
      while (true) {
        exp_sum += Exp_d;
        jjcCost_sum += jjcCost_d;
        diaCost_sum += diaCost_d;
        if (day % 7 == 2) {
          exp_sum += weeklyMisson["课程表9次"];
        }
        if (day % 7 == 5) {
          exp_sum += weeklyMisson["登录5天"];
        }
        if (day % 10 == 3) {
          exp_sum += weeklyMisson["日常签到3"];
        }
        if (day % 10 == 8) {
          exp_sum += weeklyMisson["日常签到8"];
        }
        if (exp_sum >= exp[0]) {
          break;
        } else {
          day++;
        }
      }
      dayCost = day;
      if (card) {
        cardCost_count = Math.ceil(dayCost / 14);
        cardCost_sum = cardCost_count * 25;
      }
      if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗青辉石${diaCost_sum}个。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else {
        result.push(`🟢${plan.name}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      }
    }
  } else if (mark === "自定义计算时间") {
    if (cafe2 !== void 0 && jjc !== void 0 && breakDia2 !== void 0 && card !== void 0) {
      let Exp_d = dailyEnergy(cafe2, jjc, card, breakDia2)[0];
      let jjcCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[1];
      let diaCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[2];
      let day = 1;
      let exp_sum = 0;
      while (true) {
        exp_sum += Exp_d;
        jjcCost_sum += jjcCost_d;
        diaCost_sum += diaCost_d;
        if (day % 7 == 2) {
          exp_sum += weeklyMisson["课程表9次"];
        }
        if (day % 7 == 5) {
          exp_sum += weeklyMisson["登录5天"];
        }
        if (day % 10 == 3) {
          exp_sum += weeklyMisson["日常签到3"];
        }
        if (day % 10 == 8) {
          exp_sum += weeklyMisson["日常签到8"];
        }
        if (exp_sum >= exp[0]) {
          break;
        } else {
          day++;
        }
      }
      dayCost = day;
      if (card) {
        cardCost_count = Math.ceil(dayCost / 14);
        cardCost_sum = cardCost_count * 25;
      }
      if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，无额外购买体力:需要${dayCost}天。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管:需要${dayCost}天，共消耗青辉石${diaCost_sum}个。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，体力月卡:需要${dayCost}天，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。
`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+体力月卡:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管+体力月卡:需要${dayCost}天，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      } else {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管+体力月卡:需要${dayCost}天，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。
`);
      }
    }
  } else if (mark === "自定义计算等级") {
    result = [];
    if (cafe2 !== void 0 && jjc !== void 0 && breakDia2 !== void 0 && card !== void 0 && days !== void 0) {
      let Exp_d = dailyEnergy(cafe2, jjc, card, breakDia2)[0];
      let jjcCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[1];
      let diaCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[2];
      let exp_income = 0;
      let final_level = exp[1];
      let final_exp = 0;
      let certificate = 0;
      if (card) {
        cardCost_count = Math.ceil(days / 14);
        cardCost_sum = cardCost_count * 25;
      }
      for (let d = 1; d <= days; d++) {
        exp_income += Exp_d;
        jjcCost_sum += jjcCost_d;
        diaCost_sum += diaCost_d;
        if (d % 7 == 2) {
          exp_income += weeklyMisson["课程表9次"];
        }
        if (d % 7 == 5) {
          exp_income += weeklyMisson["登录5天"];
        }
        if (d % 10 == 3) {
          exp_income += weeklyMisson["日常签到3"];
        }
        if (d % 10 == 8) {
          exp_income += weeklyMisson["日常签到8"];
        }
      }
      for (let key in expLevel) {
        let level = parseInt(key, 10);
        if (level == exp[1]) {
          exp_income = exp_income - expLevel[level] + exp[2];
          if (exp_income <= 0) {
            final_level = level;
            final_exp = exp_income + expLevel[level];
            break;
          }
        }
        if (level > exp[1]) {
          exp_income -= expLevel[level];
          if (exp_income <= 0) {
            final_level = level;
            final_exp = exp_income + expLevel[level];
            break;
          }
        }
        if (level == max_jp_lev && exp_income > 0) {
          final_level = max_jp_lev;
          final_exp = expLevel[max_jp_lev];
          certificate = exp_income;
          if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
            result.push(`咖啡厅等级${cafe2}，无额外购买体力，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个。`);
          } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
            result.push(`咖啡厅等级${cafe2}，jjc${jjc}，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个。`);
          } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
            result.push(`咖啡厅等级${cafe2}，${breakDia2}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个。`);
          } else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
            result.push(`咖啡厅等级${cafe2}，体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
          } else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
            result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
          } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
            result.push(`咖啡厅等级${cafe2}，jjc${jjc}+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
          } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
            result.push(`咖啡厅等级${cafe2}，${breakDia2}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
          } else {
            result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${max_jp_lev}级${expLevel[max_jp_lev]}经验，获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
          }
          return result;
        }
      }
      if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，无额外购买体力，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验。`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个。`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗青辉石${diaCost_sum}个。`);
      } else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管+体力月卡，${days}天可以从${exp[1]}级${exp[2]}经验升至${final_level}级${final_exp}经验，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      }
    }
  } else if (mark === "自定义计算熟练证书") {
    result = [];
    if (cafe2 !== void 0 && jjc !== void 0 && breakDia2 !== void 0 && card !== void 0 && days !== void 0) {
      let Exp_d = dailyEnergy(cafe2, jjc, card, breakDia2)[0];
      let jjcCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[1];
      let diaCost_d = dailyEnergy(cafe2, jjc, card, breakDia2)[2];
      let exp_income = 0;
      let certificate = 0;
      if (card) {
        cardCost_count = Math.ceil(days / 14);
        cardCost_sum = cardCost_count * 25;
      }
      for (let d = 1; d <= days; d++) {
        exp_income += Exp_d;
        jjcCost_sum += jjcCost_d;
        diaCost_sum += diaCost_d;
        if (d % 7 == 2) {
          exp_income += weeklyMisson["课程表9次"];
        }
        if (d % 7 == 5) {
          exp_income += weeklyMisson["登录5天"];
        }
        if (d % 10 == 3) {
          exp_income += weeklyMisson["日常签到3"];
        }
        if (d % 10 == 8) {
          exp_income += weeklyMisson["日常签到8"];
        }
      }
      certificate = exp_income;
      if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，无额外购买体力，${days}天可以获得熟练证书${certificate}个。`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个。`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管，${days}天可以获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个。`);
      } else if (jjcCost_sum == 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else if (jjcCost_sum != 0 && diaCost_sum != 0 && cardCost_count == 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个。`);
      } else if (jjcCost_sum != 0 && diaCost_sum == 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else if (jjcCost_sum == 0 && diaCost_sum != 0 && cardCost_count != 0) {
        result.push(`咖啡厅等级${cafe2}，${breakDia2}管+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      } else {
        result.push(`咖啡厅等级${cafe2}，jjc${jjc}+${breakDia2}管+体力月卡，${days}天可以获得熟练证书${certificate}个，共消耗jjc币${jjcCost_sum}个，青辉石${diaCost_sum}个，体力月卡${cardCost_count}张（${cardCost_sum}元）。`);
      }
      return result;
    }
  } else {
    return result;
  }
  return result;
}
__name(levelCalculate, "levelCalculate");
function getLevelMessage(input) {
  let mark = "";
  let startLevel = 1;
  let startExp = 0;
  let endLevel = max_jp_lev;
  let endExp = 0;
  let cafe2 = 1;
  let jjc = 0;
  let breakDia2 = 0;
  let card = false;
  let days = 0;
  const functionRegex = /国服|国际服|日服|自定义计算时间|自定义计算等级|自定义计算熟练证书/;
  const functionMatch = input.match(functionRegex);
  if (functionMatch) {
    mark = functionMatch[0];
    if (mark === "国服") {
      cafe2 = 5;
    }
    if (mark === "国际服") {
      cafe2 = 8;
    }
    if (mark === "日服") {
      cafe2 = 8;
    }
  } else {
    return "未匹配到正确功能";
  }
  if (mark === "国服" || mark === "国际服" || mark === "日服") {
    const wrongRegex = /\d+(?:\.\d+)?级(?:(?:\d+(?:\.\d+)?)经验)?.*?(?:\d+(?:\.\d+)?)级(?:\d+(?:\.\d+)?)经验/;
    if (wrongRegex.test(input)) {
      return "计算的最后一天经验值会溢出，因此请不要在目标等级后输入目标经验";
    }
    const simpleRegex1 = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?.*?(\d+(?:\.\d+)?)级(满?)?/;
    const simpleRegex2 = /(\d+(?:\.\d+)?)级(满?)?/;
    const simpleRegex3 = /(\d+(?:\.\d+)?)[^\d]+(\d+(?:\.\d+)?)(满)?/;
    const simpleRegex4 = /(\d+(?:\.\d+)?)(满?)?/;
    const simpleMatch1 = input.match(simpleRegex1);
    if (simpleMatch1) {
      if (simpleMatch1[1]) {
        startLevel = parseFloat(simpleMatch1[1]);
      }
      if (simpleMatch1[2]) {
        startExp = parseFloat(simpleMatch1[2]);
      }
      if (simpleMatch1[3]) {
        endLevel = parseFloat(simpleMatch1[3]);
      }
      if (simpleMatch1[4]) {
        endExp = expLevel[parseFloat(simpleMatch1[3])];
      }
    } else {
      const simpleMatch2 = input.match(simpleRegex2);
      if (simpleMatch2) {
        if (simpleMatch2[1]) {
          endLevel = parseFloat(simpleMatch2[1]);
        }
        if (simpleMatch2[2]) {
          endExp = expLevel[simpleMatch2[1]];
        }
      } else {
        const simpleMatch3 = input.match(simpleRegex3);
        if (simpleMatch3) {
          if (simpleMatch3[1]) {
            startLevel = parseFloat(simpleMatch3[1]);
          }
          if (simpleMatch3[2]) {
            endLevel = parseFloat(simpleMatch3[2]);
          }
          if (simpleMatch3[3]) {
            endExp = expLevel[parseFloat(simpleMatch3[2])];
          }
        } else {
          const simpleMatch4 = input.match(simpleRegex4);
          if (simpleMatch4) {
            if (simpleMatch4[1]) {
              endLevel = parseFloat(simpleMatch4[1]);
            }
            if (simpleMatch4[2]) {
              endExp = expLevel[simpleMatch4[1]];
            }
          } else {
            return "未匹配到等级参数";
          }
        }
      }
    }
    if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
      return "检测到非整数输入，请检查输入";
    }
    if (startLevel < 1) {
      return "等级最低为1级";
    }
    if (mark === "国服" && endLevel > max_cn_lev) {
      return `国服当前最高等级为${max_cn_lev}级`;
    }
    if (mark == "国际服" && endLevel > max_in_lev) {
      return `国际服当前最高等级为${max_in_lev}级`;
    }
    if (mark === "日服" && endLevel > max_jp_lev) {
      return `日服当前最高等级为${max_jp_lev}级`;
    }
    if (endLevel < startLevel) {
      return "目标等级不能低于初始等级";
    }
    if (startExp > expLevel[startLevel]) {
      return "检测到初始经验值高出该等级经验值上限";
    }
    if (endLevel == startLevel && startExp > endExp) {
      return "同等级时目标经验值不能低于初始经验值";
    }
    if (startLevel === void 0 || startExp === void 0 || endLevel === void 0 || endExp === void 0) {
      return "检测到数值缺失，请检查输入";
    }
  } else if (mark === "自定义计算时间") {
    const wrongRegex = /\d+(?:\.\d+)?级(?:(?:\d+(?:\.\d+)?)经验)?.*?(?:\d+(?:\.\d+)?)级(?:\d+(?:\.\d+)?)经验/;
    if (wrongRegex.test(input)) {
      return "计算的最后一天经验值会溢出，因此请不要在目标等级后输入目标经验";
    }
    const timeRegex1 = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?.*?(\d+(?:\.\d+)?)级(满?)?/;
    const timeRegex2 = /(\d+(?:\.\d+)?)级(满?)?/;
    const timeRegex3 = /(\d+(?:\.\d+)?)[^\d]+(\d+(?:\.\d+)?)(满)?/;
    const timeRegex4 = /(\d+(?:\.\d+)?)(满?)?/;
    const timeMatch1 = input.match(timeRegex1);
    if (timeMatch1) {
      if (timeMatch1[1]) {
        startLevel = parseFloat(timeMatch1[1]);
      }
      if (timeMatch1[2]) {
        startExp = parseFloat(timeMatch1[2]);
      }
      if (timeMatch1[3]) {
        endLevel = parseFloat(timeMatch1[3]);
      }
      if (timeMatch1[4]) {
        endExp = expLevel[parseFloat(timeMatch1[3])];
      }
    } else {
      const timeMatch2 = input.match(timeRegex2);
      if (timeMatch2) {
        if (timeMatch2[1]) {
          endLevel = parseFloat(timeMatch2[1]);
        }
        if (timeMatch2[2]) {
          endExp = expLevel[timeMatch2[1]];
        }
      } else {
        const timeMatch3 = input.match(timeRegex3);
        if (timeMatch3) {
          if (timeMatch3[1]) {
            startLevel = parseFloat(timeMatch3[1]);
          }
          if (timeMatch3[2]) {
            endLevel = parseFloat(timeMatch3[2]);
          }
          if (timeMatch3[3]) {
            endExp = expLevel[parseFloat(timeMatch3[2])];
          }
        } else {
          const timeMatch4 = input.match(timeRegex4);
          if (timeMatch4) {
            if (timeMatch4[1]) {
              endLevel = parseFloat(timeMatch4[1]);
            }
            if (timeMatch4[2]) {
              endExp = expLevel[timeMatch4[1]];
            }
          } else {
            return "未匹配到等级参数";
          }
        }
      }
    }
    if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
      return "检测到角色等级/经验非整数输入，请检查输入";
    }
    if (startLevel < 1) {
      return "等级最低为1级";
    }
    if (endLevel > max_jp_lev) {
      return `日服当前最高等级为${max_jp_lev}级`;
    }
    if (startExp > expLevel[startLevel]) {
      return "检测到初始经验值高出该等级经验值上限";
    }
    if (endLevel < startLevel) {
      return "目标等级不能低于初始等级";
    }
    if (endLevel == startLevel && startExp > endExp) {
      return "同等级时目标经验值不能低于初始经验值";
    }
    if (startLevel === void 0 || startExp === void 0 || endLevel === void 0 || endExp === void 0) {
      return "检测到等级/经验数值缺失，请检查输入";
    }
    const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
    const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
    const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
    const cafeMatch1 = input.match(cafeRegex1);
    if (cafeMatch1) {
      cafe2 = parseFloat(cafeMatch1[1]);
    } else {
      const cafeMatch2 = input.match(cafeRegex2);
      if (cafeMatch2) {
        cafe2 = parseFloat(cafeMatch2[1]);
      } else {
        const cafeMatch3 = input.match(cafeRegex3);
        if (cafeMatch3) {
          cafe2 = parseFloat(cafeMatch3[1]);
        } else {
          return "未匹配到咖啡厅等级";
        }
      }
    }
    if (!Number.isInteger(cafe2)) {
      return "检测到咖啡厅等级非整数输入，请检查输入";
    }
    if (cafe2 < 1) {
      return "咖啡厅等级最低为1级";
    }
    if (cafe2 > 8) {
      return "当前日服咖啡厅最高等级为8级";
    }
    if (cafe2 === void 0) {
      return "检测到咖啡厅等级数值缺失，请检查输入";
    }
    const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcMatch1 = input.match(jjcRegex1);
    if (jjcMatch1) {
      jjc = parseFloat(jjcMatch1[1]);
    } else {
      const jjcMatch2 = input.match(jjcRegex2);
      if (jjcMatch2) {
        jjc = parseFloat(jjcMatch2[1]);
      } else {
        const jjcMatch3 = input.match(jjcRegex3);
        if (jjcMatch3) {
          jjc = parseFloat(jjcMatch3[1]) + 1;
        } else {
          const jjcMatch4 = input.match(jjcRegex4);
          if (jjcMatch4) {
            jjc = parseFloat(jjcMatch4[1]) + 1;
          } else {
            return "未匹配到jjc商店购买体力次数";
          }
        }
      }
    }
    if (!Number.isInteger(jjc)) {
      return "检测到jjc商店购买体力次数非整数输入，请检查输入";
    }
    if (jjc > 4) {
      return "每日最多购买4次jjc商店";
    }
    if (jjc === void 0) {
      return "检测到jjc商店购买体力次数数值缺失，请检查输入";
    }
    const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
    const diaRegex2 = /(\d+(?:\.\d+)?)管/;
    const diaMatch1 = input.match(diaRegex1);
    if (diaMatch1) {
      breakDia2 = parseFloat(diaMatch1[1]);
    } else {
      const diaMatch2 = input.match(diaRegex2);
      if (diaMatch2) {
        breakDia2 = parseFloat(diaMatch2[1]);
      } else {
        return "未匹配到碎钻购买体力次数";
      }
    }
    if (!Number.isInteger(breakDia2)) {
      return "检测到碎钻购买体力次数非整数输入，请检查输入";
    }
    if (breakDia2 > 20) {
      return "每日最多碎钻购买20次体力";
    }
    if (jjc === void 0) {
      return "检测到碎钻购买体力次数数值缺失，请检查输入";
    }
    const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
    const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
    const cardMatch1 = input.match(cardRegex1);
    if (cardMatch1) {
      if (cardMatch1[1] === "有") {
        card = true;
      }
    } else {
      const cardMatch2 = input.match(cardRegex2);
      if (cardMatch2) {
        if (cardMatch2[1] === "有") {
          card = true;
        }
      } else {
        return "未匹配到体力月卡信息";
      }
    }
  } else if (mark === "自定义计算等级") {
    const levelRegex = /(\d+(?:\.\d+)?)级(?:(\d+(?:\.\d+)?)经验)?/;
    const levelMatch = input.match(levelRegex);
    if (levelMatch) {
      if (levelMatch[1]) {
        startLevel = parseFloat(levelMatch[1]);
      }
      if (levelMatch[2]) {
        startExp = parseFloat(levelMatch[2]);
      }
    } else {
      return "未匹配到等级参数";
    }
    if (!Number.isInteger(startLevel) || !Number.isInteger(startExp) || !Number.isInteger(endLevel) || !Number.isInteger(endExp)) {
      return "检测到角色等级/经验非整数输入，请检查输入";
    }
    if (startLevel < 1) {
      return "等级最低为1级";
    }
    if (startExp > expLevel[startLevel]) {
      return "检测到初始经验值高出该等级经验值上限";
    }
    if (startLevel === void 0 || startExp === void 0 || endLevel === void 0 || endExp === void 0) {
      return "检测到等级/经验数值缺失，请检查输入";
    }
    const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
    const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
    const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
    const cafeMatch1 = input.match(cafeRegex1);
    if (cafeMatch1) {
      cafe2 = parseFloat(cafeMatch1[1]);
    } else {
      const cafeMatch2 = input.match(cafeRegex2);
      if (cafeMatch2) {
        cafe2 = parseFloat(cafeMatch2[1]);
      } else {
        const cafeMatch3 = input.match(cafeRegex3);
        if (cafeMatch3) {
          cafe2 = parseFloat(cafeMatch3[1]);
        } else {
          return "未匹配到咖啡厅等级";
        }
      }
    }
    if (!Number.isInteger(cafe2)) {
      return "检测到咖啡厅等级非整数输入，请检查输入";
    }
    if (cafe2 < 1) {
      return "咖啡厅等级最低为1级";
    }
    if (cafe2 > 8) {
      return "当前日服咖啡厅最高等级为8级";
    }
    if (cafe2 === void 0) {
      return "检测到咖啡厅等级数值缺失，请检查输入";
    }
    const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcMatch1 = input.match(jjcRegex1);
    if (jjcMatch1) {
      jjc = parseFloat(jjcMatch1[1]);
    } else {
      const jjcMatch2 = input.match(jjcRegex2);
      if (jjcMatch2) {
        jjc = parseFloat(jjcMatch2[1]);
      } else {
        const jjcMatch3 = input.match(jjcRegex3);
        if (jjcMatch3) {
          jjc = parseFloat(jjcMatch3[1]) + 1;
        } else {
          const jjcMatch4 = input.match(jjcRegex4);
          if (jjcMatch4) {
            jjc = parseFloat(jjcMatch4[1]) + 1;
          } else {
            return "未匹配到jjc商店购买体力次数";
          }
        }
      }
    }
    if (!Number.isInteger(jjc)) {
      return "检测到jjc商店购买体力次数非整数输入，请检查输入";
    }
    if (jjc > 4) {
      return "每日最多购买4次jjc商店";
    }
    if (jjc === void 0) {
      return "检测到jjc商店购买体力次数数值缺失，请检查输入";
    }
    const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
    const diaRegex2 = /(\d+(?:\.\d+)?)管/;
    const diaMatch1 = input.match(diaRegex1);
    if (diaMatch1) {
      breakDia2 = parseFloat(diaMatch1[1]);
    } else {
      const diaMatch2 = input.match(diaRegex2);
      if (diaMatch2) {
        breakDia2 = parseFloat(diaMatch2[1]);
      } else {
        return "未匹配到碎钻购买体力次数";
      }
    }
    if (!Number.isInteger(breakDia2)) {
      return "检测到碎钻购买体力次数非整数输入，请检查输入";
    }
    if (breakDia2 > 20) {
      return "每日最多碎钻购买20次体力";
    }
    if (jjc === void 0) {
      return "检测到碎钻购买体力次数数值缺失，请检查输入";
    }
    const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
    const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
    const cardMatch1 = input.match(cardRegex1);
    if (cardMatch1) {
      if (cardMatch1[1] === "有") {
        card = true;
      }
    } else {
      const cardMatch2 = input.match(cardRegex2);
      if (cardMatch2) {
        if (cardMatch2[1] === "有") {
          card = true;
        }
      } else {
        return "未匹配到体力月卡信息";
      }
    }
    const dayRegex = /(\d+(?:\.\d+)?)天/;
    const dayMatch = input.match(dayRegex);
    if (dayMatch) {
      days = parseFloat(dayMatch[1]);
    } else {
      return "未匹配到执行天数";
    }
    if (!Number.isInteger(days)) {
      return "检测到执行天数非整数输入，请检查输入";
    }
    if (days == 0) {
      return "至少执行1天";
    }
    if (days >= 1e4) {
      return `已经肝了${Math.floor(days / 365)}年多了，休息一下吧(*^▽^*)`;
    }
    if (days === void 0) {
      return "检测到执行天数数值缺失，请检查输入";
    }
  } else if (mark == "自定义计算熟练证书") {
    const cafeRegex1 = /咖啡厅(\d+(?:\.\d+)?)级/;
    const cafeRegex2 = /(\d+(?:\.\d+)?)级咖啡厅/;
    const cafeRegex3 = /咖啡厅(\d+(?:\.\d+)?)/;
    const cafeMatch1 = input.match(cafeRegex1);
    if (cafeMatch1) {
      cafe2 = parseFloat(cafeMatch1[1]);
    } else {
      const cafeMatch2 = input.match(cafeRegex2);
      if (cafeMatch2) {
        cafe2 = parseFloat(cafeMatch2[1]);
      } else {
        const cafeMatch3 = input.match(cafeRegex3);
        if (cafeMatch3) {
          cafe2 = parseFloat(cafeMatch3[1]);
        } else {
          return "未匹配到咖啡厅等级";
        }
      }
    }
    if (!Number.isInteger(cafe2)) {
      return "检测到咖啡厅等级非整数输入，请检查输入";
    }
    if (cafe2 < 1) {
      return "咖啡厅等级最低为1级";
    }
    if (cafe2 > 8) {
      return "当前日服咖啡厅最高等级为8级";
    }
    if (cafe2 === void 0) {
      return "检测到咖啡厅等级数值缺失，请检查输入";
    }
    const jjcRegex1 = /jjc(?:商店)?(?:买|购买)?(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex2 = /(?:买|购买)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcRegex3 = /jjc(?:商店)?(?:刷新|刷)(\d+(?:\.\d+)?)(?:次)?/;
    const jjcRegex4 = /(?:刷新|刷)(\d+(?:\.\d+)?)次jjc(?:商店)?/;
    const jjcMatch1 = input.match(jjcRegex1);
    if (jjcMatch1) {
      jjc = parseFloat(jjcMatch1[1]);
    } else {
      const jjcMatch2 = input.match(jjcRegex2);
      if (jjcMatch2) {
        jjc = parseFloat(jjcMatch2[1]);
      } else {
        const jjcMatch3 = input.match(jjcRegex3);
        if (jjcMatch3) {
          jjc = parseFloat(jjcMatch3[1]) + 1;
        } else {
          const jjcMatch4 = input.match(jjcRegex4);
          if (jjcMatch4) {
            jjc = parseFloat(jjcMatch4[1]) + 1;
          } else {
            return "未匹配到jjc商店购买体力次数";
          }
        }
      }
    }
    if (!Number.isInteger(jjc)) {
      return "检测到jjc商店购买体力次数非整数输入，请检查输入";
    }
    if (jjc > 4) {
      return "每日最多购买4次jjc商店";
    }
    if (jjc === void 0) {
      return "检测到jjc商店购买体力次数数值缺失，请检查输入";
    }
    const diaRegex1 = /碎钻(\d+(?:\.\d+)?)(?:管)?/;
    const diaRegex2 = /(\d+(?:\.\d+)?)管/;
    const diaMatch1 = input.match(diaRegex1);
    if (diaMatch1) {
      breakDia2 = parseFloat(diaMatch1[1]);
    } else {
      const diaMatch2 = input.match(diaRegex2);
      if (diaMatch2) {
        breakDia2 = parseFloat(diaMatch2[1]);
      } else {
        return "未匹配到碎钻购买体力次数";
      }
    }
    if (!Number.isInteger(breakDia2)) {
      return "检测到碎钻购买体力次数非整数输入，请检查输入";
    }
    if (breakDia2 > 20) {
      return "每日最多碎钻购买20次体力";
    }
    if (jjc === void 0) {
      return "检测到碎钻购买体力次数数值缺失，请检查输入";
    }
    const cardRegex1 = /(?:体力)?月卡(有|无|没有)/;
    const cardRegex2 = /(有|无|没有)(?:体力)?月卡/;
    const cardMatch1 = input.match(cardRegex1);
    if (cardMatch1) {
      if (cardMatch1[1] === "有") {
        card = true;
      }
    } else {
      const cardMatch2 = input.match(cardRegex2);
      if (cardMatch2) {
        if (cardMatch2[1] === "有") {
          card = true;
        }
      } else {
        return "未匹配到体力月卡信息";
      }
    }
    const dayRegex = /(\d+(?:\.\d+)?)天/;
    const dayMatch = input.match(dayRegex);
    if (dayMatch) {
      days = parseFloat(dayMatch[1]);
    } else {
      return "未匹配到执行天数";
    }
    if (!Number.isInteger(days)) {
      return "检测到执行天数非整数输入，请检查输入";
    }
    if (days == 0) {
      return "至少执行1天";
    }
    if (days >= 1e4) {
      return `已经肝了${Math.floor(days / 365)}年多了，休息一下吧(*^▽^*)`;
    }
    if (days === void 0) {
      return "检测到执行天数数值缺失，请检查输入";
    }
  }
  return [mark, startLevel, startExp, endLevel, endExp, cafe2, jjc, card, breakDia2, days];
}
__name(getLevelMessage, "getLevelMessage");

// src/calculate/cal_level.ts
var log6 = "ba-plugin-favorable";
var logger7 = new import_koishi8.Logger(log6);
var random5 = new import_koishi8.Random(() => Math.random());
async function cal_level(ctx3) {
  ctx3.command("升级 <message:text>", "计算玩家升级所需").alias("lvup").action((_, message) => {
    if (!message) {
      return "功能：\n1.简易计算玩家升级所需时间\n示例：升级 国服 10级50经验到80级满\n---------------\n2.自定义计算玩家升级所需时间\n示例：升级 自定义计算时间 10级50经验到90级 咖啡厅8级 jjc2次 碎钻3管 体力月卡有\n---------------\n3.自定义计算若干天后的等级（超过日服最高等级的部分将自动转化为熟练证书）\n示例：升级 自定义计算等级 10级50经验 咖啡厅8级 jjc2次 碎钻0管 体力月卡无 7天\n---------------\n4.自定义计算若干天获得的熟练证书（默认满级）\n示例：升级 自定义计算熟练证书 咖啡厅8级 jjc2次 碎钻0管 体力月卡有 7天";
    } else {
      let levelMessage = getLevelMessage(message);
      if (typeof levelMessage === "string") {
        return levelMessage;
      } else {
        let resultMessage = levelCalculate(
          levelMessage[0],
          levelMessage[1],
          levelMessage[2],
          levelMessage[3],
          levelMessage[4],
          levelMessage[5],
          levelMessage[6],
          levelMessage[7],
          levelMessage[8],
          levelMessage[9]
        );
        return resultMessage;
      }
    }
  });
}
__name(cal_level, "cal_level");

// src/index.ts
var inject = ["canvas", "puppeteer", "database"];
var name = "ba-plugin";
var usage = `
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
  <li> <a href="https://schaledb.com/"> shale.gg </a> </li>
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
  <li> 数据自动更新 </li>
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


<a href ="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/src/mdreadme.md"><h4>MD模板介绍</h4></a>

<div style="border:1px solid #CCC"></div> 
`;
var plugin_Config = import_koishi9.Schema.intersect([
  import_koishi9.Schema.object({
    autoupd: import_koishi9.Schema.union([
      import_koishi9.Schema.const("本地").description("本地"),
      import_koishi9.Schema.const("云端").description("云端")
    ]).description("选择数据更新方法  本地更新为实验性功能，不能保证稳定性和数据准确性").experimental().role("radio").default("云端"),
    draw_modle: import_koishi9.Schema.union([
      import_koishi9.Schema.const("canvas").description("canvas"),
      import_koishi9.Schema.const("puppeteer").description("puppeteer")
    ]).description("选择渲染方法").role("radio").required(),
    auto_update: import_koishi9.Schema.boolean().default(true).experimental().description("是否每次重载都下载资源")
  }).description("插件基础设置")
]);
var Config = import_koishi9.Schema.object({
  plugin_config: plugin_Config,
  qqconfig: guide_qq,
  guide: guideConfig
});
var log7 = new import_koishi9.Logger("ba-plugin");
var cos1 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/";
var hashurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json";
var jsonurl = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F";
var root_all_img = rootF("bap-img");
async function apply(ctx3, config) {
  const root_json = await rootF("bap-json");
  const root_guide = await rootF("bap-guidesys");
  const fmp2 = new FMPS(ctx3);
  const random6 = new import_koishi9.Random(() => Math.random());
  log7.info(`渲染模式:${config.plugin_config.draw_modle == "canvas" ? "canvas" : "puppeteer"}`);
  async function auto_data_update_function() {
    async function file_random_survey() {
      let status = false;
      const hashurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json";
      const newhash = await ctx3.http.get(hashurl2);
      const oldjson = await fmp2.json_parse(root_json + "/hash.json");
      const stu_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
      for (let i = 0; i < newhash.length; i++) {
        try {
          await fmp2.json_parse(`${root_json}/${oldjson[i].fname}`);
        } catch (e) {
          await fmp2.file_download(hashurl2, root_json, "hash.json");
          for (let i2 = 0; i2 < newhash.length; i2++) {
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_guide, `${newhash[i2].fname}`);
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_json, `${newhash[i2].fname}`);
          }
          log7.error(e);
          return status = false;
        }
      }
      async function mod1() {
        const pluass = random6.pick(plugin_ass, 20);
        const fileChecks = pluass.map(async (i) => {
          return await file_search(`${await root_all_img}/${i}.png`);
        });
        const results = await Promise.all(fileChecks);
        const status2 = results.every((result) => result);
        return status2;
      }
      __name(mod1, "mod1");
      async function mod2() {
        const pluass = random6.pick(stu_data, 30);
        const fileChecks = pluass.map(async (i) => {
          return await file_search(`${await root_all_img}/${i.Id_db}.png`);
        });
        const results = await Promise.all(fileChecks);
        const status2 = results.every((result) => result);
        return status2;
      }
      __name(mod2, "mod2");
      async function mod3() {
        const pluass = random6.pick(stu_data, 30);
        const fileChecks = pluass.map(async (i) => {
          return await file_search(`${await root_all_img}/${i.Id_db}_g.png`);
        });
        const results = await Promise.all(fileChecks);
        const status2 = results.every((result) => result);
        return status2;
      }
      __name(mod3, "mod3");
      const statu1 = await mod1();
      const statu2 = await mod2();
      const statu3 = await mod3();
      if (!statu1 && !statu2 && !statu3) {
        return status = false;
      } else {
        return status = true;
      }
    }
    __name(file_random_survey, "file_random_survey");
    async function init_download() {
      log7.info("⬇️ 开始下载插件必须资源，请稍等哦（*＾-＾*）");
      const hashurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json";
      const newhash = await ctx3.http.get(hashurl2);
      for (let i = 0; i < newhash.length; i++) {
        try {
          await fmp2.json_parse(`${root_json}/${newhash[i].fname}`);
        } catch (e) {
          await fmp2.file_download(hashurl2, root_json, "hash.json");
          for (let i2 = 0; i2 < newhash.length; i2++) {
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_guide, `${newhash[i2].fname}`);
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_json, `${newhash[i2].fname}`);
          }
          log7.error(e);
        }
      }
      try {
        const stu_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
        const stulen = stu_data.length;
        for (let i = 0; i < stulen; i++) {
          await fmp2.file_download(`${cos1}stu_icon_db_png/${stu_data[i].Id_db}.png`, await root_all_img, stu_data[i].Id_db + ".png");
          const num = Math.round(i / stulen * 100);
          if (num == 25 || num == 50 || num == 75 || num == 95) {
            log7.info("头像_1下载进度" + num + "%");
          }
        }
        log7.info("✔️（1/3）学生头像_1下载完毕");
        for (let i = 0; i < stulen; i++) {
          await fmp2.file_download(`${cos1}gacha-img/${stu_data[i].Id_db}.png`, await root_all_img, stu_data[i].Id_db + "_g.png");
          const num = Math.round(i / stulen * 100);
          if (num == 25 || num == 50 || num == 75 || num == 95) {
            log7.info("头像_2下载进度" + num + "%");
          }
        }
        log7.info("✔️（2/3）学生头像_2下载完毕");
        for (let i = 0; i < plugin_ass.length; i++) {
          await fmp2.file_download(`${cos1}img_file/${plugin_ass[i]}.png`, await root_all_img, plugin_ass[i] + ".png");
          const num = Math.round(i / plugin_ass.length * 100);
          if (num == 25 || num == 50 || num == 75 || num == 95) {
            log7.info("资源文件下载进度" + num + "%");
          }
        }
        log7.info("✔️（3/3）资源下载完毕");
      } catch (e) {
        log7.error("出现错误" + e);
        return;
      }
    }
    __name(init_download, "init_download");
    async function initia() {
      log7.info("🟡 正在更新json文件");
      const newhash = await ctx3.http.get(hashurl);
      const oldjson = await fmp2.json_parse(root_json + "/hash.json");
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
      __name(arraysEqual, "arraysEqual");
      if (!arraysEqual(newhash, oldjson)) {
        log7.info("☁️🆕🟡云hash更新");
        if (!await file_random_survey()) {
          log7.info("🟡本地资源检测未通过");
          await init_download();
        }
        const stu_data = await fmp2.json_parse(`${root_json}/sms_studata_toaro_stu.json`);
        if (!await file_search(`${await root_all_img}/${stu_data[stu_data.length - 1].Id_db}.png`)) {
          await init_download();
        }
      } else {
        log7.info("☁️   🟢云hash未更新");
        for (let i = 0; i < newhash.length; i++) {
          const jsons = await fmp2.json_parse(`${root_json}/${oldjson[i].fname}`);
          if (jsons == null) {
            await fmp2.file_download(`${jsonurl}${newhash[i].fname}`, root_guide, `${newhash[i].fname}`);
            await fmp2.file_download(`${jsonurl}${newhash[i].fname}`, root_json, `${newhash[i].fname}`);
          }
        }
        if (!await file_random_survey()) {
          log7.info("🟡本地资源随机检测未通过");
          await init_download();
        }
        if (config.plugin_config.auto_update) {
          log7.info("🟡本地资源随机更新");
          await init_download();
        }
        return;
      }
      for (let i = 1; i < 4; i++) {
        try {
          await fmp2.file_download(hashurl, root_json, "hash.json");
          for (let i2 = 0; i2 < newhash.length; i2++) {
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_guide, `${newhash[i2].fname}`);
            await fmp2.file_download(`${jsonurl}${newhash[i2].fname}`, root_json, `${newhash[i2].fname}`);
          }
          break;
        } catch (e) {
          if (i < 3) {
            log7.info("🟡json文件下载出错：进行第" + i + "次尝试" + e);
          } else {
            log7.info("🔴" + i + "次尝试后依旧出错" + e);
            break;
          }
        }
      }
      log7.info("🟢 json文件更新完毕");
    }
    __name(initia, "initia");
    const fileb = await fmp2.json_parse(root_json + "/hash.json");
    if (fileb == null) {
      const hashurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/hash.json";
      const jsonurl2 = "https://1145141919810-1317895529.cos.ap-chengdu.myqcloud.com/json%2F";
      const newhash = await ctx3.http.get(hashurl2);
      await fmp2.file_download(hashurl2, root_json, "hash.json");
      for (let i = 1; i < 4; i++) {
        try {
          await fmp2.file_download(hashurl2, root_json, "hash.json");
          for (let i2 = 0; i2 < newhash.length; i2++) {
            await fmp2.file_download(`${jsonurl2}${newhash[i2].fname}`, root_guide, `${newhash[i2].fname}`);
            await fmp2.file_download(`${jsonurl2}${newhash[i2].fname}`, root_json, `${newhash[i2].fname}`);
          }
          for (let i2 = 0; i2 < newhash.length; i2++) {
            if (/sms_/.test(newhash[i2].fname)) {
              await fmp2.file_download(`${jsonurl2}${newhash[i2].fname}`, match_file, `${newhash[i2].fname}`);
            }
          }
          break;
        } catch (e) {
          if (i < 3) {
            log7.info("🟡json文件下载出错：进行第" + i + "次尝试" + e);
          } else {
            log7.info("🔴" + i + "次尝试后依旧出错" + e);
            break;
          }
        }
      }
    }
    await initia();
  }
  __name(auto_data_update_function, "auto_data_update_function");
  if (config.plugin_config.autoupd == "云端") {
    await auto_data_update_function();
  } else {
  }
  try {
  } catch (e) {
    log7.info(e);
  }
  ctx3.plugin(guide_systeam, config);
  ctx3.plugin(gacha_f, config);
  ctx3.plugin(cal_favorable, config);
  ctx3.plugin(cal_level);
  ctx3.plugin(active_get, config);
}
__name(apply, "apply");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Config,
  apply,
  inject,
  name,
  plugin_Config,
  root_all_img,
  usage
});
