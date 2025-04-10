'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "Climate Controlled Louvres",
    category: "Industrial Automation",
    description: "Automated louvre system for climate control on the 22-23 floors of a commercial building, offering precision temperature regulation and energy efficiency.",
    image: "/images/climate-controlled-louvres.jpg",
    client: "Commercial Real Estate Developer",
    year: "2023",
    path: "/projects/climate-controlled-louvres"
  },
  {
    id: 2,
    title: "Automated Assembly Line",
    category: "Manufacturing Automation",
    description: "Design and implementation of a fully automated assembly line for electronic components, increasing production efficiency by 35%.",
    image: "/images/assembly-line.jpg",
    client: "Electronics Manufacturer",
    year: "2022",
    path: "/projects/automated-assembly-line"
  },
  {
    id: 3,
    title: "Precision Sorting System",
    category: "Special Purpose Machinery",
    description: "Custom-built optical sorting system for pharmaceutical products with 99.9% accuracy, ensuring quality control compliance.",
    image: "/images/sorting-system.jpg",
    client: "Pharmaceutical Company",
    year: "2023",
    path: "/projects/precision-sorting-system"
  },
  {
    id: 4,
    title: "Smart Packaging Solution",
    category: "Turnkey Project",
    description: "End-to-end automated packaging solution with real-time monitoring and predictive maintenance capabilities.",
    image: "/images/packaging-solution.jpg",
    client: "Food & Beverage Manufacturer",
    year: "2023",
    path: "/projects/smart-packaging-solution"
  }
];

const ProjectsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const nextProject = () => {
    setActiveIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };
  
  const prevProject = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };
  
  const goToProject = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <section className="section-padding bg-white" id="projects">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR WORK</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Featured Projects</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects that demonstrate our expertise in delivering innovative automation solutions across various industries.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Project Slider */}
        <div className="relative overflow-hidden" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projectsData.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  {/* Project Image */}
                  <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl order-2 lg:order-1">
                    {/* This is a placeholder for the actual image */}
                    <div className="absolute inset-0 bg-gray-800">
                      <div className="flex items-center justify-center h-full text-white text-opacity-20 text-9xl font-bold">
                        {project.id}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-900/80 to-transparent py-4 px-6">
                      <div className="text-white">
                        <span className="text-primary-600 font-medium">{project.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="order-1 lg:order-2">
                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                      <h3 className="heading-md text-secondary-900 mb-4">{project.title}</h3>
                      <p className="text-gray-600 mb-6">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 mb-1">Client</h4>
                          <p className="text-secondary-900">{project.client}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 mb-1">Year</h4>
                          <p className="text-secondary-900">{project.year}</p>
                        </div>
                      </div>
                      
                      <Link 
                        href={project.path} 
                        className="btn-primary inline-flex items-center"
                      >
                        View Project Details
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between absolute top-1/2 left-4 right-4 transform -translate-y-1/2 z-10">
            <button 
              onClick={prevProject}
              className="bg-white/80 hover:bg-primary-600 hover:text-white text-secondary-900 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextProject}
              className="bg-white/80 hover:bg-primary-600 hover:text-white text-secondary-900 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`h-3 transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-10 bg-primary-600' 
                  : 'w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Project Tabs for Mobile View */}
        <div className="mt-16 lg:hidden">
          <div className="grid grid-cols-1 gap-6">
            {projectsData.map((project) => (
              <Link 
                href={project.path}
                key={project.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="relative h-48">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gray-800">
                    <div className="flex items-center justify-center h-full text-white text-opacity-20 text-6xl font-bold">
                      {project.id}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent flex items-end">
                    <div className="p-4">
                      <span className="inline-block bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-md mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{project.description}</p>
                  <div className="text-primary-600 font-medium text-sm flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/projects" className="btn-secondary px-8 py-3">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
