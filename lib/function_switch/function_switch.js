"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
exports.func_switch = func_switch;
const koishi_1 = require("koishi");
exports.inject = { required: ['canvas', 'database'] };
const logg = "ba-plugin-func_switch";
const log = new koishi_1.Logger(logg);
async function func_switch(ctx, config) {
    ctx.model.extend('bap_fswith', {
        id: 'string',
        guild_id: 'integer',
        gacha: 'string',
        manga: 'string',
    });
}
//先预留，之后看情况写
