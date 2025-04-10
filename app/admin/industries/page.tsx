import { Metadata } from 'next';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';
import IndustriesPanel from '@/components/admin/dashboard/IndustriesPanel';

export const metadata: Metadata = {
  title: 'Manage Industries - Elextrio Automation Admin',
  description: 'Add, edit, and delete industries served by Elextrio Automation',
};

export default function IndustriesPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <IndustriesPanel />
    </AuthProvider>
  );
}
