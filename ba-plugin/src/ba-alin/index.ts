//import区域
import { Context, Schema, h, Random } from 'koishi';
import { data, data1 } from '../data/data';
import { Config } from '..';

var uurl = ''
//声明服务器
export const alincloud = 'http://124.221.99.85:8088/'
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/'
const laocloud = 'https://bawiki.lgc2333.top/img/'


export const alinplugin = ({
  apply(ctx: Context, config: Config) {
    uurl = alincloud
    console.log(uurl)
    console.log('已设置1服务器')


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
          return '使用方法：攻略+空格+内容\n' +
            "目前攻略图支持查询：\n" +
            "千里眼  互动家具  评测总分  礼物 \n" +
            "体力规划  石头规划  制造  装备  初始推荐\n" +
            '·发送：攻略+空格+角色名 查询角色评分图\n' +
            '·发送：攻略+空格+随机表情 随机抽取社团聊天表情\n' +
            '·发送：攻略+空格+随机漫画 随机抽取ba官方漫画\n' +
            "数据来源于ba.gamekee.com和大佬的bawiki-data数据库\n" +
            "学生评分只需名字即可，可以使用罗马音查询 \n" +
            "角色名称缺失和错误可以去GitHub反馈喵 \n" +
            "引用 @夜猫咪喵喵猫 的角色评分\n" +
            "2、3图源服务器来自大佬的数据库github.com/lgc-NB2Dev/bawiki-data\n" +
            "如果无法加载图片请发送‘攻略+空格+服务器代号’切换图源服务器\n" +
            "服务器代号：1、2、3，只需填入代号即可"
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
            let random = Math.floor(Math.random() * 75) + 1
            let random1 = random.toString().padStart(2, '0');
            return (h('image', { url: uurl + 'emoji/' + 'Clanchat_Emoji_' + random1 + '_Tw' + '.png' }))
          }


          if ((args[0]) === '随机漫画' || (args[0]) === '抽漫画') {
            let random = Math.floor(Math.random() * 230) + 1
            let random1 = random.toString().padStart(4, '1');
            return (h('image', { url: alincloud + 'comic/' + random1 + '.jpg' }))
          }


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



      }

      )

    //尾巴1
  }
})


