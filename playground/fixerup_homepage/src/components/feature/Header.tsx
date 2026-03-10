
import React from 'react';
import logo from '../../assets/fixerup-icon.png';

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="FixerUp Logo"
              className="h-10 w-10 mr-3"
            />
            <div className="text-2xl font-bold" style={{ fontFamily: '"Lobster", serif' }}>
              <span className="text-yellow-400">FixerUp</span>
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="px-4 py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              Join Beta
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Contact Us
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
