import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import withSuspense from "./withSuspense";
import styled from "styled-components";
import {SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "./ChatQueries"



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
    error,
  } = useQuery(SEE_ROOM, {
    variables: {roomId:roomId},
    suspend: true
  });

  const { data } = useSubscription(NEW_MESSAGE, {
    variables:{roomId:roomId}
  });
  const [messages, setMessages] = useState(oldMessages || []);
  const handleNewMessage = () => {
    console.log(data)
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => [...previous, newMessage]);
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
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 50,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#B0DAD2"
        }}
      >
        {messages.map(m => {
          return(
          <View key={m.createdAt} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>)
        })}
        <TextInput
          placeholder="메세지를 입력해주세요"
          style={{
            marginTop: 50,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "#f0f0f0"
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </ScrollView>
  );

};

export default (navigation, route)=>Message(navigation, route)
