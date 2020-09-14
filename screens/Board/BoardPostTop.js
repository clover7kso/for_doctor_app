import React from "react";
import styled from "styled-components";

import BoardPostTop from "../../components/BoardPostTop";
import { useQuery } from "react-apollo-hooks";
import { POST_TOP } from "./BoardQueries";

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
            <BoardPostTop
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
