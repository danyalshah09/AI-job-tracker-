"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Search, Target, TrendingUp, Users, CheckCircle, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SpiderWebBackground from "./spider-web-background"

const Hero = () => {
  const [text, setText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const jobTrackingPhrases = [
    "Track Every Application",
    "Land Your Dream Job",
    "Organize Your Job Hunt",
    "Never Miss an Opportunity",
    "Accelerate Your Career",
  ]

  useEffect(() => {
    const currentPhrase = jobTrackingPhrases[currentIndex]
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex < currentPhrase.length) {
        setText(currentPhrase.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              setText(currentPhrase.slice(0, charIndex - 1))
              charIndex--
            } else {
              clearInterval(deleteInterval)
              setCurrentIndex((prev) => (prev + 1) % jobTrackingPhrases.length)
            }
          }, 50)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentIndex])

  const stats = [
    { number: "10K+", label: "Jobs Tracked", icon: <Target className="w-5 h-5" /> },
    { number: "85%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "5K+", label: "Happy Users", icon: <Users className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <CheckCircle className="w-5 h-5" /> },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Spider Web Background */}
      <SpiderWebBackground />

      {/* Animated Background Elements */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">



            <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-300 mb-8 h-16 flex items-center justify-center">
              <span className="border-r-2 border-blue-600 animate-pulse pr-2 font-semibold">{text}</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your job search with our intelligent tracking system.
            <span className="text-blue-600 font-semibold"> Organize applications</span>,
            <span className="text-blue-500 font-semibold"> track progress</span>, and
            <span className="text-blue-700 font-semibold"> land your dream job</span> faster than ever.
          </p>



          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button
  size="lg"
  className="group px-10 py-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-semibold"
>
  Start Tracking Jobs
  <Target className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-4" />
</Button>

<Button
  variant="outline"
  size="lg"
  className="group px-10 py-6 border-2 border-blue-600 text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 text-lg font-semibold bg-transparent"
>
  <Play className="mr-2 w-5 h-5 transform transition-transform duration-300 " />
  Watch Demo
</Button>

          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Trusted by job seekers at top companies</p>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero