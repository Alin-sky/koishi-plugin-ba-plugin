/*图形处理模块*/
import fs from 'fs'
import path from 'path'
import Jimp from 'jimp'
import { alincloud } from '../ba-alin'
export module gachaImage {
    const MAX_RETRIES = 3
    async function stuCardMaker(stat, cardtemp, RPool, SRPool) {
        let CARDSTAR
        let CARDSTAR2
        if (RPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            CARDSTAR = alincloud + 'stuimg' + '/assets/☆card.png'
            CARDSTAR2 = alincloud + 'stuimg' + '/assets/card☆1.png'
        } else if (SRPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            CARDSTAR = alincloud + 'stuimg' + '/assets/☆☆card.png'
            CARDSTAR2 = alincloud + 'stuimg' + '/assets/card☆2.png'
        } else {
            CARDSTAR = alincloud + 'stuimg' + '/assets/☆☆☆card.png'
            CARDSTAR2 = alincloud + 'stuimg' + '/assets/card☆3.png'
        }
        let cardStar = await getImage(CARDSTAR)
        let cardStar2 = await getImage(CARDSTAR2)
        return await headMaker(stat, cardStar, cardStar2, cardtemp)
    }
    //头像处理
    async function headMaker(stat, cardStar, cardStar2, cardtemp) {
        let stuImage
        const MARGIN = alincloud + 'stuimg' + '/assets/margin.png'
        if (stat == -1) { stuImage = await Jimp.read(cardtemp.avatar) }
        else {
            const STUIMAGEURL = alincloud + 'stuimg' + '/assets/Student/' + cardtemp.name + '.png'
            stuImage = await getImage(STUIMAGEURL)
        }
        let margin = await getImage(MARGIN)
        const TEMPIMAGE = await cardStar.scan(0, 0, cardStar.getWidth(), cardStar.getHeight(), function (_x, _y, index) {
            bitmapMaker(cardStar, stuImage.resize(cardStar.getWidth(), cardStar.getHeight()), index)
        }).composite(cardStar2, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.9,
            opacityDest: 1,
        }).composite(margin, 0, 0)
        TEMPIMAGE.writeAsync(path.resolve(__dirname, '../assets/temp/' + cardtemp.name + '.png'))
        return new Map().set('buffer', (await TEMPIMAGE.getBufferAsync(Jimp.MIME_PNG)))
    }
    //位图处理
    function bitmapMaker(CARDSTAR1, CARDSTAR3, index) {
        const PACITY1 = CARDSTAR1.bitmap.data[index + 3]
        if (PACITY1 === 0) {
            return
        } else {
            const PACITY3 = CARDSTAR3.bitmap.data[index + 3]
            if (PACITY3 !== 0) {
                const [r, g, b] = [
                    CARDSTAR3.bitmap.data[index],
                    CARDSTAR3.bitmap.data[index + 1],
                    CARDSTAR3.bitmap.data[index + 2]
                ]
                CARDSTAR1.bitmap.data[index] = r;
                CARDSTAR1.bitmap.data[index + 1] = g;
                CARDSTAR1.bitmap.data[index + 2] = b;
                CARDSTAR1.bitmap.data[index + 3] = PACITY3;
            }
        }
    }
    //UP标签
    async function setPickUp(stuCard, font) {
        return new Map().set('buffer', (await stuCard.print(font, 15, -10, "Pick Up!").getBufferAsync(Jimp.MIME_PNG)))
    }
    //结算图
    export async function result(cardArray, stat, RPool, SRPool) {
        const GACHABG = alincloud + 'stuimg' + '/assets/gachaBG.png'
        const TEMPCARD = alincloud + 'stuimg' + '/assets/☆card.png'
        const FONT = await Jimp.loadFont(path.resolve(__dirname, '../font/ArialBlack.fnt'))
        const FONT2 = await Jimp.loadFont(path.resolve(__dirname, '../font/BA2.fnt'))
        let gachaBG = await getImage(GACHABG)
        let tempCard = await getImage(TEMPCARD)
        let stuPromises = cardArray.map(async (cardtemp) => {
            if (stat === -1) {
                return await Jimp.read((await stuCardMaker(stat, cardtemp, RPool, SRPool)).get('buffer'))
            } else {
                let stuCard
                if (fs.existsSync(path.resolve(__dirname, '../assets/temp/' + cardtemp.name + '.png'))) {
                    stuCard = await Jimp.read(path.resolve(__dirname, '../assets/temp/' + cardtemp.name + '.png'))
                } else {
                    stuCard = await Jimp.read((await stuCardMaker(stat, cardtemp, RPool, SRPool)).get('buffer'))
                }
                if (cardtemp.pickup) {
                    return await Jimp.read((await setPickUp(stuCard, FONT)).get('buffer'))
                } else {
                    return await Jimp.read(path.resolve(__dirname, '../assets/temp/' + cardtemp.name + '.png'))
                }
            }
        })

        await Promise.all(stuPromises).then(async (img) => {
            if (cardArray.length === 1) {
                let width = (gachaBG.getWidth() - tempCard.getWidth()) / 2
                let height = (gachaBG.getHeight() - tempCard.getHeight()) / 2
                img.forEach((img) => { gachaBG.composite(img, width, height) })
            } else if (cardArray.length === 10) {
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
            }
        })
        return new Map().set('buffer', (await gachaBG.print(FONT2, gachaBG.getWidth() - 250, gachaBG.getHeight() - 140, stat).getBase64Async(Jimp.MIME_PNG)))
    }
    //获取url图片
    async function getImage(imageUrl, retries = 0) {
        try {
            const image = await Jimp.read(imageUrl);
            return image;
        } catch (error) {
            if (retries < MAX_RETRIES) {
                console.error(`获取不到图片：(${imageUrl}),重试中...`, error);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return getImage(imageUrl, retries + 1);
            } else {
                throw new Error(` 重试 ${MAX_RETRIES}次后依旧获取不到图片(${imageUrl})`);
            }
        }
    }
}
