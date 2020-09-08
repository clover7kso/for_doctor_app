import React, { useState } from "react";
import styled from "styled-components";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
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

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const { id } = route.params;
  const secretInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [secretMutaion] = useMutation(CONFIRM_SECRET, {
    variables: {
      id: id,
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
        data: { confirmSecret },
      } = await secretMutaion();
      if (confirmSecret) {
        navigation.pop(2);
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setLoading(false);
    }
  };

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
