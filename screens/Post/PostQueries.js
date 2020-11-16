import { gql } from "apollo-boost";

export const POST_SUB_CATEGORY = gql`
  query postSubCategory{
    postSubCategory
  }
`;

export const POST_ONE = gql`
  query($id: String!) {
    postOne(id: $id) {
      anonymous
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
        anonymous
        id
        title
        content
        views
        timeFromToday
        commentCount
        userName
        userAvatar
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
  mutation postUpload($category: String!, $title: String!, $content: String!, $anonymous:Boolean) {
    postUpload(category: $category, title: $title, content: $content, anonymous:$anonymous)
  }
`;

export const COMMENT_UPLOAD = gql`
  mutation commentUpload($postId: String!, $text: String!) {
    commentUpload(postId: $postId, text: $text)
  }
`;
