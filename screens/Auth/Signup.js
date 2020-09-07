import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import AuthPicker from "../../components/AuthPicker";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { MEDICAL_CATEGORY } from "./AuthQueries";

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
  const pwInput = useInput("");
  const pwConfirmInput = useInput("");
  const nicknameInput = useInput("");
  const medicalIdInput = useInput("");
  const medicalCateogryInput = useInput("");
  const { loading, error, data } = useQuery(MEDICAL_CATEGORY, {
    variables: {},
  });

  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async () => {
    const emailValue = emailInput.value;
    const pwValue = pwInput.value;
    const pwConfirmValue = pwConfirmInput.value;
    const nicknameValue = nicknameInput.value;
    const medicalIdValue = medicalIdInput.value;
    const medicalCateogryValue = medicalCateogryInput.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/;
    const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    const medicalIdRegex = /^[0-9]{5}$/;
    if (emailValue === "") {
      return Alert.alert("이메일이 비어있습니다");
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      return Alert.alert("올바른 이메일형식을 입력해주세요");
    } else if (!emailRegex.test(emailValue)) {
      return Alert.alert("올바른 이메일형식을 입력해주세요");
    }
    if (pwValue === "") {
      return Alert.alert("비밀번호가 비어있습니다");
    } else if (pwValue !== pwConfirmValue) {
      return Alert.alert("비밀번호가 일치하지 않습니다");
    } else if (!pwRegex.test(pwValue)) {
      return Alert.alert(
        "최소 8자리에 숫자, 문자, 특수문자 각각 1개 이상 포함"
      );
    }
    if (nicknameValue === "") {
      return Alert.alert("닉네임이 비어있습니다");
    } else if (!nicknameRegex.test(nicknameValue)) {
      return Alert.alert("닉네임은 2 ~ 20 글자로 입력 해 주세요.");
    }
    if (medicalIdValue === "") {
      return Alert.alert("면허번호가 비어있습니다");
    } else if (!medicalIdRegex.test(medicalIdValue)) {
      return Alert.alert("면허번호는 숫자 5글자입니다");
    }
    if (medicalCateogryValue === "") {
      return Alert.alert("분류가 정해지지 않았습니다");
    }
    try {
      setRegisterLoading(true);
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
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
            {...nicknameInput}
            placeholder="닉네임"
            keyboardType="default"
          />

          <AuthPicker
            {...medicalCateogryInput}
            loading={loading}
            error={error}
            data={data.medicalCategory}
          />
          <AuthInput
            {...medicalIdInput}
            placeholder="면허번호"
            keyboardType="default"
            secureTextEntry={true}
          />

          <AuthButton
            disabled={registerLoading}
            loading={registerLoading}
            onPress={handleLogin}
            text="회원가입"
          />
        </InContainer1>
      </OutContainer>
    </TouchableWithoutFeedback>
  );
};
