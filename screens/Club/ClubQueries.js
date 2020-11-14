import { gql } from "apollo-boost";

export const CLUB_ONE = gql`
  query($id: String!) {
    clubOne(id: $id) {
      userId
      timeFromToday
      userName
      userAvatar
      title
      content
      views
      clubImage
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
  mutation clubUpload($clubImage: String!, $title: String!, $content: String!) {
    clubUpload(clubImage: $clubImage, title: $title, content: $content)
  }
`;

export const COMMENT_UPLOAD = gql`
  mutation commentUpload($clubId: String!, $text: String!) {
    commentUpload(clubId: $clubId, text: $text)
  }
`;


export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId:String, $sendText:String!, $toId:String!){
      sendMessage(roomId:$roomId, sendText:$sendText, toId:$toId)
      {
        room{
          id
        }
      }
  }
`