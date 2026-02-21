import { ChevronDown, LogIn, UserPlus, UserCog, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold px-6 py-2 rounded-full shadow flex items-center gap-2"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        Login / Register
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-60 bg-white text-gray-800 rounded-xl shadow-xl py-2 z-50 transition-all">
          {/* <Link
            to="/login?role=expert"
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
          >
            <LogIn className="w-4 h-4 text-blue-500" />
            <span>Login</span>
          </Link> */}
          <Link
            to="/admin-login"
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
          >
            <User className="w-4 h-4 text-blue-500" />
            <span>Admin Login</span>
          </Link>

          <Link
            to="/signup"
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
          >
            <UserPlus className="w-4 h-4 text-green-500" />
            <span>Signup</span>
          </Link>

          <Link
            to="/expert"
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
          >
            <UserCog className="w-4 h-4 text-purple-500" />
            <span>Expert Registration</span>
          </Link>
        </div>
      )}
    </div>
  );
}
