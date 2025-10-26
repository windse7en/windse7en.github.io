
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(251, 191, 36, 0.7) 50%, rgba(255, 255, 255, 0.1) 100%), url('https://readdy.ai/api/search-image?query=Modern%20home%20renovation%20and%20repair%20scene%20with%20professional%20contractors%20working%20efficiently%20on%20a%20beautiful%20residential%20property%2C%20bright%20and%20clean%20background%20with%20construction%20tools%20and%20equipment%2C%20professional%20lighting%2C%20high-quality%20photography%20style%2C%20warm%20and%20inviting%20atmosphere%2C%20showcasing%20home%20improvement%20excellence&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 via-yellow-400/70 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Home Repair as Easy as 
            <span className="text-yellow-600 block">Ordering an Uber</span>
          </h1>
          
          <p className="text-2xl text-gray-800 mb-12 leading-relaxed max-w-4xl mx-auto">
            FixerUp is an AI-powered platform that makes home improvement efficient, transparent, and reliable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
