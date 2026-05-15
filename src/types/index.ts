export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export type ProcedureType = 'oocyte_retrieval' | 'embryo_transfer';
export type EmbryoAge = 'day5' | 'day3';
export type AdjustmentReason = 'sunday' | 'korean_holiday';

export interface Patient {
  id: string;
  name: string;
  procedureType: ProcedureType;
  procedureDate: Date;
  embryoAge?: EmbryoAge;
  color: string;
}

export interface CalendarEvent {
  id: string;
  patientId: string;
  patientName: string;
  label: string;
  originalDate: Date;
  displayDate: Date;
  adjustmentReason?: AdjustmentReason;
  adjustmentHolidayName?: string;
  color: string;
  procedureType: ProcedureType;
  embryoAge?: EmbryoAge;
}
