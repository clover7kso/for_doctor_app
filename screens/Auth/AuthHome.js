import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import { TouchableWithoutFeedback, Keyboard,ImageBackground  } from "react-native";

const OutContainer = styled.View`
  flex: 1;
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  margin-top: 45%;
  flex: 3;
  align-items: center;
`;
const InContainer2 = styled.View`
  flex: 5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

const Text = styled.Text`
  font-family:"NotoSansCJKkr_Regular"
margin-top: 10%;
  padding: 5px;
  color: white;
`;

const LogoImg = styled.Image`
  width: ${constants.width / 1.7};
  height: ${230 * (constants.width / 1.7 / 877)};
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
            <Text>의사 선생님들을 위한 대한민국 No.1 플랫폼</Text>
          </InContainer1>
          <InContainer2>
            <AuthButton
              onPress={() => navigation.navigate("Login")}
              text="로그인"
            />
            <AuthButtonText
              onPress={() => navigation.navigate("Signup")}
              text="처음이신가요? 계정을 생성하세요"
            />
          </InContainer2>
        </OutContainer>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
