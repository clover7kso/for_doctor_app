import React from "react";
import styled from "styled-components";

const View = styled.View`
background : white
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const { category } = route.params;

  return (
    <View>
      <Text>Board - {category}</Text>
    </View>
  );
};
