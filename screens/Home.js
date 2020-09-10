import React from "react";
import styled from "styled-components";
import HomePostTop from "../components/HomePostTop";
import { useQuery } from "react-apollo-hooks";
import { POST_TOP } from "./MainQueries";
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
  const { loading, error, data } = useQuery(POST_TOP, {
    variables: {},
  });

  return (
    <OutContainer>
      <Container>
        <HomePostTop
          loading={loading}
          error={error}
          data={data.postTop}
          navigation={navigation}
        />
      </Container>
    </OutContainer>
  );
};
