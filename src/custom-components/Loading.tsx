"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface LoadingPopupProps {
  isLoading: boolean
  message?: string
}

export default function LoadingPopup({ isLoading, message = "Loading..." }: LoadingPopupProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true)
    } else {
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
        isLoading ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-none"
      }`}
    >
      {/* Backdrop dengan animasi */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${
          isLoading ? "opacity-50" : "opacity-0"
        }`}
      />

      {/* Loading Content dengan animasi scale dan fade */}
      <div
        className={`relative z-10 bg-white rounded-lg p-8 shadow-xl max-w-sm w-full mx-4 transition-all duration-300 ease-out transform ${
          isLoading ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Loading Spinner dengan animasi yang lebih smooth */}
          <div className={`transition-all duration-300 ${isLoading ? "scale-100" : "scale-75"}`}>
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>

          {/* Loading Message dengan fade in */}
          <p
            className={`text-gray-700 text-center font-medium transition-all duration-300 delay-100 ${
              isLoading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {message}
          </p>

          {/* Progress dots dengan staggered animation */}
          <div
            className={`flex space-x-1 transition-all duration-300 delay-200 ${
              isLoading ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
