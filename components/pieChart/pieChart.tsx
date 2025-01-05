// src/components/SentimentsPieCharts.jsx
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

/**
 * SentimentPieChart 组件
 * 单个饼状图，用于展示某个日期的情感数据
 * 
 * @param {Object} props
 * @param {Object} props.data - 单个日期的情感数据，格式如 { date: "YYYY-MM-DD", positive: Number, neutral: Number, negative: Number }
 */
const SentimentPieChart = ({ data }) => {
  const { date, positive, neutral, negative } = data;

  const option = {
    title: {
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Sentiments',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: positive, name: 'Positive' },
          { value: neutral, name: 'Neutral' },
          { value: negative, name: 'Negative' },
        ],
        color: ['#36CFC9', '#FFBB28', '#FF4D4F'], // 自定义颜色
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '300px', width: '100%' }} />;
};

/**
 * SentimentsPieCharts 组件
 * 展示多个日期的情感数据饼状图，以网格布局排列
 * 
 * @param {Object} props
 * @param {Array} props.sentiments - 情感数据数组，格式如 [{ date: "YYYY-MM-DD", positive: Number, neutral: Number, negative: Number }, ...]
 * @param {string} [props.title] - 图表集合的标题
 */
const SentimentsPieCharts = ({ sentiments, title = 'Sentiment Distribution Over Dates' }) => {
  return (
    <div>
      {/* 组件标题 */}
      {title && <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h2>}

      {/* 图表网格容器 */}
      <div style={styles.gridContainer}>
        {sentiments.map((item) => (
          <div key={item.date} style={styles.gridItem}>
            <div>{item.date}</div>
            <SentimentPieChart data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

// 样式定义
const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding:'0 48px'
  },
  gridItem: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
};

// PropTypes 类型检查
SentimentPieChart.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    positive: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
  }).isRequired,
};

SentimentsPieCharts.propTypes = {
  sentiments: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      positive: PropTypes.number.isRequired,
      neutral: PropTypes.number.isRequired,
      negative: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default SentimentsPieCharts;
