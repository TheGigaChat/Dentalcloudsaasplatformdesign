import { Link } from 'react-router';
import { Check, Users, Calendar, Shield, TrendingUp, Activity, Globe } from 'lucide-react';

interface HomepageProps {
  onLogin: () => void;
}

export default function Homepage({ onLogin }: HomepageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">DentalCloud</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary">Pricing</Link>
            <a href="#about" className="text-gray-700 hover:text-primary">About</a>
            <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
            <button className="flex items-center gap-2 text-gray-700 hover:text-primary">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-primary">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Powering Modern Dental Clinics Worldwide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline patient management, treatment planning, and practice operations with our comprehensive multi-tenant dental platform. Built for dentists, by dental professionals.
            </p>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Dashboard Preview</div>
                  <div className="font-semibold text-gray-900">Acme Dental Clinic</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">24</div>
                  <div className="text-sm text-gray-600">Today's Appointments</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">$67k</div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything Your Dental Practice Needs
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive features designed for modern dental clinics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Patient Management',
                description: 'Complete patient records, history, and treatment tracking in one place',
              },
              {
                icon: Calendar,
                title: 'Treatment Planning',
                description: 'Create detailed treatment plans with cost estimates and approval workflows',
              },
              {
                icon: Shield,
                title: 'Insurance Integration',
                description: 'Handle multiple insurance providers and automate claim submissions',
              },
              {
                icon: Activity,
                title: 'Multi-Tenant Architecture',
                description: 'Secure data isolation for multiple clinics on a single platform',
              },
              {
                icon: TrendingUp,
                title: 'Revenue Forecasting',
                description: 'Track financial performance and predict future revenue streams',
              },
              {
                icon: Calendar,
                title: 'Appointment Scheduling',
                description: 'Smart calendar management with automated reminders and confirmations',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Register Practice', description: 'Create your clinic account with basic information' },
              { step: '2', title: 'Configure Clinic', description: 'Set up rooms, staff, and treatment types' },
              { step: '3', title: 'Start Managing Patients', description: 'Begin scheduling appointments and managing treatments' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your practice</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '$0', features: ['Up to 50 patients', 'Basic scheduling', 'Email support'] },
              { name: 'Standard', price: '$99', features: ['Up to 500 patients', 'Advanced scheduling', 'Insurance integration', 'Priority support'], popular: true },
              { name: 'Premium', price: '$299', features: ['Unlimited patients', 'All features', 'Multi-location support', '24/7 phone support', 'Custom integrations'] },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-sm ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center px-6 py-3 rounded-lg ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-blue-600'
                      : 'border border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-primary hover:underline">
              View detailed feature comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Dental Professionals</h2>
            <p className="text-lg text-gray-600">See what our customers have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. James Wilson', clinic: 'Smile Dental Care', quote: 'DentalCloud transformed how we manage our practice. Patient satisfaction has never been higher!' },
              { name: 'Dr. Maria Garcia', clinic: 'Downtown Dentistry', quote: 'The multi-tenant architecture is perfect for our multiple locations. Highly recommend!' },
              { name: 'Dr. Robert Chen', clinic: 'Family Dental Group', quote: 'Insurance integration alone saved us hours of administrative work every week.' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.clinic}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">DentalCloud</span>
              </div>
              <p className="text-gray-400 text-sm">
                Powering modern dental clinics worldwide with innovative SaaS solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
                <li><a href="#updates" className="hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#compliance" className="hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 DentalCloud. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
