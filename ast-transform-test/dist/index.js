var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { transformFromAstSync } from '@babel/core';
import parser from '@babel/parser';
import template from '@babel/template';
import { isObjectExpression } from '@babel/types';
import prettier from 'prettier';
const sourceCode = `
import { Module } from '@nestjs/common';

@Module({
})
export class AaaModule {}
`;
function myPlugin() {
    return {
        visitor: {
            Program(path) {
                let index = 0;
                while (path.node.body[index].type === 'ImportDeclaration') {
                    index++;
                }
                const ast = template.statement("import { AaaController } from './aaa.controller';")(); // 转换为抽象语法树
                path.node.body.splice(index, 0, ast);
            },
            Decorator(path) {
                const decoratorName = path.node.expression.callee.name;
                if (decoratorName !== 'Module') {
                    return;
                }
                const obj = path.node.expression.arguments[0];
                const controllers = obj.properties.find((item) => item.key.name === 'controllers');
                if (!controllers) {
                    const expression = template.expression('{controllers: [AaaController]}')();
                    console.log(expression, 37);
                    // isObjectExpression用来判断是否为自己所需的对象表达式
                    if (isObjectExpression(expression)) {
                        obj.properties.push(expression.properties[0]);
                    }
                }
                else {
                    const property = template.expression('AaaController')();
                    // console.log(property, 42);
                    controllers.value.elements.push(property);
                }
            }
        }
    };
}
const ast = parser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ["decorators"]
});
const res = transformFromAstSync(ast, sourceCode, {
    plugins: [myPlugin],
    retainLines: true,
});
console.log(res === null || res === void 0 ? void 0 : res.code);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const formateCode = yield prettier.format((res === null || res === void 0 ? void 0 : res.code) || '', {
            filepath: 'aaa.ts'
        });
        console.log(formateCode);
    });
})();
