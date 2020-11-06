import { gql } from "apollo-boost";

export const CLUB_ONE = gql`
  query($id: String!) {
    clubOne(id: $id) {
      timeFromToday
      userName
      userAvatar
      title
      content
      views
      clubImage
      phone
      chatRoomId
    }
  }
`;

export const CLUB_MANY = gql`
  query clubMany($after: String, $searchWord: String) {
    clubMany(after: $after, searchWord: $searchWord) {
      cursor
      clubs {
        id
        title
        content
        views
        timeFromToday
        userName
        clubImage
      }
    }
  }
`;

export const CLUB_ADD_VIEW = gql`
  mutation clubAddView($clubId: String!) {
    clubAddView(clubId: $clubId)
  }
`;

export const CLUB_UPLOAD = gql`
  mutation clubUpload($category: String!, $title: String!, $content: String!) {
    clubUpload(category: $category, title: $title, content: $content)
  }
`;

export const COMMENT_UPLOAD = gql`
  mutation commentUpload($clubId: String!, $text: String!) {
    commentUpload(clubId: $clubId, text: $text)
  }
`;
