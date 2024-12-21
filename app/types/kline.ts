// types/kline.ts

export interface KlinePayload {
    e: string; // 事件类型
    market: string;
    k: KlineData;
  }
  
  export interface KlineData {
    t: number; // K线起始时间（毫秒）
    T: number; // K线结束时间（毫秒）
    s: string; // 交易对
    i: string; // K线时间间隔
    f: number;
    L: number;
    o: string; // 开盘价
    c: string; // 收盘价
    h: string; // 最高价
    l: string; // 最低价
    v: string; // 成交量
    n: number;
    x: boolean; // 是否完结
    q: string;
    V: string;
    Q: string;
    B: string;
    ex: string;
  }
  