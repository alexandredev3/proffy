import styled from 'styled-components';

export const Container = styled.div`
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