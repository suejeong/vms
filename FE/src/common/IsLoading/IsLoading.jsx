import React from "react";
import styles from "./IsLoading.module.scss";
import loading from "../../assets/images/icons/loading.gif";

export default function IsLoading() {
  return (
    <section className={styles.loadingContainer}>
      <div className={styles.loadingWrapper}>
        <img className={styles.loadingImage} src={loading} alt="Loading..." />
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </section>
  );
}
