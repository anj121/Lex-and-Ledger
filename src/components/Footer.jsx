import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Calculator,
  Zap,
  FileText,
} from "lucide-react";
import ServiceCategoryGrid from "./ServiceCategoryGrid";
import { serviceCategories } from "@/static/service-data";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between gap-20">
        <div className="flex flex-col gap-8">
          {/* Company Info */}
          <div className="max-w-xs">
            <h3 className="text-xl font-semibold mb-4">Lex&Ledger</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for comprehensive legal and financial
              services. Expert guidance for businesses and individuals.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@lexledger.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/company" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company & Compliance
                </Link>
              </li>
              <li>
                <Link to="/services/tax" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Tax Services
                </Link>
              </li>
              <li>
                <Link to="/immediate-service" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Immediate Services
                </Link>
              </li>
              <li>
                <Link to="/services/legal" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Legal Services
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  target="_blank"
  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  target="_blank"
  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  target="_blank"
  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  target="_blank"
  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  // target="_blank"
  // rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link

                // target="_blank"
  // rel="noopener noreferrer" 
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/disclaimer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li> */}
              <li>
                <Link
                  to="/refund"
                  // target="_blank"
  // rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ServiceCategoryGrid serviceCategories={serviceCategories} />
</div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Lex&Ledger. All rights reserved. | Designed with care for
            your business needs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
