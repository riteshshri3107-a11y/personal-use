"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/lib/data";
import {
  FiBook, FiClock, FiAward, FiTrendingUp, FiCalendar, FiArrowRight,
  FiPlay, FiCheckCircle, FiTarget,
} from "react-icons/fi";

export default function DashboardPage() {
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
  const totalProgress = enrolledCourseData.length > 0
    ? Math.round(enrolledCourseData.reduce((sum, c) => sum + (student.progress[c.id] || 0), 0) / enrolledCourseData.length)
    : 0;

  const upcomingClasses = [
    { course: "AI & Machine Learning", topic: "Neural Networks Basics", time: "Today, 4:00 PM", status: "live" },
    { course: "Web Development", topic: "React State & Props", time: "Tomorrow, 5:00 PM", status: "upcoming" },
    { course: "AI & Machine Learning", topic: "Image Recognition", time: "Wed, 4:00 PM", status: "upcoming" },
  ];

  const achievements = [
    { title: "First Login", desc: "Welcome to AARNAIT AI!", earned: true },
    { title: "Course Explorer", desc: "Enrolled in 2+ courses", earned: enrolledCourseData.length >= 2 },
    { title: "Quick Learner", desc: "Complete 50% of any course", earned: Object.values(student.progress).some((p) => p >= 50) },
    { title: "Dedicated Student", desc: "7-day login streak", earned: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                Welcome back, {student.name.split(" ")[0]}!
              </h1>
              <p className="text-blue-100">
                Continue your learning journey. You&apos;re making great progress!
              </p>
            </div>
            <Link href="/courses" className="btn-orange flex items-center gap-2 !shadow-none">
              Browse Courses <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <FiBook className="text-blue-500" />, label: "Enrolled Courses", value: enrolledCourseData.length, bg: "bg-blue-50" },
            { icon: <FiTrendingUp className="text-green-500" />, label: "Avg. Progress", value: `${totalProgress}%`, bg: "bg-green-50" },
            { icon: <FiClock className="text-orange-500" />, label: "Hours Learned", value: enrolledCourseData.length * 12, bg: "bg-orange-50" },
            { icon: <FiAward className="text-purple-500" />, label: "Certificates", value: Object.values(student.progress).filter((p) => p === 100).length, bg: "bg-purple-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">My Courses</h2>
                <Link href="/dashboard/courses" className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
                  View All <FiArrowRight size={14} />
                </Link>
              </div>
              {enrolledCourseData.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourseData.map((course) => {
                    const progress = student.progress[course.id] || 0;
                    return (
                      <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className={`w-14 h-14 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <FiBook className="text-white text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
                          <p className="text-xs text-gray-400">{course.duration} | {course.sessions} sessions</p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">{progress}%</span>
                          </div>
                        </div>
                        <button className="btn-primary !px-4 !py-2 text-xs flex items-center gap-1">
                          <FiPlay size={12} /> Continue
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiBook className="mx-auto text-gray-300 text-4xl mb-4" />
                  <p className="text-gray-500 mb-4">You haven&apos;t enrolled in any courses yet.</p>
                  <Link href="/courses" className="btn-primary inline-flex items-center gap-2 text-sm">
                    Browse Courses <FiArrowRight />
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Upcoming Classes</h2>
              <div className="space-y-3">
                {upcomingClasses.map((cls, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${cls.status === "live" ? "bg-red-500 animate-pulse" : "bg-gray-300"}`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{cls.topic}</p>
                      <p className="text-xs text-gray-400">{cls.course}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiCalendar size={12} />
                      {cls.time}
                    </div>
                    {cls.status === "live" && (
                      <button className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                        Join Live
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Profile Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">{student.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.grade}</p>
              <p className="text-xs text-gray-400 mt-1">Joined {student.joinDate}</p>
              <Link
                href="/dashboard/profile"
                className="mt-4 block text-sm text-blue-600 font-semibold hover:text-blue-700"
              >
                Edit Profile
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div
                    key={a.title}
                    className={`flex items-center gap-3 p-3 rounded-lg ${a.earned ? "bg-green-50" : "bg-gray-50"}`}
                  >
                    {a.earned ? (
                      <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    ) : (
                      <FiTarget className="text-gray-300 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`text-sm font-semibold ${a.earned ? "text-gray-800" : "text-gray-400"}`}>
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-400">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-orange-100 mb-4">
                Our support team is here to help you with any questions.
              </p>
              <Link href="/contact" className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors inline-block">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
