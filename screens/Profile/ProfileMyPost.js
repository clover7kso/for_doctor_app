import React from "react";
import styled from "styled-components";
import BackPressHeader from "../../components/BackPressHeader";

const OutContainer = styled.View`
  background: white;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"내가쓴글"} />

      <Text>ProfileMyPost</Text>
    </OutContainer>
  );
};
