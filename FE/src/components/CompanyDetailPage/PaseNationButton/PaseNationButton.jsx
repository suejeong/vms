export function PaseNationButton({ value, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`
          bg-black100 
          ${isActive ? "!text-white bg-brand-orange" : " bg-black100"}
      `}
    >
      {value}
    </button>
  );
}
export default PaseNationButton;
