"use client";

import React from "react";
import Link from "next/link";
import { courses, testimonials, stats, features } from "@/lib/data";
import {
  FiArrowRight, FiPlay, FiStar, FiMonitor, FiCpu,
  FiAward, FiUsers, FiTarget, FiHeart,
} from "react-icons/fi";
import { HiAcademicCap, HiSparkles, HiRocketLaunch } from "react-icons/hi2";

function FeatureIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    video: <FiMonitor className="text-2xl" />,
    project: <FiTarget className="text-2xl" />,
    ai: <HiSparkles className="text-2xl" />,
    certificate: <FiAward className="text-2xl" />,
    mentor: <FiUsers className="text-2xl" />,
    community: <FiHeart className="text-2xl" />,
  };
  return <>{map[icon] || <FiStar className="text-2xl" />}</>;
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <HiSparkles className="text-yellow-300" />
                <span className="text-sm font-medium">Trusted by 10,000+ students across India</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Future-proofing the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Next Generation
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
                Empowering young minds with AI, coding, robotics, and technology skills
                through expert-led live classes and hands-on projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn-orange flex items-center gap-2 text-lg !px-8 !py-4">
                  Start Learning Free
                  <FiArrowRight />
                </Link>
                <Link href="/courses" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all">
                  <FiPlay />
                  Explore Courses
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiStar key={i} className="text-yellow-300 fill-yellow-300" size={14} />
                    ))}
                  </div>
                  <p className="text-blue-200 text-sm">4.9/5 from 2000+ reviews</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <FiCpu />, label: "AI & ML", color: "from-blue-400 to-blue-600", students: "3.2K" },
                      { icon: <FiMonitor />, label: "Web Dev", color: "from-green-400 to-green-600", students: "2.8K" },
                      { icon: <HiRocketLaunch />, label: "Robotics", color: "from-orange-400 to-orange-600", students: "1.9K" },
                      { icon: <FiTarget />, label: "Games", color: "from-purple-400 to-purple-600", students: "2.1K" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all cursor-pointer group"
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <h3 className="font-bold mb-1">{item.label}</h3>
                        <p className="text-blue-200 text-sm">{item.students} students</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg animate-bounce">
                  Live Classes!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-gray-500 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Why AARNAIT AI?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              The Best Way to Learn <span className="gradient-text">Technology</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our unique approach combines live instruction, hands-on projects, and personalized mentorship
              to deliver an unparalleled learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 card-hover border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                  <FeatureIcon icon={feature.icon} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Popular Courses
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Explore Our <span className="gradient-text">Top Courses</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Expertly crafted curriculum designed for young learners. Each course includes live classes,
              hands-on projects, and industry-recognized certifications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
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
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.sessions} Sessions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold gradient-text">${course.price}</p>
                    <Link
                      href={`/courses#${course.id}`}
                      className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-700"
                    >
                      Learn More <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
              View All Courses <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Student Success Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 card-hover border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">Age {t.age} | {t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join AARNAIT AI today and get access to world-class technology education.
            First class is on us - no credit card required!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="btn-orange text-lg !px-10 !py-4 flex items-center gap-2">
              Get Started Free <FiArrowRight />
            </Link>
            <Link href="/login" className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all text-lg">
              Student Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
