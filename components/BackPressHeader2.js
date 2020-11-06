import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  margin:10px;
  width: ${constants.width / 14};
  height: ${constants.width / 14};
`;

const SubTitleContainer= styled.View`
  z-index: 1
  justify-content: center;
  align-items: center;
  width: ${constants.width / 2.5};
  height: ${793 * (constants.width / 2.5 / 1948)}
`;
const SubTitleBack = styled.Image`
  position: absolute;
  width: ${constants.width / 2.5};
  height: ${793 * (constants.width / 2.5 / 1948)}
`;
const SubTitleText = styled.Text`
  font-family:NanumB
  font-size: ${constants.width / 23};
  color: #4CA493;
  text-align: center;
  width: ${constants.width / 2.5};
`;


const BackImg = styled.Image`  
  width: ${constants.width / 16};
  height: ${constants.width / 16};
`;

const HomeImg = styled.Image`  
  width: ${constants.width / 16};
  height: ${constants.width / 16};
`;

const Container = styled.View`
  background : #4CA493
  align-items: center;
`;

const TopBarContainer = styled.View`
  padding-top: ${(Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight)+5};
  padding-bottom:5px
  background:white
  flex-direction: row;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;
`;

const MainText = styled.Text`
  font-family:NanumB
  font-size: 25px;
  color: black;
  text-align: center;
`;

const BackPressHeader = ({ navigation, mainText, subText }) => {
  const goBackToTopSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.popToTop();
  };
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
        <MainText>{mainText}</MainText>
        <Touchable onPress={goBackToTopSafe}>
          <HomeImg
            resizeMode={"contain"}
            source={require("../assets/images/navi_home.png")}
          />
        </Touchable>
      </TopBarContainer>
      <SubTitleContainer>
        <SubTitleBack
          resizeMode={"contain"}
          source={require("../assets/images/top_bar_text.png")}
        />
        <SubTitleText>{subText}</SubTitleText>
      </SubTitleContainer>
    </Container>
  );
};

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};

export default BackPressHeader;
