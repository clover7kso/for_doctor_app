import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ImageBackground  } from "react-native";

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  margin:10px;
  width: ${constants.width / 14};
  height: ${constants.width / 14};
`;

const TopBackground = styled.View`
  width: ${constants.width};
  height: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
  background:#4ca493
`;
const Container = styled.View`
  align-items: flex-end;
  width: ${constants.width};
  background:#4ca493
`;

const MessageImg = styled.Image`  
  width: ${constants.width / 14};
  height: ${constants.width / 14};
`;

const BackPressHeader = ({ navigation }) => (
 
    <Container>
      <TopBackground/>
        <Touchable onPress={() => navigation.navigate("Message")}>
            <MessageImg
              resizeMode={"contain"}
              source={require("../assets/main_message.png")}
            />
        </Touchable>
    </Container>
);

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;
