import React from 'react';
import {
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Building,
  Send,
  Eye
} from 'lucide-react';

const MovingSlider = () => {
  const jobTrackingData = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Application Tracking",
      description: "Monitor 500+ applications with real-time status updates",
      stat: "95% Success Rate"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Interview Analytics",
      description: "Track interview performance and get insights for improvement",
      stat: "3x More Interviews"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Smart Scheduling",
      description: "Never miss a deadline with automated reminders and calendar sync",
      stat: "Zero Missed Deadlines"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location Insights",
      description: "Find opportunities in your preferred locations worldwide",
      stat: "200+ Cities Covered"
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Salary Tracking",
      description: "Compare offers and negotiate better compensation packages",
      stat: "25% Higher Offers"
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Company Research",
      description: "Deep insights into company culture, reviews, and growth potential",
      stat: "10,000+ Companies"
    },
    {
      icon: <Send className="w-5 h-5" />,
      title: "Auto Follow-ups",
      description: "Intelligent follow-up suggestions to keep applications active",
      stat: "40% Response Rate"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Application Views",
      description: "See when recruiters view your applications and respond strategically",
      stat: "Real-time Tracking"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Time Analytics",
      description: "Optimize your job search with detailed time tracking and insights",
      stat: "50% Faster Results"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Success Metrics",
      description: "Track your progress with comprehensive analytics and reporting",
      stat: "Data-Driven Results"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Goal Achievement",
      description: "Set and track job search goals with milestone celebrations",
      stat: "85% Goal Success"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Network Building",
      description: "Connect with industry professionals and expand your network",
      stat: "5x Network Growth"
    }
  ];

  // Duplicate the data to create seamless infinite scroll
  const duplicatedData = [...jobTrackingData, ...jobTrackingData];

  return (
    <div className="w-[70%] mx-auto  dark:bg-gray-900 py-16 overflow-hidden ">
      <div className="container mx-auto px-6 mb-8 ">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Land Your <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">

          Dream Job</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">

            Powerful features designed to streamline your job search and maximize your success rate
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className=" dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="relative">
            {/* First row - moving left */}
            <div className="flex animate-scroll-left mb-8">
              {duplicatedData.map((item, index) => (
                <div
                  key={`left-${index}`}
                  className="flex-shrink-0 w-96 mx-4 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                        {item.stat}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row - moving right */}
            <div className="flex animate-scroll-right">
              {duplicatedData.reverse().map((item, index) => (
                <div
                  key={`right-${index}`}
                  className="flex-shrink-0 w-96 mx-4 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                        {item.stat}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MovingSlider;