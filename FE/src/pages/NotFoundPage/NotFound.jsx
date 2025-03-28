import React from "react";
import styles from './NotFound.module.css';
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigationItems = [
    { label: "홈으로", idx: 0 },
    { label: "나의 기업 비교", idx: 1 },
    { label: "비교 현황", idx: 2 },
    { label: "투자 현황", idx: 3 },
  ];

  const handleClick = (idx) => {
    navigate(`/`, { state: { idx } });
  };

  return (
    <section className={styles.errorPage}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Oops!</h1>
        <p className={styles.errorMessage}>
          We can't seem to find the page you're looking for.
        </p>
        <span className={styles.errorCode}>Error code: 404</span>
      </div>
      <ul className={styles.navigationList}>
        {navigationItems.map((item) => (
          <li key={item.idx} className={styles.navigationItem}>
            <button 
              onClick={() => handleClick(item.idx)} 
              className={styles.navigationLink}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
