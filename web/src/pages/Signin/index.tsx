import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import InputUnform from '../../components/InputUnform';
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

interface SigninData {
  email: string;
  password: string;
}

function Signin() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
  const inputRefs = useRef<FormHandles>(null);
  
  const { signIn } = useAuth();

  const handleRemember = useCallback(() => {
    setIsCheckboxChecked(!isCheckboxChecked)
  }, [isCheckboxChecked]);

  const handleSubmit = useCallback(async (data: SigninData) => {
    const { email, password } = data;

    try {
      await signIn({
        email,
        password,
        isLoginRemember: isCheckboxChecked
      })

    } catch(err) {
      console.log(err)
    }
  }, [inputRefs, isCheckboxChecked])

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
            <InputUnform 
              name="email" 
              type="text" 
              placeholder="E-mail"
            />
            <InputUnform 
              name="password"
              type="password"
              placeholder="Senha" 
            />

            <CheckboxContainer>
              <label>
                <input
                  type="checkbox"
                  onChange={handleRemember}
                />
                <span></span>
                <p>Lembrar-me</p>
              </label>
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