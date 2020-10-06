import styled from 'styled-components';

import successBackgroundImg from '../../assets/images/success-background.svg'

interface Props {
  isVisible: boolean;
}

export const Container = styled.div<Props>`
  display: ${(props) => props.isVisible ? "initial" : "none"};

  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;

  text-align: center;
  width: 99vw;
  height: 110vh;
  background: url(${successBackgroundImg}) var(--color-primary);
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  position: relative;
  top: 14vh;
  color: var(--color-title-in-primary);


  > h1 {
    font-size: 5.4rem;
    font-family: 'Archivo';
    font-weight: 700;

    margin-top: 5.5rem;
    margin-bottom: 2.4rem;
  }

  > p {
    width: 100%;
    margin: 0 auto;
    max-width: 367px;

    font-size: 1.6rem;
    font-family: 'Poppins';
  }

  > button {
    margin-top: 14rem;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 197px;
  height: 56px;
  border: 0;
  border-radius: .8rem;
  color: var(--color-box-base);
  font: 700 1.6rem Archivo;
  cursor: pointer;
  background: var(--color-secundary);
  transition: opacity .2s;

  &:hover {
    opacity: .9;
  }
`;
