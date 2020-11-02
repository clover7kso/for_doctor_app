import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
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
  resize-mode: cover;
  width: ${constants.width / 2 - 10};
  height: ${constants.width / 3 - 10};
`;
const InContainer2 = styled.View`
  justify-content: space-around;
  padding-left:10
  width: ${constants.width / 2 - 10};
  height: ${constants.width / 3};
`;
const InContainer3 = styled.View`
  align-items: flex-end;
`;
const Title = styled.Text`
  font-family:NotoSansCJKkr_Regular
  font-size: 20px;
`;
const Content = styled.Text`
  font-family:NotoSansCJKkr_Thin
  font-size: 15px;
`;
const Info = styled.Text`
  font-family:NotoSansCJKkr_Thin
  color: grey;
  font-size: 12px;
`;


const Product = ({ item, navigation, handleProductAddView }) => {
  return (
    <Container>
      <Touchable
        onPress={() => {
          handleProductAddView(item.id);
          navigation.navigate("ProductOne", {
            id: item.id,
            subCategory: item.subCategory,
          });
        }}
      >
        <InContainer1>
          <ImageSample source={{ uri: item.sampleImages[0].url }} />
          <InContainer2>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Title>
            <Content numberOfLines={3} ellipsizeMode="tail">
              {item.content.replace("\\n"," ")}
            </Content>
            <InContainer3>
              <Info numberOfLines={1} ellipsizeMode="tail">
                {item.company}
              </Info>
            </InContainer3>
          </InContainer2>
        </InContainer1>
      </Touchable>
    </Container>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Product;
