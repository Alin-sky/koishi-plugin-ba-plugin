/*图形处理模块*/
import fs from 'fs'
import path from 'path'
import { alincloud } from '../ba-alin'
import { createCanvas, loadImage } from 'canvas'
export module gachaImage {
    const MAX_RETRIES = 3
    //结算图
    export async function result(ctx, cardArray, stat, RPool, SRPool) {
        const gachaBG = alincloud + 'stuimg/assets/gachaBG.png';
        const star = encodeURIComponent('☆');
        const tempCard = alincloud + 'stuimg/assets/' + star + 'Card.png';
        let BG = await getImage(gachaBG);
        let card = await getImage(tempCard);
        const canvas = createCanvas(BG.width, BG.height);
        const context = canvas.getContext('2d');
        context.drawImage(BG, 0, 0);
        let stuPromises = await Promise.all(cardArray.map(async (cardtemp) => {
            let stuCard
            if (stat === -1) {
                const ImgUrl = cardtemp.avatar;
                stuCard = (await stuCardMaker(stat, cardtemp, RPool, SRPool, ImgUrl)).get('buffer');

            } else {
                if (fs.existsSync(path.join(__dirname, '..', 'assets', 'temp' + cardtemp.name + '.png'))) {
                    console.log(path.join(__dirname, '..', 'assets', 'temp' + cardtemp.name + '.png'));
                    let photo = await loadImage(path.join(__dirname, '..', 'assets', 'temp' + cardtemp.name + '.png'));
                    const photoCanvas = createCanvas(photo.width, photo.height);
                    stuCard = photoCanvas.toBuffer();
                } else {
                    const stuData = await ctx.database.get('student', { name: cardtemp.name });
                    const ImgUrl = 'https:' + stuData[0].url
                    stuCard = (await stuCardMaker(stat, cardtemp, RPool, SRPool, ImgUrl)).get('buffer');
                }
                if (cardtemp.pickup) {
                    const dataUrl = 'data:image/png;base64,' + stuCard.toString('base64');
                    const image = await loadImage(dataUrl);
                    const canvasUP = createCanvas(card.width, card.height);
                    const contextUP = canvasUP.getContext('2d');
                    contextUP.drawImage(image, 0, 0);
                    contextUP.save();
                    contextUP.font = 'bold italic 35px Arial';
                    contextUP.shadowColor = 'rgba(0, 0, 0, 1)';
                    contextUP.shadowBlur = 5;
                    contextUP.strokeStyle = '#000000';
                    contextUP.lineWidth = 5;
                    contextUP.strokeStyle = "#000000";
                    contextUP.fillStyle = "#ffffff";
                    contextUP.fillText("Pick Up!", 0, 35);
                    contextUP.restore();
                    stuCard = canvasUP.toBuffer('image/png');
                }
            }
            return stuCard
        }))
        stuPromises.forEach(async (img, index) => {
            const dataUrl = 'data:image/png;base64,' + img.toString('base64');
            const image = await loadImage(dataUrl);
            if (cardArray.length === 1) {
                let width = (BG.width - card.width) / 2;
                let height = (BG.height - card.height) / 2;
                context.drawImage(image, width, height);
            } else if (cardArray.length === 10) {
                let width = (BG.width - (card.width * 5)) / 2;
                let height1 = BG.height / 4 - card.height / 2;
                let height2 = BG.height / 2 - card.height / 3;
                if (index < 5) {
                    context.drawImage(image, width + card.width * index, height1);
                } else {
                    context.drawImage(image, width + card.width * (index - 5), height2);
                }
            }
        });
        context.font = 'bold 35px Arial';
        context.fillStyle = "#ffffff";
        context.fillText(stat, BG.width - 250, BG.height - 100);
        return new Map().set('buffer', canvas.toBuffer('image/png').toString('base64'));
    }
    async function stuCardMaker(stat, cardtemp, RPool, SRPool, ImgUrl) {
        console.log(ImgUrl)
        let cardStar;
        let cardStar2;
        let star = encodeURIComponent('☆');
        if (RPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            cardStar = alincloud + 'stuimg' + '/assets/' + star + 'card.png';
            cardStar2 = alincloud + 'stuimg' + '/assets/card' + star + '1.png';
        } else if (SRPool.some((item: { name: any; }) => item.name === cardtemp.name)) {
            cardStar = alincloud + 'stuimg' + '/assets/' + star + star + 'card.png';
            cardStar2 = alincloud + 'stuimg' + '/assets/card' + star + '2.png';
        } else {
            cardStar = alincloud + 'stuimg' + '/assets/' + star + star + star + 'card.png';
            cardStar2 = alincloud + 'stuimg' + '/assets/card' + star + '3.png';
        }
        let card = await getImage(cardStar);
        let card2 = await getImage(cardStar2);
        return await headMaker(stat, card, card2, ImgUrl, cardtemp);
    }
    //头像处理
    async function headMaker(stat, cardStar, cardStar2, ImgUrl, cardtemp) {
        let stuImage;
        const MARGIN = alincloud + 'stuimg' + '/assets/margin.png';
        if (stat == -1) {
            stuImage = await loadImage(ImgUrl)
        } else {
            stuImage = await getImage(ImgUrl);
        }
        let margin = await getImage(MARGIN);
        const tempCanvas = createCanvas(cardStar.width, cardStar.height);
        const tempContext = tempCanvas.getContext('2d');
        const tempContext2 = tempCanvas.getContext('2d');
        tempContext.drawImage(cardStar, 0, 0, cardStar.width, cardStar.height);
        const imageData1 = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        tempContext2.drawImage(stuImage, 0, 0, cardStar.width, cardStar.height);
        const imageData2 = tempContext2.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        for (let i = 0; i < imageData1.data.length; i += 4) {
            const alpha1 = imageData1.data[i + 3];
            const alpha2 = imageData2.data[i + 3];

            if (alpha1 > 0 && alpha2 > 0) {
                imageData1.data[i] = imageData2.data[i];
                imageData1.data[i + 1] = imageData2.data[i + 1];
                imageData1.data[i + 2] = imageData2.data[i + 2];
                imageData1.data[i + 3] = alpha2;
            }
        }
        tempContext.putImageData(imageData1, 0, 0);
        tempContext.globalCompositeOperation = 'source-over';
        tempContext.globalAlpha = 0.9;
        tempContext.drawImage(cardStar2, 0, 0, cardStar2.width, cardStar2.height);
        tempContext.drawImage(margin, 0, 0, cardStar.width, cardStar.height);
        const save = fs.createWriteStream(path.resolve(__dirname, `../assets/temp/${cardtemp.name}.png`));
        const stream = tempCanvas.createPNGStream();
        stream.pipe(save);
        const bufferData = tempCanvas.toBuffer('image/png').toString('base64');
        const resultMap = new Map().set('buffer', bufferData);
        new Promise((resolve) => {
            save.on('finish', () => {
                resolve(resultMap);
            });
        });
        return new Map().set('buffer', bufferData);
    }
    //获取url图片
    async function getImage(imageUrl, retries = 0) {
        try {
            let image = await loadImage(imageUrl);
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
