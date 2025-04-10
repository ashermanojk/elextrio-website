'use client';

import { useState } from 'react';
import Image from 'next/image';

// Service details data
const servicesData = [
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    description: "Comprehensive solutions to automate industrial processes, increasing efficiency and productivity while reducing errors and operational costs.",
    benefits: [
      "Increased production throughput by 30-50%",
      "Reduced operational costs and material waste",
      "Enhanced product quality and consistency",
      "Improved workplace safety conditions",
      "Real-time monitoring and data collection"
    ],
    features: [
      {
        title: "PLC Programming",
        description: "Custom programming for all major PLC brands including Siemens, Allen Bradley, Mitsubishi, and more."
      },
      {
        title: "SCADA Systems",
        description: "Comprehensive supervisory control and data acquisition systems for complete process visibility."
      },
      {
        title: "HMI Development",
        description: "Intuitive human-machine interfaces designed for efficient operator interaction."
      },
      {
        title: "Motion Control",
        description: "Precise motion control systems for applications requiring high accuracy and repeatability."
      }
    ],
    image: "/images/services/industrial-automation.jpg"
  },
  {
    id: "special-purpose-machinery",
    title: "Special Purpose Machinery",
    description: "Custom-engineered machines designed specifically for your unique manufacturing requirements, optimizing space, workflow, and output.",
    benefits: [
      "Purpose-built solutions for unique production needs",
      "Optimized for your specific space and workflow",
      "Higher efficiency than generic equipment",
      "Integration with existing production lines",
      "Reduced labor requirements"
    ],
    features: [
      {
        title: "Custom Machine Design",
        description: "Complete mechanical and electrical design services using the latest 3D CAD software."
      },
      {
        title: "Prototyping & Testing",
        description: "Rigorous prototype development and testing to ensure performance meets specifications."
      },
      {
        title: "Manufacturing & Assembly",
        description: "High-quality manufacturing and assembly of custom machinery at our dedicated facility."
      },
      {
        title: "Installation & Commissioning",
        description: "Professional installation and commissioning services to ensure smooth operation from day one."
      }
    ],
    image: "/images/services/special-purpose-machinery.jpg"
  },
  {
    id: "turnkey-solutions",
    title: "Turnkey Solutions",
    description: "End-to-end project management from concept to implementation, ensuring seamless integration of automation systems into your existing operations.",
    benefits: [
      "Single point of responsibility for entire project",
      "Reduced project management burden",
      "Seamless integration across all systems",
      "Comprehensive documentation and training",
      "Ongoing maintenance and support"
    ],
    features: [
      {
        title: "Requirements Analysis",
        description: "Detailed assessment of your operational needs and objectives to define project scope."
      },
      {
        title: "Solution Design",
        description: "Comprehensive solution architecture covering mechanical, electrical, and software aspects."
      },
      {
        title: "Implementation",
        description: "Coordinated deployment with minimal disruption to your existing operations."
      },
      {
        title: "Handover & Training",
        description: "Complete knowledge transfer including operator and maintenance training."
      }
    ],
    image: "/images/services/turnkey-solutions.jpg"
  },
  {
    id: "industry-4-solutions",
    title: "Industry 4.0 Solutions",
    description: "Smart manufacturing solutions leveraging IoT, data analytics, and cloud computing to create intelligent, connected production environments.",
    benefits: [
      "Data-driven decision making",
      "Predictive maintenance to prevent downtime",
      "Remote monitoring and control capabilities",
      "Continuous process optimization",
      "Scalable and future-proof infrastructure"
    ],
    features: [
      {
        title: "IoT Integration",
        description: "Connecting machines and systems to enable data collection and communication."
      },
      {
        title: "Data Analytics",
        description: "Advanced analytics to transform raw data into actionable insights."
      },
      {
        title: "Cloud Solutions",
        description: "Secure cloud-based platforms for data storage, processing, and access from anywhere."
      },
      {
        title: "Digital Twin",
        description: "Virtual models of physical systems for simulation, testing, and optimization."
      }
    ],
    image: "/images/services/industry-4-solutions.jpg"
  }
];

export default function ServiceDetails() {
  const [activeService, setActiveService] = useState(servicesData[0].id);
  
  const currentService = servicesData.find(service => service.id === activeService) || servicesData[0];
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR EXPERTISE</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Comprehensive Automation Services</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our range of automation services covers every aspect of industrial process improvement, from individual components to complete factory-wide systems.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Service Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`py-3 px-6 font-medium text-gray-700 border-b-2 transition-colors duration-300 ${
                activeService === service.id 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
        
        {/* Active Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Service Image */}
          <div className="order-2 lg:order-1 relative">
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg aspect-video relative">
              {/* Placeholder for service image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                <span className="text-gray-600 text-xl font-medium">{currentService.title}</span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-primary-600"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-primary-600"></div>
            </div>
            
            {/* Badge */}
            <div className="absolute -bottom-6 left-12 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold">Industry-Leading Solutions</span>
            </div>
          </div>
          
          {/* Service Information */}
          <div className="order-1 lg:order-2">
            <h3 className="heading-md text-secondary-900 mb-4">{currentService.title}</h3>
            <p className="text-gray-700 mb-8">{currentService.description}</p>
            
            {/* Key Features */}
            <div className="mb-8">
              <h4 className="font-bold text-lg text-secondary-900 mb-4">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentService.features.map((feature, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-primary-600 mb-2">{feature.title}</h5>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits */}
            <div>
              <h4 className="font-bold text-lg text-secondary-900 mb-4">Benefits</h4>
              <ul className="space-y-2">
                {currentService.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


