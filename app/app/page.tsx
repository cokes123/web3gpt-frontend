"use client"
import React, { useEffect, useState } from "react";
import { KlinePayload } from "../types/kline";
import styles from './index.module.css'
import Image from 'next/image'
import { fetchKLineReport } from "@/api/aiReportService";
import LightweightChart from "@/components/CandlestickChart";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReactMarkdown from 'react-markdown';
import { error } from "console";
import TradeForm from "@/components/tradeForm/tradeForm";
import Chart from "@/components/chart/chart";
import Xpage from "@/components/xpage/xpage";
import BuildPage from "@/components/buildpage/buildpage";
import TokenSelector from "@/components/tokenSelector/tokenSelector";
import Header from "@/components/header/header";
import TGpage from "@/components/tgpage/xpage";
import { formatTs } from "@/utils/utils";

const coins = [{
  name: 'ACT/USDT',
  change: '+40.07%',
},
{
  name: 'PNUT/USDT',
  change: '+129.03%',
},
{
  name: 'DOGE/USDT',
  change: '+5.08%',
},
{
  name: 'STX/USDT',
  change: '+2.99%',
},
{
  name: '1000PEPE/USDT',
  change: '+75.31%',
},
{
  name: 'PEOPLE/USDT',
  change: '+28.74%',
},
]

const tabs = [


  {
    name: 'X',
    icon: '/fonts/x'
  },
  {
    name: 'Chart',
    icon: '/fonts/chart',
  },
  {
    name: 'TG Group',
    icon: '/fonts/tg'
  },
  // {
  //   name: 'Onchain Data',
  //   icon: '/fonts/onchain'
  // },
  // {
  //   name: 'Exchange Data',
  //   icon: '/fonts/exchange'
  // },
  // {
  //   name: 'Competitor',
  //   icon: '/fonts/exchange.svg'
  // },
  // {
  //   name: 'Early Warning',
  //   icon: '/fonts/exchange.svg'
  // },
  // {
  //   name: 'Custom Page',
  //   icon: '/fonts/exchange.svg'
  // },

]

const Home: React.FC = () => {

  const [activeTab, setActiveTab] = useState(0)
  const [age, setAge] = React.useState('');
  const [token, setToken] = useState<any>()
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const tabContents = [{
    content: <Xpage token={token} />
  }, {
    content: <Chart token={token} />
  },
  {
    content: <TGpage></TGpage>
  }, {
    content: <BuildPage></BuildPage>
  }, {
    content: <BuildPage></BuildPage>
  }]

  return (
    <div>

      <Header />
      <div className={styles.topInfo}>
        <div className={styles.topInfoLeft}>
          {/* <div className={styles.myFollow}>
            <div className={styles.myFollowTitle}>Hot tokens</div>
            <div className={styles.line}></div>
            <div className={styles.myFollowCoinlist}>
              {coins.map(item =>
                <div className={styles.myFollowCoinItem} key={item.name}>
                  <div className={styles.myFollowCoinItemName}>{item.name}</div>
                  <div className={styles.myFollowCoinItemChange}>{item.change}</div>
                </div>
              )}
            </div>
          </div> */}

          <div className={styles.coinTab}>
            <div className={styles.coinInfo}>
              <div className={styles.star}>
                <Image
                  width={24}
                  height={24}
                  src="/fonts/star.svg"
                  alt="" />
              </div>
              <div className={styles.coinName}>
                <div className={styles.coinNameTitle}>{token ? `${token.baseAsset}/${token.quoteAsset}` : "BTC/USDT"}</div>
                <div className={styles.coinExchangeChange}>Binance Exchange
                  <Image
                    width={8}
                    height={4}
                    src="/fonts/arrow-down.svg"
                    alt="" /></div>
              </div>

              <div className={styles.price}>
                <div className={styles.priceTitle}>{token ? formatTs(token.lastPrice) : ''}</div>
                <div className={styles.priceContent}>${token ? formatTs(token.lastPrice) : ''}</div>

              </div>
            </div>
            <div className={styles.lineTab}>
            </div>
            <div className={styles.tabs}>
              {tabs.map((item, index) =>
                <div className={`${styles.tab} ${index == activeTab ? styles.activeTab : ''}`}
                  onClick={() => {
                    setActiveTab(index)
                  }}
                >
                  <Image
                    width={12}
                    height={12}
                    src={`${item.icon}${index == activeTab ? '-white' : ''}.svg`}
                    alt="" />{item.name}
                </div>

              )}
            </div>
          </div>
        </div>
        <div className={styles.banner}>
          {/* <Image
            fill
            style={{ objectFit: "contain" }}

            src="/images/banner.png"
            alt="" /> */}
            BANNER 
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyLeft}>
          {tabContents[activeTab].content}
        </div>
        <div className={styles.bodyRight}>
          <TokenSelector setToken={setToken}></TokenSelector>
        </div>
      </div>

    </div>
  );
};

export default Home;

