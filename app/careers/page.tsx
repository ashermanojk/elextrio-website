import React from 'react';
import JobListings from '@/components/careers/JobListings';
import WhyJoinUs from '@/components/careers/WhyJoinUs';
import ApplicationProcess from '@/components/careers/ApplicationProcess';

export const metadata = {
  title: 'Careers - Elextrio Automation | Join Our Team',
  description: 'Explore career opportunities at Elextrio Automation. Join our team of experts in industrial automation and be part of innovation and excellence.',
};

export default function CareersPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/careers-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Join Our Team</h1>
            <p className="text-xl mb-8">
              Be part of our mission to transform industries through innovative automation solutions. 
              We're always looking for talented individuals to join our growing team.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <WhyJoinUs />

      {/* Current Openings */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Current Openings</h2>
          <JobListings />
        </div>
      </section>

      {/* Application Process */}
      <ApplicationProcess />
    </main>
  );
}
