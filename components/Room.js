import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
const Container = styled.View`
  margin-top: 10px;
  width:${constants.width};
`;

const Touchable = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const InContainer1 = styled.View`
  padding-left:30px
  flex-direction: row;
`;
const UserAvater = styled.Image`
  width:${constants.width / 7};
  height:${constants.width / 7};
  resize-mode:cover
  border-radius:50px
`;
const InContainer2 = styled.View`
  justify-content: space-around;
  padding-left:20px
`;
const InContainer3 = styled.View`
  padding-right:80px;
  flex-direction:row
  align-items: flex-end;
  width:${constants.width - constants.width / 7};
  justify-content: space-between;
`;
const Title = styled.Text`
  font-family:NotoSansCJKkr_Regular
  font-size: 20px;
`;
const Content = styled.Text`
  font-family:NotoSansCJKkr_Regular
  font-size: 15px;
`;
const Info = styled.Text`
  font-family:NotoSansCJKkr_Regular
  color: grey;
  font-size: 12px;
`;


const Room = ({ item, navigation }) => {
  return (
    <Container>
      <Touchable
        onPress={() => {
          navigation.navigate("Message", {roomId:item.id,toId:item.participants[0].id, toName:item.participants[0].name});
        }}
      >
        <InContainer1>
          <UserAvater source={item.participants[0].avatar?{ uri: item.participants[0].avatar }: require("../assets/images/avatar.png")} />
          <InContainer2>
            <InContainer3>
                <Title numberOfLines={1} ellipsizeMode="tail">
                  {item.participants[0].name}
                </Title>
                <Info numberOfLines={1} ellipsizeMode="tail">
                  {item.recentMessage[0].timeFromToday}
                </Info>
            </InContainer3>
            <Content numberOfLines={3} ellipsizeMode="tail">
              {item.recentMessage[0].text}
            </Content>
          </InContainer2>
        </InContainer1>
      </Touchable>
    </Container>
  );
};

Room.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Room;
