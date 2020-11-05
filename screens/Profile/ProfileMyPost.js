import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_POST } from "./ProfileQueries";
import BackPressHeader4 from "../../components/BackPressHeader4";
import MyPost from "../../components/profileMy/MyPost";
import { ActivityIndicator, FlatList,Alert } from "react-native";

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


export default ({ navigation }) => {
  const resMyPost = useQuery(MY_POST, {
    variables: {},
    fetchPolicy: "network-only",
  });
  if(resMyPost.error)
  {
    Alert.alert(resMyPost.error.message.replace("GraphQL error: ", ""));
    navigation.pop(1)
  }

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await resMyPost.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={"내가쓴글"} />
      <Container>
        {resMyPost.loading ? (
          <LoadingContainer>
            <ActivityIndicator color={"black"} />
          </LoadingContainer>
        ) : resMyPost.data.myPost.length !== 0 ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            data={resMyPost.data.myPost}
            renderItem={({ item }) =>
              MyPost({
                item,
                navigation,
              })
            }
            keyExtractor={(item, index) => item.id}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        ):
        <LoadingContainer>
          <NoData>등록하신 글이 없습니다.</NoData>
        </LoadingContainer>
        }
      </Container>
    </OutContainer>
  );
};
