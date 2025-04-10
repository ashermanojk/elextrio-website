'use client';

import { useState } from 'react';
import Image from 'next/image';

// Company values based on the provided information
const valuesData = [
  {
    id: 1,
    title: "Customer-Centric Excellence",
    description: "We prioritize details, add value with every interaction, and ensure customer satisfaction. We exist because of our customers and we empower our team to fix problems and say 'yes' with the collective customer interest in mind.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Challenge and Grow",
    description: "We innovate, iterate, and exceed expectations. We challenge ourselves, our competitors, and our internal norms to find the optimal way forward. We embrace a growth mindset, making small, meaningful progress toward perfection.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Collaborate and Thrive",
    description: "We foster transparency, teamwork, and positivity. We thrive in a culture of direct communication where context is shared and assumptions are minimized. We balance challenging directly with caring personally.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Integrity",
    description: "We uphold the highest standards of honesty, ethics, and transparency in all our operations and relationships, building trust through consistent and reliable actions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Innovation",
    description: "We continuously seek creative solutions and embrace cutting-edge technologies to deliver unique, forward-thinking automation systems that address complex challenges.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Excellence",
    description: "We are committed to delivering outstanding quality in every aspect of our work, striving for perfection in our solutions, processes, and customer service to exceed expectations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const Values = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  
  const toggleValue = (id: number) => {
    setSelectedValue(selectedValue === id ? null : id);
  };
  
  return (
    <section className="section-padding bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR PRINCIPLES</h2>
          <h3 className="heading-lg text-white mb-4">Company Values</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            At Elextrio, our values define who we are and guide our actions. These values are the cornerstone of our commitment to delivering meaningful partnerships and impactful automation solutions.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Values Grid with Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuesData.map((value) => (
            <div
              key={value.id}
              className={`bg-slate-800 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                selectedValue === value.id
                  ? 'transform -translate-y-2 shadow-2xl border-l-4 border-primary-600'
                  : 'hover:-translate-y-1 hover:shadow-lg'
              }`}
              onClick={() => toggleValue(value.id)}
            >
              <div className="flex items-start">
                <div className={`text-primary-600 mr-4 transition-all duration-300 ${
                  selectedValue === value.id ? 'transform scale-110' : ''
                }`}>
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    selectedValue === value.id ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <p className="text-gray-300 pt-2">{value.description}</p>
                  </div>
                  <button 
                    className="text-primary-600 font-medium mt-2 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleValue(value.id);
                    }}
                  >
                    {selectedValue === value.id ? 'Read Less' : 'Read More'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ml-1 transition-transform duration-300 ${
                        selectedValue === value.id ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Strategic Imperatives */}
        <div className="mt-20">
          <h3 className="heading-md text-center text-white mb-12">Strategic Imperatives</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-center mb-4">Customer-Centric Growth</h4>
              <p className="text-gray-300 text-center">
                Strengthen client relationships by delivering tailored, innovative automation solutions that enhance productivity and satisfaction.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-center mb-4">Operational Excellence</h4>
              <p className="text-gray-300 text-center">
                Drive efficiency, quality, and reliability across all processes to ensure seamless project execution and long-term value creation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-center mb-4">Market Expansion</h4>
              <p className="text-gray-300 text-center">
                Diversify into new sectors and establish a global footprint, focusing on sustainable growth and adaptability to meet evolving industry needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
