'use client';

import { useState } from 'react';
import Link from 'next/link';

// Featured projects data
const projectsData = [
  {
    id: 1,
    title: 'Pharmaceutical Production Line Automation',
    industry: 'Pharmaceutical',
    category: 'Process Automation',
    description: 'Complete automation of a tablet manufacturing line, including material handling, compression, coating, and packaging.',
    results: ['45% increase in production output', '99.8% reduction in quality defects', 'ROI achieved in 14 months'],
    image: '/images/projects/pharma-automation.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Food Processing Robotic Integration',
    industry: 'Food & Beverage',
    category: 'Robotics Integration',
    description: 'Implementation of robotic systems for a food packaging line, handling sorting, placement, and quality inspection.',
    results: ['60% reduction in labor costs', '35% increase in packaging speed', 'Improved workplace safety'],
    image: '/images/projects/food-robotics.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'Automotive Assembly Line Control System',
    industry: 'Automotive',
    category: 'Control Systems',
    description: 'Advanced control system for a vehicle assembly line, integrating PLC, SCADA, and MES systems for seamless operation.',
    results: ['30% reduction in production time', '25% decrease in energy consumption', 'Real-time quality monitoring'],
    image: '/images/projects/auto-control.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Custom Bottle Filling Machine',
    industry: 'Food & Beverage',
    category: 'Custom Machinery',
    description: 'Design and implementation of a specialized bottle filling machine for a craft beverage manufacturer with unique container requirements.',
    results: ['200% increase in filling accuracy', 'Reduced product waste by 40%', 'Custom integration with existing production line'],
    image: '/images/projects/bottle-filling.jpg',
    featured: false
  },
  {
    id: 5,
    title: 'Smart Factory Transformation',
    industry: 'Manufacturing',
    category: 'Industry 4.0',
    description: 'Complete digital transformation of a manufacturing facility implementing IoT sensors, cloud connectivity, and predictive maintenance.',
    results: ['50% reduction in unplanned downtime', '30% improvement in overall equipment effectiveness', 'Data-driven process optimization'],
    image: '/images/projects/smart-factory.jpg',
    featured: true
  },
  {
    id: 6,
    title: 'Warehouse Logistics Automation',
    industry: 'Logistics',
    category: 'Turnkey Solutions',
    description: 'End-to-end automation solution for a distribution center including conveyor systems, sortation, and inventory management.',
    results: ['Order processing time reduced by 65%', 'Inventory accuracy improved to 99.9%', 'Labor costs reduced by 40%'],
    image: '/images/projects/warehouse-automation.jpg',
    featured: false
  },
  {
    id: 7,
    title: 'Energy Plant Monitoring System',
    industry: 'Energy',
    category: 'Control Systems',
    description: 'Implementation of a comprehensive monitoring and control system for a renewable energy facility with remote management capabilities.',
    results: ['15% increase in energy output efficiency', 'Remote monitoring reduced site visits by 70%', 'Predictive maintenance implementation'],
    image: '/images/projects/energy-monitoring.jpg',
    featured: false
  },
  {
    id: 8,
    title: 'Pharmaceutical Quality Control System',
    industry: 'Pharmaceutical',
    category: 'Process Automation',
    description: 'Automated quality control system for injectable medication production with vision inspection and data logging capabilities.',
    results: ['Zero defects reaching final packaging', 'Complete batch traceability', 'Compliance with FDA 21 CFR Part 11'],
    image: '/images/projects/pharma-qc.jpg',
    featured: true
  },
  {
    id: 9,
    title: 'Custom Metal Forming Machine',
    industry: 'Manufacturing',
    category: 'Custom Machinery',
    description: 'Design and manufacturing of a specialized metal forming machine for producing complex automotive components.',
    results: ['Production of previously outsourced components', 'Reduced per-part cost by 35%', 'Increased manufacturing flexibility'],
    image: '/images/projects/metal-forming.jpg',
    featured: false
  }
];

const filters = {
  industries: ['All Industries', 'Manufacturing', 'Pharmaceutical', 'Food & Beverage', 'Automotive', 'Energy', 'Logistics'],
  categories: ['All Categories', 'Process Automation', 'Custom Machinery', 'Control Systems', 'Robotics Integration', 'Industry 4.0', 'Turnkey Solutions']
};

const ProjectGrid = () => {
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [visibleProjects, setVisibleProjects] = useState(6); // Initial number of projects to show
  
  // Filter projects based on active filters
  const filteredProjects = projectsData.filter(project => {
    const industryMatch = activeIndustry === 'All Industries' || project.industry === activeIndustry;
    const categoryMatch = activeCategory === 'All Categories' || project.category === activeCategory;
    return industryMatch && categoryMatch;
  });
  
  // Handle filter changes
  const handleIndustryChange = (industry: string) => {
    setActiveIndustry(industry);
    setVisibleProjects(6); // Reset visible projects when changing filters
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleProjects(6); // Reset visible projects when changing filters
  };
  
  // Handle load more
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR WORK</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Featured Projects</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse through our successful projects and see how our automation solutions have helped businesses achieve their operational goals.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Industry Filter */}
              <div>
                <h4 className="text-lg font-medium text-secondary-900 mb-4">Filter by Industry:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.industries.map((industry, index) => (
                    <button
                      key={industry}
                      onClick={() => handleIndustryChange(industry)}
                      className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                        activeIndustry === industry
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <h4 className="text-lg font-medium text-secondary-900 mb-4">Filter by Solution Type:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-secondary-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative h-52 bg-gray-200">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  <span className="text-gray-600 font-medium">{project.title}</span>
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                
                {/* Industry & Category badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className="bg-secondary-900 text-white text-xs px-3 py-1 rounded-full">
                    {project.industry}
                  </span>
                  <span className="bg-white/80 backdrop-blur-sm text-secondary-900 text-xs px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-secondary-900 mb-3">
                  {project.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                {/* Results */}
                <div className="mb-5">
                  <h5 className="font-semibold text-sm text-secondary-900 mb-2">Key Results:</h5>
                  <ul className="space-y-1">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <svg className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* View Project Link */}
                <Link 
                  href={`/projects/${project.id}`} 
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center transition-colors"
                >
                  View Project Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMoreProjects}
              className="bg-white hover:bg-gray-50 text-secondary-900 font-medium py-3 px-8 rounded-md border border-gray-300 shadow-sm transition-colors inline-flex items-center"
            >
              Load More Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
        
        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-secondary-900 mb-2">No Projects Found</h4>
            <p className="text-gray-600 mb-6">
              No projects match your current filter selection. Try adjusting your filters to see more projects.
            </p>
            <button
              onClick={() => {
                setActiveIndustry('All Industries');
                setActiveCategory('All Categories');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
