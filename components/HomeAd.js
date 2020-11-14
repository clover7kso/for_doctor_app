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
      navigation:props.navigation
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
            {
              const url = this.state.urlArray[this.state.counter]
              url.startsWith('http')?
              Linking.openURL(url):
              this.state.navigation.navigate("ProductOne", {
                id: url.splite(".")[0],
                subCategory: url.splite(".")[1],
              })
            }
          }
        >
          <Image
            style={{
              resizeMode: "cover",
              width: constants.width / 1,
              height: constants.width / 2,
            }}
            source={{ uri: this.state.imageArray[this.state.counter]+'?random_number='+new Date().getTime() }}
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
