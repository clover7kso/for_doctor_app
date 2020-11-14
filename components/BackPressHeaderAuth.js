import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  margin:10px;
  width: ${constants.width / 14};
  height: ${constants.width / 14};
`;


const BackImg = styled.Image`  
  width: ${constants.width / 16};
  height: ${constants.width / 16};
`;

const Container = styled.View`
  align-items: center;
`;

const TopBarContainer = styled.View`
  padding-top: ${(Expo.Constants.statusBarHeight)+5};
  padding-bottom:5px
  background:white
  flex-direction: row;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;
`;

const MainText = styled.Text`
  font-family:NanumB
  font-size: 20px;
  color: black;
  flex:1
  text-align: center;
  padding-right:${constants.width / 14 + 20}
`;

const BackPressHeader = ({ navigation, text }) => {
  const goBackSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.goBack();
  };
  return (
    <Container>
      <TopBarContainer>
        <Touchable onPress={goBackSafe}>
          <BackImg
            resizeMode={"contain"}
            source={require("../assets/images/navi_back.png")}
          />
        </Touchable>
        <MainText>{text}</MainText>
      </TopBarContainer>
    </Container>
  );
};

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;
