import { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockAppointments } from '../../data/mockData';

export default function AppointmentsPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate] = useState(new Date('2026-02-26'));

  const todayAppointments = mockAppointments.filter(apt => apt.date === '2026-02-26');
  const weekAppointments = mockAppointments;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Manage your clinic's schedule</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5" />
          <span>Create Appointment</span>
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2 px-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            {['day', 'week', 'month'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  view === v
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'day' && (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Today - {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border hover:border-primary cursor-pointer"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="font-bold text-foreground">{apt.time}</div>
                    <div className="text-xs text-muted-foreground">{apt.room}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{apt.patientName}</div>
                    <div className="text-sm text-muted-foreground">{apt.type}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{apt.dentist}</div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      apt.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : apt.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <th key={day} className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                      <div>{day}</div>
                      <div className="text-xs font-normal">{23 + i}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <tr key={time} className="hover:bg-muted/20">
                    <td className="px-4 py-6 text-sm text-muted-foreground font-medium">{time}</td>
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const appointment = weekAppointments.find(
                        (apt) => apt.time === time && new Date(apt.date).getDay() === (day + 1) % 7
                      );
                      return (
                        <td key={day} className="px-2 py-2 relative">
                          {appointment && (
                            <div className="bg-primary/10 border border-primary rounded-lg p-2 text-xs">
                              <div className="font-medium text-primary truncate">{appointment.patientName}</div>
                              <div className="text-muted-foreground truncate">{appointment.type}</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'month' && (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 2; // Adjust for month start
                const hasAppointment = dayNum === 24 || dayNum === 25;
                return (
                  <div
                    key={i}
                    className={`aspect-square border rounded-lg p-2 ${
                      dayNum === 26
                        ? 'bg-primary/10 border-primary'
                        : dayNum > 0 && dayNum <= 28
                        ? 'border-border hover:border-primary cursor-pointer'
                        : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    {dayNum > 0 && dayNum <= 28 && (
                      <>
                        <div className="text-sm font-medium text-foreground">{dayNum}</div>
                        {hasAppointment && (
                          <div className="mt-1 text-xs">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
