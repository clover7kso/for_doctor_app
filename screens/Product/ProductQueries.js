import { gql } from "apollo-boost";

export const PRODUCT_CATEGORY = gql`
  query productCategory {
    productCategory
  }
`;

export const PRODUCT_SUB_CATEGORY = gql`
  query productSubCategory($category: String!) {
    productSubCategory(category: $category)
  }
`;

export const PRODUCT_MANY = gql`
  query productMany(
    $mainCategory: String!
    $subCategory: String!
    $after: String
  ) {
    productMany(
      mainCategory: $mainCategory
      subCategory: $subCategory
      after: $after
    ) {
      id
      title
      content
      company
      sampleImages {
        url
      }
    }
  }
`;
