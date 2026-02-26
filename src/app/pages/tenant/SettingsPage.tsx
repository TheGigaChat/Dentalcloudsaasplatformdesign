import { useState } from 'react';
import { Building2, CreditCard, DoorOpen, Clock, Shield, ToggleLeft } from 'lucide-react';
import { mockTenants } from '../../data/mockData';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const currentTenant = mockTenants[0];

  const tabs = [
    { id: 'company', label: 'Company Details', icon: Building2 },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard },
    { id: 'rooms', label: 'Treatment Rooms', icon: DoorOpen },
    { id: 'appointments', label: 'Appointment Types', icon: Clock },
    { id: 'insurance', label: 'Insurance Config', icon: Shield },
    { id: 'features', label: 'Feature Flags', icon: ToggleLeft },
  ];

  const treatmentRooms = [
    { id: 1, name: 'Room 1', status: 'Active', equipment: 'Full Setup' },
    { id: 2, name: 'Room 2', status: 'Active', equipment: 'Full Setup' },
    { id: 3, name: 'Room 3', status: 'Active', equipment: 'Basic Setup' },
  ];

  const appointmentTypes = [
    { id: 1, name: 'Routine Checkup', duration: 30, price: 150 },
    { id: 2, name: 'Cleaning', duration: 45, price: 200 },
    { id: 3, name: 'Crown Placement', duration: 90, price: 1200 },
    { id: 4, name: 'Root Canal', duration: 120, price: 1500 },
    { id: 5, name: 'Tooth Extraction', duration: 60, price: 300 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your clinic configuration and preferences</p>
      </div>

      {/* Admin Only Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-900">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Admin Access Required</span>
        </div>
        <p className="text-sm text-blue-800 mt-1">
          These settings are only accessible to users with Owner or Admin roles.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="border-b border-border overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Company Name</label>
                  <input
                    type="text"
                    defaultValue={currentTenant.name}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">Company Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">dentalcloud.com/</span>
                    <input
                      type="text"
                      defaultValue={currentTenant.slug}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      disabled
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Contact support to change your company slug</p>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">Country</label>
                  <select
                    defaultValue={currentTenant.country}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Estonia">Estonia</option>
                  </select>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Subscription Plan</h2>
              <div className="p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{currentTenant.plan}</h3>
                    <p className="text-muted-foreground">Your current plan</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">$99</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Up to 500 patients</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Advanced scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Insurance integration</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                    Upgrade Plan
                  </button>
                  <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted">
                    View All Plans
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Treatment Rooms</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                  Add Room
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {treatmentRooms.map((room) => (
                  <div key={room.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{room.name}</h3>
                    <div className="text-sm text-muted-foreground mb-1">Status: {room.status}</div>
                    <div className="text-sm text-muted-foreground mb-3">Equipment: {room.equipment}</div>
                    <button className="text-primary hover:underline text-sm">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Appointment Types</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                  Add Type
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {appointmentTypes.map((type) => (
                      <tr key={type.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{type.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-foreground">{type.duration} min</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">${type.price}</div>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-primary hover:underline text-sm">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Insurance Configuration</h2>
              <p className="text-sm text-muted-foreground">
                Configure default insurance settings and integration options for your clinic.
              </p>
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-foreground">Insurance integration settings would be configured here</p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Feature Flags</h2>
              <p className="text-sm text-muted-foreground">
                Enable or disable specific features for your clinic.
              </p>
              <div className="space-y-3">
                {[
                  { name: 'Online Booking', enabled: true },
                  { name: 'SMS Reminders', enabled: true },
                  { name: 'Email Notifications', enabled: true },
                  { name: 'Patient Portal', enabled: false },
                  { name: 'Treatment Plan Approval', enabled: true },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <span className="font-medium text-foreground">{feature.name}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors ${
                        feature.enabled ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
