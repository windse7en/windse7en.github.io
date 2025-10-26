
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="text-3xl font-bold" style={{ fontFamily: '"Lobster", cursive' }}>
              <span className="text-yellow-400">FixerUp</span>
            </div>
          </div>
          <p className="text-gray-400 mb-8 text-lg">
            Making home repair as easy as ordering an Uber
          </p>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 FixerUp. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
