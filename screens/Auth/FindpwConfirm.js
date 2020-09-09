import React, { useState } from "react";
import styled from "styled-components";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  BackHandler,
} from "react-native";
import { useMutation } from "react-apollo-hooks";
import { FIND_PW_CONFIRM } from "./AuthQueries";
import useInput from "../../hooks/useInput";

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

export default ({ route, navigation }) => {
  const { emailId } = route.params;
  const secretInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [secretMutaion] = useMutation(FIND_PW_CONFIRM, {
    variables: {
      id: emailId,
      secret: secretInput.value,
    },
  });

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const secretValue = secretInput.value;
      if (secretValue === "") {
        return Alert.alert("이메일로 온 비밀코드를 확인 후 입력해주세요");
      }
      const {
        data: { findPwConfirm },
      } = await secretMutaion();

      if (findPwConfirm) {
        navigation.pop(2);
        Alert.alert("비밀번호가 이메일로 전송되었습니다");
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "비밀코드 확인이 완료되지 않았습니다",
        "현재화면에서 뒤로갈 경우 비밀번호 찾기가 완료되지 않습니다",
        [
          { text: "머무르기", style: "cancel", onPress: () => {} },
          {
            text: "뒤로가기",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.pop(2),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OutContainer>
        <InContainer1>
          <AuthInput
            {...secretInput}
            placeholder="이메일로 발송된 비밀코드"
            keyboardType="default"
          />
          <AuthButton
            disabled={loading}
            loading={loading}
            onPress={handleConfirm}
            text="확인"
          />
        </InContainer1>
      </OutContainer>
    </TouchableWithoutFeedback>
  );
};
