import { useParams, Link } from 'react-router';
import { ArrowLeft, FileText, DollarSign, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockTreatmentPlans } from '../../data/mockData';

export default function TreatmentPlanDetailsPage() {
  const { tenant, planId } = useParams();
  const plan = mockTreatmentPlans.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Treatment plan not found</p>
          <Link to={`/${tenant}/treatment-plans`} className="text-primary hover:underline">
            Back to Treatment Plans
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Deferred':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const acceptedItems = plan.items.filter((item) => item.status === 'Accepted');
  const acceptedTotal = acceptedItems.reduce((sum, item) => sum + item.cost, 0);
  const insuranceCoverage = acceptedTotal * 0.6; // 60% coverage example

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link
          to={`/${tenant}/treatment-plans`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Treatment Plans</span>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Treatment Plan {plan.id}</h1>
            <p className="text-muted-foreground">Patient: {plan.patientName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">
              Generate Cost Estimate
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
              Edit Plan
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Status</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{plan.status}</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-muted-foreground">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-foreground">${plan.totalCost.toLocaleString()}</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className={`w-5 h-5 ${plan.urgency === 'High' ? 'text-red-600' : plan.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`} />
            <span className="text-sm text-muted-foreground">Urgency</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{plan.urgency}</div>
        </div>
      </div>

      {/* Plan Items */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Treatment Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Treatment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Tooth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plan.items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{item.treatmentType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-foreground">{item.tooth}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">${item.cost.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${item.urgency === 'High' ? 'text-red-600' : item.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {item.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm">{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Cost Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Plan Cost</span>
              <span className="font-medium text-foreground">${plan.totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accepted Items</span>
              <span className="font-medium text-foreground">${acceptedTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-muted-foreground">Estimated Insurance Coverage (60%)</span>
              <span className="font-medium text-green-600">${insuranceCoverage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Patient Responsibility</span>
              <span className="font-medium text-foreground">
                ${(acceptedTotal - insuranceCoverage).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-foreground">Estimated Out-of-Pocket</span>
              <span className="font-bold text-foreground">
                ${(acceptedTotal - insuranceCoverage).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Approval Workflow */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Patient Approval Timeline</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-green-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <div className="font-medium text-foreground">Plan Created</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(plan.createdDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${plan.status === 'Proposed' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                {plan.status !== 'Draft' && <div className={`w-0.5 h-full mt-2 ${plan.status === 'Accepted' ? 'bg-green-500' : 'bg-gray-300'}`}></div>}
              </div>
              <div className="flex-1 pb-6">
                <div className="font-medium text-foreground">Sent to Patient</div>
                <div className="text-sm text-muted-foreground">
                  {plan.status !== 'Draft' ? 'Feb 15, 2026' : 'Pending'}
                </div>
              </div>
            </div>
            {plan.status === 'Accepted' && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Patient Accepted</div>
                  <div className="text-sm text-muted-foreground">Feb 18, 2026</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
