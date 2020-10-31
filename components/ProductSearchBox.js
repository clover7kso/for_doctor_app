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
  flex:1
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size:15px
`;

const Touchable = styled.TouchableOpacity``;

const ProductSearchBox = ({ onChange, value }) => {
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
        <TextInput
          onChangeText={change}
          placeholder="업체명, 제품명을 검색하세요"
          value={(text) => inputValue}
        />
        <Touchable onPress={onPress}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            size={30}
            color="#4CA493"
          />
        </Touchable>
      </InnerContainer>
    </Container>
  );
};

ProductSearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ProductSearchBox;
