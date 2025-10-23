"use client";

import { useEffect, useState, FormEvent } from "react";

interface Feedback {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch feedbacks
  const fetchFeedbacks = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      const data: Feedback[] = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Submit feedback
  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = { name, message };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to submit");
      }
      const saved: Feedback = await res.json();
      setName("");
      setMessage("");
      setFeedbacks((prev: Feedback[]) => [saved, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Feedback Collector
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-gray-100"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your feedback..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2.5 text-white font-semibold rounded-lg transition ${
            submitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      </form>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Feedback
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500 italic">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((f) => (
              <li
                key={f._id}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-gray-800">{f.name}</strong>
                  <small className="text-gray-500 text-sm">
                    {new Date(f.createdAt).toLocaleString()}
                  </small>
                </div>
                <p className="text-gray-700">{f.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
