import React from "react";
import "./FoundWordList.css";

export class FoundWordList extends React.Component {
  render() {
    return (
      <div className="FoundWordList">
        {this.props.foundWords.map(elem => <div key={elem}> {elem} </div>)}
      </div>
    );
  }
}

FoundWordList.defaultProps = {
  foundWords: [{ word: "test", value: "4" }]
};
