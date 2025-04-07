import styles from "./Description.module.scss";

export function Description({ text }) {
  return (
    <>
      <div className={styles.companyDetailDescription}>
        <p className={styles.detialIntroduce}>기업 소개</p>
        <p className={styles.detialPagetext}>{text}</p>
      </div>
    </>
  );
}

export default Description;
