import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { POST_MANY, POST_ADD_VIEW } from "./PostQueries";
import BackPressHeader from "../../components/BackPressHeader";
import ProductSearchBox from "../../components/ProductSearchBox";
import Post from "../../components/Post";
import { ActivityIndicator, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const Touchable = styled.TouchableOpacity`
  padding-left:35;
  padding-right:35;
  padding-top:10;
  padding-bottom:10;
  flex-direction:row;
  border-width: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10;
  border-color: transparent
  background: #0066cc;
  border-radius: 100;
  
  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-offset: { width: 2, height: 2 };
  elevation: 10;
`;

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`
  align-items: center;
  color: white;
  margin-right: 10px;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  const { category } = route.params;

  const [postAddView] = useMutation(POST_ADD_VIEW);
  const handlePostAddView = (id) => {
    postAddView({ variables: { postId: id } });
  };

  const [searchWord, setSearchWord] = useState("");
  const resPostMany = useQuery(POST_MANY, {
    variables: {
      category: category,
      searchWord: searchWord,
    },
    fetchPolicy: "network-only",
  });
  const handleOnBack = () => {
    resPostMany.refetch();
  };

  const onLoadMore = () => {
    if (!loadMore & (resPostMany.data.postMany.cursor !== "End")) {
      setLoadMore(true);
      resPostMany.fetchMore({
        variables: {
          category: category,
          after: resPostMany.data.postMany.cursor,
          searchWord: searchWord,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setLoadMore(false);
          return {
            postMany: {
              __typename: prev.postMany.__typename,
              cursor: fetchMoreResult.postMany.cursor,
              posts: [
                ...prev.postMany.posts,
                ...fetchMoreResult.postMany.posts,
              ],
            },
          };
        },
      });
    }
  };

  const [loadMore, setLoadMore] = useState(false);
  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loadMore) return null;
    return <ActivityIndicator style={{ color: "#000" }} />;
  };

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await resPostMany.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={category} />
      <ProductSearchBox value={searchWord} onChange={setSearchWord} />
      <Container>
        {resPostMany.loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            data={resPostMany.data.postMany.posts}
            renderItem={({ item }) =>
              Post({
                item,
                navigation,
                handlePostAddView,
              })
            }
            keyExtractor={(item, index) => item.id}
            ListFooterComponent={renderFooter}
            refreshing={refreshing}
            onRefresh={refresh}
            onEndReached={onLoadMore}
            onEndReachedThreshold={1}
          />
        )}
        <Touchable
          onPress={() =>
            navigation.navigate("PostUpload", {
              category: category,
              refresh: handleOnBack,
            })
          }
        >
          <Text>글쓰기</Text>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={20}
            color={"white"}
          />
        </Touchable>
      </Container>
    </OutContainer>
  );
};
