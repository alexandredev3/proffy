import React, { 
  forwardRef, 
  useCallback,
  useState,
  useImperativeHandle 
} from 'react';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg'

import { Container, Content, Button } from './styles';
import { useHistory } from 'react-router-dom';

interface ModalProps {
  title: string;
  describe: string;
  titleButton: string;
  redirectPath: string;
}

export interface ModalHandles {
  openModal: () => void;
}

const Modal: React.RefForwardingComponent<ModalHandles, ModalProps> = ({ 
  title, describe, titleButton, redirectPath 
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, [isVisible]);

  useImperativeHandle(ref, () => {
    return {
      openModal
    };
  })

  const { push } = useHistory();

  const handleRedirect = useCallback(() => {
    push(redirectPath);

    setIsVisible(false)
  }, [push, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
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

export default forwardRef(Modal);
