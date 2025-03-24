"use client";

import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import User from "@/modules/UserClass";
import Link from "next/link";
import StarBackground from "@/components/StarBackground";
import { signUp } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Next.js 的路由处理器

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const success = await signUp(
      "",
      formData.username,
      formData.email,
      formData.password,
      formData.contact,
      formData.gender,
      formData.dateOfBirth,
      formData.bio
    );

    setLoading(false);
    if (success) {
      setMessage("Register successful!");
      // router.push("/sign_in"); // 使用 Next.js 的 Router 进行页面跳转
      // router.refresh();
    } else {
      setMessage("An error occurred. Please try again.");
    }

    // try {
    //   // Hash the password before submission
    //   const hashedPassword = await bcrypt.hash(formData.password, 10);

    //   // Create a new User object
    //   const newUser = new User(
    //     '',
    //     formData.username,
    //     formData.email,
    //     hashedPassword,
    //     formData.contact,
    //     formData.gender,
    //     formData.dateOfBirth,
    //     formData.bio
    //   );

    //   // Submit the hashed password and other details
    //   const res = await fetch('/api/auth/sign_up', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newUser),
    //   });

    //   const data = await res.json();

    //   if (res.ok) {
    //     setMessage('Registration successful!');
    //     setFormData({
    //       username: '',
    //       email: '',
    //       password: '',
    //       contact: '',
    //       gender: '',
    //       dateOfBirth: '',
    //       bio: '',
    //     });
    //     window.location.href = "/sign_in";
    //   } else {
    //     setMessage(data.error || 'An error occurred!');
    //   }
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     setMessage('An error occurred: ' + error.message);
    //   } else {
    //     setMessage('An unexpected error occurred');
    //   }
    // }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <StarBackground />
      <ToastContainer style={{ zIndex: 9999 }} />
      {/* Form Wrapper */}
      <div className="relative z-10 bg-black-white-10 backdrop-blur-xs border border-white/30 shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact (e.g., phone number)"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="bio"
            placeholder="Write a short bio..."
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-black-white-10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-black-white-50 hover:bg-yellow-500 py-2 rounded-lg font-medium focus:outline-none transition"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
            <span className="mr-2">Already have an account?</span>{" "}
            <Link href={"/sign_in"}>Login Now</Link>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
}
