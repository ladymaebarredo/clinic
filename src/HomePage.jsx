import React from "react";

export default function HomePage() {
  return (
    <main>
      <nav className="px-8 py-4 bg-red-800 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="w-10" />
          <h1>SPC CLINIC</h1>
        </div>
        <div className="flex gap-10 items-center">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button className="bg-white px-5 py-2 rounded-md text-red-800">
            <a href="/login">Login</a>
          </button>
        </div>
      </nav>
    </main>
  );
}
