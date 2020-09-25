import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_POST } from "./ProfileQueries";
import BackPressHeader from "../../components/BackPressHeader";
import MyPost from "../../components/profileMy/MyPost";
import { ActivityIndicator, FlatList } from "react-native";

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const resMyPost = useQuery(MY_POST, {
    variables: {},
    fetchPolicy: "network-only",
  });

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
      <BackPressHeader navigation={navigation} text={"내가쓴글"} />
      <Container>
        {resMyPost.loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
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
        )}
      </Container>
    </OutContainer>
  );
};
