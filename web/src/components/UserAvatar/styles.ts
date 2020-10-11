import styled from 'styled-components';

export const Container = styled.div`
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
