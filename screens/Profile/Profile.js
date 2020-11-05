import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { USER_ONE } from "./ProfileQueries";
import { ActivityIndicator, ImageBackground, Alert } from "react-native";
import { useLogOut } from "../../AuthContext";
import BackPressHeader4 from "../../components/BackPressHeader4";
import constants from "../../constants";

const OutContainer = styled.View`
  flex: 1;
`;

const ProfileContiner = styled.View`
  padding-top:50px
  padding-bottom:10px
  position: relative
  z-index:1
  flex-direction: row
  background:white
`


const ProfileColumn= styled.View`
  justify-content: center;
`

const LogoutContiner = styled.View`
  flex-direction: row
  align-items: center
  justify-content:space-between
`
const LogoutText = styled.Text`
  font-family:"WandocleanseaB"color: white;
  margin-right:30px
  border: 1px solid white;
  border-radius: 40px
  padding-left:24px
  padding-right:20px
  padding-top:8px
  padding-bottom:5px
`;
const ProfileBackground = styled.Image`
  resizeMode :stretch
  width: ${constants.width / 2};
  height: ${793 * (constants.width / 2 / 1948) -10};
`

const ButtonContiner = styled.View`
  flex:1
  justify-content: center;
`

const ButtonContainerRow = styled.View`
  margin-bottom:50px
  flex-direction: row;
  justify-content: space-around;
  align-items:center;
  margin-left:20px
  margin-right:20px
`;
const UserAvater = styled.Image`
  margin-left: ${constants.width / 9.4};
  margin-bottom: ${constants.width /-1};
  width:${constants.width / 3.5};
  height:${constants.width / 3.5};
  border-radius:5000px
`;
const UserName = styled.Text`
  font-family:"WandocleanseaB"font-size:25px
  margin-left: 30px;
`;
const UserId = styled.Text`
  font-family:"WandocleanseaB"font-size:14px
  margin-left: 30px;
  color: #cfcfcf;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;
const Divider = styled.TouchableOpacity`
  height:  ${constants.width / 3.9};
  width: 0.4px
  margin-top: 20px
  margin-bottom: 20px
  background-color: white;
`;
const Icon = styled.Image`
  width: ${constants.width / 3.9};
  height: ${constants.width / 3.9};
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
  <ImageBackground
    style={{ width: "100%", height: "100%" }}
    resizeMode="cover"
    source={require("../../assets/images/sub_background_all.png")}>
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={"마이페이지"} />

      {resUserOne.loading ? (
        <ActivityIndicator color={"black"} />
      ) : (
            <ProfileContiner>
              
              <TouchableWithoutFeedback
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
              </TouchableWithoutFeedback>
              <ProfileColumn>
                <UserName>{resUserOne.data.userOne.name} 원장님</UserName>
                <UserId>{resUserOne.data.userOne.id}</UserId>
              </ProfileColumn>
            </ProfileContiner>
          )}
            <LogoutContiner>
            <TouchableWithoutFeedback onPress={() =>
                  navigation.navigate("ProfileAvatarEdit", {
                    avatar: resUserOne.data.userOne.avatar,
                    refresh: handleOnBack,
                  })
                }>
              <ProfileBackground
                resizeMode={"contain"}
                source={require("../../assets/images/top_bar_text.png")}/>
              </TouchableWithoutFeedback>
              <Touchable onPress={()=>Alert.alert(
                                    '로그아웃 하시겠습니까?',
                                    '로그아웃시 추후에 재로그인이 필요합니다',
                                    [
                                      {
                                        text: '로그아웃',
                                        onPress: () => handleLogOut()
                                      },
                                      {
                                        text: '취소',
                                        onPress: () => {},
                                        style: 'cancel'
                                      },
                                    ],
                                  )}>
                <LogoutText>로그아웃</LogoutText>
              </Touchable>
            </LogoutContiner>
            <ButtonContiner>
              <ButtonContainerRow>
                <Touchable onPress={() => navigation.navigate("ProfileMyProduct")}>
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_product.png")}/>
                </Touchable>
                <Divider/>
                
                <Touchable onPress={() => navigation.navigate("ProfileMyMarketing")} >
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_marketing.png")}/>
                </Touchable>
                <Divider/>

                <Touchable onPress={() => navigation.navigate("ProfileMyLaw")}>
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_law.png")}/>
                </Touchable>
              </ButtonContainerRow>
              
              <ButtonContainerRow>
                <Touchable onPress={() => navigation.navigate("ProfileMyPost")}>
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_post.png")}/>
                </Touchable>
                <Divider/>

                <Touchable onPress={() => navigation.navigate("ProfileMyComment")}>
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_comment.png")}/>
                </Touchable>
                <Divider/>

                <Touchable onPress={() => navigation.navigate("ProfileCenter")}>
                  <Icon 
                    resizeMode={"contain"}
                    source={require("../../assets/images/btn_my_center.png")}/>
                </Touchable>
              </ButtonContainerRow>
            </ButtonContiner>
           
          
    </OutContainer>
  </ImageBackground>
  );
};
