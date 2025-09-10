"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/component/AuthForm";
import axios from "axios";
import { ReactNode } from "react";

// ✅ Reusable Modal Component
function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

interface RegisterFormProps {
  onClose: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  [key: string]: any;
}

// ✅ Register Form in Modal
export default function RegisterForm({ onClose }: RegisterFormProps) {
  const router = useRouter();

  const handleRegister = async (data: RegisterData) => {
    try {
      const res = await axios.post("/api/register", data);

      if (res.data?.message) {
        alert(res.data.message);
        onClose(); // Close modal after success

        // ✅ Prefer router.push instead of window.location.href
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert(error?.response?.data?.message || "Something went wrong while registering");
    }
  };

  return (
    <Modal onClose={onClose}>
      <AuthForm
        title="Signup"
        buttonText="Create account"
        mode="signup"
        onSubmit={handleRegister}
        toggleText="Already have an account?"
        toggleLink="/login"
      />
    </Modal>
  );
}
