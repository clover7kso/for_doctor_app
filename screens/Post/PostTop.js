import React from "react";
import styled from "styled-components";

import PostTop from "../../components/PostTop";
import { useQuery } from "react-apollo-hooks";
import { POST_TOP } from "./PostQueries";

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

export default ({ route, navigation }) => {
  const { loading, error, data = { postTop: {} } } = useQuery(POST_TOP, {
    variables: {},
  });

  return (
    <OutContainer>
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container>
            <PostTop
              error={error}
              data={data.postTop}
              navigation={navigation}
            />
          </Container>
        )}
      </Container>
    </OutContainer>
  );
};
