import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import AuthPicker from "../../components/AuthPicker";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { MEDICAL_CATEGORY, FIND_PW } from "./AuthQueries";
import { ScrollView, BackHandler } from "react-native";

const OutContainer = styled.View`
  background : white
  flex: 1;
  paddingTop: ${ Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

export default ({ navigation }) => {
  const { loading, error, data } = useQuery(MEDICAL_CATEGORY, {
    variables: {},
  });

  const emailInput = useInput("");
  const medicalIdInput = useInput("");
  const medicalCateogryInput = useInput("안과의사");

  const [registerLoading, setRegisterLoading] = useState(false);

  const [uploadMutaion] = useMutation(FIND_PW, {
    variables: {
      id: emailInput.value,
      medical_id: medicalIdInput.value,
      medical_cate: medicalCateogryInput.value,
    },
  });

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);
      const emailValue = emailInput.value;
      const medicalIdValue = medicalIdInput.value;
      const medicalCateogryValue = medicalCateogryInput.value;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const medicalIdRegex = /^[0-9]{5}$/;

      if (emailValue === "") {
        return Alert.alert("이메일이 비어있습니다");
      } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      } else if (!emailRegex.test(emailValue)) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      }
      if (medicalCateogryValue === "") {
        return Alert.alert("분류가 정해지지 않았습니다");
      }
      if (medicalIdValue === "") {
        return Alert.alert("면허번호가 비어있습니다");
      } else if (!medicalIdRegex.test(medicalIdValue)) {
        return Alert.alert("면허번호는 숫자 5글자입니다");
      }

      const {
        data: { findPw },
      } = await uploadMutaion();

      if (findPw) {
        navigation.navigate("FindpwConfirm", { emailId: emailValue });
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setRegisterLoading(false);
    }
  };

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
              onPress={handleRegister}
              text="확인"
            />
          </InContainer1>
        </OutContainer>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
