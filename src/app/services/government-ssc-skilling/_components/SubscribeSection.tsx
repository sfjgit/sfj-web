"use client";
import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add your subscription logic here
    console.log("Subscribing email:", email);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      alert("Thank you for subscribing!");
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-500 py-4 px-4 md:px-2 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="text-2xl md:text-2xl font-bold text-white mb-2">
            Stay Updated with Skilling Insights
          </h2>
        </div>

        {/* Subscribe Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-4 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-400"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {/* Helper text */}
          {/* <p className="text-xs text-gray-500 mt-3 text-center">
            No spam. Unsubscribe anytime.
          </p> */}
        </div>
      </div>
    </section>
  );
}
