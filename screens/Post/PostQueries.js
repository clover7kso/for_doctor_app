import { gql } from "apollo-boost";

export const POST_TOP = gql`
  query {
    postTop {
      id
      category
      title
      views
      commentCount
      timeFromToday
    }
  }
`;

export const POST_ONE = gql`
  query($id: String!) {
    postOne(id: $id) {
      userName
      timeFromToday

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
    }
  }
`;
