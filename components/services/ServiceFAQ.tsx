'use client';

import { useState } from 'react';

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "What types of automation solutions does Elextrio provide?",
    answer: "Elextrio provides a comprehensive range of automation solutions including industrial automation (PLC programming, SCADA systems, HMI development), special purpose machinery (custom-designed equipment for specific manufacturing needs), turnkey projects (end-to-end automation implementations), and Industry 4.0 solutions (IoT integration, data analytics, and smart manufacturing systems)."
  },
  {
    id: 2,
    question: "How long does a typical automation project take to implement?",
    answer: "The timeline for implementation varies based on the scope and complexity of the project. Small to medium-sized projects typically take 3-6 months from concept to completion, while larger turnkey solutions may take 6-12 months. During the initial consultation, we provide a detailed timeline based on your specific requirements."
  },
  {
    id: 3,
    question: "What is the ROI for your automation solutions?",
    answer: "Our clients typically see ROI within 12-24 months of implementation. The exact return depends on various factors including the current level of automation, production volume, and specific challenges being addressed. We conduct thorough ROI analysis as part of our initial assessment to provide realistic expectations and help prioritize automation investments."
  },
  {
    id: 4,
    question: "Can your solutions integrate with our existing systems?",
    answer: "Yes, we specialize in integrating new automation solutions with existing equipment and systems. Our team has extensive experience working with a wide range of legacy systems and can develop custom interfaces and middleware to ensure seamless communication between new and existing components. This approach allows for incremental automation without requiring complete system replacement."
  },
  {
    id: 5,
    question: "What industries do you primarily serve?",
    answer: "We serve a wide range of industries including manufacturing, pharmaceutical, food and beverage, automotive, energy and utilities, and logistics and warehousing. Our team has specialized experience in each sector and understands the unique requirements, regulations, and challenges specific to these industries."
  },
  {
    id: 6,
    question: "What support do you provide after implementation?",
    answer: "We offer comprehensive post-implementation support including 24/7 technical assistance, preventative maintenance programs, spare parts management, and system optimization services. Our support team can provide remote diagnostics in many cases, and our field service engineers are available for on-site support when needed. We also offer training refresher courses and system audits to ensure ongoing optimal performance."
  },
  {
    id: 7,
    question: "How do you ensure minimal disruption during installation?",
    answer: "We understand that downtime can be costly. Our implementation strategy includes thorough pre-installation planning, off-line testing and verification, phased implementation where possible, and installation scheduling during planned downtime periods. For critical production environments, we can develop temporary parallel systems to allow for a smooth transition with minimal interruption to your operations."
  },
  {
    id: 8,
    question: "Do you provide training for our staff to operate the new systems?",
    answer: "Yes, comprehensive training is a core component of our service. We provide hands-on training for operators, maintenance personnel, and supervisors. Our training programs are tailored to different skill levels and roles within your organization. We also provide detailed documentation, user manuals, and video tutorials for future reference and training new staff members."
  },
  {
    id: 9,
    question: "Can your systems be scaled as our business grows?",
    answer: "Absolutely. Scalability is a fundamental consideration in all our designs. We develop automation architectures that can be expanded incrementally as your needs evolve. This includes considering future production increases, additional product varieties, and potential new technologies. Our modular approach allows for cost-effective expansion without requiring complete system redesign."
  },
  {
    id: 10,
    question: "What makes Elextrio different from other automation providers?",
    answer: "Elextrio stands out through our comprehensive approach that combines deep technical expertise with industry-specific knowledge. Unlike many providers who offer generic solutions, we take the time to understand your unique operational challenges and business objectives before designing custom solutions. We also pride ourselves on our ongoing support and partnership approach, focusing on long-term success rather than just completing a project."
  }
];

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">FREQUENTLY ASKED QUESTIONS</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">Common Questions About Our Services</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our automation solutions and implementation process.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* FAQ Accordion */}
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqData.map((faq, index) => (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <h4 className="text-lg font-medium text-secondary-900">{faq.question}</h4>
                  <span className={`ml-6 flex-shrink-0 text-primary-600 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`mt-2 transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Still Have Questions */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-md text-center">
            <h4 className="text-xl font-bold text-secondary-900 mb-3">Still Have Questions?</h4>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Contact us for detailed information about our services or to discuss your specific automation needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="btn-primary inline-flex items-center justify-center"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
              <a 
                href="/resources" 
                className="bg-secondary-900 hover:bg-secondary-800 text-white font-medium py-2 px-6 rounded-md inline-flex items-center justify-center transition-colors"
              >
                Download Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
