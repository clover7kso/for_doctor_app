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
import { MEDICAL_CATEGORY, SIGN_UP_DOCTOR } from "./AuthQueries";
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import moment from "moment";
import axios from "axios";
import * as config from '../../config';

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

export default ({ navigation, route }) => {
  const { id,password,phone,name,} = route.params;


  const { loading, error, data = { medicalCategory: {} } } = useQuery(
    MEDICAL_CATEGORY,
    {
      variables: {},
    }
  );

  const medicalIdInput = useInput("");
  const medicalCategoryInput = useInput("안과의사");
  const medicalHospitalInput = useInput("");
  const [role, setRole]=useState(0);

  const medicalUri = useInput("");
  const setMedicalUri = (uri) => {
    medicalUri.onChange(uri);
  };
  const [medicalUrl, setMedicalUrl] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);

  const [uploadMutaion] = useMutation(SIGN_UP_DOCTOR, {
    variables: {
      id: id,
      password: password,
      phone: phone,
      name: name,
      role: role,
      medical_id: medicalIdInput.value,
      medical_cate: medicalCategoryInput.value,
      medical_certi: medicalUrl,
      medical_hospital: medicalHospitalInput.value
    },
  });
  const goBackToTopSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.popToTop();
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    const name = "DoctorCerti-"+ id + moment().format("_YYYY:MM:DD_HH:mm:ss") + ".jpg";
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: medicalUri.value,
    });
    try {
      const {
        data: { location },
      } = await axios.post(config.SERVER_URL+"/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setMedicalUrl(location);
      console.log(location)

      const {
        data: { signUpDoctor },
      } = await uploadMutaion();

      if (signUpDoctor) {
        goBackToTopSafe()
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);
      
      const medicalIdValue = medicalIdInput.value;
      const medicalCateogryValue = medicalCategoryInput.value;
      const medicalUriValue = medicalUri.value;
      const medicalHospitalValue = medicalHospitalInput.value;

      const medicalIdRegex = /^[0-9]{5}$/;

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
      if (medicalHospitalValue === "") {
        return Alert.alert("병원명이 비었습니다");
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
            <AuthInput
              {...medicalHospitalInput}
              placeholder="병원명"
              keyboardType="default"
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
