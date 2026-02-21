import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faGavel,
  faShieldAlt,
  faChartLine,
  faUsers,
  faBuilding,
  faHandshake,
  faRocket,
  faStar,
  faCheckCircle,
  faClock,
  faIndianRupee,
  faFileAlt,
  faArrowRight,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faAward,
  faBriefcase,
  faZap,
  faFileText,
  faShield,
  faUserCheck,
  faClipboardCheck,
  faPercent,
  faCreditCard,
  faStamp,
  faFileEdit,
  faHeadphones,
  faCheckSquare,
  faGlobe,
  faHeart,
  faSearch,
  faBookOpen,
  faCrown,
  faTruck,
  faCopyright,
  faLightbulb,
  faUserCog,
  faArrowsUpDown
} from "@fortawesome/free-solid-svg-icons";

import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import ServiceList from '../components/ServiceList.jsx';
import ServiceBundles from '../components/ServiceBundles.jsx';
import { serviceCategories } from '@/static/service-data.js';

// Icon mapping from Lucide to FontAwesome
const iconMapping = {
  Building2: faBuilding,
  Building: faBuilding,
  Calculator: faFileText,
  Zap: faZap,
  Receipt: faFileText,
  Rocket: faRocket,
  Shuffle: faFileAlt,
  Globe2: faGlobe,
  BookOpen: faBookOpen,
  FileText: faFileText,
  Shield: faShield,
  Scale: faGavel,
  Users: faUsers,
  UserCheck: faUserCheck,
  TrendingUp: faChartLine,
  FileCheck: faCheckCircle,
  AlertTriangle: faShieldAlt,
  Gavel: faGavel,
  CreditCard: faCreditCard,
  Clock: faClock,
  Phone: faPhone,
  MessageSquare: faEnvelope,
  CheckCircle: faCheckCircle,
  FileSearch: faSearch,
  DollarSign: faIndianRupee,
  RefreshCw: faFileAlt,
  Award: faAward,
  Globe: faGlobe,
  Briefcase: faBriefcase,
  UserPlus: faUsers,
  Heart: faHeart,
  Handshake: faHandshake,
  Target: faFileAlt,
  PieChart: faChartLine,
  BarChart3: faChartLine,
  TrendingDown: faChartLine,
  Banknote: faIndianRupee,
  Wallet: faCreditCard,
  FileSpreadsheet: faFileAlt,
  PiggyBank: faFileText,
  Coins: faIndianRupee,
  FileBarChart: faChartLine,
  Percent: faPercent,
  FileX: faFileAlt,
  AlertCircle: faShieldAlt,
  CheckSquare: faCheckSquare,
  ClipboardCheck: faClipboardCheck,
  FileEdit: faFileEdit,
  Stamp: faStamp,
  MapPin: faMapMarkerAlt,
  Factory: faBuilding,
  Truck: faTruck,
  Package: faFileAlt,
  ShoppingCart: faFileAlt,
  Store: faBuilding,
  Warehouse: faBuilding,
  Import: faFileAlt,
  Ship: faGlobe,
  Plane: faGlobe,
  Container: faFileAlt,
  Layers: faFileAlt,
  Network: faGlobe,
  GitMerge: faFileAlt,
  ArrowUpDown: faFileAlt,
  Repeat: faFileAlt,
  RotateCcw: faFileAlt,
  Timer: faClock,
  Headphones: faHeadphones,
  MessageCircle: faEnvelope,
  Search: faSearch,
  Eye: faSearch,
  Copyright: faCopyright,
  Lightbulb: faLightbulb,
  ShieldCheck: faShieldAlt,
  UserCog: faUserCog,
  TrendingUpIcon: faChartLine,
  BriefcaseIcon: faBriefcase,
  Settings: faUserCog,
  HelpCircle: faEnvelope,
  Star: faStar,
  Crown: faCrown,
  Lightning: faZap
};

const serviceBundles = [
  {
    id: "startup",
    name: "Startup Complete Package",
    description: "Everything you need to start your business",
    price: "₹45,000",
    originalPrice: "₹60,000",
    savings: "₹15,000",
    popular: true,
    icon: faRocket,
    color: "from-blue-500 to-purple-600",
    features: ["Company Registration", "GST Registration", "Bank Account Setup", "Compliance Support"]
  },
  {
    id: "compliance",
    name: "Annual Compliance Bundle",
    description: "Complete yearly compliance management",
    price: "₹35,000",
    originalPrice: "₹50,000",
    savings: "₹15,000",
    icon: faAward,
    color: "from-green-500 to-blue-600",
    features: ["Annual Returns", "Tax Filings", "Audit Support", "Regulatory Updates"]
  },
  {
    id: "tax",
    name: "Tax Management Package",
    description: "Comprehensive tax planning and filing",
    price: "₹25,000",
    originalPrice: "₹35,000",
    savings: "₹10,000",
    icon: faFileText,
    color: "from-orange-500 to-red-600",
    features: ["Tax Planning", "Return Filing", "Assessment Support", "Tax Advisory"]
  },
  {
    id: "complete",
    name: "Business Complete Solution",
    description: "All-in-one business service package",
    price: "₹75,000",
    originalPrice: "₹100,000",
    savings: "₹25,000",
    icon: faBriefcase,
    color: "from-purple-500 to-pink-600",
    features: ["Full Business Setup", "Ongoing Compliance", "Tax Management", "Legal Support"]
  },
];

const ServiceDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (categoryId && serviceCategories.find((i) => i.id === categoryId)) {
      setSelectedCategory(serviceCategories.find((i) => i.id === categoryId));
    } else {
      navigate('/');
    }
  }, [categoryId, navigate]);

  useEffect(() => {
    if (location.state?.selectedServiceId) {
      setSelectedServiceId(location.state.selectedServiceId);
    }
  }, [location.state]);

  const handleServiceSelect = (service) => {
    sessionStorage.setItem("serviceId", service.id);
    sessionStorage.setItem("serviceCategoryId", categoryId);
    sessionStorage.setItem("bookingStep", "3");
    navigate(`/getStarted/${categoryId}`);
  };

  const handleBundleSelect = (bundle) => {
    console.log('Selected bundle:', bundle);
    // Handle bundle selection logic here
    alert(`Selected bundle: ${bundle.name}`);
  };

  const handleBackToHome = () => {
    navigate('/services');
  };

  // Map category IDs to FontAwesome icons
  const categoryIcons = {
    'company': faBuilding,
    'tax': faFileText,
    'immediate': faZap,
    'gst-services': faFileText,
    'startup-regulatory': faRocket,
    'ma-restructuring': faArrowsUpDown,
    'international-audit': faGlobe,
    'accounting': faBookOpen,
    'other-offerings': faFileText
  };

  // Helper function to get FontAwesome icon from Lucide icon
  const getFontAwesomeIcon = (lucideIcon) => {
    if (typeof lucideIcon === 'string') {
      return iconMapping[lucideIcon] || faFileText;
    }
    return iconMapping[lucideIcon?.name] || faFileText;
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faClock} className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <Button onClick={handleBackToHome} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  // Filter bundles based on category
  const relevantBundles = serviceBundles.filter(bundle => {
    if (selectedCategory.id === "company") {
      return bundle.id === "startup" || bundle.id === "compliance";
    }
    if (selectedCategory.id === "tax") {
      return bundle.id === "tax";
    }
    if (selectedCategory.id !== "immediate") {
      return bundle.id === "complete";
    }
    return false;
  });

  const IconComponent = categoryIcons[selectedCategory.id] || faGavel;

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
              onClick={handleBackToHome}
              variant="outline"
              className="mb-8 border-white/30  hover:bg-white text-gray-900 cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`w-20 h-20 bg-gradient-to-r ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                <FontAwesomeIcon icon={IconComponent} className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white mb-2">
                  {selectedCategory.title}
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {selectedCategory.services.length} Services Available
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {selectedCategory.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of professional services tailored to your needs
            </p>
          </div>

          <ServiceList 
            services={selectedCategory.services} 
            onServiceSelect={handleServiceSelect}
            selectedServiceId={selectedServiceId}
            iconMapping={iconMapping}
          />
        </motion.div>

        {/* Related Bundles Section */}
        {relevantBundles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recommended Packages
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Save time and money with our curated service bundles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relevantBundles.map((bundle, index) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`cursor-pointer hover:shadow-2xl transition-all duration-500 group border-0 bg-white/90 backdrop-blur-sm hover:bg-white h-full relative ${bundle.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {bundle.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4 pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${bundle.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <FontAwesomeIcon icon={bundle.icon} className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {bundle.name}
                          </CardTitle>
                          <p className="text-gray-600 text-sm mt-1">
                            {bundle.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 flex flex-col h-full">
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-gray-900">{bundle.price}</span>
                          <span className="text-lg text-gray-500 line-through">{bundle.originalPrice}</span>
                          <Badge variant="secondary" className="text-green-600 bg-green-100">
                            Save {bundle.savings}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-6 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {bundle.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => handleBundleSelect(bundle)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-lg font-semibold"
                      >
                        Choose Package
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faHandshake} className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">
                  Need Expert Guidance?
                </h2>
              </div>
              <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Our legal and financial experts are here to help you choose the right services and packages for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold h-14"
                  onClick={() => navigate("/immediate-service")}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-2" />
                  Get Expert Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white  hover:bg-white text-gray-900 px-8 py-4 text-lg font-semibold h-14 cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faCheckCircle} className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">500+</h3>
            <p className="text-gray-600 text-sm">Happy Clients</p>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faStar} className="h-10 w-10 text-yellow-500 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">4.9/5</h3>
            <p className="text-gray-600 text-sm">Client Rating</p>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faClock} className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">24/7</h3>
            <p className="text-gray-600 text-sm">Support Available</p>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faAward} className="h-10 w-10 text-purple-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">10+</h3>
            <p className="text-gray-600 text-sm">Years Experience</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;

