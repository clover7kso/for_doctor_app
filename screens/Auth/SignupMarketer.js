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
import { MARKETER_CATEGORY, SIGN_UP_MARKETER } from "./AuthQueries";
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
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};
`;

const InContainer1 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;
function checkBizId(value) {
    var valueMap = value.replace(/-/gi, '').split('').map(function(item) {
        return parseInt(item, 10);
    });

    if (valueMap.length === 10) {
        var multiply = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5);
        var checkSum = 0;

        for (var i = 0; i < multiply.length; ++i) {
            checkSum += multiply[i] * valueMap[i];
        }

        checkSum += parseInt((multiply[8] * valueMap[8]) / 10, 10);
        return Math.floor(valueMap[9]) === (10 - (checkSum % 10));
    }

    return false;
}
export default ({ navigation,route }) => {
  const { id,password,phone,name,} = route.params;

  const { loading, error, data = { marketerCategory: {} } } = useQuery(
    MARKETER_CATEGORY,
    {
      variables: {},
    }
  );

  const companyNameInput = useInput("");
  const companyIdInput = useInput("");
  const companyCategoryInput = useInput("의료기기판매");

  const companyUri = useInput("");
  const setCompanyUri = (uri) => {
    companyUri.onChange(uri);
  };
  const [companyUrl, setCompanyUrl] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);

  const [uploadMutaion] = useMutation(SIGN_UP_MARKETER, {
    variables: {
      id: id,
      password: password,
      phone: phone,
      name: name,
      company_cate: companyCategoryInput.value,
      company_name: companyNameInput.value,
      company_id: companyIdInput.value,
      company_certi: companyUrl,
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    const name =
      moment().format("YY:MM:DD-HH:mm:ss") + "_" + id + ".jpg";
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: companyUri.value,
    });
    try {
      const {
        data: { location },
      } = await axios.post(config.SERVER_URL+"/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setCompanyUrl(location);

      const {
        data: { signUpMarketer },
      } = await uploadMutaion();

      if (signUpMarketer) {
        navigation.navigate("SignupConfirm", { emailId: id });
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);

      const companyIdValue = companyIdInput.value;
      const companyCateogryValue = companyCategoryInput.value;
      const companyUriValue = companyUri.value;

      if (companyCateogryValue === "") {
        return Alert.alert("분류가 정해지지 않았습니다");
      }

      if (companyIdValue==="") {
        return Alert.alert("사업자번호가 비어있습니다");
      } else if (checkBizId(companyIdValue)) {
        return Alert.alert("유효한 사업자 번호가 아닙니다");
      }
      if (companyUriValue === "") {
        return Alert.alert("사업자번호 사진이 없습니다");
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
              {...companyCategoryInput}
              loading={loading}
              error={error}
              data={data.marketerCategory}
            />

            <AuthInput
              {...companyNameInput}
              placeholder="회사명"
              keyboardType="default"
            />

            <AuthInput
              {...companyIdInput}
              placeholder="면허번호"
              keyboardType="number-pad"
            />
          </InContainer1>

          {companyUri.value !== "" ? (
            <KeyboardAvoidingView>
              <Image
                style={{
                  borderRadius: 15,
                  width: constants.width,
                  height: 300,
                  resizeMode: "contain",
                }}
                source={{ uri: companyUri.value }}
              />
            </KeyboardAvoidingView>
          ) : (
            <AuthButtonImage
              onPress={() =>
                navigation.navigate("TakePhoto", {
                  updateData: setCompanyUri,
                })
              }
              text="사업자촬영"
            />
          )}
          <InContainer1>
            <AuthButton
              disabled={registerLoading}
              loading={registerLoading}
              onPress={handleRegister}
              text="업체 회원가입"
            />
          </InContainer1>
        </OutContainer>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
