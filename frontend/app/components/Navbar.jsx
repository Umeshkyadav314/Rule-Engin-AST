// components/Navbar.jsx
import React from "react";
import Link from "next/link";
import { Home, LogIn, Settings } from "lucide-react"; // Import your chosen icons
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-700 text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Rule Engine
        </h1>
        <ul className="flex space-x-4 mr-6">
          <li>
            <Link
              href="/"
              className="flex  justify-center mt-2 items-center hover:text-gray-400 cursor-pointer"
            >
              <Home className="mr-1 h-6 w-5 gap-1  items-center" /> 
          
             
            </Link>
          </li>
       
            <div className="text-white  items-center p-1 ml-5  font-sans font-semibold text-xl">
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
