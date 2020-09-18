import { gql } from "apollo-boost";

export const PRODUCT_CATEGORY = gql`
  query productCategory($type: String!) {
    productCategory(type: $type)
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
    $subCategory: String
    $after: String
    $searchWord: String
  ) {
    productMany(
      mainCategory: $mainCategory
      subCategory: $subCategory
      after: $after
      searchWord: $searchWord
    ) {
      cursor
      products {
        id
        title
        content
        company
        sampleImages {
          url
        }
      }
    }
  }
`;
