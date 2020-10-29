import React, { useState, useEffect } from "react";
import {
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import {SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "./ChatQueries"
import BackPressHeader4 from "../../components/BackPressHeader4";
import styled from "styled-components";
import constants from "../../constants";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const FlatListView = styled.View`
  background : #B0DAD2
  justify-content: flex-end;
  flex: 1;
`;


const UserAvater = styled.Image`
  width:50px;
  height:50px;
  border-radius:30px
  margin-right:10px
`;

const FromContainer = styled.View`
  flex-direction:row
  width:${constants.width}
  margin-bottom: 10px
  padding-left:10px
  justify-content: flex-start
`;
const MyContainer = styled.View`
  flex-direction:row
  width:${constants.width}
  margin-bottom: 10px
  padding-right:20px
  justify-content: flex-end
`;

const FromRowDate = styled.Text`
  font-family:NotoSansCJKkr_Regular
  color:white
  font-size:10px
  text-align:left
  padding-left:9px
`;
const MyRowDate = styled.Text`
  font-family:NotoSansCJKkr_Regular
  color:white
  font-size:10px
  text-align:right
  padding-right:9px
`;

const RowContainer = styled.View`
`;
const RowName = styled.Text`
  font-family:NotoSansCJKkr_Regular
  margin-left:4px
`;
const RowText = styled.Text`
  font-family:NotoSansCJKkr_Regular
  background:#ffffff
  margin:4px
  padding:13px
  border-radius:10px
`;


function date_to_str(format)
{
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if(month<10) month = '0' + month;
    var date = format.getDate();
    if(date<10) date = '0' + date;
    var hour = format.getHours();
    var timeText = hour>=12?"오후":"오전";
    if(hour<10) hour = '0' + hour;
    var min = format.getMinutes();
    if(min<10) min = '0' + min;
    return year + "-" + month + "-" + date + " " + timeText + ":" + hour + ":" + min;
}


function Message({ navigation, route}) {
  const {roomId,toId,toName} = route.params

  const [message, setMessage] = useState("");
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId:roomId,
      sendText: message,
      toId:toId,
    }
  });

  const {
    data: { 
      seeRoom:{
        allMessages:oldMessages
      }
    },
    loading,
    error,
    refetch
  } = useQuery(SEE_ROOM, {
    variables: {roomId:roomId},
    fetchPolicy: 'cache-and-network',
  });

  const { data } = useSubscription(NEW_MESSAGE, {
    variables:{roomId:roomId}
  });
  const [messages, setMessages] = useState(oldMessages || []);
  useEffect(() => {
    setMessages(oldMessages)
  }, [oldMessages]);
  
  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => [newMessage,...previous,]);
    }
  };
  useEffect(() => {
    handleNewMessage();
  }, [data]);

  const onChangeText = text => setMessage(text);
  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <BackPressHeader4 navigation={navigation} text={toName}/>
    {!loading?
      <OutContainer>
        <FlatListView>
          <FlatList
            inverted
            contentContainerStyle={{ flexGrow: 1 }}
            data={messages}
            renderItem={({item})=>{
              return(
                toName===item.from.name?
                (
                <FromContainer>
                  <UserAvater
                    source={
                      item.from.avatar
                        ? { uri: item.from.avatar}
                        : require("../../assets/images/avatar.png")
                    }
                  />
                  <RowContainer key={item.createdAt}>
                    <RowName>{item.from.name}</RowName>
                    <RowText>{item.text}</RowText>
                    <FromRowDate>{date_to_str(new Date(parseInt(item.createdAt)))}</FromRowDate>
                  </RowContainer>
                </FromContainer>):
                (
                <MyContainer>
                  <RowContainer key={item.createdAt}>
                    <RowText>{item.text}</RowText>
                    <MyRowDate>{date_to_str(new Date(parseInt(item.createdAt)))}</MyRowDate>
                  </RowContainer>
                </MyContainer>)
              )}
            }
            keyExtractor={item => item.createdAt}
            showsVerticalScrollIndicator={false}
          />
        </FlatListView>
        
        <TextInput
          placeholder="메세지를 입력해주세요"
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor: "#f0f0f0"
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </OutContainer>
      :<ActivityIndicator color={"black"} />
    }
    </>
  );

};

export default (navigation, route)=>Message(navigation, route)
