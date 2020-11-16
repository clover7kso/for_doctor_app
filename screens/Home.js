import React,{useEffect} from "react";
import styled from "styled-components";
import { ActivityIndicator,ImageBackground,Alert } from "react-native";
import HomeAd from "../components/HomeAd";
import HomeHeader from "../components/HomeHeader";
import HomeButton from "../components/HomeButton";
import { useQuery,useMutation } from "react-apollo-hooks";
import { HOME_AD_MANY,USER_PROFILE,UPDATE_PUSH_TOKEN } from "./HomeQueries";
import constants from "../constants";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

const OutContainer = styled.View`
  align-items: center;
  flex: 1;
  padding-bottom: ${Expo.Constants.statusBarHeight * 2.2};
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
  font-family:NanumB
  color: #34766e;
  font-size: 20px;
`;
const ProfileText_2 = styled.Text`
  font-family:NanumB
  padding-left: 4px;
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
  const [updateTokenMutation] = useMutation(UPDATE_PUSH_TOKEN)
  const getToken =async()=>{
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    var token = await Notifications.getExpoPushTokenAsync()
    console.log(token.data)
    updateTokenMutation({variables:{token:token.data}})
    return true
  }
  useEffect(() => {
    (async () => getToken())();
  }, []);

  const result_homeAd = useQuery(HOME_AD_MANY, {
    variables: {},
  });
  result_homeAd.refetch()
  const result_profile = useQuery(USER_PROFILE, {
    variables: {},
  });
  result_profile.refetch()

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      resizeMode="contain"
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
                {result_homeAd.loading || result_profile.data===undefined ?
                  (<ActivityIndicator color={"white"} /> ) :
                  (
                      <ProfileRowContainer>
                        <ProfileText_2>Welcome!</ProfileText_2>
                        <ProfileText_1> {result_profile.data.profile.role==="DOCTOR"?"Dr.":""}</ProfileText_1>
                        <ProfileText_1>{result_profile.data.profile.name}님</ProfileText_1>
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
                      navigation.navigate("ProductCategory", { type: "의료기기" })}
                    text = "의료기기 및 제품"
                  />
                  <HomeButton
                    onPress={() =>
                      navigation.navigate("ProductCategory", { type: "병원운영" })}
                    text = "병원운영"
                  />
                  <HomeButton
                     onPress={() => {
                      result_profile.data.profile.role==="MARKETER"?
                        Alert.alert("의사 및 병원관계자만 이용가능합니다"):
                        navigation.navigate("ClubMany", { type: "동호회" })
                    }}
                    text = {result_profile.data.profile.role==="DOCTOR"?"의사 동호회":"동호회"}
                  />
                  <HomeButton
                    onPress={() =>{
                      result_profile.data.profile.role==="MARKETER"?
                        Alert.alert("의사 및 병원관계자만 이용가능합니다"):
                        navigation.navigate("PostMany", { type: "커뮤니티" })
                    }}
                    text = {result_profile.data.profile.role==="DOCTOR"?"의사 커뮤니티":"커뮤니티"}
                  />
                </Column_2>
              </Table>
              {result_homeAd.loading || result_homeAd.data === undefined?
               (<ActivityIndicator color={"white"} /> ) : 
               (<HomeAd data={result_homeAd.data.homeAdMany} navigation={navigation}/>)
               }
            </Container>
            
          
        </Container>
      </OutContainer>
    </ImageBackground>
  );
};
