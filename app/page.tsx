"use client"
import React, { useEffect, useState } from "react";
import styles from './index.module.css';
import Image from 'next/image'

import Header from "@/components/header/header";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {

  const router = useRouter();


  return (
    <div>
      <Header />
      <div className={styles.comprehensive}>
        <Image
          fill
          style={{
            objectFit: "cover",
            zIndex: 1
          }}
          src="/images/back.svg"
          alt="" />
        <div className={styles.comprehensiveLeft}>
          <div className={styles.comprehensiveTitle}>
            {'Comprehensive Data Analysis, All on One Page, AI-Powered Efficient Trading.'}
          </div>
          <div className={styles.goButton} onClick={() => {
            router.push('/app?token=BTC')
          }}>
            {'GO TO APP'}
          </div>

        </div>

      </div>
      <div className={styles.advantages}>
        <div className={styles.advantagesLeft}>
          <div className={styles.advantagesLeftTitle}>
            {'Core Advantages of Lazibit.AI'}
          </div>
          <Image
            width={409}
            height={322}

            src="/images/home-advantage.png"
            alt="" />
        </div>
        <div className={styles.advantagesRight}>
          <div className={styles.advantagesRightItem}>
            <div className={styles.advantagesRightTitle}>
              <div className={styles.advantagesRightImage}>
                <Image
                  width={22}
                  height={22}

                  src="/fonts/home-1.svg"
                  alt="" />
              </div>
              Comprehensive Data Analysis
            </div>
            <div className={styles.advantagesRightContent}>
              Quickly access project trend analysis, on-chain data, community popularity, KOL trends, technical progress, and changes at a glance.
            </div>
          </div>
          <div className={styles.advantagesRightItem}>
            <div className={styles.advantagesRightTitle}>
              <div className={styles.advantagesRightImage}>
                <Image
                  width={22}
                  height={22}

                  src="/fonts/home-2.svg"
                  alt="" />
              </div>
              Smart Notification System
            </div>
            <div className={styles.advantagesRightContent}>
              Customize SMS, phone, or Telegram notifications to ensure you never miss any market movements.
            </div>
          </div>
          <div className={styles.advantagesRightItem}>
            <div className={styles.advantagesRightTitle}>
              <div className={styles.advantagesRightImage}>
                <Image
                  width={22}
                  height={22}

                  src="/fonts/home-3.svg"
                  alt="" />
              </div>
              AI Companion Bot Assistant
            </div>
            <div className={styles.advantagesRightContent}>
              Customize trading parameters, real-time strategy evaluation, and achieve automated trading effortlessly.
            </div>
          </div>
          <div className={styles.advantagesRightItem}>
            <div className={styles.advantagesRightTitle}>
              <div className={styles.advantagesRightImage}>
                <Image
                  width={22}
                  height={22}

                  src="/fonts/home-4.svg"
                  alt="" />
              </div>
              Multi-platform Aggregation
            </div>
            <div className={styles.advantagesRightContent}>
              Supports global exchanges, integrates data into one page, and provides a seamless experience.
            </div>
          </div>
          <div className={styles.advantagesRightItem}>
            <div className={styles.advantagesRightTitle}>
              <div className={styles.advantagesRightImage}>
                <Image
                  width={22}
                  height={22}

                  src="/fonts/home-1.svg"
                  alt="" />
              </div>
              AI-Driven K-Line Analysis
            </div>
            <div className={styles.advantagesRightContent}>
              AI-powered K-Line analysis to predict future price trends and gain an edge in the market.
            </div>
          </div>
        </div>

      </div>

      <div className={styles.pageDisplay}>
        <Image
          fill
          style={{
            objectFit: "cover",
            zIndex: 1
          }}
          src="/images/back.svg"
          alt="" />
        <div className={styles.displayTitle}>
          {"Lazibit.AI Page Display"}
        </div>
        <div className={styles.displayImage}>
          <Image
            width={1022}
            height={658}
            src="/images/home-top.png"
            alt="" />
        </div>
      </div>
      <div className={styles.corefunction}>
        <div className={styles.corefunctionTitle}>
          {'Core Function Titles'}
        </div>
        <div className={styles.functionItem}>
          <div className={styles.functionText}>
            <div className={styles.functionItemTitle}>
              {"Social Media and Community"}
            </div>
            <div className={styles.funcionItemContent}>
              {"Gain valuable insights into project community dynamics and monitor real-time shifts in sentiment through our aggregate global Web3 news to ensure proactive awareness of market developments. Leverage the power of KOLs in our platform to understand market consensus and stay ahead of emerging trends. "}
            </div>
            <div className={styles.funcionItemButton}>
              {"Detalis"}
              <Image
                width={20}
                height={20}
                src="/fonts/arrow.svg"
                alt="" />
            </div>
          </div>
          <div className={styles.functionImage}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/fonts/core-fun-1.png"
              alt="" />
          </div>
        </div>
        <div className={styles.functionItem}>

          <div className={styles.functionImage}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/fonts/core-fun-2.png"
              alt="" />
          </div>
          <div className={styles.functionText}>
            <div className={styles.functionItemTitle}>
              {"K-Line Analysis"}
            </div>
            <div className={styles.funcionItemContent}>
              {"A wealth of historical data used to analyze and predict price movements, helping users to interpret market sentiment and identifying key trends. Use Lazibit analysis to uncover trading opportunities and make informed, strategic decisions."}
            </div>
            <div className={styles.funcionItemButton}>
              {"Detalis"}
              <Image
                width={20}
                height={20}
                src="/fonts/arrow.svg"
                alt="" />
            </div>
          </div>
        </div>
        <div className={styles.functionItem}>
          <div className={styles.functionText}>
            <div className={styles.functionItemTitle}>
              {"On-chain Data Analysis"}
            </div>
            <div className={styles.funcionItemContent}>
              {"Unlock actionable insights by decoding on-chain data, tracking market trends, user behavior, and network activity. Use these insights for your investment strategies to enhance risk management, and enable data-driven decision-making."}
            </div>
            <div className={styles.funcionItemButton}>
              {"Detalis"}
              <Image
                width={20}
                height={20}
                src="/fonts/arrow.svg"
                alt="" />
            </div>
          </div>
          <div className={styles.functionImage}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/fonts/core-fun-3.png"
              alt="" />
          </div>
        </div>
        <div className={styles.functionItem}>

          <div className={styles.functionImage}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/fonts/core-fun-4.png"
              alt="" />
          </div>
          <div className={styles.functionText}>
            <div className={styles.functionItemTitle}>
              {"Real-Time Alerts"}
            </div>
            <div className={styles.funcionItemContent}>
              {"Stay updated with notifications on market movements and price fluctuations. Lazibit monitor real-time changes in community sentiment, giving you the benefit from our custom metrics and condition-based alerts to seize the trade."}
            </div>
            <div className={styles.funcionItemButton}>
              {"Detalis"}
              <Image
                width={20}
                height={20}
                src="/fonts/arrow.svg"
                alt="" />
            </div>
          </div>
        </div>
        <div className={styles.functionItem}>
          <div className={styles.functionText}>
            <div className={styles.functionItemTitle}>
              {"Aggregation Transaction"}
            </div>
            <div className={styles.funcionItemContent}>
              {"Real time prices from multiple exchanges and aggregator sources. Lazibit smart algorithms identify the most efficient trade execution paths. Reduce costs, enhance operational efficiency, and maximize returns for users through optimized trading solutions."}
            </div>
            <div className={styles.funcionItemButton}>
              {"Detalis"}
              <Image
                width={20}
                height={20}
                src="/fonts/arrow.svg"
                alt="" />
            </div>
          </div>
          <div className={styles.functionImage}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/fonts/core-fun-5.png"
              alt="" />
          </div>
        </div>
      </div>
      <div className={styles.userExperience}>
        <Image
          fill
          style={{
            objectFit: "cover",
            zIndex: 1
          }}
          src="/images/back.svg"
          alt="" />
        <div className={styles.userExperienceTitle}>
          {'User Experience Process'}
        </div>
        <div className={styles.userExperienceContent}>
          <div className={styles.userExperienceLine}></div>
          <div className={styles.userExperienceItem}>
            <div className={styles.userExperienceImage}>
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/fonts/userExperience-1.png"
                alt="" />
            </div >
            <div className={styles.userExperienceItemTitle}>
              {"Register an account"}
            </div>
            <div className={styles.userExperienceItemContent}>
              {"Enter your email address for quick registration."}
            </div>
          </div>
          <div className={styles.userExperienceArrow}>
            <Image
              width={16}
              height={16}
              src="/fonts/arrow-1.svg"
              alt="" />
          </div>
          <div className={styles.userExperienceItem}>
            <div className={styles.userExperienceImage}>
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/fonts/userExperience-2.png"
                alt="" />
            </div >
            <div className={styles.userExperienceItemTitle}>
              {"Set Focus Tokens"}
            </div>
            <div className={styles.userExperienceItemContent}>
              {"Select tokens and metrics of interest."}
            </div>
          </div>
          <div className={styles.userExperienceArrow}>
            <Image
              width={16}
              height={16}
              src="/fonts/arrow-1.svg"
              alt="" />
          </div>
          <div className={styles.userExperienceItem}>
            <div className={styles.userExperienceImage}>
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/fonts/userExperience-3.png"
                alt="" />
            </div >
            <div className={styles.userExperienceItemTitle}>
              {"View Analytics Reports"}
            </div>
            <div className={styles.userExperienceItemContent}>
              {"extract value from your data"}
            </div>
          </div>
          <div className={styles.userExperienceArrow}>
            <Image
              width={16}
              height={16}
              src="/fonts/arrow-1.svg"
              alt="" />
          </div>
          <div className={styles.userExperienceItem}>
            <div className={styles.userExperienceImage}>
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/fonts/userExperience-4.png"
                alt="" />
            </div >
            <div className={styles.userExperienceItemTitle}>
              {"Smart Trading"}
            </div>
            <div className={styles.userExperienceItemContent}>
              {"Automate your trading with AI assistants."}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.howWork}>
        <div className={styles.howWorkTitle}>
          {'How Lazibit.AI works'}
        </div>
        <Image
          width={1200}
          height={395}
          src="/images/howwork.png"
          alt="" />

      </div>
      <div className={styles.startNow}>
        <Image
          fill
          style={{
            objectFit: "cover",
            zIndex: 1
          }}
          src="/images/back.svg"
          alt="" />
        <div className={styles.startNowTitle}>
          {'Start Now and Unlock the Future of Smart Trading！'}
        </div>
        <div className={styles.startNowButtons}>
          <div className={styles.startNowButton}>
            {'Free Trial'}
          </div>
          <div className={styles.startNowButton}>
            {'Upgrade for Advanced Features'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
