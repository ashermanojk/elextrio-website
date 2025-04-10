import React from 'react';
import ApplicationForm from '@/components/careers/ApplicationForm';

export const metadata = {
  title: 'Apply - Careers | Elextrio Automation',
  description: 'Submit your job application to join the Elextrio Automation team. We\'re looking for talented individuals to help create innovative automation solutions.',
};

export default function ApplyPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/careers-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-4">Join Our Team</h1>
            <p className="text-xl">
              We're always looking for talented individuals who are passionate about automation and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="heading-lg text-secondary-900">General Application</h2>
            <p className="text-gray-600 mt-2">
              Don't see a position that matches your skills? Send us your resume and we'll keep it on file for future opportunities.
            </p>
          </div>
          
          <ApplicationForm />
        </div>
      </section>
    </main>
  );
}
