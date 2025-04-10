'use client';

import { useState } from 'react';
import Link from 'next/link';

// Case studies data
const caseStudiesData = [
  {
    id: 'pharmaceutical-mfg',
    title: 'Pharmaceutical Manufacturing Automation',
    company: 'MediPharm Solutions',
    industry: 'Pharmaceutical',
    challenge: 'MediPharm was struggling with inconsistent production quality and regulatory compliance issues in their tablet manufacturing process. Manual operations led to batch variations and documentation errors.',
    solution: 'We implemented a fully automated manufacturing line with integrated quality control systems. The solution included automated material handling, precise dosing systems, real-time process monitoring, and comprehensive data logging for regulatory compliance.',
    results: [
      'Achieved 99.8% batch consistency rate',
      'Reduced production time by 40%',
      'Eliminated manual documentation errors',
      'Full FDA 21 CFR Part 11 compliance',
      'ROI achieved in 14 months'
    ],
    testimonial: {
      quote: "Elextrio's automation solution transformed our manufacturing process. We've seen dramatic improvements in consistency and quality while achieving full regulatory compliance.",
      author: "Sarah Johnson",
      position: "Production Director, MediPharm Solutions"
    },
    image: '/images/case-studies/pharma-case-study.jpg'
  },
  {
    id: 'automotive-assembly',
    title: 'Automotive Assembly Line Modernization',
    company: 'PrecisionAuto Manufacturing',
    industry: 'Automotive',
    challenge: 'PrecisionAutos aging assembly line was causing increasing downtime, quality issues, and higher operational costs. The lack of data visibility made it difficult to identify bottlenecks and quality failure points.',
    solution: 'We designed and implemented a comprehensive assembly line modernization featuring advanced robotics, vision inspection systems, and a central SCADA control system. The solution included real-time performance monitoring and predictive maintenance capabilities.',
    results: [
      'Increased production throughput by 35%',
      'Reduced defect rate from 3.2% to 0.4%',
      'Decreased energy consumption by 25%',
      'Improved worker safety with 90% reduction in incidents',
      'Extended equipment lifecycle by 7+ years'
    ],
    testimonial: {
      quote: "The modernization project delivered more than we expected. Not only did we achieve better quality and throughput, but the data insights have transformed how we approach continuous improvement.",
      author: "Michael Chen",
      position: "Operations Manager, PrecisionAuto Manufacturing"
    },
    image: '/images/case-studies/auto-case-study.jpg'
  },
  {
    id: 'food-packaging',
    title: 'Food Packaging Line Automation',
    company: 'Fresh Foods Processing',
    industry: 'Food & Beverage',
    challenge: 'Fresh Foods was facing increasing labor costs, inconsistent packaging quality, and difficulties meeting growing demand with their manual packaging process. Contamination risks and product consistency were ongoing concerns.',
    solution: 'We designed an end-to-end automated packaging system with high-speed filling, sealing, and labeling stations. The solution incorporated vision inspection for quality control, automated sanitization systems, and full traceability through integrated barcode printing and verification.',
    results: [
      'Increased packaging speed by 200%',
      'Reduced labor costs by 60%',
      'Improved shelf life through consistent packaging',
      'Zero contamination incidents since implementation',
      'Enhanced product traceability from production to distribution'
    ],
    testimonial: {
      quote: "The automation system has been transformative for our business. We've significantly increased our output while improving quality and food safety standards. The ROI was achieved much faster than we anticipated.",
      author: "Emily Rodriguez",
      position: "CEO, Fresh Foods Processing"
    },
    image: '/images/case-studies/food-case-study.jpg'
  }
];

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">SUCCESS STORIES</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Project Case Studies</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Dive deeper into selected projects to understand our approach, implementation process, and the measurable results we've achieved for our clients.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Case Study Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center border-b border-gray-200">
            {caseStudiesData.map((caseStudy, index) => (
              <button
                key={caseStudy.id}
                className={`px-6 py-3 text-center font-medium text-lg transition-colors relative ${
                  activeCase === index 
                    ? 'text-primary-600' 
                    : 'text-gray-500 hover:text-secondary-900'
                }`}
                onClick={() => setActiveCase(index)}
              >
                {caseStudy.title}
                {activeCase === index && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Active Case Study */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Case Study Content */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <span className="bg-primary-600/10 text-primary-600 text-sm font-medium px-3 py-1 rounded-full">
                  {caseStudiesData[activeCase].industry}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
                {caseStudiesData[activeCase].title}
              </h3>
              <h4 className="text-xl text-gray-500 mb-8">
                {caseStudiesData[activeCase].company}
              </h4>
              
              {/* Challenge */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-secondary-900 mb-2">Challenge:</h5>
                <p className="text-gray-600">
                  {caseStudiesData[activeCase].challenge}
                </p>
              </div>
              
              {/* Solution */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-secondary-900 mb-2">Our Solution:</h5>
                <p className="text-gray-600">
                  {caseStudiesData[activeCase].solution}
                </p>
              </div>
              
              {/* Results */}
              <div className="mb-8">
                <h5 className="text-lg font-semibold text-secondary-900 mb-2">Results:</h5>
                <ul className="space-y-2 pl-2">
                  {caseStudiesData[activeCase].results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Read More Link */}
              <Link 
                href={`/projects/case-studies/${caseStudiesData[activeCase].id}`}
                className="btn-primary inline-flex items-center"
              >
                Read Full Case Study
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Case Study Image and Testimonial */}
            <div className="bg-gray-200 p-8 lg:p-12 relative min-h-[400px] lg:min-h-0 flex flex-col">
              {/* Image Placeholder */}
              <div className="bg-gray-300 h-48 sm:h-64 rounded-lg shadow-md mb-8 flex items-center justify-center">
                <span className="text-gray-500 font-medium">Case Study Image</span>
              </div>
              
              {/* Testimonial */}
              <div className="bg-white rounded-xl p-6 shadow-md mt-auto relative">
                <svg className="absolute -top-6 left-6 h-12 w-12 text-primary-600 opacity-20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="relative">
                  <p className="text-gray-700 italic mb-4">
                    "{caseStudiesData[activeCase].testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-medium text-secondary-900">
                      {caseStudiesData[activeCase].testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {caseStudiesData[activeCase].testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-12 right-12 w-16 h-16 border-t-4 border-r-4 border-primary-600 opacity-30"></div>
              <div className="absolute bottom-12 left-12 w-16 h-16 border-b-4 border-l-4 border-primary-600 opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* Download Section */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-bold text-secondary-900 mb-3">Want more details?</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Download our complete case study portfolio for in-depth information about our automation projects, including technical specifications and ROI analyses.
          </p>
          <a 
            href="/resources/case-studies-portfolio.pdf" 
            className="bg-secondary-900 hover:bg-secondary-800 text-white font-medium py-3 px-8 rounded-md inline-flex items-center transition-colors"
          >
            Download Case Studies Portfolio
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
