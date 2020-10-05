import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import InputUnform from '../../components/InputUnform';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';

import logoImage from '../../assets/images/logo.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import { 
  SigninPage,
  Content,
  BackgroundContainer,
  ImageContainer,
	FormContainer,
  CheckboxContainer,
  Footer,
  RegisterLinkContainer,
  Title,
} from './style';

interface CheckboxOptions {
  id: string;
  value: string;
  label: string;
}

function Signin() {
  const handleSubmit = useCallback((data: any) => {
    console.log(data)
  }, [])

  const checkboxOptions: CheckboxOptions[] = [
    { id: "1", value: "true", label: "Lembrar-me" }
  ]

	return (
    <SigninPage>
      <BackgroundContainer>
        <ImageContainer>
          <img src={logoImage} alt="logo proffy" />
          <p>Sua plataforma de <br /> estudos online</p>
        </ImageContainer>
      </BackgroundContainer>

      <Content>
        <FormContainer>
          <h1>Fazer login</h1>

          <Form onSubmit={handleSubmit}>
            <InputUnform name="Email" type="text"></InputUnform>
            <InputUnform name="Password" type="password"></InputUnform>

            <CheckboxContainer>
              <Checkbox 
                name="remember" 
                options={checkboxOptions}
              />
              <a href="#">Esqueci minha senha</a>
            </CheckboxContainer>

            <Button>
              Entrar
            </Button>
          </Form>
        </FormContainer>

        <Footer>
          <RegisterLinkContainer>
            <p>Não tem conta?</p>
            <Link to="/signup">Cadastre-se</Link>
          </RegisterLinkContainer>

          <Title>
            <span>
              É de graça <img src={purpleHeart} alt="Purple Heart Icon" />
            </span>
          </Title>
        </Footer>
      </Content>
    </SigninPage>
	);
}

export default Signin;