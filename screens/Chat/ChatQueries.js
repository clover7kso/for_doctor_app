import { gql } from "apollo-boost";

export const SEE_ROOMS = gql`
  query seeRooms{
    seeRooms{
        id
        from{
            avatar
            name
        }
        message{
            text
            timeFromToday
            createdAt
        }
    }
    }
`;
