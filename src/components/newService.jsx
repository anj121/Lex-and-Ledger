
import { useState ,useEffect} from 'react'
import '../App'
import { useNavigate, useParams } from 'react-router-dom';
import { serviceCategories } from '@/static/service-data';
import { Clock, FileText, IndianRupee, CheckCircle, Calendar, Users, Shield, Award, ChevronDown, ChevronUp, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.jsx'
import API_CONFIG from '@/config/api';
import axios from 'axios';
  const API_BASE = API_CONFIG.BASE_URL;

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/services/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    return response.data.service;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch service";
  }
};
export function ServiceDetailPage() {
  const { categoryId } = useParams(); 
    const [serviceData, setSelectedService] = useState(null);
    const { serviceId: routeServiceId } = useParams();
  const { categoryId: routeCategoryId } = useParams();
  const [selectedTab, setSelectedTab] = useState('overview');

    const [openFAQ, setOpenFAQ] = useState(null);
      const [hoveredFeature, setHoveredFeature] = useState(null);
       const features = [
    { icon: Shield, title: "Expert Consultation", description: "Get advice from certified tax professionals" },
    { icon: Award, title: "Compliance Assurance", description: "Ensure 100% regulatory compliance" },
    { icon: Users, title: "Dedicated Support", description: "Personal tax advisor throughout the process" },
    { icon: Calendar, title: "Timely Delivery", description: "Complete service within promised timeframe" }
  ]
  const timeline = [
    {
      day: "Day 1",
      title: "Document Collection & Initial Review",
      description: "We collect all required documents and perform an initial assessment of your financial situation.",
      tasks: ["Document verification", "Initial consultation", "Requirement analysis"],
      status: "completed"
    },
    {
      day: "Day 2-3",
      title: "Comprehensive Analysis",
      description: "Our tax experts analyze your financial data and identify optimization opportunities.",
      tasks: ["Financial analysis", "Tax liability calculation", "Deduction identification"],
      status: "in-progress"
    },
    {
      day: "Day 4",
      title: "Strategy Development",
      description: "We develop a customized tax planning strategy tailored to your specific needs.",
      tasks: ["Strategy formulation", "Risk assessment", "Compliance check"],
      status: "pending"
    },
    {
      day: "Day 5",
      title: "Delivery & Implementation",
      description: "Final strategy presentation with implementation guidance and ongoing support.",
      tasks: ["Strategy presentation", "Implementation guide", "Follow-up support"],
      status: "pending"
    }
  ]
console.log({routeServiceId})
  const faqs = [
    {
      question: "What makes your tax planning service different?",
      answer: "Our service combines deep expertise with personalized attention. We don't just prepare your taxes - we strategically plan to minimize your tax burden while ensuring full compliance. Our certified professionals have years of experience across various sectors and stay updated with the latest tax regulations."
    },
    {
      question: "How much can I save with professional tax planning?",
      answer: "Tax savings vary based on individual circumstances, but our clients typically save 15-30% on their tax liability through strategic planning. We identify deductions, exemptions, and investment opportunities that most people miss, often saving much more than our service fee."
    },
    {
      question: "Is my financial information secure?",
      answer: "Absolutely. We follow strict data protection protocols and maintain complete confidentiality. All documents are stored securely, and our team is bound by professional confidentiality agreements. We use encrypted systems for all communications and data storage."
    },
    {
      question: "What if I need changes after the plan is delivered?",
      answer: "We provide 30 days of free support after delivery for any clarifications or minor adjustments. For significant changes due to new circumstances, we offer revision services at discounted rates for existing clients."
    },
    {
      question: "Do you handle tax filing as well?",
      answer: "While this service focuses on planning and strategy, we do offer tax filing services separately. Many clients choose to bundle both services for a comprehensive solution. We can discuss filing services during your consultation."
    },
    {
      question: "What if I have a complex business structure?",
      answer: "We specialize in complex cases including multiple income sources, business ownership, international transactions, and sector-specific requirements. Our team has experience with NGOs, trusts, partnerships, and corporate structures."
    }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Lex & Ledger helped me save ₹2.5 lakhs in taxes through strategic planning. Their expertise is unmatched!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "IT Professional",
      content: "Professional service with clear explanations. They made tax planning simple and stress-free.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Consultant",
      content: "Excellent support throughout the process. The team is knowledgeable and responsive.",
      rating: 5
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents Required' },
    { id: 'process', label: 'Our Process' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'faq', label: 'FAQ' }
  ]
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }
    useEffect(() => {
    const fetchService = async () => {
      try {
        if (routeServiceId) {
          const data = await getServiceById(routeServiceId);
          setSelectedService(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [routeServiceId]);
  useEffect(() => {
      const serviceId = sessionStorage.getItem("serviceId");
      const categoryId = sessionStorage.getItem("serviceCategoryId");
      const step = sessionStorage.getItem("bookingStep");
  
      if (routeServiceId) {
        const category = serviceCategories.find(cat => cat.id === routeCategoryId);
        const selectedService=category.services.find((ser)=>ser.id.toString()===routeServiceId.toString());
        if (category && category.services.length > 0) {
          setSelectedService({...selectedService,categoryTitle:category.title}); 
           window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return; 
      }
  
      if (serviceId && categoryId) {
        const category = serviceCategories.find(cat => cat.id === categoryId);
        if (category) {
          const service = category.services.find(srv => srv.id === parseInt(serviceId));
          if (service) setSelectedService({...service,categoryTitle:category.title});
        }
      }
    }, [routeServiceId]);
const parsePrice = (priceStr) => {
  try {
    if (typeof priceStr !== 'string') {
      throw new TypeError('Input must be a string');
    }

    const match = priceStr.match(/₹([\d,]+)/);
    if (!match) {
      throw new Error('Price format is invalid or missing ₹ symbol');
    }

    const numericValue = parseInt(match[1].replace(/,/g, ""), 10);
    if (isNaN(numericValue)) {
      throw new Error('Parsed value is not a valid number');
    }

    return numericValue;
  } catch (error) {
    console.error(`parsePrice error: ${error.message}`);
    return null;
  }
};
const [isLoggedIn, setIsLoggedIn] = useState(false);

const originalPriceStr = serviceData?.price||""; 
const originalPrice = parsePrice(originalPriceStr); 
const discountAmount = Math.round(originalPrice * 0.24); 
const navigate=useNavigate();
const handleBookNow = () => {
  navigate(`/getStarted/${categoryId}`,
    {
      state: {
        selectedServiceId: serviceData.id
      }
    }
  );
};
useEffect(() => {
  setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
}, [location.pathname]);

  if(!serviceData){
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-blue-500/20 text-blue-100 border-blue-400">
                {serviceData.categoryTitle??"Professional Service"}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {serviceData.name}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {serviceData.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <IndianRupee className="w-5 h-5" />
                  <span className="font-semibold">{serviceData.price}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{serviceData.duration}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 {/* <Button size="lg" className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50 group" onClick={()=>navigate(-1)}>
                  
                  <ArrowLeft className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  Back to Detail
                </Button> */}
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 group cursor-pointer" 
                // onClick={()=>isLoggedIn?navigate(`/getStarted/company`):navigate(`/login`)}
                onClick={handleBookNow}
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in-right">
              <div className="relative">
                <div className="w-full h-80 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4">Quick Overview</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span>Optimize tax efficiency</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span>Minimize tax burdens</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span>Ensure regulatory compliance</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span>Personalized financial advice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span>Dedicated expert support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Service?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive tax planning solutions with expert guidance and guaranteed compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  hoveredFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredFeature === index ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-110' : 'bg-blue-100'
                  }`}>
                    <feature.icon className={`w-6 h-6 transition-colors duration-300 ${
                      hoveredFeature === index ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
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
                  <CardTitle className="text-2xl">Service Overview</CardTitle>
                  <CardDescription>
                    Comprehensive tax planning and advisory services tailored to your needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Tax liability assessment",
                        "Investment planning advice",
                        "Deduction optimization",
                        "Compliance review",
                        "Future tax planning",
                        "Documentation support"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <IndianRupee className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{serviceData.price}</div>
                        <div className="text-sm text-gray-600">Fixed Price</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{serviceData.duration}</div>
                        <div className="text-sm text-gray-600">Completion Time</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{serviceData.documents?.length||0}</div>
                        <div className="text-sm text-gray-600">Documents Required</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'documents' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Required Documents</CardTitle>
                  <CardDescription>
                    Please prepare the following documents for a smooth service experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceData?.documents?.length>0&&serviceData?.documents?.map((document, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors">
                          <span className="text-blue-600 font-semibold text-sm group-hover:text-white">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{document}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {index === 0 && "Financial statements from the previous fiscal year"}
                            {index === 1 && "Comprehensive breakdown of all income sources and expenditures"}
                            {index === 2 && "Legal documents defining your business structure"}
                            {index === 3 && "All relevant tax identification certificates"}
                            {index === 4 && "Additional documentation specific to your organization type"}
                          </p>
                        </div>
                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-medium text-blue-900 mb-2">📋 Document Checklist</h4>
                    <p className="text-sm text-blue-800">
                      Having all documents ready will help us provide faster and more accurate tax planning advice. 
                      If you're missing any documents, our team can guide you on how to obtain them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'process' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Process</CardTitle>
                  <CardDescription>
                    A step-by-step breakdown of how we deliver exceptional tax planning services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Initial Consultation",
                        description: "We review your documents and understand your financial situation",
                        duration: "Day 1"
                      },
                      {
                        step: 2,
                        title: "Analysis & Planning",
                        description: "Our experts analyze your data and create a customized tax strategy",
                        duration: "Day 2-3"
                      },
                      {
                        step: 3,
                        title: "Strategy Presentation",
                        description: "We present our recommendations and explain the tax optimization plan",
                        duration: "Day 4"
                      },
                      {
                        step: 4,
                        title: "Implementation Support",
                        description: "We help you implement the strategy and provide ongoing guidance",
                        duration: "Day 5"
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

            {selectedTab === 'timeline' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Service Timeline</CardTitle>
                  <CardDescription>
                    Track the progress of your tax planning service from start to finish
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <div key={index} className="relative">
                        {index !== timeline.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                        )}
                        <div className="flex items-start space-x-6">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'in-progress' ? 'bg-gradient-to-r from-blue-600 to-purple-600' :
                            'bg-gray-300'
                          }`}>
                            {item.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                              <Badge 
                                variant={item.status === 'completed' ? 'default' : 'outline'}
                                className={
                                  item.status === 'completed' ? 'bg-green-500' :
                                  item.status === 'in-progress' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' :
                                  'text-gray-500'
                                }
                              >
                                {item.day}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.tasks.map((task, taskIndex) => (
                                <Badge key={taskIndex} variant="secondary" className="text-xs">
                                  {task}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
                    Find answers to common questions about our tax planning service
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
                    <h4 className="font-medium text-blue-900 mb-2">Still have questions?</h4>
                    <p className="text-sm text-blue-800 mb-4">
                      Our team is here to help. Contact us for personalized assistance.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Taxes?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with our expert tax planning service today and save money on your taxes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 group">
              Start Your Tax Planning
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white hover:text-blue-600">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of satisfied clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


