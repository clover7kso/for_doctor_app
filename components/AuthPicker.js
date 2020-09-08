import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import { Picker } from "@react-native-community/picker";

const Container = styled.View``;

const AuthPicker = ({ loading = true, error, data, value, onChange }) => (
  <Container>
    {loading ? (
      <ActivityIndicator color={"white"} />
    ) : (
      <Picker selectedValue={value} onValueChange={onChange}>
        {data.map((item, key) => (
          <Picker.Item label={item} value={item} key={key} />
        ))}
      </Picker>
    )}
  </Container>
);

AuthPicker.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthPicker;
