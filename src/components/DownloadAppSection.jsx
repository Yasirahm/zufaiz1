import React from 'react';

const DownloadAppSection = () => {
  return (
    <div className="mb-10 text-white text-center p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-2">Get the Best Shopping Experience on Our App! 📲</h2>
      <p className="text-gray-300 mb-4">
        Shop smarter and faster with our official <span className="font-semibold">Zufiaz Store App</span>! 🚀  
        Enjoy seamless browsing, exclusive deals, and a hassle-free checkout experience—all at your fingertips.
      </p>
      
      <div className="flex flex-col space-y-2 text-gray-200">
        <p>🔹 <span className="font-semibold">Faster & Smoother Shopping</span></p>
        <p>🔹 <span className="font-semibold">Exclusive App-Only Discounts</span></p>
        <p>🔹 <span className="font-semibold">Easy Order Tracking & Updates</span></p>
      </div>

      <a href="/thezufaizsaneenstore1.apk" download
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-5 inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
      >
        📥 Download the App
      </a>
    </div>
  );
};

export default DownloadAppSection;
