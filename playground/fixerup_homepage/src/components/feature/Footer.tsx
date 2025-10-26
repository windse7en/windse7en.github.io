
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
            <span className="text-yellow-400">FixerUp</span>
          </div>
          <p className="text-gray-400 mb-8 text-lg">
            Making home repair as easy as ordering an Uber
          </p>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 FixerUp. All rights reserved.
              </p>
              <a 
                href="https://readdy.ai/?origin=logo" 
                className="text-gray-400 hover:text-white text-sm mt-2 sm:mt-0"
              >
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
