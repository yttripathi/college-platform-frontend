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

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 style={{ padding: "40px" }}>Loading colleges...</h1>;
  }

  return (
    <main
      style={{
        padding: "40px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "36px",
        }}
      >
        🎓 College Discovery Platform
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {colleges.map((college) => (
          <div
            key={college.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{college.name}</h2>

            <p>
              <strong>📍 Location:</strong> {college.location}
            </p>

            <p>
              <strong>💰 Fees:</strong> ₹{college.fees}
            </p>

            <p>
              <strong>⭐ Rating:</strong> {college.rating}
            </p>

            <p>
              <strong>📈 Placement:</strong> {college.placement_percentage}%
            </p>

            <div>
              <strong>Courses:</strong>
              <ul>
                {college.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
