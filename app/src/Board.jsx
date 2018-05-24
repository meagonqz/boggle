import React from "react";
import { find as _find } from "lodash";
import { getLetters } from "./lib/alphabet";
import { findTrieWord } from "./lib/dictionary";
import { constructIndices } from "./lib/board";
import { Timer } from "./Timer";
import { Letter } from "./Letter";
import { FoundWordList } from './FoundWordList';
import "./Board.css";

export class Board extends React.Component {
  constructor() {
    super();
    // Change size here
    this.size = 4;
    this.state = {
      board: this.generateBoard(),
      selected: [],
      selectedLetters: [],
      disabled: [],
      foundWords: []
    };
  }

  refreshBoard = () => {
    this.setState({ board: this.generateBoard(), selectedLetters: [], selected: [], disabled: [], foundWords: [] })
  }

  resetSelected = () => {
    this.setState({ selected: [], selectedLetters: [], disabled: [] })
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
    const letters = this.state.board.map((col, colIndex) => {
      return (
        <div className="Board__LetterColumn" key={`${colIndex}`}>
          <br />
          { /** TODO: focus selected letters and show in input box */}
          { col.map((elem, rowIndex) => {
            const disable = _find(this.state.disabled, { col: colIndex, row: rowIndex }) || _find(this.state.selected, { col: colIndex, row: rowIndex });
            // TODO: or it's already selected
            const addLetter = this.addLetter.bind(this, colIndex, rowIndex);
            return (<Letter
              disabled={disable}
              key={`${colIndex}-${rowIndex}-${elem}`}
              addLetter={addLetter}
              elem={elem}
            />
          )})
          }
        </div>
      );
    });
    return <div className="Board">{letters}</div>;
  }

  addLetter = (colIndex, rowIndex) => {
    const { disabled } = constructIndices(colIndex, rowIndex, this.size);
    this.setState({ disabled,
      selected: this.state.selected.concat([{ col: colIndex, row: rowIndex }]),
      selectedLetters: this.state.selectedLetters.concat([
        this.state.board[colIndex][rowIndex]
      ])
    });
  }

  submitWord = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const word = this.state.selectedLetters.join("");
    if (word.length <= 2) {
      window.alert(`${word} is invalid, it must be at least 2 letters!`);
      this.resetSelected();
      return;
    }
    if (findTrieWord(word)) {
      this.setState({ foundWords: this.state.foundWords.concat([word]) })
     } else {
       window.alert(`${word} is not a word! Try again`);
       this.resetSelected();
     }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Timer refreshBoard={this.refreshBoard} />
          {this.renderBoard()}
          <form onSubmit={this.submitWord}>
            <input value={this.state.selectedLetters.join("") }/>
            <button type="submit">Submit</button>
            <input type="reset" onClick={this.resetSelected} />
          </form>
        </div>
        <FoundWordList foundWords={this.state.foundWords} />
      </div>
    );
  }
}
