import React from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import AuthButtonText from "../components/AuthButtonText";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const logOut = useLogOut();
  const handleLogout = async () => {
    logOut();
    return;
  };
  return (
    <View>
      <AuthButtonText onPress={handleLogout} text="Home"></AuthButtonText>
    </View>
  );
};
