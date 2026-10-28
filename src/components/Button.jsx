import React from "react";
import { Link } from "react-router";

const Button = ({
  text,
  to,
  bg = "bg-[#8B0000]",
  textColor = "text-black",
  onClick,
}) => {
  const styles = `inline-flex items-center justify-center font-semibold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-300 tracking-wide ${bg} ${textColor} hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#000]/30 active:scale-95 active:translate-y-0 w-full sm:w-auto text-center cursor-pointer`;
  if (to) {
    return (
      <Link to={to} className={styles}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {text}
    </button>
  );
};

export default Button;
