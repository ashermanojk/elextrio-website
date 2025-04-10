'use client';

import { useState, useRef, useEffect } from 'react';

// Process steps data
const processSteps = [
  {
    id: 1,
    title: "Discovery & Assessment",
    description: "We begin by thoroughly understanding your operational challenges, objectives, and current processes. Our engineering team conducts a comprehensive assessment to identify automation opportunities and establish baseline performance metrics.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    keyPoints: [
      "On-site process evaluation",
      "Performance bottleneck identification",
      "Stakeholder interviews",
      "Technical feasibility analysis",
      "Initial ROI assessment"
    ]
  },
  {
    id: 2,
    title: "Solution Design",
    description: "Based on our findings, we develop a detailed solution design that addresses your specific needs. This includes mechanical design, electrical systems, control architecture, software development, and integration planning.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    keyPoints: [
      "Comprehensive system architecture",
      "Hardware & software specifications",
      "Control logic development",
      "3D modeling and simulation",
      "Safety system design"
    ]
  },
  {
    id: 3,
    title: "Prototyping & Testing",
    description: "For complex projects, we develop proof-of-concept prototypes to validate design assumptions and performance expectations. Rigorous testing ensures that all components work together seamlessly and meet your requirements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    keyPoints: [
      "Component testing and validation",
      "System integration verification",
      "Performance benchmarking",
      "User interface testing",
      "Failure mode analysis"
    ]
  },
  {
    id: 4,
    title: "Implementation",
    description: "With the design validated, we proceed to full implementation. Our experienced team handles manufacturing, assembly, programming, and installation, following strict quality control standards at every stage.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    keyPoints: [
      "Component procurement and assembly",
      "Control system programming",
      "On-site installation",
      "System integration",
      "Pre-commissioning checks"
    ]
  },
  {
    id: 5,
    title: "Commissioning & Training",
    description: "Once installation is complete, we conduct thorough commissioning to ensure all systems operate as designed. Comprehensive training is provided to your staff, covering operation, maintenance, and troubleshooting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    keyPoints: [
      "System performance validation",
      "Operator training programs",
      "Maintenance procedure documentation",
      "Handover documentation",
      "Initial production support"
    ]
  },
  {
    id: 6,
    title: "Ongoing Support & Optimization",
    description: "Our relationship continues well beyond implementation. We provide ongoing technical support, preventative maintenance services, and continuous optimization to ensure your automation systems deliver maximum value throughout their lifecycle.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    keyPoints: [
      "24/7 technical support",
      "Preventative maintenance plans",
      "Performance monitoring",
      "System upgrades and enhancements",
      "Continuous improvement consulting"
    ]
  }
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    
    // Scroll to steps section on mobile
    if (window.innerWidth < 768 && stepsRef.current) {
      stepsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="section-padding bg-gray-50" ref={stepsRef}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">OUR APPROACH</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">The Elextrio Implementation Process</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We follow a proven methodology to ensure successful automation projects, from initial assessment through to ongoing support and optimization.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Process Steps Timeline */}
        <div className="hidden md:block relative mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
          <div className="relative flex justify-between max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex flex-col items-center transition-transform ${
                  activeStep === step.id ? 'scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  activeStep === step.id 
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}>
                  {step.id}
                </div>
                <span className={`text-sm font-medium text-center ${
                  activeStep === step.id ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Steps List */}
        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
            {processSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center py-2 px-4 rounded-full whitespace-nowrap transition-colors ${
                  activeStep === step.id 
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  {step.id}
                </span>
                {step.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Active Step Details */}
        {processSteps.map((step) => (
          <div 
            key={step.id}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center transition-all duration-500 ${
              activeStep === step.id ? 'opacity-100' : 'hidden'
            }`}
          >
            {/* Step Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600 mb-4">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-secondary-900 mb-2">{step.title}</h4>
              <div className="text-sm text-gray-500">Step {step.id} of {processSteps.length}</div>
            </div>
            
            {/* Step Description */}
            <div className="md:col-span-2">
              <p className="text-gray-700 mb-6">
                {step.description}
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-secondary-900 mb-4">Key Activities:</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {step.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Next/Previous Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => handleStepClick(step.id === 1 ? processSteps.length : step.id - 1)}
                  className="text-gray-600 hover:text-primary-600 flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Step
                </button>
                <button
                  onClick={() => handleStepClick(step.id === processSteps.length ? 1 : step.id + 1)}
                  className="text-primary-600 hover:text-primary-700 flex items-center transition-colors"
                >
                  Next Step
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
