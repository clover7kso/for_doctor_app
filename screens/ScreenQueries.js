import { gql } from "apollo-boost";

export const HOME_AD_MANY = gql`
  query {
    homeAdMany {
      id
      createdAt
      updatedAt
      expireAt
      imageUrl
      url
    }
  }
`;


export const USER_PROFILE = gql`
  query {
    profile{
      id
      role
      name
    }
  }
`;
