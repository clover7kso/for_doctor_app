import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  padding-top: ${Expo.Constants.statusBarHeight};
  flex-direction:row
  width: ${constants.width};
  background:#4ca493
`;

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  margin:10px;
  width: ${constants.width / 14};
  height: ${constants.width / 14};
`;

const Touchable2 = styled.TouchableOpacity` 
`;

const MessageImg = styled.Image`  
  width: ${constants.width / 13};
  height: ${constants.width / 13};
`;

const Column_1 = styled.View`
  align-items: flex-end;
  width: ${constants.width / 2.5 / 2};
`;
const Divider = styled.View`
  margin-right:-${constants.width / 39}
  background-color: #CBCBCB;
  border-radius: 50px;
  flex:1
  padding: 0.7px;
`;

const Column_2 = styled.View`
  align-items: center;
  justify-content: flex-end;
  flex-direction:row
  flex: 1;
`;

const MyPageContainer = styled.View`
  justify-content:flex-end
  flex-direction:row
`;
const MyPageText = styled.Text`
  font-family:NanumB
  color: black;
  font-size: 22px;
  color:white
  padding-right:28px
  padding-left:10px
`;


const BackPressHeader = ({ navigation }) => (
 
    <Container>
      <Column_1><Divider/></Column_1>
      <Column_2>
        <Touchable onPress={() => navigation.navigate("Rooms")}>
          <MessageImg
            resizeMode={"contain"}
            source={require("../assets/images/main_message.png")}
          />
        </Touchable>
        <Touchable2 onPress={() => navigation.navigate("Profile")}>
          <MyPageContainer>
            <MyPageText>MY</MyPageText>
          </MyPageContainer>
        </Touchable2>
      </Column_2>
    </Container>
);

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;
