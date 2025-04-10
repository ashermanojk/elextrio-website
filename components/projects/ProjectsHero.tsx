'use client';

import { useState } from 'react';
import Link from 'next/link';

// Project statistics data
const projectStats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '40+', label: 'Industries Served' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Years of Experience' }
];

const ProjectsHero = () => {
  return (
    <section className="relative bg-secondary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="relative container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-xl mb-6">Our Successful Projects</h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our portfolio of automation projects that have helped businesses across industries improve efficiency, quality, and operational performance.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Link 
                href="#featured-projects" 
                className="btn-primary"
              >
                View Featured Projects
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Discuss Your Project
              </Link>
            </div>
            
            {/* Project Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {projectStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            {/* Main image container */}
            <div className="bg-slate-800 h-[400px] rounded-xl overflow-hidden relative shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-600/20 mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-xl">Featured Project Image</span>
                </div>
              </div>
              
              {/* Overlay with project details */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                  Manufacturing
                </span>
                <h3 className="text-xl font-bold text-white mb-1">Automotive Assembly Line Automation</h3>
                <p className="text-gray-300 text-sm">
                  A comprehensive assembly line automation project that increased production capacity by 45%
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-primary-600/20 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary-600/20 rounded-full"></div>
            
            {/* Project card overlapping main image */}
            <div className="absolute -bottom-8 -right-4 bg-white text-secondary-900 w-48 p-4 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span className="font-medium text-sm">ROI Achieved</span>
              </div>
              <div className="text-xl font-bold text-primary-600">18 Months</div>
              <div className="text-xs text-gray-600">Return on investment period</div>
            </div>
          </div>
        </div>
        
        {/* Industry Filter Pills */}
        <div className="mt-16 pb-6">
          <h3 className="text-xl font-bold mb-6">Browse by Industry:</h3>
          <div className="flex flex-wrap gap-2">
            {['All Industries', 'Manufacturing', 'Pharmaceutical', 'Food & Beverage', 'Automotive', 'Energy', 'Logistics'].map((industry, index) => (
              <Link 
                key={index}
                href={`/projects?industry=${industry.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;
