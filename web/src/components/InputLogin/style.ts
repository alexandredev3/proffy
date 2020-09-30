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
    top: 10px;
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
  }

  ${(props) => props.isFilled &&
    css`
      span {
        font-size: 1.2rem;
        top: 10px;

        animation: .2s ${moveIn} ease;
        animation-fill-mode: both;
      }
    `}

  ${(props) => props.isFocus &&
    css`
      span {
        animation: .2s ${moveIn} ease;
        animation-fill-mode: both;
      }

      div {
        position: absolute;
        top: 16px;
        left: -2px;
        width: 0.2rem;
        height: 3.5rem;
        background: var(--color-primary);
      }
    `
  }
`;