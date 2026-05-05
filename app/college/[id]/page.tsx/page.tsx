"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/colleges")
      .then((res) => res.json())
      .then((data) => {
        const selectedCollege = data.find(
          (c: any) => String(c.id) === String(id),
        );
        setCollege(selectedCollege);
      });
  }, [id]);

  if (!college) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <Link href="/" className="text-blue-400">
        ← Back to colleges
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-4">{college.name}</h1>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
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

        <h2 className="text-xl font-bold mt-6">Courses</h2>
        <ul className="list-disc ml-6">
          <li>B.Tech CSE</li>
          <li>B.Tech IT</li>
          <li>B.Tech Mechanical</li>
        </ul>

        <h2 className="text-xl font-bold mt-6">Reviews</h2>
        <p>⭐ Good placements and campus environment.</p>
      </div>
    </main>
  );
}
