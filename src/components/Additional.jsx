import React, { useState } from 'react';

export default function Additional() {
  const [isImageClicked, setIsImageClicked] = useState(false);

  return (
    <div className="w-full bg-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 mt-12 text-gray-800">
        Our Emotional Model helps you stay <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            motivated
        </span>
      </h1>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content - Photo */}
        <div className="relative">
          {/* Purple gradient platform */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-[50px] "></div>

          {/* Photo container */}
          <div className="relative mx-4 cursor-pointer" onClick={() => setIsImageClicked(!isImageClicked)}>
            {/* Photo with blue background overlay */}
            <div className="relative bg-white rounded-2xl overflow-hidden ">
              {/* Blue square background that appears on click */}
              <div className={`absolute inset-0 bg-blue-500 transition-opacity duration-300 ${isImageClicked ? 'opacity-20' : 'opacity-0'}`}></div>

              {/* Person photo */}
              <div className="relative w-full h-80">
                <img
                  src="./jobsearch.jpg"
                  alt="Person"
                  className="w-full h-full object-cover"
                />

                {/* Click indicator */}
                <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Fallback placeholder if image fails to load */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl" style={{ display: 'none' }}>
              <div className="w-48 h-48 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 14.1 11 13 11V22H11V11C9.9 11 9 10.1 9 9V7L3 7V9H1V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9H21Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Small decorative elements */}
          <div className="absolute top-4 right-0 w-3 h-3 bg-pink-400 rounded-full"></div>
          <div className="absolute bottom-16 left-0 w-2 h-2 bg-purple-400 rounded-full"></div>
        </div>

        {/* Right Content - Text */}
        <div className="space-y-6">
          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
    We Acknowledge how frustrating it is to find your first job and we want you to skip all those experience and set your dreams.Our Emotional enhances the user experience and lets you stay motivated to your goals even in your hard times. </p>

        </div>
      </div>
    </div>
  );
}