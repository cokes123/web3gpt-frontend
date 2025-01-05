// src/components/TokenSelector.jsx
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Image from 'next/image'
import { fetchTokenList } from '@/api/aiReportService';
import { formatTs } from '@/utils/utils';
import { useRouter } from "next/navigation";

const dexs = [
    { name: 'BINANCE' },
    { name: 'OKX' },

    { name: 'COINBASE' },

]
const tokenData = [
    { symbol: 'BTC', volume: '7,738,765,019.05', marketValue: '7,738,765,019.05', lastPrice: '0.3811', change: '+5.08%' },
    { symbol: 'ETH', volume: '1,234,567.89', marketValue: '1,234,567.89', lastPrice: '0.3000', change: '+2.00%' },
    { symbol: 'BNB', volume: '4,567,890.12', marketValue: '4,567,890.12', lastPrice: '0.9800', change: '-1.50%' },
    { symbol: 'SOL', volume: '3,456,789.00', marketValue: '3,456,789.00', lastPrice: '1.0000', change: '+0.00%' },
    { symbol: 'DOGE', volume: '2,345,678.90', marketValue: '2,345,678.90', lastPrice: '300.00', change: '+1.20%' },
    // 其他代币数据
];

const TokenSelector = ({ setToken }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tokenList, setTokenList] = useState<any[]>()
    // 过滤代币数据
    const router = useRouter();
    const [active, setActive] = useState(0)

    const filteredTokens = tokenData.filter(token =>
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        fetchTokenList({
            symbol: "",
            exchange: 'binance'
        }).then(list => {
            //@ts-ignore
            setTokenList(list.filter(item => item.isHot === 1))

        })
    }, [])

    useEffect(() => {
        if (tokenList) {
            setToken(tokenList[0])
        }

    }, [tokenList])

    const [activeDex, setActiveDex] = useState(0)

    return (
        <div className={styles.tokenSelector}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.tokenButtons}>
                {dexs.map((token, index) => (
                    <div className={`${styles.tokenButton} ${index == activeDex ? styles.activeTab : ''}`}
                        onClick={() => {
                            setActiveDex(index)
                        }}
                        key={token.name}>
                        {token.name}
                    </div>
                ))}
            </div>
            <div className={styles.tokenbody}>
                <table className={styles.tokenTable}>
                    <thead className={styles.thead}>
                        <tr>

                            <th>
                                <div className={styles.display}>
                                    Pair
                                    <Image
                                        width={6}
                                        height={8}
                                        src="/fonts/rank.svg"
                                        alt="" />
                                </div>
                            </th>
                            {/* <th>24h Volume(USDT)</th> */}
                            {/* <th>Market Value</th> */}
                            <th style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>

                                {/* <text className={styles.display} > */}

                                Last Price / 24h Change
                                <Image
                                    width={6}
                                    height={8}
                                    src="/fonts/rank.svg"
                                    alt="" />
                                {/* </text> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenList && tokenList.map((token, index) => (
                            <tr onClick={() => {
                                setToken(token)
                                setActive(index)
                                const currentUrl = new URL(window.location.href);

                                // 添加或修改查询参数
                                currentUrl.searchParams.set("token", token.baseAsset);

                                // 替换当前 URL，但不跳转页面
                                router.replace(currentUrl.toString(), {
                                //@ts-ignore
                                    shallow: true, // 不触发重新加载或硬跳转
                                });
                            }} className={active == index ? styles.activeToken : ''} key={token.symbol}>
                                <td>
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.baseAsset}/{token.quoteAsset}</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td style={{ textAlign: "left", marginRight: '8px' }}>
                                    {formatTs(token.lastPrice)} <span className={token.priceChangePercent.startsWith('-') ? styles.negativeChange : styles.positiveChange}>{token.priceChangePercent + '%'}</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TokenSelector;
