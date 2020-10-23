import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { PRODUCT_CATEGORY } from "./ProductQueries";
import { ActivityIndicator,Alert,ImageBackground } from "react-native";
import BackPressHeader from "../../components/BackPressHeader";
import ProductButton from "../../components/ProductButton";
import constants from "../../constants";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  padding-top:10px
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.View`
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
      <ImageBackground
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            source={require("../../assets/images/sub_background_all.png")}
      >
      {categories.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Container>
          {categories.data.productCategory.map((item, key) => (
            <>
            <ProductButton
              onPress={() =>
                navigation.navigate("ProductMany", {
                  category: item,
                })
              }
              text = {item}
            />
            <Divider style={{height:constants.height/categories.data.productCategory.length/4}}/>
            </>
          ))}
        </Container>
      )}
      </ImageBackground>
    </OutContainer>
  );
};
