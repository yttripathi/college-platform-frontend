"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [sort, setSort] = useState("rating");
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

  const filteredColleges = useMemo(() => {
    let result = colleges.filter((college) => {
      const matchName = college.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchLocation =
        location === "" ||
        college.location.toLowerCase().includes(location.toLowerCase());

      return matchName && matchLocation;
    });

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "fees") {
      result = [...result].sort((a, b) => a.fees - b.fees);
    }

    if (sort === "placement") {
      result = [...result].sort(
        (a, b) => b.placement_percentage - a.placement_percentage,
      );
    }

    return result;
  }, [colleges, search, location, sort]);

  if (loading) {
    return <h1 className="loading">Loading colleges...</h1>;
  }

  return (
    <main className="main">
      <section className="hero">
        <div>
          <span className="badge">India’s Smart College Finder</span>
          <h1>Find your dream college with confidence</h1>
          <p>
            Search colleges, compare fees, ratings, placements and courses in
            one simple platform.
          </p>

          <div className="heroButtons">
            <a href="#colleges">Explore Colleges</a>
            <Link href="/compare">Compare Now</Link>
          </div>
        </div>

        <div className="heroCard">
          <h2>🎓 3+</h2>
          <p>Verified Colleges</p>
          <h2>📈 85%</h2>
          <p>Top Placement Rate</p>
        </div>
      </section>

      <section className="stats">
        <div>
          <h3>{colleges.length}+</h3>
          <p>Colleges</p>
        </div>
        <div>
          <h3>4.3⭐</h3>
          <p>Top Rating</p>
        </div>
        <div>
          <h3>₹90k+</h3>
          <p>Fees Range</p>
        </div>
      </section>

      <section className="filters" id="colleges">
        <input
          type="text"
          placeholder="Search by college name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Sort by Rating</option>
          <option value="fees">Sort by Lowest Fees</option>
          <option value="placement">Sort by Placement</option>
        </select>
      </section>

      <section className="grid">
        {filteredColleges.map((college) => (
          <div className="card" key={college.id}>
            <div className="cardTop">
              <span>🎓</span>
              <p>{college.location}</p>
            </div>

            <h2>{college.name}</h2>

            <div className="info">
              <p>💰 ₹{college.fees}</p>
              <p>⭐ {college.rating}</p>
              <p>📈 {college.placement_percentage}% Placement</p>
            </div>

            <div className="courses">
              {(college.courses || []).map((course, index) => (
                <span key={index}>{course}</span>
              ))}
            </div>

            <Link href={`/college/${college.id}`} className="detailsBtn">
              View Details →
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
