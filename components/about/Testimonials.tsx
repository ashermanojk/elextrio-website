'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Sample testimonials data
const testimonialsData = [
  {
    id: 1,
    content: "Elextrio Automation transformed our production line with their custom automation solution. We've seen a 35% increase in productivity and significant reduction in operational errors. Their team's attention to detail and ongoing support has been exceptional.",
    author: "Rajiv Mehta",
    position: "Operations Director",
    company: "Stellar Pharmaceuticals Ltd.",
    image: "/images/testimonials/rajiv-mehta.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "Working with Elextrio has been a game-changer for our manufacturing facility. Their team took the time to understand our specific needs and designed a solution that perfectly fits our production requirements. The implementation was smooth, and the results have exceeded our expectations.",
    author: "Anjali Khanna",
    position: "Plant Manager",
    company: "Precision Components India",
    image: "/images/testimonials/anjali-khanna.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "As a smaller food processing company, we were hesitant about automation due to cost concerns. Elextrio worked within our budget to develop a scalable solution that we could implement in phases. Their expertise and customer-focused approach made all the difference.",
    author: "Sanjay Patel",
    position: "CEO",
    company: "NatureFirst Foods",
    image: "/images/testimonials/sanjay-patel.jpg",
    rating: 4
  },
  {
    id: 4,
    content: "We've worked with several automation companies over the years, but none have matched Elextrio's level of technical expertise and commitment to project success. Their after-sales support is particularly impressive - any issues are addressed promptly and professionally.",
    author: "Meera Desai",
    position: "Technical Director",
    company: "Global Auto Components",
    image: "/images/testimonials/meera-desai.jpg",
    rating: 5
  },
  {
    id: 5,
    content: "Elextrio Automation helped us tackle a complex production bottleneck that had been affecting our operations for years. Their innovative approach not only solved the immediate problem but also improved overall system reliability. We've since partnered with them on multiple projects.",
    author: "Vikram Seth",
    position: "Production Head",
    company: "ElectroTech Industries",
    image: "/images/testimonials/vikram-seth.jpg",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    
    if (isRightSwipe) {
      handlePrev();
    }
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">CLIENT FEEDBACK</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">What Our Clients Say</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience working with Elextrio Automation.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Testimonial Slider */}
        <div 
          className="max-w-4xl mx-auto relative"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="overflow-hidden"
            style={{ touchAction: 'pan-y' }}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-xl italic text-gray-700 mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                        {/* Placeholder for testimonial author image */}
                        <div className="w-full h-full flex items-center justify-center bg-primary-600/10 text-primary-600 font-bold text-lg">
                          {testimonial.author.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold text-secondary-900">{testimonial.author}</div>
                        <div className="text-gray-600">{testimonial.position}</div>
                        <div className="text-primary-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex justify-between absolute top-1/2 -left-12 -right-12 transform -translate-y-1/2">
            <button 
              onClick={handlePrev}
              className="bg-white hover:bg-primary-600 hover:text-white text-secondary-900 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={handleNext}
              className="bg-white hover:bg-primary-600 hover:text-white text-secondary-900 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-8 bg-primary-600' 
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <h4 className="text-xl font-bold text-secondary-900 mb-4">Ready to experience results like these?</h4>
          <a 
            href="/contact" 
            className="btn-primary inline-flex items-center"
          >
            Contact Us Today
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
