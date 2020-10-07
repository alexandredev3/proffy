import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import { api } from '../../services/api';

import InputUnform from '../../components/InputUnform';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

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

interface SignUpFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const inputRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (
    data: SignUpFormData
  ) => {

    try {
      const { 
        name,
        surname,
        email,
        password,
        confirmPassword
      } = data;

      await api.post('/users', {
        name,
        surname,
        email,
        password,
        confirmPassword
      });

      setIsModalVisible(true)
    } catch(err) {
      alert(`Ocorreu um erro durante a criação de um usuario, tente novamente...`);
      console.log(err)
    }

  }, [inputRef]);

  return (
    <SignupPage>
      <Modal
        isVisible={isModalVisible}
        title="Cadastro concluído"
        describe="Agora você faz parte da plataforma da Proffy.
        Tenha uma ótima experiência."
        titleButton="Fazer login"
        redirectPath="/"
      />

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

          <Form ref={inputRef} onSubmit={handleSubmit}>
            <InputUnform
              name="name"
              type="text"
              placeholder="Nome"
            />

            <InputUnform
              name="surname"
              type="text"
              placeholder="Sobrenome"
            />

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

            <InputUnform
              name="confirmPassword"
              type="password"
              placeholder="Confirmar senha"
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