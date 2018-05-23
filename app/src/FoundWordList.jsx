import React from "react";
import "./FoundWordList.css";

export class FoundWordList extends React.Component {
  render() {
    return (
      <div className="FoundWordList">
        {this.props.list.map(elem => <div key={elem.word}> {elem.word} </div>)}
      </div>
    );
  }
}

FoundWordList.defaultProps = {
  list: [{ word: "test", value: "4" }]
};
