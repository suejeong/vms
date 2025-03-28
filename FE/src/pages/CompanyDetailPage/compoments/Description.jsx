import styles from "../CompanyDetailPage.module.scss";

export function Description({ className, text }) {
  return (
    <>
      <div className={className}>
        <p className={styles.detialPageWeight600}>기업 소개</p>
        <p className={styles.detialPageWeight400}>{text}</p>
      </div>
    </>
  );
}

export default Description;
