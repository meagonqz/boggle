import React from "react";
import "./FoundWordList.css";

export const FoundWordList = props => {
  return (
    <div className="FoundWordList">
      <div className="FoundWordList__Title">
      Score: <span style={{ fontWeight: 'normal' }}> {props.score} </span>
      </div>
      <div className="FoundWordList__Title">
      Found words
      </div>
      {props.foundWords.map(elem => (
        <div key={elem}>
          {elem} - {props.wordScores[elem]}
        </div>
      ))}
    </div>
  );
};

FoundWordList.defaultProps = {
  foundWords: [],
  wordScores: {},
  score: 0
};
