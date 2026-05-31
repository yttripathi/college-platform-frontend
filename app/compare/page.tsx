import Link from "next/link";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
};

async function getColleges(): Promise<College[]> {
  const res = await fetch(
    "https://college-platform-backend-zrco.onrender.com/colleges",
    { cache: "no-store" },
  );

  return res.json();
}

export default async function ComparePage() {
  const colleges = await getColleges();

  return (
    <main className="main">
      <section className="hero">
        <div>
          <span className="badge">Compare Colleges</span>
          <h1>Choose smarter with side-by-side comparison</h1>
          <p>Compare colleges by fees, location, rating and placements.</p>

          <div className="heroButtons">
            <Link href="/">Back Home</Link>
          </div>
        </div>
      </section>

      <section style={{ width: "84%", margin: "40px auto", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 14px 35px rgba(17, 24, 39, 0.1)",
          }}
        >
          <thead>
            <tr style={{ background: "#4f46e5", color: "white" }}>
              <th style={cell}>College</th>
              <th style={cell}>Location</th>
              <th style={cell}>Fees</th>
              <th style={cell}>Rating</th>
              <th style={cell}>Placement</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td style={cell}>{college.name}</td>
                <td style={cell}>{college.location}</td>
                <td style={cell}>₹{college.fees}</td>
                <td style={cell}>{college.rating}</td>
                <td style={cell}>{college.placement_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

const cell = {
  padding: "16px",
  border: "1px solid #e5e7eb",
  textAlign: "left" as const,
};
