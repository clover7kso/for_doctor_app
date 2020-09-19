import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  height: ${constants.height / 1.2};
`;
const PostItem = styled.View`
  margin-top: 10;
`;
const CategoryContainer = styled.View`
  margin-top: 20;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items:baseline
  width: ${constants.width / 1.2};
`;

const TextCategory = styled.Text`
  font-size:20px
  color: ${(props) => props.theme.blackColor};
`;

const TextMany = styled.Text`
  font-size:13px
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextTitle = styled.Text`
  font-size:16px
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextViews = styled.Text`
  font-size:9px
  color: ${(props) => props.theme.darkGreyColor};
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((itemCategory, key) => (
          <CategoryContainer>
            <Row>
              <Touchable
                onPress={() =>
                  navigation.navigate("PostMany", { category: itemCategory })
                }
              >
                <TextCategory>{itemCategory}</TextCategory>
              </Touchable>
              <Touchable
                onPress={() =>
                  navigation.navigate("PostMany", { category: itemCategory })
                }
              >
                <TextMany>전체보기</TextMany>
              </Touchable>
            </Row>
            {topByCategories[itemCategory].map((item, key) => (
              <Touchable
                onPress={() =>
                  navigation.navigate("PostOne", { postId: item[0] })
                }
              >
                <PostItem>
                  <TextTitle>{item[1]}</TextTitle>
                  <Row>
                    <TextViews>
                      조회수 : {item[2]} | 댓글수 : {item[3]}
                    </TextViews>
                    <TextViews>{item[4]}</TextViews>
                  </Row>
                </PostItem>
              </Touchable>
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
