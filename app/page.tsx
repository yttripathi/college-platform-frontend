"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  courses?: string[];
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com/colleges")
      .then((res) => res.json())
      .then((data) => {
        console.log("College data:", data);
        setColleges(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Backend connected but college data could not load.");
      });
  }, []);

  return (
    <main
      style={{ padding: "40px", minHeight: "100vh", background: "#f4f6f8" }}
    >
      <h1 style={{ textAlign: "center" }}>🎓 College Discovery Platform</h1>

      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      {colleges.length === 0 && !error && <h2>No colleges found</h2>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {colleges.map((college) => (
          <div
            key={college.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{college.name}</h2>
            <p>
              <b>📍 Location:</b> {college.location}
            </p>
            <p>
              <b>💰 Fees:</b> ₹{college.fees}
            </p>
            <p>
              <b>⭐ Rating:</b> {college.rating}
            </p>
            <p>
              <b>📈 Placement:</b> {college.placement_percentage}%
            </p>

            <h4>Courses:</h4>
            <ul>
              {(college.courses || []).map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
