"use client";

import { useEffect, useState } from "react";

export default function Result() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const answers =
          JSON.parse(localStorage.getItem("answers")) || [];

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        if (!res.ok) {
          throw new Error("API request failed");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}></div>
        <p>AI is analyzing your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>YOUR RESULT</h1>

      <div style={styles.card}>
        <h2>{data.personality}</h2>

        <p style={styles.skill}>{data.bestSkill}</p>

        <h3>Roadmap</h3>

        <ul>
          {data.roadmap.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  title: {
    color: "#00ff88",
    marginBottom: "20px",
  },

  card: {
    background: "#111",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
  },

  skill: {
    color: "#4da3ff",
    marginBottom: "10px",
  },

  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid #333",
    borderTop: "4px solid #00ff88",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
};