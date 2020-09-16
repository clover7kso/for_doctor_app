import React from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { ActivityIndicator } from "react-native";
import HomeAd from "../components/HomeAd";
import HomeHeader from "../components/HomeHeader";
import { useQuery } from "react-apollo-hooks";
import { HOME_AD_MANY } from "./ScreenQueries";
import constants from "../constants";

const OutContainer = styled.View`
  background : white
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
  flexDirection:row
  justify-content: center;
  align-items: center;
  flex: 1;
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
  alignItems: center;
  flex: 1.5;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;
const Touchable_2 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.blackBlueColor};
  justify-content: center;
  alignItems: center;
  flex: 1;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;
const Touchable_3 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.darkBlueColor};
  justify-content: center;
  alignItems: center;
  flex: 1;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;
const Touchable_4 = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  background: ${(props) => props.theme.greyBlueColor};
  justify-content: center;
  alignItems: center;
  flex: 1;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;
const Text_1 = styled.Text`
  text-align: center;
  padding-top: 5px;
  color: white;
  font-size: 20px;
`;
const Text_2 = styled.Text`
  text-align: center;
  color: white;
  font-size: 10px;
`;
const HomeAdTextContainer = styled.View`
  width: ${constants.width};
  flex-direction:row
  alignItems: baseline;
  padding-left: 30px;
  padding-bottom: 10px;
  padding-top: 10px;
  color: black;
  font-size: 20px;
`;
const HomeAdText_1 = styled.Text`
  color: black;
  font-size: 20px;
`;
const HomeAdText_2 = styled.Text`
  padding-left: 10px;
  color: grey;
  font-size: 15px;
`;
const Icon = styled.Image`
  width: 100px;
  height: 100px;
`;

export default ({ navigation }) => {
  const { loading, error, data = { homeAdMany: {} } } = useQuery(HOME_AD_MANY, {
    variables: {},
  });

  return (
    <OutContainer>
      <HomeHeader />
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container>
            <HomeAdTextContainer>
              <HomeAdText_1>강성운 원장님</HomeAdText_1>
              <HomeAdText_2>이런건 어떤가요?</HomeAdText_2>
            </HomeAdTextContainer>
            <HomeAd data={data.homeAdMany} />
            <Table>
              <Left_Column>
                <Touchable_1
                  onPress={() => navigation.navigate("ProductCategory")}
                >
                  <Icon
                    resizeMode={"contain"}
                    source={require("../assets/btn_product.png")}
                  />
                  <Text_1>의료기기</Text_1>
                  <Text_2>의료제품이 필요할때</Text_2>
                </Touchable_1>
                <Touchable_2>
                  <Icon
                    resizeMode={"contain"}
                    source={require("../assets/btn_law.png")}
                  />
                  <Text_1>법률제휴</Text_1>
                  <Text_2>의료사고가 나셧나요?</Text_2>
                </Touchable_2>
              </Left_Column>
              <Right_Column>
                <Touchable_3>
                  <Icon
                    resizeMode={"contain"}
                    source={require("../assets/btn_board.png")}
                  />
                  <Text_1>커뮤니티</Text_1>
                  <Text_2>오직 의사만을 위한</Text_2>
                </Touchable_3>
                <Touchable_4>
                  <Icon
                    resizeMode={"contain"}
                    source={require("../assets/btn_marketing.png")}
                  />
                  <Text_1>마케팅</Text_1>
                  <Text_2>인테리어 견적내러 가기</Text_2>
                </Touchable_4>
              </Right_Column>
            </Table>
          </Container>
        )}
      </Container>
    </OutContainer>
  );
};
