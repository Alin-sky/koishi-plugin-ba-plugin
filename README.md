
<div align="center">
  <h1> koishi-plugin-ba-plugin
  </h1>
<br>     
 <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/logo2.png" width="145" height="196">
<br>

[![npm](https://img.shields.io/npm/v/koishi-plugin-ba-plugin?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-ba-plugin)
<h1>koishi插件，bluearchive-碧蓝档案工具箱</h1> 

</div>



## 功能

<details>
<summary> 抽卡模拟器 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/ba.png" width="700" >
</details>

<details>
<summary> 角色评分，攻略图查询 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/gl.png" width="700">
</details>

<details>
<summary> 千里眼 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/qly.png" width="700">
</details>

<details>
<summary> 总力模拟（0.10已关闭） </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/zl.png" width="700">
</details>

<details>
<summary> 随机漫画和表情 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/mh.png" width="700">
</details>

<details>
<summary> 青辉石计算器 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/zz.png" width="700">
</details>

<details>
<summary> 升级计算器 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/sj.png" width="700">
</details>

<details>
<summary> 好感度需求计算器 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/hg.png" width="700">
</details>

<details>
<summary> 计算内容转图片 </summary>
   <img src="https://github.com/Alin-sky/koishi-plugin-ba-plugin/blob/main/Data%20for%20warehouses/puppe.png" width="700">
</details>

## 使用方法
在koishi内使用“帮助”指令查询使用方法喵


## 介绍
### **我正在学代码，这个项目相当于练手和学习的工程，肯定有很多不完善、不规范的地方，还请各位大佬轻喷**

还在不断开发新功能

这个是[koishi](https://github.com/koishijs/koishi)机器人的插件，需要在koishi的插件市场安装

我会不断更新这个项目

交互和功能设计灵感借鉴了[arona](https://github.com/diyigemt/arona)
和[NoneBot-Plugin-BAWiki](https://github.com/lgc-NB2Dev/nonebot-plugin-bawiki)

感谢各位巨佬的指导🙏<br/>
感谢各位巨佬帮忙测试🙏<br/>
感谢巨佬的[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库🙏

### ba聊天水群：662889478，快来卷总力(bushi

数据目前来源于[bawiki](https://ba.gamekee.com/entry)和[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)

---
## 感谢（按首字母排序）
| 贡献者                                                       | 主要贡献                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [diyigemt](https://github.com/diyigemt)           | 开放了API，提供了[Arona](https://github.com/diyigemt/arona)数据 |
| [エルル](https://github.com/erurusion)  |抽卡模拟、抽群u等功能                                              |
| [lgc-NB2Dev](https://github.com/lgc-NB2Dev) | 提供[ba-wiki](https://github.com/lgc-NB2Dev/bawiki-data)数据库 |
| [Sanaene](https://github.com/Sanaene)      | 攒钻计算、好感计算、等级计算、总力模拟的算法                                           |
                         
---

## 更新日志
<!-- (eruru的大致更新内容：井字棋(beta版) 抽卡模拟器功能调整，移除Jimp依赖，改用canvas实现图片处理)，
抽卡模拟器增加了无参数时不响应，减少意外触发指令刷屏的可能，重构了指令，优化指令的体验，并减少了指令的数量(下一步，实现抽卡模拟器数据全自动更新，实现抽卡模拟器学生别名) -->

### 0.10.1
  - 修复了渲染图图标错误的bug

### 0.10.0
  - *添加了puppeteer依赖*
  - *添加了将好感计算、攒钻、升级的输出转图片的功能，并支持自定义样式，提供了三个样式*
  - 添加了自定义模糊匹配回复文本
  - 优化调用，可发送“千里眼”直接返回国际服千里眼图
  - 例行更新数据
  - 早苗的计算功能改动：
    - 好感计算修改了微量的文字
    - 攒钻更新到日服最近的运动会二期复刻活动，更新了计算代码，增加了日期检测，防倒算，以及缺少信息的报错
  - ~~早苗关闭了总力模拟功能~~



### 0.9.75-rc
  - *添加了抽卡功能开关*
  - 减少了攻略系统别名（[issue](https://github.com/Alin-sky/koishi-plugin-ba-plugin/issues/10)）
  - 添加了自定义撤回时间
  - [e佬](https://github.com/erurusion)修复koishi数据库更新引起的bug
  - 例行更新数据

### 0.9.6-rc
  - *添加了抽卡功能群组黑名单*

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
