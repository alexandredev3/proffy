import styled from 'styled-components';

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}

interface Props {
  caracterCount?: number | string;
}

export const TextareaBlock = styled.div<Props>`
  position: relative;
  margin-top: 2.4rem;

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    /*O content ele e obrigatorio sempre que usarmos o after ou o before.*/
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    /*left somado com o right dar aquele 3.2 que tiramos do width*/
    bottom: 1px;
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

  > textarea {
    width: 100%;
    height: 16rem;
    min-height: 16rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    resize: vertical;
    padding: 1.2rem 1.6rem;
    font: 1.6rem Archivo;

    position: relative;
  }

  > span {
    position: absolute;
    top: 162px;
    left: 565px;
    bottom: 0;

    color: var(--color-text-complement);

    font-size: 1.2rem;

    color: ${(props) => props.caracterCount && props.caracterCount >= 200 && 'orange'};
    color: ${(props) => props.caracterCount && props.caracterCount >= 250 && '#ff483b'};
  }
`;