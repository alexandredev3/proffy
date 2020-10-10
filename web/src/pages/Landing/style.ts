import styled from 'styled-components';

export const PageLanding = styled.div`
  width: 100vw;
  height: 100vh;

  color: var(--color-text-in-primary);
  background: var(--color-primary);
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  @media(min-width: 1100px) {
    /*
      Esse elemento vai ocupar o logo la do grid-template-areas
    */
    align-self: center;
    text-align: left;

    > h2 {
      text-align: initial;
      font-size: 3.6rem;
    }

    > img {
      height: 100%;
    }
  }

  > img {
    height: 10rem;
  }

  > h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  margin: 2.4rem 14rem;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;

  > img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
  }

  > span {
    font-size: 1.4rem;
    font-family: 'poppins';
    margin-left: 2rem;
  }
`;

export const SignOutContainer = styled.div`
  > img {
    cursor: pointer;
    transition: opacity .2s;

    &:hover {
      opacity: .8;
    }
  }
`;


export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 4rem;

  width: 100%;
  height: 30vh;
  background: var(--color-background);

  > p {
    margin-right: 13rem;
    font-size: 2rem;

    color: var(--color-text-base);
  }
`;


export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;


  @media(min-width: 1100px) {

    > a {
      font-size: 2.4rem;
    }

    > a img {
      margin-right: 2.4rem;
    }
  }

  > a {
    width: 30rem;
    height: 10.4rem;
    border-radius: 0.8rem;
    font: 700 2.0rem Archivo;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: var(--color-button-text);

    transition: background-color 200ms;
  }

  > a:first-child {
    margin-right: 1.6rem;
  }

  > a.study {
    background: var(--color-primary);

    &:hover {
      background: var(--color-primary-dark);
    }
  }

  > a.give-classes {
    background: var(--color-secundary);

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  > a img {
    width: 4rem;
  }
`;

export const HeroImage = styled.div`
  > img {
    width: 100%;
  }

  @media(min-width: 1100px) {

  }
`;

export const TotalConnections = styled.div`
  font-size: 1.4rem;
  margin-right: 4rem;
  text-align: right;
  color: var(--color-text-complement);

  display: flex;
  align-items: center;
  justify-content: center;

  @media(min-width: 1100) {
    grid-area: total;
    /*
      Esse elemento vai ocupar o total la do grid-template-areas
    */
    justify-self: end;
  }

  > span {
    > img {
      margin-left: 0.8rem;
    }
  }
`;

export const PageLandingContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media(min-width: 1100px) {
    max-width: 1100px;
    margin: 0 auto;
  }
`;