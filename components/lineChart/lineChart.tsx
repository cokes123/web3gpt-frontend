// src/components/FollowsLineChart.jsx
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

/**
 * FollowsLineChart 组件
 * 展示 FOLLOW 类数据的折线图
 * 
 * @param {Object} props
 * @param {Array} props.data - 数据数组，格式如 [{ date: "YYYY-MM-DD", count: Number }, ...]
 * @param {string} [props.title] - 图表标题
 * @param {string} [props.xAxisName] - X 轴名称
 * @param {string} [props.yAxisName] - Y 轴名称
 */
const LineChart = ({ data, title = '', xAxisName = '', yAxisName = '' }) => {
  // 提取日期和计数
  const dates = data.map(item => item.date);
  const counts = data.map(item => item.count);

  // 配置 ECharts 选项
  const option = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: 20,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br />Count: {c}',
    },
    xAxis: {
      type: 'category',
      data: dates,
      name: xAxisName,
      boundaryGap: false,
      axisLabel: {
        formatter: value => value,
      },
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      min: 0,
      axisLabel: {
        formatter: '{value}',
      },
      position: 'right'
    },
    series: [
      {
        name: 'Follows',
        type: 'line',
        data: counts,
        smooth: true,
        lineStyle: {
          color: '#3398DB',
          width: 3,
        },
        areaStyle: {
          color: 'rgba(51, 152, 219, 0.2)',
        },
        itemStyle: {
          borderColor: '#3398DB',
          borderWidth: 2,
        },
      },
    ],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      containLabel: true,
    },
    toolbox: {

    },
  };

  return <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />;
};

// PropTypes 类型检查
LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  xAxisName: PropTypes.string,
  yAxisName: PropTypes.string,
};

export default LineChart;