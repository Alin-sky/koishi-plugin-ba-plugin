import { Context, Schema, Logger } from 'koishi';
import { getFavorLv } from '../sanae-code/favorability'
import { favorCalculate } from '../sanae-code/favorability'
import { getZZMessage } from '../sanae-code/clairvoyant'
import { accumulateDia } from '../sanae-code/clairvoyant'
import { getLevelMessage, levelCalculate } from '../sanae-code/level'

import { } from '@koishijs/plugin-help'
import { Config } from '..';
import path from 'path';



//配置项
export interface alin_puppe {
    levelswit: boolean
    type: number
    backdrop_filter: number
    backdrop_url: string
}
export const alin_puppe: Schema<alin_puppe> = Schema.intersect([
    Schema.object({
        levelswit: Schema.boolean().default(true).description('将“攒钻、升级、好感计算”的内容渲染成图片（需要puppeteer,占用内存大）'),
        type: Schema.union([1, 2, 3]).default(1).description('渲染图样式'),
        backdrop_url: Schema.string().default('https://cdnimg.gamekee.com/wiki2.0/images/829/43637/2022/4/18/687678.jpg').description('渲染图背景图（填入图片url,缺省时将使用alin的随机图图）'),
        backdrop_filter: Schema.percent().role('slider').min(0).max(100).step(1).default(15).description('渲染图背景模糊度'),
    }).description('🖼️puppeteer渲染相关设置🖼️'),
]
)



const log1 = "ba-plugin-puppeteer"
const logger: Logger = new Logger(log1)


export const using = ['puppeteer'] as const;

export const alin_activ =
    function apply(ctx: Context, config: Config) {
        async function scrapePage() {
                // 启动并连接浏览器
                await ctx.puppeteer;
                // 创建一个新页面
                const page = await ctx.puppeteer.page();
                // 打开目标网页
                await page.goto('https://schale.gg/');
                
                // 等待特定元素出现或等待一定时间
                // 例如，等待一个具有特定 ID 的元素出现
                await page.waitForSelector('#specific-element-id');
                // 或者等待一定时间（例如 3000 毫秒）
                // await page.waitForTimeout(3000);

                // 获取网页的HTML内容
                const content = await page.content();
                console.log(content);
        }
        ctx.command('test')
            .action(() => {
                scrapePage();
            })
    }








export const calculate_puppe =
    function apply1(ctx: Context, config: Config) {
        console.log(config.alin_puppe.type)
        //样式
        const appStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '860px',
            width: '550px',
            zIndex: '-10'
        };
        const Style1 = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'blur(' + config.alin_puppe.backdrop_filter + 'px)',
            position: 'fixed',
            width: '650px',
            zindex: '-1'
        };
        if (!config.alin_puppe.backdrop_url) {
            var srcurl = 'http://alin.highmore.tk:8888'//alin的随机图图api
        } else {
            var srcurl = config.alin_puppe.backdrop_url
        }




        function boxStyle(hi, color, wd, padd) {
            return {
                width: wd,
                height: 'auto',
                background: color,//颜色
                borderRadius: padd,//圆角
                zIndex: '20',
                position: 'absolute',
                transform: 'translateY(' + hi + 'px)',//位移
                padding: "2px"//距离
            };
        }//狗屎样式切换函数

        //狗屎样式生成函数
        //乱几把写的真的不会写，ai辅助最少的一集
        //接受传入四个参数
        //lenghts，为数组的长度
        //img，为文字前面的图片
        //ji_i,为文本之间的间距
        //headimg，标题的图片
        //需要数组index
        //输出inexs，第一个会被渲染成字体较大的标题并带上headimg

        var typeout;
        let indexs = [];
        let indexs1
        var index
        var img = []

        function textoutf(lengths, img, hi_i, headimg) {
            indexs = [''];
            indexs1 = ''
            var pushstatus = true
            var hi = -450
            var u = 0

            for (let i = 0; i < lengths; i++) {
                let b = i
                hi += hi_i;

                //判断样式
                if (config.alin_puppe.type === 1) {
                    typeout = boxStyle(hi, 'rgb(132, 216, 255)', "500px", "20px");
                    var typecolor = "black"
                    var shadow = ''
                }
                if (config.alin_puppe.type === 2) {
                    typeout = boxStyle(hi, 'linear-gradient(to right,rgba(255,140,140,0.79),rgba(255,40,40,0.79))', "500px", '8px 50px 8px 50px');
                    var typecolor = "white"
                    var shadow = ''
                }
                if (config.alin_puppe.type === 3) {
                    typeout = boxStyle(hi, '0', "500px", '0');
                    var typecolor = "white"
                    var shadow = '2px 2px 4px black, -2px -2px 4px black, 2px -2px 4px black, -2px 2px 4px black'
                }

                indexs1 = (
                    <div style={typeout}>
                        <h1 style={{ color: typecolor, textShadow: shadow }}>
                            {headimg}{index[0]}
                        </h1>
                    </div >
                );//头部
                headimg = ''

                if (pushstatus === true) {
                    indexs.push(indexs1)
                    hi += 28
                    pushstatus = false//单次循环
                } else {
                    indexs.push(
                        <div style={typeout}>
                            <h2 style={{ color: typecolor, textShadow: shadow }}>
                                {img[u]}{index[b]}
                            </h2>
                        </div >
                    )
                    u++
                }
            }
            return indexs
        }//狗屎样式生成函数

        const imgpath = path.join(__dirname,);
        ctx.command("升级 <message:text>", "升级计算器")
            .action((_, message) => {
                indexs = []
                indexs1 = ''
                if (!message) {
                    return "功能：\n" +
                        "1.简易计算玩家升级所需时间（国服咖啡厅等级5，其余服务器8）\n" +
                        "示例：升级 国服 10级50经验到75级满\n" +
                        "2.自定义计算玩家升级所需时间\n" +
                        "示例：升级 自定义计算时间 10级50经验到85级 咖啡厅8级 jjc2次 碎钻3管 体力月卡有\n" +
                        "3.自定义计算若干天后的等级（超过日服最高等级的部分将自动转化为熟练证书）\n" +
                        "示例：升级 自定义计算等级 10级50经验 咖啡厅8级 jjc2次 碎钻0管 体力月卡无 7天\n" +
                        "4.自定义计算若干天获得的熟练证书（默认满级）\n" +
                        "示例：升级 自定义计算熟练证书 咖啡厅8级 jjc2次 碎钻0管 体力月卡有 7天"
                } else {
                    let levelMessage = getLevelMessage(message);
                    if (typeof levelMessage === "string") {
                        return levelMessage
                    } else {
                        index =
                            levelCalculate(levelMessage[0],
                                levelMessage[1],
                                levelMessage[2],
                                levelMessage[3],
                                levelMessage[4],
                                levelMessage[5],
                                levelMessage[6],
                                levelMessage[7],
                                levelMessage[8],
                                levelMessage[9])
                        let l = index.length

                        let typeiogo = {
                            width: '50px',
                            zIndex: '10'
                        }

                        let heaurl = <img src={imgpath + "./puppedata/level.png"} style={typeiogo} />
                        textoutf(l, '', 110, heaurl)
                        logger.info("🟢--渲染图片中")
                        return (
                            <html>
                                <div>
                                    <img src={srcurl} style={Style1}></img>
                                    <div style={appStyle}></div>
                                    {indexs}
                                </div>
                            </html>

                        )
                    }
                }
            })

        ctx.command("好感计算 <message:text>", "好感度需求计算器")
            .action((_, message) => {
                indexs = []
                indexs1 = ''

                if (!message) {
                    return "标准输入: \n" +
                        "1.从当前好感度计算：输入当前好感度和目标好感度\n" +
                        "2.从1级好感度计算：只输入目标好感度\n" +
                        "示例：\n" +
                        "好感计算 10-50\n"
                } else {

                    let favorMessage = getFavorLv(message);
                    if (typeof favorMessage === "string") {
                        return favorMessage;
                    } else {
                        index = favorCalculate(favorMessage[0], favorMessage[1]);
                        let l = index.length;
                        let typeiogo = {
                            width: '30px',
                            zIndex: '10',
                        }


                        var ourl = [
                            <img src={imgpath + "./puppedata/motou.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/rc.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/1.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/2.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/3.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/2.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/3.png"} style={typeiogo} />,
                            <img src={imgpath + "./puppedata/4.png"} style={typeiogo} />,
                        ];


                        for (let i = 0; i < ourl.length; i++) {
                            img.push(ourl[i])
                        }
                        let typeiogo1 = {
                            width: '50px',
                            zIndex: '10'
                        }

                        let heaurl = <img src={imgpath + "./puppedata/favologo.png"} style={typeiogo1} />
                        textoutf(l, img, 90, heaurl)
                    }
                    logger.info("🟢--渲染图片中")
                    return (
                        <html>
                            <div>
                                <img src={srcurl} style={Style1}></img>
                                <div style={appStyle}></div>
                                {indexs}
                            </div>
                        </html>
                    )
                }
            })




        ctx.command("攒钻 <message:text>", '青辉石计算器')
            .alias('算石头')
            .usage("发送“攒钻”查看具体使用方法")
            .example("攒钻 2023/7/27月卡有jjc30挑战100总力一档")
            .action((_, message) => {
                if (!message) {
                    return "标准输入: \n" +
                        "1.需要攒到的那天，使用年/月/日形式；\n" +
                        "2.月卡有/无；\n" +
                        "3.jjc一天拿多少钻；\n" +
                        "4.活动的挑战关能拿多少\n" +
                        "(100代表全拿，只能打两关就是40)；\n" +
                        "5.总力是几档\n" +
                        "1、2、3、4、5都需要输入喵，中间不需要空格\n" +
                        "示例：\n" +
                        "攒钻 2023/11/14月卡有jjc30挑战100总力一档"
                }
                let zzMessage = getZZMessage(message);
                if (typeof zzMessage === "string") {
                    return zzMessage
                } else {


                    let typeiogo = {
                        width: '50px',
                        zIndex: '10'
                    }
                    index = accumulateDia(
                        zzMessage[0],
                        zzMessage[1],
                        zzMessage[2],
                        zzMessage[3],
                        zzMessage[4]
                    )
                    let l = index.length;
                    const imgpath = path.join(__dirname,);
                    let img1 = <img src={imgpath + "./puppedata/qhs.png"} style={typeiogo} />

                    textoutf(l, '', 97, img1)
                    logger.info("🟢--渲染图片中")
                    return (
                        <html>
                            <div>
                                <img src={srcurl} style={Style1}></img>
                                <div style={appStyle}></div>
                                {indexs}
                            </div>
                        </html>
                    )


                }
            })

    }



