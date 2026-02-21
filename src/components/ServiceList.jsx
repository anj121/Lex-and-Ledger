import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight,
  faClock,
  faIndianRupee,
  faFileAlt,
  faStar,
  faCheckCircle,
  faFileText
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";

const ServiceList = ({ services, onServiceSelect, selectedServiceId, iconMapping }) => {
  // Helper function to get FontAwesome icon from Lucide icon
  const getFontAwesomeIcon = (lucideIcon) => {
    if (!lucideIcon) return faFileText;
    
    if (typeof lucideIcon === 'string') {
      return iconMapping?.[lucideIcon] || faFileText;
    }
    
    // If it's a Lucide icon component, try to get its name
    if (lucideIcon?.name) {
      return iconMapping?.[lucideIcon.name] || faFileText;
    }
    
    // If it's a component, try to get the display name
    if (lucideIcon?.displayName) {
      return iconMapping?.[lucideIcon.displayName] || faFileText;
    }
    
    return faFileText;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, idx) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <Card
            className={`cursor-pointer hover:shadow-2xl transition-all duration-500 group border-0 bg-white/90 backdrop-blur-sm hover:bg-white h-full ${
              selectedServiceId === service.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
            }`}
            onClick={() => onServiceSelect(service)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                    idx % 3 === 0
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                      : idx % 3 === 1
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-600"
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={getFontAwesomeIcon(service.icon)} 
                    className="h-7 w-7 text-white" 
                  />
                </div>
                <Badge 
                  variant="outline" 
                  className="text-xs font-semibold border-gray-200"
                >
                  {service.duration}
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
                  <span className="font-bold text-green-600 text-xl">
                    {service.price}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4" />
                  <span>{service.documents?.length || 0} documents required</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {service.documents?.slice(0, 3).map((doc, docIdx) => (
                    <div key={docIdx} className="flex items-center gap-2 text-xs text-gray-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3 text-green-500" />
                      <span className="line-clamp-1">{doc}</span>
                    </div>
                  ))}
                  {service.documents?.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{service.documents.length - 3} more documents
                    </div>
                  )}
                </div>
              </div>

              <Button
                className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                  selectedServiceId === service.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-600 hover:to-indigo-600 hover:text-white'
                }`}
              >
                {selectedServiceId === service.id ? 'Selected' : 'Select Service'}
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceList;
