"use client";

import { getUserDetails } from "@/actions/user";
import { logoutUser } from "@/actions/logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userDetails = async () => {
    try {
      const result = await getUserDetails();
      console.log("User Details:", result);

      if (result?.success) {
        setUser(result.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    userDetails();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        setUser(null);
        setIsLoggedIn(false);
        router.push("/sign-in");
      } else {
        console.error("Logout failed:", res.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
  if (pathname === "/sign-in" || pathname === "/sign-up") return null;

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm sticky w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          MindBridge
        </Link>

        
        <div className="flex gap-6 text-gray-700 font-medium items-center">
          <Link
            href="/"
            className={`hover:text-blue-600 ${pathname === "/" ? "text-blue-600 font-semibold" : ""
              }`}
          >
            Home
          </Link>

          <Link
            href="/create"
            className={`hover:text-blue-600 ${pathname === "/create" ? "text-blue-600 font-semibold" : ""
              }`}
          >
            Create Blog
          </Link>

          <Link
            href="/my-blog"
            className={`hover:text-blue-600 ${pathname === "/my-blog" ? "text-blue-600 font-semibold" : ""
              }`}
          >
            My Blogs
          </Link>

          {isLoggedIn ? (
            <>
              {/* 👇 Clickable Username */}
              <Link
                href="/profile"
                className="text-gray-800 font-medium hover:text-blue-600 transition"
              >
                Hi, {user?.name || "User"}
              </Link>

              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
