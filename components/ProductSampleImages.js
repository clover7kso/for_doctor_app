import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  height: ${(constants.width / 2.1)};
`;

const ImageSample = styled.Image`
  border-radius: 10;
  resize-mode: cover;
  width: ${constants.width / 1.4};
  margin-left: 10px;
  margin-right: 10px;
`;

const ProductSampleImages = ({ imageArray }) => {
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

ProductSampleImages.propTypes = {
  imageArray: PropTypes.array.isRequired,
};

export default ProductSampleImages;
