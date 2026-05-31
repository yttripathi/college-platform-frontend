type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  courses?: string[];
};

async function getColleges(): Promise<College[]> {
  const res = await fetch(
    "https://college-platform-backend-zrco.onrender.com/colleges",
    { cache: "no-store" },
  );

  return res.json();
}

export default async function CollegeDetails({
  params,
}: {
  params: { id: string };
}) {
  const colleges = await getColleges();

  const college = colleges.find((c) => c.id === Number(params.id));

  if (!college) {
    return <h1 style={{ padding: "40px" }}>College not found</h1>;
  }

  return (
    <main
      style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <h1>{college.name}</h1>

        <p>📍 Location: {college.location}</p>
        <p>💰 Fees: ₹{college.fees}</p>
        <p>⭐ Rating: {college.rating}</p>
        <p>📈 Placement: {college.placement_percentage}%</p>

        <h3>Courses Offered</h3>
        <ul>
          {(college.courses || []).map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
