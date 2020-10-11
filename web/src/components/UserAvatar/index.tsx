import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const UserAvatar: React.FC = () => {
  const { userData } = useAuth();

  return (
    <Container>
      {
        userData?.avatar_url
          ? <img src={userData?.avatar_url} />
          : <p>Sem foto</p>
      }

      <span>{userData?.name}</span>
    </Container>
  );
};

export default UserAvatar;
