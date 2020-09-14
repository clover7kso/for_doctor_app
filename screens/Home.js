import React from "react";
import styled from "styled-components";
import HomePostTop from "../components/HomePostTop";
import AuthButtonText from "../components/AuthButtonText";
import { useQuery } from "react-apollo-hooks";
import { POST_TOP } from "./Board/BoardQueries";
import { useLogOut } from "../AuthContext";
import { ActivityIndicator } from "react-native";
const OutContainer = styled.View`
background : white
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  const { loading, error, data = { postTop: {} } } = useQuery(POST_TOP, {
    variables: {},
  });

  const logOut = useLogOut();

  return (
    <OutContainer>
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container>
            <HomePostTop
              error={error}
              data={data.postTop}
              navigation={navigation}
            />
            <AuthButtonText text="로그아웃" onPress={logOut} />
          </Container>
        )}
      </Container>
    </OutContainer>
  );
};
