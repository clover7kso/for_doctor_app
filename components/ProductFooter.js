import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import { Linking } from "react-native";

const TouchableIcon = styled.TouchableOpacity``;
const TouchableCall = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${(props) => props.theme.darkBlueColor};
  padding: 15px;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
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
  padding-top: 10px;
`;

const IconLike = styled.View`
  padding-left: 30px;
  padding-right: 10px;
`;

const IconCall = styled.View`
  padding-left: 15px;
`;

const Text = styled.Text`
  font-size:17px
  color: white;
  text-align: center;
`;

const ProductFooter = ({ isLiked, onLike, phoneNum }) => {
  const dialCall = (number) => {
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
      <TouchableIcon onPress={() => onLike()}>
        <IconLike>
          <Ionicons
            name={
              isLiked
                ? Platform.OS === "ios"
                  ? "ios-square"
                  : "md-square"
                : Platform.OS === "ios"
                ? "ios-square-outline"
                : "md-square-outline"
            }
            size={50}
            color={"grey"}
          />
        </IconLike>
      </TouchableIcon>
      <TouchableCall onPress={() => dialCall(phoneNum)}>
        <Text>전화하기</Text>
        <IconCall>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-call" : "md-call"}
            size={20}
            color={"white"}
          />
        </IconCall>
      </TouchableCall>
    </Container>
  );
};

ProductFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProductFooter;
