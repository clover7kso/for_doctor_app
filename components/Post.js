import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
const Container = styled.View`
  margin-top: 10px;
  width: ${constants.width};
`;

const Touchable = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const PostItem = styled.View`
  padding-left: 20;
  padding-right: 20;
  margin-bottom: 8;
  margin-top: 8;
`;
const ItemContainer = styled.View``;

const Divider = styled.View`
  margin-left: 30;
  margin-right: 30;
  background: #f0f0f0;
  border-radius: 30;
  height: 1;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const TextTitle = styled.Text`
  font-size:16px
  color: ${(props) => props.theme.blackColor};
`;

const TextContent = styled.Text`
  font-size:14px
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextInfo = styled.Text`
  margin-top:5px
  font-size:9px
  color: ${(props) => props.theme.darkGreyColor};
`;
const Product = ({ item, navigation, handlePostAddView }) => {
  return (
    <Container>
      <Touchable
        onPress={() => {
          handlePostAddView(item.id);
          navigation.navigate("PostOne", {
            postId: item.id,
          });
        }}
      >
        <ItemContainer>
          <PostItem>
            <TextTitle numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </TextTitle>
            <TextContent numberOfLines={2} ellipsizeMode="tail">
              {item.content}
            </TextContent>
            <Row>
              <TextInfo>
                {item.userName} | 조회수 : {item.views} | 댓글수 :{" "}
                {item.commentCount}
              </TextInfo>
              <TextInfo>{item.timeFromToday}</TextInfo>
            </Row>
          </PostItem>
        </ItemContainer>
      </Touchable>
      <Divider />
    </Container>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Product;
