import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { USER_ONE } from "./ProfileQueries";
import { ActivityIndicator, ScrollView } from "react-native";
import { useLogOut } from "../../AuthContext";
import BackPressHeader4 from "../../components/BackPressHeader4";

const OutContainer = styled.View`
  background: white;
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Column = styled.View`
  flex: 1;
`;
const UserAvater = styled.Image`
  margin-left: 19px;
  margin-top: 19px;
  margin-bottom: 19px;
  width:70px;
  height:70px;
  border-radius:30px
  background:#f0f0f0
`;
const UserName = styled.Text`
  font-size:24px
  margin-left: 19px;
  margin-top: 19px;
`;
const UserId = styled.Text`
  margin-left: 22px;
  margin-top: 8px;
  color: #cfcfcf;
`;
const UserProfile = styled.Text`
  margin-top: 7px;
  margin-left: 19px;
  color: #cfcfcf;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
`;
const Divider = styled.TouchableOpacity`
  margin-left: 19px;
  margin-right: 19px;
  height: 1;
  background-color: #cccccc;
`;
const BtnText = styled.Text`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
`;

export default ({ navigation }) => {
  const resUserOne = useQuery(USER_ONE, {
    variables: {},
  });
  resUserOne.refetch();
  const handleOnBack = () => {
    resUserOne.refetch();
  };

  const logOut = useLogOut();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={"마이페이지"} />

      {resUserOne.loading ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <ScrollView>
          <Column>
            <Row>
              <Touchable
                onPress={() =>
                  navigation.navigate("ProfileAvatarEdit", {
                    avatar: resUserOne.data.userOne.avatar,
                    refresh: handleOnBack,
                  })
                }
              >
                <UserAvater
                  source={
                    resUserOne.data.userOne.avatar
                      ? { uri: resUserOne.data.userOne.avatar }
                      : require("../../assets/images/avatar.png")
                  }
                />
              </Touchable>
              <Column>
                <UserName>{resUserOne.data.userOne.name} 원장님</UserName>
                <UserId>{resUserOne.data.userOne.id}</UserId>
              </Column>
            </Row>
            <Touchable onPress={() => navigation.navigate("ProfileMyProduct")}>
              <BtnText>관심제품</BtnText>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => navigation.navigate("ProfileMyMarketing")}
            >
              <BtnText>관심마케팅</BtnText>
            </Touchable>
            <Divider />
            <Touchable onPress={() => navigation.navigate("ProfileMyLaw")}>
              <BtnText>관심법률서비스</BtnText>
            </Touchable>
            <Divider />
            <Touchable onPress={() => navigation.navigate("ProfileMyPost")}>
              <BtnText>내가쓴글</BtnText>
            </Touchable>
            <Divider />
            <Touchable onPress={() => navigation.navigate("ProfileMyComment")}>
              <BtnText>내가쓴댓글</BtnText>
            </Touchable>
            <Divider />
            <Touchable onPress={() => navigation.navigate("ProfileCenter")}>
              <BtnText>고객센터</BtnText>
            </Touchable>
            <Divider />
            <Touchable onPress={handleLogOut}>
              <BtnText>로그아웃</BtnText>
            </Touchable>
          </Column>
        </ScrollView>
      )}
    </OutContainer>
  );
};
