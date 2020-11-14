import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { TouchableWithoutFeedback, Keyboard,ImageBackground  } from "react-native";
import BackPressHeaderAuth from "../../components/BackPressHeaderAuth";

const OutContainer = styled.View`
  background: white
  align-items:center
  flex:1
`;

const InContainer = styled.View`
    justify-content: center
    flex:1
`;

const InInContainer = styled.View`
    flex-direction:row;
    justify-content: space-between
    margin-top: 30px;
`;

const BtnImg1 = styled.Image`
  width: ${constants.width / 2};
  height: ${constants.width / 2};
`;

const BtnImg2 = styled.Image`
  width: ${constants.width / 4};
  height: ${constants.width / 4};
`;

const Touchable = styled.TouchableOpacity`
    align-items:center
    margin:10px
`;

const Text1 = styled.Text`
  text-align:center
  font-family:NanumB
  font-size:30px
  color: black;
  margin-top: 10px;
`;

const SubText1 = styled.Text`
  text-align:center
  font-family:NanumB
  font-size:14px
  color: grey;
  margin-top: 10px;
`;


const Text2 = styled.Text`
  text-align:center
  font-family:NanumB
  font-size:20px
  color: black;
  margin-top: 10px;
`;

const SubText2 = styled.Text`
  text-align:center
  font-family:NanumB
  font-size:12px
  color: grey;
  margin-top: 10px;
`;


export default ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <OutContainer>
            <BackPressHeaderAuth navigation = {navigation} text={"회원가입"}/>
            <InContainer>
                <Touchable
                    onPress={() => navigation.navigate("Signup",{role:"DOCTOR", text:"의사"})}>
                    <BtnImg1 
                        resizeMode={"contain"}
                        source={require("../../assets/images/btn_doctor.png")}/>
                    <Text1>안과의사</Text1>
                    <SubText1>우리나라를 대표하는 안과의사</SubText1>
                </Touchable>
                <InInContainer>
                    <Touchable
                        onPress={() => navigation.navigate("Signup",{role:"MEDICAL", text:"병원관계자"})}>
                        <BtnImg2 
                            resizeMode={"contain"}
                            source={require("../../assets/images/btn_medical.png")}/>
                        <Text2>병원관계자</Text2>
                        <SubText2>검안사, 간호사 메디컬 관계자</SubText2>
                    </Touchable>
                    <Touchable
                        onPress={() => navigation.navigate("Signup",{role:"MARKETER", text:"병원서비스"})}>
                        <BtnImg2 
                            resizeMode={"contain"}
                            source={require("../../assets/images/btn_marketer.png")}/>
                        <Text2>병원서비스</Text2>
                        <SubText2>의료기기, 병원운영서비스 제공</SubText2>
                
                    </Touchable>
                </InInContainer>
            </InContainer>
        </OutContainer>
      </TouchableWithoutFeedback>
  );
};
