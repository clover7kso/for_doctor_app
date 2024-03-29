import React,{useState} from "react";
import styled from "styled-components";
import BackPressHeader3 from "../../components/BackPressHeader3";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { POST_UPLOAD } from "./PostQueries";
import InputScrollView from "react-native-input-scroll-view";
import CheckBox from '@react-native-community/checkbox';

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
  flex-direction:row
  align-items: baseline;
  justify-content:space-between
`;
const Text1 = styled.Text`
  font-family:NanumB
  padding: 5px;
  color: ${(props) => props.theme.blueColor};
`;

const Text2 = styled.Text`
  font-family:NanumB
  padding: 5px;
  color: grey;
`;

export default ({ navigation, route }) => {
  const { category } = route.params;

  const titleInput = useInput("");
  const contentInput = useInput("");
  const [anonymous,setAnonymous] = useState(false);
  const [postUpload] = useMutation(POST_UPLOAD);
  const handlePostUpload = () => {
    const result = postUpload({
      variables: {
        category: category,
        title: titleInput.value,
        content: contentInput.value,
        anonymous: anonymous
      },
    });
    if (result) {
      route.params.refresh();
      navigation.goBack();
    }
  };

  return (
    <OutContainer>
      <InputScrollView style={{ flex: 1 }}>
        <BackPressHeader3 navigation={navigation} />

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
          <Container>
            <Container>
              <CheckBox
                disabled={false}
                value={anonymous}
                onValueChange={(newValue) => setAnonymous(newValue)}/>
              <Text2>익명</Text2>
            </Container>

            <Touchable onPress={handlePostUpload}>
                <Text1>확인</Text1>
            </Touchable>
            
          </Container>

         
        </InContainer>
      </InputScrollView>
    </OutContainer>
  );
};
