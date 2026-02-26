import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';

// Public pages
import Homepage from './pages/public/Homepage';
import PricingPage from './pages/public/PricingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Tenant pages
import TenantLayout from './pages/tenant/TenantLayout';
import Dashboard from './pages/tenant/Dashboard';
import PatientsListPage from './pages/tenant/PatientsListPage';
import PatientDetailsPage from './pages/tenant/PatientDetailsPage';
import AppointmentsPage from './pages/tenant/AppointmentsPage';
import TreatmentPlansPage from './pages/tenant/TreatmentPlansPage';
import TreatmentPlanDetailsPage from './pages/tenant/TreatmentPlanDetailsPage';
import XRaysPage from './pages/tenant/XRaysPage';
import InsurancePage from './pages/tenant/InsurancePage';
import BillingPage from './pages/tenant/BillingPage';
import SettingsPage from './pages/tenant/SettingsPage';
import UserManagementPage from './pages/tenant/UserManagementPage';

export default function App() {
  // Simulated authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTenant, setCurrentTenant] = useState('acme');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<RegisterPage onRegister={() => setIsAuthenticated(true)} />} />

        {/* Tenant routes */}
        <Route path="/:tenant" element={<TenantLayout currentTenant={currentTenant} setCurrentTenant={setCurrentTenant} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsListPage />} />
          <Route path="patients/:patientId" element={<PatientDetailsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="treatment-plans" element={<TreatmentPlansPage />} />
          <Route path="treatment-plans/:planId" element={<TreatmentPlanDetailsPage />} />
          <Route path="xrays" element={<XRaysPage />} />
          <Route path="insurance" element={<InsurancePage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Redirect any unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
