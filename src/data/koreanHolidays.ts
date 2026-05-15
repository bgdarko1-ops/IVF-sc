/**
 * Korean public holidays by year.
 * Key format: 'YYYY-MM-DD'
 * Value: holiday name in Korean (with English in parentheses)
 *
 * To update: add or modify entries for each year.
 * Substitute holidays (대체공휴일) are included where applicable.
 * Lunar calendar holidays (Seollal, Chuseok, Buddha's Birthday) change every year
 * and must be manually updated from the official government calendar.
 *
 * Source: https://www.data.go.kr (공공데이터포털 - 한국천문연구원 특일 정보)
 */
export const KOREAN_HOLIDAYS: Record<string, string> = {
  // ── 2024 ──────────────────────────────────────────────────────────────────
  '2024-01-01': '신정 (New Year\'s Day)',
  '2024-02-09': '설날 연휴',
  '2024-02-10': '설날',
  '2024-02-11': '설날 연휴',
  '2024-02-12': '설날 대체공휴일',
  '2024-03-01': '삼일절 (Independence Movement Day)',
  '2024-04-10': '국회의원선거일 (National Assembly Election)',
  '2024-05-05': '어린이날 (Children\'s Day)',
  '2024-05-06': '어린이날 대체공휴일',
  '2024-05-15': '부처님 오신 날 (Buddha\'s Birthday)',
  '2024-06-06': '현충일 (Memorial Day)',
  '2024-08-15': '광복절 (Liberation Day)',
  '2024-09-16': '추석 연휴',
  '2024-09-17': '추석 (Chuseok)',
  '2024-09-18': '추석 연휴',
  '2024-10-03': '개천절 (National Foundation Day)',
  '2024-10-09': '한글날 (Hangul Day)',
  '2024-12-25': '크리스마스 (Christmas)',

  // ── 2025 ──────────────────────────────────────────────────────────────────
  '2025-01-01': '신정 (New Year\'s Day)',
  '2025-01-28': '설날 연휴',
  '2025-01-29': '설날',
  '2025-01-30': '설날 연휴',
  '2025-03-01': '삼일절 (Independence Movement Day)',
  '2025-03-03': '삼일절 대체공휴일',
  '2025-05-05': '어린이날 (Children\'s Day)',
  '2025-05-06': '부처님 오신 날 (Buddha\'s Birthday) / 어린이날 대체공휴일',
  '2025-06-06': '현충일 (Memorial Day)',
  '2025-08-15': '광복절 (Liberation Day)',
  '2025-10-05': '추석 연휴',
  '2025-10-06': '추석 (Chuseok)',
  '2025-10-07': '추석 연휴',
  '2025-10-08': '추석 대체공휴일',
  '2025-10-03': '개천절 (National Foundation Day)',
  '2025-10-09': '한글날 (Hangul Day)',
  '2025-12-25': '크리스마스 (Christmas)',

  // ── 2026 ──────────────────────────────────────────────────────────────────
  '2026-01-01': '신정 (New Year\'s Day)',
  '2026-02-16': '설날 연휴',
  '2026-02-17': '설날',
  '2026-02-18': '설날 연휴',
  '2026-03-01': '삼일절 (Independence Movement Day)',
  '2026-03-02': '삼일절 대체공휴일',
  '2026-05-05': '어린이날 (Children\'s Day)',
  '2026-05-24': '부처님 오신 날 (Buddha\'s Birthday)',
  '2026-06-06': '현충일 (Memorial Day)',
  '2026-08-15': '광복절 (Liberation Day)',
  '2026-09-24': '추석 연휴',
  '2026-09-25': '추석 (Chuseok)',
  '2026-09-26': '추석 연휴',
  '2026-10-03': '개천절 (National Foundation Day)',
  '2026-10-05': '개천절 대체공휴일',
  '2026-10-09': '한글날 (Hangul Day)',
  '2026-12-25': '크리스마스 (Christmas)',

  // ── 2027 ──────────────────────────────────────────────────────────────────
  '2027-01-01': '신정 (New Year\'s Day)',
  '2027-02-06': '설날 연휴',
  '2027-02-07': '설날',
  '2027-02-08': '설날 연휴',
  '2027-02-09': '설날 대체공휴일',
  '2027-03-01': '삼일절 (Independence Movement Day)',
  '2027-05-05': '어린이날 (Children\'s Day)',
  '2027-05-13': '부처님 오신 날 (Buddha\'s Birthday)',
  '2027-06-06': '현충일 (Memorial Day)',
  '2027-08-15': '광복절 (Liberation Day)',
  '2027-08-16': '광복절 대체공휴일',
  '2027-09-14': '추석 연휴',
  '2027-09-15': '추석 (Chuseok)',
  '2027-09-16': '추석 연휴',
  '2027-10-03': '개천절 (National Foundation Day)',
  '2027-10-04': '개천절 대체공휴일',
  '2027-10-09': '한글날 (Hangul Day)',
  '2027-12-25': '크리스마스 (Christmas)',
};
