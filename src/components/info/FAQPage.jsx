import React from "react";

const FAQPage = () => {
  const faqs = [
    { q: "How to join HostelMate?", a: "Click on Join Us in the menu and fill the registration form." },
    { q: "How can I check my meals?", a: "Go to Meals or Upcoming Meals page to see daily menu." },
    { q: "Can I upgrade my membership?", a: "Yes! Visit Membership section to upgrade." },
  ];

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border-l-4 border-primary bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-gray-800 mb-2">{f.q}</h2>
            <p className="text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
