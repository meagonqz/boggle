import React from "react";
import "./Letter.css";

export const Letter = props => {
  const { elem, disabled, addLetter, selected } = props;
  const letterStyle = disabled ? true : null;
  const className = selected ? "Letter Letter--selected" : "Letter";
  return (
    <button className={className} disabled={letterStyle} onClick={addLetter}>
      {elem}
    </button>
  );
};
