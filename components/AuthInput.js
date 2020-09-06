import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  margin-top: 10px;
`;

const TextInput = styled.TextInput`
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: ${(props) => props.theme.greyColor};
  border: 1px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  secureTextEntry = false,
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
};

export default AuthInput;
