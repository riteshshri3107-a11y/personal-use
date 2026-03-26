"use client";

import React from "react";
import Link from "next/link";
import { stats } from "@/lib/data";
import { FiTarget, FiEye, FiHeart, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi2";

export default function AboutPage() {
  const team = [
    { name: "Dr. Aarna Sharma", role: "Founder & CEO", bio: "Former AI researcher at IIT with 15+ years in education technology." },
    { name: "Rajesh Kumar", role: "CTO", bio: "Ex-Google engineer passionate about making technology education accessible." },
    { name: "Priya Menon", role: "Head of Curriculum", bio: "PhD in Computer Science with expertise in K-12 STEM education." },
    { name: "Vikram Singh", role: "Head of Instruction", bio: "Award-winning educator with 10+ years of teaching experience." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiAcademicCap className="text-3xl" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">About AARNAIT AI</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We&apos;re on a mission to future-proof the next generation by providing world-class
            technology education to young learners across India and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-gray-500 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTarget className="text-2xl" />,
                title: "Our Mission",
                desc: "To democratize technology education by making AI, coding, and STEM learning accessible, engaging, and fun for every young mind.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: <FiEye className="text-2xl" />,
                title: "Our Vision",
                desc: "To be the leading platform that empowers the next generation of innovators, creators, and problem-solvers through cutting-edge technology education.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: <FiHeart className="text-2xl" />,
                title: "Our Values",
                desc: "Innovation, inclusivity, excellence, and student-first approach. We believe every child deserves access to world-class technology education.",
                color: "from-orange-500 to-orange-600",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 card-hover border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-5`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Building the Future, One Student at a Time</h2>
          </div>
          <div className="prose prose-lg mx-auto text-gray-600 space-y-4">
            <p>
              AARNAIT AI was founded in 2023 with a simple yet powerful vision: to make technology education
              accessible, engaging, and impactful for young learners across India and the world.
            </p>
            <p>
              Our founder, Dr. Aarna Sharma, saw firsthand how the rapidly evolving technology landscape was
              creating a gap between what students learn in traditional education and what the future demands.
              She assembled a team of world-class educators and technologists to bridge this gap.
            </p>
            <p>
              Today, AARNAIT AI serves over 10,000 students across 15+ countries, offering expert-led live
              classes in AI, coding, robotics, game development, data science, and more. Our project-based
              curriculum ensures students don&apos;t just learn theory but build real-world skills.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose <span className="gradient-text">AARNAIT AI?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Live interactive classes with expert instructors",
              "Project-based curriculum with real-world applications",
              "Personalized learning paths for every student",
              "Industry-recognized certificates upon completion",
              "1-on-1 mentorship and career guidance",
              "Small batch sizes for focused attention",
              "Flexible scheduling to fit your routine",
              "Community events, hackathons, and competitions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Team
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Meet the <span className="gradient-text">Experts</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-6 text-center card-hover border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the AARNAIT AI Family</h2>
          <p className="text-blue-100 mb-8">Start your child&apos;s tech journey today with a free trial class.</p>
          <Link href="/register" className="btn-orange inline-flex items-center gap-2 text-lg !px-8 !py-4">
            Get Started Free <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
