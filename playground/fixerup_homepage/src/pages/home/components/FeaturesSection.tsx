import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'ri-robot-line',
      title: 'AI-Powered Instant Quoting',
      description: 'Get transparent, itemized quotes in seconds. Our AI explains exactly why your project costs what it does.',
      image: 'https://readdy.ai/api/search-image?query=Modern%20AI%20interface%20showing%20detailed%20home%20repair%20cost%20breakdown%20and%20itemized%20quote%20on%20a%20sleek%20digital%20screen%2C%20professional%20technology%20visualization%2C%20clean%20white%20background%2C%20high-tech%20aesthetic%2C%20transparent%20pricing%20display&width=600&height=400&seq=ai-quote&orientation=landscape',
      benefits: ['Instant pricing', 'Transparent breakdown', 'No hidden fees', 'Accurate estimates']
    },
    {
      icon: 'ri-group-line',
      title: 'Neighborhood Group Matching',
      description: 'Smart bundling of nearby projects reduces costs and wait times. Contractors work more efficiently in your area.',
      image: 'https://readdy.ai/api/search-image?query=Aerial%20view%20of%20suburban%20neighborhood%20with%20multiple%20homes%20showing%20coordinated%20home%20repair%20projects%2C%20efficient%20contractor%20routing%20visualization%2C%20bright%20daylight%2C%20organized%20workflow%2C%20community%20improvement%20concept&width=600&height=400&seq=group-match&orientation=landscape',
      benefits: ['Lower costs', 'Faster completion', 'Local contractors', 'Efficient scheduling']
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Quality Guarantee & Protection',
      description: 'Secure payments held until completion. Full quality assurance and after-service protection for peace of mind.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20home%20repair%20quality%20inspection%20with%20satisfied%20homeowner%20and%20contractor%20shaking%20hands%2C%20completed%20renovation%20project%20in%20background%2C%20quality%20assurance%20concept%2C%20bright%20and%20clean%20setting&width=600&height=400&seq=quality-guarantee&orientation=landscape',
      benefits: ['Payment protection', 'Quality assurance', 'After-service support', 'Satisfaction guarantee']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why FixerUp is Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another lead platform. FixerUp is an AI-driven, transaction-based managed marketplace 
            that creates value through efficiency and transparency.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <i className={`${feature.icon} text-yellow-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center">
                      <i className="ri-check-line text-green-600 text-xl mr-2"></i>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">50%</div>
              <div className="text-gray-600">Cost Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <div className="text-gray-600">Faster Completion</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;