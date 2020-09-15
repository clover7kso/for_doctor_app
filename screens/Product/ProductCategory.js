import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_CATEGORY } from "./ProductQueries";
import { ActivityIndicator } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import constants from "../../constants";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
  
`;

const Container = styled.View`
  flex-wrap : wrap
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity`
  margin-top:10px
  border-radius: 15px;
  width: ${constants.width / 2.17};
  width: ${constants.width / 4};
  background: ${(props) => props.theme.blueColor};
  justify-content: center;
  alignItems: center;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, error, data = { productCategory: {} } } = useQuery(
    PRODUCT_CATEGORY,
    {
      variables: {},
    }
  );
  console.log(loading);
  console.log(error);
  console.log(data);

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"의료기기"} />
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          <Touchable>
            <Text>ProductCategory</Text>
          </Touchable>
        </Container>
      )}
    </OutContainer>
  );
};
