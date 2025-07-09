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
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Land Your{' '}
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to streamline your job search and maximize your success rate
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        {/* Infinite scroll container */}
        <div className="flex animate-scroll-left">
          {duplicatedData.map((item, index) => (
            <div
              key={`item-${index}`}
              className="flex-shrink-0 w-96 mx-4 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 text-sm font-semibold">
                    {item.stat}
                  </div>
                </div>
              </div>
            </div>
          ))}
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

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MovingSlider;