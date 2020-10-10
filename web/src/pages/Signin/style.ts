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

  width: 100%;
  max-width: 700px;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;

  background: url(${backgroundImage}) var(--color-primary);
  background-size: 442px;
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

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-left: 17rem;
    font-size: 3.6rem;
    margin-bottom: 4rem;
    color: var(--color-text-title);
  }

  form {
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 683px;

    div {
      &:nth-of-type(2) {
        border-radius: 0 0 0.8rem 0.8rem;
      }

      &:nth-of-type(1) {
        border-radius: 0.8rem 0.8rem 0 0;
      }
    }

    > button {
      margin-top: 2rem;
    }
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 340px;
  justify-content: space-between;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;

  p, a {
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--color-text-complement);
    transition: opacity .2s;
  }

  a:hover {
    opacity: .8;
  }

  /**CheckBox */

  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  p {
    width: 10rem;
    position: absolute;
    left: 38px;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ span:after {
    display: block;
  }

  input:checked ~ span {
    background: var(--color-secundary);
  }

  span {
    &:after {
      content: "";
      position: absolute;
      display: none;
    }

    cursor: pointer;

    border-radius: .8rem;
    border: .1rem solid var(--color-line-in-white);

    position: absolute;
    top: -1px;
    left: 0;
    height: 24px;
    width: 24px;
    background: var(--color-box-footer);
  }

  span:after {
    left: .7rem;
    top: .3rem;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  > label {
    font-size: 1.4rem;
    color: var(--color-text-complement);
  }

`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 12rem;
`;

export const RegisterLinkContainer = styled.div`
  > p {
    color: var(--color-text-base);
    font-size: 1.6rem;
  }

  > a {
    color: var(--color-primary);
    transition: opacity .2s;

    &:hover {
      opacity: .9;
    }
  }
`;

export const Title = styled.div`


> span {
    color: var(--color-text-complement);
    font-size: 1.2rem;

    > img {
      margin-left: 0.8rem;
      opacity: 0.6;
    }
  }
`;