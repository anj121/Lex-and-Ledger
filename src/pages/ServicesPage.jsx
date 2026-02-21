import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faFilter, 
  faClock, 
  faIndianRupee, 
  faFileAlt, 
  faArrowRight,
  faGavel,
  faShieldAlt,
  faChartLine,
  faUsers,
  faBuilding,
  faHandshake,
  faRocket,
  faStar,
  faCheckCircle,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faFileText,
  faClipboardCheck,
  faPercent,
  faCreditCard,
  faStamp,
  faFileEdit,
  faHeadphones,
  faCheckSquare,
  faGlobe,
  faHeart,
  faBookOpen,
  faCrown,
  faTruck,
  faCopyright,
  faLightbulb,
  faUserCog,
  faZap,
  faAward,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { serviceCategories } from "@/static/service-data";
import API_CONFIG from "@/config/api";
export const CATEGORY_ID_MAP = {
  "Company Formation": "company",
  "Compliance": "company",

  "Tax Services": "tax",
  "Financial Planning": "tax",

  "Legal Services": "other-offerings",

  "Consultation": "immediate",

  "Documentation": "startup-regulatory",

  "Other": "other-offerings",
};

export const formatBackendServices = (services = []) => {
  const grouped = {};

  services.forEach((s) => {
    const meta = CATEGORY_META[s.category];
    // if (!meta) return;

    if (!grouped[s.category]) {
      grouped[s.category] = {
        ...meta,
        services: [],
      };
    }
    grouped[s.category].services.push({
      id: s._id,
      name: s.name,
      price: s.price,
      duration: s.duration,
      icon: meta?.icon??FileText,
      description: s.description,

    documents: Array.isArray(s.requirements)
  ? s.requirements
  : typeof s.requirements === "string"
    ? s.requirements.split(",").map(d => d.trim())
    : [],

faq: Array.isArray(s.faq)
  ? s.faq.map(f => ({
      question: f.question?.trim?.() || "",
      answer: f.answer?.trim?.() || "",
    }))
  : typeof s.faq === "string"
    ? s.faq
        .split("Q:")
        .filter(Boolean)
        .map(f => {
          const [q, a] = f.split("A:");
          return {
            question: q?.trim?.() || "",
            answer: a?.trim?.() || "",
          };
        })
    : [],
    });
  });

  return Object.values(grouped);
};


export const CATEGORY_META = serviceCategories.reduce((acc, cat) => {
  acc[cat.title] = {
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    color: cat.color,
  };
  return acc;
}, {});

const ServicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[services,setServices]=useState([]);
  useEffect(() => {
    fetch(`${API_CONFIG.BASE_URL}/services`)
      .then(res => res.json())
      .then(data => {
        const formatted = formatBackendServices(data.services);
        setServices(formatted);
  
  
      });
  }, []);
  
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  // Get all services from all categories
  const allServices = (services??[]).flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryId: category.id,
      categoryTitle: category.title,
      categoryColor: category.color,
      categoryIcon: category.icon,
    }))
  );
  // Filter services based on search and category
  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service) => {
   
        navigate(`/service-detail/${service.id}/${service.categoryId}`)
      return;
    // if (searchTerm.length > 0) {
    //   navigate(`/getStarted/${service.categoryId}`, {
    //     state: { selectedServiceId: service.id },
    //   });
    //   return;
    // }
    // navigate(`/services/${service.categoryId}`, {
    //   state: { selectedServiceId: service.id },
    // });
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "immediate") {
      navigate(`/immediate-service`);
      return;
    }
    navigate(`/services/${categoryId}`);
  };

  useEffect(() => {
    if (searchTerm) {
      setIsCategoryVisible(false);
    }
  }, [searchTerm, manuallyToggled]);

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
    Shield: faShieldAlt,
    Scale: faGavel,
    Users: faUsers,
    UserCheck: faUsers,
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
    Target: faRocket,
    PieChart: faChartLine,
    BarChart3: faChartLine,
    TrendingDown: faChartLine,
    Banknote: faIndianRupee,
    Wallet: faFileAlt,
    FileSpreadsheet: faFileAlt,
    PiggyBank: faFileText,
    Coins: faIndianRupee,
    FileBarChart: faChartLine,
    Percent: faPercent,
    FileX: faFileAlt,
    AlertCircle: faShieldAlt,
    CheckSquare: faCheckCircle,
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
    Search: faFileAlt,
    Eye: faFileAlt,
    Copyright: faFileAlt,
    Lightbulb: faFileAlt,
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

  const categoryIcons = {
    'company': faBuilding,
    'tax': faFileText,
    'immediate': faZap,
    'gst-services': faFileText,
    'startup-regulatory': faRocket,
    'ma-restructuring': faFileAlt,
    'international-audit': faGlobe,
    'accounting': faBookOpen,
    'other-offerings': faFileText
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Website Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faGavel} className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Our Services
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive legal and financial services to support your business at every stage. 
                From startup formation to complex compliance, we've got you covered with expert guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
                />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 h-14 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="all">All Categories</option>
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            {isCategoryVisible && (
              <h2 className="text-3xl font-bold text-gray-900">
                Service Categories
              </h2>
            )}
            <button
              onClick={() => {
                setIsCategoryVisible((prev) => !prev);
                setManuallyToggled(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-all duration-300"
            >
              <span className="font-semibold text-gray-700">
                {isCategoryVisible ? "Hide" : "Show Categories"}
              </span>
              <motion.div
                animate={{ rotate: isCategoryVisible ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isCategoryVisible && (
              <motion.div
                key="category-grid"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceCategories.map((category, index) => {
                    // Helper function to get FontAwesome icon from Lucide icon
                    const getFontAwesomeIcon = (lucideIcon) => {
                      if (!lucideIcon) return faFileText;
                      
                      if (typeof lucideIcon === 'string') {
                        return iconMapping?.[lucideIcon] || faFileText;
                      }
                      
                      if (lucideIcon?.name) {
                        return iconMapping?.[lucideIcon.name] || faFileText;
                      }
                      
                      if (lucideIcon?.displayName) {
                        return iconMapping?.[lucideIcon.displayName] || faFileText;
                      }
                      
                      return faFileText;
                    };

                    const IconComponent = getFontAwesomeIcon(category.icon) || categoryIcons[category.id] || faGavel;
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-2xl transition-all duration-500 group border-0 bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4 mb-4">
                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <FontAwesomeIcon icon={IconComponent} className="h-7 w-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {category.title}
                                </CardTitle>
                                <Badge variant="secondary" className="mt-2">
                                  {category.services.length} Services
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {category.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-500" />
                                <span>Premium Service</span>
                              </div>
                              <FontAwesomeIcon 
                                icon={faArrowRight} 
                                className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" 
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* All Services List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              All Services ({filteredServices.length})
            </h2>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="hover:bg-red-50 hover:text-red-700 hover:border-red-200"
              >
                Clear Search
              </Button>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <FontAwesomeIcon icon={faFileAlt} className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No services found
              </h3>
              <p className="text-gray-600 text-lg">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {filteredServices.map((service, index) => {
                  // Helper function to get FontAwesome icon from Lucide icon
                  const getFontAwesomeIcon = (lucideIcon) => {
                    if (!lucideIcon) return faFileText;
                    
                    if (typeof lucideIcon === 'string') {
                      return iconMapping?.[lucideIcon] || faFileText;
                    }
                    
                    if (lucideIcon?.name) {
                      return iconMapping?.[lucideIcon.name] || faFileText;
                    }
                    
                    if (lucideIcon?.displayName) {
                      return iconMapping?.[lucideIcon.displayName] || faFileText;
                    }
                    
                    return faFileText;
                  };

                  const IconComponent = getFontAwesomeIcon(service.icon) || categoryIcons[service.categoryId] || faGavel;
                  return (
                  <motion.div
                    key={`${service.categoryId}-${service.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-2xl transition-all duration-500 group border-0 bg-white/90 backdrop-blur-sm hover:bg-white h-full"
                      onClick={() => handleServiceClick(service)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.categoryColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <FontAwesomeIcon icon={IconComponent} className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline" className="text-xs font-semibold">
                            {service.categoryTitle}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {service.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 flex flex-col h-full">
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                          {service.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm">
                            <FontAwesomeIcon icon={faIndianRupee} className="h-4 w-4 text-green-600" />
                            <span className="font-bold text-green-600 text-lg">
                              {service.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4" />
                            <span>{service.documents.length} documents required</span>
                          </div>
                        </div>

                        <Button
                          className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 h-12 text-lg font-semibold"
                          variant="outline"
                        >
                          View Details
                          <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                          />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
                Our legal and financial experts are here to help you find the perfect solution for your business needs. 
                Get personalized recommendations and professional guidance.
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
                  className="border-white text-white hover:bg-white text-gray-900 px-8 py-4 text-lg font-semibold h-14"
                  onClick={() => navigate("/contact")}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faCheckCircle} className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faStar} className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
            <p className="text-gray-600">Client Rating</p>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <FontAwesomeIcon icon={faClock} className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
