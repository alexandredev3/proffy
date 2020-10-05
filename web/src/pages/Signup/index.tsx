import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import InputUnform from '../../components/InputUnform';
import Button from '../../components/Button';

import logoImage from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import { 
  SignupPage,
  Content,
  Header,
  FormContainer,
  BackgroundContainer,
  ImageContainer
} from './style';

export default function Signup() {
  const handleSubmit = useCallback((
    data: any
  ) => {
    console.log(data);
  }, [])

  return (
    <SignupPage>
      <Content>
        <Header>
          <Link to="/">
            <img src={backIcon} alt="back icon"/>
          </Link>
        </Header>

        <FormContainer>
          <h1>Cadastro</h1>
          <p>
            Preencha os dados abaixo para começar.
          </p>

          <Form onSubmit={handleSubmit}>
            <InputUnform
              name="Nome"
              type="text"
            />

            <InputUnform
              name="Sobrenome"
              type="text"
            />

            <InputUnform
              name="Email"
              type="text"
            />

            <InputUnform
              name="Senha"
              type="password"
            />

            <InputUnform
              name="Confirmar senha"
              type="password"
            />

            <Button>
              Concluir cadastro
            </Button>
          </Form>
        </FormContainer>
      </Content>

      <BackgroundContainer>
        <ImageContainer>
          <img src={logoImage} alt="logo proffy" />
          <p>Sua plataforma de <br /> estudos online</p>
        </ImageContainer>
      </BackgroundContainer>

    </SignupPage>
  );
}