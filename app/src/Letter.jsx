import React from "react";
import "./Letter.css";

export class Letter extends React.Component {
  render() {
    const { elem, disabled, addLetter } = this.props;
    const letterStyle = disabled ? true : null;
    return (
      <button className="Letter" disabled={letterStyle} onClick={addLetter}>
        {elem}
      </button>
    );
  }
}
