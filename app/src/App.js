import React, { useState } from "react";
import { Game } from "./Game";
import ApolloClient from "apollo-boost";
import { ApolloConsumer } from "@apollo/react-common";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { API_URL, redirectToApiToLogin, GET_SCORES } from "./helpers/apollo";
import "./App.css";

const client = new ApolloClient({
  credentials: "include",
  uri: API_URL
});

const App = () => {
  const [currentHighScore, updateHighScore] = useState(0);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App__Header">
          <h1 className="App__Title">Boggle</h1>
          <UserData highScoreThisSession={currentHighScore} />
        </header>
        <div className="App__Content">
          <ApolloConsumer>
            {client => (
              <Game
                updateHighScore={updateHighScore}
                size={4}
                time={120}
                client={client}
              />
            )}
          </ApolloConsumer>
        </div>
      </div>
    </ApolloProvider>
  );
};

const UserData = ({ highScoreThisSession: currentHighScore }) => {
  const { loading, data } = useQuery(GET_SCORES, { variables: null });
  if (loading) return null;
  if (data) {
    const scores = data.scores.map(score => score.score);
    const highScore = Math.max(...scores, currentHighScore);
    return <div>{`High score: ${highScore}`} </div>;
  }
  // TODO: add notification saying login failed if { error } from useQuery
  return (
    <button className="App__Button" onClick={redirectToApiToLogin}>
      Login
    </button>
  );
};

export default App;
