import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Elextrio Automation',
  description: 'Admin control panel for Elextrio Automation website',
};

export default function AdminPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <AdminDashboard />
    </AuthProvider>
  );
}
