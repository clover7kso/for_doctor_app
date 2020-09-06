import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

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
  flex: 0.6;
  align-items: center;
`;
const InContainer3 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
`;
const InContainer4 = styled.View`
  flex: 1;
  align-items: center;
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

const Touchable = styled.TouchableOpacity``;

const FindPasswordBtn = styled.View`
  padding: 10px;
  align-items: center;
`;

const SignUpBtn = styled.View`
  align-items: center;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const pwInput = useInput("");
  return (
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
      <InContainer2></InContainer2>
      <InContainer3>
        <Text>먼저 로그인이 필요해요 :)</Text>
        <AuthInput
          {...emailInput}
          placeholder="이메일"
          keyboardType="email-address"
        />
        <AuthInput
          {...pwInput}
          placeholder="비밀번호"
          keyboardType="default"
          secureTextEntry={true}
        />
        <AuthButton onPress={() => null} text="로그인" />
        <Touchable onPress={() => navigation.navigate("Findpw")}>
          <FindPasswordBtn>
            <Text>비밀번호를 잊으셨나요?</Text>
          </FindPasswordBtn>
        </Touchable>
      </InContainer3>
      <InContainer4>
        <Touchable onPress={() => navigation.navigate("Signup")}>
          <SignUpBtn>
            <Text>처음이신가요? 계정을 생성하세요</Text>
          </SignUpBtn>
        </Touchable>
      </InContainer4>
    </OutContainer>
  );
};
