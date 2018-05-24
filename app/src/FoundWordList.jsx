import React from "react";
import "./FoundWordList.css";

export const FoundWordList = props => {
  return (
    <div className="FoundWordList">
      <div className="FoundWordList__Score">
        Score: {props.totalScore}
      </div>
      Found words
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
  totalScore: 0
};
