"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = void 0;
const koishi_1 = require("koishi");
const data_1 = require("./data/data");
const test_1 = require("./data/test");
exports.name = "ba-plugin";
exports.usage = "数据来源于bawiki，更多功能正在开发，有啥毛病可以去GitHub上提issue，或者发📫。";
exports.Config = koishi_1.Schema.object({});
async function apply(ctx) {
    //角色评分系统
    ctx.command('评分', "引用bawiki网站的角色评分")
        .alias('评测')
        .alias('测评')
        .example('评分 爱丽丝')
        .action(async ({ session }, ...args) => {
        function getValue(args) {
            for (const obj of data_1.data) {
                if (obj.name === args[0]) {
                    return obj.link[0];
                }
            }
            // 如果没有找到匹配的对象，则返回null或者其他默认值
            return null;
        }
        const result = getValue(args);
        return (result ? ((0, koishi_1.h)('image', { url: getValue(args) })) :
            "呜~，没有找到对应角色，换个名称试试吧"); // 打印匹配对象的第一个元素
    });
    //抽卡系统
    ctx.command("ba", '抽卡模拟器，目前只支持井两个服的常驻池')
        .example('ba 日服来一井')
        .example('ba 国际服来一井')
        .action(async ({ session }, ...args) => {
        if ((args[0]) === '日服来一井') {
            return (0, test_1.日服井)();
        }
        ;
        if ((args[0]) === '国际服来一井') {
            return (0, test_1.国际服井)();
        }
        ;
        return ('呜~好像输入错误了');
    });
    //千里眼
    ctx.command("千里眼", '国急服千里眼')
        .usage('国急服，急急急急急急急急急')
        .action(() => {
        return ((0, koishi_1.h)('image', { url: 'https://cdnimg.gamekee.com/wiki2.0/images/w_2428/h_5820/829/43637/2023/3/19/253608.png' }));
    });
}
exports.apply = apply;
