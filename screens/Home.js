import React from "react";
import styled from "styled-components";
import { ActivityIndicator,ImageBackground,Alert } from "react-native";
import HomeAd from "../components/HomeAd";
import HomeHeader from "../components/HomeHeader";
import HomeButton from "../components/HomeButton";
import { useQuery } from "react-apollo-hooks";
import { HOME_AD_MANY,USER_PROFILE } from "./ScreenQueries";
import constants from "../constants";

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
  flex-direction:row
  flex: 1;
`;
const Column_1 = styled.View`
  align-items: flex-end;
  width: ${constants.width / 2.5 / 2};
`;
const Divider = styled.View`
  margin-right:-${constants.width / 39}
  margin-bottom:10px
  margin-top:10px
  background-color: #CBCBCB;
  border-radius: 50px;
  flex:1
  padding: 0.7px;
`;

const Column_2 = styled.View`
  padding-top:30px
  padding-bottom:30px
  justify-content: space-around;
  flex: 1;
`;


const TopContainer = styled.View`
  width: ${constants.width};
  flex-direction:row
  padding-left: 10px;
  padding-bottom: 10px;
`;

const LogoImg = styled.Image`
  width: ${constants.width / 2.5};
  height: ${793 * (constants.width / 2.5 / 1948)};
`;

const ProfileContainer = styled.TouchableOpacity`
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
  font-family:"NotoSansCJKkr_Regular"
  color: #34766e;
  font-size: 20px;
`;
const ProfileText_2 = styled.Text`
  font-family:"NotoSansCJKkr_Regular"
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
  const result_homeAd = useQuery(HOME_AD_MANY, {
    variables: {},
  });
  result_homeAd.refetch()
  const result_profile = useQuery(USER_PROFILE, {
    variables: {},
  });

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
      source={require("../assets/images/main_background.png")}
    >
      <OutContainer>
        <HomeHeader navigation={navigation} />
        <Container>
            <Container>
              <TopContainer>
                <LogoImg
                  resizeMode={"contain"}
                  source={require("../assets/images/top_bar_logo.png")}
                />
                <ProfileContainer
                onPress={() =>
                  navigation.navigate("Profile")
                }>
                {result_homeAd.loading ?
                  (<ActivityIndicator color={"white"} /> ) :
                  (
                      <ProfileRowContainer>
                        <ProfileText_1>{result_profile.data.profile.name}</ProfileText_1>
                        <ProfileText_1>{result_profile.data.profile.role===0?"원장님":"사장님"}</ProfileText_1>
                        <ProfileText_2>안녕하세요!</ProfileText_2>
                      </ProfileRowContainer>
                  )}
                  <ProfileLineContainer>
                    <ProfileLine/>
                  </ProfileLineContainer>
                  
                </ProfileContainer>
                

              </TopContainer>
              <Table>
                <Column_1><Divider/></Column_1>
                <Column_2>
                  <HomeButton
                    onPress={() =>
                      navigation.navigate("ProductCategory", { type: "의료기기" })
                    }
                    text = "의료기기"
                  />
                  <HomeButton
                    onPress={() =>
                      navigation.navigate("PostTop", { type: "커뮤니티" })
                    }
                    text = "커뮤니티"
                  />
                  <HomeButton
                    onPress={() =>
                      navigation.navigate("ProductCategory", { type: "마케팅" })
                    }
                    text = "마케팅"
                  />
                  <HomeButton
                    onPress={() =>
                      {Alert.alert("아직 준비중인 기능입니다");}
                    }
                    text = "법률제휴"
                  />
                  <HomeButton
                    onPress={() =>
                      {Alert.alert("아직 준비중인 기능입니다");}
                    }
                    text = "구인구직"
                  />
                </Column_2>
              </Table>
              {result_homeAd.loading ?
               (<ActivityIndicator color={"white"} /> ) : 
               (<HomeAd data={result_homeAd.data.homeAdMany} />)
               }
            </Container>
            
          
        </Container>
      </OutContainer>
    </ImageBackground>
  );
};
