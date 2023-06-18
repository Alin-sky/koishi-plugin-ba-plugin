/*图片处理*/
import fs from 'fs'
import path from 'path'
import Jimp from 'jimp'
//学生头像处理 
async function stuCardmaker(card, RPool, SRPool) {
    if (RPool.some((item: { name: any; }) => item.name === card)) {
        const CARDSTAR1 = await Jimp.read(path.resolve(__dirname, '../assets/☆card.png'))
        const CARDSTAR2 = await Jimp.read(path.resolve(__dirname, '../assets/card☆1.png'))
        return await cardmaker(CARDSTAR1, CARDSTAR2, card)
    } else if (SRPool.some((item: { name: any; }) => item.name === card)) {
        const CARDSTAR1 = await Jimp.read(path.resolve(__dirname, '../assets/☆☆card.png'))
        const CARDSTAR2 = await Jimp.read(path.resolve(__dirname, '../assets/card☆2.png'))
        return await cardmaker(CARDSTAR1, CARDSTAR2, card)
    } else {
        const CARDSTAR1 = await Jimp.read(path.resolve(__dirname, '../assets/☆☆☆card.png'))
        const CARDSTAR2 = await Jimp.read(path.resolve(__dirname, '../assets/card☆3.png'))
        return await cardmaker(CARDSTAR1, CARDSTAR2, card)
    }
    //头像处理
    async function cardmaker(CARDSTAR1, CARDSTAR2, card) {
        let cache = new Map()
        const CARDSTAR3 = await Jimp.read(path.resolve(__dirname, '../assets/Student/' + card + '.png'))
        const CARDSTAR4 = await Jimp.read(path.resolve(__dirname, '../assets/margin.png'))
        const composedImage = await CARDSTAR1.scan(0, 0, CARDSTAR1.getWidth(), CARDSTAR1.getHeight(), function (_x, _y, index) {
            head(CARDSTAR1, CARDSTAR3.resize(CARDSTAR1.getWidth(), CARDSTAR1.getHeight()), index)
        }).composite(CARDSTAR2, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.9,
            opacityDest: 1,
        }).composite(CARDSTAR4, 0, 0)
        composedImage.writeAsync(path.resolve(__dirname, '../assets/temp/' + card + '.png'))
        const BUFFER = await composedImage.getBufferAsync(Jimp.MIME_PNG)
        cache.set('buffer1', BUFFER)
        return cache
    }
    //位图处理
    function head(CARDSTAR1, CARDSTAR3, index) {
        const pacity1 = CARDSTAR1.bitmap.data[index + 3]
        if (pacity1 === 0) {
            return
        } else {
            const pacity3 = CARDSTAR3.bitmap.data[index + 3]
            if (pacity3 !== 0) {
                const [r, g, b] = [
                    CARDSTAR3.bitmap.data[index],
                    CARDSTAR3.bitmap.data[index + 1],
                    CARDSTAR3.bitmap.data[index + 2]
                ]
                CARDSTAR1.bitmap.data[index] = r;
                CARDSTAR1.bitmap.data[index + 1] = g;
                CARDSTAR1.bitmap.data[index + 2] = b;
                CARDSTAR1.bitmap.data[index + 3] = pacity3;
            }
        }
    }
}
//添加UP标签
async function setpickup(stuCard, font) {
    let cache = new Map()
    const buffer = await stuCard.print(font, 15, -10, "Pick Up!").getBufferAsync(Jimp.MIME_PNG)
    cache.set('buffer2', buffer)
    return cache
}
//单抽结算图 
export async function gachaImageOne(_temporary, cardArray, stat, RPool, SRPool) {
    let outputImage = new Map()
    const CARD = cardArray[0].name
    const PICKUP = cardArray[0].pickup
    const FONT = await Jimp.loadFont(path.resolve(__dirname, '../assets/font/ArialBlack.fnt'))
    const FONT2 = await Jimp.loadFont(path.resolve(__dirname, '../assets/font/BA2.fnt'))
    let gachaBG = await Jimp.read(path.resolve(__dirname, '../assets/gachaBG.png'))
    const ISEXIST = fs.existsSync(path.resolve(__dirname, '../assets/temp/' + CARD + '.png'))
    if (ISEXIST) {//存在
        var stuCard = await Jimp.read(path.resolve(__dirname, '../assets/temp/' + CARD + '.png'))
    } else {
        let cache = await stuCardmaker(CARD, RPool, SRPool)
        var stuCard = await Jimp.read(cache.get('buffer1'))
    }
    if (PICKUP) {
        let cache2 = await setpickup(stuCard, FONT)
        var stuCard2 = await Jimp.read(cache2.get('buffer2'))
    } else {
        var stuCard2 = stuCard
    }
    let width = (gachaBG.getWidth() - stuCard2.getWidth()) / 2
    let height = (gachaBG.getHeight() - stuCard2.getHeight()) / 2
    const BUFFER = await gachaBG.composite(stuCard2, width, height).print(FONT2, gachaBG.getWidth() - 250, gachaBG.getHeight() - 140, stat).getBase64Async(Jimp.MIME_PNG)
    outputImage.set('buffer3', BUFFER)
    return outputImage
}
//十连结算图 
export async function gachaImageTen(_temporary, cardArray, stat, RPool, SRPool) {
    let cache = new Map()
    let outputImage = new Map()
    const FONT = await Jimp.loadFont(path.resolve(__dirname, '../assets/font/ArialBlack.fnt'))
    const FONT2 = await Jimp.loadFont(path.resolve(__dirname, '../assets/font/BA2.fnt'))
    let gachaBG = await Jimp.read(path.resolve(__dirname, '../assets/gachaBG.png'))
    let tempCard = await Jimp.read(path.resolve(__dirname, '../assets/☆card.png'))
    let stuPromises = cardArray.map(async (cardtemp) => {
        let card = cardtemp.name
        const PICKUP = cardtemp.pickup
        const ISEXIST = fs.existsSync(path.resolve(__dirname, '../assets/temp/' + card + '.png'))
        let stuCard
        if (ISEXIST) {
            stuCard = await Jimp.read(path.resolve(__dirname, '../assets/temp/' + card + '.png'))
        } else {
            cache = await stuCardmaker(card, RPool, SRPool)
            stuCard = await Jimp.read(cache.get('buffer1'))
        }
        if (PICKUP) {
            let cache2 = await setpickup(stuCard, FONT)
            return await Jimp.read(cache2.get('buffer2'))
        } else {
            let pathtemp = '../assets/temp/' + card + '.png'
            return await Jimp.read(path.resolve(__dirname, pathtemp))
        }
    })
    await Promise.all(stuPromises).then(async (img) => {
        let width = (gachaBG.getWidth() - (tempCard.getWidth() * 5)) / 2
        let height1 = gachaBG.getHeight() / 4 - tempCard.getHeight() / 2
        let height2 = gachaBG.getHeight() / 2 - tempCard.getHeight() / 3
        img.forEach((img, index) => {
            if (index < 5) {
                gachaBG.composite(img, width + tempCard.getWidth() * index, height1)
            } else {
                gachaBG.composite(img, width + tempCard.getWidth() * (index - 5), height2)
            }
        })
    })
    const BUFFER = await gachaBG.print(FONT2, gachaBG.getWidth() - 250, gachaBG.getHeight() - 140, stat).getBufferAsync(Jimp.MIME_PNG)
    outputImage.set('buffer3', BUFFER)
    return outputImage
}
