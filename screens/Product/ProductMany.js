import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  PRODUCT_SUB_CATEGORY,
  PRODUCT_MANY,
  PRODUCT_ADD_VIEW,
} from "./ProductQueries";
import { ActivityIndicator, SectionList } from "react-native";
import BackPressHeader2 from "../../components/BackPressHeader2";
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

const LoadingContainer = styled.View`
  align-items: center;
  justify-content:center;
  flex: 1;
`;

const SectionTitle = styled.Text`
  font-family:WandocleanseaB
  margin-top:20px
  font-size:19px
`;

const Divider = styled.View`
  background: #f0f0f0;
  border-radius: 30;
  height: 1;
`;

export default ({ navigation, route }) => {
  const { title,category } = route.params;
  const resSubCate = useQuery(PRODUCT_SUB_CATEGORY, {
    variables: { category: category },
  });
  resSubCate.refetch();
  const [selectText, setSelectText] = !resSubCate.loading && resSubCate.data!==undefined
    ? useState(resSubCate.data.productSubCategory[0])
    : useState(null);

  const [searchWord, setSearchWord] = useState("");
  const resProductMany = useQuery(PRODUCT_MANY, {
    variables: {
      mainCategory: category,
      subCategory: selectText,
      searchWord: searchWord,
    },
    fetchPolicy: "network-only",
  });

  const adItems = (element) =>{
    if(element.aboveAD) return true
  }
  const normalItems = (element) =>{
    if(!element.aboveAD) return true
  }


  const [productAddView] = useMutation(PRODUCT_ADD_VIEW);
  const handleProductAddView = (id) => {
    productAddView({ variables: { productId: id } });
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

  const shuffle=(array)=> {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
        temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  return (
    <OutContainer>
      <BackPressHeader2 navigation={navigation} mainText={title} subText={category.replace("마케팅","").substring(0,4)} />
      <ProductSearchBox value={searchWord} onChange={setSearchWord} />
      {resSubCate.loading ? null : (
        <Container>
          {resSubCate.data !== undefined && resSubCate.data.productSubCategory.length === 0 ? null : (
            <ProductSubCategory
              value={selectText}
              onChange={setSelectText}
              tabArray={resSubCate.data.productSubCategory}
            />
          )}

          {resProductMany.loading? (
            <LoadingContainer>
              <ActivityIndicator color={"black"} />
            </LoadingContainer>
          ) :resProductMany.data !== undefined && resProductMany.data.productMany.length !== 0?(
            <SectionList
              sections={[{
                title:"추천제품",
                data : shuffle(resProductMany.data.productMany.filter(adItems))
              },
              {
                title:"일반제품",
                data : shuffle(resProductMany.data.productMany.filter(normalItems))
              }]}
              showsVerticalScrollIndicator ={false}
              renderItem={({ item }) =>
                Product({ item, navigation, handleProductAddView })
              }
              renderSectionHeader={({ section: { title } }) => (
                title==="추천제품"?
                  (resProductMany.data.productMany.filter(adItems).length>0?
                    <SectionTitle>{title}</SectionTitle>:null)
                      :resProductMany.data.productMany.filter(normalItems).length>0?
                        <SectionTitle>{title}</SectionTitle>:null
              )}
              ItemSeparatorComponent={()=>(<Divider/>)}
              keyExtractor={(item, index) => item + index}
              refreshing={refreshing}
              onRefresh={refresh}
            />
          ):(
            <LoadingContainer>
              <SectionTitle>아직 준비된 상품이 없습니다</SectionTitle>
            </LoadingContainer>
          )}
        </Container>
      )}
    </OutContainer>
  );
};
