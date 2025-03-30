import styles from "./PaseNationButton.module.scss";

export function PaseNationButton({ value }) {
  return (
    <>
      <button className={styles.PaseNationButton}>{value}</button>
    </>
  );
}

export default PaseNationButton;
