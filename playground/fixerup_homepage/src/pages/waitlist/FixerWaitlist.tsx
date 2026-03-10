import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { API } from '../../config/api';

const EXPERTISE_OPTIONS = [
  'Electrician',
  'Plumber',
  'HVAC Technician',
  'General Handyman',
  'Painter',
  'Carpenter',
  'Roofer',
  'Landscaper',
  'Pest Control',
  'Cleaner',
  'Appliance Repair',
  'Locksmith',
  'Mason/Concrete',
  'Flooring Specialist',
  'Window & Door Installer',
];

const SERVICE_AREAS = [
  'Seattle',
  'Bellevue',
  'Kirkland',
  'Redmond',
  'Renton',
  'Kent',
  'Bothell',
  'Woodinville',
  'Issaquah',
  'Sammamish',
  'Mercer Island',
  'Burien',
  'Tukwila',
  'Federal Way',
  'Lynnwood',
  'Edmonds',
  'Shoreline',
  'Lake Forest Park',
  'Kenmore',
  'Maple Valley',
];

const PLATFORM_OPTIONS = [
  'Thumbtack',
  'Angi',
  'HomeAdvisor',
  'TaskRabbit',
  'Yelp',
  'Nextdoor',
  'None',
];

const EXPERIENCE_OPTIONS = [
  { value: '0-2', label: '0–2 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '6-10', label: '6–10 years' },
  { value: '10+', label: '10+ years' },
];

const CONTACT_OPTIONS = [
  { value: 'call', label: 'Phone Call' },
  { value: 'text', label: 'Text Message' },
  { value: 'email', label: 'Email' },
];

const FixerWaitlist = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    expertise: [] as string[],
    other_expertise: '',
    service_areas: [] as string[],
    years_experience: '',
    other_platforms: [] as string[],
    preferred_contact: '',
    referral: '',
  });

  const toggleItem = (field: 'expertise' | 'service_areas' | 'other_platforms', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter((v) => v !== item)
        : [...(prev[field] as string[]), item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.expertise.length === 0) {
      setError('Please select at least one area of expertise.');
      return;
    }
    if (formData.service_areas.length === 0) {
      setError('Please select at least one service area.');
      return;
    }
    if (!formData.years_experience) {
      setError('Please select your years of experience.');
      return;
    }
    if (formData.other_platforms.length === 0) {
      setError('Please select at least one platform option (or "None").');
      return;
    }
    if (!formData.preferred_contact) {
      setError('Please select a preferred contact method.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(API.waitlist.fixer, {
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

  const CheckboxGroup = ({
    options,
    selected,
    field,
    columns = 2,
  }: {
    options: string[];
    selected: string[];
    field: 'expertise' | 'service_areas' | 'other_platforms';
    columns?: number;
  }) => (
    <div
      className={`grid grid-cols-1 ${columns >= 2 ? 'sm:grid-cols-2' : ''} ${columns >= 3 ? 'lg:grid-cols-3' : ''} gap-2`}
    >
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
            selected.includes(option)
              ? 'border-blue-500 bg-blue-50 text-blue-800'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleItem(field, option)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
              selected.includes(option)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}
          >
            {selected.includes(option) && (
              <i className="ri-check-line text-white text-xs"></i>
            )}
          </div>
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  );

  const RadioGroup = ({
    options,
    selected,
    name,
    onChange,
  }: {
    options: { value: string; label: string }[];
    selected: string;
    name: string;
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
            selected === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
              selected === option.value
                ? 'border-blue-500'
                : 'border-gray-300'
            }`}
          >
            {selected === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            )}
          </div>
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join FixerUp as a Contractor
            </h1>
            <p className="text-lg text-gray-600">
              Grow your business with quality leads in your neighborhood. Get
              early access to our contractor platform.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your Company LLC"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                value={formData.contact_name}
                onChange={(e) =>
                  setFormData({ ...formData, contact_name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="john@company.com"
              />
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Expertise *
              </label>
              <CheckboxGroup
                options={EXPERTISE_OPTIONS}
                selected={formData.expertise}
                field="expertise"
                columns={2}


              />
            </div>

            {/* Other Expertise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Other expertise not listed above
              </label>
              <input
                type="text"
                value={formData.other_expertise}
                onChange={(e) =>
                  setFormData({ ...formData, other_expertise: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. Solar panel installation"
              />
            </div>

            {/* Service Areas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Service Areas *
              </label>
              <CheckboxGroup
                options={SERVICE_AREAS}
                selected={formData.service_areas}
                field="service_areas"
                columns={3}


              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Years of Experience *
              </label>
              <RadioGroup
                options={EXPERIENCE_OPTIONS}
                selected={formData.years_experience}
                name="years_experience"
                onChange={(v) =>
                  setFormData({ ...formData, years_experience: v })
                }


              />
            </div>

            {/* Other Platforms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Are you currently or previously on other platforms? *
              </label>
              <CheckboxGroup
                options={PLATFORM_OPTIONS}
                selected={formData.other_platforms}
                field="other_platforms"
                columns={2}


              />
            </div>

            {/* Preferred Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Preferred Contact Method *
              </label>
              <RadioGroup
                options={CONTACT_OPTIONS}
                selected={formData.preferred_contact}
                name="preferred_contact"
                onChange={(v) =>
                  setFormData({ ...formData, preferred_contact: v })
                }


              />
            </div>

            {/* Referral */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Who referred you?
              </label>
              <input
                type="text"
                value={formData.referral}
                onChange={(e) =>
                  setFormData({ ...formData, referral: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Name or organization (optional)"
              />
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
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
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

export default FixerWaitlist;
