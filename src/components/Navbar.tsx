"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiBook, FiHome } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi2";

export default function Navbar() {
  const { isAuthenticated, student, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <HiAcademicCap className="text-white text-xl" />
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">AARNAIT</span>
              <span className="text-xl font-bold text-gray-800"> AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {student?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{student?.name?.split(" ")[0]}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{student?.name}</p>
                      <p className="text-xs text-gray-500">{student?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiHome className="text-blue-500" /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard/courses"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiBook className="text-green-500" /> My Courses
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiUser className="text-purple-500" /> Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { logout(); setProfileOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm !px-5 !py-2.5">
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col gap-1">
              <Link href="/" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/courses" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                Courses
              </Link>
              <Link href="/about" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <hr className="my-2 border-gray-100" />
                  <Link href="/dashboard" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2 border-gray-100" />
                  <Link href="/login" className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                  <Link href="/register" className="mx-4 mt-2 btn-primary text-center text-sm" onClick={() => setMobileOpen(false)}>
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
