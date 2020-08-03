import React from 'react';

import { 
  PageLanding, 
  PageLandingContent, 
  LogoContainer, 
  HeroImage, 
  ButtonsContainer,
  TotalConnections
} from './style';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

function Landing() {
  return (
    <PageLanding>
      <PageLandingContent>
          <LogoContainer>
            <img src={logoImg} alt="proffy"/>
            <h2>Sua plataforma de estudos online.</h2>
          </LogoContainer>

        <HeroImage>
          <img src={landingImg} alt="Plataforma de estudos"/>
        </HeroImage>

        <ButtonsContainer>
          <a href="/#" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </a>

          <a href="/#" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </a>
        </ButtonsContainer>

        <TotalConnections>
          <span>
            Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </TotalConnections>

      </PageLandingContent>
    </PageLanding>
  );
}

export default Landing;