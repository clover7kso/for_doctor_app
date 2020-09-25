import React from "react";
import styled from "styled-components";
import BackPressHeader from "../../components/BackPressHeader";

const OutContainer = styled.View`
  background: white;
  flex: 1;

  align-items: center;
`;

const Container = styled.View`
  justify-content: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"관심법률서비스"} />
      <Container>
        <Text>준비중인 기능입니다</Text>
      </Container>
    </OutContainer>
  );
};
