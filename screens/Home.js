import React from "react";
import styled from "styled-components";
import { ActivityIndicator,ImageBackground } from "react-native";
import HomeAd from "../components/HomeAd";
import HomeHeader from "../components/HomeHeader";
import { useQuery } from "react-apollo-hooks";
import { HOME_AD_MANY } from "./ScreenQueries";
import constants from "../constants";

const LogoImg = styled.Image`
  width: ${constants.width / 2.6};
  height: ${793 * (constants.width / 2.6 / 1948)};
`;


const OutContainer = styled.View`
  align-items: center;
  flex: 1;
  padding-bottom: ${
    Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight * 2.2
  };
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Table = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Column_1 = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Column_2 = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const Touchable = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  alignItems: center;
`;

const Text = styled.Text`
  text-align: center;
  padding-top: 5px;
  color: #34766e;
  font-size: 20px;
`;

const TopContainer = styled.View`
  width: ${constants.width};
  flex-direction:row
  padding-left: 10px;
  padding-bottom: 10px;
`;
const ProfileContainer = styled.View`
  flex:1
`;
const ProfileLineContainer = styled.View`
  alignItems: baseline;
  flex-direction:row
  margin-top: 10px;
  flex:1
`;
const ProfileRowContainer = styled.View`
  margin-top: 20px;
  alignItems: baseline;
  flex-direction:row
`;
const ProfileText_1 = styled.Text`
  color: #34766e;
  font-size: 20px;
`;
const ProfileText_2 = styled.Text`
  padding-left: 10px;
  color: black;
  font-size: 15px;
`;
const ProfileLine = styled.View`
  background-color: #cad7d2;
  border-radius: 50px;
  flex:1
  padding: 3px;
  margin-right:30px
`;

export default ({ navigation }) => {
  const { loading, error, data = { homeAdMany: {} } } = useQuery(HOME_AD_MANY, {
    variables: {},
  });

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
      source={require("../assets/main_background.png")}
    >
      <OutContainer>
        <HomeHeader navigation={navigation} />
        <Container>
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Container>
              <TopContainer>
                <LogoImg
                resizeMode={"contain"}
                source={require("../assets/top_bar_logo.png")}
                />
                <ProfileContainer>
                  <ProfileRowContainer>
                    <ProfileText_1>강성운원장님</ProfileText_1>
                    <ProfileText_2>안녕하세요!</ProfileText_2>
                  </ProfileRowContainer>
                  <ProfileLineContainer>
                    <ProfileLine/>
                  </ProfileLineContainer>
                </ProfileContainer>
              </TopContainer>
              <Table>
                  <Touchable
                    onPress={() =>
                      navigation.navigate("ProductCategory", { type: "의료기기" })
                    }
                  >
                    <Text>의료기기</Text>
                  </Touchable>
                  <Touchable>
                    <Text>법률제휴</Text>
                  </Touchable>
                  <Touchable
                    onPress={() =>
                      navigation.navigate("PostTop", { type: "커뮤니티" })
                    }
                  >
                    <Text>커뮤니티</Text>
                  </Touchable>
                  <Touchable
                    onPress={() =>
                      navigation.navigate("ProductCategory", { type: "마케팅" })
                    }
                  >
                    <Text>마케팅</Text>
                  </Touchable>
              </Table>
              <HomeAd data={data.homeAdMany} />
            </Container>
            
          )}
        </Container>
      </OutContainer>
    </ImageBackground>
  );
};
