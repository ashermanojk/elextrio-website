'use client';

import React, { useState, useEffect } from 'react';
import { getJobs, deleteJob, type Job } from '@/lib/supabase/client';
import Link from 'next/link';
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Job>('postDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...jobs];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.department.toLowerCase().includes(term) || 
        job.location.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(job => job.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      results = results.filter(job => job.department === departmentFilter);
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
      if (sortField === 'postDate' || sortField === 'expiryDate') {
        const dateA = fieldA && typeof fieldA === 'string' ? new Date(fieldA).getTime() : 0;
        const dateB = fieldB && typeof fieldB === 'string' ? new Date(fieldB).getTime() : 0;
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      return 0;
    });
    
    setFilteredJobs(results);
  }, [jobs, searchTerm, statusFilter, departmentFilter, sortField, sortDirection]);

  const handleDeleteConfirm = (jobId: string) => {
    setDeleteConfirm(jobId);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs.filter(job => 
        (statusFilter === 'all' || job.status === statusFilter) &&
        (departmentFilter === 'all' || job.department === departmentFilter)
      ));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Failed to delete job. Please try again.');
    }
  };
  
  const handleSort = (field: keyof Job) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get unique departments for filter
  const departments = ['all', ...new Set(jobs.map(job => job.department))];
  
  const getSortIcon = (field: keyof Job) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 inline" /> : <ChevronDown className="h-4 w-4 inline" />;
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      open: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
        <Link href="/admin/jobs/new" className="btn-primary">
          Add New Job
        </Link>
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
              placeholder="Search jobs..."
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
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</span>
            <button 
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); setDepartmentFilter('all'); }}
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
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-md border">
          <p className="text-gray-600 mb-4">No jobs available.</p>
          <Link href="/admin/jobs/new" className="btn-primary-outline">
            Create Your First Job Listing
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                  Job Title {getSortIcon('title')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('department')}>
                  Department {getSortIcon('department')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('location')}>
                  Location {getSortIcon('location')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('postDate')}>
                  Posted Date {getSortIcon('postDate')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                  Status {getSortIcon('status')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    {job.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.postDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {deleteConfirm === job.id ? (
                      <div className="flex space-x-2 items-center">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={handleDeleteCancel}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-4 items-center">
                        <Link href={`/admin/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirm(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        <Link href={`/careers/apply/${job.id}`} className="text-gray-600 hover:text-gray-900" target="_blank">
                          View
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
