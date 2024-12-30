/*
 * @Date: 2024-12-27 15:25:23
 * @Description: description
 */
import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({
  apiKey: "",
  baseURL: "https://oa.api2d.net",
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: fs.readFileSync("./src/system.md", "utf-8") },
      //   { role: "user", content: "生成一个 Table 的 React 组件" },
      { role: "assistant", content: fs.readFileSync("./src/response1.md", "utf-8") },
      {role: 'user', content: '用vite + react 帮我画一个图表，用echarts，然后又名字和年龄两个字段'}

    ],
    tools: [
      {
        type: "function",
        function: {
          name: "getCode",
          description: "生成的组件代码",
          parameters: {
            type: "object",
            properties: {
              code1: {
                type: "string",
                description: "生成的 index.ts 代码",
              },
              code2: {
                type: "string",
                description: "生成的 interface.ts 代码",
              },
              code3: {
                type: "string",
                description: "生成的 [组件名].tsx 代码",
              },
              code4: {
                type: "string",
                description: "生成的 styles.ts 代码",
              },
            },
            required: ["code1", "code2", "code3", "code4"],
          },
        },
      },
    ],
    //   stream: true
  });

  console.log(stream.choices[0].message.tool_calls[0].function)
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   }
}

main();
