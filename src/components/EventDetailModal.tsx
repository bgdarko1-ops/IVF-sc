import { format, isSameDay } from 'date-fns';
import type { CalendarEvent } from '../types';

interface Props {
  event: CalendarEvent;
  onClose: () => void;
}

const PROCEDURE_LABEL: Record<string, string> = {
  oocyte_retrieval: 'Oocyte Retrieval (OPU)',
  embryo_transfer: 'Embryo Transfer (ET)',
};

const EMBRYO_LABEL: Record<string, string> = {
  day5: 'Day-5 Embryo',
  day3: 'Day-3 Embryo',
};

const ADJUSTMENT_LABEL: Record<string, string> = {
  sunday: 'Sunday (clinic closed)',
  korean_holiday: 'Korean public holiday',
};

export default function EventDetailModal({ event, onClose }: Props) {
  const isAdjusted = !!event.adjustmentReason && !isSameDay(event.originalDate, event.displayDate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Colored top bar */}
        <div className="h-1.5" style={{ backgroundColor: event.color }} />

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {PROCEDURE_LABEL[event.procedureType]}
                {event.embryoAge ? ` · ${EMBRYO_LABEL[event.embryoAge]}` : ''}
              </p>
              <h3 className="text-base font-semibold text-gray-800 leading-snug">{event.label}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          <hr className="border-gray-100" />

          {/* Date info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: event.color + '22' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: event.color }}>
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {isAdjusted ? 'Scheduled date (adjusted)' : 'Scheduled date'}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {format(event.displayDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {isAdjusted && (
              <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div className="text-xs text-amber-700 space-y-1">
                  <p className="font-semibold">Date adjusted — moved 1 day earlier</p>
                  <p>
                    Original calculated date:{' '}
                    <span className="font-medium">{format(event.originalDate, 'EEE, MMM d, yyyy')}</span>
                  </p>
                  <p>
                    Reason:{' '}
                    <span className="font-medium">
                      {ADJUSTMENT_LABEL[event.adjustmentReason!]}
                      {event.adjustmentHolidayName ? ` (${event.adjustmentHolidayName})` : ''}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
