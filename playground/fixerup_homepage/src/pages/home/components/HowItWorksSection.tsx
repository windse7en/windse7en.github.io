
import React from 'react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FixerUp transforms the home repair experience with AI-powered technology and smart contractor matching
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-robot-line text-yellow-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Quotes</h3>
            <p className="text-gray-600 text-lg">
              Get instant, transparent pricing with detailed explanations for your home repair projects
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-group-line text-blue-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Matching</h3>
            <p className="text-gray-600 text-lg">
              We efficiently match projects with professionals in your area
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shield-check-line text-green-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
            <p className="text-gray-600 text-lg">
              Secure payments and quality assurance with after-service protection for peace of mind
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
