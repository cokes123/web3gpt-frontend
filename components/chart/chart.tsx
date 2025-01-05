import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ReactMarkdown from 'react-markdown';
import { fetchKLineReport } from '@/api/aiReportService';
import { KlinePayload } from '@/app/types/kline';
import LightweightChart from '../CandlestickChart';
import Image from 'next/image'
import Loading from '../loading/loading';

const Chart = ({ token = { baseAsset: 'BTC', symbol: 'BTCUSDT' } }) => {
    const [aidata, setAidata] = useState("");
    const [orderBookData, setOrderBookData] = useState({ a: [], b: [] });
    const [klineData, setKlineData] = useState(null); // Assuming you have this state

    useEffect(() => {
        if (!token || !token.symbol || !token.baseAsset) {
            console.warn('Token, token.symbol, or token.baseAsset is missing.');
            return;
        }

        // Fetch K-Line Report
        const fetchData = async () => {
            try {
                const res = await fetchKLineReport({
                    token: token.baseAsset,
                    exchange: 'binance',
                    start: '1733791787',
                    end: '1733878197',
                    interval: 'hourly',
                    language: 'en',
                    withOrderBook: 0,
                });
                setAidata(res);
                console.log('Fetched K-Line Report:', res);
            } catch (error) {
                console.error('Error fetching K-Line Report:', error);
            }
        };

        fetchData();

        // Establish WebSocket Connection
        const socket = new WebSocket("wss://stream.lazibit.ai");

        socket.onopen = () => {
            console.log("WebSocket Connected");

            // Prepare Subscription Message
            const subscribeMessage = {
                method: "SUBSCRIBE",
                params: [
                    `${token.symbol}@orderbook_binance`, // Existing subscription
                    `${token.symbol}@kline_1m_binance`  // Verify if this is correct
                ],
                id: 1 // Optional: An identifier for the request
            };

            // Send Subscription Message
            socket.send(JSON.stringify(subscribeMessage));
            console.log('Sent subscription message:', subscribeMessage);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received WebSocket message:', data);

                if (data.e === "kline") {
                    setKlineData(data); // Directly use parsed data
                } else if (data.e === "orderBook") {
                    // Ensure data structure matches { a: [], b: [] }
                    console.log('sixuwang',data)
                    setOrderBookData({
                        a: data.a || [],
                        b: data.b || []
                    });
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`WebSocket Closed Cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.warn('WebSocket Closed Unexpectedly');
            }
        };

        // Cleanup Function
        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
                console.log("WebSocket Connection Closed");
            }
        };
    }, [token.symbol, token.baseAsset]);
    return (
        <div>
            <div className={styles.chart}>
                <div className={styles.kLine}>
                    <LightweightChart token={token}></LightweightChart>
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
                <div className={styles.bottomHeader}>
                    <div className={styles.bottomTitle + " " + styles.activeBottom}>
                        {"AI analysis"}
                    </div>
                    {/* <div className={styles.bottomTitle}>
                        {"Spot"}
                    </div>
                    <div className={styles.bottomTitle}>
                        {"Open Orders(6)"}
                    </div>
                    <div className={styles.bottomTitle}>
                        {"Order History"}
                    </div> */}
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
