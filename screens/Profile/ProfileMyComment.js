import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_COMMENT } from "./ProfileQueries";
import BackPressHeader4 from "../../components/BackPressHeader4";
import MyComment from "../../components/profileMy/MyComment";
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
  font-family:NanumB
  margin-top:20px
  font-size:19px
`;

export default ({ navigation }) => {
  const resMyComment = useQuery(MY_COMMENT, {
    variables: {},
    fetchPolicy: "network-only",
  });
  if(resMyComment.error)
  {
    Alert.alert(resMyComment.error.message.replace("GraphQL error: ", ""));
    navigation.pop(1)
  }


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
      <BackPressHeader4 navigation={navigation} text={"내가쓴댓글"} />
      <Container>
        {resMyComment.loading ? (
          <LoadingContainer>
            <ActivityIndicator color={"black"} />
          </LoadingContainer>
        ) : resMyComment.data.myComment.length !== 0 ? (
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
        ):
          <LoadingContainer>
            <NoData>아직 등록하신 댓글이 없습니다.</NoData>
          </LoadingContainer>
        }
      </Container>
    </OutContainer>
  );
};
