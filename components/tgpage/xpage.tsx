import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchTGReport, fetchXCategoryPosts, fetchXOfficialStats, fetchXReport } from '@/api/aiReportService';
import Loading from '../loading/loading';
import ReactMarkdown from 'react-markdown';
import LineChart from '../lineChart/lineChart';

const timeTabs = [
  { name: '1s' },
  { name: '15m' },
  { name: '1H' },
  { name: '4H' },
  { name: '1D' },
  { name: '1W' },

]
const tabs = [
  { name: '粉丝数量与互动量' },
  { name: '市场情绪' },
  { name: '内容更新' },
  { name: 'KOL' },
  { name: '媒体' },
  { name: '标签热度' },
  { name: '推特/文章' },
  { name: '竞品对比' },
]

const TGpage: React.FC = () => {
  const [aiData, setAidata] = useState()
  const [activeTab, setActiveTab] = useState(0)
  const [postData, setPostData] = useState([])

  const [fans, setFans] = useState<any>()
  const fetchXReportFunc = async () => {
    try {
      const xReportParams = {
        token: 'ETH',
        start: '1733791787',
        end: '1733878197',
        language: 'en',
      };
      const data = await fetchTGReport(xReportParams);
      console.log(data)
      setAidata(data.ai_report)
    } catch (error) {
      console.error('Failed to fetch X Report:', error.message);
    }
  }
  const fetchXOfficialStatsFunc = async () => {
    try {
      const xOfficialStatsParams = {
        token: 'bitcoin',
        start: '1733791787',
        end: '1733878197',
      };
      const xOfficialStats = await fetchXOfficialStats(xOfficialStatsParams);
      setFans(xOfficialStats)
    } catch (error) {
      console.error('Failed to fetch X Official Stats:', error.message);
    }

    const params = {
      token: 'bitcoin',
      start: '1733791787',
      end: '1733878197',
      category: 'announcement', // 例如 'announcement'
    };

    try {
      const data = await fetchXCategoryPosts(params);
      console.log('Fetched Posts:', data.posts);
      setPostData(data.posts)
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }
  useEffect(() => {
    fetchXReportFunc()
    fetchXOfficialStatsFunc()
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.headerTab}>
        <div className={styles.headerTitle}>{'X'}</div>
        <div className={styles.headerLine}></div>
        <div className={styles.timeTabs}>
          <div className={styles.timeTab}>Time</div>
          {timeTabs.map(item => <div className={styles.timeTab} key={item.name}>
            {item.name}
          </div>)}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.aiReport}>
          <div className={styles.aiReportTitle}>{'AI Analysis Report:'}</div>
          {!aiData ? <Loading /> : <div className={styles.markdwon}>
            <ReactMarkdown>{aiData}</ReactMarkdown>
          </div>}

        </div>
        <div className={styles.tabs}>
          {tabs.map((item, index) => <div
            onClick={() => {
              setActiveTab(index)
            }}
            className={`${styles.tab} ${index == activeTab ? styles.activeTab : ''}`} key={item.name}>
            {item.name}
          </div>)}
        </div>
        {activeTab == 0 && <div className={styles.tabContent}>
          {fans && <div className={styles.fans}>
            <div className={styles.lineLineChartItem}>
              <div className={styles.chartTitle}>
                {'X Follows'}
              </div>
              <LineChart data={fans.follows} />
            </div>
            <div className={styles.lineLineChartItem}>
              <div className={styles.chartTitle}>
                {'X Comments'}
              </div>
              <LineChart data={fans.comments} />
            </div>
            <div className={styles.lineLineChartItem}>
              <div className={styles.chartTitle}>
                {'X Likes'}
              </div>
              <LineChart data={fans.likes} />
            </div>
            <div className={styles.lineLineChartItem}>
              <div className={styles.chartTitle}>
                {'X Reposts'}
              </div>
              <LineChart data={fans.reposts} />
            </div>
          </div>}
        </div>}
        {activeTab == 1 && <div className={styles.tabContent}>

        </div>}
        {activeTab == 2 && <div className={styles.tabContent}>
          {
            postData && <div className={styles.fans}>
              {postData.map(item => <div className={styles.postDataItem}>
                <div> {item.authorName}</div>
                <div> {item.authorID}</div>
                <div> {item.tweetTime}</div>
                <div> {item.tweetText}</div>
                <div> {item.replies}</div>
                <div> {item.reposts}</div>
                <div> {item.likes}</div>
                <div> {item.views}</div>
              </div>)}

            </div>
          }
        </div>}
        {activeTab == 3 && <div className={styles.tabContent}>

        </div>}
      </div>
    </div>
  );
};

export default TGpage;
