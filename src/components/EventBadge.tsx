import type { CalendarEvent } from '../types';

interface Props {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

export default function EventBadge({ event, onClick }: Props) {
  const isAdjusted = !!event.adjustmentReason;

  return (
    <button
      onClick={e => { e.stopPropagation(); onClick(event); }}
      title={event.label}
      className="w-full text-left rounded px-1.5 py-0.5 text-xs font-medium truncate flex items-center gap-1 transition-opacity hover:opacity-80 cursor-pointer"
      style={{ backgroundColor: event.color + '22', color: event.color, borderLeft: `3px solid ${event.color}` }}
    >
      <span className="truncate flex-1">{event.label}</span>
      {isAdjusted && (
        <span title="Date adjusted" className="flex-shrink-0 text-[10px]">⚑</span>
      )}
    </button>
  );
}
