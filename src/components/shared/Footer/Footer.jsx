import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-100 shadow-md pt-10 mt-10">
      <div className="footer px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Branding & Social Icons */}
        <aside>
          <Link to="/" className="text-2xl font-bold ">
            HostelMate
          </Link>
          <p className="text-sm mt-2">
            Your trusted hostel meal & review management system <br />
            Serving students since 2025
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="text-2xl hover:text-blue-400" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-sky-400" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a href="#" aria-label="Github">
              <FaGithub className="text-2xl hover:text-gray-400" />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/meals" className="link link-hover">
            Meals
          </Link>
          <Link to="/upcoming-meals" className="link link-hover">
            Upcoming Meals
          </Link>
          <Link to="/join-us" className="link link-hover">
            Join Us
          </Link>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title text-black">Legal</h6>
          <a href="#" className="link link-hover">
            Terms of use
          </a>
          <a href="#" className="link link-hover">
            Privacy policy
          </a>
          <a href="#" className="link link-hover">
            Cookie policy
          </a>
        </nav>
      </div>

      {/* Bottom Footer Line */}
      <div className="text-center py-4 mt-8 bg-base-100 text-sm  border-t border-gray-700">
        © 2025 HostelMate | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
