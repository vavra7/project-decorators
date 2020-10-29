import { FC } from 'react';

export interface InputProps {
  type?: 'text' | 'number';
}

export const Input: FC<InputProps> = props => {
  const { type } = props;
  return <input type={type || 'text'} />;
};
