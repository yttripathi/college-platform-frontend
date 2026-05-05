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
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com/colleges")
      .then((res) => {
        if (!res.ok) throw new Error("Backend response failed");
        return res.json();
      })
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(
          "Backend data not coming. Check http://localhost:5000/colleges",
        );
        setLoading(false);
      });
  }, []);

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const filteredColleges = colleges.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter === "" || c.location === locationFilter) &&
      (maxFees === "" || c.fees <= Number(maxFees))
    );
  });

  const selectedColleges = colleges.filter((c) => selected.includes(c.id));

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-2">College Finder</h1>
      <p className="mb-6 text-gray-300">
        Find, filter and compare colleges easily.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search college..."
          className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Ghaziabad">Ghaziabad</option>
        </select>

        <input
          type="number"
          placeholder="Max Fees"
          className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
        />
      </div>

      {loading && <p className="text-yellow-400">Loading colleges...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && filteredColleges.length === 0 && (
        <p className="text-red-400">No colleges found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {filteredColleges.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow"
          >
            <Link href={`/college/${c.id}`}>
              <div className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg">
                <h2 className="font-bold text-lg">{c.name}</h2>
                <p>Location: {c.location}</p>
                <p>Fees: ₹{c.fees}</p>
                <p>Rating: {c.rating}</p>
                <p>Placement: {c.placement_percentage}%</p>
              </div>
            </Link>

            <button
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={() => toggleSelect(c.id)}
            >
              {selected.includes(c.id) ? "Remove" : "Compare"}
            </button>
          </div>
        ))}
      </div>

      {selectedColleges.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-3">Comparison</h2>

          <table className="table-auto border border-gray-700 w-full bg-gray-900">
            <thead>
              <tr>
                <th className="border border-gray-700 p-2">Feature</th>
                {selectedColleges.map((c) => (
                  <th key={c.id} className="border border-gray-700 p-2">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-gray-700 p-2">Location</td>
                {selectedColleges.map((c) => (
                  <td key={c.id} className="border border-gray-700 p-2">
                    {c.location}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-gray-700 p-2">Fees</td>
                {selectedColleges.map((c) => (
                  <td key={c.id} className="border border-gray-700 p-2">
                    ₹{c.fees}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-gray-700 p-2">Rating</td>
                {selectedColleges.map((c) => (
                  <td key={c.id} className="border border-gray-700 p-2">
                    {c.rating}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-gray-700 p-2">Placement %</td>
                {selectedColleges.map((c) => (
                  <td key={c.id} className="border border-gray-700 p-2">
                    {c.placement_percentage}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
