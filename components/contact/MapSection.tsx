'use client';

import React from 'react';

export default function MapSection() {
  return (
    <section className="h-[450px] relative">
      {/* Replace the iframe src with your actual Google Maps embed URL */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9932544762276!2d77.64554851482253!3d12.970625890855757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1686b941538f%3A0x4a0c3df3df13f81a!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1617714939573!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Elextrio Automation Office Location"
      ></iframe>
      
      <div className="absolute top-4 left-4 bg-white p-4 shadow-md rounded-md max-w-xs">
        <h4 className="font-bold text-secondary-900 mb-2">Elextrio Automation</h4>
        <p className="text-sm text-gray-600">
          123 Automation Plaza<br />
          Industrial Area, Phase 2<br />
          Bangalore, Karnataka 560100
        </p>
        <a 
          href="https://goo.gl/maps/YourActualLink" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 text-sm font-medium mt-2 inline-block hover:text-primary-800"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
