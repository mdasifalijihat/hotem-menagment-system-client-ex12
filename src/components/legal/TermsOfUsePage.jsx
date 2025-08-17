import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">Terms of Use</h1>
      <p className="text-gray-700">Welcome to HostelMate! By using our platform, you agree to the following terms:</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Use the platform responsibly and follow the rules.</li>
        <li>Do not share your login credentials with others.</li>
        <li>All content provided is for informational purposes only.</li>
      </ul>
    </div>
  );
};

export default TermsOfUsePage;
