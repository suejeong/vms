import styles from "./PaseNationButton.module.scss";

export function PaseNationButton({ value, onClick, isActive }) {
  return (
    <button
      className={`${styles.PaseNationButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
export default PaseNationButton;
