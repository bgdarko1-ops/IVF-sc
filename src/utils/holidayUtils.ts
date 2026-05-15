import { format } from 'date-fns';
import { KOREAN_HOLIDAYS } from '../data/koreanHolidays';

export function isKoreanPublicHoliday(date: Date): boolean {
  const key = format(date, 'yyyy-MM-dd');
  return key in KOREAN_HOLIDAYS;
}

export function getKoreanHolidayName(date: Date): string | undefined {
  const key = format(date, 'yyyy-MM-dd');
  return KOREAN_HOLIDAYS[key];
}
