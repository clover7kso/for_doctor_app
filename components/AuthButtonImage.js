import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;
const OutContainer = styled.View`
  align-items: center;
`;
const Container = styled.View`
  background-color: white;
  border-radius: 15;
  border: 1px solid ${(props) => props.theme.greyColor};
  width: ${constants.width / 2};
  height: 300;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.darkGreyColor};
  text-align: center;
`;

const AuthButton = ({ text, onPress, loading = false }) => (
  <OutContainer>
    <Touchable onPress={onPress}>
      <Container>
        {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
      </Container>
    </Touchable>
  </OutContainer>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
