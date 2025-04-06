import styles from "./Description.module.scss";

export function Description({ text }) {
  return (
    <>
      <div className={styles.companyDetailDescription}>
        <p className={styles.detialPageWeight600}>기업 소개</p>
        <p className={styles.detialPageWeight400}>{text}</p>
      </div>
    </>
  );
}

export default Description;
