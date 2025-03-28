import styles from "../CompanyDetailPage.module.css";

export function PaseNationButton({ value }) {
  return (
    <>
      <button className={styles.PaseNationButton}>{value}</button>
    </>
  );
}

export default PaseNationButton;
