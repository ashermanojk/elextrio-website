'use client';

import { useState } from 'react';
import Link from 'next/link';

// Industries data
const industriesData = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Enhance production efficiency, quality, and flexibility with tailored automation solutions for manufacturing operations of all scales.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    applications: [
      "Assembly line automation",
      "Quality inspection systems",
      "Material handling solutions",
      "Production tracking and reporting",
      "Inventory management systems"
    ]
  },
  {
    id: "pharmaceutical",
    title: "Pharmaceutical",
    description: "Meet strict regulatory requirements while improving productivity with automation solutions designed specifically for pharmaceutical manufacturing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    applications: [
      "Batch process automation",
      "Packaging and labeling systems",
      "Compliance documentation",
      "Clean room automation",
      "Serialization and track & trace"
    ]
  },
  {
    id: "food-beverage",
    title: "Food & Beverage",
    description: "Improve food safety, consistency, and production rates with specialized automation for the unique demands of food and beverage processing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    applications: [
      "Recipe management systems",
      "High-speed packaging lines",
      "Quality control and inspection",
      "Hygienic processing equipment",
      "Temperature and humidity control"
    ]
  },
  {
    id: "automotive",
    title: "Automotive",
    description: "Meet the demands of modern vehicle manufacturing with precision automation solutions for assembly, testing, and quality assurance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    applications: [
      "Robotic assembly cells",
      "In-line testing systems",
      "Parts tracking with RFID/barcode",
      "Automated guided vehicles (AGVs)",
      "Vision-guided assembly verification"
    ]
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    description: "Optimize energy production, distribution, and consumption with reliable automation systems designed for critical infrastructure.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    applications: [
      "SCADA systems for utilities",
      "Distributed control systems",
      "Load management automation",
      "Remote monitoring solutions",
      "Predictive maintenance systems"
    ]
  },
  {
    id: "logistics",
    title: "Logistics & Warehousing",
    description: "Transform your storage and distribution operations with automation solutions that enhance speed, accuracy, and efficiency.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    applications: [
      "Automated storage and retrieval",
      "Conveyor and sortation systems",
      "Pick-to-light systems",
      "Warehouse execution software",
      "Autonomous mobile robots (AMRs)"
    ]
  }
];

const IndustriesSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(industriesData[0].id);
  
  const currentIndustry = industriesData.find(industry => industry.id === activeIndustry) || industriesData[0];
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">INDUSTRIES WE SERVE</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Specialized Solutions for Every Sector</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide automation expertise across a wide range of industries, each with their unique requirements and challenges.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {industriesData.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveIndustry(industry.id)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                activeIndustry === industry.id 
                  ? 'bg-primary-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`mb-3 ${activeIndustry === industry.id ? 'text-white' : 'text-primary-600'}`}>
                {industry.icon}
              </div>
              <span className="text-center font-medium">{industry.title}</span>
            </button>
          ))}
        </div>
        
        {/* Active Industry Content */}
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="heading-md text-secondary-900 mb-4">{currentIndustry.title}</h4>
              <p className="text-gray-700 mb-6">
                {currentIndustry.description}
              </p>
              
              <h5 className="font-bold text-secondary-900 mb-3">Key Applications:</h5>
              <ul className="space-y-2 mb-6">
                {currentIndustry.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{application}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/industries/${currentIndustry.id}`} 
                className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center transition-colors"
              >
                Learn more about our {currentIndustry.title} solutions
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg overflow-hidden shadow-md aspect-video">
                {/* Placeholder for industry image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="text-primary-600 mb-2 flex justify-center">
                      {currentIndustry.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{currentIndustry.title} Solutions</span>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary-600 opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary-600 opacity-60"></div>
              </div>
              
              {/* Case study badge */}
              <div className="absolute -bottom-4 -right-4 bg-secondary-900 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-medium">Case Studies Available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Industry Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">40+</div>
            <div className="text-gray-700">Industries Served</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">250+</div>
            <div className="text-gray-700">Projects Completed</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-gray-700">Repeat Clients</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">12+</div>
            <div className="text-gray-700">Years of Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
