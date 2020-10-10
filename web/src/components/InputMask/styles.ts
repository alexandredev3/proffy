import styled from 'styled-components';

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}


export const Container = styled.div`
  position: relative;

  &:focus-within::after {
    width: calc(100% - 8.2rem);
    height: 2px;
    content: '';
    /*O content ele e obrigatorio sempre que usarmos o after ou o before.*/
    background: var(--color-primary-light);
    position: absolute;
    left: 6.9rem;
    right: 7rem;
    /*left somado com o right dar aquele 3.2 que tiramos do width*/
    bottom: 0;
  }
  /*Com isso vamos ter uma linha embaixo do input que tiver com focus.*/

  & + & {
    margin-top: 1.4rem;

    @media ${device.desktop} {
      margin-top: 0;
    }
  }
  /* todos os inputs que vem depois do primeiro vai aplicar esse margin-top */

  > label {
    color: var(--color-text-complement);
    font-size: 1.4rem;
  }

  > input {
    width: calc(100% - 6rem);
    height: 5.6rem;
    margin-top: 0.8rem;
    margin-left: 5.8rem;
    border-radius: 0.8rem;
    background: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 2.6rem;
    font: 1.8rem Archivo;
  }
`;
