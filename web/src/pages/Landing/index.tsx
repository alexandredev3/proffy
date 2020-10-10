import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  PageLanding, 
  PageLandingContent, 
  Header,
  SignOutContainer,
  UserContainer,
  LogoContainer, 
  HeroImage, 
  ButtonsContainer,
  TotalConnections,
  Footer
} from './style';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import signupImg from '../../assets/images/icons/signup.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { api } from '../../services/api';

import { useAuth } from '../../hooks/auth';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  const { userData, signOut } = useAuth();

  // useEffect(() => {
  //   api.get('/connections').then(response => {
  //     const { total } = response.data;

  //     setTotalConnections(total);
  //   })
  // }, []);

  return (
    <PageLanding>
      <Header>
        <UserContainer>
          {
            userData?.avatar_url
              ? <img src={userData?.avatar_url} />
              : <p>Sem foto</p>
          }

          <span>{userData?.name}</span>
        </UserContainer>

        <SignOutContainer>
          <img
            onClick={signOut}
            src={signupImg} 
            alt="signup icon" 
          />
        </SignOutContainer>
      </Header>

      <PageLandingContent>

        <LogoContainer>
          <img src={logoImg} alt="proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </LogoContainer>

        <HeroImage>
          <img src={landingImg} alt="Plataforma de estudos"/>
        </HeroImage>
      </PageLandingContent>

      <Footer>
        <p>Seja bem-vindo. <br /> <strong>O que deseja fazer?</strong></p>

        <TotalConnections>
            <span>
              Total de {totalConnections} conexões <br /> já realizadas 
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
        </TotalConnections>

      
        <ButtonsContainer>
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>
        </ButtonsContainer>
      </Footer>
    </PageLanding>
  );
}

export default Landing;