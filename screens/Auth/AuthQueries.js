import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;

export const CHECK_ID_PHONE = gql`
  mutation checkIdPhone($id: String!, $phone: String!){
    checkIdPhone(id: $id, phone:$phone)
  }
`;

export const SIGN_UP_MEDICAL = gql`
  mutation signUpMedical($id: String!,$password:String!, $phone:String!, $name:String!, $role:String! ,$medical_id:String!, $medical_cate:String!,$medical_certi:String!, $medical_hospital:String!){
    signUpMedical(id: $id, password: $password, phone: $phone, name: $name, role:$role, medical_id:$medical_id, medical_cate:$medical_cate, medical_certi:$medical_certi, medical_hospital:$medical_hospital)
  }
`;

export const SIGN_UP_MARKETER = gql`
  mutation signUpMarketer($id: String!,$password:String!, $phone:String!, $name:String!, $company_cate:String!, $company_name:String!,$company_id:String!,$company_certi:String!){
    signUpMarketer(id: $id, password: $password, phone: $phone, name: $name,  company_cate:$company_cate, company_name:$company_name, company_id:$company_id ,company_certi:$company_certi)
  }
`;

export const MEDICAL_CATEGORY = gql`
  query medicalCategory($role:String!) {
    medicalCategory(role:$role)
  }
`;

export const MARKETER_CATEGORY = gql`
  query marketerCategory {
    marketerCategory
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

export const PHONE_CHECK = gql`
  mutation phoneCheck($phoneNumber: String!, $checkNumber: String!) {
    phoneCheck(phoneNumber: $phoneNumber, checkNumber: $checkNumber)
  }
`;


export const PHONE_REQUEST = gql`
  mutation phoneRequest($phoneNumber: String!) {
    phoneRequest(phoneNumber: $phoneNumber)
  }
`;
