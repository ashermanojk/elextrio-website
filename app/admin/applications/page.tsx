'use client';

import React, { useState, useEffect } from 'react';
import { getJobApplications, getJobs, updateJobApplicationStatus, type JobApplication, type Job } from '@/lib/supabase/client';
import Link from 'next/link';
import { Search, Filter, ChevronUp, ChevronDown, Eye, Mail, Check, X } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof JobApplication>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewApplication, setViewApplication] = useState<JobApplication | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getJobApplications();
      setApplications(data);
      setFilteredApplications(data);
      
      // Also fetch jobs to display job titles
      const jobsData = await getJobs();
      setJobs(jobsData);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...applications];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(app => 
        app.first_name.toLowerCase().includes(term) || 
        app.last_name.toLowerCase().includes(term) || 
        app.email.toLowerCase().includes(term) ||
        (app.phone && app.phone.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(app => app.status === statusFilter);
    }

    // Apply job filter
    if (jobFilter !== 'all') {
      results = results.filter(app => app.job_id === jobFilter);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      // Handle date fields specifically
      if (sortField === 'created_at') {
        const dateA = fieldA && typeof fieldA === 'string' ? new Date(fieldA).getTime() : 0;
        const dateB = fieldB && typeof fieldB === 'string' ? new Date(fieldB).getTime() : 0;
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      return 0;
    });
    
    setFilteredApplications(results);
  }, [applications, searchTerm, statusFilter, jobFilter, sortField, sortDirection]);

  const handleSort = (field: keyof JobApplication) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = async (id: string, status: JobApplication['status']) => {
    try {
      await updateJobApplicationStatus(id, status);
      setApplications(apps => 
        apps.map(app => app.id === id ? { ...app, status } : app)
      );
      if (viewApplication?.id === id) {
        setViewApplication({ ...viewApplication, status });
      }
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status. Please try again.');
    }
  };
  
  // Get unique statuses for filter options
  const statuses: JobApplication['status'][] = ['new', 'reviewing', 'interview', 'rejected', 'hired'];
  
  const getSortIcon = (field: keyof JobApplication) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 inline" /> : <ChevronDown className="h-4 w-4 inline" />;
  };

  const getJobTitle = (jobId: string | null) => {
    if (!jobId) return 'General Application';
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };

  const getStatusBadge = (status: JobApplication['status']) => {
    const statusStyles = {
      new: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-green-100 text-green-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Job Applications</h1>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="all">All Jobs</option>
              <option value="">General Applications</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">{filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found</span>
            <button 
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); setJobFilter('all'); }}
              className="ml-auto text-sm text-indigo-600 hover:text-indigo-800"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-100 rounded-md"></div>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-md border">
          <p className="text-gray-600 mb-4">No applications available.</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-md border">
          <p className="text-gray-600 mb-4">No applications match your filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('all'); setJobFilter('all'); }}
            className="btn-primary-outline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('created_at')}
                >
                  Date {getSortIcon('created_at')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('last_name')}
                >
                  Applicant {getSortIcon('last_name')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.first_name} {application.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getJobTitle(application.job_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setViewApplication(application)} 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Application"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <a 
                        href={`mailto:${application.email}`} 
                        className="text-blue-600 hover:text-blue-900"
                        title="Send Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Details Modal */}
      {viewApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {viewApplication.first_name} {viewApplication.last_name}
                </h2>
                <p className="text-gray-500">
                  Applied for: {getJobTitle(viewApplication.job_id)}
                </p>
                <p className="text-gray-500">
                  Date: {new Date(viewApplication.created_at).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={() => setViewApplication(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-900">{viewApplication.email}</p>
              </div>
              {viewApplication.phone && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-900">{viewApplication.phone}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Application Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(viewApplication.id, status)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      viewApplication.status === status 
                        ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Documents</h3>
              <div className="flex flex-col gap-3">
                <a 
                  href={viewApplication.resume_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
                
                {viewApplication.cover_letter_url && (
                  <a 
                    href={viewApplication.cover_letter_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Cover Letter
                  </a>
                )}
              </div>
            </div>

            {viewApplication.message && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h3>
                <div className="p-3 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap">
                  {viewApplication.message}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setViewApplication(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <a 
                href={`mailto:${viewApplication.email}`} 
                className="btn-primary"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Applicant
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
