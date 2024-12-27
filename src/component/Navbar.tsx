"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

import { User } from "next-auth";

function Navbar() {
  const router=useRouter()
  const { data: session } = useSession();
  const user: User = session?.user;

  const handleLogout = async () => {
    await signOut(); // This signs out the user
    router.push('/'); // Redirect to the homepage
  };

  return (
    <>
      <nav className="p-4 md:p-6 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-gray-600"
          >
            Mystery Message
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {user?.username || user?.email}
                </span>
                <button
      className="bg-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      onClick={handleLogout}
    >
      Logout
    </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
