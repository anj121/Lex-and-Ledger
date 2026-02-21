import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Package,
  TrendingUp,
  Crown,
  FileText,
  Shield,
  Zap,
  Award
,
Star,
Calendar,
IndianRupee,
ArrowRight,
Clock,
Users,
Sparkles,
CheckCircle,
ChevronDown,
ChevronUp
} from "lucide-react";

import { 
  faPlus,
  faCheckCircle,
  faStar,
  faClock,
  faUsers,
  faShield,
  faArrowRight,
  faArrowLeft,
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
  faZap,
  faIndianRupee,
  faCalendar,
  faFileAlt,
  faHeadphones,
  faCheck,
  faTimes,
  faChevronDown,
  faChevronUp,
  faPlay,
  faMagicWandSparkles,
  faCrown,
  faArrowTrendUp,
  // faTrendingUp,
  faBox} from "@fortawesome/free-solid-svg-icons";

import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.jsx'
import HorizontalSlider from './HorizontalSlider'

function BundleService() {
  const [selectedBundle, setSelectedBundle] = useState(1)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [openFAQ, setOpenFAQ] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
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
  ]

  const currentBundle = bundles.find(bundle => bundle.id === selectedBundle) || bundles[0]

  const bundleIcons = {
    1: Package,
    2: TrendingUp,
    3: Crown,
    4: FileText,
    5: Shield,
    6: Zap
  }

  const features = [
    { icon: Shield, title: "Expert Guidance", description: "Professional consultation throughout the process" },
    { icon: Award, title: "Complete Compliance", description: "Ensure 100% regulatory compliance" },
    { icon: Users, title: "Dedicated Support", description: "Personal account manager for your business" },
    { icon: Calendar, title: "Timely Delivery", description: "Complete setup within promised timeframe" }
  ]

  const faqs = [
    {
      question: "What makes your business bundles different?",
      answer: "Our bundles are carefully curated to provide comprehensive business solutions at significant cost savings. Each bundle includes multiple services that work together seamlessly, with dedicated support throughout the process."
    },
    {
      question: "Can I customize a bundle according to my needs?",
      answer: "Yes, we offer customization options for all our bundles. Our experts will work with you to modify the services included based on your specific business requirements and industry needs."
    },
    {
      question: "What kind of ongoing support do you provide?",
      answer: "Each bundle includes different levels of ongoing support - from 1 month for Quick Start to 12 months for Enterprise Complete. This includes compliance reminders, document updates, and consultation sessions."
    },
    {
      question: "How do I choose the right bundle for my business?",
      answer: "Our team provides free consultation to help you choose the right bundle based on your business size, industry, growth plans, and compliance requirements. We'll recommend the most cost-effective solution for your needs."
    },
    {
      question: "Are there any hidden costs in the bundles?",
      answer: "No, our bundle pricing is transparent and includes all mentioned services. Government fees and statutory charges are clearly mentioned separately. There are no hidden costs or surprise charges."
    },
    {
      question: "What happens if I need additional services later?",
      answer: "You can always upgrade to a higher bundle or add individual services at discounted rates. Our modular approach allows you to scale your legal and compliance needs as your business grows."
    }
  ]

  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "Startup Founder",
      content: "The Startup Essentials Bundle saved us months of paperwork and confusion. Everything was handled professionally!",
      rating: 5
    },
    {
      name: "Sneha Patel",
      role: "Business Owner",
      content: "Growth Business Bundle was perfect for our expanding company. The trademark registration was seamless.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Enterprise CEO",
      content: "Enterprise Complete Bundle provided everything we needed for our international expansion. Excellent service!",
      rating: 5
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'includes', label: 'What\'s Included' },
    { id: 'process', label: 'Our Process' },
    { id: 'faq', label: 'FAQ' }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const BundleIcon = bundleIcons[selectedBundle] || Package

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
     



      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {currentBundle.popular && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  Business Bundle
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {currentBundle.name}
              </h1>
              
              <p className="text-lg text-blue-100 leading-relaxed">
                {currentBundle.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/15 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <FontAwesomeIcon icon={faIndianRupee} className="w-5 h-5" />
                  <span className="font-bold text-lg">{currentBundle.price}</span>
                  <span className="text-sm line-through text-blue-200">{currentBundle.originalPrice}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/15 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
                  <span className="font-bold">{currentBundle.duration}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-xl px-6 py-3 backdrop-blur-sm border border-green-400/30 hover:bg-green-500/40 transition-all duration-300">
                  <FontAwesomeIcon icon={faMagicWandSparkles} className="w-5 h-5" />
                  <span className="font-bold">Save {currentBundle.savings}</span>
                </div>
                </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/signup")}
                  className="bg-white text-blue-600 hover:bg-blue-50 group h-12 px-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Today
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-full h-80 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faBox} className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Bundle Highlights</h3>
                </div>
                <ul className="space-y-3">
                  {currentBundle.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                  {currentBundle.features.length > 5 && (
                    <li className="text-sm text-blue-200 italic flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-white" />
                      </div>
                      <span>+{currentBundle.features.length - 5} more features...</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <FontAwesomeIcon icon={faAward} className="w-4 h-4 mr-2" />
              Why Choose Our Bundles?
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive business solutions designed to save you time, money, and ensure complete compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="text-center border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredFeature === index 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-100 to-purple-100'
                  }`}>
                    <feature.icon className={`w-6 h-6 transition-colors duration-300 ${
                      hoveredFeature === index ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 shadow-sm border overflow-x-auto">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-4 py-3 rounded-md font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {selectedTab === 'overview' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{currentBundle.name} Overview</CardTitle>
                  <CardDescription>
                    {currentBundle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Bundle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <IndianRupee className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{currentBundle.price}</div>
                        <div className="text-sm text-gray-600 line-through">{currentBundle.originalPrice}</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{currentBundle.duration}</div>
                        <div className="text-sm text-gray-600">Completion Time</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{currentBundle.features.length}</div>
                        <div className="text-sm text-gray-600">Services Included</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                        <Sparkles className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{currentBundle.savings}</div>
                        <div className="text-sm text-gray-600">You Save</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'features' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Features & Services</CardTitle>
                  <CardDescription>
                    Complete list of services included in {currentBundle.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentBundle.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors">
                          <CheckCircle className="w-5 h-5 text-blue-600 group-hover:text-white" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'includes' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">What's Included</CardTitle>
                  <CardDescription>
                    Detailed breakdown of everything you get with {currentBundle.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentBundle.includes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gradient-to-r from-green-600 to-blue-600 transition-colors">
                          <span className="text-green-600 font-semibold text-sm group-hover:text-white">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item}</h4>
                        </div>
                        <Package className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'process' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Process</CardTitle>
                  <CardDescription>
                    Step-by-step process for {currentBundle.name} delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Consultation & Planning",
                        description: "Initial consultation to understand your business needs and customize the bundle accordingly",
                        duration: "Day 1-2"
                      },
                      {
                        step: 2,
                        title: "Documentation & Filing",
                        description: "Prepare and file all necessary documents with relevant authorities",
                        duration: "Day 3-10"
                      },
                      {
                        step: 3,
                        title: "Registration & Compliance",
                        description: "Complete all registrations and set up compliance frameworks",
                        duration: "Day 11-15"
                      },
                      {
                        step: 4,
                        title: "Delivery & Support",
                        description: "Final delivery of all documents and certificates with ongoing support setup",
                        duration: "Final Days"
                      }
                    ].map((process, index) => (
                      <div key={index} className="flex items-start space-x-6 group">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-colors">
                            <span className="text-white font-bold">{process.step}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{process.title}</h4>
                            <Badge variant="outline" className="group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">{process.duration}</Badge>
                          </div>
                          <p className="text-gray-600">{process.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'faq' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Common questions about our business bundles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <Collapsible key={index} open={openFAQ === index} onOpenChange={() => toggleFAQ(index)}>
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <h4 className="text-left font-medium text-gray-900">{faq.question}</h4>
                            {openFAQ === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 bg-white border border-gray-100 rounded-lg mt-2">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center border-l-4 border-blue-600">
                    <h4 className="font-medium text-blue-900 mb-2">Need personalized guidance?</h4>
                    <p className="text-sm text-blue-800 mb-4">
                      Our experts are here to help you choose the right bundle for your business needs.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Interactive CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Interactive Background Elements */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 w-6 h-6 bg-white/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-4 h-4 bg-white/15 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 shadow-lg border border-white/30"
            >
              <FontAwesomeIcon icon={faRocket} className="w-4 h-4 mr-2" />
              Ready to Launch Your Business?
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Start Your Business Journey?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Choose <span className="font-semibold text-white">{currentBundle.name}</span> and save <span className="font-semibold text-green-300">{currentBundle.savings}</span> while getting everything you need for success.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 group h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get {currentBundle.name}
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600 h-14 px-8 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                <FontAwesomeIcon icon={faShield} className="w-5 h-5 mr-2" />
                Compare All Bundles
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-400" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-400" />
                <span>100% Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Moved to Bottom */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Lex&Ledger?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of businesses across India with proven results and exceptional service.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: faShield, value: "100%", label: "Compliance Guaranteed", color: "from-blue-600 to-purple-600" },
              { icon: faUsers, value: "5000+", label: "Happy Clients", color: "from-green-600 to-emerald-600" },
              { icon: faAward, value: "15+", label: "Years Experience", color: "from-orange-600 to-red-600" },
              { icon: faClock, value: "24/7", label: "Support Available", color: "from-purple-600 to-pink-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FontAwesomeIcon icon={stat.icon} className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    {/* Enhanced Interactive Testimonials Section */}
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6 shadow-lg"
            >
              <FontAwesomeIcon icon={faStar} className="w-4 h-4 mr-2" />
              Client Success Stories
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Trusted by thousands of businesses across India with proven results and exceptional service delivery.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <CardContent className="pt-8 pb-6">
                    <motion.div 
                      className="flex items-center mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 + i * 0.1 }}
                        >
                          <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.p 
                      className="text-gray-600 mb-6 italic leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                    >
                      "{testimonial.content}"
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BundleService


