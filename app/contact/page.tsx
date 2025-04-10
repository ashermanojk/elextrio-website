import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import MapSection from '@/components/contact/MapSection';

export const metadata = {
  title: 'Contact Us - Elextrio Automation | Get in Touch',
  description: 'Contact Elextrio Automation for industrial automation solutions. Reach out for inquiries, support, or to discuss your automation needs.',
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              Reach out to our team for expert advice on industrial automation solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </main>
  );
}
