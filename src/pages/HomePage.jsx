import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import ServiceCategories from "../components/ServiceCategories.jsx";
import FoundersSection from "../components/FoundersSection.jsx";
import ContactForm from "../components/ContactForm.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";

import {
  Building2,
  Calculator,
  FileText,
  Shield,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  Zap,
  Star,
  Award,
  Target,
  Briefcase,
  Globe,
  HeadphonesIcon,
  Package,
  Percent,
  PlayCircle,
  BarChart3,
  UserCheck,
  Clock3,
  ShieldCheck,
  Code,
  Server,
  Calculator as CalcIcon,
  Lightbulb,
  Heart,
  Handshake,
  Receipt,
  Rocket,
  Shuffle,
  Globe2,
  BookOpen,
  ArrowRight,
  Phone,
  Check,
  Plus,
  Minus,
  X,
} from "lucide-react";
import ServicesSlider from "@/serviceCategory.jsx";
import {
  faqs,
  serviceBundles,
  serviceCategories,
  testimonials,
} from "@/static/service-data.js";
import EnhancedBlogPage from "./EnhancedBlogPage.jsx";
import HorizontalSlider from "@/components/HorizontalSlider.jsx";

// Phone number for call functionality
const SUPPORT_PHONE_NUMBER = "+91-9876543210";
const WHATSAPP_NUMBER = "919876543210"; // Without + and - for WhatsApp

const founders = [
  {
    name: "Kartikey Gupta",
    role: "Co-Founder & CTO",
    expertise: "Technology & Development",
    description:
      "A passionate developer with expertise in building scalable web applications and digital solutions.",
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Rajeev Sarathe",
    role: "Co-Founder & COO",
    expertise: "Infrastructure & Operations",
    description:
      "An experienced infrastructure manager ensuring robust and reliable service delivery.",
    icon: Server,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Puru Raj Gupta",
    role: "Co-Founder & CFO",
    expertise: "Finance & Compliance",
    description:
      "A qualified Chartered Accountant providing expert financial guidance and compliance solutions.",
    icon: CalcIcon,
    color: "from-purple-500 to-purple-600",
  },
];

// Booking Modal Component
const BookingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Get all services from all categories
  const allServices = serviceCategories.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryId: category.id,
      categoryTitle: category.title,
      categoryColor: category.color,
    }))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedService("");
    setFormData(prev => ({
      ...prev,
      service: ""
    }));
  };

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store selected service data in session storage
    if (selectedService) {
      const service = allServices.find(s => s.id.toString() === selectedService);
      if (service) {
        sessionStorage.setItem("serviceId", service.id);
        sessionStorage.setItem("serviceCategoryId", service.categoryId);
        sessionStorage.setItem("bookingStep", "3");
      }
    }
    
    alert("Your booking request has been submitted! We will contact you soon to confirm.");
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
    });
    setSelectedCategory("");
    setSelectedService("");
    
    // Navigate to getStarted with the selected service
    if (selectedService) {
      const service = allServices.find(s => s.id.toString() === selectedService);
      if (service) {
        navigate(`/getStarted/${service.categoryId}`);
      } else {
        navigate("/getStarted");
      }
    } else {
      navigate("/getStarted");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book a Service</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Service *
              </label>
              <select
                value={selectedService}
                onChange={handleServiceChange}
                required
                disabled={!selectedCategory}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !selectedCategory ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                }`}
              >
                <option value="">
                  {selectedCategory ? 'Select a service' : 'Please select a category first'}
                </option>
                {selectedCategory && serviceCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}
                    </option>
                  ))}
              </select>
              {!selectedCategory && (
                <p className="text-sm text-gray-500 mt-1">
                  Please select a service category above first
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us more about your requirements..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!selectedService}
                className={`flex-1 ${
                  selectedService 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gray-300 cursor-not-allowed opacity-60'
                }`}
              >
                {selectedService ? 'Book Service' : 'Select a Service First'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Call Options Modal Component
const CallOptionsModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_PHONE_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const openSkype = () => {
    window.open(`skype:${SUPPORT_PHONE_NUMBER.replace(/[^0-9+]/g, '')}?call`, '_blank');
  };

  const makeCall = () => {
    window.location.href = `tel:${SUPPORT_PHONE_NUMBER}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {SUPPORT_PHONE_NUMBER}
              </h3>
              <p className="text-gray-600 text-sm">
                Choose your preferred way to contact us
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={makeCall}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>

              <Button
                onClick={openWhatsApp}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </Button>

              <Button
                onClick={openSkype}
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.015 0C5.396 0 .001 5.396.001 12.015c0 6.62 5.395 12.015 12.014 12.015 6.62 0 12.015-5.395 12.015-12.015C24.03 5.396 18.635.001 12.015.001zM8.5 16.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c.5 0 1 .1 1.5.3l-1.5 1.5c-.5 0-1 .5-1 1s.5 1 1 1l3.5 3.5c.5.5 1.5.5 2 0s.5-1.5 0-2l-1.5-1.5c.2-.5.3-1 .3-1.5 0-2.5-2-4.5-4.5-4.5zm7 0c-.5 0-1-.1-1.5-.3l1.5-1.5c.5 0 1-.5 1-1s-.5-1-1-1l-3.5-3.5c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2l1.5 1.5c-.2.5-.3 1-.3 1.5 0 2.5 2 4.5 4.5 4.5z"/>
                </svg>
                Skype
              </Button>

              <div className="pt-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-600 hover:bg-gray-50"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Number
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Immediate Help Modal Component
const ImmediateHelpModal = ({ isOpen, onClose }) => {
  const [urgentFormData, setUrgentFormData] = useState({
    name: "",
    phone: "",
    issue: "",
    urgency: "high",
    description: "",
  });

  const handleUrgentInputChange = (e) => {
    const { name, value } = e.target;
    setUrgentFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUrgentSubmit = (e) => {
    e.preventDefault();
    alert("Your urgent request has been submitted! A lawyer will contact you within 10 minutes.");
    onClose();
    setUrgentFormData({
      name: "",
      phone: "",
      issue: "",
      urgency: "high",
      description: "",
    });
  };

  const openWhatsAppUrgent = () => {
    const message = `URGENT LEGAL HELP NEEDED\n\nName: ${urgentFormData.name || 'Not provided'}\nPhone: ${urgentFormData.phone || 'Not provided'}\nIssue: ${urgentFormData.issue || 'Not specified'}\nUrgency: ${urgentFormData.urgency}\nDescription: ${urgentFormData.description || 'Not provided'}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const makeUrgentCall = () => {
    window.location.href = `tel:${SUPPORT_PHONE_NUMBER}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Immediate Legal Help</h2>
                <p className="text-sm text-gray-600">Get connected with a lawyer within 10 minutes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Contact Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
              
              <Button
                onClick={makeUrgentCall}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now - {SUPPORT_PHONE_NUMBER}
              </Button>

              <Button
                onClick={openWhatsAppUrgent}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp - Urgent Help
              </Button>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">Response Time</h4>
                </div>
                <p className="text-sm text-red-700">
                  Our legal experts will respond within 10 minutes during business hours.
                </p>
              </div>
            </div>

            {/* Urgent Request Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Urgent Request Form</h3>
              <form onSubmit={handleUrgentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={urgentFormData.name}
                    onChange={handleUrgentInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={urgentFormData.phone}
                    onChange={handleUrgentInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Legal Issue Type *
                  </label>
                  <select
                    name="issue"
                    value={urgentFormData.issue}
                    onChange={handleUrgentInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select issue type</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="civil">Civil Dispute</option>
                    <option value="family">Family Law</option>
                    <option value="property">Property Law</option>
                    <option value="contract">Contract Dispute</option>
                    <option value="employment">Employment Law</option>
                    <option value="business">Business Law</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    name="urgency"
                    value={urgentFormData.urgency}
                    onChange={handleUrgentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="high">High - Need immediate assistance</option>
                    <option value="medium">Medium - Within 24 hours</option>
                    <option value="low">Low - Can wait a few days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description *
                  </label>
                  <textarea
                    name="description"
                    value={urgentFormData.description}
                    onChange={handleUrgentInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your legal issue briefly..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Submit Urgent Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component with Toggle
const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border border-gray-200 py-3">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <Minus className="h-5 w-5 text-blue-600 cursor-pointer" />
            ) : (
              <Plus className="h-5 w-5 text-blue-600 cursor-pointer" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-3 pb-6">
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCallOptionsModalOpen, setIsCallOptionsModalOpen] = useState(false);
  const [isImmediateHelpModalOpen, setIsImmediateHelpModalOpen] = useState(false);

  const handleCategorySelect = (category) => {
    navigate(`/services/${category.id}`);
  };

  const handleGetStarted = () => {
    navigate("/getStarted");
  };
   
  const handleBundleSelect = (category) => {
    navigate(`/bundles/${category.id}`);
  };
  
  const handleContactSubmit = (formData) => {
    // Handle form submission logic here
    alert("Thank you for your message! We will get back to you soon.");
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openCallOptionsModal = () => {
    setIsCallOptionsModalOpen(true);
  };

  const closeCallOptionsModal = () => {
    setIsCallOptionsModalOpen(false);
  };

  const openImmediateHelpModal = () => {
    setIsImmediateHelpModalOpen(true);
  };

  const closeImmediateHelpModal = () => {
    setIsImmediateHelpModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Expert Legal & Financial Services
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with verified chartered accountants and lawyers for
                professional guidance you can trust. From company formation to
                tax planning, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={openBookingModal}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">
                      Company Formation
                    </h3>
                    <p className="text-sm text-gray-600">Quick & Easy Setup</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <Calculator className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">
                      Tax Services
                    </h3>
                    <p className="text-sm text-gray-600">Expert Planning</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <Zap className="h-8 w-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">
                      Immediate Help
                    </h3>
                    <p className="text-sm text-gray-600">10 Min Response</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <Shield className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Compliance</h3>
                    <p className="text-sm text-gray-600">100% Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-semibold text-gray-900">
              Immediate Legal Service
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Need urgent legal help? Connect with a qualified lawyer within 10
            minutes, 24/7.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 shadow-lg"
              onClick={openImmediateHelpModal}
            >
              Get Immediate Help Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50"
              onClick={openCallOptionsModal}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>
        </div>
      </section>
      {/* Service Categories */}
      <section id="services" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal and financial solutions to power your business
              growth. Click on any category to explore detailed services.
            </p>
          </div>
          <ServicesSlider
            serviceCategories={serviceCategories}
            handleCategorySelect={handleCategorySelect}
          />
        </div>
      </section>
      <section
        id="bundles"
        className="py-24 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Service Bundles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save money with our carefully curated service bundles designed for
              different business needs.
            </p>
          </div>

          <HorizontalSlider
            items={serviceBundles}
            slidesPerView={3}
            renderCard={(bundle) => (
              <Card className="relative overflow-hidden border-0 h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                {bundle.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div
                    className={`w-12 h-12 bg-gradient-to-r ${bundle.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <bundle.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {bundle.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {bundle.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {bundle.originalPrice}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 mb-4">
                    Save {bundle.savings}
                  </Badge>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    {bundle.services.slice(0, 3).map((service, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-3 w-3 text-green-600 mr-2" />
                        {service}
                      </div>
                    ))}
                    {bundle.services.length > 3 && (
                      <div className="text-blue-600 text-xs">
                        +{bundle.services.length - 3} more services
                      </div>
                    )}
                  </div>
                  </div>
                  <Button
                    onClick={() => handleBundleSelect(bundle)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Select Bundle
                  </Button>
                </CardContent>
              </Card>
            )}
          />
        </div>
      </section>
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lex&Ledger?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional legal and financial
              services with transparency, expertise, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Professionals
              </h3>
              <p className="text-gray-600">
                All our experts are thoroughly vetted and certified
                professionals with proven track records.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quick Turnaround
              </h3>
              <p className="text-gray-600">
                Fast and efficient service delivery without compromising on
                quality or accuracy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                100% Secure
              </h3>
              <p className="text-gray-600">
                Your data and documents are protected with bank-level security
                and confidentiality.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                No hidden fees or surprise charges. Clear, upfront pricing for
                all our services.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you whenever you need
                help.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compliance Guarantee
              </h3>
              <p className="text-gray-600">
                We guarantee 100% compliance with all legal and regulatory
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting professional legal and financial services has never been
              easier. Follow these simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                title: "Choose Service",
                description: "Select from our comprehensive range of services",
                icon: Target,
              },
              {
                step: 2,
                title: "Book Consultation",
                description: "Schedule a consultation with our experts",
                icon: Calendar,
              },
              {
                step: 3,
                title: "Expert Guidance",
                description: "Get professional advice and guidance",
                icon: Users,
              },
              {
                step: 4,
                title: "Documentation",
                description: "Complete all necessary documentation",
                icon: FileText,
              },
              {
                step: 5,
                title: "Ongoing Support",
                description: "Receive continued support and assistance",
                icon: HeadphonesIcon,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-blue-600 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24">
        <EnhancedBlogPage />
      </section>
      {/* FAQ Section with Toggle Functionality */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and processes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* Founders Section */}
      <FoundersSection founders={founders} />

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients
              have to say about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/60 backdrop-blur-sm shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm onSubmit={handleContactSubmit} />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
      
      {/* Call Options Modal */}
      <CallOptionsModal isOpen={isCallOptionsModalOpen} onClose={closeCallOptionsModal} />
      
      {/* Immediate Help Modal */}
      <ImmediateHelpModal isOpen={isImmediateHelpModalOpen} onClose={closeImmediateHelpModal} />
    </div>
  );
};

export default HomePage;

