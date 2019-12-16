import React from "react";
import { Game } from "./Game";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

const client = new ApolloClient({
  credentials: "include",
  uri: "http://localhost:4000/api/"
});

const API_URL = "http://localhost:4000/";
const redirectToApiToLogin = () =>
  (window.location.href = `${API_URL}/auth/google`);

const GET_SCORES = gql`
  query {
    scores {
      score
    }
  }
`;

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App__Header">
          <h1 className="App__Title">Boggle</h1>
          <UserData setLoggedIn={setLoggedIn} />
        </header>
        <div className="App__Content">
          <Game size={4} isLoggedin={isLoggedIn} />
        </div>
      </div>
    </ApolloProvider>
  );
};

const UserData = ({ setLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_SCORES, { variables: null });
  if (loading) return null;
  if (data) {
    const scores = data.scores.map(score => score.score);
    setLoggedIn(true);
    return <div>{`High score: ${Math.max(...scores)}`} </div>;
  }
  // TODO: add notification saying login failed
  setLoggedIn(false);
  return (
    <button className="App__Button" onClick={redirectToApiToLogin}>
      Login
    </button>
  );
};

export default App;
