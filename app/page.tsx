"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredColleges = colleges.filter((college) => {
    const matchName = college.name.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      location === "" ||
      college.location.toLowerCase().includes(location.toLowerCase());

    return matchName && matchLocation;
  });

  if (loading) {
    return <h1 style={{ padding: "40px" }}>Loading colleges...</h1>;
  }

  return (
    <main
      style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}
    >
      <h1 style={{ textAlign: "center", fontSize: "36px" }}>
        🎓 College Discovery Platform
      </h1>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Search, explore and compare colleges easily
      </p>

      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search college name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <Link
          href="/compare"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Compare
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{college.name}</h2>

            <p>📍 Location: {college.location}</p>
            <p>💰 Fees: ₹{college.fees}</p>
            <p>⭐ Rating: {college.rating}</p>
            <p>📈 Placement: {college.placement_percentage}%</p>

            <p>
              <strong>Courses:</strong>{" "}
              {(college.courses || []).join(", ") || "Not available"}
            </p>

            <Link
              href={`/college/${college.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
