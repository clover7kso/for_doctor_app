import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import { TouchableWithoutFeedback, Keyboard,ImageBackground  } from "react-native";

const OutContainer = styled.View`
  flex: 1;
  paddingTop: ${ Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  margin-top: 35%;
  flex: 1.7;
  align-items: center;
`;
const InContainer2 = styled.View`
  flex: 5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

const Text = styled.Text`
  font-family:NanumB
  font-size:16px
  color: white;
  margin-top: 10px;
`;

const TextContainer = styled.View`
  margin-top: -10%;
  font-family:NanumB
  align-items: center;
`;

const LogoImg = styled.Image`
  width: ${constants.width / 1.4};
  height: ${894 * (constants.width / 1.4 / 1530)};
  margin-bottom: 10px
`;


export default ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            source={require("../../assets/images/splash_background.png")}
      >
        <OutContainer>
          <InContainer1>
            <LogoImg
              resizeMode={"contain"}
              source={require("../../assets/images/logo.png")}
            />
            <TextContainer>
              <Text>슬기로운 의사생활을 위한</Text>
              <Text>대한민국 No.1 Medical Platform</Text>
            </TextContainer>
          </InContainer1>
          <InContainer2>
            <AuthButton
              onPress={() => navigation.navigate("Signin")}
              text="로그인"
            />
            <AuthButtonText
              onPress={() => navigation.navigate("SignupSelection")}
              text="처음이신가요? 계정을 생성하세요"
            />
          </InContainer2>
        </OutContainer>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
