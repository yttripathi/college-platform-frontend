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
    <main className="main">
      <section className="hero">
        <div>
          <span className="badge">College Details</span>
          <h1>{college.name}</h1>
          <p>
            Explore fees, placements, ratings and available courses for this
            college.
          </p>

          <div className="heroButtons">
            <Link href="/">Back Home</Link>
            <Link href="/compare">Compare Colleges</Link>
          </div>
        </div>

        <div className="heroCard">
          <h2>{college.rating}⭐</h2>
          <p>Student Rating</p>
          <h2>{college.placement_percentage}%</h2>
          <p>Placement Rate</p>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h2>College Overview</h2>
          <p>📍 Location: {college.location}</p>
          <p>💰 Fees: ₹{college.fees}</p>
          <p>⭐ Rating: {college.rating}</p>
          <p>📈 Placement: {college.placement_percentage}%</p>

          <h3>Courses Offered</h3>
          <div className="courses">
            {(college.courses || []).map((course, index) => (
              <span key={index}>{course}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
