import React from "react";

function TermsAndConditions() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <h2 className="text-6xl font-extrabold tracking-tight text-center">Terms and Conditions</h2>
        
        <div className="text-center">
          <p className="text-2xl text-gray-200 leading-relaxed">
            Welcome to SkillXChange, a platform dedicated to knowledge sharing where passion meets growth. By using our platform, you agree to these terms and conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <h3 className="text-3xl font-bold mb-6">User Information</h3>
            <p className="text-gray-300 leading-relaxed">
              Users are required to share their email, full name, and skills. This information is used for matching and can be accessed by matched users.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <h3 className="text-3xl font-bold mb-6">Privacy</h3>
            <p className="text-gray-300 leading-relaxed">
              We respect your privacy and protect your personal data. By sharing your information, you consent to its use as described.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <h3 className="text-3xl font-bold mb-6">User Conduct</h3>
            <p className="text-gray-300 leading-relaxed">
              Users are expected to interact respectfully. Any inappropriate behavior will result in account suspension or termination.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <h3 className="text-3xl font-bold mb-6">Limitation of Liability</h3>
            <p className="text-gray-300 leading-relaxed">
              SkillXChange is not responsible for disputes between users. We encourage amicable resolutions.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <h3 className="text-3xl font-bold mb-6">Changes to Terms</h3>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these terms. Users will be notified of significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
