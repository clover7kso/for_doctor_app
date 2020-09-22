import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: white;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;

  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 10;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.weakGreyColor};
  flex:1
  
  padding-left: 20px;
  padding-right: 20px;
  
  border-radius:10px
  align-items: center;
  justify-content: flex-start;
  background:#f0f0f0
`;

const TextInput = styled.TextInput`
  padding-top: 3px;
  padding-bottom: 3px;
  flex: 1;
`;

const Touchable = styled.TouchableOpacity``;

const PostCommentBox = ({ onPress }) => {
  const [inputValue, setInputValue] = useState("");

  const onClick = () => {
    onPress(inputValue, setInputValue);
  };

  return (
    <Container>
      <InnerContainer>
        <TextInput
          multiline={true}
          onChangeText={(text) => setInputValue(text)}
          placeholder="댓글을 입력하세요"
          value={inputValue}
        />
        <Touchable onPress={onClick}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={30}
            color="#000000"
          />
        </Touchable>
      </InnerContainer>
    </Container>
  );
};

PostCommentBox.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default PostCommentBox;
