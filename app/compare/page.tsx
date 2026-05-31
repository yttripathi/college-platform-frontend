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
    <main
      style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}
    >
      <h1 style={{ textAlign: "center" }}>⚖️ Compare Colleges</h1>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          marginTop: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
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
    </main>
  );
}

const cell = {
  padding: "14px",
  border: "1px solid #ddd",
  textAlign: "left" as const,
};
