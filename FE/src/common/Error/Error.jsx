
import React from "react";
import styles from "./Error.module.scss";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  const navigationItems = [
    { label: "Go Home", path: "/", state: { idx: 0 } },
    { label: "Try Again", path: "/", state: { idx: 2 } },
  ];

  const handleClick = (path, state) => {
    navigate(path, { state });
  };

  return (
    <section className={styles.errorPage}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Oops!</h1>
        <p className={styles.errorMessage}>Something went wrong!</p>
        <span className={styles.errorDescription}>
          Please choose an option.
        </span>
      </div>
      <div className={styles.errorActions}>
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.path, item.state)}
            className={`${styles.errorButton} ${styles.navigationLink}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}