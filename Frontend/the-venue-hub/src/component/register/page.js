"use strict";
"use client";
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
const AuthForm_1 = __importDefault(require("@/component/AuthForm"));
const axios_1 = __importDefault(require("axios"));
// ✅ Reusable Modal Component
function Modal({ children, onClose, }) {
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black" aria-label="Close">
          ✖
        </button>
        {children}
      </div>
    </div>);
}
// ✅ Register Form in Modal
function RegisterForm({ onClose }) {
    const router = (0, navigation_1.useRouter)();
    const handleRegister = (data) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const res = yield axios_1.default.post("/api/register", data);
            if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.message) {
                alert(res.data.message);
                onClose(); // Close modal after success
                // ✅ Prefer router.push instead of window.location.href
                router.push("/login");
            }
        }
        catch (error) {
            console.error("Error during registration:", error);
            alert(((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "Something went wrong while registering");
        }
    });
    return (<Modal onClose={onClose}>
      <AuthForm_1.default title="Signup" buttonText="Create account" mode="signup" onSubmit={handleRegister} toggleText="Already have an account?" toggleLink="/login"/>
    </Modal>);
}
exports.default = RegisterForm;
//# sourceMappingURL=page.js.map