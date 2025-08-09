import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
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
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Zap,
  ChevronLeft,
  Star,
  Calendar,
  CreditCard,
  Check,
  Award,
  Target,
  Briefcase,
  Globe,
  HeadphonesIcon,
  Package,
  Percent,
  ChevronDown,
  PlayCircle,
  BarChart3,
  UserCheck,
  Clock3,
  ShieldCheck,
  Home,
  ArrowLeft,
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
} from "lucide-react";
import { serviceCategories } from "@/static/service-data";
import { useNavigate } from "react-router-dom";
import { ServiceDetailPage } from "./newService";

const BookingComponent = ({
  selectedService,
  bookingStep,
  setBookingStep,
  handleBackToHome,
  handleBackToCategory,
  setSelectedService,
  routeCategoryId
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredTime: "",
    requirements: "",
  });
  const navigate = useNavigate();
  // const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStep(4);
  };
  //  const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };

  const handleCategorySelect = (service) => {
    // navigate(`/services/${service.id}`);
    console.log({ service });
    if (service.id === "immediate") {
      navigate(`/immediate-service`);
      setBookingStep(3);
      return;
    }
    navigate(`/services/${service.id}`);
    setBookingStep(3);
  };
  const renderProgressBar = () => {
    const steps = ["Category", "Service", "Details", "Confirmation"];
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= bookingStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1 <= bookingStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`ml-2 text-sm ${
                  index + 1 <= bookingStep
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    index + 1 < bookingStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Button
          variant="outline"
          onClick={handleBackToHome}
          className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          variant="outline"
          onClick={handleBackToCategory}
          className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </div>
    );
  };
console.log({selectedService})
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* {renderNavigationButtons()} */}

      {/* <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-gray-900">
              Lex&Ledger
            </div>
          </div>
        </div>
      </header> */}
        <div className="max-w-4xl mx-auto px-6 py-12">
        {bookingStep < 4 && renderProgressBar()}
        {bookingStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Service Category
              </h1>
              <p className="text-lg text-gray-600">
                Select the type of service you need assistance with
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {serviceCategories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white/60 backdrop-blur-sm"
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <category.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-600"
                    >
                      {category.services.length} Services
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        {bookingStep === 3 && selectedService && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Details
              </h1>
              <p className="text-lg text-gray-600">
                Please provide your information to proceed
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="flex flex-col gap-5">
                <div>

                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-row items-center">

                        <ArrowLeft
                          className="w-4 h-4 mr-2 cursor-pointer"
                          onClick={handleBackToCategory}
                        />

                        <p>Service Summary</p>
                        </div>
                        <p className="text-blue-500 text-[12px] cursor-pointer" onClick={()=>navigate(`/service-detail/${selectedService.id}/${routeCategoryId}`)}>go to Service Detail</p>

                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {selectedService.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {selectedService.price}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-gray-600">
                        {selectedService.duration}
                      </Badge>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">
                        What's Included:
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Expert consultation
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Document preparation
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Follow-up support
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Compliance guidance
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                </div>
                  {selectedService.documents?.length > 0 && (
                    <div>
                      <Card className="border border-gray-100 !gap-2">
                        <CardHeader>
                          <CardTitle className="text-xl">
                            Documents Required
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <ul className="list-disc list-inside text-gray-700 text-sm">
                            {selectedService.documents.map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
              </div>

              <div>
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          name="company"
                          placeholder="Your company name (optional)"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Consultation Time
                        </label>
                        <div className="relative">
                          {/* <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
                          <Input
                            type="datetime-local"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="border-gray-200 "
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Preferred consultation time
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Requirements
                        </label>
                        <Textarea
                          name="requirements"
                          placeholder="Additional requirements or notes"
                          value={formData.requirements}
                          onChange={handleInputChange}
                          rows={3}
                          className="border-gray-200"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      >
                        Proceed to Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for choosing Lex&Ledger. We'll contact you shortly to
                confirm your consultation.
              </p>
            </div>

            <Card className="max-w-md mx-auto border border-gray-100">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Booking Details</h3>
                <div className="text-left space-y-2">
                  <p>
                    <span className="font-medium">Service:</span>{" "}
                    {selectedService.name}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span>{" "}
                    {selectedService.price}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleBackToHome}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingComponent;
