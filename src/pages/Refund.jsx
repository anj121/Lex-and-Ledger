import React, { useState } from 'react'
import { Shield, User, FileText, Lock, ChevronRight, Calendar, MapPin, CheckCircle, CreditCard, AlertTriangle, RefreshCw, XCircle, Scale, Gavel, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function RefundPolicy() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', title: 'General Principles', icon: Shield },
    { id: 'eligibility', title: 'Refund Eligibility', icon: CheckCircle },
    { id: 'non-refundable', title: 'Non-Refundable Scenarios', icon: XCircle },
    { id: 'cancellation', title: 'Cancellation Process', icon: RefreshCw },
    { id: 'refund-process', title: 'Refund Process', icon: CreditCard },
    { id: 'dispute', title: 'Dispute Resolution', icon: Scale },
    { id: 'company-rights', title: 'Company Rights', icon: Gavel },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'penalties', title: 'Penalties', icon: Lock },
    { id: 'contact', title: 'Contact Information', icon: Phone }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (

    <div className="max-w-7xl mx-auto py-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Content sections */}
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <RefreshCw className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Refund and Cancellation Policy</h1>
          </div>
          <p className="text-blue-100 mb-6 text-lg">
            Effective Date: DD/MM/YYYY
          </p>
          <p className="text-blue-50 leading-relaxed">
            This policy applies to all transactions on the Lex & Ledger platform. We are committed to 
            providing clear guidelines for refunds and cancellations to ensure transparency and fairness 
            for all our users.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center space-x-2 bg-blue-500/30 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Effective Immediately</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/30 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Governed by Indian Law</span>
            </div>
          </div>
        </div>

        {/* General Principles Section */}
        <section id="general" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">1. General Principles</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Scope</h4>
                <p className="text-sm text-gray-600">This policy applies to all transactions on the Lex & Ledger platform ("Platform").</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Non-Refundable Fees</h4>
                <p className="text-sm text-gray-600">Certain fees (e.g., registration, administrative charges) are non-refundable unless explicitly stated.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Discretionary Refunds</h4>
                <p className="text-sm text-gray-600">Refunds are evaluated case-by-case at the sole discretion of Lex & Ledger.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Eligibility Section */}
        <section id="eligibility" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">2. Refund Eligibility</h2>
          </div>

          {/* For Clients */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.1 For Clients</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Service Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Refund Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Pay-Per-Project</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Refund issued only if the Expert fails to deliver services and a replacement is not provided within 7 business days.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Subscription Plans</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Pro-rated refund for unused days if cancelled within 3 days of purchase.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Retainer Packages</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Refund for unused hours, minus a 10% administrative fee.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Matching Fee</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Non-refundable once an Expert is assigned.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* For Experts */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.2 For Experts</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Fee Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Refund Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Platform Fees</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Non-refundable unless the Platform fails to provide agreed services (e.g., Client lead generation).</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Commissions</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Non-refundable after a project is confirmed.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Subscription Tiers</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">No refunds for mid-term cancellations or downgrades.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Non-Refundable Scenarios Section */}
        <section id="non-refundable" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">3. Non-Refundable Scenarios</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Refunds will not be issued for:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Client-Initiated Cancellations</h4>
                  <p className="text-sm text-gray-600">After work has commenced.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Force Majeure</h4>
                  <p className="text-sm text-gray-600">Delays/cancellations due to unforeseen events (e.g., natural disasters, cyberattacks).</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Breach of Terms</h4>
                  <p className="text-sm text-gray-600">Fraud, misuse, or violation of Platform rules.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <User className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Dissatisfaction with Services</h4>
                  <p className="text-sm text-gray-600">Subjective dissatisfaction not attributable to Expert non-performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Process Section */}
        <section id="cancellation" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">4. Cancellation Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Clients */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4.1 For Clients</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Request Cancellation</h4>
                    <p className="text-sm text-gray-600">Notify via email to [support@lexledger.com] within 24 hours of project confirmation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Penalty</h4>
                    <p className="text-sm text-gray-600">Cancellations after 24 hours incur a 15% cancellation fee.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Experts */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4.2 For Experts</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Project Cancellation</h4>
                    <p className="text-sm text-gray-600">Experts must notify the Platform 48 hours before a scheduled consultation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Penalty</h4>
                    <p className="text-sm text-gray-600">Repeated cancellations may result in account suspension or tier downgrades.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Process Section */}
        <section id="refund-process" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">5. Refund Process</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Submit Request</h4>
                <p className="text-gray-700 mb-3">Email [refunds@lexledger.com] within 7 days of the issue. Include:</p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Transaction ID</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Detailed reason for the refund</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Supporting evidence (e.g., screenshots, communication logs)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Review</h4>
                <p className="text-gray-700">Lex & Ledger will respond within 15 business days.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Approved Refunds</h4>
                <p className="text-gray-700">Processed via the original payment method within 10 business days.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dispute Resolution Section */}
        <section id="dispute" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">6. Dispute Resolution</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Scale className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Mediation</h4>
                <p className="text-sm text-gray-600">Parties must attempt amicable resolution within 30 days.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <Gavel className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Arbitration</h4>
                <p className="text-sm text-gray-600">Unresolved disputes will be settled via arbitration in Kanpur, Uttar Pradesh, India, under the Arbitration and Conciliation Act, 1996.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Jurisdiction</h4>
                <p className="text-sm text-gray-600">Courts in Kanpur, Uttar Pradesh, India, will have exclusive jurisdiction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Rights Section */}
        <section id="company-rights" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Gavel className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">7. Company Rights</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Pricing Control</h4>
                <p className="text-sm text-gray-600">Lex & Ledger reserves the right to adjust fees, commissions, or Client allocation unilaterally.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Termination</h4>
                <p className="text-sm text-gray-600">Accounts may be terminated for breaches (e.g., fraud, non-payment).</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <FileText className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Policy Amendments</h4>
                <p className="text-sm text-gray-600">Terms may be revised with 30 days' notice; continued use implies acceptance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability Section */}
        <section id="liability" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">8. Limitation of Liability</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Cap on Liability</h4>
                <p className="text-sm text-gray-600">Lex & Ledger's liability is limited to the total fees paid for the disputed service.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Indirect Losses</h4>
                <p className="text-sm text-gray-600">Not liable for consequential damages (e.g., lost profits, reputational harm).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Penalties Section */}
        <section id="penalties" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">9. Penalties</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Non-Solicitation</h4>
                <p className="text-sm text-gray-600">Experts bypassing the Platform to transact directly with Clients incur a 500 times penalty of lost Platform fees.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Fraudulent Claims</h4>
                <p className="text-sm text-gray-600">False refund requests may lead to legal action under the Indian Penal Code, 1860.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section id="contact" className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">10. Contact Information</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            For refund/cancellation requests or disputes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">General Support</h3>
              <p className="text-gray-600 text-sm">Email: [support@lexledger.com]</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Grievance Officer</h3>
              <p className="text-gray-600 text-sm">[Name, Email, Address as per IT Act, 2000]</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RefundPolicy

