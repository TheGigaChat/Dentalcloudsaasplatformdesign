import { Plus, Shield, Eye, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

export default function UserManagementPage() {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-100 text-purple-700';
      case 'Admin':
        return 'bg-blue-100 text-blue-700';
      case 'Manager':
        return 'bg-green-100 text-green-700';
      case 'Employee':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage team members and their roles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Admin Only Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-900">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Admin Access Only</span>
        </div>
        <p className="text-sm text-blue-800 mt-1">
          Only Owner and Admin users can manage team members and roles.
        </p>
      </div>

      {/* Role Descriptions */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            role: 'Owner',
            description: 'Full access to all features and settings',
            color: 'bg-purple-500',
          },
          {
            role: 'Admin',
            description: 'Manage users, settings, and reports',
            color: 'bg-blue-500',
          },
          {
            role: 'Manager',
            description: 'Dentists with treatment and patient management',
            color: 'bg-green-500',
          },
          {
            role: 'Employee',
            description: 'Basic access for staff members',
            color: 'bg-gray-500',
          },
        ].map((item, index) => (
          <div key={index} className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{item.role}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
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
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm text-primary font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="font-medium text-foreground">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-foreground hover:bg-muted rounded-lg"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.role !== 'Owner' && (
                        <button
                          className="p-2 text-destructive hover:bg-red-50 rounded-lg"
                          title="Remove User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Role Permissions Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Permission
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                  Owner
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                  Admin
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                  Manager
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                  Employee
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { permission: 'View Dashboard', owner: true, admin: true, manager: true, employee: true },
                { permission: 'Manage Patients', owner: true, admin: true, manager: true, employee: true },
                { permission: 'Create Treatment Plans', owner: true, admin: true, manager: true, employee: false },
                { permission: 'Manage Appointments', owner: true, admin: true, manager: true, employee: true },
                { permission: 'View Billing', owner: true, admin: true, manager: true, employee: false },
                { permission: 'Manage Users', owner: true, admin: true, manager: false, employee: false },
                { permission: 'Change Settings', owner: true, admin: true, manager: false, employee: false },
                { permission: 'Manage Subscription', owner: true, admin: false, manager: false, employee: false },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-muted/20">
                  <td className="px-6 py-3 text-foreground">{row.permission}</td>
                  <td className="px-6 py-3 text-center">
                    {row.owner ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {row.admin ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {row.manager ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {row.employee ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent User Activity (Audit Trail)</h2>
        <div className="space-y-3">
          {[
            { user: 'Tom Wilson', action: 'Added new user', target: 'Mary Johnson', time: '2 hours ago' },
            { user: 'Dr. Sarah Mitchell', action: 'Changed role', target: 'Dr. James Park to Manager', time: '1 day ago' },
            { user: 'Tom Wilson', action: 'Deactivated user', target: 'John Doe', time: '3 days ago' },
          ].map((log, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-primary font-medium">
                  {log.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{log.user}</span>{' '}
                  <span className="text-muted-foreground">{log.action}</span>{' '}
                  <span className="font-medium">{log.target}</span>
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
