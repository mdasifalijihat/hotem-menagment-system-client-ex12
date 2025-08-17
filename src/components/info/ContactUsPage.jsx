import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("Sent!", "Your message has been submitted.", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">Contact Us</h1>
      <p className="text-gray-700 mb-6 text-center">Have questions? Send us a message!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={5} required />
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-focus transition">Submit</button>
      </form>
    </div>
  );
};

export default ContactUsPage;
