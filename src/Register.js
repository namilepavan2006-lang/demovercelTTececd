import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Registration Successful ✅");
        navigate("/");
      } else {
        alert("Registration Failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={data.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  form: {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Register;
