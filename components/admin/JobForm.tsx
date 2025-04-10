'use client';

import React, { useState, useEffect } from 'react';
import { createJob, updateJob, getJob, type Job } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface JobFormProps {
  jobId?: string;
}

export default function JobForm({ jobId }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(jobId ? true : false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Omit<Job, 'id' | 'created_at'>>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    responsibilities: [''],
    qualifications: [''],
    benefits: [''],
    postDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    featured: false
  });

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const jobData = await getJob(jobId);
          setFormData({
            title: jobData.title,
            department: jobData.department,
            location: jobData.location,
            type: jobData.type,
            description: jobData.description,
            requirements: jobData.requirements || [''],
            responsibilities: jobData.responsibilities || [''],
            qualifications: jobData.qualifications || [''],
            benefits: jobData.benefits || [''],
            postDate: jobData.postDate,
            expiryDate: jobData.expiryDate,
            status: jobData.status,
            featured: jobData.featured
          });
        } catch (err) {
          console.error('Error fetching job:', err);
          setError('Failed to load job details. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    if (Array.isArray(formData[field])) {
      const newArray = [...(formData[field] as string[])];
      newArray[index] = value;
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const addArrayItem = (field: keyof typeof formData) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), '']
      }));
    }
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    if (Array.isArray(formData[field]) && (formData[field] as string[]).length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Clean up empty array items
      const cleanedFormData = {
        ...formData,
        requirements: formData.requirements?.filter(item => item.trim() !== '') || [],
        responsibilities: formData.responsibilities?.filter(item => item.trim() !== '') || [],
        qualifications: formData.qualifications?.filter(item => item.trim() !== '') || [],
        benefits: formData.benefits?.filter(item => item.trim() !== '') || []
      };

      if (jobId) {
        await updateJob(jobId, cleanedFormData);
      } else {
        await createJob(cleanedFormData);
      }
      
      setSuccess(true);
      
      // Redirect after successful save
      setTimeout(() => {
        router.push('/admin/jobs');
      }, 1500);
    } catch (err) {
      console.error('Error saving job:', err);
      setError('Failed to save job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderArrayFields = (
    field: keyof typeof formData,
    label: string,
    placeholder: string
  ) => {
    const items = formData[field] as string[];
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="text-red-600 px-2 py-1 rounded hover:bg-red-50"
              disabled={items.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="text-primary-600 hover:text-primary-800"
        >
          + Add another {label.toLowerCase()}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 p-6">
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-md shadow-sm">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
          Job successfully {jobId ? 'updated' : 'created'}! Redirecting...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department *
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="postDate" className="block text-sm font-medium text-gray-700 mb-1">
            Post Date *
          </label>
          <input
            type="date"
            id="postDate"
            name="postDate"
            value={formData.postDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex items-center h-full pt-6">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Feature this job on the careers page
          </label>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        {renderArrayFields('requirements', 'Requirements', 'Add a requirement')}
      </div>

      <div className="border-t border-gray-200 pt-6">
        {renderArrayFields('responsibilities', 'Responsibilities', 'Add a responsibility')}
      </div>

      <div className="border-t border-gray-200 pt-6">
        {renderArrayFields('qualifications', 'Qualifications', 'Add a qualification')}
      </div>

      <div className="border-t border-gray-200 pt-6">
        {renderArrayFields('benefits', 'Benefits', 'Add a benefit')}
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving...' : jobId ? 'Update Job' : 'Create Job'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/jobs')}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
