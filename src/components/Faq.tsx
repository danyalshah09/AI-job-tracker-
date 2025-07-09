"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const JobTrackerFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does the AI Resume Generator work?",
      answer: "Our AI Resume Generator analyzes job descriptions and creates tailored resumes that match specific requirements. It optimizes keywords, formats content professionally, and ensures ATS compatibility for better job application success rates."
    },
    {
      question: "Can I track multiple job applications simultaneously?",
      answer: "Yes, you can track unlimited job applications. The dashboard provides a comprehensive overview of all your applications, including status updates, interview schedules, follow-up reminders, and detailed analytics."
    },
    {
      question: "What makes the cold email templates effective?",
      answer: "Our cold email templates are crafted by recruitment experts and tested for high response rates. They're personalized for different industries, roles, and company sizes, helping you stand out in recruiter inboxes."
    },
    {
      question: "How does the emotional wellness feature support job seekers?",
      answer: "The emotional wellness feature provides mental health resources, stress management techniques, and motivational content specifically designed for job seekers. It includes mood tracking, meditation guides, and coping strategies for rejection and interview anxiety."
    },
    {
      question: "What insights does the AI analytics provide?",
      answer: "AI analytics offers data-driven insights including application success rates, optimal application times, industry trends, salary benchmarks, and personalized recommendations to improve your job search strategy."
    },
    {
      question: "Is my personal data secure on the platform?",
      answer: "Absolutely. We use enterprise-grade encryption, comply with data protection regulations, and never share your personal information with third parties. Your resumes, applications, and personal data are fully secure and private."
    },
    {
      question: "Can I integrate with job boards and LinkedIn?",
      answer: "Yes, our platform integrates with major job boards like Indeed, LinkedIn, Glassdoor, and others. You can import job listings, auto-fill applications, and sync your professional profiles for a seamless experience."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our mobile app is available for both iOS and Android. You can track applications, receive notifications, schedule interviews, and access all features on the go with full synchronization across devices."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 rounded-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our job tracking platform and how it can accelerate your career journey.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions? We're here to help.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full ">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default JobTrackerFAQ