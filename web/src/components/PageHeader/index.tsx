import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import iconBack from '../../assets/images/icons/back.svg';

import { PageHeaderContent, TopBarContainer, HeaderContent } from './style';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
  <PageHeaderContent>
      <TopBarContainer>
        <Link to="/">
          <img src={iconBack} alt="Voltar"/>
        </Link>
        <img src={logoImg} alt="Proffy"/>
      </TopBarContainer>

      <HeaderContent>
        <strong>{title}</strong>
        
        {children}
      </HeaderContent>
  </PageHeaderContent>
  );
}

export default PageHeader;