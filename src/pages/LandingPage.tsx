import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Advanced Search',
      description: 'Find companies using powerful filters including location, industry, revenue, and business classifications.'
    },
    {
      icon: ChartBarIcon,
      title: 'Business Analytics',
      description: 'Access comprehensive business data and analytics to make informed decisions about potential partners or competitors.'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Company Profiles',
      description: 'Detailed company information including contact details, business classifications, and financial data.'
    },
    {
      icon: UserGroupIcon,
      title: 'Classification System',
      description: 'Browse companies by Finnish business classifications with our intuitive categorization system.'
    }
  ];

  const benefits = [
    'Access to comprehensive Finnish business database',
    'Real-time company information and updates',
    'Advanced filtering and search capabilities',
    'Export data for further analysis',
    'Dark mode support for comfortable viewing',
    'Mobile-responsive design'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Discover Finnish 
                <span className="text-green-600 dark:text-green-400">Companies</span> 
                with Ease
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Access comprehensive business data from Finland's leading companies. Search, filter, and analyze 
                business information with our powerful data finder platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/register"
                  className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center gap-1"
                >
                  Sign In <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600 dark:text-green-400">
              Powerful Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to find the right companies
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our platform provides comprehensive tools to search, analyze, and connect with Finnish businesses 
              across all industries and sectors.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <feature.icon className="h-5 w-5 flex-none text-green-600 dark:text-green-400" aria-hidden="true" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose CompanyFinder?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Join thousands of professionals who trust our platform for their business research and development needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-x-3">
                  <CheckIcon className="h-6 w-6 flex-none text-green-600 dark:text-green-400" aria-hidden="true" />
                  <span className="text-base leading-7 text-gray-600 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 dark:bg-green-700 transition-colors duration-200">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to discover Finnish companies?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              Start exploring our comprehensive database today. Sign up for free and get instant access to 
              thousands of company profiles and business insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-white hover:text-green-100 transition-colors duration-200"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Company Information */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Creative Gorilla Ltd</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <a href="mailto:hello@creativegorilla.fi" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    hello@creativegorilla.fi
                  </a>
                </p>
                <p>
                  <a href="tel:+358400702880" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    0400 702 880
                  </a>
                </p>
                <div className="mt-3">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Address:</p>
                  <p>Askonkatu 13</p>
                  <p>15100 Lahti</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                <a
                  href="https://www.facebook.com/creativegorillaoy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/creative-gorilla-oy/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 CompanyFinder. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Empowering business discovery in Finland.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;