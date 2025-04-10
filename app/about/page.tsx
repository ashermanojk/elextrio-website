import Image from 'next/image';
import Link from 'next/link';

// Components for the About page
import TeamSection from '@/components/about/TeamSection';
import History from '@/components/about/History';
import Testimonials from '@/components/about/Testimonials';

export const metadata = {
  title: 'About Us - Elextrio Automation | Industrial Automation Solutions',
  description: 'Learn about Elextrio Automation, our mission, vision, team, and our journey in delivering cutting-edge industrial automation solutions.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/about-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">About Elextrio Automation</h1>
            <p className="text-xl mb-8">
              Empowering industries with innovative automation solutions that drive efficiency, precision, and growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="btn-primary"
              >
                Get in Touch
              </Link>
              <Link
                href="#our-story"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-300"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-white" id="our-story">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-primary-600 font-bold mb-2">OUR STORY</h2>
              <h3 className="heading-lg text-secondary-900 mb-6">Pioneering Excellence in Industrial Automation</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2012, Elextrio Automation was born from a vision to revolutionize the industrial landscape through innovative automation solutions. What began as a small team of passionate engineers has evolved into a leading force in the automation industry.
                </p>
                <p>
                  Our journey has been defined by our commitment to excellence, pushing the boundaries of what's possible in industrial automation. With a client-first approach and an unwavering dedication to quality, we've successfully delivered over 200 projects across various sectors.
                </p>
                <p>
                  Today, Elextrio stands at the forefront of technological advancement, continually evolving to meet the dynamic needs of modern industries. Our multidisciplinary team combines expertise in engineering, software development, and project management to create holistic solutions that transform operations and drive business growth.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
                  <div className="text-gray-700 font-medium">Years Experience</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                  <div className="text-gray-700 font-medium">Projects Completed</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                  <div className="text-gray-700 font-medium">Industry Partners</div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              {/* Placeholder for about image */}
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Company Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Import components for other sections */}
      <History />
      <TeamSection />
      <Testimonials />
      
    </main>
  );
}
