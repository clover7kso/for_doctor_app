import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../constants";
import { Linking } from "react-native";

const TouchableCall = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #4A7768;
  padding: 15px;
  border-radius: 10px;
  width: ${constants.width/3.4};

`;

const Container = styled.View`
  flex-direction: row;
  background-color: white;
  width: ${constants.width};
  align-items: center;
  justify-content: space-around;

	shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 10;
  
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
`;

const IconContainer = styled.View`
  padding-left: 15px;
`;

const Text = styled.Text`
  font-family:WandocleanseaB
  font-size:17px
  color: white;
  text-align: center;
`;

const ProductFooter = ({ isLiked, onLike, onCall,onChat, phoneNum }) => {
  const dialCall = (number) => {
    onCall();
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <Container>
      <TouchableCall onPress={() => onLike()}>
        <Text>관심제품</Text>
        <IconContainer>
          <AntDesign
            name={
              isLiked
                  ? "heart"
                  : "hearto"
            }
            size={20}
            color={"white"}
          />
        </IconContainer>
      </TouchableCall>
      
      <TouchableCall onPress={() => onChat()}>
        <Text>채팅하기</Text>
        <IconContainer>
          <MaterialCommunityIcons
            name={"message"}
            size={20}
            color={"white"}
          />
        </IconContainer>
      </TouchableCall>
      
      <TouchableCall onPress={() => dialCall(phoneNum)}>
        <Text>전화하기</Text>
        <IconContainer>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-call" : "md-call"}
            size={20}
            color={"white"}
          />
        </IconContainer>
      </TouchableCall>
    </Container>
  );
};

ProductFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProductFooter;
