import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCheckCircle,
  faStar,
  faClock,
  faUsers,
  faShield,
  faArrowRight,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faAward,
  faRocket,
  faBuilding,
  faFileText,
  faCalculator,
  faGavel,
  faGlobe,
  faBookOpen,
  faZap
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useNavigate } from 'react-router-dom';

const BundlePage = () => {
  const navigate = useNavigate();
  
  const bundles = [
    {
      id: 1,
      name: "Startup Essentials Bundle",
      price: "₹35,000",
      originalPrice: "₹45,000",
      savings: "₹10,000",
      duration: "15-20 days",
      popular: true,
      icon: faRocket,
      color: "from-blue-500 to-purple-600",
      description: "Everything you need to start your business legally and compliantly",
      features: [
        "Company Formation & Registration",
        "GST Registration",
        "PAN & TAN Registration",
        "Digital Signature Certificate (DSC)",
        "Director Identification Number (DIN)",
        "Basic Legal Documentation",
        "Tax Planning Consultation",
        "Compliance Calendar Setup"
      ],
      includes: [
        "Complete incorporation process",
        "All government registrations",
        "Basic tax setup",
        "Legal document templates",
        "3 months compliance support"
      ]
    },
    {
      id: 2,
      name: "Growth Business Bundle",
      price: "₹65,000",
      originalPrice: "₹85,000",
      savings: "₹20,000",
      duration: "20-25 days",
      popular: false,
      icon: faBuilding,
      color: "from-green-500 to-emerald-600",
      description: "Comprehensive solution for growing businesses with advanced compliance needs",
      features: [
        "All Startup Essentials features",
        "MSME/Udyam Registration",
        "Trademark Registration",
        "Advanced Tax Planning",
        "Corporate Governance Setup",
        "Employment Law Compliance",
        "Contract Templates & Review",
        "Monthly Compliance Support"
      ],
      includes: [
        "Everything in Startup Essentials",
        "IP protection services",
        "Advanced legal documentation",
        "Employment contracts",
        "6 months ongoing support"
      ]
    },
    {
      id: 3,
      name: "Enterprise Complete Bundle",
      price: "₹1,25,000",
      originalPrice: "₹1,65,000",
      savings: "₹40,000",
      duration: "30-45 days",
      popular: false,
      icon: faAward,
      color: "from-purple-500 to-pink-600",
      description: "Full-service package for established businesses and enterprises",
      features: [
        "All Growth Business features",
        "M&A Documentation Support",
        "Advanced Corporate Restructuring",
        "International Trade Setup (IEC)",
        "Foreign Investment Compliance",
        "Litigation Support",
        "Dedicated Account Manager",
        "24/7 Legal Helpline"
      ],
      includes: [
        "Everything in Growth Business",
        "International compliance",
        "M&A support",
        "Dedicated relationship manager",
        "12 months premium support"
      ]
    },
    {
      id: 4,
      name: "Tax Compliance Bundle",
      price: "₹25,000",
      originalPrice: "₹35,000",
      savings: "₹10,000",
      duration: "10-15 days",
      popular: false,
      icon: faCalculator,
      color: "from-orange-500 to-red-600",
      description: "Comprehensive tax compliance and planning services",
      features: [
        "Income Tax Return Filing",
        "GST Registration & Filing",
        "TDS/TCS Compliance",
        "Tax Planning & Advisory",
        "Tax Assessment Support",
        "Refund Processing",
        "Annual Tax Health Check",
        "Quarterly Tax Reviews"
      ],
      includes: [
        "All tax registrations",
        "Monthly GST filing",
        "Annual ITR filing",
        "Tax planning sessions",
        "Ongoing tax support"
      ]
    },
    {
      id: 5,
      name: "Legal Protection Bundle",
      price: "₹45,000",
      originalPrice: "₹60,000",
      savings: "₹15,000",
      duration: "15-20 days",
      popular: false,
      icon: faGavel,
      color: "from-indigo-500 to-blue-600",
      description: "Complete legal protection and documentation for your business",
      features: [
        "Contract Drafting & Review",
        "Intellectual Property Registration",
        "Employment Law Documentation",
        "Privacy Policy & Terms",
        "Dispute Resolution Support",
        "Legal Risk Assessment",
        "Compliance Audit",
        "Legal Advisory Sessions"
      ],
      includes: [
        "Custom contract templates",
        "IP registration services",
        "Legal document review",
        "Risk assessment report",
        "Ongoing legal consultation"
      ]
    },
    {
      id: 6,
      name: "Quick Start Bundle",
      price: "₹15,000",
      originalPrice: "₹22,000",
      savings: "₹7,000",
      duration: "7-10 days",
      popular: false,
      icon: faZap,
      color: "from-yellow-500 to-orange-600",
      description: "Fast-track business setup for immediate market entry",
      features: [
        "Express Company Registration",
        "Basic GST Registration",
        "PAN Application",
        "Bank Account Opening Support",
        "Basic Compliance Setup",
        "Startup India Registration",
        "Essential Legal Documents",
        "Quick Tax Setup"
      ],
      includes: [
        "Expedited registration process",
        "Basic compliance framework",
        "Essential documentation",
        "Banking assistance",
        "1 month support"
      ]
    }
  ];

  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faAward} className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Service Bundles
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive packages designed to meet your business needs at every stage. 
              Save money and time with our carefully curated service combinations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Bundles Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white h-full ${
                  bundle.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => navigate(`/bundles/${bundle.id}`)}
              >
                {/* {bundle.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-sm font-semibold rounded-lg">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )} */}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${bundle.color} flex items-center justify-center shadow-lg`}>
                      <FontAwesomeIcon icon={bundle.icon} className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {bundle.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{bundle.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{bundle.price}</span>
                    <span className="text-lg text-gray-500 line-through">{bundle.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 w-fit">
                    Save {bundle.savings}
                  </Badge>
                  
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                    <span>{bundle.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 flex flex-col h-full">
                  <div className="space-y-4 mb-6 flex-1">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {bundle.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {bundle.features.length > 4 && (
                          <li className="text-sm text-gray-500 italic">
                            +{bundle.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                        bundle.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-600 hover:to-purple-600 hover:text-white'
                      }`}
                    >
                      Choose This Bundle
                      <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Protection</h3>
            <p className="text-gray-600">Comprehensive legal and financial coverage for your business</p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
            <p className="text-gray-600">Dedicated team of CAs and lawyers for ongoing assistance</p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faClock} className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Efficient</h3>
            <p className="text-gray-600">Streamlined processes to get your business running quickly</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">
                Need a Custom Bundle?
              </h2>
            </div>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Can't find the perfect bundle for your needs? Our experts can create a customized 
              package tailored specifically for your business requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold h-14">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-2" />
                Request Custom Bundle
              </Button>
              <Button size="lg" variant="outline" className="border-white text-gray-900 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold h-14">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
                Speak with Expert
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BundlePage;

