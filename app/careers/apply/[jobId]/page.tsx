'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getJob, type Job } from '@/lib/supabase/client';
import ApplicationForm from '@/components/careers/ApplicationForm';
import Link from 'next/link';

export default function JobApplicationPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Validate the jobId is a valid UUID format before making the request
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!jobId || !uuidRegex.test(jobId)) {
          throw new Error('Invalid job ID format');
        }
        
        const jobData = await getJob(jobId);
        if (!jobData) {
          throw new Error('Job not found');
        }
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(
          err instanceof Error && err.message 
            ? err.message 
            : 'Job not found or no longer available.'
        );
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [jobId]);
  
  if (loading) {
    return (
      <main className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse space-y-4 w-full max-w-4xl">
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-100 rounded w-full"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  if (error || !job) {
    return (
      <main className="section-padding">
        <div className="container-custom">
          <div className="bg-red-50 border border-red-200 p-8 rounded-lg text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-red-800 mb-4">
              {error || 'Job Not Found'}
            </h2>
            <p className="text-red-700 mb-6">
              The job you're looking for is no longer available or may have been removed.
            </p>
            <Link href="/careers" className="btn-primary">
              View All Job Opportunities
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/careers-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl">
            <Link href="/careers" className="inline-flex items-center text-primary-300 mb-4 hover:text-primary-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Career Opportunities
            </Link>
            <h1 className="heading-xl mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center text-lg mb-4">
              <span className="mr-6 mb-2">{job.department}</span>
              <span className="mr-6 mb-2">{job.location}</span>
              <span className="mb-2">{job.type}</span>
            </div>
            <p className="text-xl">
              {job.description}
            </p>
          </div>
        </div>
      </section>

      {/* Job Details Section */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Job Details</h2>
            
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Key Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            {job.qualifications && job.qualifications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Qualifications</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="heading-lg text-secondary-900">Apply for this Position</h2>
            <p className="text-gray-600 mt-2">
              Please fill out the form below to apply for the {job.title} position.
            </p>
          </div>
          
          <ApplicationForm jobId={job.id} jobTitle={job.title} />
        </div>
      </section>
    </main>
  );
}
