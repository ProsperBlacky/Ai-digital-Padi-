"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleStart = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    // store user email (optional but useful)
    localStorage.setItem("padi_email", email);

    // go to onboarding page
    router.push("/onboarding");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PADI AGENT</h1>

      <p style={styles.subtitle}>
        Discover your best digital skill path
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleStart} style={styles.button}>
        Get Started
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "36px",
    color: "#00ff88",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#4da3ff",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    width: "260px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "12px 20px",
    backgroundColor: "#00ff88",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
  },
};