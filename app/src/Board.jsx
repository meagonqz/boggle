import React from "react";
import "./Board.css";
import { getLetters } from './lib/alphabet';

export class Board extends React.Component {
  constructor() {
    super();
    // Change size here
    this.size = 4;
    this.state = { board: this.generateBoard() };
  }

  generateEmptyBoard() {
    return Array(this.size)
      .fill(0)
      .map(() => Array(this.size).fill(0));
  }

  generateBoard() {
    let board = this.generateEmptyBoard();
    const letters = getLetters(this.size);
    console.log(letters);
    return board;
  }

  renderBoard() {
    let boardString = "";
    this.state.board.forEach(row => {
      boardString += "<br/>";
      row.forEach(elem => (boardString += elem));
    });
    return boardString;
  }

  render() {
    return (
      <div
        className="Board"
        dangerouslySetInnerHTML={{ __html: this.renderBoard() }}
      />
    );
  }
}
