"use client"
import { useState } from "react"
// import { Link } from "react-router-dom" // Remove this import for artifact
import { Menu, X, Home, User, Briefcase, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Header = ({ setShowAuth, setAuthTab }: { setShowAuth: (show: boolean) => void, setAuthTab: (tab: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J.</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Job Tracker Pro</span>
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
          <Button onClick={() => {setShowAuth(true); setAuthTab("login");}} className="w-full border border-black bg-transparent hover:bg-gray-200 text-black hover:to-blue-700 py-2 rounded-full transition-all duration-300 shadow-lg">
  Login
</Button>
            <Button onClick={() => {setShowAuth(true); setAuthTab("signup");}} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Signup
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 hover:bg-green-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-3">

  <Button onClick={() => {setShowAuth(true); setAuthTab("login");}} className="w-full border border-black bg-transparent hover:bg-green-200 text-black py-2 rounded-full transition-all duration-300 shadow-lg">
  Login
</Button>

              <Button onClick={() => {setShowAuth(true); setAuthTab("signup");}} className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-full transition-all duration-300 shadow-lg">
                Signup
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header