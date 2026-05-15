import { isSameDay, isSameMonth, isToday } from 'date-fns';
import { useState } from 'react';
import type { CalendarEvent } from '../types';
import EventBadge from './EventBadge';

interface Props {
  day: Date;
  currentMonth: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const MAX_VISIBLE = 3;

export default function CalendarDay({ day, currentMonth, events, onEventClick }: Props) {
  const [showAll, setShowAll] = useState(false);
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const todayFlag = isToday(day);

  const dayEvents = events.filter(e => isSameDay(e.displayDate, day));
  const visible = showAll ? dayEvents : dayEvents.slice(0, MAX_VISIBLE);
  const hidden = dayEvents.length - MAX_VISIBLE;

  return (
    <div
      className={`min-h-24 p-1.5 border-b border-r border-gray-100 flex flex-col gap-1 ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      <div className="flex justify-end">
        <span
          className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
            todayFlag
              ? 'bg-blue-600 text-white'
              : isCurrentMonth
              ? 'text-gray-700'
              : 'text-gray-300'
          }`}
        >
          {day.getDate()}
        </span>
      </div>
      <div className="space-y-0.5 flex-1">
        {visible.map(ev => (
          <EventBadge key={ev.id} event={ev} onClick={onEventClick} />
        ))}
        {!showAll && hidden > 0 && (
          <button
            className="text-xs text-blue-500 hover:text-blue-700 font-medium px-1"
            onClick={e => { e.stopPropagation(); setShowAll(true); }}
          >
            +{hidden} more
          </button>
        )}
        {showAll && dayEvents.length > MAX_VISIBLE && (
          <button
            className="text-xs text-gray-400 hover:text-gray-600 px-1"
            onClick={e => { e.stopPropagation(); setShowAll(false); }}
          >
            show less
          </button>
        )}
      </div>
    </div>
  );
}
