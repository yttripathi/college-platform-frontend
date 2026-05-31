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

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>College Discovery Platform</h1>

      {colleges.map((college) => (
        <div
          key={college.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            margin: "20px 0",
          }}
        >
          <h2>{college.name}</h2>
          <p>Location: {college.location}</p>
          <p>Fees: ₹{college.fees}</p>
          <p>Rating: {college.rating}</p>
          <p>Placement: {college.placement_percentage}%</p>
          <p>Courses: {college.courses.join(", ")}</p>
        </div>
      ))}
    </main>
  );
}
