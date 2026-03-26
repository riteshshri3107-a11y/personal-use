"use client";

import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageCircle } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Our team is always here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>
            {[
              { icon: <FiMapPin className="text-blue-500" />, title: "Visit Us", info: "123 Tech Innovation Hub,\nBangalore, India 560001" },
              { icon: <FiPhone className="text-green-500" />, title: "Call Us", info: "+91 98765 43210\n+91 98765 43211" },
              { icon: <FiMail className="text-purple-500" />, title: "Email Us", info: "hello@aarnaitai.com\nsupport@aarnaitai.com" },
              { icon: <FiClock className="text-orange-500" />, title: "Working Hours", info: "Mon - Sat: 9:00 AM - 7:00 PM\nSun: 10:00 AM - 4:00 PM" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 whitespace-pre-line mt-1">{item.info}</p>
                </div>
              </div>
            ))}

            {/* FAQ link */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <FiMessageCircle className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-gray-800">Quick Support</h3>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                For quick answers, check our FAQ section or chat with our AI assistant.
              </p>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                View FAQs &rarr;
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option value="courses">Course Inquiry</option>
                    <option value="enrollment">Enrollment Help</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="input-field resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
