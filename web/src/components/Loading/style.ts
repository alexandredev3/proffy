import styled, { keyframes } from 'styled-components';

import { FiWifi } from '../../styles/icons';

const opacity = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;

export const PageLoading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);

  > h2 {
    color: var(--color-title-in-primary);
  }
`;

export const LoaderIcon = styled(FiWifi)`
  color: var(--color-title-in-primary);
  width: 12.0rem;
  height: 12.0rem;
  animation: ${opacity} 1s infinite ease-in-out;
`;