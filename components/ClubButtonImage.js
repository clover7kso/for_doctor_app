import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Touchable = styled.TouchableOpacity``;
const OutContainer = styled.View`
  align-items: center;
`;
const Container1 = styled.View`
  background-color: white;
  border-radius: 15;
  border: 1px solid ${(props) => props.theme.greyColor};
  width: ${constants.width};
  height: ${constants.width * (2/3)};
  align-items: center;
  justify-content: center;
`;
const Icon = styled.View``;

const Container2 = styled.View`
  width: ${constants.width};
  height: ${constants.width * (2/3)};
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-family:NanumB
  color: ${(props) => props.theme.darkGreyColor};
  text-align: center;
`;

const ClubButtonImage = ({ text, onPress, loading = false }) => (
  <OutContainer>
    <Touchable onPress={onPress}>
      <Container1>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Container2>
            <Icon>
              <Ionicons
                name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
                size={32}
                color={"grey"}
              />
            </Icon>
            <Text>{text}</Text>
          </Container2>
        )}
      </Container1>
    </Touchable>
  </OutContainer>
);

ClubButtonImage.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ClubButtonImage;
