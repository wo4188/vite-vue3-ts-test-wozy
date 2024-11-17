import dayjs from 'dayjs';

//#region 工具类函数 —— 异步延迟

/**
 * 异步延迟
 * @param ms 毫秒
 */
export function asyncDelay(ms: number): Promise<void>;
/**
 * 异步延迟
 * @param ms 毫秒
 * @param payload 承诺返回的数据
 */
export function asyncDelay<T>(ms: number, payload: T): Promise<T>;

export function asyncDelay<T>(ms: number, payload?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(payload), ms));
}
//#endregion

/**
 * 工具类函数 —— 简易版格式化日期
 * @param val 待格式化数据
 * @param formatStr 格式化占位符(默认 "YYYY-MM-DD HH:mm")
 * @returns 正常情况，返回 格式化后的文本。反之，返回 空字符串
 */
export function simpleFormatDate(val?: string | Date, formatStr: string = 'YYYY-MM-DD HH:mm') {
  if (!val) return ''; // 简单判断 val 的非有效传参情况，直接返回 空字符串

  return dayjs(val).format(formatStr);
}

export function nextTickRaf(cb: FrameRequestCallback) {
  return requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
