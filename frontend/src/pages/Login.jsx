import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://3.7.69.74:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

