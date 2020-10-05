import styled from 'styled-components';

export const Container = styled.button`
  width: 342px;
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