import React,{useState} from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEE_ROOMS } from "./ChatQueries"
import Room from "../../components/Room";
import { ActivityIndicator, FlatList } from "react-native";
import BackPressHeader4 from "../../components/BackPressHeader4";

const LoadingContainer = styled.View`
  align-items: center;
  justify-content:center;
  flex: 1;
`;

const LoadingTitle = styled.Text`
  font-family:WandocleanseaB
  margin-top:20px
  font-size:19px
`;

const OutContainer = styled.View`
  background : white
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
    const rooms = useQuery(SEE_ROOMS, {
        variables: {},
    });
    rooms.refetch()

    const compare=(a, b)=> {
        const aDate = new Date(parseInt(a.recentMessage[0].createdAt)).toString()
        const bDate = new Date(parseInt(b.recentMessage[0].createdAt)).toString()
        if (aDate>bDate) {
          return 1;
        }
        if (aDate<bDate) {
          return -1;
        }
        return 0;
    }

    const [refreshing, setRefreshing] = useState(false);
    const refresh = async () => {
        try {
            setRefreshing(true);
        await rooms.refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    
    return (
        <OutContainer>
            <BackPressHeader4 navigation={navigation} text={"메시지"}/>
            {rooms.loading ? (
            <ActivityIndicator color={"black"} />
          ):rooms.data !== undefined && rooms.data.seeRooms.length !== 0? (
            <FlatList
              data={rooms.data.seeRooms.sort(compare)}
              showsVerticalScrollIndicator ={false}
              renderItem={({ item }) =>
                Room({ item, navigation })
              }
              keyExtractor={(item, index) => item + index}
              refreshing={refreshing}
              onRefresh={refresh}
            />
          ):(
            <LoadingContainer>
              <LoadingTitle>아직 채팅방이 없습니다.</LoadingTitle>
            </LoadingContainer>
          )}
        </OutContainer>
    )
}

