import { Metadata } from 'next';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';
import ProjectsPanel from '@/components/admin/dashboard/ProjectsPanel';

export const metadata: Metadata = {
  title: 'Manage Projects - Elextrio Automation Admin',
  description: 'Add, edit, and delete projects shown on the website',
};

export default function ProjectsPage() {
  return (
    <AuthProvider requiredAuth={true}>
      <ProjectsPanel />
    </AuthProvider>
  );
}
