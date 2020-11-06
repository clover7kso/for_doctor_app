import React, {useState, useEffect} from "react";
import styled from "styled-components";
import BackPressHeader3 from "../../components/BackPressHeader3";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CLUB_UPLOAD } from "./ClubQueries";
import InputScrollView from "react-native-input-scroll-view";
import { Alert, Image,KeyboardAvoidingView} from "react-native";
import ClubButtonImage from "../../components/ClubButtonImage";
import constants from "../../constants";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import axios from "axios";
import * as config from '../../config';

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
  font-family:NanumB
  padding: 5px;
  color: ${(props) => props.theme.blueColor};
`;



export default ({ navigation,route }) => {

  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const titleInput = useInput("");
  const contentInput = useInput("");
  const [clubUpload] = useMutation(CLUB_UPLOAD);
  const handleClubUpload = async (url) => {
    return await clubUpload({
      variables: {
        clubImage : url,
        title: titleInput.value,
        content: contentInput.value,
      },
    });
  };

  const handleSubmit = async () => {
    if(image === ""|| image === null){
      return Alert.alert("선택된 이미지가 없습니다");
    }else if(titleInput===""){
      return Alert.alert("제목이 없습니다");
    }else if(contentInput===""){
      return Alert.alert("내용이없습니다");
    }

    const formData = new FormData();
    const name = "Club-"+ (Math.floor(Math.random() * 1000) + 100) + moment().format("_YYYY:MM:DD_HH:mm:ss") + ".jpg";
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: image,
    });
    try {
      const {
        data: { location },
      } = await axios.post(config.SERVER_URL+"/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      
      const {
        data: { clubUpload },
      } = await handleClubUpload(location);

      if(clubUpload){
        route.params.refresh();
        navigation.goBack();
      }

    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  return (
    <OutContainer>

      <InputScrollView style={{ flex: 1 }}>
      <BackPressHeader3 navigation={navigation} />

        {image === ""|| image === null ?  (
          <ClubButtonImage
              onPress={pickImage}
              text="동호회소개 사진선택"
            />
          ):(
          <KeyboardAvoidingView>
            <Image
              style={{
                width: constants.width,
                height: constants.width*(2/3),
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
          </KeyboardAvoidingView>
        )}

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
              "여기를 눌러서 글을 작성할 수 있습니다.\n\n\n[동호회 이용규칙 준수]\n\n 동호회 이용규칙 전문을 반드시 숙지하신 후 글을 작성해 주세요.\n이용규칙을 위반할 경우 작성한 게시물이 삭제되거나, 글쓰기 제한 등의 제재가 가해질 수 있습니다.\n 자세한 내용은 홈 탭 우측 상단의 [내 정보] > [동호회 이용규칙]을 참고하시기 바랍니다.\n\n\n[홍보 게시물 작성 금지]\n\n1. 링크 클릭, 추천인 입력\n2. 글 작성 계정공유 요청"
            }
            value={contentInput.value}
          />
          <Touchable onPress={handleSubmit}>
            <Container>
              <Text>확인</Text>
            </Container>
          </Touchable>
        </InContainer>
      </InputScrollView>
    </OutContainer>
  );
};
