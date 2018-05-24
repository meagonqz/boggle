import React from "react";
import { find as _find } from "lodash";
import { getLetters } from "./lib/alphabet";
import { findTrieWord } from "./lib/dictionary";
import { constructIndices } from "./lib/board";
import { getScore } from "./lib/boggle";
import { Timer } from "./Timer";
import { Letter } from "./Letter";
import { FoundWordList } from "./FoundWordList";
import "./Board.css";

const emptyValues = {
  selected: [],
  selectedLetters: [],
  disabled: [],
  foundWords: [],
  wordScores: {},
  score: 0
};

export class Board extends React.Component {
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
    this.setState({
      disabled,
      selected: this.state.selected.concat([{ col: colIndex, row: rowIndex }]),
      selectedLetters: this.state.selectedLetters.concat([
        this.state.board[colIndex][rowIndex]
      ])
    });
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
      this.setState({
        wordScores: { ...this.state.wordScores, [`${word}`]: score }
      });
      this.setState({ score: this.state.score + score });
      this.resetSelected();
    } else {
      window.alert(`${word} is not a word! Try again`);
      this.resetSelected();
    }
  };

  renderBoard() {
    const letters = this.state.board.map((col, colIndex) => {
      return (
        <div className="Board__LetterColumn" key={`${colIndex}`}>
          <br />
          {col.map((elem, rowIndex) => {
            const selected = _find(this.state.selected, {
              col: colIndex,
              row: rowIndex
            });
            const disable =
              _find(this.state.disabled, { col: colIndex, row: rowIndex }) ||
              selected;
            const addLetter = this.addLetter.bind(this, colIndex, rowIndex);
            return (
              <Letter
                disabled={disable}
                selected={selected}
                key={`${colIndex}-${rowIndex}-${elem}`}
                addLetter={addLetter}
                elem={elem}
              />
            );
          })}
        </div>
      );
    });
    return <div className="Board">{letters}</div>;
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <Timer
            refreshBoard={this.refreshBoard}
            score={this.state.score}
            totalTime={120}
          />
          {this.renderBoard()}
          <form onSubmit={this.submitWord}>
            <input value={this.state.selectedLetters.join("")} />
            <input type="submit" />
            <input type="reset" onClick={this.resetSelected} />
          </form>
        </div>
        <FoundWordList
          foundWords={this.state.foundWords}
          wordScores={this.state.wordScores}
          totalScore={this.state.score}
        />
      </div>
    );
  }
}
