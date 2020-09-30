import styled from 'styled-components';

import backgroundImage from '../../assets/images/background.svg';

export const SigninPage = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 768px;

  background: url(${backgroundImage}) var(--color-primary);
  background-size: 500px;
  background-repeat: no-repeat;
  background-position: center;

  > p {
    font-size: 2.4rem;
    margin-top: 3rem;
    // margin-right: 221px;
    color: var(--color-text-in-primary);
  }
`;

export const FormContainer = styled.div`
  h1 {
    font-size: 3.6rem;
    margin-right: 15rem;
    margin-bottom: 4rem;
    color: var(--color-text-title);
  }

  form {
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
  }
`;
