import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_SUB_CATEGORY } from "./ProductQueries";
import { ActivityIndicator } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import ProductSearchBox from "../../components/ProductSearchBox";
import ProductSubCategory from "../../components/ProductSubCategory";
import useInput from "../../hooks/useInput";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
  
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const { category } = route.params;

  const { loading, error, data = { productSubCategory: {} } } = useQuery(
    PRODUCT_SUB_CATEGORY,
    {
      variables: { category: category },
    }
  );

  const selectText = useInput("");

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={category} />
      <ProductSearchBox />
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          {data.productSubCategory.length === 0 ? null : (
            <ProductSubCategory
              {...selectText}
              tabArray={data.productSubCategory}
            />
          )}
          <Text>ProductMany</Text>
        </Container>
      )}
    </OutContainer>
  );
};
