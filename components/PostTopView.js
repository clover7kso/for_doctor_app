import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const TouchableTitle = styled.TouchableOpacity`
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
`;

const Container = styled.View`
  position: relative;
  top:${-793 * (constants.width / 2.5 / 1948)}
`;

const CategoryContainer = styled.View`
  padding-left: 20;
  padding-right: 20;
  margin-top: 25;
`;

const PostItem = styled.View`
  margin-bottom: 12px;
  margin-top: 12px;
`;
const ItemContainer = styled.View`
  padding-left: 12px
  padding-right: 17px
`;

const Divider = styled.View`
  background: #595959;
  border-radius: 30;
  height: 0.2;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items:baseline
  flex:1
`;


const TextTitle = styled.Text`
  font-size:17px
  color: ${(props) => props.theme.blackColor};
`;

const TextViews = styled.Text`
  font-size:9px
  color: #595959;
`;

const PressedContainer = styled.View`
  flex:1
  background:white;
  padding-top:10px;
  padding-bottom:10px
  align-items:center
  border-radius:300px
`;
const PressedText = styled.Text`
  font-family:NotoSansCJKkr_Regular;
  align-items:center;
  color: #4A7768;
  font-size: 22px;
`;


const PostTopView = ({ error, data, navigation }) => {
  const categories = [...new Set(data.map((item) => item.category))];
  const topByCategories = {};
  for (var i in categories) {
    topByCategories[categories[i]] = data
      .map((item) => {
        if (item.category === categories[i])
          return [
            item.id,
            item.title,
            item.views,
            item.commentCount,
            item.timeFromToday,
          ];
      })
      .filter((item) => {
        return item !== null && item !== undefined && item !== "";
      });
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 793 * (constants.width / 2.5 / 1948) }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((itemCategory, key) => (
          <CategoryContainer>
            <Row>
              <TouchableTitle
                onPress={() =>
                  navigation.navigate("PostMany", { title: "커뮤니티", category: itemCategory })
                }
              >
                <PressedContainer>
                    <PressedText>{itemCategory}</PressedText>
                </PressedContainer>
              </TouchableTitle>
            </Row>
            {topByCategories[itemCategory].map((item, key) => (
              <ItemContainer>
                <Touchable
                  onPress={() =>
                    navigation.navigate("PostOne", { postId: item[0] })
                  }
                >
                  <PostItem>
                    <TextTitle numberOfLines={1} ellipsizeMode="tail">
                      {item[1]}
                    </TextTitle>
                    <Row>
                      <TextViews>
                        조회수 : {item[2]} | 댓글수 : {item[3]}
                      </TextViews>
                      <TextViews>{item[4]}</TextViews>
                    </Row>
                  </PostItem>
                </Touchable>
                {topByCategories[itemCategory].length - 1 !==
                topByCategories[itemCategory].indexOf(item) ? (
                  <Divider />
                ) : null}
              </ItemContainer>
            ))}
          </CategoryContainer>
        ))}
      </ScrollView>
    </Container>
  );
};

PostTopView.propTypes = {
  error: PropTypes.string,
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default PostTopView;
