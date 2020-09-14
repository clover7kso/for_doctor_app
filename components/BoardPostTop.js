import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View``;

const Table = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${constants.width / 1.2};
`;

const TextCategory = styled.Text`
  padding: 5px;
  height:30px
  font-size:14px
  color: ${(props) => props.theme.blackColor};
`;

const TextTitle = styled.Text`
  height:30px
  font-size:14px
  padding: 5px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextViews = styled.Text`
  padding: 5px;
  padding-top:10px
  height:30px
  font-size:10px
  color: ${(props) => props.theme.darkGreyColor};
`;

const HomePostTop = ({ error, data, navigation }) => (
  <Container>
    <Table>
      <Container>
        {data.map((item, key) => (
          <Touchable
            onPress={() =>
              navigation.navigate("Board", { category: item.category })
            }
          >
            <TextCategory>{item.category}</TextCategory>
          </Touchable>
        ))}
      </Container>
      <Container>
        {data.map((item, key) => (
          <Touchable
            onPress={() =>
              navigation.navigate("BoardPost", { postId: item.id })
            }
          >
            <TextTitle>{item.title}</TextTitle>
          </Touchable>
        ))}
      </Container>
      <Container>
        {data.map((item, key) => (
          <TextViews>조회수 : {item.views}</TextViews>
        ))}
      </Container>
    </Table>
  </Container>
);

HomePostTop.propTypes = {
  error: PropTypes.string,
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default HomePostTop;
