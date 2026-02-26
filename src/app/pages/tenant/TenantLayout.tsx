import { Outlet, Link, useLocation, useParams } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  ImageIcon,
  Shield,
  CreditCard,
  Settings,
  UserCog,
  ChevronDown,
  Bell,
  LogOut,
  Building2,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import { currentUser, mockTenants } from '../../data/mockData';
import { useState } from 'react';

interface TenantLayoutProps {
  currentTenant: string;
  setCurrentTenant: (tenant: string) => void;
}

export default function TenantLayout({ currentTenant, setCurrentTenant }: TenantLayoutProps) {
  const location = useLocation();
  const { tenant } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const selectedTenant = mockTenants.find((t) => t.slug === tenant);
  const isAdmin = currentUser.role === 'Owner' || currentUser.role === 'Admin';

  const navigation = [
    { name: 'Dashboard', href: `/${tenant}/dashboard`, icon: LayoutDashboard },
    { name: 'Patients', href: `/${tenant}/patients`, icon: Users },
    { name: 'Appointments', href: `/${tenant}/appointments`, icon: Calendar },
    { name: 'Treatment Plans', href: `/${tenant}/treatment-plans`, icon: FileText },
    { name: 'X-Rays', href: `/${tenant}/xrays`, icon: ImageIcon },
    { name: 'Insurance', href: `/${tenant}/insurance`, icon: Shield },
    { name: 'Billing', href: `/${tenant}/billing`, icon: CreditCard },
    { name: 'Settings', href: `/${tenant}/settings`, icon: Settings, adminOnly: true },
    { name: 'User Management', href: `/${tenant}/users`, icon: UserCog, adminOnly: true },
  ];

  // Breadcrumb generation
  const getBreadcrumbs = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: selectedTenant?.name || 'Dashboard', href: `/${tenant}/dashboard` }];
    
    if (pathParts.length > 2) {
      const page = pathParts[2];
      const navItem = navigation.find(n => n.href.includes(page));
      if (navItem) {
        breadcrumbs.push({ name: navItem.name, href: navItem.href });
      }
    }
    
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sidebar-foreground">DentalCloud</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-sidebar-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.adminOnly && (
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              {getBreadcrumbs().map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-muted-foreground">/</span>}
                  <Link
                    to={crumb.href}
                    className={index === getBreadcrumbs().length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}
                  >
                    {crumb.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
              <Globe className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">EN</span>
            </button>

            {/* Tenant Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowTenantDropdown(!showTenantDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted"
              >
                <Building2 className="w-5 h-5 text-primary" />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">{selectedTenant?.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedTenant?.plan}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {showTenantDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                  {mockTenants.map((t) => (
                    <Link
                      key={t.id}
                      to={`/${t.slug}/dashboard`}
                      onClick={() => {
                        setCurrentTenant(t.slug);
                        setShowTenantDropdown(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${
                        t.slug === tenant ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.plan} • {t.country}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-medium">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="font-medium text-foreground">{currentUser.name}</div>
                    <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                  </div>
                  <Link
                    to={`/${tenant}/settings`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-foreground"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-destructive"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
