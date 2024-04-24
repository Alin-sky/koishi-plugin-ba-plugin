"use strict";
//sanae’s ba-students-match-systems v2 2023-11
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchArona = exports.StudentMatch = exports.MatchOthers = exports.MatchMapName = exports.MatchStudentName = exports.match_file = void 0;
const guidesys_1 = require("../guide/guidesys");
/*
const ctx = new Context();
const fmp = new FMPS(ctx)
const root_json = rootF("bap-json")
const json = fmp.json_parse(`${root_json}/sms_studata_main.json`)
console.log(json)
*/
const NameData = require(`./sms_studata_main.json`);
exports.match_file = __dirname;
// ————————————————————————————————————————————————————————————————————————————————————————————————————
function DeleteSpace(input) {
    if (typeof input !== 'string') {
        throw new TypeError('DeleteSpace 函数期望一个字符串类型的输入');
    }
    return input.replace(/\s+/g, '');
}
function TransToSmall(input) {
    return input.replace(/[A-Za-z]+/g, match => match.toLowerCase());
}
function TransToHalf(input) {
    input = input.replace(/—+/g, "-");
    let half = "";
    for (const char of input) {
        const insideCode = char.charCodeAt(0);
        if (65281 <= insideCode && insideCode <= 65374) {
            half += String.fromCharCode(insideCode - 65248);
        }
        else {
            half += char;
        }
    }
    return half;
}
function pretreat(input) {
    input = DeleteSpace(input);
    input = TransToHalf(input);
    input = TransToSmall(input);
    return input;
}
function ExactMatchName(input) {
    let result = [];
    input = pretreat(input);
    const ExactNameData = NameData.map(student => {
        const processedStudent = {};
        for (const key in student) {
            if (typeof student[key] === 'string') {
                processedStudent[key] = pretreat(student[key]);
            }
            else if (Array.isArray(student[key])) {
                processedStudent[key] = student[key].map(nickname => pretreat(nickname));
            }
        }
        return processedStudent;
    });
    for (const student of ExactNameData) {
        if (student.FirstName_jp == input) {
            result.push(student.Id);
        }
        if (student.FirstName_zh == input) {
            result.push(student.Id);
        }
        if (student.Name_en == input) {
            result.push(student.Id);
        }
        if (student.Name_jp == input) {
            result.push(student.Id);
        }
        if (student.Name_kr == input) {
            result.push(student.Id);
        }
        if (student.Name_zh_cn == input) {
            result.push(student.Id);
        }
        if (student.Name_zh_ft == input) {
            result.push(student.Id);
        }
        if (student.Name_zh_tw == input) {
            result.push(student.Id);
        }
        for (const name of student.NickName) {
            if (name == input) {
                result.push(student.Id);
            }
        }
    }
    const result_set = new Set(result);
    return Array.from(result_set);
}
function JaccardSimilarity(str1, str2) {
    const arr1 = str1.split('');
    const arr2 = str2.split('');
    const intersectionSize = arr1.filter(item => arr2.includes(item)).length;
    const unionSize = arr1.length + arr2.length - intersectionSize;
    const similarity = intersectionSize / unionSize;
    return similarity;
}
function JaccardFuzzyMatch(input) {
    input = pretreat(input);
    const ExactNameData = NameData.map(student => {
        const processedStudent = {};
        for (const key in student) {
            if (typeof student[key] === 'string') {
                processedStudent[key] = pretreat(student[key]);
            }
            else if (Array.isArray(student[key])) {
                processedStudent[key] = student[key].map(nickname => pretreat(nickname));
            }
        }
        return processedStudent;
    });
    const StudentList = ExactNameData.map(names => {
        const SetStudent = {};
        SetStudent.Id = names.Id;
        let FirstNames = [names.FirstName_jp, names.FirstName_zh];
        const FirstNames_set = new Set(FirstNames);
        SetStudent.FirstNames = Array.from(FirstNames_set);
        let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
        const Names_set = new Set(Names);
        SetStudent.Names = Array.from(Names_set);
        SetStudent.NickNames = names.NickName;
        return SetStudent;
    });
    let results = [];
    for (const student of StudentList) {
        let FirstName_result = 0;
        for (const name of student.FirstNames) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaccardSimilarity(name_nozi, input_nozi);
            if (r > FirstName_result) {
                FirstName_result = r;
            }
        }
        let Name_result = 0;
        for (const name of student.Names) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaccardSimilarity(name_nozi, input_nozi);
            if (r > Name_result) {
                Name_result = r;
            }
        }
        let NickName_result = 0;
        for (const name of student.NickNames) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaccardSimilarity(name_nozi, input_nozi);
            if (r > NickName_result) {
                NickName_result = r;
            }
        }
        results.push([student.Id, FirstName_result, Name_result, NickName_result]);
    }
    let finalResults = [];
    for (const result of results) {
        finalResults.push([result[0], Math.max(result[1], result[2], result[3])]);
    }
    let JaccardResults = [];
    finalResults.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < finalResults.length; i++) {
        if (finalResults[i][1] != 0) {
            JaccardResults[i] = finalResults[i];
        }
    }
    return JaccardResults;
}
function JaroWinklerDistance(str1, str2) {
    function jaroSimilarity(s1, s2) {
        const maxDistance = Math.max(Math.floor(Math.max(s1.length, s2.length) / 2) - 1, 1);
        const matches = new Array(Math.min(s1.length, s2.length)).fill(false);
        let matchCount = 0;
        for (let i = 0; i < s1.length; i++) {
            const start = Math.max(0, i - maxDistance);
            const end = Math.min(i + maxDistance + 1, s2.length);
            for (let j = start; j < end; j++) {
                if (!matches[j] && s1[i] === s2[j]) {
                    matches[j] = true;
                    matchCount++;
                    break;
                }
            }
        }
        if (matchCount === 0) {
            return 0;
        }
        let t = 0;
        let k = 0;
        for (let i = 0; i < s1.length; i++) {
            if (matches[i]) {
                while (!matches[k]) {
                    k++;
                }
                if (s1[i] !== s2[k]) {
                    t++;
                }
                k++;
            }
        }
        return (1 / 3) * (matchCount / s1.length + matchCount / s2.length + (matchCount - t) / matchCount);
    }
    const jaroSimilarityScore = jaroSimilarity(str1, str2);
    const prefixScale = 0.05;
    let prefixLength = 0;
    for (let i = 0; i < Math.min(3, Math.min(str1.length, str2.length)); i++) {
        if (str1[i] === str2[i]) {
            prefixLength++;
        }
        else {
            break;
        }
    }
    return jaroSimilarityScore + prefixLength * prefixScale * (1 - jaroSimilarityScore);
}
function JaroWinklerFuzzyMatch(input) {
    input = pretreat(input);
    const ExactNameData = NameData.map(student => {
        const processedStudent = {};
        for (const key in student) {
            if (typeof student[key] === 'string') {
                processedStudent[key] = pretreat(student[key]);
            }
            else if (Array.isArray(student[key])) {
                processedStudent[key] = student[key].map(nickname => pretreat(nickname));
            }
        }
        return processedStudent;
    });
    const StudentList = ExactNameData.map(names => {
        const SetStudent = {};
        SetStudent.Id = names.Id;
        let FirstNames = [names.FirstName_jp, names.FirstName_zh];
        const FirstNames_set = new Set(FirstNames);
        SetStudent.FirstNames = Array.from(FirstNames_set);
        let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
        const Names_set = new Set(Names);
        SetStudent.Names = Array.from(Names_set);
        SetStudent.NickNames = names.NickName;
        return SetStudent;
    });
    let results = [];
    for (const student of StudentList) {
        let FirstName_result = 0;
        for (const name of student.FirstNames) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaroWinklerDistance(name_nozi, input_nozi);
            if (r > FirstName_result) {
                FirstName_result = r;
            }
        }
        let Name_result = 0;
        for (const name of student.Names) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaroWinklerDistance(name_nozi, input_nozi);
            if (r > Name_result) {
                Name_result = r;
            }
        }
        let NickName_result = 0;
        for (const name of student.NickNames) {
            const zi_input = input.indexOf("子");
            const zi_lib = name.indexOf("子");
            let input_nozi = "";
            let name_nozi = "";
            if (zi_input != -1 && zi_lib != -1 && input !== "子") {
                input_nozi = input.replace("子", '');
                name_nozi = name.replace("子", '');
            }
            else {
                input_nozi = input;
                name_nozi = name;
            }
            let r = JaroWinklerDistance(name_nozi, input_nozi);
            if (r > NickName_result) {
                NickName_result = r;
            }
        }
        results.push([student.Id, FirstName_result, Name_result, NickName_result]);
    }
    let FirstNameResults = new Array(5);
    let NameResults = new Array(5);
    let NickNameResults = new Array(5);
    let possibleFirstNameResults = [];
    let possibleNameResults = [];
    let possibleNickNameResults = [];
    for (const result of results) {
        possibleFirstNameResults.push([result[0], result[1]]);
        possibleNameResults.push([result[0], result[2]]);
        possibleNickNameResults.push([result[0], result[3]]);
    }
    possibleFirstNameResults.sort((a, b) => b[1] - a[1]);
    possibleNameResults.sort((a, b) => b[1] - a[1]);
    possibleNickNameResults.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < 5; i++) {
        if (possibleFirstNameResults[i][1] != 0) {
            FirstNameResults[i] = possibleFirstNameResults[i];
        }
        else {
            FirstNameResults[i] = ["0", 0];
        }
        if (possibleNameResults[i][1] != 0) {
            NameResults[i] = possibleNameResults[i];
        }
        else {
            NameResults[i] = ["0", 0];
        }
        if (possibleNickNameResults[i][1] != 0) {
            NickNameResults[i] = possibleNickNameResults[i];
        }
        else {
            NickNameResults[i] = ["0", 0];
        }
    }
    const filteredFirstNameResults = FirstNameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const filteredNameResults = NameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const filteredNickNameResults = NickNameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const combinedResults_FN = [...filteredFirstNameResults, ...filteredNameResults];
    let finalResults_FN = [];
    function processArray(arr) {
        let processedArray = [];
        for (const [str, num] of arr) {
            let mark = false;
            for (let i = 0; i < processedArray.length; i++) {
                if (str === processedArray[i][0]) {
                    processedArray[i][1] = Math.max((num + processedArray[i][1]) / 2 + 0.1, num, processedArray[i][1]);
                    mark = true;
                }
            }
            if (!mark) {
                processedArray.push([str, num]);
            }
        }
        return processedArray;
    }
    finalResults_FN = processArray(combinedResults_FN);
    finalResults_FN.sort((a, b) => b[1] - a[1]);
    let possibleResults = [];
    const combinedResults_NN = [...finalResults_FN, ...filteredNickNameResults];
    possibleResults = processArray(combinedResults_NN);
    possibleResults.sort((a, b) => b[1] - a[1]);
    let JaroWinklerDistanceResults = [];
    possibleResults.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < possibleResults.length; i++) {
        if (possibleResults[i][1] >= 0.2) {
            JaroWinklerDistanceResults[i] = possibleResults[i];
        }
    }
    return JaroWinklerDistanceResults;
}
function TransToPinyin(input) {
    const zh = require("zh_cn");
    const pinyinArray = zh(input, { style: zh.STYLE_TONE });
    const pinyinString = pinyinArray.map((item) => item).join(' ');
    return pinyinString;
}
function LevenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            dp[i][j] = 0;
        }
    }
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }
    return dp[m][n];
}
function LevenshteinSimilarityScore(s1, s2) {
    const distance = LevenshteinDistance(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);
    const similarityScore = 1 - distance / maxLength;
    return similarityScore;
}
function LevenshteinFuzzyMatch(input) {
    input = TransToPinyin(pretreat(input));
    const ExactNameData = NameData.map(student => {
        const processedStudent = {};
        for (const key in student) {
            if (typeof student[key] === 'string') {
                processedStudent[key] = TransToPinyin(pretreat(student[key]));
            }
            else if (Array.isArray(student[key])) {
                processedStudent[key] = student[key].map(nickname => TransToPinyin(pretreat(nickname)));
            }
        }
        return processedStudent;
    });
    const StudentList = ExactNameData.map(names => {
        const SetStudent = {};
        SetStudent.Id = names.Id;
        let FirstNames = [names.FirstName_jp, names.FirstName_zh];
        const FirstNames_set = new Set(FirstNames);
        SetStudent.FirstNames = Array.from(FirstNames_set);
        let Names = [names.Name_en, names.Name_jp, names.Name_kr, names.Name_zh_cn, names.Name_zh_ft, names.Name_zh_tw];
        const Names_set = new Set(Names);
        SetStudent.Names = Array.from(Names_set);
        SetStudent.NickNames = names.NickName;
        return SetStudent;
    });
    let results = [];
    for (const student of StudentList) {
        let FirstName_result = 0;
        for (const name of student.FirstNames) {
            let r = LevenshteinSimilarityScore(name, input);
            if (r > FirstName_result) {
                FirstName_result = r;
            }
        }
        let Name_result = 0;
        for (const name of student.Names) {
            let r = LevenshteinSimilarityScore(name, input);
            if (r > Name_result) {
                Name_result = r;
            }
        }
        let NickName_result = 0;
        for (const name of student.NickNames) {
            let r = LevenshteinSimilarityScore(name, input);
            if (r > NickName_result) {
                NickName_result = r;
            }
        }
        results.push([student.Id, FirstName_result, Name_result, NickName_result]);
    }
    let FirstNameResults = new Array(5);
    let NameResults = new Array(5);
    let NickNameResults = new Array(5);
    let possibleFirstNameResults = [];
    let possibleNameResults = [];
    let possibleNickNameResults = [];
    for (const result of results) {
        possibleFirstNameResults.push([result[0], result[1]]);
        possibleNameResults.push([result[0], result[2]]);
        possibleNickNameResults.push([result[0], result[3]]);
    }
    possibleFirstNameResults.sort((a, b) => b[1] - a[1]);
    possibleNameResults.sort((a, b) => b[1] - a[1]);
    possibleNickNameResults.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < 5; i++) {
        if (possibleFirstNameResults[i][1] != 0) {
            FirstNameResults[i] = possibleFirstNameResults[i];
        }
        else {
            FirstNameResults[i] = ["0", 0];
        }
        if (possibleNameResults[i][1] != 0) {
            NameResults[i] = possibleNameResults[i];
        }
        else {
            NameResults[i] = ["0", 0];
        }
        if (possibleNickNameResults[i][1] != 0) {
            NickNameResults[i] = possibleNickNameResults[i];
        }
        else {
            NickNameResults[i] = ["0", 0];
        }
    }
    const filteredFirstNameResults = FirstNameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const filteredNameResults = NameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const filteredNickNameResults = NickNameResults.filter(item => !(item[0] === "0" && item[1] === 0));
    const combinedResults_FN = [...filteredFirstNameResults, ...filteredNameResults];
    let finalResults_FN = [];
    function processArray(arr) {
        let processedArray = [];
        for (const [str, num] of arr) {
            let mark = false;
            for (let i = 0; i < processedArray.length; i++) {
                if (str === processedArray[i][0]) {
                    processedArray[i][1] = Math.max(num, processedArray[i][1]);
                    mark = true;
                }
            }
            if (!mark) {
                processedArray.push([str, num]);
            }
        }
        return processedArray;
    }
    finalResults_FN = processArray(combinedResults_FN);
    finalResults_FN.sort((a, b) => b[1] - a[1]);
    let possibleResults = [];
    const combinedResults_NN = [...finalResults_FN, ...filteredNickNameResults];
    possibleResults = processArray(combinedResults_NN);
    possibleResults.sort((a, b) => b[1] - a[1]);
    let LevenshteinDistanceResults = [];
    possibleResults.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < possibleResults.length; i++) {
        if (possibleResults[i][1] >= 0.500) {
            LevenshteinDistanceResults[i] = possibleResults[i];
        }
    }
    return LevenshteinDistanceResults;
}
function FuzzyMatchName(input) {
    const MatchResult_J = JaccardFuzzyMatch(input);
    const MatchResult_JW = JaroWinklerFuzzyMatch(input);
    const MatchResult_L = LevenshteinFuzzyMatch(input);
    let JWresult = [];
    let J_JW = [];
    for (let i = 0; i < MatchResult_JW.length; i++) {
        MatchResult_JW[i][1] /= 1.1;
        for (let j = 0; j < MatchResult_J.length; j++) {
            if (MatchResult_J[j][0] === MatchResult_JW[i][0]) {
                J_JW.push(MatchResult_J[j]);
            }
        }
    }
    if (MatchResult_JW.length != J_JW.length) {
        return [];
    }
    for (let i = 0; i < MatchResult_JW.length; i++) {
        if (J_JW[i]) {
            JWresult.push([J_JW[i][0], MatchResult_JW[i][1] * 0.55 + J_JW[i][1] * 0.45]);
        }
    }
    JWresult.sort((a, b) => b[1] - a[1]);
    const combinedResults = [...JWresult, ...MatchResult_L];
    let finalResults = [];
    function processArray(arr) {
        let processedArray = [];
        let nopush = [];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i][0] === arr[j][0]) {
                    nopush.push(arr[i][0]);
                    processedArray.push([arr[i][0], arr[i][1] * 0.5 + arr[j][1] * 0.5 + 0.15]);
                    break;
                }
            }
            if (nopush.indexOf(arr[i][0]) === -1) {
                if (JWresult.indexOf(arr[i]) !== -1) {
                    if (arr[i][1] >= 0.454) {
                        processedArray.push(arr[i]);
                    }
                }
                else {
                    if (arr[i][1] >= 0.500) {
                        processedArray.push(arr[i]);
                    }
                }
            }
        }
        return processedArray;
    }
    finalResults = processArray(combinedResults);
    finalResults.sort((a, b) => b[1] - a[1]);
    return finalResults;
}
function MatchStudentName(input) {
    const ExactResults = ExactMatchName(input);
    if (ExactResults.length != 0) {
        if (ExactResults.length > 6) {
            let ExactResults5 = [];
            for (let i = 0; i < 6; i++) {
                ExactResults5.push(ExactResults[i]);
            }
            return ExactResults5;
        }
        else {
            return ExactResults;
        }
    }
    else {
        const FuzzyResults = FuzzyMatchName(input);
        let FuzzyResults_nonum = [];
        for (const result of FuzzyResults) {
            FuzzyResults_nonum.push(result[0]);
        }
        if (FuzzyResults_nonum.length != 0) {
            if (FuzzyResults_nonum.length > 6) {
                let FuzzyResults_nonum5 = [];
                for (let i = 0; i < 6; i++) {
                    FuzzyResults_nonum5.push(FuzzyResults_nonum[i]);
                }
                return FuzzyResults_nonum5;
            }
            else {
                return FuzzyResults_nonum;
            }
        }
        else {
            return [];
        }
    }
}
exports.MatchStudentName = MatchStudentName;
function MatchMapName(input) {
    let a = "";
    let b = "";
    let mark = "";
    input = pretreat(input);
    if (input.length > 14) {
        return "Error";
    }
    const regex1 = /(\d+)[-_,.;~](\d+)/;
    const match1 = input.match(regex1);
    if (match1) {
        if (match1.length === 3) {
            a = match1[1];
            b = match1[2];
        }
        else {
            return "Error";
        }
    }
    else {
        return "Error";
    }
    const regexH = /(困难|h|hard)+/;
    const matchH = input.match(regexH);
    if (matchH) {
        mark = "h";
    }
    if (a && b) {
        if (parseInt(a) != 0 && parseInt(a) > guidesys_1.maxmap_sms) {
            return "报错：日服最新地图为" + guidesys_1.maxmap_sms + "图。";
        }
        if (parseInt(b) != 0 && mark === "" && parseInt(b) > 5) {
            return "报错：只有各普通关卡1-5图的攻略。";
        }
        else if (parseInt(b) != 0 && mark === "h" && parseInt(b) > 3) {
            return "报错：只有各困难关卡1-3图的攻略。";
        }
    }
    return mark + a + "-" + b;
}
exports.MatchMapName = MatchMapName;
const OthersData = require("./sms_othersmatchlib.json");
function MatchOthers(input) {
    for (const names of OthersData) {
        if (names.Name === input) {
            return [names.Name];
        }
        for (const nickname of names.Nickname) {
            if (nickname === input) {
                return [names.Name];
            }
        }
    }
    input = pretreat(input);
    for (const names of OthersData) {
        if (names.Name === input) {
            return [names.Name];
        }
        for (const nickname of names.Nickname) {
            if (nickname === input) {
                return [names.Name];
            }
        }
    }
    let keywords_result = [];
    for (const names of OthersData) {
        for (const Keyword of names.Keywords) {
            if (Keyword in guidesys_1.synonyms) {
                const words = [...[Keyword], ...guidesys_1.synonyms[Keyword]];
                for (const word of words) {
                    if (input.includes(word)) {
                        keywords_result.push(Keyword);
                        break;
                    }
                }
            }
            else {
                if (input.includes(Keyword)) {
                    keywords_result.push(Keyword);
                }
            }
        }
    }
    const result_set = new Set(keywords_result);
    keywords_result = Array.from(result_set);
    let items = [];
    for (const keyword of keywords_result) {
        for (const names of OthersData) {
            if (names.Keywords.includes(keyword)) {
                items.push(names.Name);
            }
        }
    }
    const stringCount = {};
    items.forEach((str) => {
        stringCount[str] = (stringCount[str] || 0) + 1;
    });
    const stringCountArray = Object.keys(stringCount).map((str) => ({
        string: str,
        count: stringCount[str],
    }));
    stringCountArray.sort((a, b) => b.count - a.count);
    const result = stringCountArray.map((entry) => entry.string);
    if (result.length > 5) {
        return result.slice(0, 5);
    }
    else {
        return result;
    }
}
exports.MatchOthers = MatchOthers;
async function StudentMatch(input) {
    const AronaNameData = require("./sms_studata_toaro_stu.json");
    const TryStudentMatch = MatchStudentName(input);
    if (TryStudentMatch.length != 0) {
        for (let i = 0; i < TryStudentMatch.length; i++) {
            for (const student of AronaNameData) {
                if (student.Id === TryStudentMatch[i]) {
                    TryStudentMatch[i] = student.MapName;
                    break;
                }
            }
        }
        return [...["Student"], ...TryStudentMatch];
    }
    else {
        return [];
    }
}
exports.StudentMatch = StudentMatch;
async function MatchArona(input) {
    function MapMatch(input) {
        const TryMapMatch = MatchMapName(input);
        if (TryMapMatch !== "" && TryMapMatch !== "Error") {
            if (TryMapMatch.includes("报错")) {
                return ["MapFailed", TryMapMatch];
            }
            else {
                return ["MapSuccess", TryMapMatch];
            }
        }
        else {
            return [];
        }
    }
    function OthersMatch(input) {
        const TryOthersMatch = MatchOthers(input);
        if (TryOthersMatch.length != 0) {
            return [...["Others"], ...TryOthersMatch];
        }
        else {
            return [];
        }
    }
    function StudentMatch(input) {
        const AronaNameData = require("./sms_studata_toaro_stu.json");
        const TryStudentMatch = MatchStudentName(input);
        if (TryStudentMatch.length != 0) {
            for (let i = 0; i < TryStudentMatch.length; i++) {
                for (const student of AronaNameData) {
                    if (student.Id === TryStudentMatch[i]) {
                        TryStudentMatch[i] = student.MapName;
                        break;
                    }
                }
            }
            return [...["Student"], ...TryStudentMatch];
        }
        else {
            return [];
        }
    }
    const m = ["地图", "主线", "走格子"];
    const o = ["杂图", "攻略", "活动"];
    const s = ["学生", "角色", "人物"];
    for (const str of m) {
        if (input.includes(str)) {
            return MapMatch(input.replace(str, ""));
        }
    }
    for (const str of o) {
        if (input.includes(str)) {
            if (pretreat(input) === "杂图") {
                return OthersMatch(input);
            }
            else {
                return OthersMatch(input.replace(str, ""));
            }
        }
    }
    for (const str of s) {
        if (input.includes(str)) {
            return StudentMatch(input.replace(str, ""));
        }
    }
    const resultM = MapMatch(input);
    if (resultM.length != 0) {
        return resultM;
    }
    const resultO = OthersMatch(input);
    if (resultO.length != 0) {
        return resultO;
    }
    const resultS = StudentMatch(input);
    if (resultS.length != 0) {
        return resultS;
    }
    else {
        return [];
    }
}
exports.MatchArona = MatchArona;
