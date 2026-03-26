"use client";

import React, { useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FiSearch, FiClock, FiUsers, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi2";

export default function CoursesPage() {
  const { student, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to enroll in courses");
      return;
    }
    if (student?.enrolledCourses.includes(courseId)) {
      toast("You're already enrolled in this course!", { icon: "ℹ️" });
      return;
    }
    // In a real app, this would call an API
    const stored = localStorage.getItem("aarnait_student");
    if (stored) {
      const data = JSON.parse(stored);
      data.enrolledCourses = [...(data.enrolledCourses || []), courseId];
      data.progress = { ...data.progress, [courseId]: 0 };
      localStorage.setItem("aarnait_student", JSON.stringify(data));
      toast.success("Successfully enrolled! Go to your dashboard to start learning.");
      // Force reload to update context
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Expert-crafted courses designed to prepare the next generation for the future of technology.
            </p>
            <div className="max-w-lg mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => {
            const isEnrolled = student?.enrolledCourses.includes(course.id);
            return (
              <div key={course.id} id={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                <div className={`h-48 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                  <HiAcademicCap className="text-white/30 text-8xl group-hover:scale-110 transition-transform" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-semibold">{course.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-semibold">{course.ageGroup}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><FiClock size={14} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><FiUsers size={14} /> {course.sessions} Sessions</span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    {course.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
                        <FiCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="text-2xl font-bold gradient-text">${course.price}</p>
                    {isEnrolled ? (
                      <Link href="/dashboard/courses" className="flex items-center gap-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                        <FiCheckCircle /> Enrolled
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="btn-primary !px-5 !py-2 text-sm flex items-center gap-1"
                      >
                        Enroll Now <FiArrowRight />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
