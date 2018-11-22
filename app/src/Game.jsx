import React from "react";
import { getLetters } from "./lib/alphabet";
import { findTrieWord } from "./lib/dictionary";
import { constructIndices } from "./lib/board";
import { getScore } from "./lib/boggle";
import { Timer } from "./components/Timer";
import { FoundWordList } from "./components/FoundWordList";
import { Board } from "./components/Board.jsx";

const emptyValues = {
  selected: [],
  selectedLetters: [],
  disabled: [],
  foundWords: [],
  wordScores: {},
  score: 0
};

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.size = props.size;
    this.state = {
      board: this.generateBoard(),
      ...emptyValues
    };
  }

  refreshBoard = () => {
    this.setState({
      board: this.generateBoard(),
      ...emptyValues
    });
  };

  resetSelected = () => {
    this.setState({ selected: [], selectedLetters: [], disabled: [] });
  };

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

  addLetter = (colIndex, rowIndex) => {
    const { disabled } = constructIndices(colIndex, rowIndex, this.size);
    this.setState(prevState => ({
      disabled,
      selected: prevState.selected.concat([{ col: colIndex, row: rowIndex }]),
      selectedLetters: prevState.selectedLetters.concat([
        prevState.board[colIndex][rowIndex]
      ])})
    );
  };

  submitWord = e => {
    e.preventDefault(); // Prevents page reload on form submission
    const word = this.state.selectedLetters.join("");
    if (word.length <= 2) {
      window.alert(`${word} is invalid, it must be at least 2 letters!`);
      this.resetSelected();
    } else if (this.state.foundWords.includes(word)) {
      window.alert(`${word} was already found! Try again`);
      this.resetSelected();
    } else if (findTrieWord(word)) {
      this.setState({ foundWords: this.state.foundWords.concat([word]) });
      const score = getScore(word);
      this.setState(prevState => ({
        wordScores: { ...prevState.wordScores, [`${word}`]: score }
        })
      );
      this.setState(prevState => ({ score: prevState.score + score }));
      this.resetSelected();
    } else {
      window.alert(`${word} is not a word! Try again`);
      this.resetSelected();
    }
  };

  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <Timer
            refreshBoard={this.refreshBoard}
            score={this.state.score}
            totalTime={120}
          />
          <Board
            board={this.state.board}
            selected={this.state.selected}
            disabled={this.state.disabled}
            addLetter={this.addLetter}
          />
          <form className="Board__ButtonContainer" onSubmit={this.submitWord}>
            <input
              className="Board__Input"
              value={this.state.selectedLetters.join("")}
            />
            <button className="Board__Button" type="submit">
              Submit
            </button>
            <button
              className="Board__Button"
              type="reset"
              onClick={this.resetSelected}
            >
              Reset
            </button>
          </form>
        </div>
        <FoundWordList
          foundWords={this.state.foundWords}
          wordScores={this.state.wordScores}
          score={this.state.score}
        />
      </div>
    );
  }
}
