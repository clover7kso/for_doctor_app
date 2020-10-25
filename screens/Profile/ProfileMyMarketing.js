import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_MARKETING } from "./ProfileQueries";
import { ActivityIndicator, FlatList,Alert } from "react-native";
import BackPressHeader4 from "../../components/BackPressHeader4";
import MyProduct from "../../components/profileMy/MyProduct";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
  
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  const resMyMarketing = useQuery(MY_MARKETING, {
    variables: {},
  });
  resMyMarketing.refetch();
  if(resMyMarketing.error)
  {
    Alert.alert(resMyMarketing.error.message.replace("GraphQL error: ", ""));
    navigation.pop(1)
  }


  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await resMyMarketing.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={"관심마케팅"} />
      {resMyMarketing.loading ? null : (
        <Container>
          {resMyMarketing.loading ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={resMyMarketing.data.myMarketing}
              renderItem={({ item }) => MyProduct({ item, navigation })}
              keyExtractor={(item, index) => item.id}
              refreshing={refreshing}
              onRefresh={refresh}
            />
          )}
        </Container>
      )}
    </OutContainer>
  );
};
