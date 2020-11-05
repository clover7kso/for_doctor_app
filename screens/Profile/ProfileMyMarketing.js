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

const LoadingContainer = styled.View`
  align-items: center;
  justify-content:center;
  flex: 1;
`;

const NoData = styled.Text`
  font-family:WandocleanseaB
  margin-top:20px
  font-size:19px
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
            <LoadingContainer>
              <ActivityIndicator color={"black"} />
            </LoadingContainer>
          ) : resMyMarketing.data.myMarketing.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={resMyMarketing.data.myMarketing}
              renderItem={({ item }) => MyProduct({ item, navigation })}
              keyExtractor={(item, index) => item.id}
              refreshing={refreshing}
              onRefresh={refresh}
            />
          ):
          <LoadingContainer>
            <NoData>관심등록하신 마케팅이 없습니다.</NoData>
          </LoadingContainer>
          }
        </Container>
      )}
    </OutContainer>
  );
};
