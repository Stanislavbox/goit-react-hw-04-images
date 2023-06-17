import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledImageGalleryItem,
  GalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, showModal }) => {
  const { webformatURL, tags, largeImageURL } = image;

  const handleClick = () => {
    showModal(largeImageURL);
  };

  return (
    <StyledImageGalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={handleClick} />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};
