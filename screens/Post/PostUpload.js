import React from "react";
import styled from "styled-components";
import BackPressHeader from "../../components/BackPressHeader";
import AuthButtonText from "../../components/AuthButtonText";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { POST_UPLOAD } from "./PostQueries";
import InputScrollView from "react-native-input-scroll-view";

const OutContainer = styled.View`
  background: white;
`;

const InContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const TextTitleInput = styled.TextInput`
  font-size: 20px;
`;

const TextContentInput = styled.TextInput`
  margin-top: 20px;
  text-align-vertical: top;
  font-size: 18px;
`;

const Divider = styled.View`
  background: #f0f0f0;
  border-radius: 30;
  height: 1;
`;

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  align-items: flex-end;
  margin-bottom: 10px;
`;
const Text = styled.Text`
  padding: 5px;
  color: ${(props) => props.theme.blueColor};
`;

export default ({ navigation, route }) => {
  const { category } = route.params;

  const titleInput = useInput("");
  const contentInput = useInput("");
  const [postUpload] = useMutation(POST_UPLOAD);
  const handlePostUpload = () => {
    const result = postUpload({
      variables: {
        category: category,
        title: titleInput.value,
        content: contentInput.value,
      },
    });
    if (result) navigation.pop(1);
  };

  return (
    <OutContainer>
      <InputScrollView style={{ flex: 1 }}>
        <BackPressHeader navigation={navigation} text={"글쓰기"} />

        <InContainer>
          <TextTitleInput
            onChangeText={titleInput.onChange}
            placeholder={"제목"}
            value={titleInput.value}
          />
          <Divider />

          <TextContentInput
            multiline={true}
            onChangeText={contentInput.onChange}
            placeholder={
              "여기를 눌러서 글을 작성할 수 있습니다.\n\n\n[커뮤니티 이용규칙 준수]\n\n 커뮤니티 이용규칙 전문을 반드시 숙지하신 후 글을 작성해 주세요.\n이용규칙을 위반할 경우 작성한 게시물이 삭제되거나, 글쓰기 제한 등의 제재가 가해질 수 있습니다.\n 자세한 내용은 홈 탭 우측 상단의 [내 정보] > [커뮤니티 이용규칙]을 참고하시기 바랍니다.\n\n\n[홍보 게시물 작성 금지]\n\n1. 링크 클릭, 추천인 입력\n2. 글 작성 계정공유 요청"
            }
            value={contentInput.value}
          />
          <Touchable onPress={handlePostUpload}>
            <Container>
              <Text>확인</Text>
            </Container>
          </Touchable>
        </InContainer>
      </InputScrollView>
    </OutContainer>
  );
};
