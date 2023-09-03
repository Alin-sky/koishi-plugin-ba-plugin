import { mika_model } from "./models";
import { maki_model } from "./models";
import { akane_model } from "./models";
import { ui_model } from "./models";
import { ako_model } from "./models";
import { himari_model } from "./models";
import { binah_model } from "./models";
import { Student } from "./class";
import { Boss } from "./class";
import { Action } from "./class";
import { caused_dmg_correct } from "./calculation";
import _ from "lodash";


// 游戏主体函数
export function raid49() {
  // 导入已经建好的模型
  let mika = _.cloneDeep(mika_model);
  let maki = _.cloneDeep(maki_model);
  let akane = _.cloneDeep(akane_model);
  let ui = _.cloneDeep(ui_model); 
  let ako = _.cloneDeep(ako_model);
  let himari = _.cloneDeep(himari_model);
  let binah = _.cloneDeep(binah_model);
  // 游戏主体
  // 游戏限制时长
  const total_time: number = 180;
  // 初始化游戏时间
  let game_time: number = 0;
  // 初始化费用，默认6人队满编，每人700cost回复力
  let cost: number = 0;
  let cost_rate: number = 6 * 700;
  // 基本属性加成生效，更新角色属性，并记录初始基础属性
  mika.update_status();
  mika.status.record();
  maki.update_status();
  maki.status.record();
  akane.update_status();
  akane.status.record();
  ui.update_status();
  ui.status.record();
  // 装备属性加成生效，计入buff栏
  for (let i = 0; i < 3; i++) {
    mika.buff.push(mika.equipments[i].status);
    maki.buff.push(maki.equipments[i].status);
    akane.buff.push(akane.equipments[i].status);
    ui.buff.push(ui.equipments[i].status);
  }
  // 后排属性加成，按亚子日鞠20好感度t7顶配专1专2计算，计入buff栏
  mika.buff.push({"hp_max_plus": 3690 + 4780, "defence_plus": 4 + 28, "atk_plus": 320 + 445, "healing_plus": 495 + 339});
  maki.buff.push({"hp_max_plus": 3690 + 4780, "defence_plus": 4 + 28, "atk_plus": 320 + 445, "healing_plus": 495 + 339});
  akane.buff.push({"hp_max_plus": 3690 + 4780, "defence_plus": 4 + 28, "atk_plus": 320 + 445, "healing_plus": 495 + 339});
  ui.buff.push({"hp_max_plus": 3690 + 4780, "defence_plus": 4 + 28, "atk_plus": 320 + 445, "healing_plus": 495 + 339});
  // 初始化记录本，用于记录战斗数据
  let notebook : any[] = [];
  // 日鞠发动sub skill
  cost_rate = 6 * 700 * 1.202;
  notebook.push(`游戏时间${game_time.toFixed(2)}：日鞠发动了技能「超天才清楚系病弱美少女の真骨頂」：cost回复力增加20.2%。`);
  // 亚子发动sub skill
  mika.buff.push({"critical_dmg_multi": 0.173});
  maki.buff.push({"critical_dmg_multi": 0.173});
  akane.buff.push({"critical_dmg_multi": 0.173});
  ui.buff.push({"critical_dmg_multi": 0.173});
  notebook.push(`游戏时间${game_time.toFixed(2)}：亚子发动了技能「サポートはお任せください」：我方全体暴击伤害增加17.3%。`);
  // mika发动passive skill
  mika.buff.push(mika.skills[2].buff);
  notebook.push(`游戏时间${game_time.toFixed(2)}：${mika.name}发动了技能「${mika.skills[2].name}」：${mika.name}的攻击力增加26.6%，贯通特效增加49.4%。`);
  // mika发动sub skill
  mika.buff.push(mika.skills[3].buff);
  notebook.push(`游戏时间${game_time.toFixed(2)}：${mika.name}发动了技能「${mika.skills[3].name}」：${mika.name}造成伤害增加24.2%，受到伤害减少12.1%，所有伤害必定暴击。`);
  // maki发动passive skill
  let maki_atk_speed_rate = (10000 + 2660) * (1 + 0.266) / 10000;
  maki.attack.atk_duration /= maki_atk_speed_rate;
  maki.attack.atk_delay /= maki_atk_speed_rate;
  maki.attack.reload_start_delay /= maki_atk_speed_rate;
  maki.attack.reload_end_delay /= maki_atk_speed_rate;
  maki.attack.reload_duration /= maki_atk_speed_rate;
  notebook.push(`游戏时间${game_time.toFixed(2)}：${maki.name}发动了技能「${maki.skills[2].name}」：${maki.name}的攻击速度增加2660 + 26.6%。`);
  // akane发动passive skill
  akane.buff.push(akane.skills[2].buff);
  notebook.push(`游戏时间${game_time.toFixed(2)}：${akane.name}发动了技能「${akane.skills[2].name}」：${akane.name}的移动增加26.6%，HP增加6713。`);
  // ui发动passive skill
  ui.buff.push(ui.skills[2].buff);
  notebook.push(`游戏时间${game_time.toFixed(2)}：${ui.name}发动了技能「${ui.skills[2].name}」：${ui.name}的暴击值增加190 + 26.6%。`);
  // binah发动4技能
  mika.buff.push({"accuracy_multi": -0.2, "stability_multi": -0.5});
  maki.buff.push({"accuracy_multi": -0.2, "stability_multi": -0.5});
  akane.buff.push({"accuracy_multi": -0.2, "stability_multi": -0.5});
  ui.buff.push({"accuracy_multi": -0.2, "stability_multi": -0.5});
  notebook.push(`游戏时间${game_time.toFixed(2)}：${binah.name}发动了技能「吹き荒れる砂塵」：我方全体命中值减少20%，安定值减少50%。`);
  // 更新状态值
  mika.status.update_buff_status(mika.buff);
  maki.status.update_buff_status(maki.buff);
  akane.status.update_buff_status(akane.buff);
  ui.status.update_buff_status(ui.buff);
  binah.status.update_buff_status(binah.buff);
  // 初始化普攻计数器
  let mika_atk_count: number = 0;
  let maki_atk_count: number = 0;
  let akane_atk_count: number = 0;
  let ui_atk_count: number = 0;
  // 初始化行动列表
  let action_list: any[] = [];
  // 初始化buff计时列表
  let buff_check: any[] = [];
  // 初始化自律技能计数、计时与控制节点
  let mika_basic_count: number = 0;
  let mika_basic_skill_on: boolean = true;
  let akane_sub_limit_count: number = 0;
  // 初始化技能轴节点
  let [s1, s2, s3, s4, s5, s6, s7, s8]: Boolean[] = [true, true, true, true, true, true, true, true];
  // 初始化大蛇控制器
  let binah_ctrl: any[] = [];
  let binah_groggy_count: number = 0;
  let binah_dizzied_count: number = 0;
  let binah_dizzied_on: boolean = true;
  let binah_to2: boolean = true;
  let binah_to3: boolean = true ;
  let start3: boolean = false;
  let [s9, s10, s11, s12]: boolean[] = [true, true, true, true];
  // 定义状态更新函数
  function status_update(target: Student | Boss, target_buff: any ): void {
    target.status.reset_status();
    target.status.update_buff_status(target_buff);
  }
  // 定义行动函数
  // 定义攻击类函数，自变量为action，返回修正后的实际伤害值
  function attack(action: Action) {
    if (action.receiver instanceof Boss && action.initiator instanceof Student) {
      let damage: number = action.content(action.initiator.status.atk);
      let damage_correct: number = caused_dmg_correct(action.initiator, action.receiver, Math.random(), Math.random(), Math.random());
      let special_correct: number = 1;
      if (action.name === mika.skills[0].name) {
        special_correct = 1 + action.receiver.status.hp_now / action.receiver.status.hp_max * 0.7;
      }
      let damage_real: number = damage * damage_correct * special_correct;
      action.receiver.status.hp_now -= damage_real;
      notebook.push(`游戏时间${action.act_time.toFixed(2)}s：${action.initiator.name}对${action.receiver.name}发动了「${action.name}」，造成了${damage_real.toFixed(0)}点伤害，伤害触发时间：${action.effect_time.toFixed(2)}s。`);
      notebook.push(`游戏时间${action.act_time.toFixed(2)}s：binah当前血量${binah.status.hp_now.toFixed(0)}`);
      return damage_real;
    } else {
      return 0;
    }
  }
  // 定义buff函数
  // 定义上buff函数，自变量为action，返回该buff是否被刷新
  function add_buff(action: Action): boolean {
    let buff = action.content;
    let index: number = action.receiver.buff.indexOf(buff);
    if (index > -1) {
      notebook.push(`游戏时间${action.act_time.toFixed(2)}：${action.initiator.name}对${action.receiver.name}发动了技能「${action.name}」，buff生效时间：${action.effect_time.toFixed(2)}s，持续时间：${action.duration}s。`);
      return true;
    } else {
      action.receiver.buff.push(buff);
      notebook.push(`游戏时间${action.act_time.toFixed(2)}：${action.initiator.name}对${action.receiver.name}发动了技能「${action.name}」，buff生效时间：${action.effect_time.toFixed(2)}s，持续时间：${action.duration}s。`);
      return false;
    }
  }
  // 定义移除buff函数，自变量为action，无返回值
  function remove_buff(action: Action): void {
    let buff = action.content
    let index: number = action.receiver.buff.indexOf(buff);
    if (index > -1) {
      action.receiver.buff.splice(index, 1);
      notebook.push(`游戏时间${game_time.toFixed(2)}s：「${action.name}」已失效。`);
    }
  }
  // 游戏正式开始
  while(mika.status.hp_now > 0 && binah.status.hp_now > 0 && game_time <= total_time){
    // 定义时间跳动周期
    const t: number = 0.005;
    // 从游戏第2秒开始增长cost，最多不超过10
    if (game_time >= 2) {
      cost += t * cost_rate / 10000;
    }
    if (cost >= 10){
      cost = 10;
    }
    // 定义字典比较函数
    function isEqual(obj1: object, obj2: object): boolean {
      const entries1 = Object.entries(obj1).sort();
      const entries2 = Object.entries(obj2).sort();
      
      if (entries1.length !== entries2.length) {
        return false;
      }
      
      return entries1.every(([key, value]) => Object.is(value, obj2[key]));
    }
    
    // 进行行动处理
    let action_list_copy = action_list;
    let buff_check_copy = buff_check;
    if (action_list_copy.length > 0) {
      for (let a of action_list_copy) {
        if (game_time >= a.effect_time) {
          if (a.id === "damage") {
            let d: number = attack(a);
            binah_groggy_count += d;
          } else if (a.id === "buff") {
            let mark: boolean = add_buff(a);
            if (isEqual(a.content, {"atk_multi": 1.05})){
              let index: number = a.receiver.buff.indexOf(ui.skills[0].buff);
              if (index > -1) {
                a.receiver.buff.splice(index, 1);
                for (let i = 0; i < buff_check.length; i++) {
                  if (isEqual(buff_check[i].content, ui.skills[0].buff)) {
                    buff_check.splice(i, 1);
                    notebook.push(`游戏时间${game_time.toFixed(2)}s：忧的ex技能buff被日鞠的ex技能buff顶掉了。`);
                    break;
                  }
                } 
              }
            }
            if (isEqual(a.content, ui.skills[0].buff)){
              let index: number = a.receiver.buff.indexOf({"atk_multi": 1.05});
              if (index > -1) {
                a.receiver.buff.splice(index, 1);
                for (let i = 0; i < buff_check.length; i++) {
                  if (isEqual(buff_check[i].content, {"atk_multi": 1.05})) {
                    buff_check.splice(i, 1);
                    notebook.push(`游戏时间${game_time.toFixed(2)}s：日鞠的ex技能buff被忧的ex技能buff顶掉了。`);
                    break;
                  }
                } 
              }
            }
            if (mark) {
              for (let i = 0; i < buff_check.length; i++) {
                if (isEqual(buff_check[i].content, a.content)){
                  buff_check.splice(i, 1);
                }
              }
            }
            buff_check.push(a);
          }
          let index: number = action_list.indexOf(a);
          action_list.splice(index, 1);
        }
      }
    }
    if (buff_check_copy.length > 0) {
      for (let b of buff_check_copy) {
        if (game_time >= b.effect_time + b.duration) {
          remove_buff(b);
          let index: number = buff_check.indexOf(b);
          buff_check.splice(index, 1);
        }
      }
    }
  
    // mika自律攻击
    if (game_time >= mika.atk_time) {
      mika_atk_count += 1;
      action_list.push(new Action(mika, binah, "普通攻击", "damage", mika.attack.rate_func1, game_time, game_time + mika.attack.atk_duration, 0));
      if (mika_atk_count % mika.properties.reload_count === 0) {
        mika.atk_time += mika.attack.reload_start_delay + mika.attack.reload_duration + mika.attack.reload_end_delay;
        notebook.push(`游戏时间${game_time.toFixed(2)}s：未花换弹中...`);
      } else {
        mika.atk_time += mika.attack.atk_delay + mika.attack.atk_duration;
        mika_basic_skill_on = true;
      }
    }
    // mika basic skill
    if (mika_atk_count % 5 === 0 && mika_atk_count !== 0 && mika_basic_skill_on) {
      mika_basic_count += 1;
      if (mika_basic_count % 3 === 0) {
        action_list.push(new Action(mika, binah, "强化版" + mika.skills[1].name, "damage", mika.skills[1].damage_rate2, 
          game_time + mika.attack.atk_delay, game_time + mika.attack.atk_delay + mika.skills[1].duration, 0));
      } else {
        action_list.push(new Action(mika, binah, mika.skills[1].name, "damage", mika.skills[1].damage_rate1, 
          game_time + mika.attack.atk_delay, game_time + mika.attack.atk_delay + mika.skills[1].duration, 0));
      }
      mika.atk_time += mika.skills[1].duration + mika.skills[1].delay;
      mika_basic_skill_on = false;
    }
    // maki自律攻击
    if (game_time >= maki.atk_time) {
      maki_atk_count += 1;
      if (binah.buff.includes(maki.skills[1].debuff)){
        action_list.push(new Action(maki, binah, "普通攻击", "damage", maki.attack.rate_func2, game_time, game_time + maki.attack.atk_duration, 0));
      } else {
        action_list.push(new Action(maki, binah, "普通攻击", "damage", maki.attack.rate_func1, game_time, game_time + maki.attack.atk_duration, 0));
      }
      if (maki_atk_count % maki.properties.reload_count === 0) {
        maki.atk_time += maki.attack.reload_start_delay + maki.attack.reload_duration + maki.attack.reload_end_delay;
        notebook.push(`游戏时间${game_time.toFixed(2)}s：真纪换弹中...`);
      } else {
        maki.atk_time += maki.attack.atk_delay + maki.attack.atk_duration;
      }
    }
    // maki basic skill
    if (game_time >= maki.basic_time) {
      action_list.push(new Action(maki, binah, maki.skills[1].name, "buff", maki.skills[1].debuff, game_time,
        game_time + maki.skills[1].duration, 15));
      maki.atk_time += maki.skills[1].duration + maki.skills[1].delay;
      maki.basic_time = game_time + 25;
    }
    // akane自律攻击
    if (game_time >= akane.atk_time) {
      akane_atk_count += 1;
      action_list.push(new Action(akane, binah, "普通攻击", "damage", akane.attack.rate_func1, game_time, game_time + akane.attack.atk_duration, 0));
      // akane的sub skill判定
      if (Math.random() <= 0.1 && akane_atk_count >= akane_sub_limit_count){
        action_list.push(new Action(akane, binah, akane.skills[3].name, "buff", akane.skills[3].debuff, game_time,
          game_time + akane.skills[3].duration, 30));
        akane_sub_limit_count = akane_atk_count + 5;
      } 
      if (akane_atk_count % akane.properties.reload_count === 0) {
        akane.atk_time += akane.attack.reload_start_delay + akane.attack.reload_duration + akane.attack.reload_end_delay;
        notebook.push(`游戏时间${game_time.toFixed(2)}s：茜换弹中...`);
      } else {
        akane.atk_time += akane.attack.atk_delay + akane.attack.atk_duration;
      }
    }
    // akane basic skill
      if (game_time >= akane.basic_time) {
        action_list.push(new Action(akane, binah, akane.skills[1].name, "damage", akane.skills[1].damage_rate1, game_time, game_time + akane.skills[1].duration, 0))
        akane.atk_time += akane.skills[1].duration + akane.skills[1].delay
        akane.basic_time = game_time + 40
      }
    // ui自律攻击
    if (game_time >= ui.atk_time) {
      ui_atk_count += 1;
      action_list.push(new Action(ui, binah, "普通攻击", "damage", ui.attack.rate_func1, game_time, game_time + ui.attack.atk_duration, 0));
      if (ui_atk_count % ui.properties.reload_count === 0) {
        ui.atk_time += ui.attack.reload_start_delay + ui.attack.reload_duration + ui.attack.reload_end_delay;
        notebook.push(`游戏时间${game_time.toFixed(2)}s：忧换弹中...`);
      } else {
        ui.atk_time += ui.attack.atk_delay + ui.attack.atk_duration;
      }
    }
    // ui basic skill
    if (game_time >= ui.basic_time) {
      action_list.push(new Action(ui, mika, ui.skills[1].name, "buff", ui.skills[1].buff, game_time,
        game_time + ui.skills[1].duration, 33));
      action_list.push(new Action(ui, maki, ui.skills[1].name, "buff", ui.skills[1].buff, game_time,
        game_time + ui.skills[1].duration, 33));
      action_list.push(new Action(ui, akane, ui.skills[1].name, "buff", ui.skills[1].buff, game_time,
        game_time + ui.skills[1].duration, 33));
      action_list.push(new Action(ui, ui, ui.skills[1].name, "buff", ui.skills[1].buff, game_time,
        game_time + ui.skills[1].duration, 33));
      ui.atk_time += ui.skills[1].duration + ui.skills[1].delay;
      ui.basic_time = game_time + 40;
    }
   
    // 更新状态
    status_update(mika, mika.buff);
    status_update(maki, maki.buff);
    status_update(akane, akane.buff);
    status_update(ui, ui.buff);
    status_update(binah, binah.buff);
    
    // 运行技能轴
    if (cost >= 6.4 + 0.2 * Math.random() && s1){
      // ui ex
      cost -= 3;
      action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time,
        game_time + ui.skills[0].duration, 33));
      ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
      s1 = false; 
    }
    if (cost >= 9.8 + 0.2 * Math.random() && s2 && !s1){
      // ako ex
      cost -= 3;
      action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff",
        {"critical_multi": 0.395, "critical_dmg_multi": 0.733}, game_time, game_time + 1.5, 16));
      s2 = false;
    }
    if (cost >= 8.5 + 0.1 * Math.random() && s3 && !s2){
      // mika himari ex
      cost -= 6;
      action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika.skills[0].damage_rate1, game_time,
        game_time + mika.skills[0].duration, 0));
      action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", {"atk_multi": 1.05}, game_time,
        game_time + 1.5, 15.47));
      mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
      s3 = false;
    }
    if (cost >= 2 && s4 && !s3){
      // akane ex
      cost -= 2;
      action_list.push(new Action(akane, binah, akane.skills[0].name, "damage", akane.skills[0].damage_rate1, game_time,
                              game_time + akane.skills[0].duration, 0));
      action_list.push(new Action(akane, binah, akane.skills[0].name, "buff", akane.skills[0].debuff, game_time,
                              game_time + akane.skills[0].duration, 30));
      akane.atk_time += akane.skills[0].duration + akane.skills[0].delay;
      s4 = false;
    }
    if (cost >= 3.9 + 0.2 * Math.random() && s5 && !s4){
      // ui ex
      cost -= 3;
      action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time,
        game_time + ui.skills[0].duration, 33));
      ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
      s5 = false; 
    }
    if (cost >= 9 + 0.5 * Math.random() && s6 && !s5){
      // mika ako himari ex
      cost -= 9;
      action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff",
        {"critical_multi": 0.395, "critical_dmg_multi": 0.733}, game_time, game_time + 1.5, 16));
      action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", {"atk_multi": 1.05}, game_time,
        game_time + 1.5, 15.47));
      action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika.skills[0].damage_rate1, game_time,
        game_time + mika.skills[0].duration, 0));
      mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
      s6 = false;
    }
    if (cost >= 2.0 + 0.2 * Math.random() && s7 && !s6){
      // akane ex
      cost -= 2;
      action_list.push(new Action(akane, binah, akane.skills[0].name, "damage", akane.skills[0].damage_rate1, game_time,
                              game_time + akane.skills[0].duration, 0));
      action_list.push(new Action(akane, binah, akane.skills[0].name, "buff", akane.skills[0].debuff, game_time,
                              game_time + akane.skills[0].duration, 30));
      akane.atk_time += akane.skills[0].duration + akane.skills[0].delay;
      s7 = false;
    }
    if (mika_atk_count % 5 == 0 && cost >= 3 + 0.4 * Math.random() && s8 && !s7){
      // mika ex
      action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika.skills[0].damage_rate1, game_time,
        game_time + mika.skills[0].duration, 0));
      mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
      s8 = false;
    }
  
    // 大蛇状态
    // 大蛇眩晕
    if (binah_groggy_count >= binah.status.groggy_gauge && binah_dizzied_on) {
      binah_ctrl.push(["dizzied", game_time, game_time + binah.status.groggy_duration]);
      binah_dizzied_count += 1;
      notebook.push(`游戏时间${game_time.toFixed(2)}：binah进入了虚弱状态。`);
      binah_dizzied_on = false;
      binah_to2 = false;
      binah_to3 = false;
      if (binah_dizzied_count === 1) {
        binah_ctrl.push(["in_skill", game_time + binah.status.groggy_duration + 4.9,
          game_time + binah.status.groggy_duration + 19.9]);
      }
    }
    // 大蛇解除眩晕
    if (binah_ctrl.length > 0){
      for (let item of binah_ctrl) {
        if (item[0] === "dizzied") {
          binah_to2 = false;
          binah_to3 = false;
          if (game_time >= item[2]){
            notebook.push(`游戏时间${game_time.toFixed(2)}：binah解除了虚弱状态。`);
            let index: number = binah_ctrl.indexOf(item);
            binah_ctrl.splice(index, 1);
            binah_groggy_count = 0;
            binah_dizzied_on = true;
            if (binah_dizzied_count === 1) {
              binah_to2 = true;
              binah_to3 = true;
            } else if (binah_dizzied_count === 2) {
              binah_to3 = true;
            }
          }
        } else if (item[0] === "in_skill") {
          if (game_time >= item[1] && game_time < item[2]) {
            binah_to2 = false;
            } else if (game_time >= item[2]) {
              let index: number = binah_ctrl.indexOf(item);
              binah_ctrl.splice(index, 1);
              if (binah_ctrl.length > 0){
                binah_to2 = false;
              } else {
                binah_to2 = true;
            }
          }
        }
      }
    }
    // 大蛇转场
    if (binah.status.hp_now > 1500000 && binah.status.hp_now <= 4000000 && binah_to2) {
      if (game_time > 40 && game_time < 60) {
        notebook.push(`战斗时间：${game_time.toFixed(2)}：转场2阶段，凹分失败`);
      }
      if (game_time >= 60) {
        notebook.push(`战斗时间：${game_time.toFixed(2)}：转场2阶段，凹分失败`);
      }
      break;
    }
    if (binah.status.hp_now > 0 && binah.status.hp_now <= 1500000 && binah_to3) {
      notebook.push(`战斗时间：${game_time.toFixed(2)}：binah进入了3阶段，将会继续输出至游戏结束。`);
      binah_to3 = false;
      mika.atk_time += 5.8;
      maki.atk_time += 3.4;
      akane.atk_time += 2.8;
      ui.atk_time += 4.5;
      start3 = true;
    }
  
    // 3阶段后的补刀措施：
    if (start3) {
      if (cost >= 3 + 0.2 * Math.random() && s9 && !s8) {
        // ako ex
        cost -= 3;
        action_list.push(new Action(ako, mika, "「偵察データを共有します」", "buff",
          {"critical_multi": 0.395, "critical_dmg_multi": 0.733}, game_time, game_time + 1.5, 16));
        s9 = false;
      }
      if (cost >= 3 + 0.2 * Math.random() && s10 && !s9) {
        // ui ex
        cost -= 3;
        action_list.push(new Action(ui, mika, ui.skills[0].name, "buff", ui.skills[0].buff, game_time,
          game_time + ui.skills[0].duration, 33));
        ui.atk_time += ui.skills[0].duration + ui.skills[0].delay;
        s10 = false; 
      }
      if (cost >= 3 + 0.2 * Math.random() && s11 && !s10) {
        // himari ex
        cost -= 3;
        action_list.push(new Action(himari, mika, "実力をお見せしましょう」", "buff", {"atk_multi": 1.05}, game_time,
          game_time + 1.5, 15.47));
        s11 = false;
      }
      if (cost >= 3 + 0.2 * Math.random() && s12 && !s11) {
        // mika ex
        action_list.push(new Action(mika, binah, mika.skills[0].name, "damage", mika.skills[0].damage_rate1, game_time,
          game_time + mika.skills[0].duration, 0));
        mika.atk_time += mika.skills[0].duration + mika.skills[0].delay;
        s12 = false;
      }
    }
          
    // 更新状态
    status_update(mika, mika.buff);
    status_update(maki, maki.buff);
    status_update(akane, akane.buff);
    status_update(ui, ui.buff);
    status_update(binah, binah.buff);
    
    // 跳跃到下一个时间点
    game_time += t;
  }
  
    // 判断游戏结果
    if (binah.status.hp_now <= 0) {
      notebook.push("VICTORY！");
      notebook.push(`游戏时间${game_time.toFixed(2)}`);
      notebook.push("正在结算分数......");
      game_time += 0.25;
      const time_score: number = - 12800 * game_time + 9216000;
      const score: number = 6800000 + 10145600 - 12800 * game_time + 9216000;
      notebook.push("Battle Complete");
      notebook.push(`タイムスコア:${time_score.toFixed(0)}`);
      notebook.push("ボスの残りHPスコア:10145600");
      notebook.push("難易度スコア:6800000");
      notebook.push(`ランキングPt${score.toFixed(0)}取集獲得`);
    } else if (mika.status.hp_now <= 0 || game_time >= total_time) {
      notebook.push("游戏结束，学生失败！");
    }
    // 定义给记录内容分行的操作函数（实际是忘记加换行符了）
    function divide(notebook: any[]): any[] {
        let book: string[] = [];
        for (let i of notebook) {
            book.push(i + "\n");
        }
        return book;
    }
    // 战斗记录都在notebook里
    return divide(notebook);
  }



// 定义删减记录内容中所有普通攻击及其boss血量的函数
export function simplify(notebook : any[]): any[] {
  let notebook_copy: any[] = [notebook[0]];
  for (let i = 1; i < notebook.length; i++) {
    if (!notebook[i].includes("普通攻击")) {
      if (notebook[i].includes("当前血量") && notebook[i-1].includes("普通攻击") || notebook[i].includes("换弹中")) {
        continue;
      } else {
        notebook_copy.push(notebook[i]);
      }
    }
  }
  return notebook_copy;

} 
// 定义支持内容文字分割的函数
export function cut_twenty(notebook: any[]): any[] {
  let notebook_copy: any[] = notebook;
  let l = notebook_copy.length;
  let result = [[], [], [], [], []];
  let a = Math.floor(l / 35);
  if (l !== 0) {
    for (let i = 0; i <= 33; i++) {
      let note = [];
      for (let j = i*a; j < (i+1)*a; j++){
        note.push(notebook_copy[j])
      }
      result[i] = note;
      note = [];    
    }
    let note = [];
    for (let i = 34*a; i < l; i++){
      note.push(notebook_copy[i])
    }
    result[34] = note;
  }
  return result;
}
