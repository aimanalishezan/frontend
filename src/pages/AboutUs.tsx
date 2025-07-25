import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-0 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Who We Are
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-green-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              And why we do our work
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Well, somehow those bananas have to be earned, but not by any means.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Sometimes we are not the right party for companies to implement things, and in these situations, we say so right away. Gorilla's ideology is that things are told directly as they are.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            We do not base our business on making individual campaigns and thereby wasting customers' money. Change is created through long-term work that combines strategy, content, technology and advertising channels.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            There are no overtaking lanes available and luck must always be earned.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            With some customers, we travel together for a long time, others just want to fix the basics and start processes and collaborate every now and then.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            However, most of our customers use us as an outsourced service, which means that we first define the company's needs and then work as part of the customer's team and lead the change.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
            Creative Gorilla's core team is three professionals who have worked in sales, marketing, and technology for the past 20 years.
          </p>
        </div>

        {/* Quote */}
        <div className="bg-green-50 dark:bg-gray-800 border-l-4 border-green-500 p-6 mb-16">
          <blockquote className="text-xl italic text-gray-700 dark:text-gray-300">
            "Gorilla's ideology is that things are told directly as they are."
          </blockquote>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            An experienced guerrilla force ready
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <img 
                  src="/src/assets/jani-niemi.jpg" 
                  alt="Jani Niemi" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Jani Niemi</h3>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">(Eerika didn't like her 😅 picture)</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Eerika Niemi</h3>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Values we believe in
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600 mr-4">01</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Straightforwardness</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Things are told as they are, without unnecessary embellishment or beating around the bush.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600 mr-4">02</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No quick wins</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Many people expect quick changes in their business. Lottery wins. We believe that all change is the result of long-term work.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600 mr-4">03</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">People first</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                At the end of the day, it's always about people. In business, marketing, sales. So let's always think about people first.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600 mr-4">04</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Acts</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We believe that things should be done. It doesn't help to plan if things are left on the drawing board.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
          >
            Get in touch with us
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutUs;