"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboarding() {
  const router = useRouter();

  const questions = [
    "Are you introverted or extroverted?",
    "Do you prefer structure or flexibility?",
    "Do you enjoy deep focus or fast-paced work?",
    "Are you more creative, analytical, or practical?",
    "Do you prefer working with people or systems/tools?"
  ];

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    if (!input.trim()) return;

    const updatedAnswers = [...answers, input];
    setAnswers(updatedAnswers);
    setInput("");

    // last question → go to result page
    if (index === questions.length - 1) {
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));

      router.push("/result");
      return;
    }

    // move to next question
    setIndex(index + 1);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>PADI AGENT QUIZ</h2>

      <div style={styles.card}>
        <p style={styles.question}>
          {questions[index]}
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          style={styles.input}
        />

        <button onClick={handleNext} style={styles.button}>
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>

        <p style={styles.progress}>
          Question {index + 1} of {questions.length}
        </p>
      </div>
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
    padding: "20px",
  },

  title: {
    color: "#00ff88",
    marginBottom: "20px",
    fontSize: "24px",
  },

  card: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },

  question: {
    marginBottom: "15px",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "5px",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#00ff88",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
  },

  progress: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#aaa",
  },
};