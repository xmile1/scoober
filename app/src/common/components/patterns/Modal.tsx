import React from 'react';
import styled from 'styled-components';

const Overlay = styled.dialog`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Overlay>
      {children}
    </Overlay>
  );
};
