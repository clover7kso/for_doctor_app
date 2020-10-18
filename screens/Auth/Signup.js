import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText"
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {  useMutation } from "react-apollo-hooks";
import { CHECK_ID_PHONE } from "./AuthQueries";
import {
  ScrollView,
  BackHandler,
} from "react-native";

const OutContainer = styled.View`
  background : white
  flex: 1;
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const phoneInput = useInput("");
  const pwInput = useInput("");
  const pwConfirmInput = useInput("");
  const nameInput = useInput("");

  const [registerLoading, setRegisterLoading] = useState(false);

  
  const [uploadMutaion] = useMutation(CHECK_ID_PHONE, {
    variables: {
      id: emailInput.value,
      phone: phoneInput.value,
    },
  });

  const handleSubmit = async (navigateTo) => {
    try {
      const {
        data: { checkIdPhone },
      } = await uploadMutaion();

      if (checkIdPhone) {
        navigation.navigate(navigateTo, {
          id: emailInput.value,
          password: pwInput.value,
          phone: phoneInput.value,
          name: nameInput.value
        });
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  const handleRegister = async (navigateTo) => {
    try {
      setRegisterLoading(true);
      const emailValue = emailInput.value;
      const phoneValue = phoneInput.value;
      const pwValue = pwInput.value;
      const pwConfirmValue = pwConfirmInput.value;
      const nameValue = nameInput.value;
      

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
      const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      const nameRegex = /^[가-힣]{2,4}$/;
      

      if (emailValue === "") {
        return Alert.alert("이메일이 비어있습니다");
      } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      } else if (!emailRegex.test(emailValue)) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      }
      if (phoneValue === "") {
        return Alert.alert("전화번호가 비어있습니다");
      } else if (!phoneRegex.test(phoneValue)) {
        return Alert.alert(
          "잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요"
        );
      }
      if (pwValue === "") {
        return Alert.alert("비밀번호가 비어있습니다");
      } else if (pwValue !== pwConfirmValue) {
        return Alert.alert("비밀번호가 일치하지 않습니다");
      } else if (!pwRegex.test(pwValue)) {
        return Alert.alert(
          "특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식"
        );
      }
      if (nameValue === "") {
        return Alert.alert("실명이 비어있습니다");
      } else if (!nameRegex.test(nameValue)) {
        return Alert.alert("실명은 2 ~ 4글자 한글로 입력 해 주세요.");
      }

      handleSubmit(navigateTo);
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setRegisterLoading(false);
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "회원가입이 완료되지 않았습니다",
        "화원가입이 완료되지 않은 상태에서 뒤로가면 내용은 저장되지 않습니다",
        [
          { text: "머무르기", style: "cancel", onPress: () => {} },
          {
            text: "뒤로가기",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.pop(1),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <OutContainer>
          <InContainer1>
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
            <AuthInput
              {...pwConfirmInput}
              placeholder="비밀번호 확인"
              keyboardType="default"
              secureTextEntry={true}
            />
            <AuthInput
              {...phoneInput}
              placeholder="전화번호 ( - 를 포함하여 입력 )"
              keyboardType="number-pad"
            />
            <AuthInput
              {...nameInput}
              placeholder="실명"
              keyboardType="default"
            />

            <AuthButton
              disabled={registerLoading}
              loading={registerLoading}
              onPress={()=>handleRegister("SignupDoctor")}
              text="의사 회원가입"
            />
            
          <AuthButtonText
            onPress={()=>handleRegister("SignupMarketer")}
            text={"의사가 아니신가요?"}
          />
          </InContainer1>

        </OutContainer>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
};
