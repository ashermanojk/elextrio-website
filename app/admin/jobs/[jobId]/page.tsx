'use client';

import React from 'react';
import JobForm from '@/components/admin/JobForm';
import { useParams } from 'next/navigation';

export default function EditJobPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h1>
      <JobForm jobId={jobId} />
    </div>
  );
}
