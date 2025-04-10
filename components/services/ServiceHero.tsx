'use client';

import { useState } from 'react';
import Link from 'next/link';

const serviceCategories = [
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    subtitle: 'Streamline operations with precision control systems',
    description: 'Our industrial automation solutions optimize manufacturing processes, reduce human error, and increase production efficiency through advanced control systems and intelligent monitoring.'
  },
  {
    id: 'special-purpose-machinery',
    title: 'Special Purpose Machinery',
    subtitle: 'Custom-engineered solutions for unique challenges',
    description: 'We design and build specialized machines tailored to your specific production requirements, helping you achieve optimal performance for unique manufacturing processes.'
  },
  {
    id: 'turnkey-solutions',
    title: 'Turnkey Solutions',
    subtitle: 'End-to-end implementation from concept to completion',
    description: 'Our comprehensive turnkey services handle every aspect of your automation project from initial concept and design through to installation, commissioning, and ongoing support.'
  },
  {
    id: 'industry-4-solutions',
    title: 'Industry 4.0 Solutions',
    subtitle: 'Smart manufacturing for the digital era',
    description: 'Leverage the power of IoT, data analytics, and smart connectivity to transform your operations into an intelligent, self-optimizing manufacturing ecosystem.'
  }
];

const ServiceHero = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  
  const activeService = serviceCategories.find(category => category.id === activeCategory);
  
  return (
    <section className="relative bg-secondary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="relative container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-xl mb-6">Innovative Automation Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              Empowering your business with cutting-edge automation solutions tailored to your specific operational needs.
            </p>
            
            {/* Service Category Selector */}
            <div className="flex flex-wrap gap-3 mb-8">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            {/* Active Service Content */}
            {activeService && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-2">{activeService.subtitle}</h2>
                <p className="text-gray-300 mb-6">
                  {activeService.description}
                </p>
                <Link 
                  href={`/services/${activeService.id}`} 
                  className="btn-primary inline-flex items-center"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
          
          {/* Service Illustration */}
          <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl">
            {/* Dynamic content based on active category */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-primary-600/20 flex items-center justify-center">
                  {activeCategory === 'industrial-automation' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  )}
                  
                  {activeCategory === 'special-purpose-machinery' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  
                  {activeCategory === 'turnkey-solutions' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  )}
                  
                  {activeCategory === 'industry-4-solutions' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  )}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{activeService?.title}</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  {activeService?.description}
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-primary-600/40"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 border-b-2 border-l-2 border-primary-600/40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary-600/10"></div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-gray-300">Service Offerings</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">40+</div>
            <div className="text-gray-300">Industries Served</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
            <div className="text-gray-300">Client Satisfaction</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-300">Technical Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
