import React, { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

export default function Login() {
  const [isActive, setActive] = useState(true);

  const add = () => {
    setActive(false);
  };

  const add2 = () => {
    setActive(true);
  };

  useEffect(() => {
    add();
    add2();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>WELCOME TO SECURE DEPART</h1>
          <div className={isActive ? `${styles.head1}` : `${styles.login}`}>
            <label className={styles.label} type="username">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Email or Phone"
              id="username"
            />

            <label className={styles.label} type="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              id="password"
            />

            <button className={styles.button}>Log In</button>
            <div className={styles.social}>
              <div className={styles.go}>
                <i></i> Google
              </div>
            </div>
            <h3 className={styles.pointer}>Don't have an account? <span onClick={add}>Register here</span></h3>
          </div>
          <div className={!isActive ? `${styles.head1}` : `${styles.login}`}>
            <label className={styles.label} type="username">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Email or Phone"
              id="username"
            />

            <label className={styles.label} type="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              id="password"
            />

            <button className={styles.button}>Sign In</button>
            <h3 className={styles.pointer}>Already have an account? <span onClick={add2}>Login here</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
