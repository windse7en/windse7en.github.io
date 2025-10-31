import React from 'react';
import taoImage from '../../../assets/tao.jpg';
import wilsonImage from '../../../assets/wilson.jpg';
import leoImage from '../../../assets/leo.jpg';

const AboutUsSection: React.FC = () => {
    const founders = [
        {
            name: 'Wilson Li',
            role: 'CEO & Co-Founder',
            image: wilsonImage,
            bio: '9 years at Amazon leading cross-functional teams, turning user pain points into fast, scalable product launches.',
            linkedin: 'https://www.linkedin.com/in/wilsonli5000/',
            email: 'wilsonli@fixerup.com'
        },
        {
            name: 'Tao Zhang',
            role: 'CTO & Co-Founder',
            image: taoImage,
            bio: '10 years at Microsoft and Meta building scalable backend systems and AI-powered solutions.',
            linkedin: 'https://www.linkedin.com/in/tao-zhang-ab0b6956/',
            email: 'tao@fixerup.com',
        },
        {
            name: 'Leo Zhao',
            role: 'COO & Co-Founder',
            image: leoImage,
            bio: '10+ construction experience, building several successful businesses entrepreneur.',
            linkedin: '',
            email: 'leo@fixerup.com'
        }
    ];

    return (
        <section
            id="about"
            className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(254, 243, 199, 0.95) 0%, rgba(253, 224, 71, 0.85) 30%, rgba(251, 191, 36, 0.75) 70%, rgba(245, 158, 11, 0.65) 100%), url('https://readdy.ai/api/search-image?query=Professional%20home%20repair%20team%20collaboration%2C%20modern%20workspace%20with%20blueprints%20and%20construction%20materials%2C%20bright%20natural%20lighting%2C%20teamwork%20and%20innovation%2C%20professional%20photography%2C%20warm%20atmosphere&width=1920&height=1080&seq=about-bg&orientation=landscape')`
            }}
        >
            {/* Animated background pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), 
                                     radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 20%, rgba(253, 224, 71, 0.2) 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                        About Us
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                        We're on a mission to revolutionize home repair by making it as simple, transparent, and reliable as ordering a ride.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-yellow-200/50">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        At FixerUp, we believe that home repair shouldn't be complicated, stressful, or unpredictable.
                        We've built an AI-powered platform that connects homeowners with trusted local contractors,
                        providing instant quotes, transparent pricing, and quality-guaranteed service.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        By leveraging cutting-edge technology and community-driven insights, we're transforming
                        the home services industry one repair at a time.
                    </p>
                </div>

                {/* Founders Grid */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 drop-shadow-sm">
                        Meet Our Founders
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {founders.map((founder, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-yellow-100/50"
                            >
                                <div className="aspect-square overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                        {founder.name}
                                    </h4>
                                    <p className="text-yellow-600 font-semibold mb-4">
                                        {founder.role}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {founder.bio}
                                    </p>
                                    <div className="flex gap-2">
                                        <a
                                            href={founder.linkedin}
                                            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors hover:scale-110 transform"
                                        >
                                            <i className="ri-linkedin-box-fill text-2xl mr-2"></i>
                                        </a>
                                        <a
                                            href={`mailto:${founder.email}`}
                                            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors hover:scale-110 transform"
                                        >
                                            <i className="ri-mail-line text-2xl mr-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;

