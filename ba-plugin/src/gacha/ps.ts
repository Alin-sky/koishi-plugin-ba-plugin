/*图形处理模块*/
import fs from 'fs'
import path from 'path'
import { alincloud } from '../ba-alin'
import { Context } from 'koishi'
import { BaAssetsPath } from '.'
export module gachaImage {
    /*
     * 结算图
     * 参数说明
     * 
     * ctx - 上下文实例
     * stat - 累计抽卡次数
     * cardArray - 抽卡结果
     * RPool - 1星池
     * SRPool - 2星池
     */
    export async function result(ctx: Context, cardArray: any[], stat, RPool: any[], SRPool: any[]) {
        const star = encodeURIComponent('☆')
        const BGPath = path.join(BaAssetsPath, 'gachaBG.png')
        const cardPath = path.join(BaAssetsPath, star + 'Card.png')
        const BG = await getImage(ctx, BGPath)
        const card = await getImage(ctx, cardPath)
        const canvas = ctx.canvas.createCanvas(BG.width, BG.height)
        const context = canvas.getContext('2d')
        context.drawImage(BG, 0, 0)
        //处理每个结算卡片
        let stuPromises = await Promise.all(cardArray.map(async (cards) => {
            let stuCard
            const stuData = await ctx.model.get('stu_gacha', { name: cards.name })
            let alinUrl = alincloud + 'stuimg' + '/assets/Student/' + encodeURIComponent(cards.name) + '.png'
            let ImgUrl = (stuData[0].url === '' || stuData[0].url === null || stuData[0].url === 'null') ? alinUrl : 'https:' + stuData[0].url
            const imgPath = path.join(ctx.baseDir, 'data', 'assets', 'ba-plugin', 'temp', cards.name + '.png')
            if (stuData.length == 0) console.error('数据库没有' + cards.name)
            if (fs.existsSync(imgPath)) stuCard = (await ctx.canvas.loadImage(imgPath)).src
            else stuCard = (await stuCardMaker(ctx, cards, RPool, SRPool, ImgUrl, imgPath)).get('buffer')
            if (cards.pickup) {
                const image = await ctx.canvas.loadImage(stuCard)
                const canvasUP = ctx.canvas.createCanvas(card.width, card.height)
                const contextUP = canvasUP.getContext('2d')
                contextUP.drawImage(image, 0, 0)
                contextUP.font = 'bold italic 35px Arial'
                contextUP.shadowColor = 'rgba(0, 0, 0, 1)'
                contextUP.shadowBlur = 5
                contextUP.strokeStyle = '#000000'
                contextUP.lineWidth = 5
                contextUP.strokeStyle = "#000000"
                contextUP.fillStyle = "#ffffff"
                contextUP.fillText("Pick Up!", 0, 35)
                stuCard = canvasUP.toBuffer('image/png')
            }
            return stuCard
        }))
        //绘制到BG上
        for (const [index, img] of stuPromises.entries()) {
            const dataUrl = `data:image/png;base64,${img.toString('base64')}`
            let image = await ctx.canvas.loadImage(dataUrl)
            if (cardArray.length === 1) {
                let width = (BG.width - card.width) / 2
                let height = (BG.height - card.height) / 2
                context.drawImage(image, width, height)
            } else {
                let width = (BG.width - (card.width * 5)) / 2
                let height1 = BG.height / 4 - card.height / 2
                let height2 = BG.height / 2 - card.height / 3
                if (index < 5) context.drawImage(image, width + card.width * index, height1)
                else context.drawImage(image, width + card.width * (index - 5), height2)
            }
        }
        //填上抽卡次数
        context.font = 'bold italic 35px Arial'
        context.fillStyle = "#ffffff"
        context.fillText(stat.toString(), BG.width - 250, BG.height - 100)
        return canvas.toBuffer('image/png')
    }
    /*
     * 卡片合成：根据星级选择结算卡片合成
     * 参数说明
     * 
     * CS - Canvas实例
     * stat - 累计抽卡次数(-1代表非)
     * cardtemp - 单张抽卡结果
     * RPool - 1星池
     * SRPool - 2星池
     */
    async function stuCardMaker(ctx, cardtemp: { name: any }, RPool: any[], SRPool: any[], ImgUrl: string, imgPath: string) {
        let star = encodeURIComponent('☆')
        let number = RPool.some((item: { name: any }) => item.name === cardtemp.name) ? 1 : SRPool.some((item: { name: any }) => item.name === cardtemp.name) ? 2 : 3
        let stars = number === 1 ? star : number === 2 ? star + star : star + star + star
        const cardPath = path.join(BaAssetsPath, stars + 'card.png')
        const cardPath2 = path.join(BaAssetsPath, star + number + '.png')
        let card = await getImage(ctx, cardPath)
        let card2 = await getImage(ctx,  cardPath2)
        return await headMaker(ctx, card, card2, ImgUrl, imgPath)
    }
    /*
    * 头像处理:处理结算卡片合成
    * 参数说明
    * 
    * CS - Canvas实例
    * stat - 累计抽卡次数(-1代表非)
    * cardStar - 卡的背景1
    * cardStar2 - 卡的背景2
    * ImgUrl - 图片地址
    * card - 单张抽卡结果
    */
    async function headMaker(ctx, cardStar, cardStar2, ImgUrl, imgPath) {
        const marginPath = path.join(BaAssetsPath, 'MARGIN.png')
        let margin = await getImage(ctx, marginPath)
        let stuImage = await getImage(ctx,imgPath, ImgUrl )
        const canvas = ctx.canvas.createCanvas(cardStar.width, cardStar.height)
        //位图处理
        const context1 = canvas.getContext('2d')
        context1.drawImage(cardStar, 0, 0, cardStar.width, cardStar.height)
        const imageData1 = context1.getImageData(0, 0, canvas.width, canvas.height)
        const context2 = canvas.getContext('2d')
        context2.drawImage(stuImage, 0, 0, cardStar.width, cardStar.height)
        const imageData2 = context2.getImageData(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < imageData1.data.length; i += 4) {
            const alpha1 = imageData1.data[i + 3]
            const alpha2 = imageData2.data[i + 3]
            if (alpha1 > 0 && alpha2 > 0) {
                imageData1.data[i] = imageData2.data[i]
                imageData1.data[i + 1] = imageData2.data[i + 1]
                imageData1.data[i + 2] = imageData2.data[i + 2]
                imageData1.data[i + 3] = alpha2
            }
        }
        context1.putImageData(imageData1, 0, 0)
        //包装头像
        context1.globalCompositeOperation = 'source-over'
        context1.drawImage(cardStar2, 0, 0, cardStar2.width, cardStar2.height)
        context1.drawImage(margin, 0, 0, cardStar.width, cardStar.height)
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(imgPath, buffer)
        return new Map().set('buffer', buffer)
    }
}
/*
* 获取url图片
* 参数说明
* CS - Canvas实例
* imageUrl - url图片来源
* imgPath - 图片路径
* retries - 请求次数
*/
export async function getImage(ctx: Context, imgPath, ...args) {
    let retries = 0
    const MAX_RETRIES = 3
    if (fs.existsSync(imgPath)) return await ctx.canvas.loadImage(imgPath)
    while (retries < MAX_RETRIES) {
        try {
            if(args.length<1) throw '没有传入的Url'
            console.log("从" + args[0] + " 读取图片")
            let image = await ctx.canvas.loadImage(args[0])
            fs.writeFileSync(imgPath, image.src)
            return image
        } catch (error) {
            retries++
            await new Promise((resolve) => setTimeout(resolve, 1000))
            if (retries === MAX_RETRIES - 1) throw new Error(` 重试 ${MAX_RETRIES}次后依旧获取不到图片(${args[0]})`)
        }
    }
}