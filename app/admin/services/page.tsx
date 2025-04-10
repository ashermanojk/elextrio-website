import { Metadata } from 'next';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';
import ServicesPanel from '@/components/admin/dashboard/ServicesPanel';

export const metadata: Metadata = {
  title: 'Manage Services - Elextrio Automation Admin',
  description: 'Add, edit, and delete services offered by Elextrio Automation',
};

export default function ServicesPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <ServicesPanel />
    </AuthProvider>
  );
}
