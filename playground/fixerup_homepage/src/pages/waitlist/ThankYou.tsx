import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-checkbox-circle-fill text-green-500 text-5xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Signing Up!
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We've received your information and will be in touch soon. Keep an
            eye on your inbox for updates about FixerUp.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <i className="ri-home-line mr-2"></i>
            Back to Homepage
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
