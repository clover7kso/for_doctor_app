import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import FullWidthImage from "./FullWidthImage";

const Container = styled.View`
  align-items: center;
`;

const ImageDetail = styled.Image`
  resize-mode: contain;
  width: ${constants.width / 1.1};
  height: ${constants.width / 1.1};
`;

const ProductDetailImages = ({ imageArray }) => {
  return (
    <Container>
      {imageArray.map((element) => (
        <FullWidthImage key={element.url} source={{ uri: element.url }} />
      ))}
    </Container>
  );
};

ProductDetailImages.propTypes = {
  imageArray: PropTypes.array.isRequired,
};

export default ProductDetailImages;
