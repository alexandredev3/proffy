import styled from 'styled-components';

interface Props {
  marginBottom?: boolean;
}

const size = {
  desktop: '700px',
}

const device = {
  desktop: `(min-width: ${size.desktop})`
}

export const PageHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-primary);

  @media ${device.desktop} {
    height: 340px;
  }
`; 

export const TopBarContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-in-primary);
  padding: 1.6rem 0;

  > img {
    height: 1.6rem;
  }

  > a {
    height: 3.2rem;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.6;
    }
  }

  @media ${device.desktop} {
    max-width: 1100px;
  }
`;

export const HeaderContent = styled.div<Props>`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: 3.2rem auto;

  > p {
    margin-bottom: ${(props) => props.marginBottom ? '6.4rem' : null};
  }

  > strong {
    font: 700 3.6rem Archivo;
    line-height: 4.2rem;
    color: var(--color-title-in-primary);

    @media ${device.desktop} {
      max-width: 350px;
    }
  }

  > p {
    max-width: 30rem;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: var(--color-text-in-primary);
    margin-top: 2.4rem;
  }

  @media ${device.desktop} {
    flex: 1;
    max-width: 740px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`as React.FC<Props>;