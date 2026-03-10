
import React from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import AboutUsSection from './components/AboutUsSection';
import WaitlistSection from './components/WaitlistSection';
import ContactUsSection from './components/ContactUsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <AboutUsSection />
        <WaitlistSection />
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
