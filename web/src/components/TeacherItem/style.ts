import styled from 'styled-components';

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}

export const TeacherItemContent = styled.div`
  background: var(--color-box-base);
  border: 1px solid var(--color-line-in-white);
  border-radius: 0.8rem;
  margin-top: 2.4rem;

  overflow: hidden;
  /** Para deixar a imagem dentro da borda. */

  > p {
    padding: 0 2rem;
    font-size: 1.6rem;
    line-height: 2.8rem;

    @media ${device.desktop} {
      padding: 0 3.2rem;
    }
  }
`;

export const Header = styled.header`
  padding: 3.2rem 2rem;
  display: flex;
  align-items: center;

  > img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  > div {
    margin-left: 2.4rem;
  }

  > div strong {
    font: 700 2.4rem Archivo;
    display: block;
    color: var(--color-text-title);
  }

  > div span {
    font-size: 1.6rem;
    display: block;
    margin-top: 0.4rem;
  }

  @media ${device.desktop} {
    padding: 3.2rem;
  }

`;

export const Footer = styled.footer`
  padding: 3.2rem 2rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p strong {
    color: var(--color-primary);
    font-size: 1.6rem;
    display: block;

    @media ${device.desktop} {
      display: initial;
      margin-left: 1.6rem;
    }
  }

  > button {
    width: 20rem;
    height: 5.6rem;
    background: var(--color-secundary);
    color: var(--color-button-text);
    border: 0;
    border-radius: 0.8rem;
    cursor: pointer;
    font: 700 1.4rem Archivo;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    transition: 200ms;

    &:hover {
      background: var(--color-secundary-dark);
    }

    @media ${device.desktop} {
      width: 24.5rem;
      font-size: 1.6rem;
      justify-content: center;
    }

    > img {
      @media ${device.desktop} {
        margin-right: 1.6rem;
      }
    }
  }
`;

export const Article = styled.article``;