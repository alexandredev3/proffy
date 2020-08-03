import React from 'react';

import { 
  PageTeacherList, 
  SearchTeachers, 
  InputBlock,
  Main
} from './style';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

function TeacherList() {
  return (
    <PageTeacherList>
      <PageHeader title="Estes são os proffys disponíveis.">

      <SearchTeachers>
          <form>

            <InputBlock>
              <label htmlFor="subject">Matéria</label>
              <input type="text" id="subject" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="week_day">Dia da semana</label>
              <input type="text" id="week_day" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="time">Hora</label>
              <input type="text" id="time" />
            </InputBlock>

          </form>
        </SearchTeachers>
      </PageHeader>

      <Main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </Main>
    </PageTeacherList>
  );
}

export default TeacherList;