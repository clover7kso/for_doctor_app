import { gql } from "apollo-boost";

export const SEE_ROOMS = gql`
  query seeRooms{
    seeRooms{
        id
        participants{
            id
            avatar
            name
        }
        recentMessage{
            text
            timeFromToday
            createdAt
        }
    }
    }
`;


export const SEE_ROOM = gql`
  query seeRoom($roomId:String!){
    seeRoom(roomId:$roomId){
        allMessages{
            from{
                name
            }
            text
            timeFromToday
            createdAt
            }
        }
    }
`;


export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String!, $sendText: String!, $toId: String!) {
    sendMessage(roomId: $roomId, sendText: $sendText, toId: $toId) {
        createdAt
        from{
            name
        }
        text
        timeFromToday
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($roomId:String!) {
    newMessage(roomId:$roomId) {
        createdAt
        from{
            name
        }
        text
        timeFromToday
    }
  }
`;
