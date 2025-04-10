import { Metadata } from 'next';
import LoginForm from '@/components/admin/auth/LoginForm';
import { AuthProvider } from '@/components/admin/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'Admin Login - Elextrio Automation',
  description: 'Login to access the Elextrio Automation admin panel',
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Elextrio Automation
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Admin Panel
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </AuthProvider>
  );
}
