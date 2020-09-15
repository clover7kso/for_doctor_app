import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ActivityIndicator } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
  
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const loading = true;
  return (
    <OutContainer>
      <BackPressHeader
        navigation={navigation}
        text={"의료기기-카테고리"}
        stackNum={2}
      />
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          <Text>ProductMany</Text>
        </Container>
      )}
    </OutContainer>
  );
};
