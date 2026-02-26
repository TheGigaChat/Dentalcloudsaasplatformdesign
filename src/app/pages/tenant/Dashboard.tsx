import { Calendar, TrendingUp, CheckCircle, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockAppointments, mockActivityLog, revenueChartData, acceptanceRateData } from '../../data/mockData';

export default function Dashboard() {
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2026-02-26');
  
  const stats = [
    {
      label: "Today's Appointments",
      value: todayAppointments.length.toString(),
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+2 from yesterday',
    },
    {
      label: 'Upcoming Treatments',
      value: '12',
      icon: Clock,
      color: 'bg-purple-500',
      change: 'Next 7 days',
    },
    {
      label: 'Revenue This Month',
      value: '$67,000',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12% from last month',
    },
    {
      label: 'Plan Acceptance Rate',
      value: '85%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+3% from last month',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Acceptance Rate Chart */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Treatment Plan Acceptance Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={acceptanceRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Appointments & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Appointments</h2>
            <span className="text-sm text-muted-foreground">{todayAppointments.length} total</span>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{apt.patientName}</div>
                  <div className="text-sm text-muted-foreground">{apt.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{apt.time}</div>
                  <div className="text-xs text-muted-foreground">{apt.room}</div>
                </div>
                <div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
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
              </div>
            ))}
          </div>
        </div>

        {/* X-Ray Alerts */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">X-Ray Alerts</h2>
            <span className="text-sm text-destructive">1 overdue</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground">Emma Johnson</div>
                <div className="text-sm text-muted-foreground">Bitewing X-ray overdue</div>
                <div className="text-xs text-muted-foreground mt-1">Due: Feb 20, 2026</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground">Michael Chen</div>
                <div className="text-sm text-muted-foreground">Periapical X-ray due soon</div>
                <div className="text-xs text-muted-foreground mt-1">Due: Dec 10, 2026</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground">John Smith</div>
                <div className="text-sm text-muted-foreground">Panoramic X-ray up to date</div>
                <div className="text-xs text-muted-foreground mt-1">Next due: Aug 15, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockActivityLog.map((log) => (
            <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-primary font-medium">
                  {log.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{log.user}</span>{' '}
                  <span className="text-muted-foreground">{log.action}</span>{' '}
                  <span className="font-medium">{log.patient}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
