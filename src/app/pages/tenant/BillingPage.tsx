import { useState } from 'react';
import { FileText, CreditCard, Calendar } from 'lucide-react';
import { mockInvoices } from '../../data/mockData';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payment-plans' | 'estimates'>('invoices');

  const paymentPlans = [
    {
      id: 'PP1',
      patient: 'John Smith',
      total: 2400,
      paid: 1200,
      remaining: 1200,
      installments: [
        { amount: 600, dueDate: '2026-03-01', status: 'Paid' },
        { amount: 600, dueDate: '2026-03-15', status: 'Paid' },
        { amount: 600, dueDate: '2026-04-01', status: 'Pending' },
        { amount: 600, dueDate: '2026-04-15', status: 'Pending' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and cost estimates</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          <FileText className="w-5 h-5" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Outstanding',
            value: `$${mockInvoices.filter((i) => i.status !== 'Paid').reduce((acc, i) => acc + i.amount, 0).toLocaleString()}`,
            color: 'bg-red-500',
          },
          {
            label: 'Paid This Month',
            value: `$${mockInvoices.filter((i) => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0).toLocaleString()}`,
            color: 'bg-green-500',
          },
          {
            label: 'Pending',
            value: mockInvoices.filter((i) => i.status === 'Pending').length,
            color: 'bg-yellow-500',
          },
          {
            label: 'Overdue',
            value: mockInvoices.filter((i) => i.status === 'Overdue').length,
            color: 'bg-orange-500',
          },
        ].map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="border-b border-border">
          <div className="flex">
            {[
              { id: 'invoices', label: 'Invoices', icon: FileText },
              { id: 'payment-plans', label: 'Payment Plans', icon: Calendar },
              { id: 'estimates', label: 'Cost Estimates', icon: CreditCard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
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
          {activeTab === 'invoices' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Invoice ID
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
                      Due Date
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
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-foreground">{invoice.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-foreground">{invoice.patientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-foreground">${invoice.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-foreground">
                          {new Date(invoice.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-foreground">
                          {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === 'Paid'
                              ? 'bg-green-100 text-green-700'
                              : invoice.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-primary hover:underline text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payment-plans' && (
            <div className="space-y-6">
              {paymentPlans.map((plan) => (
                <div key={plan.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{plan.patient}</h3>
                      <p className="text-sm text-muted-foreground">Payment Plan {plan.id}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Remaining</div>
                      <div className="text-xl font-bold text-foreground">${plan.remaining.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">
                        ${plan.paid.toLocaleString()} of ${plan.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${(plan.paid / plan.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm mb-2">Installment Schedule</h4>
                    {plan.installments.map((installment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-muted-foreground">#{index + 1}</div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              ${installment.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Due: {new Date(installment.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            installment.status === 'Paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {installment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'estimates' && (
            <div className="text-center text-muted-foreground py-8">
              Cost estimates would be displayed here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
