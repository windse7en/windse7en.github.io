import React from 'react';
import Button from '../../../components/base/Button';

const ContractorsSection: React.FC = () => {
  const benefits = [
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Higher Earnings',
      description: 'Earn more with bundled jobs and reduced commute time. Our efficiency creates better margins for everyone.',
      stat: '+40%',
      statLabel: 'Average Income Increase'
    },
    {
      icon: 'ri-route-line',
      title: 'Efficient Routing',
      description: 'Work multiple jobs in the same neighborhood. Less driving, more earning, better work-life balance.',
      stat: '60%',
      statLabel: 'Less Travel Time'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'On-Demand Jobs',
      description: 'Claim jobs like Uber drivers. Work when you want, where you want. Complete control over your schedule.',
      stat: '24/7',
      statLabel: 'Job Availability'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Guaranteed Payment',
      description: 'No more chasing payments. Get paid immediately upon job completion through our secure platform.',
      stat: '100%',
      statLabel: 'Payment Security'
    }
  ];

  return (
    <section id="contractors" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Contractors Who Want 
              <span className="text-yellow-400 block">More Efficiency</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Stop wasting time on long commutes and fragmented jobs. FixerUp's smart bundling system 
              lets you work multiple projects in the same area, maximizing your daily earnings.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 text-xl mr-3"></i>
                <span className="text-lg">Claim jobs on-demand like Uber</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 text-xl mr-3"></i>
                <span className="text-lg">Work multiple jobs per neighborhood</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 text-xl mr-3"></i>
                <span className="text-lg">Guaranteed payment upon completion</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 text-xl mr-3"></i>
                <span className="text-lg">No customer acquisition costs</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                <i className="ri-user-add-line mr-2"></i>
                Join as Contractor
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <i className="ri-download-line mr-2"></i>
                Download App
              </Button>
            </div>
          </div>
          
          {/* Right Content - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <i className={`${benefit.icon} text-yellow-400 text-xl`}></i>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{benefit.stat}</div>
                    <div className="text-xs text-gray-400">{benefit.statLabel}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="mt-20 bg-gray-800 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20contractor%20headshot%2C%20middle-aged%20man%20wearing%20work%20clothes%20and%20hard%20hat%2C%20friendly%20smile%2C%20confident%20expression%2C%20clean%20background%2C%20professional%20photography%20style&width=80&height=80&seq=contractor-testimonial&orientation=squarish"
              alt="Contractor testimonial"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="text-lg font-semibold">Mike Rodriguez</h4>
              <p className="text-gray-400">General Contractor, 15+ years</p>
            </div>
          </div>
          
          <blockquote className="text-xl text-gray-300 italic mb-4">
            "FixerUp changed my business completely. I used to drive 2 hours between jobs. 
            Now I work 4-5 projects in the same neighborhood every day. My income doubled and I get home for dinner."
          </blockquote>
          
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="ri-star-fill"></i>
              ))}
            </div>
            <span className="text-gray-400">5.0 rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractorsSection;