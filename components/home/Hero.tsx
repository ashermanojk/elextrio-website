'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


// Hero slides with different backgrounds and content
const heroSlides = [
  {
    id: 1,
    title: "Smart Automation Solutions",
    subtitle: "Empowering Seamless Business Operations",
    description: "We deliver intelligent automation solutions that drive productivity and efficiency in your manufacturing processes.",
    image: "/images/hero-automation.jpg", // Placeholder image
    ctaText: "Explore Services",
    ctaLink: "/services"
  },
  {
    id: 2,
    title: "Precision Engineering",
    subtitle: "Special Purpose Machines",
    description: "Custom-built machinery designed specifically for your unique industrial needs and applications.",
    image: "/images/hero-machinery.jpg", // Placeholder image
    ctaText: "View Projects",
    ctaLink: "/projects"
  },
  {
    id: 3,
    title: "Turnkey Solutions",
    subtitle: "From Concept to Completion",
    description: "End-to-end project management with a focus on quality, efficiency, and reliability.",
    image: "/images/hero-turnkey.jpg", // Placeholder image
    ctaText: "Contact Us",
    ctaLink: "/contact"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Slider background images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Placeholder for image */}
          <div className="absolute inset-0 bg-secondary-900/70 z-10" />
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        </div>
      ))}
      

      {/* Slider content */}
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-all duration-1000 ${index === currentSlide
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 absolute'
              }`}
          >
            <div className="max-w-3xl">
              <h2 className="text-primary-600 text-lg md:text-xl font-bold mb-2 tracking-widest">
                {slide.subtitle}
              </h2>
              <h1 className="heading-xl text-white mb-6">
                {slide.title}
              </h1>
              <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={slide.ctaLink}
                  className="btn-primary"
                >
                  {slide.ctaText}
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-medium py-2 px-4 rounded-md transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-6 md:px-12">
          <button
            onClick={prevSlide}
            className="bg-black/30 hover:bg-primary-600 text-white p-2 rounded-full transition-colors duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'w-10 bg-primary-600'
                    : 'w-3 bg-white/50 hover:bg-white'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-black/30 hover:bg-primary-600 text-white p-2 rounded-full transition-colors duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
