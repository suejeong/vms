import React from "react";
import style from "./Button.module.scss";

function Button({
  size,
  shape,
  border,
  color,
  onClick,
  text,
  image,
  disabled,
}) {
  return (
    <button
      className={`${style[size]} ${style[shape]} ${style[border]} ${style[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {image}
      {text}
    </button>
  );
}

export default Button;
