import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import ImmediateService from "./pages/ImmediateService.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import "./App.css";
import Old from "./pages/old.jsx";
import BundlePage from "./pages/BundlePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookingStepper from "./pages/BookingStepper.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import About from "./pages/About.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refund from "./pages/Refund.jsx";
import ExpertRegistration from "./components/ExpertRegistration.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import OTPVerification from "./pages/otp.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ProfileVerification from "./components/ProfileVerification.jsx";
import PaySubscription from "./components/PaySubscription.jsx";
import BankDetails from "./components/BankDetails.jsx";
import AadharPanVerification from "./components/AadharPanVerification.jsx";
import SubscriptionModel from "./components/SubscriptionModel.jsx";
import RevenueModelSelection from "./components/RevenueModelSelection.jsx";
import OTPAuthentication from "./components/OTPAuthentication.jsx";
import MyChatBot from "./components/Mychatbot.jsx";
import { StepperProvider, useStepperContext } from "./components/stepper.jsx";
import { Box, Container } from "@mui/material";
import RegistrationStepper from "./components/registrationWrapper.jsx";
import BundleService from "./components/BundleService.jsx";
import { ServiceDetailPage } from "./components/newService.jsx";

// Layout component to handle navbar and footer
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we should show back button
  const showBackButton = location.pathname !== "/";

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={showBackButton} onBackClick={handleBackClick} />
      <main className="flex-1">{children}</main>

      <button
        onClick={() => navigate("/immediate-service")}
        className="emergency-button"
      >
        🚨 Immediate Lawyer - 10 min
      </button>

      <Footer />
    </div>
  );
};
const AppLayout = ({ children }) => {
  const { shouldShowStepper, activeStep, steps } = useStepperContext();
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      {shouldShowStepper && (
        <Container maxWidth="lg" sx={{ pt: 2 }}>
          <RegistrationStepper activeStep={activeStep} steps={steps} />
        </Container>
      )}
      {children}
    </Box>
  );
};
// Main App component
function App() {
  return (
    <Router>
            <Toaster position="top-right" reverseOrder={false} />

      <ScrollToTop />
      <StepperProvider>
          <Layout>
                    <AppLayout>

            <Routes>
              {/* Home Page */}
              <Route path="/" element={<HomePage />} />
              <Route path="/old" element={<Old />} />
              <Route path="/about" element={<About />} />
              <Route path="/expert" element={<ExpertRegistration />} />
              <Route path="/dashboard" element={<AdminPanel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp" element={<OTPVerification />} />

              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund" element={<Refund />} />

              {/* Service Routes */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:categoryId" element={<ServiceDetail />} />
              <Route path="/bundles/:categoryId" element={<BundleService />} />

              {/* Immediate Service */}
              <Route path="/immediate-service" element={<ImmediateService />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogPage />} />

              {/* Catch-all route - redirect to home */}
              <Route path="*" element={<HomePage />} />
              <Route path="/bundles" element={<BundlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/getStarted" element={<BookingStepper />} />
              <Route
                path="/getStarted/:categoryId"
                element={<BookingStepper />}
              />
                <Route
                path="/service-detail/:serviceId/:categoryId"
                element={<ServiceDetailPage />}
              />

              <Route path="/blog/:blogId" element={<BlogDetail />} />
              <Route
                path="/otp-authentication"
                element={<OTPAuthentication />}
              />
              <Route
                path="/revenue-model"
                element={<RevenueModelSelection />}
              />
              <Route
                path="/subscription-model"
                element={<SubscriptionModel />}
              />
              <Route
                path="/aadhar-pan-verification"
                element={<AadharPanVerification />}
              />
              <Route path="/bank-details" element={<BankDetails />} />
              <Route path="/pay-subscription" element={<PaySubscription />} />
              <Route
                path="/profile-verification"
                element={<ProfileVerification />}
              />
            </Routes>
        </AppLayout>
          </Layout>
      </StepperProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <MyChatBot />
      </div>
    </Router>
  );
}

export default App;
