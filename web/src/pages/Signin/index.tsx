import React from 'react';
import { Form } from '@unform/web';

import InputLogin from '../../components/InputLogin';

import logoImage from '../../assets/images/logo.svg';

import { 
  SigninPage,
  Content,
  BackgroundContainer,
	FormContainer
} from './style';

function Signin() {
    function handleSubmit() {
        console.log("logado com sucesso")
    }

	return (
		<SigninPage>
      <BackgroundContainer>
        <img src={logoImage} alt="logo proffy" />
        <p>Sua plataforma de <br /> estudos online</p>
      </BackgroundContainer>

      <Content>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <h1>Fazer login</h1>
            <InputLogin name="Email" type="text"></InputLogin>
            <InputLogin name="Password" type="password"></InputLogin>
          </Form>
        </FormContainer>
      </Content>
		</SigninPage>
	);
}

export default Signin;