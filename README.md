<div align="center">
  
# koishi-plugin-ba-plugin

      
 <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/logo2.png" width="145" height="196">

  
 

[![npm](https://img.shields.io/npm/v/koishi-plugin-ba-plugin?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-ba-plugin)
## koishi插件，bluearchive.碧蓝档案工具箱，正在不断开发新功能
</div>

## 功能
- 抽卡模拟器
- 角色评分
- 国际服千里眼
- 总力战模拟
- 攻略图查询
- 随机表情和漫画
- 青辉石计算器

## 使用方法
在koishi内使用“帮助”指令查询使用方法喵


## 介绍
### **我正在学代码，这个项目相当于练手和学习的工程，肯定有很多不完善、不规范的地方，还请各位大佬轻喷**

这个是[koishi](https://github.com/koishijs/koishi)机器人的插件，需要在koishi的插件市场安装

我会不断更新这个项目

交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)
和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)

感谢各位巨佬的指导🙏<br/>
感谢各位巨佬帮忙测试🙏<br/>
感谢巨佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库🙏

ba聊天水群：662889478

数据目前来源于[bawiki](https://ba.gamekee.com/entry)和[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)

---
## 感谢（按首字母排序）
| 贡献者                                                       | 主要贡献                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [diyigemt](https://github.com/diyigemt)           | 开放了API，提供了[Arona](https://github.com/diyigemt/arona)数据 |
| [エルル](https://github.com/erurusion)  |抽卡模拟、抽群u等功能                                              |
| [lgc-NB2Dev](https://github.com/lgc-NB2Dev) | 提供[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库 |
| [Sanaene](https://github.com/Sanaene)      | 攒钻算法和总力模拟                                            |
                         
---

## 更新日志

### 0.9.5-rc
  - *[早苗](https://github.com/Sanaene)佬发布的新功能好感计算和等级计算*

### 0.9.0-beta1
  - *[早苗](https://github.com/Sanaene)佬更新了攒钻*
  - 例行数据更新

### 0.9.0-beta
  - *重构了攻略系统*
  - 摸了一个暑假的鱼

### 0.9.0-Alpha
  - *接入了[Arona](https://github.com/diyigemt/arona)的公开数据*
  - 例行更新数据
  - 略微优化了旧代码
  - 其他小修小补
   
### 0.8.4
  - 例行更新数据
  - 其他小修补

### 0.8.3
  - 修复了抽群u的bug
  - 修复了并发请求图片url超出服务器负载的的bug

### 0.8.2
  - 添加了泳装兔子队的数据

### 0.8.1
  - 修复了Alpha版本的路径问题
  - 其他小修小补和优化

### 0.8.0(Alpha)
  - *添加了群u[エルル](https://github.com/erurusion)的新抽卡模拟器，比阿林的强十倍甚至⑨倍*
  - 其他小修小补

### 0.7.5（未定位合并转发显示问题）
  - *添加了随机表情和随机漫画*
  - 添加了新角色实莉的卡池和角评
  - 修复了抽卡模拟器不能添加角色的bug
  - 修复了0.7.1已知的bug
  - 其他小修小补


### 0.7.1（未定位合并转发显示问题）
  - 添加了up角色名称输入限制
  - 修复了抽卡模拟器抽up池子的一些bug
  - 优化控制台
  - 其他小修小补


### 0.7.0
  - *部分重构了抽卡函数，添加了up功能，支持自定义up角色，修复了未实现的保底功能*
  - 修改了攒钻算法的触发
  - *可以在koishi控制台切换图源服务器*
  - *可以在控制台定义up池角色*
  - 修复评测图源服务器刷新问题
  - 其他小修小补

### 0.6.1
  - 给评测系统添加了切换图源服务器的功能，并添加了“阿林云”

### 0.6.0
  - *添加了群u[早苗](https://github.com/Sanaene)佬的青辉石计算器*
  - *更换了角色评分的数据至6.0*
  - 添加了新角色的卡池和评测
  - 其他小修小补

### 0.5.0
  - *使抽卡模拟器的抽卡结果合并转发，减少刷屏*
  - 其他小修小补

### 0.4.3
  - *使总力记录拆分并合并转发，解决了长消息被风控无法发送的问题*
  - *新增了攻略功能，引用bawiki的攻略图，集成了常用攻略*
  - 其他小修小补

### 0.4.0、0.4.1、0.4.2
  - **这几个版本未正确构建和导入库。下载后无法启用，如果强行更改版本号会损坏koishi。若安装了请前往数据文件夹的node_modules目录，找到本插件安装lodashi，如果koishi炸了请参考论坛的解决方案**

### 0.3.3
  - 修0.3.2开发中的bug

### 0.3.2
  - *更新玲纱数据*
  - *添加了礼物查询*
  - 尝试合并转发功能
  - 修复已知bug，小修小补

### 0.3.1 
  - 添加了保底算法
  - 修复已知bug
  - 其他小修小补

### 0.3.0
  - *添加了群友[早苗](https://github.com/Sanaene)大佬的总力战模拟插件，tql*
  - *添加了两个服的十连抽卡功能，但未添加保底算法*
  - 修改了抽卡模拟器部分学生头像无法显示的问题

### 0.1.3和0.1.4
  - 修复抽卡模拟器不能显示图片的问题，将学生头像图片集成于插件
  - 评测系统中添加了学生名字
  - 摸了一整个五一的鱼（
  
### 0.1.1
  - 缩小了返回图片大小

### 0.1.0
  - 发包！拥有角色评测图功能、抽卡模拟功能
