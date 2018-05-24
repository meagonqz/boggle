import React from "react";
import "./Letter.css";

export const Letter = props => {
  const { elem, disabled, addLetter } = props;
  const letterStyle = disabled ? true : null;
  return (
    <button className="Letter" disabled={letterStyle} onClick={addLetter}>
      {elem}
    </button>
  );
};
