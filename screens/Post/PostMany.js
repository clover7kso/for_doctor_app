import React from "react";
import styled from "styled-components";

const View = styled.View`
background : white
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>PostMany</Text>
  </View>
);
