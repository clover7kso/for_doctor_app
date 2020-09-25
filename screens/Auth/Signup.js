import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import AuthButtonImage from "../../components/AuthButtonImage";
import AuthPicker from "../../components/AuthPicker";
import constants from "../../constants";
import { ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { MEDICAL_CATEGORY, SIGN_UP } from "./AuthQueries";
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import moment from "moment";
import axios from "axios";

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
  const { loading, error, data = { medicalCategory: {} } } = useQuery(
    MEDICAL_CATEGORY,
    {
      variables: {},
    }
  );

  const emailInput = useInput("");
  const phoneInput = useInput("");
  const pwInput = useInput("");
  const pwConfirmInput = useInput("");
  const nameInput = useInput("");
  const medicalIdInput = useInput("");
  const medicalCategoryInput = useInput("안과의사");

  const medicalUri = useInput("");
  const setMedicalUri = (uri) => {
    medicalUri.onChange(uri);
  };
  const [medicalUrl, setMedicalUrl] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);

  const [uploadMutaion] = useMutation(SIGN_UP, {
    variables: {
      id: emailInput.value,
      password: pwInput.value,
      phone: phoneInput.value,
      name: nameInput.value,
      medical_id: medicalIdInput.value,
      medical_cate: medicalCategoryInput.value,
      medical_certi: medicalUrl,
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    const name =
      moment().format("YY:MM:DD-HH:mm:ss") + "_" + emailInput.value + ".jpg";
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: medicalUri.value,
    });
    try {
      const {
        data: { location },
      } = await axios.post("http://192.168.219.101:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setMedicalUrl(location);

      const {
        data: { signUp },
      } = await uploadMutaion();

      if (signUp) {
        navigation.navigate("SignupConfirm", { emailId: emailInput.value });
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);
      const emailValue = emailInput.value;
      const phoneValue = phoneInput.value;
      const pwValue = pwInput.value;
      const pwConfirmValue = pwConfirmInput.value;
      const nameValue = nameInput.value;
      const medicalIdValue = medicalIdInput.value;
      const medicalCateogryValue = medicalCategoryInput.value;
      const medicalUriValue = medicalUri.value;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
      const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      const nameRegex = /^[가-힣]{2,4}$/;
      const medicalIdRegex = /^[0-9]{5}$/;

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
      if (medicalCateogryValue === "") {
        return Alert.alert("분류가 정해지지 않았습니다");
      }
      if (medicalIdValue === "") {
        return Alert.alert("면허번호가 비어있습니다");
      } else if (!medicalIdRegex.test(medicalIdValue)) {
        return Alert.alert("면허번호는 숫자 5글자입니다");
      }
      if (medicalUriValue === "") {
        return Alert.alert("면허번호 사진이 없습니다");
      }

      handleSubmit();
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

  return loading ? (
    <InContainer1>
      <ActivityIndicator color={"black"} />
    </InContainer1>
  ) : (
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

            <AuthPicker
              {...medicalCategoryInput}
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
          </InContainer1>

          {medicalUri.value !== "" ? (
            <KeyboardAvoidingView>
              <Image
                style={{
                  borderRadius: 15,
                  width: constants.width,
                  height: 300,
                  resizeMode: "contain",
                }}
                source={{ uri: medicalUri.value }}
              />
            </KeyboardAvoidingView>
          ) : (
            <AuthButtonImage
              onPress={() =>
                navigation.navigate("TakePhoto", {
                  updateData: setMedicalUri,
                })
              }
              text="면허번호촬영"
            />
          )}
          <InContainer1>
            <AuthButton
              disabled={registerLoading}
              loading={registerLoading}
              onPress={handleRegister}
              text="회원가입"
            />
          </InContainer1>
        </OutContainer>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
