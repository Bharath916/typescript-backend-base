// "use client";

// import { useRouter } from "next/navigation";
// import AuthForm from "@/component/AuthForm";
// import axios, { AxiosError } from "axios";
// // import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const router = useRouter();

//   const handleLogin = async (data: { email: string; password: string }) => {
//     try {
//       const response = await axios.post("/api/login", data);

//       if (response?.data?.data?.status === 200) {
//         const token = response.data?.data?.data?.access_token;
//         if (!token) {
//           throw new Error("Token missing in response");
//         }

//         localStorage.setItem("authToken", token);

//         router.push("/dashboard"); // ✅ will now work
//       } else {
//         alert(response?.data?.message || "Invalid credentials");
//       }
//     } catch (err) {
//       const error = err as AxiosError<{ message?: string }>;
//       if (error.response) {
//         alert(error.response.data?.message || "Server returned an error.");
//       } else if (error.request) {
//         alert("No response from server. Please check your network.");
//       } else {
//         alert(error.message || "Unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <AuthForm
//       title="Login"
//       buttonText="Sign In"
//       mode="login"
//       onSubmit={handleLogin}
//       toggleText="Don't have an account?"
//       toggleLink="/register"
//     />
//   );
// }



//************Above code is old style********* */
"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null); 
  
  useEffect(() => {
    if (token) {
      // refresh once after token is set
      // router.push("/dashboard");
      window.location.href = "/dashboard"
    }
  }, [token, router]);

  const handleLogin = async (data:any) => {
    try {

      let body = {
        email:data?.Email,
        password:data?.Password
      }
      
      const response = await axios.post("/api/login", body);

      if (response?.data?.data?.status === 200) {
        let token = response.data?.data?.data?.access_token;
        if (!token) {
          throw new Error("Token missing in response");
        }

        localStorage.setItem("authToken", token);
        // router.push("/dashboard");
        setToken(token);
        
      } else {
        alert(response?.data?.message || "Invalid credentials");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response) {
        alert(error.response.data?.message || "Server returned an error.");
      } else if (error.request) {
        alert("No response from server. Please check your network.");
      } else {
        alert(error.message || "Unexpected error occurred.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ Email, Password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close button */}
        <button
          onClick={() => window.location.href = "/"}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold shadow-md transition hover:bg-blue-700 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
        Can’t access your account?{" "}
          <Link href="/register" className="text-blue-600 font-medium cursor-pointer">
            Recover account
          </Link>
        </div>

        {/* Divider */} 
        <div className="flex items-center my-4"> <hr className="flex-1 border-gray-300" /> <span className="px-2 text-gray-500 text-sm">or</span> <hr className="flex-1 border-gray-300" /> </div>


        {/* Sign in with Google */} 
        <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer"> 
        <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            className="w-5 h-5"
          /> Sign in with Google 
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-sm">
          New to Venue Hub?{" "}
          <Link href="/register" className="text-blue-600 font-medium cursor-pointer">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}
