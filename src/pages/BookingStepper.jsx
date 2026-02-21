import React, { useEffect, useState } from "react";
import BookingComponent from "../components/BookingComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { serviceCategories } from "@/static/service-data";

const BookingPage = () => {
  const navigate = useNavigate();
  const { categoryId: routeCategoryId ,serviceId: routeServiceId} = useParams();

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const serviceId = sessionStorage.getItem("serviceId");
    const categoryId = sessionStorage.getItem("serviceCategoryId");
    const step = sessionStorage.getItem("bookingStep");

    if (routeCategoryId) {
      const category = serviceCategories.find(cat => cat.id === routeCategoryId);

      if(routeServiceId){
        const selectedService=category.services.find((ser)=>ser.id.toString()===routeServiceId.toString());
        if(selectedService){
          setSelectedService({...selectedService,categoryTitle:category.title,categoryId:category.id}); 
          setBookingStep(3); 
          return
        }
      }
      const selectedService=category.services.find((ser)=>ser.id.toString()===serviceId.toString());
      if (category && category.services.length > 0) {
        setSelectedService({...selectedService,categoryTitle:category.title,categoryId:category.id}); 
        setBookingStep(3); 
        window.scrollTo({ top: 0, behavior: "smooth" });

      }
      return; 
    }
    if (serviceId && categoryId) {
      const category = serviceCategories.find(cat => cat.id === categoryId);
      if (category) {
        const service = category.services.find(srv => srv.id === parseInt(serviceId));
        if (service) setSelectedService({...service,categoryTitle:category.title,categoryId:category.id});
      }
    }else{
      setBookingStep(1);
    }
  }, [routeCategoryId]);
  const handleBackToHome = () => navigate("/");
  const handleBackToCategory = () => navigate("/services");
  return (
    <BookingComponent
      selectedService={selectedService}
      bookingStep={bookingStep}
      setBookingStep={setBookingStep}
      handleBackToHome={handleBackToHome}
      handleBackToCategory={handleBackToCategory}
      routeCategoryId={routeCategoryId}
    />
  );
};

export default BookingPage;
