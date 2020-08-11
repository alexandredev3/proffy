import React, { useState, FormEvent } from 'react';

import { 
  PageTeacherList, 
  SearchTeachers,
  Form,
  Main
} from './style';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherTypes } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { api } from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function handleSearchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    const data = response.data;

    setTeachers(data);

    // console.log({
    //   subject,
    //   week_day,
    //   time
    // })
  }

  return (
    <PageTeacherList>
      <PageHeader title="Estes são os proffys disponíveis.">

      <SearchTeachers>
          <Form onSubmit={handleSearchTeachers}>
            <Select
              differentColor
              isWhithoutMarginTop
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
                { value: 'Fisica', label: 'Fisica' }
              ]}
            />
            <Select
              differentColor
              isWhithoutMarginTop
              name="week_day" 
              label="Dia da semana"
              value={week_day}
              onChange={(e) => { setWeekDay(e.target.value) }}
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
              isTeacherList 
              type="time" 
              name="time"
              label="Hora"
              value={time}
              onChange={(e) => { setTime(e.target.value) }}
            />

            <button type="submit">
              Buscar
            </button>
          </Form>
        </SearchTeachers>
      </PageHeader>

      <Main>
        {teachers.map((teacher: TeacherTypes) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </Main>
    </PageTeacherList>
  );
}

export default TeacherList;