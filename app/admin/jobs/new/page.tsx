import React from 'react';
import JobForm from '@/components/admin/JobForm';

export default function NewJobPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Job</h1>
      <JobForm />
    </div>
  );
}
