'use client';

import { useState } from 'react';
import Link from 'next/link';

// Project categories data
const categories = [
  {
    id: 'process-automation',
    title: 'Process Automation',
    description: 'Streamlining manufacturing processes with intelligent control systems',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    count: 85,
  },
  {
    id: 'custom-machinery',
    title: 'Custom Machinery',
    description: 'Specialized equipment designed for unique production needs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    count: 64,
  },
  {
    id: 'control-systems',
    title: 'Control Systems',
    description: 'Intelligent systems for precise process control and monitoring',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    ),
    count: 92,
  },
  {
    id: 'robotics',
    title: 'Robotics Integration',
    description: 'Implementing robotic systems for enhanced precision and efficiency',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    count: 48,
  },
  {
    id: 'industry-4',
    title: 'Industry 4.0',
    description: 'Smart manufacturing solutions leveraging IoT and data analytics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    count: 36,
  },
  {
    id: 'turnkey-solutions',
    title: 'Turnkey Solutions',
    description: 'End-to-end implementation of complete automation systems',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    count: 29,
  }
];

const ProjectCategories = () => {
  return (
    <section id="featured-projects" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">PROJECT CATEGORIES</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Explore Our Diverse Expertise</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse through our project categories to discover the breadth of our automation capabilities and find examples relevant to your industry.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/projects/categories/${category.id}`} 
              key={category.id}
              className="group bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-primary-600/10 flex items-center justify-center mr-4 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {category.count} projects
                    </span>
                    
                    <span className="text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                      View Projects
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Total Projects Badge */}
        <div className="mt-12 text-center">
          <span className="bg-secondary-900 text-white text-lg font-medium py-3 px-8 rounded-full inline-block">
            Total Projects: {categories.reduce((acc, curr) => acc + curr.count, 0)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectCategories;
