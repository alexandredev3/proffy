import React, { useCallback } from 'react';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg'

import { Container, Content, Button } from './styles';
import { useHistory } from 'react-router-dom';

interface Props {
  isVisible: boolean;
  title: string;
  describe: string;
  buttonText: string;
  redirectButton: string;
}

const Modal: React.FC<Props> = ({ 
  isVisible, title, describe, buttonText, redirectButton 
}) => {
  const { push } = useHistory();

  const handleRedirect = useCallback(() => {
    push(redirectButton);
  }, [])

  return (
    <Container isVisible={isVisible}>
      <Content>
        <img src={successCheckIcon} alt="check icon"/>

        <h1>{title}</h1>
        <p>{describe}</p>

        <Button onClick={handleRedirect}>
          {buttonText}
        </Button>
      </Content>
    </Container>
  );
};

export default Modal;
