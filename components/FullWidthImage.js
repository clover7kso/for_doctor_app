import React, { Component } from "react";
import { Image, View } from "react-native";
import constants from "../constants";

export default class FullWidthImage extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
    };
  }

  _onLayout(event) {
    const containerWidth = constants.width * 0.92;

    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio,
      });
    } else if (typeof this.props.source === "number") {
      const source = Image.resolveAssetSource(this.props.source);

      this.setState({
        width: containerWidth,
        height: (containerWidth * source.height) / source.width,
      });
    } else if (typeof this.props.source === "object") {
      Image.getSize(this.props.source.uri, (width, height) => {
        this.setState({
          width: containerWidth,
          height: (containerWidth * height) / width,
        });
      });
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height,
          }}
        />
      </View>
    );
  }
}
