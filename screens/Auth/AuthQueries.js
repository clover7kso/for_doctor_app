import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;

export const MEDICAL_CATEGORY = gql`
  query medicalCategory {
    medicalCategory
  }
`;

export const SIGN_UP = gql`
  mutation signUp(
    $id: String!
    $password: String!
    $nickname: String!
    $medical_id: String!
    $medical_cate: String!
    $medical_certi: String!
  ) {
    signIn(
      id: $id
      password: $password
      nickname: $nickname
      medical_id: $medical_id
      medical_cate: $medical_cate
      medical_certi: $medical_certi
    )
  }
`;
