"use client"
import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Image Analyser</h1>
            </div>
            {/* menus */}
            <nav>
              <ul className="flex space-x-4">
                <Link 
                  href={"#"} 
                  className="text-gray-600 hover:text-blue-600 hover:font-bold transition duration-150 ease-in-out"
                >
                  Home
                </Link>
                <Link 
                  href={"#how-it-works"} 
                  className="text-gray-600 hover:text-blue-600 hover:font-bold transition duration-150 ease-in-out"
                >
                  How it works
                </Link>
                <Link 
                  href={"#features"} 
                  className="text-gray-600 hover:text-blue-600 hover:font-bold transition duration-150 ease-in-out"
                >
                  Features
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header