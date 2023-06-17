import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ arrImages, showModal }) => {
  return (
    <ImageGalleryList>
      {arrImages.map(image => (
        <ImageGalleryItem
          key={nanoid()}
          image={{ ...image, id: image.id.toString() }}
          showModal={showModal}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  arrImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};
