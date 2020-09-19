import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_ONE } from "./ProductQueries";
import { ActivityIndicator } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import ProductSampleImages from "../../components/ProductSampleImages";
import ProductDetailImages from "../../components/ProductDetailImages";
import ProductFooter from "../../components/ProductFooter";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InfoContainer = styled.View`
  padding-left: 20;
  padding-right: 20;
`;

const Title = styled.Text`
  margin-top: 10;
  font-size: 25;
`;
const Company = styled.Text`
  font-size: 12;
  text-align: right;
  color: grey;
`;
const Content = styled.Text`
  margin-top: 30;
  font-size: 18;
`;

export default ({ navigation, route }) => {
  const { id, subCategory } = route.params;
  const resProductOne = useQuery(PRODUCT_ONE, {
    variables: {
      id: id,
    },
  });
  resProductOne.refetch();

  console.log("------------------------");
  console.log(resProductOne.loading);
  console.log(resProductOne.data);
  console.log("------------------------");
  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={subCategory} />
      {resProductOne.loading ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <Container>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <ProductSampleImages
              imageArray={resProductOne.data.productOne.sampleImages}
            />
            <InfoContainer>
              <Title>{resProductOne.data.productOne.title}</Title>
              <Company>{resProductOne.data.productOne.company}</Company>
              <Content>{resProductOne.data.productOne.content}</Content>
            </InfoContainer>
            <ProductDetailImages
              imageArray={resProductOne.data.productOne.detailImages}
            />
          </ScrollView>
          <ProductFooter phoneNum={resProductOne.data.productOne.phone} />
        </Container>
      )}
    </OutContainer>
  );
};
