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
    $searchWord: String
  ) {
    productMany(
      mainCategory: $mainCategory
      subCategory: $subCategory
      searchWord: $searchWord
    ) {
        aboveAD
        id
        title
        content
        company
        subCategory
        sampleImages {
          url
        }
    }
  }
`;

export const PRODUCT_ONE = gql`
  query productOne($id: String!) {
    productOne(id: $id) {
      isLiked
      sampleImages {
        url
      }
      detailImages {
        url
      }
      title
      content
      views
      company
      phone
      marketerName
      marketerId
      chatRoomId
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($productId: String!) {
    toggleLike(productId: $productId)
  }
`;
export const PRODUCT_ADD_VIEW = gql`
  mutation productAddView($productId: String!) {
    productAddView(productId: $productId)
  }
`;

export const PRODUCT_ADD_CALL = gql`
  mutation productAddCall($productId: String!) {
    productAddCall(productId: $productId)
  }
`;
