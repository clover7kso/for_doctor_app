import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex-direction: row;
  background-color: white;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;

	shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 10;

  padding-bottom: 5;
  padding-top: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const Text = styled.Text`
  font-size: 25px;
  color: ${(props) => props.theme.darkBlueColor};
  text-align: center;
`;
const Icon = styled.View`
  padding-left: 15px;
  padding-right: 15px;
`;

const BackPressHeader = ({ navigation, text }) => {
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
      <Touchable onPress={goBackSafe}>
        <Icon>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            size={30}
            color={"grey"}
          />
        </Icon>
      </Touchable>
      <Text>{text}</Text>
      <Touchable onPress={goBackToTopSafe}>
        <Icon>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            size={30}
            color={"grey"}
          />
        </Icon>
      </Touchable>
    </Container>
  );
};

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default BackPressHeader;
