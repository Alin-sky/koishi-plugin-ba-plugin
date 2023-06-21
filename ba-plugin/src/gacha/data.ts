/*数据初始化模块*/
/*可能实现功能，爬取Wiki角色列表自动更新,大流程：获取schaleDB最新的数据并保存；读取数据添加到数据库*/
class stu {
    name: string;
    rare: number;
    limit: number;
    server: number;
    constructor(name: string, rare: number, limit: number, server: number) {
        this.name = name;
        this.rare = rare;
        this.limit = limit;
        this.server = server;
    }
}
function createStu(name: string, rare: number, limit: number, server: number) {
    return new stu(name, rare, limit, server);
}
//国际服实装    
let InterStudentPool = [
    createStu("白子", 3, 0, 0), createStu("芹香", 2, 0, 0), createStu("星野", 3, 0, 0), createStu("绫音", 2, 0, 0), createStu("佳代子", 2, 0, 0), createStu("阿露", 3, 0, 0), createStu("千夏", 1, 0, 0), createStu("伊织", 3, 0, 0),
    createStu("日奈", 3, 0, 0), createStu("淳子", 2, 0, 0), createStu("泉", 3, 0, 0), createStu("明里", 2, 0, 0), createStu("晴奈", 3, 0, 0), createStu("枫香", 2, 0, 0), createStu("日富美", 3, 0, 0), createStu("好美", 1, 0, 0),
    createStu("爱莉", 2, 0, 0), createStu("芹娜", 1, 0, 0), createStu("莲见", 2, 0, 0), createStu("鹤城", 3, 0, 0), createStu("明日奈", 1, 0, 0), createStu("朱音", 2, 0, 0), createStu("花凛", 3, 0, 0), createStu("尼禄", 3, 0, 0),
    createStu("晴", 2, 0, 0), createStu("真希", 3, 0, 0), createStu("柯托莉", 1, 0, 0), createStu("歌原", 2, 0, 0), createStu("响", 3, 0, 0), createStu("优香", 2, 0, 0), createStu("堇", 3, 0, 0), createStu("菲娜", 1, 0, 0),
    createStu("椿", 2, 0, 0), createStu("千世", 2, 0, 0), createStu("纱绫", 3, 0, 0), createStu("瞬", 3, 0, 0), createStu("野宫", 2, 1, 0), createStu("艾米", 3, 0, 0), createStu("花绘", 2, 0, 0), createStu("睦月", 2, 0, 0),
    createStu("遥香", 1, 0, 0), createStu("朱莉", 1, 0, 0), createStu("志美子", 1, 0, 0), createStu("铃美", 1, 0, 0), createStu("小玉", 1, 0, 0), createStu("真白", 3, 0, 0), createStu("泉奈", 3, 0, 0), createStu("静子", 2, 0, 0),
    createStu("爱丽丝", 3, 0, 0), createStu("桃井", 2, 0, 0), createStu("绿", 3, 0, 0), createStu("切里诺", 3, 0, 0), createStu("和香", 1, 1, 0), createStu("柚子", 3, 0, 0), createStu("梓", 3, 0, 0), createStu("花子", 2, 0, 0),
    createStu("小春", 3, 0, 0), createStu("梓(泳装)", 3, 2, 0), createStu("真白(泳装)", 3, 2, 0), createStu("鹤城(泳装)", 1, 1, 0), createStu("日富美(泳装)", 3, 0, 0), createStu("日奈(泳装)", 3, 2, 0), createStu("伊织(泳装)", 3, 2, 0), createStu("泉(泳装)", 1, 1, 0),
    createStu("白子(骑行)", 3, 0, 0), createStu("桐乃", 2, 0, 0), createStu("瞬(幼女)", 3, 0, 0), createStu("纱绫(私服)", 3, 0, 0), createStu("尼禄(兔女郎)", 3, 2, 0), createStu("花凛(兔女郎)", 3, 2, 0), createStu("明日奈(兔女郎)", 3, 0, 0), createStu("夏", 3, 0, 0),
    createStu("玛丽", 2, 0, 0), createStu("初音未来(联动)", 3, 2, 0), createStu("亚子", 3, 0, 0), createStu("切里诺(温泉)", 3, 0, 0), createStu("千夏(温泉)", 3, 0, 0), createStu("巴", 1, 1, 0), createStu("和香(温泉)", 3, 0, 0), createStu("阿露(正月)", 3, 2, 0),
    createStu("睦月(正月)", 3, 2, 0), createStu("芹香(正月)", 3, 0, 0), createStu("吹雪", 1, 1, 0), createStu("若藻", 3, 2, 0), createStu("濑名", 3, 0, 0), createStu("千寻", 3, 0, 0), createStu("三森", 3, 0, 0), createStu("忧", 3, 0, 0),
    createStu("日向", 3, 0, 0), createStu("玛丽娜", 3, 0, 0), createStu("咲", 3, 0, 0), createStu("宫子", 3, 0, 0), createStu("美游", 3, 0, 0), createStu("枫", 3, 0, 0), createStu("伊吕波", 3, 0, 0), createStu("满", 1, 1, 0),
    createStu("月咏", 3, 0, 0), createStu("美咲", 3, 0, 0), createStu("日和", 3, 0, 0), createStu("亚津子", 3, 0, 0), createStu("野宫(泳装)", 3, 0, 0), createStu("若藻(泳装)", 3, 0, 0), createStu("绫音(泳装)", 1, 1, 0), createStu("星野(泳装)", 3, 2, 0),
    createStu("静子(泳装)", 1, 1, 0), createStu("泉奈(泳装)", 3, 2, 0), createStu("千世(泳装)", 3, 2, 0), createStu("纱织", 3, 0, 0), createStu("萌绘", 3, 0, 0), createStu("和纱", 3, 0, 0), createStu("心奈", 3, 0, 0), createStu("歌原(应援团)", 3, 0, 0),
    createStu("诺亚", 3, 0, 0), createStu("响(应援团)", 1, 1, 0), createStu("朱音(兔女郎)", 3, 0, 0), createStu("优香(体操服)", 3, 2, 0), createStu("玛丽(体操服)", 3, 2, 0), createStu("莲见(体操服)", 1, 1, 0), createStu("日鞠", 3, 0, 0), createStu("时雨", 3, 0, 0),
    createStu("芹娜(圣诞)", 3, 0, 0), createStu("花绘(圣诞)", 3, 0, 0)
]
//国际服未实装  定期更新数组
let JPStudentPool = [
    createStu("晴奈(正月)", 3, 2, 1), createStu("淳子(正月)", 1, 1, 1), createStu("枫香(正月)", 3, 2, 1), createStu("美弥", 3, 0, 1), createStu("未花", 3, 2, 1), createStu("惠", 3, 0, 1),
    createStu("康娜", 3, 0, 1), createStu("樱子", 3, 0, 1), createStu("时", 3, 2, 1), createStu("渚", 3, 2, 1), createStu("小雪", 3, 0, 1), createStu("佳代子(正月)", 3, 0, 1), createStu("遥香(正月)", 3, 0, 1), createStu("果穗", 3, 0, 1),
    createStu("时(兔女郎)", 3, 0, 1), createStu("柚子(女仆)", 1, 1, 0), createStu("爱丽丝(女仆)", 3, 0, 1), createStu("玲纱", 3, 0, 1), createStu("瑠美", 3, 0, 1), createStu("南", 3, 0, 1), createStu("实里", 3, 0, 1)
]
export let StudentPool = InterStudentPool.concat(JPStudentPool)