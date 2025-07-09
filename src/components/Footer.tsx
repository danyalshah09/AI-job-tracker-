'use client'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center text-sm text-gray-500">
        <span>&copy; {new Date().getFullYear()} Job Tracker Pro. All rights reserved.</span>
        <div className="flex space-x-4">
          <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
