import cn from 'classnames';
import { FC, ReactElement } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: string | ReactElement;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  secondary,
  disabled
}) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.secondary]: secondary,
        [styles.disabled]: disabled
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
