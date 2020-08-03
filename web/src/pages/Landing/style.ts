import styled from 'styled-components';

export const PageLanding = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-in-primary);
  background: var(--color-primary);
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  @media(min-width: 1100px) {
    grid-area: logo;
    /*
      Esse elemento vai ocupar o logo la do grid-template-areas
    */
    align-self: center;
    margin: 0;
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;


  @media(min-width: 1100px) {
    grid-area: buttons;
    /*
      Esse elemento vai ocupar o buttons la do grid-template-areas
    */
    justify-content: flex-start;

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
    background: var(--color-primary-lighter);

    &:hover {
      background: var(--color-primary-light);
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
    grid-area: hero;
    /*
      Esse elemento vai ocupar o hero la do grid-template-areas
    */
    
    align-self: end;
  }
`;

export const TotalConnections = styled.div`
  font-size: 1.4rem;

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

  > img {
    margin-left: 0.8rem;
  }
`;

export const PageLandingContent = styled.div`
  @media(min-width: 1100px) {
    max-width: 1100px;

    display: grid;
    grid-template-rows: 350px 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas: 
      "logo hero hero"
      "buttons buttons total"
    ;
    /*
      logo: vai ocupar o 350px,
      1fr: vai ocupar a imagen,

      2fr 1fr: buttons buttons,
      1fr: total
    */
  }
`; 