"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Student, demoStudents } from "@/lib/data";

interface AuthContextType {
  student: Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProgress: (courseId: string, progress: number) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  grade: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("aarnait_student");
    if (stored) {
      try {
        setStudent(JSON.parse(stored));
      } catch {
        localStorage.removeItem("aarnait_student");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));

    // Check registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("aarnait_users") || "[]");
    const registeredUser = registeredUsers.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (registeredUser) {
      const studentData: Student = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        age: registeredUser.age,
        grade: registeredUser.grade,
        enrolledCourses: registeredUser.enrolledCourses || [],
        avatar: "",
        joinDate: registeredUser.joinDate,
        progress: registeredUser.progress || {},
      };
      setStudent(studentData);
      localStorage.setItem("aarnait_student", JSON.stringify(studentData));
      return { success: true };
    }

    // Demo account
    if (email === "demo@aarnaitai.com" && password === "demo123") {
      const demoStudent = demoStudents[0];
      setStudent(demoStudent);
      localStorage.setItem("aarnait_student", JSON.stringify(demoStudent));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password. Try demo@aarnaitai.com / demo123" };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 800));

    const registeredUsers = JSON.parse(localStorage.getItem("aarnait_users") || "[]");
    if (registeredUsers.some((u: { email: string }) => u.email === data.email)) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      id: `student-${Date.now()}`,
      ...data,
      enrolledCourses: [],
      joinDate: new Date().toISOString().split("T")[0],
      progress: {},
    };

    registeredUsers.push(newUser);
    localStorage.setItem("aarnait_users", JSON.stringify(registeredUsers));

    const studentData: Student = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      grade: newUser.grade,
      enrolledCourses: [],
      avatar: "",
      joinDate: newUser.joinDate,
      progress: {},
    };

    setStudent(studentData);
    localStorage.setItem("aarnait_student", JSON.stringify(studentData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setStudent(null);
    localStorage.removeItem("aarnait_student");
  }, []);

  const updateProgress = useCallback((courseId: string, progress: number) => {
    setStudent((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        progress: { ...prev.progress, [courseId]: progress },
      };
      localStorage.setItem("aarnait_student", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        isLoading,
        login,
        register,
        logout,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
