import React, { useEffect, useRef } from "react";
import { createChart,LineStyle, CandlestickData } from "lightweight-charts";
import { fetchKLines } from "@/api/aiReportService";

interface RawCandleData {
  t: number;
  T: number;
  s: string;
  i: string;
  f: number;
  L: number;
  o: string;
  c: string;
  h: string;
  l: string;
  v: string;
  n: number;
  x: boolean;
  q: string;
  V: string;
  Q: string;
  B: string;
  ex: string;
}

const transformData = (rawData: RawCandleData[]): CandlestickData[] => {
  //@ts-ignore
  return rawData.map((item) => ({
    time: Math.floor(item.t / 1000), // 转换为秒级 UNIX 时间戳
    open: parseFloat(item.o),
    high: parseFloat(item.h),
    low: parseFloat(item.l),
    close: parseFloat(item.c),
  }));
};

const fetchKLineData = async (): Promise<RawCandleData[]> => {
  // 您的获取数据逻辑，例如从 API 获取
  const data = await fetchKLines({ exchange: 'binance', interval: '1m', symbol: 'BTCUSDT' })
  console.log(data, 111)
  return data

};

export default function LightweightChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  function formatNumber(num: number) {
    // 将数字转换为科学记数法形式的字符串
    const numStr = num.toExponential();
    // 提取指数部分
    const exponent = parseInt(numStr.split('e')[1], 10);
    // 计算所需的小数位数
    const decimalPlaces = Math.max(0, -exponent + 3);
    // 使用 toFixed 格式化数字
    return num.toFixed(decimalPlaces);
}
  useEffect(() => {
    const initializeChart = async () => {
      
      // 创建图表实例
      const chartOptions = {
        layout: {
          textColor: 'black', background: { type: 'solid', color: '#ffffff' }
        },
        grid: {
          vertLines: {
            style: LineStyle.LargeDashed,
            color: 'rgba(0, 0, 0, 0.2)',
          },
          horzLines: {
            visible: false,
          },
        },
        localization: {
          priceFormatter: (item: number) => formatNumber(item),
        },
        // crosshair: {
        //     // Change mode from default 'magnet' to 'normal'.
        //     // Allows the crosshair to move freely without snapping to datapoints
        //     mode: CrosshairMode.Normal,

        //     // Vertical crosshair line (showing Date in Label)
        //     vertLine: {
        //         width: 8,
        //         color: '#C3BCDB44',
        //         style: LineStyle.Solid,
        //         labelBackgroundColor: '#9B7DFF',
        //     },

        //     // Horizontal crosshair line (showing Price in Label)
        //     horzLine: {
        //         color: '#9B7DFF',
        //         labelBackgroundColor: '#9B7DFF',
        //     },
        // },
      };
      //@ts-ignore
      const chart = createChart(chartContainerRef.current, chartOptions);
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4caf50',
        downColor: '#f44336',
        borderDownColor: '#f44336',
        borderUpColor: '#4caf50',
        wickDownColor: '#f44336',
        wickUpColor: '#4caf50',
      });
      // candlestickSeries.priceScale().applyOptions({
      //   borderColor: 'rgba(197, 203, 206, 0.8)',
      //   mode: 1, // 使用Logarithmic模式

      // });
      const handleResize = () => {
        //@ts-ignore

        chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      const rawData = await fetchKLineData();
      const candlestickData = rawData.map((item: any) => ({
        time: item[0] / 1000,
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
    }));
    //@ts-ignore
      candlestickSeries.setData(candlestickData);
      // 清理函数
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    };

    initializeChart();
  }, []);

  return <div ref={chartContainerRef} style={{ height: "100%", width: "100%" }} />;
}
