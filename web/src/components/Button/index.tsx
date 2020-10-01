import React from 'react';

import { Container } from './style';

const Button: React.FC = ({ children }) => {
  return (
    <Container type="button">
      { children }
    </Container>
  );
}

export default Button;