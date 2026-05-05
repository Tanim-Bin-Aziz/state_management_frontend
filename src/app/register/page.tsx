"use client";

import { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !confirm) {
      setError("Email and password are required!");
      return;
    }

    if (name && name.trim().length < 2) {
      setError("Name must be at least 2 characters!");
      return;
    }

    if (name && name.trim().length > 50) {
      setError("Name must be under 50 characters!");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(name.trim() && { name: name.trim() }),
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed!");
        return;
      }

      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      setError("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 border rounded-lg shadow-sm bg-white w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 p-2 bg-green-50 rounded">
            {success}
          </p>
        )}

        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
