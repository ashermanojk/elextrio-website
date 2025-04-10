import { Metadata } from 'next';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';
import ContentPanel from '@/components/admin/dashboard/ContentPanel';

export const metadata: Metadata = {
  title: 'Manage Content - Elextrio Automation Admin',
  description: 'Edit website content including headings, descriptions, and other text elements',
};

export default function ContentPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <ContentPanel />
    </AuthProvider>
  );
}
