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
