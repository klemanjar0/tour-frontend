import React, { FormEvent } from 'react';
import './TextInput.css';

interface Props {
  value: string;
  placeholder?: string;
  hideText?: boolean;
  onChange: (string: string) => void;
}

const TextInput: React.FC<Props> = (props) => {
  const { value, placeholder, hideText = false, onChange } = props;

  const onTextInput = (event: any) => {
    const text = event.target.value;
    console.log(text);
    onChange(text);
  };

  return (
    <div className="container">
      <input
        className="input"
        type={hideText ? 'password' : 'text'}
        value={value}
        onInput={onTextInput}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
