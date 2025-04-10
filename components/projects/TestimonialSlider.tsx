'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Testimonial data
const testimonialData = [
  {
    id: 1,
    quote: "Elextrio's automation solution has transformed our manufacturing process. We've seen a 40% increase in productivity while significantly reducing waste and operational costs.",
    author: "David Thompson",
    position: "Operations Director",
    company: "Global Manufacturing Inc.",
    image: "/images/testimonials/testimonial-1.jpg"
  },
  {
    id: 2,
    quote: "The custom machinery developed by Elextrio helped us solve production challenges that off-the-shelf solutions simply couldn't address. Their engineering expertise is unmatched in the industry.",
    author: "Jennifer Ramirez",
    position: "Production Manager",
    company: "PrecisionTech Industries",
    image: "/images/testimonials/testimonial-2.jpg"
  },
  {
    id: 3,
    quote: "Working with Elextrio on our Industry 4.0 transformation has been a game-changer. The data insights we now have access to have completely changed how we approach production optimization.",
    author: "Michael Chen",
    position: "CTO",
    company: "SmartFactory Systems",
    image: "/images/testimonials/testimonial-3.jpg"
  },
  {
    id: 4,
    quote: "Elextrio's robotics integration for our food packaging line exceeded our expectations. The ROI was achieved in less than 12 months, and we've seen substantial improvements in product consistency.",
    author: "Sarah Patel",
    position: "CEO",
    company: "Natural Foods Co.",
    image: "/images/testimonials/testimonial-4.jpg"
  },
  {
    id: 5,
    quote: "The control system implementation by Elextrio has given us unprecedented visibility into our production processes. We've reduced downtime by 35% and improved quality metrics across the board.",
    author: "Robert Wilson",
    position: "Plant Manager",
    company: "AutoParts Manufacturing",
    image: "/images/testimonials/testimonial-5.jpg"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1;
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold mb-2">CLIENT FEEDBACK</h2>
          <h3 className="heading-lg text-secondary-900 mb-4">What Our Clients Say</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear directly from the businesses that have partnered with Elextrio for their automation needs.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>
        
        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative">
          {/* Large Quote Icon */}
          <div className="absolute -top-16 left-0 text-primary-600/10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative z-10">
            <div className="relative h-full overflow-hidden">
              {/* Testimonials */}
              <div 
                className="transition-all duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialData.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="text-center">
                      {/* Testimonial Avatar */}
                      <div className="mb-6">
                        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto overflow-hidden relative">
                          {/* This would be replaced with actual images in production */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">Photo</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quote */}
                      <p className="text-xl md:text-2xl text-gray-700 italic mb-8">
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Author Info */}
                      <div>
                        <h4 className="text-lg font-bold text-secondary-900">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-600">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="mt-10 flex justify-between items-center">
              {/* Previous Button */}
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots Indicators */}
              <div className="flex space-x-2">
                {testimonialData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Next Button */}
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-600/10 rounded-full z-0"></div>
          <div className="absolute top-1/3 -left-16 w-32 h-32 border-4 border-dashed border-primary-600/20 rounded-full z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
