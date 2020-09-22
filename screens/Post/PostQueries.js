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
      timeFromToday
      userName
      userAvatar
      title
      content
      views
      comments {
        userName
        userAvatar
        timeFromToday
        text
      }
    }
  }
`;

export const POST_MANY = gql`
  query postMany($category: String!, $after: String, $searchWord: String) {
    postMany(category: $category, after: $after, searchWord: $searchWord) {
      cursor
      posts {
        id
        title
        content
        views
        timeFromToday
        commentCount
        userName
      }
    }
  }
`;

export const POST_ADD_VIEW = gql`
  mutation postAddView($postId: String!) {
    postAddView(postId: $postId)
  }
`;

export const POST_UPLOAD = gql`
  mutation postUpload($category: String!, $title: String!, $content: String!) {
    postUpload(category: $category, title: $title, content: $content)
  }
`;
