import styles from "../CompanyDetailPage.module.scss";

export function LogoAndName({ imgSrc, companyName, companyCategory }) {
  return (
    <div className={styles.companyDetailHeader}>
      <img src={imgSrc} alt="사진없음" className={styles.companyLogo} />
      <div className={styles.companyNameAndCategory}>
        <p className={styles.detialPageWeight700}> {companyName}</p>
        <p className={styles.detialPageWeight500} style={{ color: "#747474" }}>
          {companyCategory}
        </p>
      </div>
    </div>
  );
}

export default LogoAndName;
