import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_COMMENT } from "./ProfileQueries";
import BackPressHeader from "../../components/BackPressHeader";
import MyComment from "../../components/profileMy/MyComment";
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
  const resMyComment = useQuery(MY_COMMENT, {
    variables: {},
    fetchPolicy: "network-only",
  });

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await resMyComment.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"내가쓴댓글"} />
      <Container>
        {resMyComment.loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            data={resMyComment.data.myComment}
            renderItem={({ item }) =>
              MyComment({
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
