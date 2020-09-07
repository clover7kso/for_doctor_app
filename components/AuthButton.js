import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${(props) => props.theme.darkBlueColor};
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = ({ text, onPress, loading = false }) => (
  <Touchable onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
