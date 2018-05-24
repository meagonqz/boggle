import React from "react";
import { Board } from "./Board";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__Header">
          <h1 className="App__Title">Welcome to Boggle</h1>
        </header>
        <div className="App__Content">
          <Board size={4} />
        </div>
      </div>
    );
  }
}

export default App;
