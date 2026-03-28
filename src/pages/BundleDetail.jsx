import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
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
  faMagicWandSparkles
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import API_CONFIG from '../config/api.js';

 const API_BASE = API_CONFIG.BASE_URL;

const BundleDetail = () => {
  const navigate = useNavigate();
  const { bundleId } = useParams();
      const [bundle, setBundle] = useState([]);
  const[loading,setLoading]=useState(false)
  
  const [selectedTab, setSelectedTab] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };
  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/bundles`, {
        headers
      });
      console.log({response},response.ok)
      if (response.ok) {
        const data = await response.json();
        console.log({data})
const updatedBundles = (data?.bundles??[]).map((item, index) => ({
  ...item,
  icon: icons[index % icons.length],
  color: colors[index % colors.length],
  savings:0
})).find(b => b.id.toString() === bundleId);     
setBundle(updatedBundles)
    window.scrollTo(0, 0);


      } else {
        // Fallback to mock data if API is not available
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      // Use mock data as fallback
      toast.error('Using offline data. Backend not connected.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchServices()
  },[bundleId]);
  console.log({bundle})
  

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'includes', label: 'What\'s Included' },
    { id: 'process', label: 'Our Process' },
    { id: 'faq', label: 'FAQ' }
  ];

  const faqs = [
    {
      question: "What makes this bundle different from others?",
      answer: "This bundle is carefully curated to provide comprehensive business solutions at significant cost savings. It includes multiple services that work together seamlessly, with dedicated support throughout the process."
    },
    {
      question: "Can I customize this bundle according to my needs?",
      answer: "Yes, we offer customization options for all our bundles. Our experts will work with you to modify the services included based on your specific business requirements and industry needs."
    },
    {
      question: "What kind of ongoing support do you provide?",
      answer: "This bundle includes comprehensive ongoing support including compliance reminders, document updates, consultation sessions, and dedicated account management based on your bundle level."
    },
    {
      question: "Are there any hidden costs in this bundle?",
      answer: "No, our bundle pricing is transparent and includes all mentioned services. Government fees and statutory charges are clearly mentioned separately. There are no hidden costs or surprise charges."
    },
    {
      question: "What happens if I need additional services later?",
      answer: "You can always upgrade to a higher bundle or add individual services at discounted rates. Our modular approach allows you to scale your legal and compliance needs as your business grows."
    }
  ];

  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "Startup Founder",
      content: "This bundle saved us months of paperwork and confusion. Everything was handled professionally!",
      rating: 5
    },
    {
      name: "Sneha Patel",
      role: "Business Owner",
      content: "Perfect for our expanding company. The comprehensive coverage was exactly what we needed.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Enterprise CEO",
      content: "Provided everything we needed for our business growth. Excellent service and support!",
      rating: 5
    }
  ];

  const stats = [
    { icon: faShield, value: "100%", label: "Compliance Guaranteed" },
    { icon: faUsers, value: "5000+", label: "Happy Clients" },
    { icon: faAward, value: "15+", label: "Years Experience" },
    { icon: faClock, value: "24/7", label: "Support Available" }
  ];

  // useEffect(() => {
  //   const selectedBundle = bundles.find(b => b.id.toString() === bundleId);
  //   setBundle(selectedBundle);
  //   setLoading(false);
  //   window.scrollTo(0, 0);
  // }, [bundleId]);

  const handleBackToBundles = () => {
    navigate('/bundles');
  };

  const handleBookNow = () => {
    sessionStorage.setItem("selectedBundleId", bundleId);
    navigate('/getStarted');
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bundle details...</p>
        </div>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faTimes} className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bundle Not Found</h2>
          <p className="text-gray-600 mb-4">The requested bundle could not be found.</p>
          <Button onClick={handleBackToBundles} className="bg-blue-600 hover:bg-blue-700">
            Back to Bundles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={handleBackToBundles}
              variant="outline"
              className="mb-8 border-white/30 text-white hover:bg-white hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
              Back to Bundles
            </Button>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`w-20 h-20 bg-gradient-to-r ${bundle.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                <FontAwesomeIcon icon={bundle.icon} className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  {/* {bundle.popular && (
                    <Badge className="bg-orange-500/20 text-orange-100 border-orange-400">
                      <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )} */}
                  <Badge className="bg-blue-500/20 text-blue-100 border-blue-400">
                    Business Bundle
                  </Badge>
                </div>
                <h1 className="text-5xl font-bold text-white mb-2">
                  {bundle.name}
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {bundle.duration} • {bundle.features.length} Services
                </Badge>
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              {bundle.longDescription}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <div className="flex items-center space-x-2 bg-white/15 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <FontAwesomeIcon icon={faIndianRupee} className="w-5 h-5" />
                <span className="font-bold text-lg">{bundle.price}</span>
                <span className="text-sm line-through text-blue-200">{bundle.originalPrice}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
                <span className="font-bold">{bundle.duration}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-xl px-6 py-3 backdrop-blur-sm border border-green-400/30 hover:bg-green-500/40 transition-all duration-300">
                <FontAwesomeIcon icon={faMagicWandSparkles} className="w-5 h-5" />
                <span className="font-bold">Save {bundle.savings}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={selectedTab === tab.id ? "default" : "outline"}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`${
                          selectedTab === tab.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Overview Tab */}
                  {selectedTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
                          <div className="space-y-3">
                            {bundle.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                <FontAwesomeIcon icon={faAward} className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get</h3>
                          <div className="space-y-3">
                            {bundle.includes.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Features Tab */}
                  {selectedTab === 'features' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bundle.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            onMouseEnter={() => setHoveredFeature(idx)}
                            onMouseLeave={() => setHoveredFeature(null)}
                          >
                            <FontAwesomeIcon 
                              icon={faCheckCircle} 
                              className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors ${
                                hoveredFeature === idx ? 'text-green-600' : 'text-green-500'
                              }`} 
                            />
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Includes Tab */}
                  {selectedTab === 'includes' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Package Includes</h3>
                          <ul className="space-y-3">
                            {bundle.includes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Benefits</h3>
                          <ul className="space-y-3">
                            {bundle.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faAward} className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Process Tab */}
                  {selectedTab === 'process' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        {bundle.process.map((step, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-gray-700">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* FAQ Tab */}
                  {selectedTab === 'faq' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg"
                        >
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900">{faq.question}</span>
                            <FontAwesomeIcon 
                              icon={openFAQ === index ? faChevronUp : faChevronDown} 
                              className="w-4 h-4 text-gray-500" 
                            />
                          </button>
                          {openFAQ === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-4"
                            >
                              <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">What Our Clients Say</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                      >
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Get Started Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{bundle.price}</div>
                    <div className="text-gray-300 line-through">{bundle.originalPrice}</div>
                    <Badge className="bg-green-500 text-white mt-2">Save {bundle.savings}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleBookNow}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-lg font-semibold"
                    >
                      <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2" />
                      Book This Bundle
                    </Button>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-3 text-sm">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-400" />
                      <span>No hidden fees</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-400" />
                      <span>Expert support</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-400" />
                      <span>Complete documentation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Call Us</p>
                      <p className="text-sm text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Email Us</p>
                      <p className="text-sm text-gray-600">info@lexledger.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faHeadphones} className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section - Moved to better location */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-16 bg-gradient-to-r from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Lex&Ledger?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of businesses across India with proven results and exceptional service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group"
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
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BundleDetail;
