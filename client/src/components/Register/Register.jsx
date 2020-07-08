import React, { useState } from "react";
import styles from "./Register.module.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(name);
  };
  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name="password"
            id="password"
          />
        </label>
        <input type="submit" value="" />
      </form>
    </div>
  );
};
