import React, { SelectHTMLAttributes } from 'react';

import { SelectBlock } from './style';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  isWhithoutMarginTop?: boolean;
  differentColor?: boolean;
  options: Array<{
    value: string,
    label: string
  }>
}
  
const Select: React.FC<SelectProps> = ({ 
  label, name, isWhithoutMarginTop, differentColor, options,...rest 
}) => {
  return (
    <SelectBlock 
      isWhithoutMarginTop={isWhithoutMarginTop} 
      differentColor={differentColor}
    >
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>

        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>{option.label}</option>
          );
        })}
      </select>
    </SelectBlock>
  );
}

export default Select;