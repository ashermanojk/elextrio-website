'use client';

import { useState } from 'react';

// Company history milestones
const milestones = [
  {
    id: 1,
    year: "2012",
    title: "Foundation",
    description: "Elextrio Automation was founded with a vision to revolutionize industrial processes through innovative automation solutions. The company began with a small team of four engineers in a modest office in Mumbai."
  },
  {
    id: 2,
    year: "2014",
    title: "First Major Project",
    description: "Secured and successfully delivered our first major project for a leading pharmaceutical manufacturer, automating their packaging line and increasing efficiency by 40%."
  },
  {
    id: 3,
    year: "2015",
    title: "Research & Development",
    description: "Established our dedicated R&D department to focus on developing proprietary automation technologies tailored to the Indian manufacturing sector."
  },
  {
    id: 4,
    year: "2017",
    title: "Expansion",
    description: "Expanded operations with a new office in Pune to better serve clients in western India. The team grew to 25 engineers and technicians."
  },
  {
    id: 5,
    year: "2019",
    title: "International Recognition",
    description: "Received international recognition with our first overseas project in the UAE, automating a critical production line for a global consumer goods company."
  },
  {
    id: 6, 
    year: "2020",
    title: "Pandemic Response",
    description: "Quickly adapted to support essential industries during the COVID-19 pandemic, developing remote monitoring solutions and helping clients maintain operations with minimal staff on-site."
  },
  {
    id: 7,
    year: "2022",
    title: "Industry 4.0 Initiative",
    description: "Launched our comprehensive Industry 4.0 initiative, integrating IoT, AI, and data analytics into our automation solutions to help clients transition to smart manufacturing."
  },
  {
    id: 8,
    year: "2024",
    title: "Current Growth",
    description: "Today, Elextrio Automation stands as a leader in industrial automation with over 50 employees, serving clients across multiple industries throughout South Asia and the Middle East."
  }
];

const History = () => {
  const [activeYear, setActiveYear] = useState<string>(milestones[milestones.length - 1].year);
  
  const activeMilestone = milestones.find(milestone => milestone.year === activeYear);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR JOURNEY</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">The Elextrio Timeline</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From our humble beginnings to becoming a leading force in industrial automation, explore the key milestones that have shaped our growth and success.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Timeline Navigation */}
        <div className="relative mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div className="relative flex justify-between overflow-x-auto py-6 no-scrollbar">
            {milestones.map((milestone) => (
              <button
                key={milestone.id}
                onClick={() => setActiveYear(milestone.year)}
                className={`flex flex-col items-center min-w-[100px] transition-all ${
                  activeYear === milestone.year 
                    ? 'scale-110'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full mb-2 transition-colors ${
                  activeYear === milestone.year 
                    ? 'bg-primary-600' 
                    : 'bg-gray-400 hover:bg-primary-600/70'
                }`}></div>
                <span className={`font-bold ${
                  activeYear === milestone.year 
                    ? 'text-primary-600' 
                    : 'text-gray-500'
                }`}>
                  {milestone.year}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Active Milestone Content */}
        {activeMilestone && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg transition-all duration-500 animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-primary-600 mr-4">{activeMilestone.year}</span>
                <h4 className="text-2xl font-bold text-secondary-900">{activeMilestone.title}</h4>
              </div>
              <p className="text-gray-700">
                {activeMilestone.description}
              </p>
            </div>
          </div>
        )}
        
        {/* Mobile Timeline Alternative */}
        <div className="mt-16 lg:hidden space-y-6">
          <h4 className="text-xl font-bold text-secondary-900 mb-4">Complete Timeline</h4>
          
          <div className="border-l-2 border-primary-600 pl-6 space-y-10">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="relative">
                <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-primary-600"></div>
                <div className="mb-1">
                  <span className="text-xl font-bold text-primary-600">{milestone.year}</span>
                  <h5 className="text-lg font-semibold text-secondary-900">{milestone.title}</h5>
                </div>
                <p className="text-gray-700">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Vision for the Future */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-md text-secondary-900 mb-4">Looking to the Future</h3>
              <p className="text-gray-700 mb-4">
                As we continue our journey, we're committed to pushing the boundaries of what's possible in industrial automation. Our vision for the future includes:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Expanding our presence across South Asia and into new global markets</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Developing cutting-edge AI-powered predictive maintenance systems</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Pioneering sustainable automation solutions that reduce energy consumption and environmental impact</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Launching an automation academy to train the next generation of automation specialists</span>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[300px] rounded-lg overflow-hidden bg-gradient-to-r from-primary-600 to-orange-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h4 className="text-2xl font-bold mb-3">Our Mission Continues</h4>
                  <p className="max-w-sm mx-auto">
                    To empower industries through innovative automation solutions that drive efficiency, precision, and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
