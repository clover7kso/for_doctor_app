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

export const POST_ONE = gql`
  query($id: String!) {
    postOne(id: $id) {
      updatedAt
      createdAt
      userName

      category
      title
      content
      views
      comments {
        postId
        userName
        createdAt
        updatedAt
        text
      }
      anonymous
    }
  }
`;
