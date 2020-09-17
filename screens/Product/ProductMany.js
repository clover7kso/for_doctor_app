import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_SUB_CATEGORY, PRODUCT_MANY } from "./ProductQueries";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import ProductSearchBox from "../../components/ProductSearchBox";
import ProductSubCategory from "../../components/ProductSubCategory";
import Product from "../../components/Product";
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
  const resSubCate = useQuery(PRODUCT_SUB_CATEGORY, {
    variables: { category: category },
  });
  resSubCate.refetch();
  const selectText = useInput(resSubCate.data.productSubCategory[0]);

  const resProductMany = useQuery(PRODUCT_MANY, {
    variables: { mainCategory: category, subCategory: selectText.value },
  });
  resProductMany.refetch();
  const [lastItem, setLastItem] = useState(
    resProductMany.data.productMany.slice(-1)[0].id
  );

  const onLoadMore = () => {
    resProductMany.fetchMore({
      variables: {
        mainCategory: category,
        subCategory: selectText.value,
        after: lastItem,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setLastItem(fetchMoreResult.productMany.slice(-1)[0].id);
        return Object.assign({}, prev, {
          productMany: [...prev.productMany, ...fetchMoreResult.productMany],
        });
      },
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await resProductMany.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={category} />
      <ProductSearchBox />
      {resSubCate.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          {resSubCate.data.productSubCategory.length === 0 ? null : (
            <ProductSubCategory
              {...selectText}
              tabArray={resSubCate.data.productSubCategory}
            />
          )}

          {resProductMany.loading ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <FlatList
              data={resProductMany.data.productMany}
              renderItem={Product}
              keyExtractor={(item, index) => item.id}
              refreshing={refreshing}
              onRefresh={refresh}
              onEndReached={onLoadMore}
              onEndReachedThreshold={1}
            />
          )}
        </Container>
      )}
    </OutContainer>
  );
};
