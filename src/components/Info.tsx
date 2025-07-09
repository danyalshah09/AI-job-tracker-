import React from 'react';
import { Play, Upload, User, AlertCircle } from 'lucide-react';

export default function Info() {
  return (
    <div className='w-full px-10 border-2'>
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-700  p-6 flex items-center justify-center rounded-lg">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue border border-blue-300 text-white hover:bg-blue-300 text-sm font-medium">
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
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r bg-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full text-white font-semibold transition-colors duration-200">
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
                <h3 className="text-gray-900 font-semibold">AI Detector Tool</h3>
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
                  <span className="font-medium">AI Detected:</span> 100%
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Sentence Breakdown
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>

              {/* Text Content */}
              <div className="space-y-4 mb-6">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    When it comes to efficient and user-friendly assignment writing assistance, the ChatGPT services shine through, offering an intuitive interface that allows users to engage with the platform effortlessly. Unlike other AI writing tools, ChatGPT provides a seamless experience where users can input their requirements and receive high-quality content tailored to their specific needs.
                  </p>
                  <p className="mb-3">
                    The platform's advanced language processing capabilities enable it to generate coherent, well-structured assignments across various academic disciplines. Whether you're working on essays, research papers, or creative writing projects, ChatGPT adapts to different writing styles and maintains consistency throughout the content creation process.
                  </p>
                  <p>
                    Users can easily refine their inputs and receive multiple iterations of their assignments, ensuring the final output meets their expectations. The tool's versatility extends beyond mere text generation, offering suggestions for improving clarity, coherence, and overall quality of the written work.
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">0/600</span> Characters
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Analyze
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transform rotate-12 opacity-80"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl transform -rotate-12 opacity-60"></div>

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