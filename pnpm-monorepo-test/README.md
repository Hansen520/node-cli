<!--
 * @Date: 2024-12-16 16:44:06
 * @Description: description
-->
npm install -g pnpm

pnpm --filter cli add core --workspace

pnpm add typescript @types/node -w --save-dev // 加上 -w 才能在根目录安装依赖


pnpm --filter cli exec npx tsc --init // 在cli包里面执行npx tsc --init命令

pnpm --filter cli exec npx tsc 

pnpm --filter core exec npx tsc --init

pnpm --filter core exec npx tsc

pnpm -r exec npx tsc // -r为递归执行命令

pnpm --filter cli exec node ./dist/index.js add 1 2

pnpm --filter cli exec node ./dist/index.js minus 1 2

# changeset 的相关操作
pnpm add --save-dev -w @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson

npx changeset init

pnpm changeset add

pnpm changeset version

pnpm changeset publish
