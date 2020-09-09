import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;

export const SIGN_UP_CONFIRM = gql`
  mutation signUpConfirm($id: String!, $secret: String!) {
    signUpConfirm(id: $id, secret: $secret)
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
    signUp(
      id: $id
      password: $password
      nickname: $nickname
      medical_id: $medical_id
      medical_cate: $medical_cate
      medical_certi: $medical_certi
    )
  }
`;

export const FIND_PW = gql`
  mutation findPw($id: String!, $medical_id: String!, $medical_cate: String!) {
    findPw(id: $id, medical_id: $medical_id, medical_cate: $medical_cate)
  }
`;

export const FIND_PW_CONFIRM = gql`
  mutation findPwConfirm($id: String!, $secret: String!) {
    findPwConfirm(id: $id, secret: $secret)
  }
`;
