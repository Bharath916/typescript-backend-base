"use strict";
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
// "use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
function LoginForm() {
    const router = (0, navigation_1.useRouter)();
    const [Email, setEmail] = (0, react_1.useState)("");
    const [Password, setPassword] = (0, react_1.useState)("");
    const [token, setToken] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (token) {
            // refresh once after token is set
            // router.push("/dashboard");
            window.location.href = "/dashboard";
        }
    }, [token, router]);
    const handleLogin = (data) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            let body = {
                email: data === null || data === void 0 ? void 0 : data.Email,
                password: data === null || data === void 0 ? void 0 : data.Password
            };
            const response = yield axios_1.default.post("/api/login", body);
            if (((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === 200) {
                let token = (_e = (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.access_token;
                if (!token) {
                    throw new Error("Token missing in response");
                }
                localStorage.setItem("authToken", token);
                // router.push("/dashboard");
                setToken(token);
            }
            else {
                alert(((_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.message) || "Invalid credentials");
            }
        }
        catch (err) {
            const error = err;
            if (error.response) {
                alert(((_g = error.response.data) === null || _g === void 0 ? void 0 : _g.message) || "Server returned an error.");
            }
            else if (error.request) {
                alert("No response from server. Please check your network.");
            }
            else {
                alert(error.message || "Unexpected error occurred.");
            }
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ Email, Password });
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close button */}
        <button onClick={() => window.location.href = "/"} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="Email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="Password" name="Password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          {/* Submit button */}
          <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold shadow-md transition hover:bg-blue-700 cursor-pointer">
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
        Can’t access your account?{" "}
          <link_1.default href="/register" className="text-blue-600 font-medium cursor-pointer">
            Recover account
          </link_1.default>
        </div>

        {/* Divider */} 
        <div className="flex items-center my-4"> <hr className="flex-1 border-gray-300"/> <span className="px-2 text-gray-500 text-sm">or</span> <hr className="flex-1 border-gray-300"/> </div>


        {/* Sign in with Google */} 
        <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer"> 
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5"/> Sign in with Google 
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-sm">
          New to Venue Hub?{" "}
          <link_1.default href="/register" className="text-blue-600 font-medium cursor-pointer">
            Create account
          </link_1.default>
        </div>

      </div>
    </div>);
}
exports.default = LoginForm;
//# sourceMappingURL=page.js.map