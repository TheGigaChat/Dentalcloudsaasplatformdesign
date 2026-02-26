import { Link } from 'react-router';
import { Check, X, Activity } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for small practices getting started',
      features: [
        { text: 'Up to 50 patients', included: true },
        { text: 'Basic scheduling', included: true },
        { text: 'Email support', included: true },
        { text: '1 treatment room', included: true },
        { text: 'Basic reports', included: true },
        { text: 'Insurance integration', included: false },
        { text: 'Advanced analytics', included: false },
        { text: 'Multi-location', included: false },
        { text: 'API access', included: false },
      ],
    },
    {
      name: 'Standard',
      price: '$99',
      description: 'Ideal for growing dental practices',
      popular: true,
      features: [
        { text: 'Up to 500 patients', included: true },
        { text: 'Advanced scheduling', included: true },
        { text: 'Priority support', included: true },
        { text: 'Up to 5 treatment rooms', included: true },
        { text: 'Advanced reports', included: true },
        { text: 'Insurance integration', included: true },
        { text: 'Treatment plan templates', included: true },
        { text: 'Multi-location', included: false },
        { text: 'API access', included: false },
      ],
    },
    {
      name: 'Premium',
      price: '$299',
      description: 'For large practices and multi-location clinics',
      features: [
        { text: 'Unlimited patients', included: true },
        { text: 'Advanced scheduling with AI', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Unlimited treatment rooms', included: true },
        { text: 'Custom reports & analytics', included: true },
        { text: 'Insurance integration', included: true },
        { text: 'Treatment plan templates', included: true },
        { text: 'Multi-location support', included: true },
        { text: 'Full API access', included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">DentalCloud</span>
          </Link>
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

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose the perfect plan for your dental practice. All plans include a 14-day free trial.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 border-2 ${
                plan.popular ? 'border-primary shadow-xl' : 'border-gray-200'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500">Billed monthly or annually</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center px-6 py-3 rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-blue-600'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Detailed Feature Comparison
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Free</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Standard</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Patients', free: '50', standard: '500', premium: 'Unlimited' },
                  { name: 'Treatment Rooms', free: '1', standard: '5', premium: 'Unlimited' },
                  { name: 'Users', free: '2', standard: '10', premium: 'Unlimited' },
                  { name: 'Storage', free: '1 GB', standard: '50 GB', premium: '500 GB' },
                  { name: 'Insurance Integration', free: false, standard: true, premium: true },
                  { name: 'Advanced Reports', free: false, standard: true, premium: true },
                  { name: 'API Access', free: false, standard: false, premium: true },
                  { name: 'Multi-location', free: false, standard: false, premium: true },
                  { name: 'Custom Branding', free: false, standard: false, premium: true },
                  { name: 'Priority Support', free: false, standard: true, premium: true },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.free}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.standard}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: 'Can I switch plans at any time?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, debit cards, and ACH transfers for annual plans.',
            },
            {
              q: 'Is there a setup fee?',
              a: 'No setup fees. You only pay for your monthly or annual subscription.',
            },
            {
              q: 'Can I cancel my subscription?',
              a: 'Yes, you can cancel anytime. Your data will be available for 30 days after cancellation for export.',
            },
            {
              q: 'Do you offer discounts for annual billing?',
              a: 'Yes! Save 20% when you choose annual billing on any plan.',
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of dental practices already using DentalCloud
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 font-semibold"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          © 2026 DentalCloud. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
