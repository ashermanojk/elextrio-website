'use client';

import React, { useState, useEffect } from 'react';
import { submitJobApplication } from '@/lib/supabase/client';
import { supabase } from '@/lib/supabase/client';

interface ApplicationFormProps {
  jobId?: string;
  jobTitle?: string;
}

export default function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [files, setFiles] = useState({
    resume: null as File | null,
    coverLetter: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFiles(prev => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);

    try {
      if (!files.resume) {
        throw new Error('Resume is required');
      }

      // Upload files to Supabase Storage
      let resumeUrl = '';
      let coverLetterUrl = '';

      // Upload resume
      const resumeFileName = `${Date.now()}_${files.resume.name}`;
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from('job_applications')
        .upload(`resumes/${resumeFileName}`, files.resume);

      if (resumeError) {
        throw new Error(`Error uploading resume: ${resumeError.message}`);
      }

      setUploadProgress(50);
      resumeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/job_applications/resumes/${resumeFileName}`;

      // Upload cover letter if provided
      if (files.coverLetter) {
        const coverLetterFileName = `${Date.now()}_${files.coverLetter.name}`;
        const { data: coverData, error: coverError } = await supabase.storage
          .from('job_applications')
          .upload(`cover_letters/${coverLetterFileName}`, files.coverLetter);

        if (coverError) {
          throw new Error(`Error uploading cover letter: ${coverError.message}`);
        }

        coverLetterUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/job_applications/cover_letters/${coverLetterFileName}`;
      }

      setUploadProgress(75);

      // Submit application to database
      await submitJobApplication({
        job_id: jobId || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        resume_url: resumeUrl,
        cover_letter_url: coverLetterUrl || undefined,
        message: formData.message
      });

      setUploadProgress(100);
      setSubmitSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'There was an error submitting your application');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-medium text-green-800 mb-2">Application Submitted</h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in joining Elextrio Automation. We have received your application and will review it shortly.
        </p>
        <a href="/careers" className="btn-secondary inline-block">Back to Careers</a>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {jobId && jobTitle && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xl font-medium text-secondary-900">
              Applying for: <span className="text-primary-600">{jobTitle}</span>
            </h3>
          </div>
        )}

        {!jobId && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xl font-medium text-secondary-900">
              General Application
            </h3>
            <p className="text-gray-600 mt-1">
              Submit your resume for consideration for future opportunities at Elextrio Automation.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            Resume <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Accepted formats: PDF, DOC, DOCX
          </p>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Letter
          </label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Accepted formats: PDF, DOC, DOCX (Optional)
          </p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tell us why you're interested in joining Elextrio Automation and any additional information you'd like us to know."
          ></textarea>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {isSubmitting && uploadProgress > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Uploading files and submitting application...</p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full md:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
