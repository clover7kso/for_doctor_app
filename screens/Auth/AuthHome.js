import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";

const Container1 = styled.View`
  background : white
  flex: 1;
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const Container2 = styled.View`
  align-items: center;
  justify-content: center;
`;

const Container3 = styled.View`
  justify-content: center;
  margin: 13%;
`;

const BackgroundImg = styled.Image`
  width: ${constants.width};
  height: ${828 * (constants.width / 2225)};
`;

const Text = styled.Text`
  padding: 5px;
  color: ${(props) => props.theme.blueColor};
`;

const TextInput = styled.TextInput`
  padding: 5px;
`;

const LogoImg1 = styled.Image`
  width: ${constants.width / 2.5};
  height: ${216 * (constants.width / 2.5 / 353)};
`;

const LogoImg2 = styled.Image`
  width: ${constants.width / 3.2};
  height: ${193 * (constants.width / 3.2 / 551)};
`;

const Touchable = styled.TouchableOpacity``;
const SignInBtn = styled.View`
  background-color: ${(props) => props.theme.darkBlueColor};
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;
const SignInBtnText = styled.Text`
  color: white;
  text-align: center;
`;

const FindPasswordBtn = styled.View`
  padding: 10px;
  align-items: center;
`;

const SignUpBtn = styled.View`
  align-items: center;
`;

export default ({ navigation }) => (
  <Container1>
    <BackgroundImg
      resizeMode={"contain"}
      source={require("../../assets/splash_background.png")}
    />
    <Container2>
      <Text>대한민국 최고의 의사진들을 응원합니다</Text>
      <LogoImg1
        resizeMode={"contain"}
        source={require("../../assets/logo.png")}
      />
      <LogoImg2
        resizeMode={"contain"}
        source={require("../../assets/logo2.png")}
      />
    </Container2>
    <Container3>
      <Text>먼저 로그인이 필요해요 :)</Text>
      <TextInput placeholder={"이메일"} />
      <TextInput placeholder={"비밀번호"} />
      <Touchable>
        <SignInBtn>
          <SignInBtnText>로그인</SignInBtnText>
        </SignInBtn>
      </Touchable>
      <Touchable>
        <FindPasswordBtn>
          <Text>비밀번호를 잊으셨나요?</Text>
        </FindPasswordBtn>
      </Touchable>
    </Container3>
    <Touchable>
      <SignUpBtn>
        <Text>처음이신가요? 계정을 생성하세요</Text>
      </SignUpBtn>
    </Touchable>
  </Container1>
);
