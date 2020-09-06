import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${(props) => props.theme.darkBlueColor};
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
