"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  courses: string[];
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges`);

        if (!res.ok) {
          throw new Error("Backend not found");
        }

        const data = await res.json();
        setColleges(data);
      } catch (err) {
        setError("Backend is not connected. Please check Render URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return <h1 className="p-10 text-xl">Loading colleges...</h1>;
  }

  if (error) {
    return <h1 className="p-10 text-red-600 text-xl">{error}</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        College Discovery Platform
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-xl shadow-md p-6 border"
          >
            <h2 className="text-2xl font-bold mb-2">{college.name}</h2>
            <p>📍 {college.location}</p>
            <p>💰 Fees: ₹{college.fees}</p>
            <p>⭐ Rating: {college.rating}</p>
            <p>📈 Placement: {college.placement_percentage}%</p>

            <div className="mt-3">
              <h3 className="font-semibold">Courses:</h3>
              {college.courses.map((course) => (
                <span
                  key={course}
                  className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2 mt-2 text-sm"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
