import Link from 'next/link';
import Image from 'next/image';

// Import project components
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectCategories from '@/components/projects/ProjectCategories';
import CaseStudies from '@/components/projects/CaseStudies';
import TestimonialSlider from '@/components/projects/TestimonialSlider';

export const metadata = {
  title: 'Projects - Elextrio Automation | Industrial Automation Solutions',
  description: 'Explore our successful automation projects across various industries including manufacturing, pharmaceutical, food & beverage, and more.',
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectCategories />
      <ProjectGrid />
      <CaseStudies />
      <TestimonialSlider />
      
      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 text-white">
                <h2 className="heading-lg mb-6">Ready to Start Your Project?</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Let's discuss how we can create a custom automation solution for your specific needs and help you achieve your operational goals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    Request a Consultation
                  </Link>
                  <Link 
                    href="/services" 
                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto bg-gray-800">
                {/* Placeholder for image - replace with actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">Project Image</span>
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
