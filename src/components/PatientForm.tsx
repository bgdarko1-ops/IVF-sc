import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { EmbryoAge, Patient, ProcedureType } from '../types';
import { nextPatientColor } from '../utils/colorUtils';

interface Props {
  onAdd: (patient: Patient) => void;
}

export default function PatientForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [procedureType, setProcedureType] = useState<ProcedureType>('oocyte_retrieval');
  const [procedureDate, setProcedureDate] = useState('');
  const [embryoAge, setEmbryoAge] = useState<EmbryoAge>('day5');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) { setError('Patient name is required.'); return; }
    if (!procedureDate) { setError('Procedure date is required.'); return; }
    setError('');

    const patient: Patient = {
      id: uuidv4(),
      name: trimmedName,
      procedureType,
      procedureDate: new Date(procedureDate + 'T00:00:00'),
      embryoAge: procedureType === 'embryo_transfer' ? embryoAge : undefined,
      color: nextPatientColor(),
    };
    onAdd(patient);
    setName('');
    setProcedureDate('');
    setProcedureType('oocyte_retrieval');
    setEmbryoAge('day5');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Patient Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Kim"
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Procedure Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['oocyte_retrieval', 'embryo_transfer'] as ProcedureType[]).map(type => (
            <label
              key={type}
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                procedureType === type
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                value={type}
                checked={procedureType === type}
                onChange={() => setProcedureType(type)}
              />
              {type === 'oocyte_retrieval' ? 'Oocyte Retrieval' : 'Embryo Transfer'}
            </label>
          ))}
        </div>
      </div>

      {procedureType === 'embryo_transfer' && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Embryo Age
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['day5', 'day3'] as EmbryoAge[]).map(age => (
              <label
                key={age}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                  embryoAge === age
                    ? 'bg-purple-50 border-purple-400 text-purple-700 font-medium'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={age}
                  checked={embryoAge === age}
                  onChange={() => setEmbryoAge(age)}
                />
                {age === 'day5' ? 'Day-5 Embryo' : 'Day-3 Embryo'}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Procedure Date
        </label>
        <input
          type="date"
          value={procedureDate}
          onChange={e => setProcedureDate(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 transition-colors"
      >
        Add Patient Schedule
      </button>
    </form>
  );
}
