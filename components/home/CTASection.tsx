'use client';

import { useState } from 'react';
import Link from 'next/link';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-orange-700 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* CTA Content */}
          <div>
            <h2 className="heading-lg mb-6">Ready to Transform Your Industrial Processes?</h2>
            <p className="text-white/90 text-lg mb-8">
              Partner with Elextrio Automation to develop innovative, efficient, and reliable automation solutions tailored to your specific needs. Let's work together to enhance your productivity and drive your business forward.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Get in Touch
              </Link>
              <Link 
                href="/services" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="bg-white text-secondary-900 rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest industry insights, company news, and automation trends.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="yourname@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                  required
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  I agree to receive marketing communications from Elextrio Automation
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary py-3 flex justify-center items-center transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
              
              {isSuccess && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mt-4 text-sm">
                  Thank you for subscribing! You'll receive our newsletter soon.
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-white/80">Years of Experience</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-white/80">Projects Completed</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-white/80">Industry Partners</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-white/80">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
