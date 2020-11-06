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
  width: ${constants.width / 4 - 10};
  height: ${constants.width / 6 - 10};
`;
const InContainer2 = styled.View`
  justify-content: space-around;
  padding-left:10
  width: ${constants.width / 1.4 - 10};
  height: ${constants.width / 6 - 10};
`;
const InContainer3 = styled.View`
  flex-direction:row
  align-items: baseline;
  justify-content: space-between;
`;
const InContainer4 = styled.View`
  flex-direction:row
  align-items: baseline;
  justify-content: center;
`;
const Title = styled.Text`
  font-family:NanumB
  font-size: 20px;
`;

const Info1 = styled.Text`
  font-family:NanumR
  color: grey;
  font-size: 9px;
`;
const Info2 = styled.Text`
  margin-right:10px
  font-family:NanumR
  color: grey;
  font-size: 12px;
`;


const Club = ({ item, navigation, handleClubAddView }) => {
  return (
    <Container>
      <Touchable
        onPress={() => {
          handleClubAddView(item.id);
          navigation.navigate("ClubOne", {
            clubId: item.id,
          });
        }}
      >
        <InContainer1>
          <ImageSample source={{ uri: item.clubImage }} />
          <InContainer2>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Title>
           
            <InContainer3>
              <InContainer4>
                <Info2 numberOfLines={1} ellipsizeMode="tail">
                  {item.userName}
                </Info2>
                <Info1 numberOfLines={3} ellipsizeMode="tail">
                  {item.timeFromToday}
                </Info1>
              </InContainer4>
              <Info1 numberOfLines={3} ellipsizeMode="tail">
                {"조회수 : "+item.views}
              </Info1>
            </InContainer3>
          </InContainer2>
        </InContainer1>
      </Touchable>
    </Container>
  );
};

Club.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Club;
