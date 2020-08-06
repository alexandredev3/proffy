import React, { InputHTMLAttributes } from 'react';

import { InputBlock } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isTeacherList?: boolean;
}

const Input: React.FC<InputProps> = ({ label, name, isTeacherList, ...rest }) => {
  return (
    <InputBlock isTeacherList={isTeacherList} >
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </InputBlock>
  );
}

export default Input;