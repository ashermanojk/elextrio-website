'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const MissionVision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="section-padding bg-white" ref={sectionRef} id="mission-vision">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-primary-600 font-bold mb-2">OUR PURPOSE</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Mission & Vision</h3>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Section */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="bg-primary-600 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="heading-md text-secondary-900">Our Mission</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              To deliver innovative, reliable, and efficient automation solutions that empower industries to achieve greater productivity and precision. We aim to expand into diverse sectors, build global partnerships, and continually push the boundaries of technology, all while upholding our core values of integrity, dependability, and excellence.
            </p>
            
            <p className="text-gray-700">
              At Elextrio Automation, we are committed to creating solutions that are not only smart and sustainable but also easy to maintain and operate, driving value for our clients and shaping the future of automation.
            </p>
          </div>
          
          {/* Vision Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/images/mission.jpg" 
              alt="Industrial automation technology"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h4 className="text-xl font-bold mb-2">Delivering Excellence</h4>
                <p>Our commitment to innovation and quality in every project</p>
              </div>
            </div>
          </div>
          
          {/* Vision Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/images/vision.jpg" 
              alt="Future of automation"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h4 className="text-xl font-bold mb-2">Future-Ready Solutions</h4>
                <p>Building automation systems that evolve with your business</p>
              </div>
            </div>
          </div>
          
          {/* Vision Section */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="bg-primary-600 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="heading-md text-secondary-900">Our Vision</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              To make intelligent automation simple, enabling industries to achieve greater productivity and efficiency. We strive to be a trusted name in intelligent automation, known for delivering innovative and reliable solutions that simplify processes and enhance productivity.
            </p>
            
            <p className="text-gray-700">
              Our goal is to be the partner of choice for industries seeking efficiency and excellence, while continuously growing and adapting to meet the evolving needs of our customers.
            </p>
          </div>
        </div>
        
        {/* Brand Promise */}
        <div className="mt-16 bg-secondary-900 text-white p-10 rounded-lg shadow-xl">
          <div className="text-center mb-8">
            <h3 className="heading-md mb-2">Our Brand Promise</h3>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <blockquote className="text-xl italic text-center">
            "Smart, reliable, and efficient automation solutions tailored to your needs—delivered with integrity, innovation, and a commitment to excellence."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
