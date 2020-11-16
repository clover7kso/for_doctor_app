import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";


const Touchable = styled.TouchableOpacity`
  shadow-color: 'rgba(0,0,0, .6)'
  shadow-offset: { height: 1, width: 1 }
  shadow-opacity: 1
  shadow-radius: 1
  background: #fff
  elevation: 3

  margin-bottom: 20px;
  padding-top:15px
  padding-bottom:15px
  width: ${constants.width};
  background:white
`;

const Divider = styled.View`
  background: ${(props) => props.theme.greyColor};
  border-radius: 30;
  height: 1;
  margin-bottom:15px
`
const PostItem = styled.View`
  margin-bottom: 8;
  margin-top: 8;
`;
const ItemContainer = styled.View`
  padding-left: 20;
  padding-right: 20;
`;

const ProfileContainer = styled.View`
  flex-direction:row
  margin-bottom:10px
`;
const ProfileInContainer = styled.View`
  padding-left:10px
  justify-content:space-between
`;

const UserAvater = styled.Image`
  width:40px;
  height:40px;
  border-radius:30px
`;

const ViewsImage = styled.Image`
  width:25px;
  height:25px;
  margin-right:6px
`;

const CommentsImage = styled.Image`
  width:25px;
  height:25px;
  margin-right:6px
`;

const ProfileName = styled.Text`
  font-family:NanumB
  font-size:20px
  color: ${(props) => props.theme.blackColor};
`;

const ProfileTime = styled.Text`
  font-family:NanumB
  font-size:13px
  color: ${(props) => props.theme.darkGreyColor};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextTitle = styled.Text`
  font-family:NanumB
  font-size:21px
  margin-bottom:10px
  color: ${(props) => props.theme.blackColor};
`;

const TextContent = styled.Text`
  font-family:NanumB
  font-size:20px
  margin-bottom:15px
  color: ${(props) => props.theme.blackColor};
`;

const TextInfo = styled.Text`
  font-family:NanumB
  font-size:15px
  color: ${(props) => props.theme.blackColor};
  margin-right:30px
`;
const Product = ({ item, navigation, handlePostAddView }) => {
  return (
      <Touchable
        onPress={() => {
          handlePostAddView(item.id);
          navigation.navigate("PostOne", {
            postId: item.id,
          });
        }}
      >
        <ItemContainer>
          <ProfileContainer>
            <UserAvater
              source={
                item.userAvatar && item.anonymous===false
                  ? { uri: item.userAvatar }
                  : require("../assets/images/avatar.png")
              }/>
              <ProfileInContainer>
                <ProfileName>{item.anonymous===false?item.userName:"익명"}</ProfileName>
                <ProfileTime>{item.timeFromToday}</ProfileTime>
              </ProfileInContainer>
          </ProfileContainer>
          <PostItem>
            <TextTitle numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </TextTitle>
            <TextContent numberOfLines={3} ellipsizeMode="tail">
              {item.content.replace('\\n'," ")}
            </TextContent>
            <Divider/>
            <Row>
              <ViewsImage source={require("../assets/images/views.png")}/>
              <TextInfo>{item.views}</TextInfo>
              <CommentsImage source={require("../assets/images/comments.png")}/>
              <TextInfo>{item.commentCount}</TextInfo>
            </Row>
          </PostItem>
        </ItemContainer>
      </Touchable>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Product;
