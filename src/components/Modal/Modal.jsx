import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal');

const Modal = ({ largeImageUrl, modalHide }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalHide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalHide]);

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      modalHide();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDrop}>
      <ModalWindow>
        <Image src={largeImageUrl} alt="" onClick={modalHide} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  modalHide: PropTypes.func.isRequired,
};

export default Modal;
