import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { API } from '../../config/api';

const HELP_OPTIONS = [
  'Update home lighting',
  'Install EV Charger',
  'Install smart plugs',
  'Fix a water/plumbing issue',
  'Mount or install something',
  'Paint or touch up walls',
  'Clean the home',
  'Heating or cooling service',
  'Yard or outdoor work',
  'Pest control',
];

const HomeownerWaitlist = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zip_code: '',
    help_needs: [] as string[],
    other_needs: '',
    join_beta: '',
  });

  const handleCheckbox = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      help_needs: prev.help_needs.includes(option)
        ? prev.help_needs.filter((h) => h !== option)
        : [...prev.help_needs, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.help_needs.length === 0) {
      setError('Please select at least one type of help you need.');
      return;
    }
    if (!formData.join_beta) {
      setError('Please indicate if you want to join the beta program.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(API.waitlist.homeowner, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      navigate('/waitlist/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Early Access to FixerUp for Your Home
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Be among the first to try FixerUp — a smarter, easier way to get
              trusted help for your home.
            </p>
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              <i className="ri-gift-line mr-2"></i>
              Beta testers receive a <strong className="mx-1">$50 gift card</strong> toward their first service!
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your name? *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your email? *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your ZIP code? *
              </label>
              <input
                type="text"
                required
                value={formData.zip_code}
                onChange={(e) =>
                  setFormData({ ...formData, zip_code: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="98004"
              />
            </div>

            {/* Help Needs — Checkboxes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What kind of help do you need most for your home? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HELP_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.help_needs.includes(option)
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-800'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.help_needs.includes(option)}
                      onChange={() => handleCheckbox(option)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                        formData.help_needs.includes(option)
                          ? 'border-yellow-500 bg-yellow-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.help_needs.includes(option) && (
                        <i className="ri-check-line text-white text-xs"></i>
                      )}
                    </div>
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Needs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Not on the list? Tell us more
              </label>
              <textarea
                value={formData.other_needs}
                onChange={(e) =>
                  setFormData({ ...formData, other_needs: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe what you need help with..."
              />
            </div>

            {/* Beta Program */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Would you like to join our beta program? *
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Selected beta users may receive a $50 gift card toward services.
              </p>
              <div className="space-y-2">
                {[
                  { value: 'yes', label: "Yes, I'm interested" },
                  { value: 'maybe_later', label: 'Maybe later' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.join_beta === option.value
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="join_beta"
                      value={option.value}
                      checked={formData.join_beta === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, join_beta: e.target.value })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                        formData.join_beta === option.value
                          ? 'border-yellow-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.join_beta === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                <i className="ri-error-warning-fill mr-2"></i>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-fill mr-2"></i>
                  Submit
                </>
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeownerWaitlist;
