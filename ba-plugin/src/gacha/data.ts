/*数据模块*/
export async function getData(ctx, apiurl) {
    return await ctx.http.get(apiurl)
}
export async function getHeadUrl(ctx, url, retries = 0) {
    const MAX_RETRIES = 3
    while (retries < MAX_RETRIES) {
        try {
            let nextResult = await ctx.http.get(url)
            return macthNextPage(nextResult)
        } catch (error) {
            retries++
            if (retries == MAX_RETRIES) console.error(`重试${MAX_RETRIES}次后失败，请检查URL`)
        }
    }
}
//匹配A标签
export function macthTagA(result: string) {
    const regex = new RegExp(`<a\\s+[^>]*?href="([^"]*)"[^>]*?>.*?<\\/a>`, "g")//匹配<a href="xxx">里的xxx
    return result.match(regex)//全部<a>
}
//匹配有指定title的a里的href
export function macthTable(match, name) {
    const titleRegex = /title="([^"]*)"/
    const hrefRegex = /href="([^"]*)"/
    let result
    match.forEach((res) => { if (res.match(titleRegex) !== null && res.match(titleRegex)[1] === name) result = res.match(hrefRegex)[1] })
    return result
}
//匹配学生头像链接
export function macthNextPage(result: string) {
    const divRegex = new RegExp(`<div\\s+class="swiper-container gallery-top"[^>]*?>[\\s\\S]*?<\\/div>`, 'g')
    const imgRegex = /<img\s+[^>]*?\bsrc="([^"]*)"[^>]*?>/
    let match: any[]
    while ((match = divRegex.exec(result)) !== null) {
        const div = match[0]
        const matchImg = imgRegex.exec(div)
        if (matchImg && matchImg[1]) {
            const ImgSrc = matchImg[1]
            return ImgSrc
        }
    }
}
//例外映射表
export const wikiToSchale = {
    "初音未来（联动）": "初音未来",
    "优香（体操服）": "优香(运动服)",
    "玛丽（体操服）": "玛丽(运动服)",
    "莲见（体操服）": "莲见(运动服)",
    "花绘": "花江",
    "花绘（圣诞）": "花江(圣诞)",
    "晴奈（体操服）": "晴奈(运动服)",
    "康娜": "叶渚",
    "菫": "堇",
    "朱音": "茜",
    "朱音（兔女郎）": "茜(兔女郎)",
    "美祢": "美弥",
    "白子（骑行）": "白子(单车)",
    "缘里": "紫草",
    "南": "弥奈",
    "巴": "智惠",
    "玛丽娜": "玛利娜",
    "实梨": "实里",
    "梅露": "芽瑠",
    "朱莉": "茱莉"
}