import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { 
  PageTeacherForm, 
  Main,
  Fieldset, 
  Footer, 
  ScheduleItem, 
  Form
} from './style';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import { api } from '../../services/api';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function handleAddNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
      // aqui eu tiver que mudar o nome do scheduleItems para schedule
      // porque la no back-end esta schedule.
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro durante o cadastro!')
    })
  }

  return (
    <PageTeacherForm>
      <PageHeader
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passado é preencher esse formulário de inscrição."  
        marginBottom
      />

      <Main>
        <Form onSubmit={handleCreateClass}>
          {/*O fieldset vai ser cada bloco dos inputs*/}
          <Fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo" 
              value={name}
              onChange={(e) => { setName(e.target.value) }} 
            />

            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />

            <Input 
              name="whatsapp"
              label="Whatsapp" 
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />

            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            />

          </Fieldset>

          <Fieldset>
            <legend>Sobre a aulas</legend>

            <Select 
              name="subject" 
              label="Matéria"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciência', label: 'Ciência' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Quimica', label: 'Quimica' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Educação física', label: 'Educação física' },
                { value: 'Historia', label: 'Historia' },
                { value: 'Fisica', label: 'Fisica' },
              ]}
            />

            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
            
          </Fieldset>

          <Fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <ScheduleItem key={scheduleItem.week_day}>
                    <Select
                      isWhithoutMarginTop
                      name="week_day" 
                      label="Dia da semana"
                      value={scheduleItem.week_day}
                      onChange={(e) => 
                        setScheduleItemValue(index, 'week_day', e.target.value
                      )}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' }
                      ]}
                    />

                    <Input 
                      name="from" 
                      label="Das" 
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) => setScheduleItemValue(index, 'from', e.target.value
                      )}
                    />

                    <Input 
                      name="to" 
                      label="Até" 
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) => setScheduleItemValue(index, 'to', e.target.value
                      )}
                    />
                  </ScheduleItem>
                );
              })}
          </Fieldset>

          <Footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </Footer>
        </Form>
      </Main>
    </PageTeacherForm>
  );
}

export default TeacherForm;