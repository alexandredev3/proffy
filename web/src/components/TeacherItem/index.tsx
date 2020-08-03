import React from 'react';

import { 
  Article,
  TeacherItemContent,
  Header,
  Footer
} from './style';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
  return (

  <Article>
    <TeacherItemContent>
      <Header>
        <img src="https://avatars2.githubusercontent.com/u/61118233?s=400&u=6986cc74bed8eb5dee60c2211d9f1b0dd2d24009&v=4" alt="Alexandre Costa"/>
        <div>
          <strong>Alexandre Costa</strong>
          <span>Desenvolvimento Back-end e Front-end</span>
        </div>
      </Header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt maiores dolorum ratione harum eaque ducimus labore repellat accusamus porro facere pariatur quidem dicta, vero iusto ipsam animi officiis totam quis explicabo, maxime perspiciatis quae? Illo dolor dolore deleniti esse est.
      </p>

      <Footer>
        <p>
          Preço/hora
          <strong>R$ 34,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contado
        </button>
      </Footer>

    </TeacherItemContent>
  </Article>
  );
}

export default TeacherItem;