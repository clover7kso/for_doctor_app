import React from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { ActivityIndicator } from "react-native";
import HomeAd from "../components/HomeAd";
import AuthButtonText from "../components/AuthButtonText";
import { useQuery } from "react-apollo-hooks";
import { HOME_AD_MANY } from "./ScreenQueries";
import constants from "../constants";

const OutContainer = styled.View`
background : white
  justify-content: center;
  align-items: center;
  flex: 1;
  paddingTop: ${Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight};

`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Table = styled.View`
  flexDirection:row
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-bottom:10px
`;
const Left_Column = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-left: 5px;
`;
const Right_Column = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-right: 5px;
`;
const Touchable_1 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.blueColor};
  justify-content: center;
  flex: 1;
`;
const Touchable_2 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.blueColor};
  justify-content: center;
  flex: 3;
`;
const Touchable_3 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.blueColor};
  justify-content: center;
  flex: 1;
`;
const Text = styled.Text`
  text-align: center;
  padding: 5px;
  color: white;
`;

export default ({ navigation }) => {
  const { loading, error, data = { homeAdMany: {} } } = useQuery(HOME_AD_MANY, {
    variables: {},
  });

  const logOut = useLogOut();

  return (
    <OutContainer>
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container>
            <AuthButtonText text="로그아웃" onPress={logOut} />
            <HomeAd data={data.homeAdMany} />
            <Table>
              <Left_Column>
                <Touchable_2>
                  <Text>제품</Text>
                </Touchable_2>
                <Touchable_3>
                  <Text>법률제휴</Text>
                </Touchable_3>
              </Left_Column>
              <Right_Column>
                <Touchable_1>
                  <Text>커뮤니티</Text>
                </Touchable_1>
                <Touchable_1>
                  <Text>마케팅</Text>
                </Touchable_1>
              </Right_Column>
            </Table>
          </Container>
        )}
      </Container>
    </OutContainer>
  );
};
