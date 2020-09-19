import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  height: ${(constants.width / 3) * (11 / 7)};
`;

const ImageSample = styled.Image`
  border-radius: 15;
  resize-mode: contain;
  width: ${constants.width / 1.5};
  margin-left: 10px;
  margin-right: 10px;
`;

const ProductSimpleImages = ({ imageArray }) => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {imageArray.map((element) => (
          <ImageSample key={element.url} source={{ uri: element.url }} />
        ))}
      </ScrollView>
    </Container>
  );
};

ProductSimpleImages.propTypes = {
  imageArray: PropTypes.array.isRequired,
};

export default ProductSimpleImages;
