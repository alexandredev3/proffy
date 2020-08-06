import React from 'react';

import { 
  Article,
  TeacherItemContent,
  Header,
  Footer
} from './style';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import { api } from '../../services/api';

export interface TeacherTypes {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface TeacherItemProps {
  teacher: TeacherTypes;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function handleCreateNewConnection() {
    api.post('/connections', {
      user_id: teacher.id
    });
  }

  return (
  <Article>
    <TeacherItemContent>
      <Header>
        <img src={teacher.avatar} alt="Alexandre Costa"/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </Header>

      <p>
        {teacher.bio}
      </p>

      <Footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCreateNewConnection} 
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contado
        </a>
      </Footer>

    </TeacherItemContent>
  </Article>
  );
}

export default TeacherItem;