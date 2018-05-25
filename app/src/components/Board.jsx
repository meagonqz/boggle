import React from "react";
import { find as _find } from "lodash";
import { Letter } from "./Letter";
import "./stylesheets/Board.css";

export const Board = props => {
  const letters = props.board.map((col, colIndex) => {
    return (
      <div className="Board__LetterColumn" key={`${colIndex}`}>
        {col.map((elem, rowIndex) => {
          const selected = _find(props.selected, {
            col: colIndex,
            row: rowIndex
          });
          const disable =
            _find(props.disabled, { col: colIndex, row: rowIndex }) || selected;
          const addLetter = props.addLetter.bind(this, colIndex, rowIndex);
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
};

Board.defaultProps = {
  board: [],
  selected: [],
  disabled: [],
  addLetter: () => {}
};
