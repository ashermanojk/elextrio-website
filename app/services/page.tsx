import Link from 'next/link';
import Image from 'next/image';

// Import service components
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetails from '@/components/services/ServiceDetails';
import ProcessSection from '@/components/services/ProcessSection';
import IndustriesSection from '@/components/services/IndustriesSection';
import ServiceFAQ from '@/components/services/ServiceFAQ';

export const metadata = {
  title: 'Services - Elextrio Automation | Industrial Automation Solutions',
  description: 'Explore our comprehensive range of industrial automation services including process automation, control systems, special purpose machinery, and turnkey solutions.',
};

export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServiceDetails />
      <ProcessSection />
      <IndustriesSection />
      <ServiceFAQ />
      
      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-secondary-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 text-white">
                <h2 className="heading-lg mb-6">Ready to Transform Your Operations?</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Contact us today to discuss your specific requirements and discover how our automation solutions can drive efficiency, quality, and growth for your business.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    Request a Consultation
                  </Link>
                  <Link 
                    href="/projects" 
                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    View Our Projects
                  </Link>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto bg-gray-800">
                {/* Placeholder for image - replace with actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">Service Image</span>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-primary-600 opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-primary-600 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
