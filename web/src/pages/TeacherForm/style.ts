import styled, { css } from 'styled-components';

const device = {
  desktop: '700px'
};

const size = {
  desktop: `(min-width: ${device.desktop})`
};

interface Props {
  bioCount?: number;
}

export const PageTeacherForm = styled.div`
  width: 100vw;
  height: 100vh;

  @media ${size.desktop} {
    max-width: 100vw;
  }
`;

export const Main = styled.main`
  background: var(--color-box-base);
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 6.4rem;
  overflow: hidden;
`;

export const Form = styled.form`

`;

export const Fieldset = styled.fieldset<Props>`
  border: 0;
  padding: 0 2.4rem;

  color: var(--color-text-base);

  & + & {
    margin-top: 6.4rem;
  }

  > legend {
    font: 700 2.4rem Archivo;
    color: var(--color-text-title);
    margin-bottom: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--color-line-in-white);

    > button {
      background: none;
      border: 0;
      color: var(--color-primary);
      font: 700 1.6rem Archivo;
      cursor: pointer;
      transition: color 200ms;

      &:hover {
        color: var(--color-primary-dark);
      }
    }
  }

  @media ${size.desktop} {
    padding: 0 6.4rem;
  }

  > span {
      font-size: 1.2rem;
      display: inherit;
      text-align: right;

      color: ${(props) => props.bioCount && props.bioCount >= 200 && 'orange'};
      color: ${(props) => props.bioCount && props.bioCount >= 250 && '#ff483b'};
    }
`;

export const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 1.6rem;
`;

export const Footer = styled.footer`
  padding: 4rem 2.6rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 6.4rem;

  > p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--color-text-complement);

    > img {
      margin-right: 2rem;
    }
  }

  > button {
    width: 100%;
    height: 5.6rem;
    background: var(--color-secundary);
    color: var(--color-button-text);
    border: 0;
    border-radius: 0.8rem;
    cursor: pointer;
    font: 700 1.6rem Archivo;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 200ms;
    margin-top: 3.2rem;

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  @media ${size.desktop} {
    padding: 4.0rem 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
      justify-content: space-between;
    }

    > button {
      width: 20rem;
      margin-top: 0;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 84px;
    height: 84px;

    border-radius: 50%;
    object-fit: cover;
  }

  > h3 {
    width: 40%;
    font-family: 'Archivo';
    font-size: 2rem;
    color: var(--color-text-title);
    margin-left: 2rem;
    margin-right: 4rem;
  }
`;
