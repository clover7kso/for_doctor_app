import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const OutContainer = styled.View`
  background : white
  flex: 1;
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  margin-top: 3%;
  flex: 3;
  align-items: center;
  justify-content: space-between;
`;
const InContainer2 = styled.View`
  flex: 4;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

const BackgroundImg = styled.Image`
  width: ${constants.width};
  height: ${828 * (constants.width / 2225)};
`;

const Text = styled.Text`
  padding: 5px;
  color: ${(props) => props.theme.blueColor};
`;

const LogoImg1 = styled.Image`
  width: ${constants.width / 2.5};
  height: ${216 * (constants.width / 2.5 / 353)};
`;

const LogoImg2 = styled.Image`
  width: ${constants.width / 3.2};
  height: ${193 * (constants.width / 3.2 / 551)};
`;

export default ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OutContainer>
        <BackgroundImg
          resizeMode={"contain"}
          source={require("../../assets/splash_background.png")}
        />
        <InContainer1>
          <Text>대한민국 최고의 의사진들을 응원합니다</Text>
          <LogoImg1
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
          />
          <LogoImg2
            resizeMode={"contain"}
            source={require("../../assets/logo2.png")}
          />
        </InContainer1>
        <InContainer2>
          <AuthButton
            onPress={() => navigation.navigate("Login")}
            text="로그인 바로가기"
          />
          <AuthButtonText
            onPress={() => navigation.navigate("Signup")}
            text="처음이신가요? 계정을 생성하세요"
          />
        </InContainer2>
      </OutContainer>
    </TouchableWithoutFeedback>
  );
};
