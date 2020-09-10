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
`;

const Text = styled.Text`
  padding:20px
  font-size: 19px;
  color: black;
  text-align: center;
`;
const Icon = styled.View`
  padding: 20px;
`;

const BackPressHeader = ({ text, navigation }) => (
  <Container>
    <Touchable onPress={() => navigation.pop(1)}>
      <Icon>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
          size={32}
          color={"grey"}
        />
      </Icon>
    </Touchable>
    <Text>{text}</Text>
  </Container>
);

BackPressHeader.propTypes = {
  text: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;
