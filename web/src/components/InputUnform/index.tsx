import React, { 
  useEffect,
  useRef,
  useCallback,
  useState,
  InputHTMLAttributes 
} from 'react';
import { useField } from '@unform/core';

import { Container } from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputUnform: React.FC<Props> = ({ name, ...rest }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error, } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return(
    <Container
      isFilled={isFilled} isFocus={isFocus}
    >
        
      <span>{rest.placeholder}</span>
      <div></div>
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest} 
      />
    </Container>
  );
}

export default InputUnform;