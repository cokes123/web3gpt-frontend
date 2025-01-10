import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import { fetchXCategoryPosts, fetchXKOLMentionsModel, fetchXKOLRelatedPostsModel, fetchXKeywordStatsModel, fetchXKeywordsModel, fetchXOfficialStats, fetchXReport, fetchXSentimentModel } from '@/api/aiReportService';
import Loading from '../loading/loading';
import ReactMarkdown from 'react-markdown';
import LineChart from '../lineChart/lineChart';
import SentimentsPieChart from '../pieChart/pieChart';
import SentimentsPieCharts from '../pieChart/pieChart';
import { formatISODate } from '@/utils/utils';
import Image from 'next/image'

const timeTabs = [
  { name: '1s' },
  { name: '15m' },
  { name: '1H' },
  { name: '4H' },
  { name: '1D' },
  { name: '1W' },

]
const tabs = [
  { name: 'Number of fans and interactions' },
  { name: 'Market sentiment' },
  { name: 'Content Updates' },
  { name: 'KOL' },
  // { name: '媒体' },
  { name: 'Tags popularity' },
  { name: 'AI analysis report' },

  // { name: '推特/文章' },
  // { name: '竞品对比' },
]

const Xpage = ({ token = { baseAsset: 'BTC' } }) => {
  const [aiData, setAidata] = useState()
  const [activeTab, setActiveTab] = useState(0)
  const [postData, setPostData] = useState<any>()

  const [fans, setFans] = useState<any>()
  const [sentiments, setSentiments] = useState<any>()
  const [XKOLRelatedPostsModel, setXKOLRelatedPostsModel] = useState<any>()
  const [XKOLMentions, setXKOLMentionsModel] = useState<any>()
  const [keywords, setKeywords] = useState<any>()
  const [keywordStats, setKeywordStats] = useState<any>()
  const [activeKeyword, setActiveKeyword] = useState(0)


  // Create refs for each tab content
  const tabRefs = useRef([]);

  const fetchXReportFunc = async () => {
    try {
      const xReportParams = {
        token: token.baseAsset,
        start: '1733791787',
        end: '1733878197',
        language: 'en',
      };
      const data = await fetchXReport(xReportParams);
      console.log(data)
      setAidata(data.ai_report)
    } catch (error) {
      console.error('Failed to fetch X Report:', error.message);
    }
  }
  const fetchXOfficialStatsFunc = async () => {
    try {
      const xOfficialStatsParams = {
        token: token.baseAsset,
        start: '1733791787',
        end: '1733878197',
      };
      const xOfficialStats = await fetchXOfficialStats(xOfficialStatsParams);
      setFans(xOfficialStats)
    } catch (error) {
      console.error('Failed to fetch X Official Stats:', error.message);
    }

    try {
      const xOfficialStatsParams = {
        token: token.baseAsset,

        start: '1733791787',
        end: '1733878197',
      };
      const sentimentsrsp = await fetchXSentimentModel(xOfficialStatsParams);
      setSentiments(sentimentsrsp.sentiments)
    } catch (error) {
      console.error('Failed to fetch X Official Stats:', error.message);
    }


    try {
      const params = {
        token: token.baseAsset,
        start: '1733791787',
        end: '1733878197',
        category: 'announcement', // 例如 'announcement'
      };
      const data = await fetchXCategoryPosts(params);
      console.log('Fetched Posts:', data.posts);
      setPostData(data.posts)
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
    try {
      const params = {
        token: token.baseAsset,
        search: ''
      };
      const data = await fetchXKOLRelatedPostsModel(params);
      console.log('Fetched Posts:', data.posts);
      setXKOLRelatedPostsModel(data.posts)
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
    try {
      const params = {
        token: token.baseAsset,
        start: '1733791787',
        end: '1733878197',
        category: 'announcement', // 例如 'announcement'
      };
      const data = await fetchXKOLMentionsModel(params);
      console.log('Fetched Posts:', data.posts);
      setXKOLMentionsModel(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
    try {
      const params = {
        token: token.baseAsset,
        keyword: ''
      };
      const data = await fetchXKeywordsModel(params);
      setKeywords(data.keywords)
      fetchXKeywordStatsModelFunc(data.keywords[0])
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }
  const fetchXKeywordStatsModelFunc = async (keyword) => {
    const params = {
      token: token.baseAsset,
      keyword: keyword
    };

    const dataStats = await fetchXKeywordStatsModel(params);
    setKeywordStats(dataStats)
  }
  useEffect(() => {
    fetchXReportFunc()
    fetchXOfficialStatsFunc()
  }, [token.baseAsset]);

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.6, // Trigger when 60% of the content is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveTab(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    tabRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    tabRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className={styles.content}>
      <div className={styles.headerTab}>
        <div className={styles.headerTitle}>{'X'}</div>
        <div className={styles.headerLine}></div>
        <div className={styles.timeTabs}>
          <div className={styles.timeTab}>The information of tokens regarding the data statistics on the x platform.</div>
          {/* {timeTabs.map(item => <div className={styles.timeTab} key={item.name}>
            {item.name}
          </div>)
          } */}
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((item, index) => <div
          onClick={() => {
            handleTabClick(index)
          }}
          className={`${styles.tab} ${index == activeTab ? styles.activeTab : ''}`} key={item.name}>
          {item.name}
        </div>)}
      </div>
      <div className={styles.body} >

        <div className={styles.nonecontent} data-index={0}
          //@ts-ignore
          ref={(el) => (tabRefs.current[0] = el)}>

        </div>
        {!keywords && <div className={styles.tabContent} style={{ height: '900px' }}></div>}
        {fans && <div className={styles.tabContent}>

          {fans && <>
            <div className={styles.contentTitle}>{tabs[0].name}</div>
            <div className={styles.fans}>
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
            </div></>}
        </div>}
        <div className={styles.nonecontent} data-index={1}
          //@ts-ignore
          ref={(el) => (tabRefs.current[1] = el)}></div>
        {sentiments && <div className={styles.tabContent} >
          <><div className={styles.contentTitle}>{tabs[1].name}</div>
            <SentimentsPieCharts sentiments={sentiments} /></>
        </div>}
        <div className={styles.nonecontent} data-index={2}
          //@ts-ignore
          ref={(el) => (tabRefs.current[2] = el)}></div>

        {postData && <div className={styles.tabContent} >
          {
            postData && <><div className={styles.contentTitle}>{tabs[2].name}</div><div className={styles.fans}>
              {postData.map(item =>
                <XCard item={item} />
              )}
              {postData.map(item =>
                <XCard item={item} />
              )}
            </div></>
          }
        </div>}
        <div className={styles.nonecontent} data-index={3}
          //@ts-ignore
          ref={(el) => (tabRefs.current[3] = el)}></div>
        {XKOLMentions && <div className={styles.tabContent} >
          {XKOLMentions && <><div className={styles.contentTitle}>{tabs[3].name}</div>
            <div className={styles.fans}>
              <div className={styles.lineLineChartItem}>
                <div className={styles.chartTitle}>
                  {'KOL Interaction'}
                </div>
                <LineChart data={XKOLMentions.kols} />
              </div>
              <div className={styles.lineLineChartItem}>
                <div className={styles.chartTitle}>
                  {'KOL mention rate'}
                </div>
                <LineChart data={XKOLMentions.posts} />
              </div>
            </div></>}
          {
            XKOLRelatedPostsModel && <div className={styles.fans}>
              {XKOLRelatedPostsModel.map(item =>
                <XCard item={item} />
              )}

            </div>
          }
        </div>}
        <div className={styles.nonecontent} data-index={4}
          //@ts-ignore
          ref={(el) => (tabRefs.current[4] = el)}></div>

        {keywords && <div className={styles.tabContent} >

          {keywords && <><div className={styles.contentTitle}>{tabs[4].name}</div>
            <div className={styles.keywords}>
              {keywords.map((item, index) => {
                return <div
                  onClick={() => { setActiveKeyword(index); fetchXKeywordStatsModelFunc(keywords[index]) }}
                  className={`${styles.keyword} ${index == activeKeyword ? styles.activekeywords : ''}`}>
                  {item}
                </div>
              })}
            </div></>}
          {keywordStats && <div className={styles.fans}>
            <div className={styles.lineLineChartItem}>
              <div className={styles.chartTitle}>
                {keywords[activeKeyword]}
              </div>
              <LineChart data={keywordStats.mentions} />
            </div>


          </div>}
          {
            keywordStats && <div className={styles.fans}>
              {keywordStats.posts.map(item =>
                <XCard item={item} />
              )}

            </div>
          }
        </div>}
        <div className={styles.nonecontent} data-index={5}
          //@ts-ignore
          ref={(el) => (tabRefs.current[5] = el)}></div>

        {aiData && <div className={styles.tabContent} >
          <><div className={styles.contentTitle}>{tabs[5].name}</div><div className={styles.aiReport}>

            {!aiData ? <Loading /> : <div className={styles.markdwon}>
              <ReactMarkdown>{aiData}</ReactMarkdown>
            </div>}

          </div>
          </>
        </div>}
      </div>
    </div>
  );
};

const XCard = ({ item }) => {

  return <div className={styles.postDataItem}>

    <div className={styles.postDataName}> {item.authorName}
      <div className={styles.postAuthorId}> {item.authorID}</div>
      <div className={styles.postAuthorId}> {formatISODate(item.tweetTime)}</div>
    </div>
    <div className={styles.postContent}> {item.tweetText}</div>
    <div className={styles.postIcons}>
      <div className={styles.postIcon}>
        <Image
          width={12}
          height={12}
          src="/fonts/x-0.svg"
          alt="" /> {item.replies}</div>
      <div className={styles.postIcon}>
        <Image
          width={12}
          height={12}
          src="/fonts/x-0.svg"
          alt="" /> {item.reposts}</div>
      <div className={styles.postIcon}>
        <Image
          width={12}
          height={12}
          src="/fonts/x-0.svg"
          alt="" /> {item.likes}</div>
      <div className={styles.postIcon}>
        <Image
          width={12}
          height={12}
          src="/fonts/x-0.svg"
          alt="" /> {item.views}</div>
    </div>

  </div>
}
export default Xpage;
