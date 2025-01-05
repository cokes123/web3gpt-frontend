export function formatTs(ts: number): string {
  ts = Number(ts)
  if (ts < 1) {
    // 保留 3 位有效数字
    return Number(ts.toPrecision(3)).toLocaleString(); // toPrecision 方法用于指定有效数字
  } else {
    // 保留 2 位小数
    return Number(ts.toFixed(2)).toLocaleString(); // toFixed 方法用于指定小数位
  }
}

/**
* 格式化 ISO 日期字符串为指定格式
* @param {string} isoDate - ISO 格式的日期时间字符串 (例如: "2024-09-02T00:30:00+08:00")
* @returns {string} 格式化后的日期时间字符串 (例如: "2024-9-2 00:30")
*/
export function formatISODate(isoDate) {
  const dateObj = new Date(isoDate);

  // 获取年月日和时间值
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // 月份从 0 开始
  const day = dateObj.getDate();
  const hours = dateObj.getHours().toString().padStart(2, '0'); // 确保小时是2位
  const minutes = dateObj.getMinutes().toString().padStart(2, '0'); // 确保分钟是2位

  // 拼接成目标格式
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


