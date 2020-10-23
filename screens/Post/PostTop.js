import React from "react";
import styled from "styled-components";
import { ActivityIndicator,Alert,ImageBackground } from "react-native";

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
  
  if(resPostTop.error)
  {
    Alert.alert(resPostTop.error.message.replace("GraphQL error: ", ""));
    navigation.pop(1)
  }
 
  return (
    <OutContainer>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        source={require("../../assets/images/sub_background_all.png")}
      >
      <BackPressHeader navigation={navigation} subText={type} />
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
      </ImageBackground>
    </OutContainer>
  );
};
