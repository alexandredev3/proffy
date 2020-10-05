import styled from 'styled-components';

import backgroundImage from '../../assets/images/background.svg';

export const SignupPage = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

export const Header = styled.header`
  margin-left: 17rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  margin-left: 17rem;

  h1 {
    font-size: 3.6rem;
    color: var(--color-text-title);
  }

  p {
    width: 35%;
    margin-top: 2.1rem;
    margin-bottom: 4rem;
  }

  form {
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 683px;
    margin-left: -17rem;

    div {
      &:nth-of-type(1) {
        border-radius: 0.8rem 0.8rem 0 0;
      }

      &:nth-of-type(5) {
        border-radius: 0 0 0.8rem 0.8rem;
      }
    }

    > button {
      margin-top: 4rem;
    }
  }
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48.9vw;
  height: 110vh;

  background: url(${backgroundImage}) var(--color-primary);
  background-size: 420px;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ImageContainer = styled.div`
  > img {
    width: 100%;
    max-width: 334px;
  }

  > p {
    font-size: 2.2rem;
    margin-top: 0.2rem;
    color: var(--color-text-in-primary);
  }
`;
