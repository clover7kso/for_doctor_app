import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { PRODUCT_ONE, TOGGLE_LIKE, PRODUCT_ADD_CALL } from "./ProductQueries";
import { ActivityIndicator } from "react-native";
import BackPressHeader3 from "../../components/BackPressHeader3";
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
  margin-bottom: 40;
  margin-top: 20;
`;

const Title = styled.Text`
  font-family:NotoSansCJKkr_Regular
  margin-top: 10;
  font-size: 25;
`;
const Company = styled.Text`
  font-family:NotoSansCJKkr_Thin
  font-size: 12;
  text-align: right;  
  color: grey;
`;
const Content = styled.Text`
  font-family:NotoSansCJKkr_Thin
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
  const [isLiked, setIsLiked] = !resProductOne.loading
    ? useState(resProductOne.data.productOne.isLiked)
    : useState(false);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      productId: id,
    },
  });
  const [productAddCall] = useMutation(PRODUCT_ADD_CALL, {
    variables: {
      productId: id,
    },
  });

  const handleToggleLike = async () => {
    setIsLiked((p) => !p);
    try {
      await toggleLikeMutation();
    } catch (e) {}
  };

  const handleToChat = async () => {
    navigation.navigate("Message", {roomId:resProductOne.data.productOne.chatRoomId,toId:resProductOne.data.productOne.marketerId, toName:resProductOne.data.productOne.marketerName})
  };

  return (
    <OutContainer>
      <BackPressHeader3 navigation={navigation} />
      {resProductOne.loading ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <Container>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}>
            <ProductSampleImages
              imageArray={resProductOne.data.productOne.sampleImages}/>
            <InfoContainer>
              <Title>{resProductOne.data.productOne.title}</Title>
              <Company>{resProductOne.data.productOne.company}</Company>
              <Content>{resProductOne.data.productOne.content}</Content>
            </InfoContainer>
            <ProductDetailImages
              imageArray={resProductOne.data.productOne.detailImages}
            />
          </ScrollView>
          <ProductFooter
            isLiked={isLiked}
            onLike={handleToggleLike}
            onCall={productAddCall}
            onChat={handleToChat}
            phoneNum={resProductOne.data.productOne.phone}/>
        </Container>
      )}
    </OutContainer>
  );
};
