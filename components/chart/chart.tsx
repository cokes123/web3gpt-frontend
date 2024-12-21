import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ReactMarkdown from 'react-markdown';
import { fetchKLineReport } from '@/api/aiReportService';
import { KlinePayload } from '@/app/types/kline';
import LightweightChart from '../CandlestickChart';
import Image from 'next/image'
import Loading from '../loading/loading';

const Chart: React.FC = () => {
    const [klineData, setKlineData] = useState<KlinePayload | null>(null);
    const [aidata, setAidata] = useState("");
    const [orderBookData, setOrderBookdata] = useState({
        a: [],
        b: []
    })
    useEffect(() => {
        const response = fetchKLineReport({
            token: 'bitcoin',
            exchange: 'binance',
            start: '1733791787',
            end: '1733878197',
            interval: 'hourly',
            language: 'en',
            withOrderBook: 0,
        }).then(res => {
            setAidata(res)

        }).catch(error => {

            console.log(error, 222)
        });
        // 创建 WebSocket 实例
        const socket = new WebSocket("wss://stream.lazibit.ai");

        // 连接成功时触发
        socket.onopen = () => {
            console.log("WebSocket Connected");
            // 发送订阅信息
            const subscribeMessage = {
                method: "SUBSCRIBE",
                // params: ["BTCUSDT@kline_1m_binance"],
                params: [
                    "BTCUSDT@orderbook_binance", // 已有的订阅
                    "BTCUSDT@kline_1m_binance"  // 新的订阅
                ],

            };

            socket.send(JSON.stringify(subscribeMessage));
        };

        // 接收消息时触发
        socket.onmessage = (event: MessageEvent) => {
            try {
                const data: KlinePayload = JSON.parse(event.data);

                if (data.e === "kline") {
                    setKlineData(JSON.parse(event.data))
                    console.log(JSON.parse(event.data))
                } else if (data.e === "orderBook") {
                    setOrderBookdata(JSON.parse(event.data))
                }

            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        // 出现错误时触发
        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        // WebSocket 关闭时触发
        socket.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        // 组件卸载时清理 WebSocket
        return () => {
            socket.close(); // 关闭 WebSocket
        };
    }, []);
    return (
        <div>
            <div className={styles.chart}>
                <div className={styles.kLine}>
                    <LightweightChart ></LightweightChart>
                </div>

                <div className={styles.orderBook}>
                    <div className={styles.orderbooktitle}>
                        {"Order Book"}
                    </div>
                    {<div className={styles.orderBookContent}>
                        <div className={styles.orderBookItem}>
                            <div className={styles.orderBookPrice}>Price(USDT)</div>
                            <div className={styles.orderBookAmount}>Amount(BTC)</div>

                        </div>
                        <div className={styles.buy}>
                            {orderBookData.a.slice(-9).map(item => <div className={styles.orderBookItem}>
                                <div className={styles.orderBookPrice + " " + styles.buyPrice}>{item[0]}</div>
                                <div className={styles.orderBookAmount + " " + styles.buyamount}>{item[1]}</div>
                            </div>)}
                        </div>
                        <div className={styles.price}>

                        </div>
                        <div className={styles.sell}>
                            {orderBookData.b.slice(0, 9).map(item => <div className={styles.orderBookItem}>
                                <div className={styles.orderBookPrice + " " + styles.sellPrice}>{item[0]}</div>
                                <div className={styles.orderBookAmount + " " + styles.sellamount}>{item[1]}</div>
                            </div>)}
                        </div>
                    </div>}
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomHeader }>
                    <div className={styles.bottomTitle+ " " + styles.activeBottom}>
                        {"AI analysis"}
                    </div>
                    <div className={styles.bottomTitle}>
                        {"Spot"}
                    </div>
                    <div className={styles.bottomTitle}>
                        {"Open Orders(6)"}
                    </div>
                    <div className={styles.bottomTitle}>
                        {"Order History"}
                    </div>
                    <div>
                        {/* <div className={styles.languageSelect}>
        <Box sx={{ minWidth: 120, height: 40 }}>

          <FormControl sx={{ height: 40 }} fullWidth>
            <InputLabel sx={{ height: 40 }} id="demo-simple-select-label">lang</InputLabel>
            <Select
              sx={{ height: 60 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>cn</MenuItem>
              <MenuItem value={20}>en</MenuItem>
              <MenuItem value={30}>kr</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div> */}
                    </div>
                </div>
                <div className={styles.bottomContent}>
                    {!aidata ? <Loading /> : <div className={styles.markdwon}>
                        <ReactMarkdown>{aidata}</ReactMarkdown>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Chart;
