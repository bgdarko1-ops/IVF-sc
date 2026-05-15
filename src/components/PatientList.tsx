import type { Patient } from '../types';
import { format } from 'date-fns';

interface Props {
  patients: Patient[];
  onDelete: (id: string) => void;
}

const PROCEDURE_LABEL = {
  oocyte_retrieval: 'OPU',
  embryo_transfer: 'ET',
};

const EMBRYO_LABEL: Record<string, string> = {
  day5: 'D5',
  day3: 'D3',
};

export default function PatientList({ patients, onDelete }: Props) {
  if (patients.length === 0) {
    return (
      <p className="text-xs text-gray-400 text-center py-4">
        No patients added yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {patients.map(p => (
        <li
          key={p.id}
          className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: p.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
            <p className="text-xs text-gray-500">
              {PROCEDURE_LABEL[p.procedureType]}
              {p.embryoAge ? ` · ${EMBRYO_LABEL[p.embryoAge]}` : ''}
              {' · '}
              {format(p.procedureDate, 'MMM d, yyyy')}
            </p>
          </div>
          <button
            onClick={() => onDelete(p.id)}
            title="Remove patient"
            className="ml-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label={`Remove ${p.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
