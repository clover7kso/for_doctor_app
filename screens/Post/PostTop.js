import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";

import BackPressHeader from "../../components/BackPressHeader";

import PostTopView from "../../components/PostTopView";
import { useQuery } from "react-apollo-hooks";
import { POST_TOP } from "./PostQueries";

const OutContainer = styled.View`
  background: white;
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  align-items: center;
`;

export default ({ route, navigation }) => {
  const { type } = route.params;

  const resPostTop = useQuery(POST_TOP, {
    variables: {},
  });
  resPostTop.refetch();

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={type} />
      <Container>
        {resPostTop.loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container>
            <PostTopView
              error={resPostTop.error}
              data={resPostTop.data.postTop}
              navigation={navigation}
            />
          </Container>
        )}
      </Container>
    </OutContainer>
  );
};
