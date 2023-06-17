import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const LoadMore = ({ onClick }) => (
  <LoadMoreButton onClick={onClick}>Load More...</LoadMoreButton>
);

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMore;
