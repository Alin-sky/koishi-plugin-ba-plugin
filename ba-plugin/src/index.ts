
import { Context, Schema, h } from "koishi";
import { data } from "./data/data";
import { 日服井,国际服井 } from './data/test';

export const name = "ba-plugin";

export interface Config {}
export const Config: Schema<Config> = Schema.object({});

export async function apply(ctx) {
    //角色评分系统
    ctx.command('评分',"引用bawiki网站的角色评分")
    .alias('评测')
    .alias('测评')
    .example('评分 爱丽丝')
    .action(async ({ session }, ...args) => {
      function getValue(args: string[]) {
        for (const obj of data) {
          if (obj.name === args[0]) {
            return obj.link[0];
          }
        }
        // 如果没有找到匹配的对象，则返回null或者其他默认值
        return null;
      }
  
      const result = getValue(args);
      
      return (result ? (h('image',{url:getValue(args)})): 
      "呜~，没有找到对应角色，换个名称试试吧");                    // 打印匹配对象的第一个元素
    });


    //抽卡系统
    ctx.command("ba",'抽卡模拟器，目前只支持井两个服的常驻池')
    .example('ba 日服来一井')
    .example('ba 国际服来一井')
    .action(async({session},...args) =>{
        if((args[0]) === '日服来一井'){
            return 日服井();
        };
        if ((args[0]) === '国际服来一井'){
            return 国际服井()
        };
  
        return ('呜~好像输入错误了')
    })
    
  
  }
