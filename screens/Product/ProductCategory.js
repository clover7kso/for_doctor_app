import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_CATEGORY } from "./ProductQueries";
import { ActivityIndicator,Alert } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import constants from "../../constants";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  padding-top:10px
  flex-wrap : wrap
  flex-direction : row
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity`
  margin:5px;
  border-radius: 15px;
  width: ${constants.width / 2.15};
  height: ${constants.width / 5};
  background: ${(props) => props.theme.blueColor};
  justify-content: center;
  alignItems: center;

  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 15;
`;

const Text = styled.Text`
  color: white;
  font-size: 20px;
`;

export default ({ navigation, route }) => {
  const { type } = route.params;

  const categories = useQuery(PRODUCT_CATEGORY, {
    variables: { type: type },
  });
  categories.refetch();
  if(categories.error)
  {
    Alert.alert(categories.error.message.replace("GraphQL error: ", ""));
    navigation.pop(1)
  }

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={type} />
      {categories.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          {categories.data.productCategory.map((item, key) => (
            <Touchable
              onPress={() =>
                navigation.navigate("ProductMany", {
                  category: item,
                })
              }
            >
              <Text>{item}</Text>
            </Touchable>
          ))}
        </Container>
      )}
    </OutContainer>
  );
};
