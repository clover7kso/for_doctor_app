import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;
