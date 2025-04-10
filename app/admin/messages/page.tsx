import { Metadata } from 'next';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';
import MessagesPanel from '@/components/admin/dashboard/MessagesPanel';

export const metadata: Metadata = {
  title: 'Contact Messages - Elextrio Automation Admin',
  description: 'Manage contact messages from website visitors',
};

export default function MessagesPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <MessagesPanel />
    </AuthProvider>
  );
}
