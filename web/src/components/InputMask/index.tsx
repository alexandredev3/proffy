import React, { useEffect, useRef } from "react"
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends InputProps {
  name: string;
}

const InputMask: React.FC<Props> = ({ name, ...rest }) => {

  return (
    <Container>
      <ReactInputMask
        name={name}
        { ...rest }
      />
    </Container>
  );
};

export default InputMask;
