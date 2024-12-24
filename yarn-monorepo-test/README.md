<!--
 * @Date: 2024-12-16 16:44:06
 * @Description: description
-->
yarn workspace

在某个 workspace 下安装依赖用 yarn workspace xxx add yyy

删除依赖用 yarn workspace xxx remove yyy

如 yarn workspace @han-yarn/cli run build // 在总目录或者其他目录里面跑

yarn workspaces run build // 在当前目录里面跑

npx changeset init

npx changeset add // 这个是基于 git 来检测的，所以本地代码不要自己 commit。

npx changeset version // 那些临时的 changeset 文件就消失了

npx changeset publish



