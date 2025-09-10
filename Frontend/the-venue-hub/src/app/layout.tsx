// "use client";

// import "./globals.css";
// import Link from "next/link";
// import { ReactNode, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <Navbar />
//         {children}
//       </body>
//     </html>
//   );
// }

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const reloaded = sessionStorage.getItem("hasReloaded");

//     if (token && !reloaded) {
//       sessionStorage.setItem("hasReloaded", "true");
//       window.location.reload();
//       return;
//     }

//     setIsLoggedIn(!!token);
//   }, [pathname]); 

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     sessionStorage.removeItem("hasReloaded"); 
//     setIsLoggedIn(false);
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
//       <div className="text-xl font-bold">Venue Hub</div>

//       {!isLoggedIn ? (
//         <div className="flex gap-4">
//         <Link
//           href="/login"
//           className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//         >
//           Login
//         </Link>
      
//         <Link
//           href="/register"
//           className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
//         >
//           Register
//         </Link>
//       </div>
      
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
//           >
//             <span className="text-white font-bold">U</span>
//           </button>

//           {open && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
//               <Link
//                 href="/profile"
//                 className="block px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setOpen(false)}
//               >
//                 Profile
//               </Link>
//               <Link
//                 href="/settings"
//                 className="block px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setOpen(false)}
//               >
//                 Settings
//               </Link>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }




"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoginForm from "./login/page";
import RegisterForm from "./register/page";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* ✅ Show Hero section only on homepage */}
        <ConditionalHero />
        <main>{children}</main>
      </body>
    </html>
  );
}

// ✅ Navbar
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="absolute top-0 right-20 w-full flex justify-end gap-6 p-6 text-white font-medium z-10">
      <button className="font-bold px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer">
        Add Convention Hall
      </button>

        {!isLoggedIn ? (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="font-bold px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="font-bold px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer"
            >
              Sign up
            </button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
            >
              <span className="text-white font-bold cursor-pointer">U</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ✅ Login Modal */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm />
        </Modal>
      )}

      {/* ✅ Register Modal */}
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <RegisterForm onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </Modal>
      )}
    </>
  );
}

// ✅ Reusable Modal
function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

// ✅ Show Hero only on homepage
function ConditionalHero() {
  const pathname = usePathname();
  if (pathname !== "/") return null; // hide on login & dashboard

  return <HeroSection />;
}

// ✅ Hero Section
function HeroSection() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/608206304.jpg?k=589625fdd983e0f631bac11b36947ac46aa1be8c93c7bc610c4f9be327041eeb&o=')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold">Venue Hub</h1>
        <p className="mt-4 text-lg md:text-2xl">
          Find the best convention halls and venues in India
        </p>
      </div>
    </div>
  );
}
