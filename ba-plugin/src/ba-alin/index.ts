//import区域
import { Context, Schema, h } from 'koishi';
import { data, data1 } from '../data/data';
import { Config } from '..';
/*import {
  日服up, 国际服井,
  日服up十连, output, cleardata,
  count3, count1, output101,
  output102, count2,
  count3up, upcard, 国际up,
  日服井, 国际服up十连,
  国际服常驻十连, 日服常驻十连,
  cardPool,
} from './data/test';
import { output103, nocai, } from './data/test';*/

export interface alinConfig {
  [x: string]: any;
}
//koishi控制台
export const alinConfig: Schema<alinConfig> = Schema.intersect([
  Schema.object({
    server: Schema.union([
      Schema.const(1).description('1服'),
      Schema.const(2).description('2服'),
      Schema.const(3).description('3服'),
    ]).role('radio').default(1).description('设置攻略图图源服务器'),
  }),
]
)
export var jaup
export var inup
var uurl = ''
//声明服务器
const alincloud = 'http://124.221.99.85:8088/'
const laocdn = 'https://bawiki.lgc.cyberczy.xyz/img/'
const laocloud = 'https://bawiki.lgc2333.top/img/'


export const alinplugin = ({
  apply(ctx: Context, config: Config) {

    //-----------------------------------------------------------------------------

    //阿林代码区

    //抽卡系统

    /*
      var alingroup = [//存储阿林群整活角色
        '春佳佬',
        '早苗',
        '苗门',
        'alin',
        '串串',
      ]
    
    
      ctx.command("ba", '碧蓝档案抽卡模拟器')
        .alias('抽卡')
        .alias('BA')
        .example('ba 日服up井')
        .usage("发送“ba”查看具体使用方法")
        .example('ba 国际服常驻十连')
        .action(async ({ session }, ...args) => {
    
    
          if ((args[0]) == null) {
            let a = "BlueArchive抽卡模拟器\n" +
              "日服常驻已添加实莉，国际服常驻已添加时雨\n" +
              "使用方法：ba+空格+国际服/日服+up/常驻+井/十连\n" +
              "例如：ba 日服常驻十连\n" +
              "ba 国际up井\n" +
              "也可以使用ba+空格+卡池代号抽卡\n" +
              "1：日服up井   2：国际服up井\n" +
              "3：日服up十连   4：国际服up十连\n" +
              "5：日服常驻十连   6：国际服常驻十连\n" +
              "7：日服常驻井   8：国际服常驻井\n" +
              "使用ba+空格+jup/iup+空格+角色 设定日服/国际服的up池角色\n" +
              '\n' +
              "使用ba+空格+name 查看up池角色名称（之后会优化交互的呜呜）\n" +
              "一星的概率是78.5%\n" +
              "二星的概率是18.5%\n" +
              "三星的概率是2.3%\n" +
              "up角的概率是0.7%"
            return <message forward>
              <message>
                <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                {a}
                <message>
                  <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                  角色对应名称图
                  <image url={'http://124.221.99.85:8088/name.jpg'} />
                </message>
              </message>
            </message>
    
          } else {
    
            //急服名称检测
            if ((args[0]) === 'iup') {
              if (cardPool.limit.some(e => e.name === args[1])) {
                inup = '爱丽丝'
                return '啊哈哈...国急服还没实装呢'
              } else if ((cardPool.threeStar).some(e => e.name === args[1])
                || (cardPool.limit3).some(e => e.name === args[1])) {
                inup = (args[1])
                return '已设置国际服up角色为 ' + inup
              }
              else {
                inup = '爱丽丝'
                return '啊哈哈...角色名字不对喵'
              }
            }
    
            //日服名称检测
            if ((args[0]) === 'jup') {
              if ((cardPool.threeStar).some(e => e.name === args[1]) ||
                (cardPool.limit2).some(e => e.name === args[1])) {
                jaup = (args[1])
                return '已设置日服up角色为 ' + jaup
                //整活
              } else if ((alingroup).some(e => e === args[1])) {
                jaup = (args[1])
                return '整活成功，已设置日服up角色为 ' + jaup
              }
              else {
                jaup = '实莉'
                return '啊哈哈...角色名字不对喵'
              }
            };
    
    
    
            if ((args[0]) === '日服up井' ||
              (args[0]) === '1' || (args[0]) === '日服up池井') {
              日服up()
              if (count3up === 0) {
                var upout = '呜呜，没有抽到up角色'
              } else {
                var upout =
                  <message>
                    <message>
                      <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
    
                      抽到了 {count3up} 个UP角色：
                    </message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} avatar="url" />
                    <message>
                      ⭐⭐⭐{upcard}X{count3up}
                      <image url={pathToFileURL(resolve
                        (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                    </message>
                  </message>
              }
              return <message forward>
                <message>
                  <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                  日服 {jaup} 池抽卡200次结果如下：{'\n'}
                  抽到以下 {count3 + count3up} 个三星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} avatar="url" />
                {output.map((item) => (
                  <message>
                    ⭐⭐⭐{item}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + item + '.jpg')).href} />
                  </message>
                ))}
                <message>
                  {upout}
                  {cleardata()}
                </message>
              </message>
            }
    
    
            if ((args[0]) === '国际服up井' || (args[0]) === '2') {
              国际up()
              if (count3up === 0) {
                var upout = '呜呜，没有抽到up角色'
              } else {
                var upout =
                  <message>
                    <message>
                      <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                      抽到了 {count3up} 个UP角色：
                    </message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} avatar="url" />
                    <message>
                      ⭐⭐⭐{upcard}X{count3up}
                      <image url={pathToFileURL(resolve
                        (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                    </message>
                  </message>
              }
              return <message forward>
                <message>
                  <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                  国际服 {inup} 池抽卡200次结果如下：{'\n'}
                  抽到以下 {count3 + inup} 个三星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} avatar="url" />
                {output.map((item) => (
                  <message>
                    ⭐⭐⭐{item}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + item + '.jpg')).href} />
                  </message>
                ))}
                <message>
                  {upout}
                  {cleardata()}
                </message>
              </message>
            }
    
            //==================
    
            if ((args[0]) === '日服up十连' || (args[0]) === '3') {
              日服up十连()
              let three: any
              if (count3 === 0 && count3up === 0) {
                let oout: any = Math.floor(Math.random() * nocai.length)
                three = nocai[oout]
              } else {
                three =
                  <message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} acatar="url" />
                    抽到以下{count3 + count3}个三星角色：
                  </message>
              }
              if (count3up === 0) {
                var upout = ''
              } else {
                var upout =
                  <message>
                    <message>
                      <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                      抽到了 {count3up} 个UP角色：
                    </message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} avatar="url" />
                    <message>
                      ⭐⭐⭐{upcard}X{count3up}
                      <image url={pathToFileURL(resolve
                        (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                    </message>
                  </message>
              }
              return <message forward>
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  日服 {jaup} 池抽卡10次结果如下：{'\n'}
                  抽到以下{count1}个一星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                {output101.map((out101) => (
                  <message>
                    ⭐{out101}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                  </message>
                )
                )}
    
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count2}个二星角色：
                </message>
                {output102.map((out102) => (
                  <message>
                    ⭐⭐{out102}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                  </message>
                )
                )}
                <message>
                  {three}
                </message>
                {output103.map((out103) => (
                  <message>
                    ⭐⭐⭐{out103}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                  </message>
                ))}
                {upout}
                {cleardata()}
              </message>
            }
    
    
    
            if ((args[0]) === '国际服up十连' || (args[0]) === '4') {
              国际服up十连()
              let three: any
              if (count3 === 0 && count3up === 0) {
                let oout: any = Math.floor(Math.random() * nocai.length)
                three = nocai[oout]
              } else {
                three =
                  <message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} acatar="url" />
                    抽到以下{count3 + count3}个三星角色：
                  </message>
              }
              if (count3up === 0) {
                var upout = ''
              } else {
                var upout =
                  <message>
                    <message>
                      <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                      抽到了 {count3up} 个UP角色：
                    </message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} avatar="url" />
                    <message>
                      ⭐⭐⭐{upcard}X{count3up}
                      <image url={pathToFileURL(resolve
                        (__dirname, './data/photo/' + upcard + '.jpg')).href} />
                    </message>
                  </message>
              }
              return <message forward>
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  国际服 {inup} 池抽卡10次结果如下：{'\n'}
                  抽到以下{count1}个一星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                {output101.map((out101) => (
                  <message>
                    ⭐{out101}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                  </message>
                )
                )}
    
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count2}个二星角色：
                </message>
                {output102.map((out102) => (
                  <message>
                    ⭐⭐{out102}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                  </message>
                )
                )}
                <message>
                  {three}
                </message>
                {output103.map((out103) => (
                  <message>
                    ⭐⭐⭐{out103}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                  </message>
                ))}
                {upout}
                {cleardata()}
              </message>
            }
            if ((args[0]) === '国际服常驻十连' || (args[0]) === '6') {
              国际服常驻十连()
              let three: any
              if (count3 === 0) {
                let oout: any = Math.floor(Math.random() * nocai.length)
                three = nocai[oout]
              } else {
                three =
                  <message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} acatar="url" />
                    抽到以下{count3}个三星角色：
                  </message>
              }
              console.log(three)
              return <message forward>
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  国际服常驻池抽卡10次结果如下：{'\n'}
                  抽到以下{count1}个一星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                {output101.map((out101) => (
                  <message>
                    ⭐{out101}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                  </message>
                )
                )}
    
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count2}个二星角色：
                </message>
                {output102.map((out102) => (
                  <message>
                    ⭐⭐{out102}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                  </message>
                )
                )}
                <message>{three}</message>
                {output103.map((out103) => (
                  <message>
                    ⭐⭐⭐{out103}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                  </message>
                ))
                }
                {cleardata()}
              </message>
    
            }
    
    
    
            if ((args[0]) === '日服常驻十连' || (args[0]) === '5') {
              日服常驻十连()
              let three: any
              if (count3 === 0) {
                let oout: any = Math.floor(Math.random() * nocai.length)
                three = nocai[oout]
              } else {
                three =
                  <message>
                    <author user-id={session.selfId}
                      nickname={session.selfId} acatar="url" />
                    抽到以下{count3}个三星角色：
                  </message>
              }
              console.log(three)
              return <message forward>
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  日服常驻池抽卡10次结果如下：{'\n'}
                  抽到以下{count1}个一星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} acatar="url" />
                {output101.map((out101) => (
                  <message>
                    ⭐{out101}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out101 + '.jpg')).href} />
                  </message>
                )
                )}
    
                <message>
                  <author user-id={session.selfId}
                    nickname={session.selfId} acatar="url" />
                  抽到以下{count2}个二星角色：
                </message>
                {output102.map((out102) => (
                  <message>
                    ⭐⭐{out102}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out102 + '.jpg')).href} />
                  </message>
                )
                )}
                <message>{three}</message>
                {output103.map((out103) => (
                  <message>
                    ⭐⭐⭐{out103}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + out103 + '.jpg')).href} />
                  </message>
                ))
                }
                {cleardata()}
              </message>
    
            }
    
            if ((args[0]) === '日服常驻井' || (args[0]) === '7') {
              日服井()
              return <message forward>
                <message>
                  <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                  日服常驻池抽卡200次结果如下：{'\n'}
                  抽到以下 {count3} 个三星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} avatar="url" />
                {output.map((item) => (
                  <message>
                    ⭐⭐⭐{item}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + item + '.jpg')).href} />
                  </message>
                ), cleardata()
                )}
              </message>
            };
    
            if ((args[0]) === '国际服常驻井' || (args[0]) === '8') {
              国际服井()
              return <message forward>
                <message>
                  <author user-id={session.selfId} nickname={session.selfId} avatar="url" />
                  国际服常驻池抽卡200次结果如下：{'\n'}
                  抽到以下 {count3} 个三星角色：
                </message>
                <author user-id={session.selfId}
                  nickname={session.selfId} avatar="url" />
                {output.map((item) => (
                  <message>
                    ⭐⭐⭐{item}
                    <image url={pathToFileURL(resolve
                      (__dirname, './data/photo/' + item + '.jpg')).href} />
                  </message>
                ), cleardata()
                )}
              </message>
            };
    
            if ((args[0]) === 'name') {
              return "角色对应名称图" + <image url={'http://124.221.99.85:8088/name.jpg'} />
            }
    
          } {
            return '呜呜...输入错误了'
          }
        })
    
    */


    //控制台参数初始化
    ctx.on('ready', async () => {



      //sever设置
      if (config.alin.serve === 1) {
        uurl = alincloud
        console.log('已设置1服务器')
      }
      if (config.alin.serve === 2) {
        uurl = laocdn
        console.log('已设置2服务器')
      }
      if (config.alin.serve === 3) {
        uurl = laocloud
        console.log('已设置3服务器')
      }
      //防整活
      if (config.alin.server > 3 || config.alin.serve < 1) {
        uurl = alincloud
        console.log('已自动设置1服务器')
      }

    }

    );




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
            "体力规划  石头规划  制造  装备 \n" +
            '  发送：攻略+空格+角色名 查询角色评分图\n' +
            '  发送：攻略+空格+随机表情 随机抽取社团聊天表情\n' +
            '  发送：攻略+空格+随机漫画 随机抽取ba漫画\n' +
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
            let random = Math.floor(Math.random() * 59) + 1
            let random1 = random.toString().padStart(2, '0');
            return (h('image', { url: uurl + 'emoji/' + 'Clanchat_Emoji_' + random1 + '_Tw' + '.png' }))
          }


          if ((args[0]) === '随机漫画' || (args[0]) === '抽漫画') {
            let random = Math.floor(Math.random() * 218) + 1
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
              return "呜呜，没有找到对应攻略图，换个名称试试吧。"
            }
          }
        }



      })

    //尾巴1
  }
})
