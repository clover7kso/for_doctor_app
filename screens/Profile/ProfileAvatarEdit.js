import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BackPressHeader from "../../components/BackPressHeader";
import { AVATAR_EDIT } from "./ProfileQueries";
import { useMutation } from "react-apollo-hooks";
import moment from "moment";
import axios from "axios";

const OutContainer = styled.View`
  background: white;
  align-items: center;
  flex: 1;
`;

const ImageSelected = styled.Image`
  width: 200px;
  height: 200px;
  border-radius:30px
  background:#f0f0f0
  margin:30px
`;

const TouchableOpacity = styled.TouchableOpacity`
  margin: 10px;
`;

const ImageSelect = styled.Text`
  font-size: 20px;
`;

export default ({ navigation }) => {
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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [avatarEditMutation] = useMutation(AVATAR_EDIT);
  const handleSubmit = async () => {
    const formData = new FormData();
    const name = moment().format("YY:MM:DD-HH:mm:ss") + ".jpg";
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: image,
    });
    try {
      const {
        data: { location },
      } = await axios.post("http://192.168.219.101:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const {
        data: { avatarEdit },
      } = await avatarEditMutation({
        variables: {
          avatar: location,
        },
      });

      if (avatarEdit) {
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };
  return (
    <OutContainer>
      <BackPressHeader navigation={navigation} text={"프로필사진변경"} />

      <ImageSelected
        source={image ? { uri: image } : require("../../assets/avatar.png")}
      />
      <TouchableOpacity onPress={pickImage}>
        <ImageSelect>사진변경</ImageSelect>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <ImageSelect>확인</ImageSelect>
      </TouchableOpacity>
    </OutContainer>
  );
};
