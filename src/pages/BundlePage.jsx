import React,{useState,useEffect} from 'react';
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
import toast from 'react-hot-toast';
import API_CONFIG from '../config/api.js';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Calculator, Shield, Target } from 'lucide-react';

const BundlePage = () => {
      const API_BASE = API_CONFIG.BASE_URL;
const icons = [Target, Shield, Calculator, Briefcase];

const colors = [
  "from-green-500 to-green-600",
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-indigo-500 to-indigo-600",
];
  const navigate = useNavigate();
      const [bundles, setBundles] = useState([]);
  const[loading,setLoading]=useState(false)
  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };
  
  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
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
      if (response.ok) {
        const data = await response.json();
const updatedBundles = (data?.bundles??[]).map((item, index) => ({
  ...item,
  icon: icons[index % icons.length],
  color: colors[index % colors.length],
  savings:0
}));        setBundles(updatedBundles || []);

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
  },[]);
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
      {loading?<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bundles...</p>
        </div>
      </div>:
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
              key={bundle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white h-full ${
                  bundle.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => navigate(`/bundles/${bundle._id}`)}
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
                
             {(bundle?.features??[])?.length>0&&   <CardContent className="pt-0 flex flex-col h-full">
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
                </CardContent>}
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
      </div>}
    </div>
  );
};

export default BundlePage;

