import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

const HelpSupportPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend call can be added here

    // SweetAlert success message
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Your message has been submitted successfully. We will get back to you soon.",
      confirmButtonColor: "#3085d6",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">Help & Support</h1>
      <p className="text-gray-700 text-center mb-10">
        Need assistance? Contact us via WhatsApp, Email, or use the form below. We’ll get back to you shortly.
      </p>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg text-center transition">
          <FaWhatsapp className="text-3xl text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
          <p className="text-gray-600">+880 1234 567 890</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg text-center transition">
          <FaEnvelope className="text-3xl text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold text-lg mb-1">Email</h3>
          <p className="text-gray-600">support@hostelmate.com</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg text-center transition">
          <FaPhone className="text-3xl text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold text-lg mb-1">Phone</h3>
          <p className="text-gray-600">+880 9876 543 210</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-yellow-50 p-6 rounded-2xl shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-focus transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpSupportPage;
