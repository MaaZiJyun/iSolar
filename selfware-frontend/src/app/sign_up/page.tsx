'use client';

import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import User from '@/modules/UserClass';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Hash the password before submission
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Create a new User object
      const newUser = new User(
        formData.username,
        formData.email,
        hashedPassword,
        formData.contact,
        formData.gender,
        formData.dateOfBirth,
        formData.bio
      );

      // Submit the hashed password and other details
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          contact: '',
          gender: '',
          dateOfBirth: '',
          bio: '',
        });
      } else {
        setMessage(data.error || 'An error occurred!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('An error occurred: ' + error.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const canvas = document.getElementById('universe-bg') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const stars: { x: number; y: number; radius: number }[] = [];
    const numStars = 200;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random(),
      });
    }
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
      });
    };

    const update = () => {
      stars.forEach((star) => {
        star.y += 0.5;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Universe Background */}
      <canvas id="universe-bg" className="absolute top-0 left-0 w-full h-full"></canvas>

      {/* Form Wrapper */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xs border border-white/30 shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact (e.g., phone number)"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="bio"
            placeholder="Write a short bio..."
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium focus:outline-none transition"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
            <span className="mr-2">Already have an account?</span>{" "}
            <Link href={"/sign_up"}>Login Now</Link>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </div>
  );
}
