// src/components/TokenSelector.jsx
import React, { useState } from 'react';
import styles from './index.module.css';
import Image from 'next/image'

const dexs = [
    { name: 'Binace' },
    { name: 'Okx' },

    { name: 'Bybit' },
    { name: 'Coinbase' },

]
const tokenData = [
    { symbol: 'BTC', volume: '7,738,765,019.05', marketValue: '7,738,765,019.05', lastPrice: '0.3811', change: '+5.08%' },
    { symbol: 'ETH', volume: '1,234,567.89', marketValue: '1,234,567.89', lastPrice: '0.3000', change: '+2.00%' },
    { symbol: 'BNB', volume: '4,567,890.12', marketValue: '4,567,890.12', lastPrice: '0.9800', change: '-1.50%' },
    { symbol: 'SOL', volume: '3,456,789.00', marketValue: '3,456,789.00', lastPrice: '1.0000', change: '+0.00%' },
    { symbol: 'DOGE', volume: '2,345,678.90', marketValue: '2,345,678.90', lastPrice: '300.00', change: '+1.20%' },
    // 其他代币数据
];

const TokenSelector = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // 过滤代币数据
    const filteredTokens = tokenData.filter(token =>
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <th style={{display:'flex',flexDirection:'row-reverse',alignItems:'center',gap:'4px'}}>

                                {/* <text className={styles.display} > */}
                                <Image
                                        width={6}
                                        height={8}
                                        src="/fonts/rank.svg"
                                        alt="" />
                                    Last Price / 24h Change
                                   
                                {/* </text> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTokens.map(token => (
                            <tr key={token.symbol}>
                                <td>
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.symbol}/USDT</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td  style={{textAlign:"right"}}>
                                    {token.lastPrice} <span className={token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange}>{token.change}</span>
                                </td>
                            </tr>
                        ))}
                        {filteredTokens.map(token => (
                            <tr key={token.symbol}>
                                <td >
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.symbol}/USDT</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td  style={{textAlign:"right"}}>
                                    {token.lastPrice} <span className={token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange}>{token.change}</span>
                                </td>
                            </tr>
                        ))}
                        {filteredTokens.map(token => (
                            <tr key={token.symbol}>
                                <td>
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.symbol}/USDT</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td  style={{textAlign:"right"}}>
                                    {token.lastPrice} <span className={token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange}>{token.change}</span>
                                </td>
                            </tr>
                        ))}
                        {filteredTokens.map(token => (
                            <tr key={token.symbol}>
                                <td>
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.symbol}/USDT</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td  style={{textAlign:"right"}}> 
                                    {token.lastPrice} <span className={token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange}>{token.change}</span>
                                </td>
                            </tr>
                        ))}
                        {filteredTokens.map(token => (
                            <tr key={token.symbol}>
                                <td>
                                    <div className={styles.display}><Image
                                        width={12}
                                        height={12}
                                        src="/fonts/star2.svg"
                                        alt="" />
                                        {token.symbol}/USDT</div> </td>
                                {/* <td>{token.volume}</td> */}
                                {/* <td>{token.marketValue}</td> */}
                                <td  style={{textAlign:"right"}}>
                                    {token.lastPrice} <span className={token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange}>{token.change}</span>
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
