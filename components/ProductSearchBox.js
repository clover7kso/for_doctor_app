import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.darkBlueColor};
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;

  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.weakGreyColor};
  flex:1
  
  border-radius:10px
  align-items: center;
  justify-content: flex-start;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 10;
  padding-left: 20px;
  padding-right: 20px;

`;

const TextInput = styled.TextInput`
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const Touchable = styled.TouchableOpacity``;

const ProductSearchBox = ({ value, onChange, onPress }) => (
  <Container>
    <InnerContainer>
      <Touchable onPress={onPress}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          size={30}
          color="#0066CC"
        />
      </Touchable>
      <TextInput
        onChangeText={onChange}
        placeholder="업체명, 제품명을 검색하세요"
        value={value}
      />
    </InnerContainer>
  </Container>
);

ProductSearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ProductSearchBox;
