import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import AuthDropdown from "./AuthDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faGavel, 
  faBoxes, 
  faBookOpen, 
  faEnvelope,
  faBars,
  faDashboard
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    sessionStorage.removeItem("serviceId");
    sessionStorage.removeItem("serviceCategoryId");
    sessionStorage.removeItem("bookingStep");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home", icon: faHome },
    { path: "/services", label: "Services", icon: faGavel },
    { path: "/bundles", label: "Bundles", icon: faBoxes },
    { path: "/blog", label: "Blog", icon: faBookOpen },
    { path: "/contact", label: "Contact", icon: faEnvelope },
  ];

  // Add dashboard link for logged-in users
  const allNavItems = isLoggedIn ? [
    ...navItems,
    { path: "/dashboard", label: "Dashboard", icon: faDashboard }
  ] : navItems;

  return (
    <>
      {/* Main Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? "bg-white/40 backdrop-blur-2xl shadow-2xl border border-white/50 mx-4 mt-4 rounded-2xl" 
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className={`${
          isDashboardRoute ? "max-w-8xl" : "max-w-6xl"
        } mx-auto px-6 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-4"
        }`}>
          <div className={`flex items-center transition-all duration-500 ${
            isScrolled ? "justify-center gap-12" : "justify-between"
          }`}>
            
            {/* Enhanced Logo - Always Visible */}
            <div className={`flex items-center transition-all duration-500 ${
              isScrolled ? "scale-110" : "scale-100"
            }`}>
              <Link
                to="/"
                className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                {/* Professional Logo Icon */}
                <div className="relative">
                  <div className={`${
                    isScrolled ? "w-12 h-12" : "w-10 h-10"
                  } bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 border border-slate-200/30`}>
                    {/* Legal Scale Icon */}
                    <div className={`relative ${
                      isScrolled ? "w-6 h-6" : "w-5 h-5"
                    } transition-all duration-500`}>
                      {/* Scale Bar */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-slate-200"></div>
                      {/* Left Scale Pan */}
                      <div className="absolute top-3 left-0 w-2 h-1 bg-slate-200 rounded-full"></div>
                      {/* Right Scale Pan */}
                      <div className="absolute top-3 right-0 w-2 h-1 bg-slate-200 rounded-full"></div>
                      {/* Center Support */}
                      <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-2.5 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                  {/* Financial Document Badge */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Enhanced Logo Text */}
                <div className={`flex items-center gap-1 transition-all duration-500 ${
                  isScrolled ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}>
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                    Lex
                  </span>
                  <span className="text-sm text-slate-500 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    &
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    Ledger
                  </span>
                  {isDashboardRoute && (
                    <span className="ml-2 text-xs font-semibold text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-0.5 rounded-full border border-blue-200/50 shadow-sm">
                      Admin
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* CENTER - Navigation Links - Always Visible with Spacing */}
            <nav className={`hidden md:flex items-center gap-1 transition-all duration-500 ${
              isScrolled ? "opacity-100 scale-100" : "opacity-100 scale-100"
            }`}>
              {allNavItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive 
                        ? "bg-blue-100/50" 
                        : isScrolled 
                          ? "text-gray-800 hover:text-blue-600 hover:bg-white/20" 
                          : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
                    }`}
                  >
                    {isScrolled ? (
                      <span className="flex items-center gap-3">
                        <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT - Action Buttons - Always Visible with Spacing */}
            <div className={`flex items-center gap-3 transition-all duration-500 ${
              isScrolled ? "opacity-100 scale-100" : "opacity-100 scale-100"
            }`}>
              {/* Immediate Service Button */}
              <Link
                to="/immediate-service"
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  location.pathname === "/immediate-service"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <span className="hidden sm:inline">Immediate</span>
                <span className="sm:hidden">10 min</span>
              </Link>

              {/* Auth Section */}
              {!isDashboardRoute ? (
                isLoggedIn ? (
                  <Button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-slate-700 text-white hover:bg-slate-800 rounded-full transition-colors duration-200"
                  >
                    Logout
                  </Button>
                ) : (
                  <AuthDropdown />
                )
              ) : (
                <Button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-slate-700 text-white hover:bg-slate-800 rounded-full transition-colors duration-200"
                >
                  Logout
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              </button>
            </div>


          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
            <div className="px-4 py-3 space-y-1">
              {allNavItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      isActive 
                        ? "text-blue-700 bg-blue-50" 
                        : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className={`h-16 transition-all duration-300 ${
        isScrolled ? "h-14" : "h-16"
      }`}></div>
    </>
  );
};

export default Navbar;
