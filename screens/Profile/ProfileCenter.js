import React from "react";
import styled from "styled-components";
import BackPressHeader4 from "../../components/BackPressHeader4";

const OutContainer = styled.View`
  background: white;
  flex: 1;
`;
const Text = styled.Text`
  font-family:"NotoSansCJKkr_Regular"padding-left: 15px;
  padding-top: 15px;
`;

export default ({ navigation }) => {
  return (
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={"고객센터"} />

      <Text>앱버전 v1.0.0</Text>
      <Text>영업 관련 문의 xxxxxxxxxx@xxxxx.com</Text>
      <Text>어플 관련 문의 clover7kso@naver.com</Text>
      <Text>전화번호 010-7303-7368</Text>
      <Text>주소 서울특별시 테헤란로 xxx xxx건물 xxx-xx</Text>
    </OutContainer>
  );
};
