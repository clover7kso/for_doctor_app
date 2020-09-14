import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Picker } from "@react-native-community/picker";

const Container = styled.View``;

const AuthPicker = ({ error, data, value, onChange }) => (
  <Container>
    <Picker
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
    >
      {data.map((item, key) => (
        <Picker.Item label={item} value={item} key={key} />
      ))}
    </Picker>
  </Container>
);

AuthPicker.propTypes = {
  error: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthPicker;
