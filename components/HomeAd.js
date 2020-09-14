import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { Image, Linking } from "react-native";

const Touchable = styled.TouchableOpacity``;
const OutContainer = styled.View`
  align-items: center;
`;

let interval = null;
export default class HomeAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      max: props.data.length - 1,
      imageArray: props.data.map(function (item) {
        return item["imageUrl"];
      }),
      urlArray: props.data.map(function (item) {
        return item["url"];
      }),
    };
    interval = setInterval(
      function () {
        this.setState({
          counter:
            this.state.counter === this.state.max ? 0 : this.state.counter + 1,
        });
      }.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <OutContainer>
        <Touchable
          onPress={() =>
            Linking.openURL(this.state.urlArray[this.state.counter])
          }
        >
          <Image
            style={{
              borderRadius: 15,
              resizeMode: "contain",
              width: constants.width / 1.05,
              height: constants.width / 2.1,
            }}
            source={{ uri: this.state.imageArray[this.state.counter] }}
          />
        </Touchable>
      </OutContainer>
    );
  }
}

HomeAd.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
};
