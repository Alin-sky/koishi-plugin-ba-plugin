## QQbot MD模板配置详情

#### 由于近期tx禁止了纯参数的md模板，所以得适配多模板的情况

#### 情况1：还有纯参数的md模板
##### 需要填满第一个列表才能开启MD功能
| MDid| MD参数1 |MD参数2 |MD参数3 |MD参数4 |
| :------------ | :------------ |:------------ |:------------ |:----------- |
| 填入mdid| 参数1是第一段文字 |参数2是第二段文字| 参数3是[img]  | 参数4是图片链接  |

---
#### 情况2：只有带文字的md模板了
##### 需要填满三个列表的必填参数才能开启MD功能
##### 情况2需要三个不同的md模板，分别适用于攻略、总力和大决战、抽卡
| MDid| MD参数1 |MD参数2 |MD参数3 |MD参数4 |
| :------------ | :------------ |:------------ |:------------ |:----------- |
| 攻略的mdid| 参数1是图片url，**必填** | 参数2是标题，选填 |   |   |
| 总力和大决战的mdid| 参数1是支持的功能，选填 |    |     |     |
| 抽卡的mdid| 参数1是图片url，**必填** |  参数2是抽取的卡池，选填  |  参数3是获得的母猪石，选填   |     |
---
##### 攻略的md模板提审实例：
```
# 这是攻略内容
> 点击按钮查看
![img #720px #480px]({{.url}})
```
url是md参数1

---
##### 总力和大决战的md模板提审实例：
```
# 目前支持查询{{.text}}
> 点击按钮查看
```
text是md参数1

---
##### 抽卡的md模板提审实例：
```
# 正在抽{{.text1}}的池子
> 获得母猪石：{{.text2}}
![img#1024px #600px]({{.url}})
```
url是md参数1
text1是md参数1
text2是md参数2

# 看不懂?  嫌烦?  没有MD模板？
## 那不如直接添加[AL_1S](https://qun.qq.com/qunpro/robot/qunshare?robot_uin=2854197266&robot_appid=102062652&biz_type=0)😽


### ❤️支持

#### [爱发电，感谢所有赞助咪😽](https://afdian.net/a/alin-sky)