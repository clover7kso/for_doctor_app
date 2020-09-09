import React from "react";
import styled from "styled-components";
import AuthButtonText from "../components/AuthButtonText";

const OutContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default ({ navigation }) => {
  return (
    <OutContainer>
      <Container>
        <AuthButtonText
          onPress={() => navigation.navigate("Board")}
          text="Board"
        />
        <AuthButtonText
          onPress={() => navigation.navigate("BoardPost")}
          text="BoardPost"
        />
      </Container>
      <Container>
        <AuthButtonText
          onPress={() => navigation.navigate("Board")}
          text="Board"
        />
        <AuthButtonText
          onPress={() => navigation.navigate("BoardPost")}
          text="BoardPost"
        />
      </Container>
    </OutContainer>
  );
};
