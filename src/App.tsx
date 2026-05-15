import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import Calendar from './components/Calendar';
import EventDetailModal from './components/EventDetailModal';
import GoogleAuthButton from './components/GoogleAuthButton';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import type { CalendarEvent, GoogleUser, Patient } from './types';
import { generateSchedule } from './utils/scheduleGenerator';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);

  function addPatient(patient: Patient) {
    setPatients(prev => [...prev, patient]);
    const newEvents = generateSchedule(patient);
    setEvents(prev => [...prev, ...newEvents]);
    if (newEvents.length > 0) {
      setCurrentMonth(startOfMonth(newEvents[0].displayDate));
    }
  }

  function deletePatient(id: string) {
    setPatients(prev => prev.filter(p => p.id !== id));
    setEvents(prev => prev.filter(e => e.patientId !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-gray-800 leading-none">IVF Scheduling Calendar</h1>
          <p className="text-xs text-gray-400 mt-0.5">Automated follow-up scheduling for IVF patients</p>
        </div>
        <GoogleAuthButton
          user={googleUser}
          onLogin={setGoogleUser}
          onLogout={() => setGoogleUser(null)}
        />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-5 space-y-6">
            <section>
              <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3B82F6" className="w-3 h-3">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
                Add Patient Schedule
              </h2>
              <PatientForm onAdd={addPatient} />
            </section>

            <hr className="border-gray-100" />

            <section>
              <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6B7280" className="w-3 h-3">
                    <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                  </svg>
                </span>
                Patients
                {patients.length > 0 && (
                  <span className="ml-auto text-xs font-medium bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                    {patients.length}
                  </span>
                )}
              </h2>
              <PatientList patients={patients} onDelete={deletePatient} />
            </section>

            <section className="rounded-xl bg-blue-50 border border-blue-100 p-3 space-y-2">
              <p className="text-xs font-semibold text-blue-700">Schedule Rules</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>· OPU follow-ups: Day +1, +3, +5</li>
                <li>· ET Day-5: β-hCG on Day +9</li>
                <li>· ET Day-3: β-hCG on Day +11</li>
                <li>· ⚑ = date adjusted (Sunday / holiday)</li>
              </ul>
            </section>
          </div>
        </aside>

        {/* Calendar */}
        <main className="flex-1 overflow-auto bg-white">
          <Calendar
            currentMonth={currentMonth}
            events={events}
            onMonthChange={setCurrentMonth}
            onEventClick={setSelectedEvent}
          />
        </main>
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
