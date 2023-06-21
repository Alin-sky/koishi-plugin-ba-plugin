/*图形处理模块*/
import fs from 'fs'
import path from 'path'
import Jimp from 'jimp'
export module gachaImage {
    async function stuCardMaker(stat, cardtemp, RPool, SRPool) {
        let cardStar
        let cardStar2
        console.log(RPool)
        if (RPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            cardStar = await Jimp.read(path.resolve(__dirname, '../../assets/☆card.png'))
            cardStar2 = await Jimp.read(path.resolve(__dirname, '../../assets/card☆1.png'))
        } else if (SRPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            cardStar = await Jimp.read(path.resolve(__dirname, '../../assets/☆☆card.png'))
            cardStar2 = await Jimp.read(path.resolve(__dirname, '../../assets/card☆2.png'))
        } else {
            cardStar = await Jimp.read(path.resolve(__dirname, '../../assets/☆☆☆card.png'))
            cardStar2 = await Jimp.read(path.resolve(__dirname, '../../assets/card☆3.png'))
        }
        return await headMaker(stat, cardStar, cardStar2, cardtemp)
    }
    //头像处理
    async function headMaker(stat, cardStar, cardStar2, cardtemp) {
        let stuImage
        if (stat == -1) { stuImage = await Jimp.read(cardtemp.avatar) }
        else { stuImage = await Jimp.read(path.resolve(__dirname, '../../assets/Student/' + cardtemp.name + '.png')) }
        const MARGIN = await Jimp.read(path.resolve(__dirname, '../../assets/margin.png'))
        const TEMPIMAGE = await cardStar.scan(0, 0, cardStar.getWidth(), cardStar.getHeight(), function (_x, _y, index) {
            bitmapMaker(cardStar, stuImage.resize(cardStar.getWidth(), cardStar.getHeight()), index)
        }).composite(cardStar2, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.9,
            opacityDest: 1,
        }).composite(MARGIN, 0, 0)
        TEMPIMAGE.writeAsync(path.resolve(__dirname, '../../assets/temp/' + cardtemp.name + '.png'))
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
        const FONT = await Jimp.loadFont(path.resolve(__dirname, '../../assets/font/ArialBlack.fnt'));
        const FONT2 = await Jimp.loadFont(path.resolve(__dirname, '../../assets/font/BA2.fnt'));
        const GACHABG = await Jimp.read(path.resolve(__dirname, '../../assets/gachaBG.png'));
        let tempCard = await Jimp.read(path.resolve(__dirname, '../../assets/☆card.png'))
        let stuPromises = cardArray.map(async (cardtemp) => {
            if (stat === -1) {
                return await Jimp.read((await stuCardMaker(stat, cardtemp, RPool, SRPool)).get('buffer'))
            } else {
                let stuCard
                if (fs.existsSync(path.resolve(__dirname, '../../assets/temp/' + cardtemp.name + '.png'))) {
                    stuCard = await Jimp.read(path.resolve(__dirname, '../../assets/temp/' + cardtemp.name + '.png'))
                } else {
                    stuCard = await Jimp.read((await stuCardMaker(stat, cardtemp, RPool, SRPool)).get('buffer'))
                }
                if (cardtemp.pickup) {
                    return await Jimp.read((await setPickUp(stuCard, FONT)).get('buffer'))
                } else {
                    return await Jimp.read(path.resolve(__dirname, '../../assets/temp/' + cardtemp.name + '.png'))
                }
            }
        })
        await Promise.all(stuPromises).then(async (img) => {
            if (cardArray.length === 1) {
                let width = (GACHABG.getWidth() - tempCard.getWidth()) / 2
                let height = (GACHABG.getHeight() - tempCard.getHeight()) / 2
                img.forEach((img) => { GACHABG.composite(img, width, height) })
            } else if (cardArray.length === 10) {
                let width = (GACHABG.getWidth() - (tempCard.getWidth() * 5)) / 2
                let height1 = GACHABG.getHeight() / 4 - tempCard.getHeight() / 2
                let height2 = GACHABG.getHeight() / 2 - tempCard.getHeight() / 3
                img.forEach((img, index) => {
                    if (index < 5) {
                        GACHABG.composite(img, width + tempCard.getWidth() * index, height1)
                    } else {
                        GACHABG.composite(img, width + tempCard.getWidth() * (index - 5), height2)
                    }
                })
            }
        })
        return new Map().set('buffer', (await GACHABG.print(FONT2, GACHABG.getWidth() - 250, GACHABG.getHeight() - 140, stat).getBase64Async(Jimp.MIME_PNG)))
    }
}