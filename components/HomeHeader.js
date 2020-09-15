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

const BackPressHeader = ({ navigation }) => (
  <Container>
    <Touchable>
      <Icon>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
          size={30}
          color={"grey"}
        />
      </Icon>
    </Touchable>
    <Text>FOR DOCTOR</Text>
    <Touchable>
      <Icon>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          size={30}
          color={"grey"}
        />
      </Icon>
    </Touchable>
  </Container>
);

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;
