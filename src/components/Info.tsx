import React, { useState, useEffect } from 'react';
import { Play, Upload, User, AlertCircle } from 'lucide-react';

export default function Info() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const fullText = `When it comes to efficient and user-friendly assignment writing assistance, the ChatGPT services shine through, offering an intuitive interface that allows users to engage with the platform effortlessly. Unlike other AI writing tools, ChatGPT provides a seamless experience where users can input their requirements and receive high-quality content tailored to their specific needs.

The platform's advanced language processing capabilities enable it to generate coherent, well-structured assignments across various academic disciplines. Whether you're working on essays, research papers, or creative writing projects, ChatGPT adapts to different writing styles and maintains consistency throughout the content creation process.

Users can easily refine their inputs and receive multiple iterations of their assignments, ensuring the final output meets their expectations. The tool's versatility extends beyond mere text generation, offering suggestions for improving clarity, coherence, and overall quality of the written work.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed of typing (30ms per character)

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, fullText]);

  // Function to format text into paragraphs
  const formatText = (text) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-3">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className='w-[80%] mx-auto'>
      <h1 className="text-4xl font-bold text-center mb-8 mt-12 text-gray-800">
        AI <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Resume Builder
        </span>
      </h1>

      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-700 p-6 flex items-center justify-center rounded-[1.75rem]">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-white space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue border border-blue-300 text-white text-sm font-medium">
              Create Top-Notch Resumes
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Avoid Mistakes at an Earlier and Break your Placement
            </h1>

            {/* Description */}
            <p className="text-lg text-purple-100 leading-relaxed max-w-lg">
              Smodin leads the pack in identifying AI written content. With over 98% accuracy at detecting human, AI, and mixed content, it's the only tool you need for spotting AI and keeping your work original.
            </p>

            {/* CTA Button */}
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-800 rounded-full text-white font-semibold transition-colors duration-200">
              <Play className="w-5 h-5 mr-2" />
              Start Now
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500/20 rounded-lg transform rotate-12 hidden lg:block"></div>
            <div className="absolute bottom-40 left-10 w-12 h-12 bg-purple-400/20 rounded-full hidden lg:block"></div>
          </div>

          {/* Right Content - Mockup */}
          <div className="relative">
            {/* Main Interface Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 font-semibold">AI Resume Builder Tool</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">:</span> {Math.min(100, Math.round((currentIndex / fullText.length) * 100))}%
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Sentence Breakdown
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{width: `${Math.min(100, (currentIndex / fullText.length) * 100)}%`}}
                  ></div>
                </div>

                {/* Text Content with Typewriter Effect */}
                <div className="space-y-4 mb-6">
                  <div className="text-sm text-gray-700 leading-relaxed min-h-[200px]">
                    {formatText(displayedText)}
                    {isTyping && (
                      <span className="inline-block w-0.5 h-5 bg-gray-700 animate-pulse ml-1"></span>
                    )}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{currentIndex}/{fullText.length}</span> Characters
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Analyze
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl transform rotate-12 opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl transform -rotate-12 opacity-60"></div>

            {/* Grid Pattern */}
            <div className="absolute top-8 left-8 w-12 h-12 opacity-20">
              <div className="grid grid-cols-3 gap-1 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}