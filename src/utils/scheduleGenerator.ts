import { addDays, getDay, subDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import type { AdjustmentReason, CalendarEvent, Patient } from '../types';
import { getKoreanHolidayName, isKoreanPublicHoliday } from './holidayUtils';

interface AdjustResult {
  displayDate: Date;
  reason?: AdjustmentReason;
  holidayName?: string;
}

function adjustDate(date: Date): AdjustResult {
  if (getDay(date) === 0) {
    return { displayDate: subDays(date, 1), reason: 'sunday' };
  }
  const holidayName = getKoreanHolidayName(date);
  if (isKoreanPublicHoliday(date)) {
    return { displayDate: subDays(date, 1), reason: 'korean_holiday', holidayName };
  }
  return { displayDate: date };
}

function makeEvent(
  patient: Patient,
  label: string,
  originalDate: Date,
): CalendarEvent {
  const { displayDate, reason, holidayName } = adjustDate(originalDate);
  return {
    id: uuidv4(),
    patientId: patient.id,
    patientName: patient.name,
    label,
    originalDate,
    displayDate,
    adjustmentReason: reason,
    adjustmentHolidayName: holidayName,
    color: patient.color,
    procedureType: patient.procedureType,
    embryoAge: patient.embryoAge,
  };
}

function generateOPU(patient: Patient): CalendarEvent[] {
  const base = patient.procedureDate;
  return [
    makeEvent(patient, `${patient.name} - Post OPU Day 1`, addDays(base, 1)),
    makeEvent(patient, `${patient.name} - Post OPU Day 3`, addDays(base, 3)),
    makeEvent(patient, `${patient.name} - Post OPU Day 5`, addDays(base, 5)),
  ];
}

function generateET(patient: Patient): CalendarEvent[] {
  const base = patient.procedureDate;
  const offset = patient.embryoAge === 'day5' ? 9 : 11;
  const transferLabel = patient.embryoAge === 'day5' ? 'Day-5' : 'Day-3';
  const label = `${patient.name} - β-hCG test after ${transferLabel} embryo transfer`;
  return [makeEvent(patient, label, addDays(base, offset))];
}

export function generateSchedule(patient: Patient): CalendarEvent[] {
  if (patient.procedureType === 'oocyte_retrieval') return generateOPU(patient);
  return generateET(patient);
}
