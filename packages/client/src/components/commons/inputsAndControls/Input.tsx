import cn from 'classnames';
import { FieldProps } from 'formik';
import _uniqueId from 'lodash/uniqueId';
import { PureComponent, ReactElement } from 'react';
import { FormikField } from '../../../decorators';
import { Assign, DefaultProps } from '../../../types';
import styles from './Input.module.scss';

export interface InputProps extends Partial<FieldProps> {
  type?: 'text' | 'number' | 'password';
  label?: string;
  value: string | number;
  error?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e: React.FocusEvent<HTMLInputElement>): void;
  inputId?: string;
  id?: string;
  name?: string;
  className?: string;
  style?: { [key: string]: string };
}

type InputPropsWithDefault = Assign<InputProps, typeof Input.defaultProps>;

@FormikField()
export class Input extends PureComponent<InputPropsWithDefault> {
  public static readonly defaultProps: DefaultProps<InputProps, 'type'> = {
    type: 'text'
  };

  private inputId: string;

  constructor(props: any) {
    super(props);
    this.inputId = this.getInputId();
  }

  private getInputId(): string {
    if (this.props.name) {
      return `input-${this.props.name}`;
    } else {
      return `input-${_uniqueId()}`;
    }
  }

  public render(): ReactElement {
    return (
      <div
        className={cn({
          [this.props.className || '']: this.props.className,
          [styles.inputWrapper]: true,
          [styles.error]: this.props.error
        })}
        id={this.props.id}
        style={this.props.style}
      >
        <label htmlFor={this.inputId}>{this.props.label}</label>
        <input
          id={this.inputId}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          type={this.props.type}
          value={this.props.value}
        />
        <div>{this.props.error}</div>
      </div>
    );
  }
}
