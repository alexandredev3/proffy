import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
}

const moveIn = keyframes`
  0% {
    top: 1.9rem;
  }

  100% {
    font-size: 1.2rem;
    top: 1rem;
  }
`;

const moveOut = keyframes`
  0% {
    top: 1rem;
    font-size: 1.2rem;
  }

  100% {
    top: 1.9rem;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 342px;
  height: 64px;
  border: 1px solid var(--color-line-in-white);
  padding: 0 1.8rem;
  background: var(--color-box-footer);

  position: relative;

  span {
    position: absolute;
    top: 1.9rem;
    color: var(--color-text-complement);
  }

  input {
    flex: 1;
    z-index: 1;
    margin-top: 20px;
    background: transparent;
    border: 0;
    font-size: 1.4rem;

    /**Não vamos usar o placeholder dentro do input */
    &::placeholder {
      visibility: hidden;
      display: none;
      opacity: 0;
    }
  }

  ${(props) => props.isFilled &&
    css`
      span {
        font-size: 1.2rem;
        top: 1rem !important;

        animation: .2s ${moveIn} ease;
        animation-fill-mode: both;
      }
    `}

  ${(props) => props.isFocus &&
    css`
      span {
        animation: .2s ${moveIn} ease;
        animation-fill-mode: forwards;
      }

      div {
        position: absolute;
        top: 16px;
        left: -2px;

        animation: .2s ${fadeIn} ease;
        animation-fill-mode: forwards;

        width: 0.2rem;
        height: 3.5rem;
        background: var(--color-primary);
      }
    `
  }

  ${(props) => !props.isFocus &&
    css`
      span {
        animation: .2s ${moveOut} ease;
        animation-fill-mode: backwards;
      }

      div {
        position: absolute;
        top: 16px;
        left: -2px;

        animation: .2s ${fadeOut} ease;
        animation-fill-mode: forwards;

        width: 0.2rem;
        height: 3.5rem;
        background: var(--color-primary);
      }
    `
  }
`;