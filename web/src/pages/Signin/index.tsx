import React from 'react';
import { Form } from '@unform/web';

import InputLogin from '../../components/InputLogin';

import logoImage from '../../assets/images/logo.svg';

import { 
  SigninPage,
  Content,
  BackgroundContainer,
  ImageContainer,
	FormContainer,
  CheckboxContainer,
  WrapperCheckbox,
  WrapperForgotPassword,
} from './style';

function Signin() {
    function handleSubmit() {
        console.log("logado com sucesso")
    }

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
            <InputLogin name="Email" type="text"></InputLogin>
            <InputLogin name="Password" type="password"></InputLogin>
          </Form>
        </FormContainer>

        <CheckboxContainer>
          <WrapperCheckbox>
            <input type="checkbox" />
            <span></span>
            <p>Lembrar-me</p>
          </WrapperCheckbox>

          <WrapperForgotPassword>
            <p>Esqueci minha senha</p>
          </WrapperForgotPassword>
        </CheckboxContainer>
      </Content>
    </SigninPage>
	);
}

export default Signin;