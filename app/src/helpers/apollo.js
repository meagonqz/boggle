import { gql } from "apollo-boost";

export const BACKEND_URL = "http://localhost:4000";
export const API_URL = `${BACKEND_URL}/api`;
export const redirectToApiToLogin = () =>
  (window.location.href = `${BACKEND_URL}/auth/google`);

export const GET_SCORES = gql`
  query {
    scores {
      score
    }
  }
`;

export const SET_SCORE = score => gql`
  mutation {
    createScore(score: ${score}) {
      score
    }
  }
`;
