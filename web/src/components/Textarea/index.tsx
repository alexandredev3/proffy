import React, { TextareaHTMLAttributes } from 'react';

import { TextareaBlock } from './style';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  caracterCount?: number | string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, caracterCount, ...rest }) => {
  if (caracterCount) {
    if (caracterCount < 10) {
      caracterCount = '00' + caracterCount
    }
    
    if (caracterCount >= 10) {
      caracterCount = '0' + caracterCount
    }
    
    if (caracterCount >= 100) {
      caracterCount = '' + caracterCount
    }
  }

  return (
    <TextareaBlock caracterCount={caracterCount}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
      <span>
        {caracterCount}/300
      </span>
    </TextareaBlock>
  );
}

export default Textarea;