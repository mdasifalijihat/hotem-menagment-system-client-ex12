import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

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
            <a href="#" aria-label="Facebook" className="p-2 bg-blue-100 rounded-full hover:bg-blue-500 hover:text-white transition">
              <FaFacebook className="text-xl" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 bg-sky-100 rounded-full hover:bg-sky-500 hover:text-white transition">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 bg-pink-100 rounded-full hover:bg-pink-500 hover:text-white transition">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" aria-label="Github" className="p-2 bg-gray-100 rounded-full hover:bg-gray-700 hover:text-white transition">
              <FaGithub className="text-xl" />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/meals" className="text-gray-600 hover:text-blue-500 transition">Meals</Link>
            </li>
            <li>
              <Link to="/upcoming-meals" className="text-gray-600 hover:text-blue-500 transition">Upcoming Meals</Link>
            </li>
            <li>
              <Link to="/join-us" className="text-gray-600 hover:text-blue-500 transition">Join Us</Link>
            </li>
          </ul>
        </nav>

        {/* Support */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Support</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">Help Center</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">Contact Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">FAQs</a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="text-lg font-semibold text-gray-800 mb-4">Legal</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">Terms of Use</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">Cookie Policy</a>
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
