import styles from "./LogoAndName.module.scss";

export function LogoAndName({ imgSrc, companyName, companyCategory }) {
  return (
    <div className={styles.companyDetailHeader}>
      <img src={imgSrc} alt={companyName} className={styles.companyLogo} />
      <div className={styles.companyNameAndCategory}>
        <p className={styles.companyName}> {companyName}</p>
        <p className={styles.companyCategory}>{companyCategory}</p>
      </div>
    </div>
  );
}

export default LogoAndName;
