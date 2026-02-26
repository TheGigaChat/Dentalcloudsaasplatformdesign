import { Plus, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockXRays } from '../../data/mockData';

export default function XRaysPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">X-Rays</h1>
          <p className="text-muted-foreground">Manage patient X-ray records and scheduling</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          <Upload className="w-5 h-5" />
          <span>Upload X-Ray</span>
        </button>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-medium text-red-900">1 Overdue X-Ray</div>
          <div className="text-sm text-red-700">Please schedule and complete overdue X-rays as soon as possible</div>
        </div>
      </div>

      {/* X-Rays List */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Next Required
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockXRays.map((xray) => (
                <tr key={xray.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm text-primary font-medium">
                          {xray.patientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="font-medium text-foreground">{xray.patientName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">{xray.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">
                      {new Date(xray.dateTaken).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">
                      {new Date(xray.nextRequired).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {xray.overdue ? (
                      <span className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">Overdue</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Up to Date</span>
                      </span>
                    )}
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

      {/* Upload Guide */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">X-Ray Upload Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-2">Supported Formats</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• DICOM (.dcm)</li>
              <li>• JPEG (.jpg, .jpeg)</li>
              <li>• PNG (.png)</li>
              <li>• TIFF (.tif, .tiff)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Best Practices</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Maximum file size: 25MB</li>
              <li>• Minimum resolution: 1024x768</li>
              <li>• Label files with patient ID</li>
              <li>• Include date in filename</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
