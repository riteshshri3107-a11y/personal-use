"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiCalendar, FiBookOpen, FiArrowLeft, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { student, isAuthenticated, isLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", age: "", grade: "" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (student) {
      setFormData({ name: student.name, age: String(student.age), grade: student.grade });
    }
  }, [student]);

  if (isLoading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-bold">{student.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-blue-200">{student.email}</p>
              <p className="text-blue-200 text-sm mt-1">{student.grade} | Age {student.age}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className={`flex items-center gap-2 text-sm font-semibold ${
                editing ? "text-green-600 hover:text-green-700" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              {editing ? <><FiSave /> Save Changes</> : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <FiUser /> Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-800 font-medium">{student.name}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <FiMail /> Email Address
              </label>
              <p className="text-gray-800 font-medium">{student.email}</p>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                  <FiCalendar /> Age
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{student.age} years</p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                  <FiBookOpen /> Grade
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{student.grade}</p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <FiCalendar /> Member Since
              </label>
              <p className="text-gray-800 font-medium">{student.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Learning Statistics</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-600">{student.enrolledCourses.length}</p>
              <p className="text-xs text-gray-500 mt-1">Courses Enrolled</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-600">
                {Object.values(student.progress).filter((p) => p === 100).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Completed</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-purple-600">
                {student.enrolledCourses.length * 12}
              </p>
              <p className="text-xs text-gray-500 mt-1">Hours Learned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
