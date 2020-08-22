import styled from 'styled-components';

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}

interface Props {
  isTeacherList?: boolean;
}

export const InputBlock = styled.div<Props>`
  position: relative;

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
    color: ${(props) => props.isTeacherList 
      ? 'var(--color-text-in-primary)' : 'var(--color-text-complement)'};
    font-size: 1.4rem;
  }

  > input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Archivo;
  }
`as React.FC<Props>;