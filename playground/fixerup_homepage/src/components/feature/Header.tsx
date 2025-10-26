
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>
              <span className="text-yellow-600">FixerUp</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
