import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/signup`,
      { name, email, password, role },
      config
    );
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/products");
  };
  return (
    <div>
      <h1>Register User</h1>
      <form action="">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
        />

        <button onClick={submitHandler}>Register</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
