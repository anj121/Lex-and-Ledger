import React, { useState } from "react";
import {
  Shield,
  User,
  FileText,
  Lock,
  ChevronRight,
  Calendar,
  MapPin,
  CheckCircle,
  Users,
  CreditCard,
  Scale,
  AlertTriangle,
  Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("welcome");

  const sections = [
    { id: "welcome", title: "Welcome", icon: Shield },
    { id: "general", title: "General Information", icon: FileText },
    { id: "platform", title: "Platform Connects", icon: Users },
    { id: "pricing", title: "Pricing", icon: CreditCard },
    { id: "payment", title: "Payment Terms", icon: Lock },
    {
      id: "dispute-client",
      title: "Dispute Resolution (Clients)",
      icon: Scale,
    },
    { id: "liability", title: "Limitation of Liability", icon: AlertTriangle },
    { id: "termination-client", title: "Termination (Clients)", icon: Gavel },
    { id: "experts", title: "Terms for Experts", icon: User },
    { id: "expert-fees", title: "Expert Fees & Payment", icon: CreditCard },
    { id: "non-solicitation", title: "Non-Solicitation", icon: Shield },
    {
      id: "dispute-expert",
      title: "Dispute Resolution (Experts)",
      icon: Scale,
    },
    { id: "termination-expert", title: "Termination (Experts)", icon: Gavel },
  ];

  const scrollToSection = (sectionId) => {
  setActiveSection(sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -80; 
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Scale className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">Contents</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Navigate through our terms and conditions
              </p>

              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Terms and Conditions</h1>
              </div>
              <p className="text-blue-100 mb-6 text-lg">
                Please read these Terms and Conditions carefully before using
                this site
              </p>
              <p className="text-blue-50 leading-relaxed">
                Welcome to Lex & Ledger! These terms govern your use of our
                platform and services. By using our platform, you agree to be
                bound by these terms and conditions.
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

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Welcome Section */}
              <section
                id="welcome"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    I. Welcome to Lex & Ledger!
                  </h2>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                  <p className="text-blue-800 font-medium">
                    Meeting Face to Face: Since we will not be meeting face to
                    face, it is important to set out the terms of the agreement
                    clearly in advance.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  If you have any queries about Lex & Ledger, please do not
                  hesitate to contact us. In this agreement, we have referred to
                  the Lex & Ledger service as the "service", to you as the
                  "user" and to our agreement as the "agreement".
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <p className="text-orange-800">
                    <strong>Age Requirement:</strong> If you wish to use our
                    "Common Needs" feature, you affirm that you are more than 18
                    years of age and are fully able and competent to enter into
                    the terms, conditions, obligations, affirmations,
                    representations, and warranties.
                  </p>
                </div>
              </section>

              {/* General Information Section */}
              <section
                id="general"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    II. General Information
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The content of the pages of this website is for your general
                  information and use only. It is subject to change without
                  notice.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Disclaimers</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>No warranty on accuracy or completeness</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>Use at your own risk</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>Subject to change without notice</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Important Notes
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>30 days notice for modifications</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Governed by Indian law</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Force majeure protection</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Copyright Notice:</strong> This website contains
                    material that is owned by or licensed to us. Reproduction is
                    prohibited other than in accordance with the copyright
                    notice.
                  </p>
                </div>
              </section>

              {/* Platform Connects Section */}
              <section
                id="platform"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    III. Platform Connects
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The Platform connects CLIENTS/USERS with Experts. Lex & Ledger
                  does not guarantee outcomes but ensures Experts meet
                  qualification criteria.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    We act as a facilitator between clients and experts,
                    ensuring quality standards while maintaining platform
                    integrity.
                  </p>
                </div>
              </section>

              {/* Pricing Section */}
              <section
                id="pricing"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    IV. Pricing
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Fee Structure
                      </h4>
                      <p className="text-sm text-gray-600">
                        CLIENTS/USERS agree to pay fees as per the Platform's
                        pricing structure (subscription, pay-per-project, or
                        retainer).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Binding Terms
                      </h4>
                      <p className="text-sm text-gray-600">
                        All fees are non-negotiable and binding once a project
                        is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Terms Section */}
              <section
                id="payment"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    V. Payment Terms
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Accepted Methods
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>UPI payments</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Net banking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Other approved methods</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Refund Policy
                    </h4>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-red-800 text-sm">
                        <strong>No refunds</strong> unless services are
                        undelivered due to Platform/Expert fault (at Lex &
                        Ledger's sole discretion).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dispute Resolution Section */}
              <section
                id="dispute-client"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-4 h-4 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    VI. Dispute Resolution
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Notification Period
                      </h4>
                      <p className="text-sm text-gray-600">
                        CLIENTS/USERS must notify Lex & Ledger within 7 days of
                        any pricing/service issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Gavel className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Arbitration
                      </h4>
                      <p className="text-sm text-gray-600">
                        Unresolved disputes will be settled via arbitration in
                        Kanpur, Uttar Pradesh, India, under the Arbitration and
                        Conciliation Act, 1996.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Jurisdiction
                      </h4>
                      <p className="text-sm text-gray-600">
                        Courts in Kanpur, Uttar Pradesh, India, will have
                        exclusive jurisdiction.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="liability"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    VII. Limitation of Liability
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Lex & Ledger is not liable for Expert advice/actions.
                      CLIENTS/USERS engage Experts at their own risk.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Platform’s liability is capped at the fees paid by the
                      Client.
                    </p>
                  </div>
                </div>
              </section>
              <section
                id="termination-client"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    VIII. Termination (Clients)
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Lex & Ledger may terminate Client access for breaches
                      (e.g., non-payment, misuse).
                    </p>
                  </div>
                </div>
              </section>
              {/* Expert Terms Section */}
              <section
                id="experts"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    IX. Terms for Experts
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Registration & Obligations
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Experts must provide valid credentials (e.g.,
                      certifications, PAN) and agree to the Platform's pricing
                      structure.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Non-Solicitation Policy
                    </h4>
                    <p className="text-yellow-700 text-sm">
                      Experts may not bypass the Platform to transact directly
                      with CLIENTS/USERS sourced via Lex & Ledger. Violations
                      incur penalties (e.g., 500 times of lost Platform fees +
                      termination).
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="expert-fees"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    X. Expert Fees & Payment
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Commission/Platform Fees
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Experts agree to pay fees as per their selected revenue
                      model (Track A/B).
                    </p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Pricing Control
                    </h4>
                    <p className="text-yellow-700 text-sm">
                      Lex & Ledger reserves the right to:
                    </p>
                    <ul className="list-decimal ml-5">
                      <li>
                        Adjust commission rates/platform fees with 30 days’
                        notice.
                      </li>
                      <li>
                        Resolve disputes over Client allocation or pricing
                        unilaterally.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section
                id="non-solicitation"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    XI. Non-Solicitation
                  </h2>
                </div>

                <div className="space-y-6">
                  <ul className="list-decimal ml-6">
                    <li>
                      Experts may not bypass the Platform to transact directly
                      with CLIENTS/USERS sourced via Lex & Ledger.
                    </li>
                    <li>
                      Violations incur penalties (e.g., 500 times of lost
                      Platform fees + termination).
                    </li>
                  </ul>
                </div>
              </section>

              <section
                id="dispute-expert"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-4 h-4 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    XII. Dispute Resolution (Experts)
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Scale className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Pricing/Allocation Disputes
                      </h4>
                      <p className="text-sm text-gray-600">
                        Experts must notify Lex & Ledger within 7 days.


                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Gavel className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Arbitration
                      </h4>
                      <p className="text-sm text-gray-600">
                        Unresolved disputes will be settled via arbitration in
                        Kanpur, Uttar Pradesh, India, under the Arbitration and
                        Conciliation Act, 1996.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Jurisdiction
                      </h4>
                      <p className="text-sm text-gray-600">
                        Courts in Kanpur, Uttar Pradesh, India, will have
                        exclusive jurisdiction.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Contact Section */}
              <section
                id="contact"
                className="bg-white rounded-xl shadow-sm border p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  For any queries about these Terms and Conditions, please
                  contact us:
                </p>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Lex & Ledger
                  </h3>
                  <p className="text-gray-600">Kanpur, Uttar Pradesh, India</p>
                  <p className="text-gray-600">Email: [Contact Email]</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L&L</span>
              </div>
              <span className="font-semibold">Lex & Ledger</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Lex & Ledger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsAndConditions;
