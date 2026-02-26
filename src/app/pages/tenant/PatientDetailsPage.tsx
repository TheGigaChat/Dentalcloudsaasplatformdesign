import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, FileText, ImageIcon, CreditCard } from 'lucide-react';
import { mockPatients, mockTeethData } from '../../data/mockData';

export default function PatientDetailsPage() {
  const { tenant, patientId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const patient = mockPatients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Patient not found</p>
          <Link to={`/${tenant}/patients`} className="text-primary hover:underline">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'tooth-chart', label: 'Tooth Chart', icon: Calendar },
    { id: 'treatment-plans', label: 'Treatment Plans', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'xrays', label: 'X-Rays', icon: ImageIcon },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const getToothColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'Needs Treatment':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'Treated':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'Missing':
        return 'bg-gray-200 border-gray-400 text-gray-500';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link
          to={`/${tenant}/patients`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients</span>
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary font-medium">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-muted-foreground">Patient ID: {patient.id}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
            Edit Patient
          </button>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium text-foreground">{patient.email}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-medium text-foreground">{patient.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Date of Birth</div>
              <div className="font-medium text-foreground">
                {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Insurance</div>
              <div className="font-medium text-foreground">{patient.insurance}</div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Address</div>
              <div className="font-medium text-foreground">{patient.address}</div>
            </div>
          </div>
        </div>
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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Patient Overview</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Last Visit</div>
                  <div className="font-medium text-foreground">
                    {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className="font-medium text-foreground">{patient.status}</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  Complete patient medical history, allergies, and treatment records available in the full patient portal.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tooth-chart' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Tooth Chart (1-32 Numbering System)</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                    <span className="text-muted-foreground">Healthy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-500 rounded"></div>
                    <span className="text-muted-foreground">Needs Treatment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-500 rounded"></div>
                    <span className="text-muted-foreground">Treated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded"></div>
                    <span className="text-muted-foreground">Missing</span>
                  </div>
                </div>
              </div>

              {/* Upper Teeth */}
              <div className="mb-8">
                <div className="text-sm text-muted-foreground mb-2">Upper Teeth</div>
                <div className="grid grid-cols-8 lg:grid-cols-16 gap-2">
                  {mockTeethData.slice(0, 16).map((tooth) => (
                    <button
                      key={tooth.number}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs hover:scale-105 transition-transform ${getToothColor(
                        tooth.status
                      )}`}
                      title={`Tooth ${tooth.number}: ${tooth.status}${tooth.notes ? ` - ${tooth.notes}` : ''}`}
                    >
                      <div className="font-bold">{tooth.number}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lower Teeth */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Lower Teeth</div>
                <div className="grid grid-cols-8 lg:grid-cols-16 gap-2">
                  {mockTeethData.slice(16, 32).map((tooth) => (
                    <button
                      key={tooth.number}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs hover:scale-105 transition-transform ${getToothColor(
                        tooth.status
                      )}`}
                      title={`Tooth ${tooth.number}: ${tooth.status}${tooth.notes ? ` - ${tooth.notes}` : ''}`}
                    >
                      <div className="font-bold">{tooth.number}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment History */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">Treatment History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Tooth 14: Crown needed</span>
                    <span className="text-muted-foreground">Status: Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Tooth 15: Crown placed</span>
                    <span className="text-muted-foreground">Completed: 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Tooth 18: Root canal needed</span>
                    <span className="text-muted-foreground">Status: Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Tooth 32: Extracted</span>
                    <span className="text-muted-foreground">Completed: 2023</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'treatment-plans' && (
            <div className="text-center text-muted-foreground py-8">
              Treatment plans for this patient would be displayed here
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="text-center text-muted-foreground py-8">
              Appointment history for this patient would be displayed here
            </div>
          )}

          {activeTab === 'xrays' && (
            <div className="text-center text-muted-foreground py-8">
              X-ray images and history for this patient would be displayed here
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="text-center text-muted-foreground py-8">
              Billing information and invoices for this patient would be displayed here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
