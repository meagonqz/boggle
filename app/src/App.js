import React from "react";
import { Game } from "./Game";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__Header">
          <h1 className="App__Title">Boggle</h1>
        </header>
        <div className="App__Content">
          <Game size={4} />
        </div>
      </div>
    );
  }
}

export default App;
