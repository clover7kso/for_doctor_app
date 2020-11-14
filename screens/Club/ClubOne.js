import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { CLUB_ONE, SEND_MESSAGE } from "./ClubQueries";
import constants from "../../constants";
import { ActivityIndicator, ScrollView } from "react-native";
import BackPressHeader3 from "../../components/BackPressHeader3";
import ClubFooter from "../../components/ClubFooter";
const OutContainer = styled.View`
  background: white
  flex: 1
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
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
  margin-top:30px
  font-family:NanumB
  padding-left:20px
  font-size: 23px;
`;
const Content = styled.Text`
  margin-top:10px;
  padding-left:20px
  font-size: 15px;
`;
const ClubImage = styled.Image`
  width:${constants.width};
  height:${constants.width*(2/3)};
`;

const UserAvater = styled.Image`
  width:70px;
  height:70px;
  border-radius:30px
`;
const UserNickName = styled.Text`
  font-family:NanumB
  font-size: 22px;
`;
const TimeFromToday = styled.Text`
  font-family:NanumB
  font-size: 17px;
`;
const NumViews = styled.Text`
  font-family:NanumB
  font-size: 10px;
`;
const NumComments = styled.Text`
  font-family:NanumB
  margin-left:10px
  font-size: 10px;
`;

const CommentDivider = styled.Image`
  margin-left: 19;
  margin-right: 19;
  height: 1;
  background-color: #cccccc;
`;

export default ({ route, navigation }) => {
  const { clubId } = route.params;

  const resClubOne = useQuery(CLUB_ONE, {
    variables: { id: clubId },
  });
  resClubOne.refetch();

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const handleToChat = async () => {
    const message = await sendMessage({ variables: { sendText:"안녕하세요 \""+resClubOne.data.clubOne.title+"\" 동호회 글을 보고 채팅드립니다.", toId:resClubOne.data.clubOne.userId } });
    navigation.navigate("Message", {roomId:message.data.sendMessage.room.id, toId:resClubOne.data.clubOne.userId, toName:resClubOne.data.clubOne.userName})
  };
  console.log()
  return (
    <OutContainer>
      <BackPressHeader3 navigation={navigation} />
      {resClubOne.loading ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <Container>
          <ScrollView>
            <ViewInScroll>
              <Row>
                <UserAvater
                  source={
                    resClubOne.data.clubOne.userAvatar
                      ? { uri: resClubOne.data.clubOne.userAvatar }
                      : require("../../assets/images/avatar.png")
                  }
                />
                <Column>
                  <UserNickName>{resClubOne.data.clubOne.userName}</UserNickName>
                  <TimeFromToday>
                    {resClubOne.data.clubOne.timeFromToday}
                  </TimeFromToday>
                </Column>
              </Row>
              <ClubImage
              source={
                resClubOne.data.clubOne.clubImage
                  ? { uri: resClubOne.data.clubOne.clubImage }
                  :null
              }/>
              <Title>{resClubOne.data.clubOne.title}</Title>
              {resClubOne.data.clubOne.content.split('\\n').map((item, key) => {
                return <Content key={key}>{item}</Content>
              })}
              <Row>
                <NumViews> 조회수 : {resClubOne.data.clubOne.views}</NumViews>
              </Row>
            </ViewInScroll>
          </ScrollView>
          <ClubFooter
            onChat={handleToChat}/>
        </Container>
      )}
    </OutContainer>
  );
};
