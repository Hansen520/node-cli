/*
 * @Date: 2024-12-23 11:09:15
 * @Description: description
 */
import { PluginObj, transformFromAstSync } from "@babel/core";
import parser from "@babel/parser";
import template from "@babel/template";
import { jsxExpressionContainer } from "@babel/types";
import prettier from "prettier";

const sourceCode = `
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return <div>
    <div>{count}</div>
    <button onClick={() => setCount(count => count + 1)}>增加</button>
    <button onClick={() => setCount(count => count - 1)}>减小</button>
  </div>
}

export default App
`;

function myPlugin(): PluginObj {
  return {
    visitor: {
      Program(path: any) {
        let index = 0;
        while (path.node.body[index].type === "ImportDeclaration") {
          index++;
        }

        const ast = template.statement("import { defineMessages, useIntl } from 'react-intl'")(); // 有关这段语法的代码
        console.log(ast);
        path.node.body.splice(index, 0, ast); // 在指定位置插入节点

        // 插入messages的部分
        const textArr: string[] = [];
        path.traverse({
          JSXText(p: any) {
            if (p.node.value.trim() !== "") {
              textArr.push(p.node.value); // 将文本内容添加到数组中
            }
          },
        });

        /*
            拿到所有的文本
            const messages = defineMessages({ 增加: { id: "增加" }, 减小: { id: "减小" } });
        */
        const messagesAst = template.statement(`const messages = defineMessages({
            ${textArr
            .map((item) => {
                return `${item}: {
            id: "${item}"}`;
            })
            .join(",")}  
        })`)();
        // 忘下面加一行
        path.node.body.splice(index + 1, 0, messagesAst); // 在指定位置插入节点
      },
      FunctionDeclaration(path, state) {
        if (path.parent.type === "Program") {
          let methodName = "intl";
          if (path.scope.getBinding(methodName)) {
            methodName = path.scope.generateUid(methodName);
          }

          const ast = template.statement(`const ${methodName} = useIntl();`)();
          path.node.body.body.unshift(ast);

          state.intlName = methodName; // 保存到state中，方便后续使用
        }
      },
      JSXText(path, state) {
        if (path.node.value.trim() !== '') {
            const ast = template.expression(`${state.intlName}.formatMessage(messages["${path.node.value}"])`)();
            path.replaceWith(jsxExpressionContainer(ast));
        }
      }
    },
  };
}

const ast = parser.parse(sourceCode, {
  sourceType: "module",
  plugins: ["jsx"],
});

const res = transformFromAstSync(ast, sourceCode, {
  plugins: [myPlugin],
  retainLines: true,
});

(async function () {
  // 完成以后再格式化一下
  const formattedCode = await prettier.format(res?.code!, {
    filepath: "aaa.tsx",
  });
  console.log(formattedCode);
})();
