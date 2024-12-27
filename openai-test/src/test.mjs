/*
 * @Date: 2024-12-27 16:42:18
 * @Description: description
 */
import fs from 'node:fs';

const res = {
    name: 'getCode',
    arguments: '{"code1": "export { default as Chart } from \'./Chart\';\\nexport type { ChartProps } from \'./interface\';", "code2": "import React from \'react\';\\n\\ninterface ChartProps {\\n  name: string;\\n  age: number;\\n}\\n\\nexport type { ChartProps };", "code3": "import React from \'react\';\\nimport ReactEcharts from \'echarts-for-react\';\\nimport { ChartProps } from \'./interface\';\\n\\nconst Chart: React.FC<ChartProps> = ({ name, age }) => {\\n  const option = {\\n    title: {\\n      text: `Name: ${name}, Age: ${age}`, // 根据传入的name和age动态显示\\n    },\\n    tooltip: {},\\n    xAxis: {\\n      data: [\'A\', \'B\', \'C\', \'D\', \'E\', \'F\'],\\n    },\\n    yAxis: {},\\n    series: [\\n      {\\n        name: \'Series 1\',\\n        type: \'bar\',\\n        data: [5, 20, 36, 10, 10, 20],\\n      },\\n    ],\\n  };\\n\\n  return (\\n    <div>\\n      <ReactEcharts option={option} />\\n    </div>\\n  );\\n};\\n\\nexport default Chart;", "code4": "@import \'~antd/dist/antd.css\';\\n\\nexport const chartStyles = {\\n  width: \'100%\',\\n  height: \'400px\',\\n};"}'
  }

const codes = JSON.parse(res.arguments);

fs.mkdirSync('./Table');
fs.writeFileSync('./Table/index.ts', codes.code1);
fs.writeFileSync('./Table/interface.ts', codes.code2);
fs.writeFileSync('./Table/UserTable.tsx', codes.code3);
fs.writeFileSync('./Table/styles.scss', codes.code4);
