"use client";

import UserClass from "@/modules/UserClass";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LocalStorage from "@/utils/LocalStorage";
import Link from "next/link";
import StarBackground from "@/components/StarBackground";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<UserClass>();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Next.js 的路由处理器

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // const data = await res.json();

      const contentType = res.headers.get("Content-Type"); // 获取 Content-Type

      let data; // 存储响应数据
      if (contentType && contentType.includes("application/json")) {
        data = await res.json(); // 解析 JSON 数据
      } else {
        data = await res.text(); // 返回原始文本数据（可能是 HTML 或错误信息）
        console.error("Unexpected response:", data);
      }

      setLoading(false);

      if (res.ok) {
        setMessage("Login successful!");
        setUser(data.user); // Save user information to state
        LocalStorage().setAttribute("DATA:USER", JSON.stringify(data.user));
        router.push("/dashboard"); // 使用 Next.js 的 Router 进行页面跳转
        router.refresh();
        // Redirect or perform other actions after login
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred. Please try again.");
      if (error instanceof Error) {
        setMessage(error.name + error.message);
      }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <StarBackground />
      <div className="bg-black-white-10 relative z-10 backdrop-blur-xs shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Login
        </h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              loading ? "text-blue-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black-white-10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black-white-10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black-white-25 hover:bg-yellow-500 py-2 rounded font-semibold focus:outline-none transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-center">
            <span className="mr-2">Don't have an account?</span>{" "}
            <Link href={"/sign_up"}>Join Now</Link>
          </div>
        </form>

        {/* {user && (
          <div className="mt-6 p-4 bg-green-100 rounded">
            <h2 className="text-lg font-semibold">Welcome {user.username}!</h2>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact || "N/A"}</p>
            <p>Gender: {user.gender || "N/A"}</p>
            <p>Bio: {user.bio || "N/A"}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}
