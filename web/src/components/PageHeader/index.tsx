import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import iconBack from '../../assets/images/icons/back.svg';

import { PageHeaderContent, TopBarContainer, HeaderContent } from './style';

interface PageHeaderProps {
  title: string;
  description?: string;
  // temos que colocar que ela e opcional porque em outro header não tem essa description.
  marginBottom?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title, description, marginBottom, children 
}) => {
  return (
  <PageHeaderContent>
      <TopBarContainer>
        <Link to="/">
          <img src={iconBack} alt="Voltar"/>
        </Link>
        <img src={logoImg} alt="Proffy"/>
      </TopBarContainer>

      <HeaderContent marginBottom={marginBottom}>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        
        {children}
      </HeaderContent>
  </PageHeaderContent>
  );
}

export default PageHeader;