"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  title: string;
  buttonText: string;
  mode: "login" | "signup";
  onSubmit: (formData: any) => void;
  toggleText: string;
  toggleLink: string;
}

export default function AuthForm({
  title,
  buttonText,
  mode,
  onSubmit,
  toggleText,
  toggleLink,
}: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button
          onClick={() => window.location.href = "/"}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  required
                  className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              
              placeholder="Enter your password"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
          >
            {buttonText}
          </button>
        </form>

        {/* Divider & Google button only for login */}
        <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
            <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            className="w-5 h-5"
          /> Sign in with Google
            </button>


        {mode === "login" && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
              🌐 Sign in with Google
            </button>
          </>
        )}

        {/* Footer toggle */}
        <div className="text-center mt-6 text-sm">
          {toggleText}{" "}
          <Link href={toggleLink} className="text-blue-600 font-medium">
            {mode === "login" ? "Create account" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
