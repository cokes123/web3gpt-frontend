// services/aiReportService.js
import axios from 'axios';

interface XOfficialStatsParams {
  token: string;
  start: string;
  end: string;
}

interface Stat {
  date: string;
  count: number;
}

interface XOfficialStatsResponse {
  follows: Stat[];
  reposts: Stat[];
  comments: Stat[];
  likes: Stat[];
}
const base_url = "http://chat.chainservice.io:8888/api/v1/lazibit"
const base2_url = "https://api.lazibit.ai/v1";

/**
 * 封装的函数，用于请求 AI 的 K-line report。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.token - 代币，例如 'bitcoin'。
 * @param {string} params.exchange - 交易所名称，例如 'binance'。
 * @param {string} params.start - 起始时间戳（秒）。
 * @param {string} params.end - 结束时间戳（秒）。
 * @param {string} params.interval - 时间间隔（'hourly' 或 'daily'）。
 * @param {string} [params.language='en'] - 语言代码（'en', 'cn', 'kr'）。
 * @param {number} [params.withOrderBook=0] - 是否包含 order book，0 或 1。
 * @returns {Promise<object>} 返回包含 `ai_report` 的数据对象。
 * @throws {Error} 如果API返回错误或请求失败。
 */
export async function fetchKLineReport({
  token,
  exchange,
  start,
  end,
  interval,
  language = "en",
  withOrderBook = 0,
}) {
  try {
    const url = base_url + "/ai/k_line_report";

    const requestData = {
      token,
      exchange,
      start,
      end,
      interval,
      language,
      with_order_book: withOrderBook,
    };

    const response = await axios.post(url, requestData);

    if (response.data.code === 1) {
      return response.data.data.ai_report;
    } else {
      throw new Error(response.data.msg || 'Unknown error from API');
    }
  } catch (error) {
    console.error('Error fetching K-line report:', error.message);
    throw error;
  }
}

/**
 * 封装的函数，用于请求 AI 的 X report。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.token - 代币，例如 'bitcoin'。
 * @param {string} params.start - 起始时间戳（秒）。
 * @param {string} params.end - 结束时间戳（秒）。
 * @param {string} [params.language='en'] - 语言代码（'en', 'cn', 'kr'）。
 * @returns {Promise<string>} 返回包含 `ai_report` 的 Markdown 文本。
 * @throws {Error} 如果API返回错误或请求失败。
 */
export async function fetchXReport({
  token,
  start,
  end,
  language = "en",
}) {
  try {
    const url = base_url + "/x/ai_report"; // 请确认正确的 API 端点

    const requestData = {
      token,
      start,
      end,
      language,
    };

    const response = await axios.post(url, requestData);

    if (response.data.code === 0 || response.data.code === 1) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg || 'Unknown error from API');
    }
  } catch (error) {
    console.error('Error fetching X report:', error.message);
    throw error;
  }
}



/**
 * 封装的函数，用于请求 AI 的 X Official Stats。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.token - 代币，例如 'bitcoin'。
 * @param {string} params.start - 起始时间戳（秒）。
 * @param {string} params.end - 结束时间戳（秒）。
 * @returns {Promise<Object>} 返回包含 `follows`, `reposts`, `comments`, `likes` 的数据对象。
 * @throws {Error} 如果API返回错误或请求失败。
 */
export async function fetchXOfficialStats({
  token,
  start,
  end,
}: XOfficialStatsParams) {
  try {
    const url = base_url + "/x/official_stats"; // 请确认正确的 API 端点

    const requestData = {
      token,
      start,
      end,
    };

    const response = await axios.post(url, requestData);

    // 检查返回结果 code 是否为 0
    if (response.data.code === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg || 'Unknown error from API');
    }
  } catch (error) {
    console.error('Error fetching X Official Stats:', error.message);
    throw error;
  }
}
interface XCategoryPostsParams {
  token: string;
  start: string;
  end: string;
  category: string;
}

/**
 * 封装的函数，用于请求 AI 的 X Category Posts。
 * @param {XCategoryPostsParams} params - 请求参数对象。
 * @param {string} params.token - 代币，例如 'bitcoin'。
 * @param {string} params.start - 起始时间戳（秒）。
 * @param {string} params.end - 结束时间戳（秒）。
 * @param {string} params.category - 类别，例如 'announcement', 'cooperation', 'technical_update'。
 * @returns {Promise<Post[]>} 返回包含多个帖子的数组。
 * @throws {Error} 如果API返回错误或请求失败。
 */
export async function fetchXCategoryPosts({
  token,
  start,
  end,
  category,
}: XCategoryPostsParams) {
  try {
    const url = `${base_url}/x/category_posts`; // 请确认正确的 API 端点

    const requestData = {
      token,
      start,
      end,
      category,
    };

    const response = await axios.post(url, requestData);

    // 检查返回结果 code 是否为 0
    if (response.data.code === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg || 'Unknown error from API');
    }
  } catch (error: any) {
    console.error('Error fetching X Category Posts:', error.message || error);
    throw error;
  }
}

/**
 * 封装的函数，用于请求 K 线数据。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.symbol - 交易对，例如 'BTCUSDT'。
 * @param {string} params.interval - 时间间隔，例如 '1m', '5m', '1h', '1d'。
 * @param {string} params.exchange - 交易所名称，例如 'binance'。
 * @returns {Promise<RawCandleData[]>} 返回包含 K 线数据的数组。
 * @throws {Error} 如果API返回错误或请求失败。
 */
export interface RawCandleData {
  t: number;      // 起始时间（毫秒级时间戳）
  T: number;      // 结束时间
  s: string;      // 交易对
  i: string;      // K线间隔
  f: number;      // 第一笔成交ID
  L: number;      // 最后一笔成交ID
  o: string;      // 开盘价
  c: string;      // 收盘价
  h: string;      // 最高价
  l: string;      // 最低价
  v: string;      // 成交量
  n: number;      // 成交数量笔数
  x: boolean;     // K线是否完结
  q: string;      // 成交额
  V: string;      // 主动买入的成交量
  Q: string;      // 主动买入的成交额
  B: string;      // 忽略
  ex: string;     // 交易所名字
}

export async function fetchKLines({
  symbol,
  interval,
  exchange,
}: {
  symbol: string;
  interval: string;
  exchange: string;
}): Promise<RawCandleData[]> {
  try {
    const url = `${base2_url}/klines`;
    const params = { symbol, interval, exchange };
    const response = await axios.get('https://bibobibo.xyz/api/trades/kline?tokenId=bitcoin&from=1731784980&to=1734290580');

    if (response.status === 200) {
      // 假设API返回的数据结构为 { data: RawCandleData[] }
      return response.data.data;
    } else {
      throw new Error(`API responded with status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error fetching K-lines:', error.message);
    throw error;
  }
}

