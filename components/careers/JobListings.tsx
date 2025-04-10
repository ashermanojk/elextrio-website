'use client';

import React, { useState, useEffect } from 'react';
import { getJobs, type Job } from '@/lib/supabase/client';

// Fallback data in case of API failure or during development
const fallbackJobsData = [
  {
    id: '1',
    title: 'Automation Engineer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'We are looking for an experienced Automation Engineer to design, program, simulate and test automated machinery and processes for our clients.',
    requirements: [
      'Bachelor\'s degree in Electrical, Electronics, or Mechanical Engineering',
      'Minimum 3 years of experience in industrial automation',
      'Proficiency in PLC programming (Siemens, Allen Bradley)',
      'Experience with SCADA systems and HMI development',
      'Knowledge of industrial communication protocols (Profinet, Ethernet/IP, Modbus)'
    ],
    postDate: '2025-03-15',
    status: 'open',
    featured: true,
    created_at: '2025-03-15'
  },
  {
    id: '2',
    title: 'Software Developer',
    department: 'Technology',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Join our software development team to create robust applications that control and monitor industrial processes and equipment.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong programming skills in C#, Python or JavaScript',
      'Experience with databases and web services',
      'Knowledge of industrial automation concepts is a plus',
      'Excellent problem-solving skills'
    ],
    postDate: '2025-03-25',
    status: 'open',
    featured: false,
    created_at: '2025-03-25'
  },
  {
    id: '3',
    title: 'Project Manager',
    department: 'Project Management',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Lead and manage automation projects from conception to completion, ensuring delivery within scope, budget, and timeline.',
    requirements: [
      'Bachelor\'s degree in Engineering or related field',
      'PMP certification preferred',
      '5+ years of experience in managing industrial automation projects',
      'Strong leadership and communication skills',
      'Experience with project management tools and methodologies'
    ],
    postDate: '2025-04-01',
    status: 'open',
    featured: false,
    created_at: '2025-04-01'
  }
] as Job[];

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.length > 0 ? data : fallbackJobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings. Please try again later.');
        // Use fallback data in case of API error
        setJobs(fallbackJobsData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col space-y-6 w-full">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-100 h-32 rounded-lg w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h3 className="text-xl font-medium text-secondary-900 mb-2">No Open Positions</h3>
        <p className="text-gray-600">
          We don't have any open positions at the moment, but we're always looking for talented individuals.
        </p>
        <div className="mt-4">
          <a href="/careers/apply" className="btn-primary inline-block">
            Send us your resume
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleJob(job.id)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-secondary-900">{job.title}</h3>
                <div className="mt-2 text-gray-600">
                  <span className="inline-block mr-4">{job.department}</span>
                  <span className="inline-block mr-4">{job.location}</span>
                  <span className="inline-block">{job.type}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <span className="text-sm text-gray-500 mr-4">Posted: {formatDate(job.postDate)}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-primary-600 transition-transform ${expandedJob === job.id ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {expandedJob === job.id && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <h4 className="font-medium text-secondary-900 mb-2">Description:</h4>
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <h4 className="font-medium text-secondary-900 mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              
              <a 
                href={`/careers/apply/${job.id}`}
                className="btn-primary inline-block"
              >
                Apply for this Position
              </a>
            </div>
          )}
        </div>
      ))}
      
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Don't see a position that matches your skills?</p>
        <a 
          href="/careers/apply" 
          className="text-primary-600 font-medium hover:text-primary-800 transition-colors"
        >
          Send us your resume for future opportunities
        </a>
      </div>
    </div>
  );
}
