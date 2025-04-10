'use client';

import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaUsers, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { getContentBySection, type WebContent } from '@/lib/supabase/client';

export default function WhyJoinUs() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentBySection('why_join_us');
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
  
  const benefits = [
    {
      icon: <FaLightbulb size={24} />,
      title: 'Innovation',
      description: 'Work on cutting-edge automation technologies and contribute to innovative solutions that transform industries.'
    },
    {
      icon: <FaUsers size={24} />,
      title: 'Collaborative Culture',
      description: 'Join a diverse team of experts who collaborate across disciplines to solve complex automation challenges.'
    },
    {
      icon: <FaChartLine size={24} />,
      title: 'Growth Opportunities',
      description: 'Develop your career with clear advancement paths, mentoring programs, and leadership opportunities.'
    },
    {
      icon: <FaGraduationCap size={24} />,
      title: 'Continuous Learning',
      description: 'Access to training programs, certification courses, and industry conferences to enhance your skills.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-primary-600 font-bold mb-2">
            {content.heading || "WHY JOIN US"}
          </h2>
          <h3 className="heading-lg text-secondary-900">
            {content.subheading || "Build Your Career With Elextrio"}
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            {content.intro_text || "At Elextrio Automation, we believe our success is driven by our people. We offer a dynamic work environment where talent is recognized, innovation is encouraged, and professional growth is prioritized."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">{benefit.icon}</div>
              <h4 className="text-xl font-bold text-secondary-900 mb-3">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-secondary-900 text-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-4">
                {content.benefits_heading || "Our Company Benefits"}
              </h3>
              <p className="mb-6">
                {content.benefits_text || "In addition to a competitive salary and challenging work, we offer a comprehensive benefits package to support your well-being."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Health insurance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Retirement plans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Paid time off</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible work hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Professional development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Team building events</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-4">
                {content.environment_heading || "Work Environment"}
              </h3>
              <p className="mb-6">
                {content.environment_text || "Our modern office is designed to foster creativity, collaboration, and productivity, with areas for focused work and team discussions."}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Office Image 1</span>
                </div>
                <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Office Image 2</span>
                </div>
                <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Office Image 3</span>
                </div>
                <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Office Image 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
