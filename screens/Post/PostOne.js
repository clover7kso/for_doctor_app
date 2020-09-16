import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POST_ONE } from "./PostQueries";
import { ActivityIndicator, ScrollView } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";

const View = styled.View`
  background: white
  justify-content: center
  align-items: center
  flex: 1
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}
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
const CreateDate = styled.Text``;

export default ({ route, navigation }) => {
  const { postId } = route.params;
  const { loading, error, data = { postOne: {} } } = useQuery(POST_ONE, {
    variables: { id: postId },
  });
  const myDate = new Date(1000 * data.postOne.createdAt);
  return (
    <View>
      <BackPressHeader navigation={navigation} text={"게시판-게시글"} />
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <ScrollView>
          <ViewInScroll>
            <Title>{data.postOne.title}</Title>
            <Content> {data.postOne.content}</Content>
            <UserNickName>
              {data.postOne.ananonymous ? "익명" : data.postOne.userNickname}
            </UserNickName>
            <NumViews> {data.postOne.views}</NumViews>
            <NumComments>
              {data.postOne.comments === null
                ? "0"
                : data.postOne.comments.length}
            </NumComments>
            <CreateDate> {myDate.toString()}</CreateDate>
          </ViewInScroll>
        </ScrollView>
      )}
    </View>
  );
};
