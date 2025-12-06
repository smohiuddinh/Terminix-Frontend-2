import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subHeading}>Oops! Page not found</h2>
      <p style={styles.text}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button text="Go Back Home" onClick={() => navigate("/")} className="w-auto px-5 py-3"/>
      {/* <button style={styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button> */}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "#ff4d4f",
  },
  subHeading: {
    fontSize: "2rem",
    margin: "10px 0",
  },
  text: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
    maxWidth: "400px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PageNotFound;
