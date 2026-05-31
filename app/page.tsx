"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("https://college-platform-backend-zrco.onrender.com")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>College Discovery Platform</h1>
      <h2>{message}</h2>
    </main>
  );
}
