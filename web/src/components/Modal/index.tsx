import React from 'react';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg'

import { Container, Content, Button } from './styles';
import { useHistory } from 'react-router-dom';

interface Props {
  isVisible: boolean;
  title: string;
  describe: string;
  titleButton: string;
  redirectPath: string;
}

const Modal: React.FC<Props> = ({ 
  isVisible, title, describe, titleButton, redirectPath 
}) => {
  const { push } = useHistory();

  function handleRedirect() {
    push(redirectPath);
  }

  return (
    <Container isVisible={isVisible}>
      <Content>
        <img src={successCheckIcon} alt="check icon"/>

        <h1>{title}</h1>
        <p>{describe}</p>

        <Button onClick={handleRedirect}>
          {titleButton}
        </Button>
      </Content>
    </Container>
  );
};

export default Modal;
