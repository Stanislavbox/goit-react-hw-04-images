import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  overflow-y: hidden;
`;

export const ModalWindow = styled.div`
  max-width: 80vw;
  max-height: 80vh;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
