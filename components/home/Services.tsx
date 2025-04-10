'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the services data
const servicesData = [
  {
    id: 1,
    title: "Industrial Automation",
    description: "Developing systems to automate manufacturing processes for improved efficiency and precision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    image: "/images/industrial-automation.jpg",
    path: "/services/industrial-automation"
  },
  {
    id: 2,
    title: "Special Purpose Machinery",
    description: "Designing and building custom machines tailored to specific industrial needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    image: "/images/special-purpose-machinery.jpg",
    path: "/services/special-purpose-machinery"
  },
  {
    id: 3,
    title: "Turnkey Projects",
    description: "Delivering end-to-end solutions, from design and development to installation and commissioning.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    image: "/images/turnkey-projects.jpg",
    path: "/services/turnkey-projects"
  },
  {
    id: 4,
    title: "Product Development",
    description: "Innovating and engineering new products to meet emerging industry demands.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    image: "/images/product-development.jpg",
    path: "/services/product-development"
  },
  {
    id: 5,
    title: "Contract Manufacturing",
    description: "Offering reliable and cost-effective manufacturing services for clients.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    image: "/images/contract-manufacturing.jpg",
    path: "/services/contract-manufacturing"
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(servicesData[0].id);
  
  return (
    <section className="section-padding bg-gray-50" id="services">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">WHAT WE DO</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Our Core Services</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines. Our focus is on delivering value-driven, efficient, and innovative systems tailored to the unique needs of our clients.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Services Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {servicesData.map(service => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeService === service.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-secondary-900 hover:bg-gray-100'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
        
        {/* Active Service Detail */}
        {servicesData.map(service => (
          <div 
            key={service.id}
            className={`transition-opacity duration-500 ${
              activeService === service.id ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-primary-600 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="heading-md text-secondary-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 text-lg">{service.description}</p>
                  
                  <div className="mt-auto">
                    <Link href={service.path} className="btn-primary">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="relative h-[300px] lg:h-auto">
                  <div className="absolute inset-0 bg-gray-800">
                    {/* Placeholder for image */}
                    <div className="h-full w-full flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                      {service.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Service Cards Grid - Mobile Friendly Alternative */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {servicesData.map(service => (
            <div 
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-48 bg-gray-800 relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-6xl font-bold">
                  {service.id}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-primary-600 mr-3 w-10 h-10">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900">{service.title}</h4>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link href={service.path} className="text-primary-600 font-medium hover:text-primary-800 inline-flex items-center transition-colors">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary px-8 py-3">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
