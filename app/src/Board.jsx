import React from "react";
import "./Board.css";
import { getLetters } from "./lib/alphabet";

export class Board extends React.Component {
  constructor() {
    super();
    // Change size here
    this.size = 4;
    // Change totalTime here
    this.totalTime = 120;
    this.state = {
      gamesPlayed: 0,
      board: this.generateBoard(),
      timer: null,
      time: this.totalTime
    };
  }

  componentDidMount() {
    const timer = setInterval(() => this.tick(), 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    if (this.state.time == 0) {
      this.setState({
        gamesPlayed: this.state.gamesPlayed + 1,
        board: this.generateBoard(),
        time: this.totalTime
      });
    }
    this.setState({
      time: this.state.time - 1
    });
  }

  generateBoard() {
    const letters = getLetters(this.size);
    let index = 0;
    return Array(this.size)
      .fill(0)
      .map(() => {
        const arr = Array.from(letters.slice(index, index + this.size));
        index += this.size;
        return arr;
      });
  }

  renderBoard() {
    let boardString = "";
    console.log(this.state.board);
    this.state.board.forEach(row => {
      boardString += "<br/>";
      row.forEach(elem => (boardString += elem));
    });
    return boardString;
  }

  render() {
    return (
      <div key={this.state.gamesPlayed}>
        <div className="Timer">{this.state.time} </div>
        <div
          className="Board"
          dangerouslySetInnerHTML={{ __html: this.renderBoard() }}
        />
      </div>
    );
  }
}
