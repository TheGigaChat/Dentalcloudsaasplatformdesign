// Mock data for DentalCloud application

export type UserRole = 'Owner' | 'Admin' | 'Manager' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  country: string;
  plan: 'Free' | 'Standard' | 'Premium';
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  insurance: string;
  lastVisit: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Archived';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentist: string;
  room: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  type: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  status: 'Draft' | 'Proposed' | 'Accepted' | 'Partial' | 'Rejected';
  totalCost: number;
  urgency: 'Low' | 'Medium' | 'High';
  createdDate: string;
  items: TreatmentPlanItem[];
}

export interface TreatmentPlanItem {
  id: string;
  treatmentType: string;
  tooth: number | string;
  cost: number;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Accepted' | 'Deferred' | 'Rejected';
}

export interface XRay {
  id: string;
  patientId: string;
  patientName: string;
  dateTaken: string;
  nextRequired: string;
  type: string;
  overdue: boolean;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  dueDate: string;
}

export interface ToothStatus {
  number: number;
  status: 'Healthy' | 'Needs Treatment' | 'Treated' | 'Missing';
  notes?: string;
}

// Current user (simulated)
export const currentUser: User = {
  id: 'user-1',
  name: 'Dr. Sarah Mitchell',
  email: 'sarah@dentalcloud.com',
  role: 'Owner',
  status: 'Active',
};

// Mock tenants
export const mockTenants: Tenant[] = [
  { id: 'tenant-1', name: 'Acme Dental Clinic', slug: 'acme', country: 'USA', plan: 'Premium' },
  { id: 'tenant-2', name: 'Smile Care Center', slug: 'smilecare', country: 'UK', plan: 'Standard' },
];

// Mock patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Smith',
    dateOfBirth: '1985-03-15',
    insurance: 'BlueCross Premium',
    lastVisit: '2026-02-10',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Cityville, CA 90210',
    status: 'Active',
  },
  {
    id: 'p2',
    name: 'Emma Johnson',
    dateOfBirth: '1990-07-22',
    insurance: 'Aetna Dental Plus',
    lastVisit: '2026-02-15',
    email: 'emma.j@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Springfield, CA 90211',
    status: 'Active',
  },
  {
    id: 'p3',
    name: 'Michael Chen',
    dateOfBirth: '1978-11-05',
    insurance: 'Delta Dental',
    lastVisit: '2026-01-28',
    email: 'mchen@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Rd, Riverside, CA 90212',
    status: 'Active',
  },
  {
    id: 'p4',
    name: 'Sarah Williams',
    dateOfBirth: '1995-04-18',
    insurance: 'United Healthcare',
    lastVisit: '2026-02-20',
    email: 'sarah.w@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Lakeside, CA 90213',
    status: 'Active',
  },
  {
    id: 'p5',
    name: 'David Martinez',
    dateOfBirth: '1982-09-30',
    insurance: 'Cigna Dental',
    lastVisit: '2025-12-15',
    email: 'd.martinez@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, Hilltown, CA 90214',
    status: 'Archived',
  },
];

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    patientName: 'John Smith',
    dentist: 'Dr. Sarah Mitchell',
    room: 'Room 1',
    date: '2026-02-26',
    time: '09:00',
    status: 'Confirmed',
    type: 'Routine Checkup',
  },
  {
    id: 'apt2',
    patientId: 'p2',
    patientName: 'Emma Johnson',
    dentist: 'Dr. James Park',
    room: 'Room 2',
    date: '2026-02-26',
    time: '10:30',
    status: 'Confirmed',
    type: 'Cleaning',
  },
  {
    id: 'apt3',
    patientId: 'p3',
    patientName: 'Michael Chen',
    dentist: 'Dr. Sarah Mitchell',
    room: 'Room 1',
    date: '2026-02-26',
    time: '14:00',
    status: 'Scheduled',
    type: 'Crown Placement',
  },
  {
    id: 'apt4',
    patientId: 'p4',
    patientName: 'Sarah Williams',
    dentist: 'Dr. Lisa Brown',
    room: 'Room 3',
    date: '2026-02-27',
    time: '11:00',
    status: 'Scheduled',
    type: 'Root Canal',
  },
];

// Mock treatment plans
export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: 'tp1',
    patientId: 'p1',
    patientName: 'John Smith',
    status: 'Accepted',
    totalCost: 2400,
    urgency: 'Medium',
    createdDate: '2026-02-15',
    items: [
      { id: 'tpi1', treatmentType: 'Crown', tooth: 14, cost: 1200, urgency: 'Medium', status: 'Accepted' },
      { id: 'tpi2', treatmentType: 'Filling', tooth: 15, cost: 400, urgency: 'Low', status: 'Accepted' },
      { id: 'tpi3', treatmentType: 'Deep Cleaning', tooth: 'All', cost: 800, urgency: 'Medium', status: 'Accepted' },
    ],
  },
  {
    id: 'tp2',
    patientId: 'p3',
    patientName: 'Michael Chen',
    status: 'Proposed',
    totalCost: 3500,
    urgency: 'High',
    createdDate: '2026-02-20',
    items: [
      { id: 'tpi4', treatmentType: 'Root Canal', tooth: 18, cost: 1500, urgency: 'High', status: 'Pending' },
      { id: 'tpi5', treatmentType: 'Crown', tooth: 18, cost: 1200, urgency: 'High', status: 'Pending' },
      { id: 'tpi6', treatmentType: 'Cleaning', tooth: 'All', cost: 800, urgency: 'Low', status: 'Pending' },
    ],
  },
  {
    id: 'tp3',
    patientId: 'p4',
    patientName: 'Sarah Williams',
    status: 'Partial',
    totalCost: 1800,
    urgency: 'Low',
    createdDate: '2026-02-10',
    items: [
      { id: 'tpi7', treatmentType: 'Whitening', tooth: 'All', cost: 600, urgency: 'Low', status: 'Accepted' },
      { id: 'tpi8', treatmentType: 'Filling', tooth: 12, cost: 400, urgency: 'Medium', status: 'Deferred' },
      { id: 'tpi9', treatmentType: 'Filling', tooth: 22, cost: 400, urgency: 'Low', status: 'Rejected' },
      { id: 'tpi10', treatmentType: 'Scaling', tooth: 'All', cost: 400, urgency: 'Low', status: 'Accepted' },
    ],
  },
];

// Mock X-rays
export const mockXRays: XRay[] = [
  {
    id: 'xr1',
    patientId: 'p1',
    patientName: 'John Smith',
    dateTaken: '2025-08-15',
    nextRequired: '2026-08-15',
    type: 'Panoramic',
    overdue: false,
  },
  {
    id: 'xr2',
    patientId: 'p2',
    patientName: 'Emma Johnson',
    dateTaken: '2025-02-20',
    nextRequired: '2026-02-20',
    type: 'Bitewing',
    overdue: true,
  },
  {
    id: 'xr3',
    patientId: 'p3',
    patientName: 'Michael Chen',
    dateTaken: '2025-12-10',
    nextRequired: '2026-12-10',
    type: 'Periapical',
    overdue: false,
  },
];

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    patientId: 'p1',
    patientName: 'John Smith',
    amount: 1200,
    status: 'Paid',
    date: '2026-02-15',
    dueDate: '2026-03-15',
  },
  {
    id: 'inv2',
    patientId: 'p2',
    patientName: 'Emma Johnson',
    amount: 800,
    status: 'Pending',
    date: '2026-02-20',
    dueDate: '2026-03-20',
  },
  {
    id: 'inv3',
    patientId: 'p3',
    patientName: 'Michael Chen',
    amount: 450,
    status: 'Overdue',
    date: '2026-01-10',
    dueDate: '2026-02-10',
  },
  {
    id: 'inv4',
    patientId: 'p4',
    patientName: 'Sarah Williams',
    amount: 600,
    status: 'Paid',
    date: '2026-02-22',
    dueDate: '2026-03-22',
  },
];

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah@dentalcloud.com',
    role: 'Owner',
    status: 'Active',
  },
  {
    id: 'user-2',
    name: 'Dr. James Park',
    email: 'james@dentalcloud.com',
    role: 'Manager',
    status: 'Active',
  },
  {
    id: 'user-3',
    name: 'Dr. Lisa Brown',
    email: 'lisa@dentalcloud.com',
    role: 'Manager',
    status: 'Active',
  },
  {
    id: 'user-4',
    name: 'Mary Johnson',
    email: 'mary@dentalcloud.com',
    role: 'Employee',
    status: 'Active',
  },
  {
    id: 'user-5',
    name: 'Tom Wilson',
    email: 'tom@dentalcloud.com',
    role: 'Admin',
    status: 'Active',
  },
];

// Mock tooth chart data
export const mockTeethData: ToothStatus[] = [
  // Upper teeth (1-16)
  ...Array.from({ length: 16 }, (_, i) => ({
    number: i + 1,
    status: (i === 13 ? 'Needs Treatment' : i === 14 ? 'Treated' : 'Healthy') as ToothStatus['status'],
    notes: i === 13 ? 'Crown needed' : i === 14 ? 'Crown placed 2025' : undefined,
  })),
  // Lower teeth (17-32)
  ...Array.from({ length: 16 }, (_, i) => ({
    number: i + 17,
    status: (i === 1 ? 'Needs Treatment' : i === 15 ? 'Missing' : 'Healthy') as ToothStatus['status'],
    notes: i === 1 ? 'Root canal needed' : i === 15 ? 'Extracted 2023' : undefined,
  })),
];

// Activity log
export const mockActivityLog = [
  { id: '1', user: 'Dr. Sarah Mitchell', action: 'Updated treatment plan', patient: 'John Smith', time: '10 minutes ago' },
  { id: '2', user: 'Mary Johnson', action: 'Scheduled appointment', patient: 'Emma Johnson', time: '1 hour ago' },
  { id: '3', user: 'Dr. James Park', action: 'Completed checkup', patient: 'Michael Chen', time: '2 hours ago' },
  { id: '4', user: 'Tom Wilson', action: 'Processed payment', patient: 'Sarah Williams', time: '3 hours ago' },
  { id: '5', user: 'Dr. Lisa Brown', action: 'Uploaded X-ray', patient: 'John Smith', time: '5 hours ago' },
];

// Chart data
export const revenueChartData = [
  { month: 'Aug', revenue: 45000 },
  { month: 'Sep', revenue: 52000 },
  { month: 'Oct', revenue: 48000 },
  { month: 'Nov', revenue: 61000 },
  { month: 'Dec', revenue: 55000 },
  { month: 'Jan', revenue: 58000 },
  { month: 'Feb', revenue: 67000 },
];

export const acceptanceRateData = [
  { month: 'Aug', rate: 72 },
  { month: 'Sep', rate: 75 },
  { month: 'Oct', rate: 78 },
  { month: 'Nov', rate: 81 },
  { month: 'Dec', rate: 79 },
  { month: 'Jan', rate: 83 },
  { month: 'Feb', rate: 85 },
];
