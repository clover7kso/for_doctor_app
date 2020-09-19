import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POST_ONE } from "./PostQueries";
import { ActivityIndicator, ScrollView } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";

const View = styled.View`
  background: white
  align-items: center
  flex: 1
`;

const ViewInScroll = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text``;
const Content = styled.Text``;
const UserNickName = styled.Text``;
const NumViews = styled.Text``;
const NumComments = styled.Text``;
const TimeFromToday = styled.Text``;

export default ({ route, navigation }) => {
  const { postId } = route.params;
  const resPostOne = useQuery(POST_ONE, {
    variables: { id: postId },
  });

  return (
    <View>
      <BackPressHeader navigation={navigation} text={"게시판-게시글"} />
      {resPostOne.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <ScrollView>
          <ViewInScroll>
            <Title>{resPostOne.data.postOne.title}</Title>
            <Content> {resPostOne.data.postOne.content}</Content>
            <UserNickName>{resPostOne.data.postOne.userName}</UserNickName>
            <NumViews> {resPostOne.data.postOne.views}</NumViews>
            <NumComments>
              {resPostOne.data.postOne.comments === null
                ? "0"
                : resPostOne.data.postOne.comments.length}
            </NumComments>
            <TimeFromToday>
              {" "}
              {resPostOne.data.postOne.timeFromToday}
            </TimeFromToday>
          </ViewInScroll>
        </ScrollView>
      )}
    </View>
  );
};
