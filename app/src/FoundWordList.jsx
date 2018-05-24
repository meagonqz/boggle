import React from "react";
import "./FoundWordList.css";

export class FoundWordList extends React.Component {
  render() {
    return (
      <div className="FoundWordList">
        <div className="FoundWordList__Score">
          {" "}
          Score: {this.props.totalScore}{" "}
        </div>
        Found words
        {this.props.foundWords.map(elem => (
          <div key={elem}>
            {" "}
            {elem} - {this.props.wordScores[elem]}{" "}
          </div>
        ))}
      </div>
    );
  }
}

FoundWordList.defaultProps = {
  foundWords: [],
  wordScores: {},
  totalScore: 0
};
