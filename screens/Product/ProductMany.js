import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_SUB_CATEGORY, PRODUCT_MANY } from "./ProductQueries";
import { ActivityIndicator, FlatList } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import ProductSearchBox from "../../components/ProductSearchBox";
import ProductSubCategory from "../../components/ProductSubCategory";
import Product from "../../components/Product";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
  
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const { category } = route.params;
  const resSubCate = useQuery(PRODUCT_SUB_CATEGORY, {
    variables: { category: category },
  });
  resSubCate.refetch();
  const [selectText, setSelectText] = !resSubCate.loading
    ? useState(resSubCate.data.productSubCategory[0])
    : useState(null);

  const [searchWord, setSearchWord] = useState("");
  const resProductMany = useQuery(PRODUCT_MANY, {
    variables: {
      mainCategory: category,
      subCategory: selectText,
      searchWord: searchWord,
    },
  });

  const onLoadMore = () => {
    if (!loadMore & (resProductMany.data.productMany.cursor !== "End")) {
      setLoadMore(true);
      resProductMany.fetchMore({
        variables: {
          mainCategory: category,
          subCategory: selectText,
          after: resProductMany.data.productMany.cursor,
          searchWord: searchWord,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setLoadMore(false);
          return {
            productMany: {
              __typename: prev.productMany.__typename,
              cursor: fetchMoreResult.productMany.cursor,
              products: [
                ...prev.productMany.products,
                ...fetchMoreResult.productMany.products,
              ],
            },
          };
        },
      });
    }
  };

  const [loadMore, setLoadMore] = useState(false);
  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loadMore) return null;
    return <ActivityIndicator style={{ color: "#000" }} />;
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
      <ProductSearchBox value={searchWord} onChange={setSearchWord} />
      {resSubCate.loading ? null : (
        <Container>
          {resSubCate.data.productSubCategory.length === 0 ? null : (
            <ProductSubCategory
              value={selectText}
              onChange={setSelectText}
              tabArray={resSubCate.data.productSubCategory}
            />
          )}

          {resProductMany.loading ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={resProductMany.data.productMany.products}
              renderItem={({ item }) => Product({ item, navigation })}
              keyExtractor={(item, index) => item.id}
              ListFooterComponent={renderFooter}
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
