import React from 'react';

const AboutUsSection: React.FC = () => {
    const founders = [
        {
            name: 'Wilson Li',
            role: 'CEO & Co-Founder',
            image: 'https://media.licdn.com/dms/image/v2/C5603AQFOJJ3_Uo8aLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517453882015?e=1762992000&v=beta&t=AiyJxvV0G0nJw0oG0HtnGERUwa2QMFbUyfGtrDtDZzg',
            bio: '9 years at Amazon leading cross-functional teams, turning user pain points into fast, scalable product launches.',
            linkedin: 'https://www.linkedin.com/in/wilsonli5000/',
            email: 'wilsonli@fixerup.com'
        },
        {
            name: 'Tao Zhang',
            role: 'CTO & Co-Founder',
            image: 'https://media.licdn.com/dms/image/v2/C5603AQHQTlalMzDF5w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1581106236362?e=1762992000&v=beta&t=YPfZZukqNpXIxr3i3Xt7OwlcIQrmusGuJ4Xf_6EmzgY',
            bio: '10 years at Microsoft and Meta building scalable backend systems and AI-powered solutions.',
            linkedin: 'https://www.linkedin.com/in/tao-zhang-ab0b6956/',
            email: 'tao@fixerup.com',
        },
        {
            name: 'Leo Zhao',
            role: 'COO & Co-Founder',
            image: '',
            bio: '10+ construction experience, building several successful businesses entrepreneur.',
            linkedin: '',
            email: 'leo@fixerup.com'
        }
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        About Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're on a mission to revolutionize home repair by making it as simple, transparent, and reliable as ordering a ride.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
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
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Meet Our Founders
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {founders.map((founder, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                                    <a
                                        href={founder.linkedin}
                                        className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                                    >
                                        <i className="ri-linkedin-box-fill text-2xl mr-2"></i>
                                    </a>
                                    <a href={`mailto:${founder.email}`} className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                                        <i className="ri-mail-line text-2xl mr-2"></i>
                                    </a>
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

