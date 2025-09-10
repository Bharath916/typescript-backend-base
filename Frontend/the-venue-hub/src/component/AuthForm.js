"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function AuthForm({ title, buttonText, mode, onSubmit, toggleText, toggleLink, }) {
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = (0, react_1.useState)({
        username: "",
        phone: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "login") {
            onSubmit({ email: formData.email, password: formData.password });
        }
        else {
            onSubmit(formData);
        }
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button onClick={() => window.location.href = "/"} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (<>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" required className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone" required className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </>)}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required className="mt-1 w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>

          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
            {buttonText}
          </button>
        </form>

        {/* Divider & Google button only for login */}
        <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300"/>
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300"/>
            </div>
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5"/> Sign in with Google
            </button>


        {mode === "login" && (<>
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300"/>
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300"/>
            </div>
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
              🌐 Sign in with Google
            </button>
          </>)}

        {/* Footer toggle */}
        <div className="text-center mt-6 text-sm">
          {toggleText}{" "}
          <link_1.default href={toggleLink} className="text-blue-600 font-medium">
            {mode === "login" ? "Create account" : "Login"}
          </link_1.default>
        </div>
      </div>
    </div>);
}
exports.default = AuthForm;
//# sourceMappingURL=AuthForm.js.map