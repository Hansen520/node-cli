var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prompt } from "./index.js";
import os from 'os';
const questions = [
    {
        message: '你的名字?',
        type: 'text',
        name: 'name'
    },
    {
        message: '年龄?',
        type: 'text',
        name: 'age'
    },
    {
        message: '你的班级？',
        type: 'select',
        name: 'class',
        choices: [
            '一班',
            '二班',
            '三班'
        ]
    },
    {
        message: '你喜欢去的地方？',
        type: 'select',
        name: 'view',
        choices: [
            '九寨沟',
            '张家界',
            '黄山',
            '故宫'
        ]
    }
];
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield prompt(questions);
        console.log(answers);
        console.log(os.version());
    });
})();
