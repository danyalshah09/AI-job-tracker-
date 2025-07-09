"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Search, Target, TrendingUp, Users, CheckCircle, ArrowRight, Play, FileText, Mail, Brain, Heart, Calendar, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const Tools = () => {
  const [text, setText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const stats = [
    { number: "10K+", label: "Jobs Tracked", icon: <Target className="w-5 h-5" /> },
    { number: "85%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "5K+", label: "Happy Users", icon: <Users className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <CheckCircle className="w-5 h-5" /> },
  ]

  const features = [
    { title: "AI Resume", subtitle: "Generator", description: "Create tailored resumes instantly with AI optimization", icon: <FileText className="w-8 h-8" /> },
    { title: "Cold Email", subtitle: "Templates", description: "Professional outreach templates for job applications", icon: <Mail className="w-8 h-8" /> },
    { title: "AI Insights", subtitle: "Analytics", description: "Smart data analysis for better job search decisions", icon: <Brain className="w-8 h-8" /> },
    { title: "Emotional", subtitle: "Wellness", description: "Mental health support during your job search journey", icon: <Heart className="w-8 h-8" /> },
    { title: "Interview", subtitle: "Scheduler", description: "Organize and manage all your interview appointments", icon: <Calendar className="w-8 h-8" /> },
    { title: "Progress", subtitle: "Tracking", description: "Monitor your application status and success metrics", icon: <BarChart className="w-8 h-8" /> },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          What's in there for <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          You</span>
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 relative">
              <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {feature.subtitle}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tools