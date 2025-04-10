'use client';

import React, { useState, useEffect } from 'react';
import { getContentBySection, type WebContent } from '@/lib/supabase/client';

export default function ApplicationProcess() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentBySection('application_process');
        const contentMap = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);
        setContent(contentMap);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);
  
  const steps = [
    {
      number: '01',
      title: 'Application Submission',
      description: 'Submit your resume and cover letter through our online application system for a specific job opening or as a general application.'
    },
    {
      number: '02',
      title: 'Initial Screening',
      description: 'Our HR team reviews all applications and selects candidates whose qualifications match our requirements.'
    },
    {
      number: '03',
      title: 'Technical Assessment',
      description: 'Qualified candidates may be asked to complete a skill assessment relevant to the position they are applying for.'
    },
    {
      number: '04',
      title: 'Interview Process',
      description: 'Selected candidates will participate in interviews with HR, potential team members, and managers to evaluate technical skills and cultural fit.'
    },
    {
      number: '05',
      title: 'Final Selection',
      description: 'After the interview process, we make a final decision and extend an offer to the most suitable candidate.'
    },
    {
      number: '06',
      title: 'Onboarding',
      description: 'Once you accept our offer, we will guide you through our comprehensive onboarding process to help you integrate into the Elextrio family.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-secondary-900">
            {content.heading || "Our Application Process"}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            {content.description || "We've designed a straightforward application process to find the right talent while providing candidates with a positive experience. Here's what to expect:"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-primary-600/20 mb-4">{step.number}</div>
              <h4 className="text-xl font-bold text-secondary-900 mb-3">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-primary-50 border border-primary-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-secondary-900 mb-3">
            {content.tips_heading || "Tips for a Successful Application"}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Tailor your resume and cover letter to the specific position, highlighting relevant skills and experience.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Research our company, services, and industry to demonstrate your interest and understanding.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Prepare specific examples of relevant projects, accomplishments, and challenges you've overcome.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Be ready to discuss your technical skills in depth and how they apply to our automation solutions.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
