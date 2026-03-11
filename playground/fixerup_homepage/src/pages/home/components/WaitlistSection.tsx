const WaitlistSection = () => {
  const navigate = useNavigate();

  return (
    <section id="waitlist" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 70% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="ri-rocket-2-line mr-2"></i>
            Now in Beta
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Join the FixerUp Revolution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be among the first to experience a smarter way to handle home
            repair. Sign up now and enjoy exclusive early access benefits.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Homeowners Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
              <i className="ri-home-smile-line text-yellow-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              For Homeowners
            </h3>
            <p className="text-gray-600 text-lg mb-4">
              Get matched with trusted local pros. Experience AI-powered quotes
              and transparent pricing for your home repair needs.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-6">
              <p className="text-yellow-800 font-semibold text-sm flex items-center">
                <i className="ri-gift-line mr-2 text-lg"></i>
                Beta testers receive a $50 gift card toward their first service!
              </p>
            </div>
            <button
              onClick={() => navigate('/waitlist/homeowner')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <i className="ri-arrow-right-line mr-2"></i>
              Join as Homeowner
            </button>
          </div>

          {/* Contractors Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <i className="ri-hammer-line text-blue-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              For Contractors
            </h3>
            <p className="text-gray-600 text-lg mb-4">
              Grow your business with quality leads in your neighborhood. Get
              early access to our contractor platform and connect with
              homeowners.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6">
              <p className="text-blue-800 font-semibold text-sm flex items-center">
                <i className="ri-vip-crown-line mr-2 text-lg"></i>
                Early contractors get priority listing and reduced fees!
              </p>
            </div>
            <button
              onClick={() => navigate('/waitlist/fixer')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <i className="ri-arrow-right-line mr-2"></i>
              Join as Contractor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
