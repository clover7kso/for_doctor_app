import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";
const Container = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const InContainer1 = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const ImageSample = styled.Image`
  border-radius: 15;
  resize-mode: contain;
  width: ${constants.width / 2.4};
  height: ${(constants.width / 3) * (20 / 19)};
`;
const InContainer2 = styled.View`
  justify-content: space-around;
  padding-left:10
  width: ${constants.width / 2};
  height: ${(constants.width / 3) * (20 / 19)};
`;
const InContainer3 = styled.View`
  align-items: flex-end;
`;
const Title = styled.Text`
  font-family:"NotoSansCJKkr_Regular"font-size: 20px;
`;
const Content = styled.Text`
  font-family:"NotoSansCJKkr_Regular"font-size: 15px;
`;
const Info = styled.Text`
  font-family:"NotoSansCJKkr_Regular"color: grey;
  font-size: 12px;
`;
const Divider = styled.View`
  background: #f0f0f0;
  border-radius: 30;
  height: 1;
`;

const MyProduct = ({ item, navigation }) => {
  const mItem = item.product;
  return (
    <Container>
      <Touchable
        onPress={() => {
          navigation.navigate("ProductOne", {
            id: mItem.id,
            subCategory: mItem.subCategory,
          });
        }}
      >
        <InContainer1>
          <ImageSample source={{ uri: mItem.sampleImages[0].url }} />
          <InContainer2>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {mItem.title}
            </Title>
            <Content numberOfLines={3} ellipsizeMode="tail">
              {mItem.content}
            </Content>
            <InContainer3>
              <Info numberOfLines={1} ellipsizeMode="tail">
                {mItem.company}
              </Info>
            </InContainer3>
          </InContainer2>
        </InContainer1>
      </Touchable>
      <Divider />
    </Container>
  );
};

MyProduct.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MyProduct;
