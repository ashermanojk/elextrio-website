'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the dropdown menu items based on information provided
const navItems = [
  {
    title: 'Home',
    path: '/',
    dropdown: false
  },
  {
    title: 'About',
    path: '/about',
    dropdown: true,
    dropdownItems: [
      { title: 'Mission & Vision', path: '/about#mission-vision' },
      { title: 'Company Values', path: '/about#values' },
      { title: 'Who We Are', path: '/about#who-we-are' },
      { title: 'Strategic Imperatives', path: '/about#strategic-imperatives' }
    ]
  },
  {
    title: 'Services',
    path: '/services',
    dropdown: true,
    dropdownItems: [
      { title: 'Industrial Automation', path: '/services/industrial-automation' },
      { title: 'Special Purpose Machinery', path: '/services/special-purpose-machinery' },
      { title: 'Turnkey Projects', path: '/services/turnkey-projects' },
      { title: 'Product Development', path: '/services/product-development' },
      { title: 'Contract Manufacturing', path: '/services/contract-manufacturing' }
    ]
  },
  {
    title: 'Projects',
    path: '/projects',
    dropdown: true,
    dropdownItems: [
      { title: 'Featured Projects', path: '/projects#featured' },
      { title: 'Case Studies', path: '/projects#case-studies' },
      { title: 'Success Stories', path: '/projects#success-stories' }
    ]
  },
  {
    title: 'Careers',
    path: '/careers',
    dropdown: false
  },
  {
    title: 'Contact',
    path: '/contact',
    dropdown: false
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            {/* Replace with actual logo */}
            <div className="flex items-center">
              <div className="text-primary-600 font-bold text-2xl">ELEXTRIO</div>
              <div className="text-secondary-900 font-medium text-sm ml-1">AUTOMATION</div>
            </div>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link 
                href={item.path}
                className={`font-medium text-secondary-900 hover:text-primary-600 py-2 transition-colors group-hover:text-primary-600 ${
                  item.dropdown ? 'pr-6' : ''
                }`}
              >
                {item.title}
                {item.dropdown && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 inline-block ml-1 transition-transform duration-300 group-hover:rotate-180" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              
              {/* Dropdown Menu */}
              {item.dropdown && (
                <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-1">
                  <div className="py-3"></div>
                  <div className="bg-white rounded-md shadow-lg overflow-hidden border-t-2 border-primary-600">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.title}
                        href={dropdownItem.path}
                        className="block px-4 py-3 text-sm text-secondary-900 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Get Quote Button */}
        <Link 
          href="/contact" 
          className="hidden lg:block btn-primary"
        >
          Get a Quote
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-secondary-900" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container-custom py-4 space-y-2 bg-white">
          {navItems.map((item) => (
            <div key={item.title} className="py-2">
              <Link 
                href={item.path}
                className="block font-medium text-secondary-900 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
              
              {/* Mobile Dropdown Items */}
              {item.dropdown && (
                <div className="pl-4 mt-2 space-y-2">
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.title}
                      href={dropdownItem.path}
                      className="block text-sm text-gray-600 hover:text-primary-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <Link 
            href="/contact" 
            className="block w-full btn-primary text-center mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
