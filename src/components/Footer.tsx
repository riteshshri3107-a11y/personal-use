"use client";

import React from "react";
import Link from "next/link";
import { HiAcademicCap } from "react-icons/hi2";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <HiAcademicCap className="text-white text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">AARNAIT</span>
                <span className="text-xl font-bold text-blue-400"> AI</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Empowering the next generation with cutting-edge technology education.
              Future-proofing young minds through AI, coding, robotics, and more.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="text-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/courses" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Student Login", href: "/login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-3">
              {[
                "AI & Machine Learning",
                "Web Development",
                "Robotics & IoT",
                "Game Development",
                "Data Science",
                "Cybersecurity",
              ].map((course) => (
                <li key={course}>
                  <Link href="/courses" className="text-sm hover:text-blue-400 transition-colors">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">123 Tech Innovation Hub, Bangalore, India 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-blue-400 flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-blue-400 flex-shrink-0" />
                <span className="text-sm">hello@aarnaitai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AARNAIT AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
