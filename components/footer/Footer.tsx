'use client';

import React from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Elextrio Automation</h3>
            <p className="text-gray-300 mb-6">
              Empowering industries with innovative automation solutions that drive efficiency, precision, and growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/plc-programming" className="text-gray-300 hover:text-white transition-colors">
                  PLC Programming
                </Link>
              </li>
              <li>
                <Link href="/services/scada-systems" className="text-gray-300 hover:text-white transition-colors">
                  SCADA Systems
                </Link>
              </li>
              <li>
                <Link href="/services/hmi-development" className="text-gray-300 hover:text-white transition-colors">
                  HMI Development
                </Link>
              </li>
              <li>
                <Link href="/services/industrial-iot" className="text-gray-300 hover:text-white transition-colors">
                  Industrial IoT
                </Link>
              </li>
              <li>
                <Link href="/services/process-automation" className="text-gray-300 hover:text-white transition-colors">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="/services/electrical-engineering" className="text-gray-300 hover:text-white transition-colors">
                  Electrical Engineering
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-primary-500 mt-1 mr-3">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-gray-300">
                  123 Automation Plaza<br />
                  Industrial Area, Phase 2<br />
                  Bangalore, Karnataka 560100
                </span>
              </li>
              <li className="flex items-center">
                <div className="text-primary-500 mr-3">
                  <FaPhone />
                </div>
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <div className="text-primary-500 mr-3">
                  <FaEnvelope />
                </div>
                <a href="mailto:info@elextrioautomation.com" className="text-gray-300 hover:text-white transition-colors">
                  info@elextrioautomation.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-300">Get the latest updates on industry trends and company news.</p>
            </div>
            <div className="lg:col-span-2">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
                <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Elextrio Automation. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
