import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { CLUB_MANY, CLUB_ADD_VIEW } from "./ClubQueries";
import BackPressHeader4 from "../../components/BackPressHeader4";
import ClubSearchBox from "../../components/ClubSearchBox";
import Club from "../../components/Club";
import { ActivityIndicator, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoadingContainer = styled.View`
  align-items: center;
  justify-content:center;
  flex: 1;
`;

const SectionTitle = styled.Text`
  font-family:NanumB
  margin-top:20px
  font-size:19px
`;

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
  background: #4A7768;
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
  font-family:NanumB
  align-items: center;
  color: white;
  margin-right: 10px;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  const { type } = route.params;

  const [clubAddView] = useMutation(CLUB_ADD_VIEW);
  const handleClubAddView = (id) => {
    clubAddView({ variables: { clubId: id } });
  };

  const [searchWord, setSearchWord] = useState("");
  const resClubMany = useQuery(CLUB_MANY, {
    variables: {
      searchWord: searchWord,
    },
    fetchPolicy: "network-only",
  });
  const handleOnBack = () => {
    resClubMany.refetch();
  };
  resClubMany.refetch();
  const onLoadMore = () => {
    if (!loadMore & (resClubMany.data.clubMany.cursor !== "End")) {
      setLoadMore(true);
      resClubMany.fetchMore({
        variables: {
          after: resClubMany.data.clubMany.cursor,
          searchWord: searchWord,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setLoadMore(false);
          return {
            clubMany: {
              __typename: prev.clubMany.__typename,
              cursor: fetchMoreResult.clubMany.cursor,
              clubs: [
                ...prev.clubMany.clubs,
                ...fetchMoreResult.clubMany.clubs,
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
      await resClubMany.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <OutContainer>
      <BackPressHeader4 navigation={navigation} text={type}/>
      <ClubSearchBox value={searchWord} onChange={setSearchWord} />
        <Container>
         
      
          {resClubMany.loading? (
            <LoadingContainer>
              <ActivityIndicator color={"black"} />
            </LoadingContainer>
          ) : resClubMany.data !== undefined && resClubMany.data.clubMany.length !== 0?(
            
            <FlatList
              contentContainerStyle={{ paddingBottom: 60 }}
              showsVerticalScrollIndicator={false}
              data={resClubMany.data.clubMany.clubs}
              renderItem={({ item }) =>
                Club({
                  item,
                  navigation,
                  handleClubAddView,
                })
              }
              keyExtractor={(item, index) => item.id}
              ListFooterComponent={renderFooter}
              refreshing={refreshing}
              onRefresh={refresh}
              onEndReached={onLoadMore}
              onEndReachedThreshold={1}
            />
            ):(
              <LoadingContainer>
                <SectionTitle>아직 쓰여진 글이 없습니다.</SectionTitle>
              </LoadingContainer>
          )}
          <Touchable
            onPress={() =>
              navigation.navigate("ClubUpload", {
                category: category,
                refresh: handleOnBack,
              })
            }
          >
            <Text>동호회모집글쓰기</Text>
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
