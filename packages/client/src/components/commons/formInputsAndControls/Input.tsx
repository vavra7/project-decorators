import { FC } from 'react';

interface Props {
  type?: 'text' | 'number';
}

export const Input: FC<Props> = props => {
  const { type } = props;
  return <input type={type || 'text'} />;
};
