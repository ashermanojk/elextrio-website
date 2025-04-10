'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from './AdminLayout';
import { 
  getContactMessages, 
  getNewContactMessagesCount,
  getFeaturedProjects,
  getFeaturedServices,
  getProjects,
  getServices
} from '@/lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    totalProjects: 0,
    featuredProjects: 0,
    totalServices: 0,
    featuredServices: 0
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Get messages data
        const messages = await getContactMessages();
        const newMessagesCount = await getNewContactMessagesCount();
        
        // Get projects data
        const allProjects = await getProjects();
        const featuredProjects = await getFeaturedProjects();
        
        // Get services data
        const allServices = await getServices();
        const featuredServices = await getFeaturedServices();
        
        setStats({
          totalMessages: messages.length,
          newMessages: newMessagesCount,
          totalProjects: allProjects.length,
          featuredProjects: featuredProjects.length,
          totalServices: allServices.length,
          featuredServices: featuredServices.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Welcome to the Elextrio Automation admin panel. Here you can manage your website content, 
              projects, services, and contact messages.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-t-2 border-primary-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <h2 className="mt-8 text-base font-semibold leading-6 text-gray-900">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SummaryCard
                title="Contact Messages"
                value={stats.totalMessages}
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                )}
                subtitle={`${stats.newMessages} new message${stats.newMessages !== 1 ? 's' : ''}`}
                linkUrl="/admin/messages"
              />
              <SummaryCard
                title="Projects"
                value={stats.totalProjects}
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                    <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                    <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                  </svg>
                )}
                subtitle={`${stats.featuredProjects} featured`}
                linkUrl="/admin/projects"
              />
              <SummaryCard
                title="Services"
                value={stats.totalServices}
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                  </svg>
                )}
                subtitle={`${stats.featuredServices} featured`}
                linkUrl="/admin/services"
              />
            </div>

            <h2 className="mt-8 text-base font-semibold leading-6 text-gray-900">Quick Actions</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickActionCard
                title="Messages"
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                  </svg>
                )}
                description="View and respond to contact messages from your website visitors."
                href="/admin/messages"
                buttonText="View Messages"
                highlight={stats.newMessages > 0}
              />
              <QuickActionCard
                title="Projects"
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                    <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                    <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                  </svg>
                )}
                description="Manage your project portfolio. Add, edit, or remove projects."
                href="/admin/projects"
                buttonText="Manage Projects"
              />
              <QuickActionCard
                title="Services"
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                  </svg>
                )}
                description="Update your service offerings. Add new services or edit existing ones."
                href="/admin/services"
                buttonText="Manage Services"
              />
              <QuickActionCard
                title="Content"
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                  </svg>
                )}
                description="Edit website content including headings, descriptions, and other text."
                href="/admin/content"
                buttonText="Edit Content"
              />
            </div>
            
            <h2 className="mt-8 text-base font-semibold leading-6 text-gray-900">More Options</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickActionCard
                title="Industries"
                icon={(props) => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                )}
                description="Manage industry-specific content and applications."
                href="/admin/industries"
                buttonText="Manage Industries"
              />
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

type SummaryCardProps = {
  title: string;
  value: number;
  icon: (props: React.ComponentProps<'svg'>) => React.ReactElement;
  subtitle: string;
  linkUrl: string;
};

function SummaryCard({ title, value, icon: Icon, subtitle, linkUrl }: SummaryCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 truncate">{subtitle}</div>
          <div className="text-sm font-medium">
            <Link href={linkUrl} className="text-primary-600 hover:text-primary-900">
              View all
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  icon: (props: React.ComponentProps<'svg'>) => React.ReactElement;
  description: string;
  href: string;
  buttonText: string;
  highlight?: boolean;
}

function QuickActionCard({ title, icon: Icon, description, href, buttonText, highlight = false }: QuickActionCardProps) {
  return (
    <div className={`relative rounded-lg border ${highlight ? 'border-primary-200 bg-primary-50' : 'border-gray-300 bg-white'} p-5 shadow-sm flex flex-col`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${highlight ? 'text-primary-500' : 'text-gray-400'}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        {highlight && (
          <span className="ml-2 inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
            New
          </span>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">{description}</div>
      <div className="mt-auto pt-4">
        <Link
          href={href}
          className={`inline-flex items-center rounded-md ${
            highlight
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          } px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
