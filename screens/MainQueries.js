import { gql } from "apollo-boost";

export const POST_TOP = gql`
  query {
    postTop {
      id
      category
      title
      views
    }
  }
`;
