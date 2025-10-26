import React from 'react';
import Button from '../../../components/base/Button';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Homeowners',
      price: 'Free',
      description: 'Get instant quotes and quality guaranteed repairs',
      features: [
        'AI-powered instant quotes',
        'Neighborhood group matching',
        'Quality guarantee protection',
        'Secure payment processing',
        '24/7 customer support',
        'After-service warranty'
      ],
      cta: 'Get Started Free',
      popular: false,
      icon: 'ri-home-line'
    },
    {
      name: 'Contractors',
      price: '15%',
      priceNote: 'commission per job',
      description: 'Join our network and increase your earnings',
      features: [
        'On-demand job claiming',
        'Neighborhood job bundling',
        'Guaranteed payment system',
        'No customer acquisition costs',
        'Mobile contractor app',
        'Performance analytics'
      ],
      cta: 'Join Network',
      popular: true,
      icon: 'ri-hammer-line'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For property management and large-scale operations',
      features: [
        'Bulk project management',
        'Custom pricing models',
        'Dedicated account manager',
        'API integration',
        'Advanced reporting',
        'Priority contractor network'
      ],
      cta: 'Contact Sales',
      popular: false,
      icon: 'ri-building-line'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. We only succeed when you do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                plan.popular ? 'ring-2 ring-yellow-400 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <i className={`${plan.icon} text-yellow-600 text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-gray-600 text-sm ml-2">{plan.priceNote}</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How Our Pricing Creates Value
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-blue-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bundling Efficiency</h4>
                <p className="text-gray-600 text-sm">
                  Group orders reduce costs for homeowners and increase earnings for contractors
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-green-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
                <p className="text-gray-600 text-sm">
                  Our guarantee and payment protection justify the platform fee
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-robot-line text-purple-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Technology</h4>
                <p className="text-gray-600 text-sm">
                  Advanced matching and pricing algorithms create market efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;