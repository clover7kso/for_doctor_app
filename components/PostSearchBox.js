import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: #4CA493;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;

  padding-bottom: 15px;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.weakGreyColor};
  flex:1
  
  border-radius:100px
  align-items: center;
  justify-content: flex-start;

  padding-left: 20px;
  padding-right: 20px;

`;

const TextInput = styled.TextInput`
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const Touchable = styled.TouchableOpacity``;

const PostSearchBox = ({ onChange, value }) => {
  var inputValue = value;
  const change = (text) => {
    inputValue = text;
  };
  const onPress = () => {
    onChange(inputValue);
  };
  return (
    <Container>
      <InnerContainer>
        <Touchable onPress={onPress}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            size={30}
            color="#4CA493"
          />
        </Touchable>
        <TextInput
          onChangeText={change}
          placeholder="제목 및 내용을 입력하세요"
          value={(text) => inputValue}
        />
      </InnerContainer>
    </Container>
  );
};

PostSearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default PostSearchBox;
