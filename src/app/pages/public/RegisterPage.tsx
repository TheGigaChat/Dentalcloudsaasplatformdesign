import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Activity, Check } from 'lucide-react';

interface RegisterPageProps {
  onRegister: () => void;
}

export default function RegisterPage({ onRegister }: RegisterPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companySlug: '',
    country: 'USA',
    plan: 'Standard',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
    // Simulate registration and redirect to tenant dashboard
    navigate(`/${formData.companySlug || 'acme'}/dashboard`);
  };

  const handleSlugChange = (companyName: string) => {
    const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    setFormData({ ...formData, companyName, companySlug: slug });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">DentalCloud</span>
          </Link>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Start your 14-day free trial today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm mb-2 text-gray-700">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Acme Dental Clinic"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="companySlug" className="block text-sm mb-2 text-gray-700">
                      Company URL
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">dentalcloud.com/</span>
                      <input
                        id="companySlug"
                        type="text"
                        value={formData.companySlug}
                        onChange={(e) => setFormData({ ...formData, companySlug: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="acme"
                        pattern="[a-z0-9]+"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Only lowercase letters and numbers allowed
                    </p>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm mb-2 text-gray-700">
                      Country
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Estonia">Estonia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subscription Plan */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Plan</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: 'Free', price: '$0', features: ['50 patients', 'Basic features', 'Email support'] },
                    { name: 'Standard', price: '$99', features: ['500 patients', 'All features', 'Priority support'] },
                    { name: 'Premium', price: '$299', features: ['Unlimited', 'Advanced features', '24/7 support'] },
                  ].map((plan) => (
                    <button
                      key={plan.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, plan: plan.name })}
                      className={`p-4 rounded-lg border-2 text-left ${
                        formData.plan === plan.name
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        {formData.plan === plan.name && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{plan.price}</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  All plans include a 14-day free trial. No credit card required.
                </p>
              </div>

              {/* Admin User Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin User (Owner)</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="adminName" className="block text-sm mb-2 text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="adminName"
                      type="text"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Dr. Sarah Mitchell"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="adminEmail" className="block text-sm mb-2 text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="sarah@acmedental.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="adminPassword" className="block text-sm mb-2 text-gray-700">
                      Password
                    </label>
                    <input
                      id="adminPassword"
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Create a strong password"
                      minLength={8}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">At least 8 characters</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-blue-600 font-medium text-lg"
              >
                Create Account & Start Trial
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            By creating an account, you agree to our{' '}
            <a href="#terms" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
