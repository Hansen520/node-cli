import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartProps } from './interface';

const Chart: React.FC<ChartProps> = ({ name, age }) => {
  const option = {
    title: {
      text: `Name: ${name}, Age: ${age}`, // 根据传入的name和age动态显示
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    yAxis: {},
    series: [
      {
        name: 'Series 1',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default Chart;