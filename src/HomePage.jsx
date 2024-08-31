import { MenuIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <nav className="px-8 py-4 bg-red-950 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="w-10" />
          <h1 className="hidden md:block">SPC CLINIC</h1>
          <MenuIcon className="md:hidden" />
        </div>
        <div className="flex gap-10 items-center">
          <div className="space-x-4 hidden md:block">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="bg-white px-5 py-2 rounded-md text-red-950">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </nav>
      <section className="h-screen p-10 flex justify-center">
        <h1 className="text-5xl font-black text-red-950">
          SCHOOL CLINIC MANAGEMENT INFORMATION SYSTEM
        </h1>
      </section>
      <footer className="bg-orange-950 p-10 text-white">
        <h1>This is footer</h1>
      </footer>
    </main>
  );
}
