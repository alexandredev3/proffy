import styled from 'styled-components';

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}

export const PageTeacherList = styled.div`
  width: 100vw;
  height: 100vh;

  @media ${device.desktop} {
    max-width: 100%;
  }
`;

export const SearchTeachers = styled.div`
  margin-top: 3.2rem;

  > form {
      @media ${device.desktop} {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      /*Eu quero que ele repida o 1fr 2 vezes.*/
      column-gap: 16px;
      position: absolute;
      bottom: -28px;
    }
  }
`;

export const Form = styled.form`
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
`;

export const Main = styled.main`
  margin: 3.2rem auto;
  width: 90%;

  @media ${device.desktop} {
    padding: 3.2rem 0;
    max-width: 740px;
    margin: 0 auto;
  }
`;