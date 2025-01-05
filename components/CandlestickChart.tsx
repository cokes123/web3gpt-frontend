import React, { useEffect, useRef, useState } from "react";
import { createChart, LineStyle, CandlestickData } from "lightweight-charts";
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

const fetchKLineData = async (token): Promise<RawCandleData[]> => {
  console.log(token, 111);
  const data = await fetchKLines({
    exchange: "binance",
    interval: "1m",
    symbol: token.symbol,
  });
  return data;
};

export default function LightweightChart({ token = { symbol: "BTCUSDT" } }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null); // 引用图表实例
  const candlestickSeriesRef = useRef<any>(null); // 引用 K 线系列
  const [display, setDisplay] = useState(true);

  function formatNumber(num: number) {
    const numStr = num.toExponential();
    const exponent = parseInt(numStr.split("e")[1], 10);
    const decimalPlaces = Math.max(0, -exponent + 3);
    return num.toFixed(decimalPlaces);
  }

  // 初始化图表和系列
  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "#ffffff" },
      },
      grid: {
        vertLines: {
          style: LineStyle.LargeDashed,
          color: "rgba(0, 0, 0, 0.2)",
        },
        horzLines: {
          visible: false,
        },
      },
      localization: {
        priceFormatter: (item: number) => formatNumber(item),
      },
      // 可以根据需要启用 crosshair 配置
    };

    // 创建图表实例
    //@ts-ignore
    chartRef.current = createChart(chartContainerRef.current, chartOptions);

    // 添加 K 线系列
    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#f44336",
      borderDownColor: "#f44336",
      borderUpColor: "#4caf50",
      wickDownColor: "#f44336",
      wickUpColor: "#4caf50",
    });

    // 监听窗口大小变化
    const handleResize = () => {
      if (chartContainerRef.current) {
        chartRef.current.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);

    // 清理函数：销毁图表实例和移除事件监听
    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, []);

  // 更新 K 线数据，当 token.symbol 变化时
  useEffect(() => {
    const updateChartData = async () => {
      if (!candlestickSeriesRef.current) return;

      try {
        const rawData = await fetchKLineData(token);
        const candlestickData = transformData(rawData).reverse(); // 根据需求反转数据

        console.log("更新K线数据", candlestickData);
        candlestickSeriesRef.current.setData(candlestickData);

        // 可选：调整图表时间范围
        chartRef.current.timeScale().fitContent();
      } catch (error) {
        console.error("获取K线数据失败:", error);
      }
    };

    updateChartData();
  }, [token.symbol]);

  return (
    <>
      {display && (
        <div
          ref={chartContainerRef}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </>
  );
}
