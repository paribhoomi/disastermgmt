import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const DisasterSafetyTips = () => {
  const [activeTab, setActiveTab] = useState("before");

  const tips = {
    before: [
      "Prepare an emergency kit with food, water, medicines, flashlight, and batteries.",
      "Keep important documents in a waterproof folder.",
      "Know the evacuation routes and nearest shelters.",
      "Secure heavy items and electrical appliances.",
      "Stay informed with weather alerts and disaster warnings."
    ],
    during: [
      "Stay calm and avoid spreading panic.",
      "Follow instructions from local authorities.",
      "Move to a safe place – higher ground in case of floods, under sturdy furniture during earthquakes.",
      "Avoid using elevators during an evacuation.",
      "Stay away from windows, glass, and weak structures."
    ],
    after: [
      "Check yourself and others for injuries.",
      "Avoid drinking tap water until authorities declare it safe.",
      "Do not return home until it is declared safe.",
      "Stay away from damaged buildings and fallen power lines.",
      "Help neighbors, especially children, elderly, and disabled persons."
    ]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Disaster Safety Tips</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            background: activeTab === "before" ? "#0077b6" : "#eee",
            color: activeTab === "before" ? "white" : "black"
          }}
          onClick={() => setActiveTab("before")}
        >
          Before
        </button>
        <button
          style={{
            ...styles.tab,
            background: activeTab === "during" ? "#0077b6" : "#eee",
            color: activeTab === "during" ? "white" : "black"
          }}
          onClick={() => setActiveTab("during")}
        >
          During
        </button>
        <button
          style={{
            ...styles.tab,
            background: activeTab === "after" ? "#0077b6" : "#eee",
            color: activeTab === "after" ? "white" : "black"
          }}
          onClick={() => setActiveTab("after")}
        >
          After
        </button>
      </div>

      {/* Content */}
      <ul style={styles.list}>
        {tips[activeTab].map((tip, index) => (
          <li key={index} style={styles.listItem}>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    margin: "0 5px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s"
  },
  list: {
    paddingLeft: "20px"
  },
  listItem: {
    marginBottom: "12px",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#444"
  }
};

export default DisasterSafetyTips;
