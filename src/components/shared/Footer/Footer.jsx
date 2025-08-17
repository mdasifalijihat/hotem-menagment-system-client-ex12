import React from "react";
import { Link } from "react-router-dom"; // react-router-dom import
import { 
  FaFacebook, FaTwitter, FaInstagram, FaGithub, 
  FaHome, FaUtensils, FaCalendarAlt, FaUserPlus, 
  FaLifeRing, FaPhone, FaQuestionCircle, FaFileContract, FaShieldAlt, FaCookieBite, 
  FaLinkedin
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-50 pt-12 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Branding & Social Icons */}
        <aside>
          <Link to="/" className="text-3xl font-extrabold text-blue-600">
            HostelMate
          </Link>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            Your trusted hostel meal & review management system <br />
            Serving students since 2025
          </p>
          <div className="flex gap-4 mt-5">
            <a href="https://www.facebook.com/mdasifalijihat9" target="_blank" aria-label="Facebook" className="p-2 bg-blue-100 rounded-full hover:bg-blue-500 hover:text-white transition">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://x.com/mdasifalijihat0" target="_blank" aria-label="Twitter" className="p-2 bg-sky-100 rounded-full hover:bg-sky-500 hover:text-white transition">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/md-asif-ali-jihat-976281217/" target="_blank" aria-label="Linkedin" className="p-2 bg-pink-100 rounded-full hover:bg-pink-500 hover:text-white transition">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://github.com/mdasifalijihat" target="_blank" aria-label="Github" className="p-2 bg-gray-100 rounded-full hover:bg-gray-700 hover:text-white transition">
              <FaGithub className="text-xl" />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaHome /> <Link to="/" className="text-gray-600 hover:text-blue-500 transition">Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaUtensils /> <Link to="/meals" className="text-gray-600 hover:text-blue-500 transition">Meals</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaCalendarAlt /> <Link to="/upcoming-meals" className="text-gray-600 hover:text-blue-500 transition">Upcoming Meals</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaUserPlus /> <Link to="/join-us" className="text-gray-600 hover:text-blue-500 transition">Join Us</Link>
            </li>
          </ul>
        </nav>

        {/* Support */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Support</h6>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaLifeRing /> <Link to="/help" className="text-gray-600 hover:text-blue-500 transition">Help Center</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> <Link to="/contact-us" className="text-gray-600 hover:text-blue-500 transition">Contact Us</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaQuestionCircle /> <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition">FAQs</Link>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Legal</h6>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaFileContract /> <Link to="/terms-of-use" className="text-gray-600 hover:text-blue-500 transition">Terms of Use</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaShieldAlt /> <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-500 transition">Privacy Policy</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaCookieBite /> <Link to="/cookie-policy" className="text-gray-600 hover:text-blue-500 transition">Cookie Policy</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="text-center py-5 mt-10 bg-gray-50 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} HostelMate | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
