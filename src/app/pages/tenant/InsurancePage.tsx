import { useState } from 'react';
import { Shield, Plus, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function InsurancePage() {
  const [insuranceType, setInsuranceType] = useState<'statutory' | 'private'>('statutory');

  const insurancePlans = [
    { id: 1, name: 'BlueCross Premium', type: 'Private', coverage: '80%', patients: 45 },
    { id: 2, name: 'Aetna Dental Plus', type: 'Private', coverage: '75%', patients: 38 },
    { id: 3, name: 'Delta Dental', type: 'Statutory', coverage: '60%', patients: 62 },
    { id: 4, name: 'United Healthcare', type: 'Private', coverage: '70%', patients: 28 },
    { id: 5, name: 'Cigna Dental', type: 'Private', coverage: '65%', patients: 19 },
  ];

  const recentClaims = [
    { id: 'C1001', patient: 'John Smith', amount: 1200, status: 'Paid', date: '2026-02-20' },
    { id: 'C1002', patient: 'Emma Johnson', amount: 800, status: 'Pending', date: '2026-02-22' },
    { id: 'C1003', patient: 'Michael Chen', amount: 450, status: 'Processing', date: '2026-02-24' },
    { id: 'C1004', patient: 'Sarah Williams', amount: 600, status: 'Rejected', date: '2026-02-25' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending':
      case 'Processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Insurance Management</h1>
          <p className="text-muted-foreground">Manage insurance plans and claim submissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5" />
          <span>Add Insurance Plan</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Plans', value: insurancePlans.length, icon: Shield, color: 'bg-blue-500' },
          { label: 'Total Patients', value: insurancePlans.reduce((acc, p) => acc + p.patients, 0), icon: Shield, color: 'bg-green-500' },
          { label: 'Pending Claims', value: 2, icon: Clock, color: 'bg-yellow-500' },
          { label: 'This Month Claims', value: '$3,050', icon: CheckCircle, color: 'bg-purple-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Insurance Type Toggle */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Insurance Plans</h2>
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setInsuranceType('statutory')}
              className={`px-4 py-2 rounded-lg text-sm ${
                insuranceType === 'statutory'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Statutory
            </button>
            <button
              onClick={() => setInsuranceType('private')}
              className={`px-4 py-2 rounded-lg text-sm ${
                insuranceType === 'private'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Private
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insurancePlans
            .filter((plan) => plan.type === (insuranceType === 'statutory' ? 'Statutory' : 'Private'))
            .map((plan) => (
              <div key={plan.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{plan.type}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{plan.name}</h3>
                <div className="text-sm text-muted-foreground mb-3">{plan.coverage} Coverage</div>
                <div className="text-sm text-muted-foreground">{plan.patients} Patients</div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Claims */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Claim Submission Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">{claim.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">{claim.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">${claim.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">
                      {new Date(claim.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(claim.status)}
                      <span className="text-sm">{claim.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Country-Specific Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Country-Specific Rules (USA)</h3>
        <p className="text-sm text-blue-800">
          Insurance claim submissions follow USA-specific regulations and guidelines. Processing times may vary by
          provider (typically 14-30 days).
        </p>
      </div>
    </div>
  );
}
