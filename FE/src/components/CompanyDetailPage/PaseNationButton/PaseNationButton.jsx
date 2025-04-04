import styles from "./PaseNationButton.module.scss";

export function PaseNationButton({ value, onClick }) {
  return (
    <>
      <button className={styles.PaseNationButton} onClick={onClick}>
        {value}
      </button>
    </>
  );
}

export default PaseNationButton;
