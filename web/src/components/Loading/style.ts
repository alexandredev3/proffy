import styled from 'styled-components';

export const PageLoading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);

  > h2 {
    color: var(--color-title-in-primary);
  }
`;