import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { POST_ONE } from "./PostQueries";
import { ActivityIndicator, ScrollView, FlatList } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import PostCommentBox from "../../components/PostCommentBox";
import { COMMENT_UPLOAD } from "./PostQueries";
const OutContainer = styled.View`
  background: white
  flex: 1
`;
const Row = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
  flex: 1;
  flex-direction: row;
`;
const Column = styled.View`
  padding-left: 20px;
  flex: 1;
  justify-content: space-around;
`;

const ViewInScroll = styled.View`
  flex: 1;
  flex-direction: column;
  background: white;
  justify-content: flex-start;
`;

const Title = styled.Text`
  padding-left:20px
  font-size: 23px;
`;
const Content = styled.Text`

margin-top:10px;
  padding-left:20px
  font-size: 15px;
`;

const UserAvater = styled.Image`
  width:70px;
  height:70px;
  border-radius:30px
  background:#f0f0f0
`;
const UserNickName = styled.Text`
  font-size: 22px;
`;
const TimeFromToday = styled.Text`
  font-size: 17px;
`;
const NumViews = styled.Text`
  font-size: 10px;
`;
const NumComments = styled.Text`
  margin-left:10px
  font-size: 10px;
`;

const CommentContainer = styled.View`
  padding-left: 19;
  padding-right: 16;
  padding-vertical: 12;
  flex-direction: row;
  align-items: flex-start;
`;
const CommentTouch = styled.TouchableOpacity`
  flex-direction: row;
`;
const CommentAvatar = styled.Image`
  width: 45;
  height: 45;
  border-radius: 20;
  background: #f0f0f0;
`;
const CommentDivider = styled.Image`
  margin-left: 19;
  margin-right: 19;
  height: 1;
  background-color: #cccccc;
`;
const CommentRow = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
`;
const CommentColumn = styled.View`
  margin-left: 20;
  flex: 1;
  justify-content: space-around;
`;
const CommentName = styled.Text`
  font-size: 15px;
`;
const CommentTime = styled.Text`
  color: #c0c0c0;
  font-size: 12px;
`;
const CommentContent = styled.Text``;

export default ({ route, navigation }) => {
  const { postId } = route.params;
  const resPostOne = useQuery(POST_ONE, {
    variables: { id: postId },
  });

  resPostOne.refetch();
  const [commentUpload] = useMutation(COMMENT_UPLOAD);
  const handleCommentUpload = (text, setInputValue) => {
    const result = commentUpload({
      variables: {
        postId: postId,
        text: text,
      },
    });
    if (result) {
      resPostOne.refetch(), setInputValue("");
    }
  };

  const commentItem = (item) => {
    return (
      <CommentContainer>
        <CommentTouch onPress={() => {}}>
          <CommentAvatar
            source={
              item.userAvatar
                ? { uri: item.userAvatar }
                : require("../../assets/avatar.png")
            }
          />
          <CommentColumn>
            <CommentRow>
              <CommentName>{item.userName}</CommentName>
              <CommentTime>{item.timeFromToday}</CommentTime>
            </CommentRow>
            <CommentContent>{item.text}</CommentContent>
          </CommentColumn>
        </CommentTouch>
      </CommentContainer>
    );
  };

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"게시글"} />
      {resPostOne.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <ScrollView>
          <ViewInScroll>
            <Row>
              <UserAvater
                source={
                  resPostOne.data.postOne.userAvatar
                    ? { uri: resPostOne.data.postOne.userAvatar }
                    : require("../../assets/avatar.png")
                }
              />
              <Column>
                <UserNickName>{resPostOne.data.postOne.userName}</UserNickName>
                <TimeFromToday>
                  {resPostOne.data.postOne.timeFromToday}
                </TimeFromToday>
              </Column>
            </Row>
            <Title>{resPostOne.data.postOne.title}</Title>
            <Content> {resPostOne.data.postOne.content}</Content>
            <Row>
              <NumViews> 조회수 : {resPostOne.data.postOne.views}</NumViews>
              <NumComments>
                댓글수 :{" "}
                {resPostOne.data.postOne.comments === null
                  ? "0"
                  : resPostOne.data.postOne.comments.length}
              </NumComments>
            </Row>
          </ViewInScroll>

          <FlatList
            data={resPostOne.data.postOne.comments}
            extraData={resPostOne.data.postOne.comments}
            ItemSeparatorComponent={() => {
              return <CommentDivider />;
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={(item) => {
              return commentItem(item.item);
            }}
          />
        </ScrollView>
      )}
      {resPostOne.loading ? null : (
        <PostCommentBox onPress={handleCommentUpload} />
      )}
    </OutContainer>
  );
};
