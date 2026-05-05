"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/colleges")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: any) => c.id == id);
        setCollege(found);
      });
  }, [id]);

  if (!college) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{college.name}</h1>

      <p>
        <b>Location:</b> {college.location}
      </p>
      <p>
        <b>Fees:</b> ₹{college.fees}
      </p>
      <p>
        <b>Rating:</b> {college.rating}
      </p>
      <p>
        <b>Placement:</b> {college.placement_percentage}%
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Courses</h2>
        <ul className="list-disc ml-6">
          <li>B.Tech CSE</li>
          <li>B.Tech IT</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Reviews</h2>
        <p>⭐ Great college with good placements</p>
      </div>
    </div>
  );
}
