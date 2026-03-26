"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/lib/data";
import { FiBook, FiPlay, FiClock, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

export default function MyCoursesPage() {
  const router = useRouter();
  const { student, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const enrolledCourseData = courses.filter((c) => student.enrolledCourses.includes(c.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
        </div>

        {enrolledCourseData.length > 0 ? (
          <div className="space-y-6">
            {enrolledCourseData.map((course) => {
              const progress = student.progress[course.id] || 0;
              const completedSessions = Math.round((progress / 100) * course.sessions);
              return (
                <div key={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className={`md:w-64 h-40 md:h-auto bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <FiBook className="text-white/40 text-6xl" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 mt-2">{course.title}</h3>
                        </div>
                        {progress === 100 && (
                          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <FiCheckCircle size={14} />
                            <span className="text-xs font-semibold">Completed</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{course.description}</p>

                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><FiClock /> {course.duration}</span>
                        <span>{completedSessions}/{course.sessions} Sessions</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{progress}%</span>
                        <button className="btn-primary !px-5 !py-2 text-sm flex items-center gap-1">
                          <FiPlay size={14} /> Continue
                        </button>
                      </div>

                      {/* Curriculum preview */}
                      <div className="mt-6 border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Curriculum</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {course.curriculum.slice(0, 6).map((item, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                                idx < completedSessions ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"
                              }`}
                            >
                              {idx < completedSessions ? (
                                <FiCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                              ) : (
                                <div className="w-3 h-3 border border-gray-300 rounded-full flex-shrink-0" />
                              )}
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FiBook className="mx-auto text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Courses Yet</h3>
            <p className="text-gray-500 mb-6">
              You haven&apos;t enrolled in any courses yet. Browse our catalog to get started!
            </p>
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
