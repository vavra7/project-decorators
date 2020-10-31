import cn from 'classnames';
import { FieldProps } from 'formik';
import _uniqueId from 'lodash/uniqueId';
import { Component, ReactElement } from 'react';
import { Assign, DefaultProps } from '../../../types';
import { t } from '../../../utils/i18n';
import styles from './Input.module.scss';

export interface InputProps extends Partial<FieldProps> {
  type?: 'text' | 'number' | 'password';
  label?: string | boolean;
  value: string | number;
  errors?: string[];
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e: React.FocusEvent<HTMLInputElement>): void;
  inputId?: string;
  id?: string;
  name?: string;
  className?: string;
  style?: { [key: string]: string };
}

interface InputState {
  isFormik: boolean;
  touched: boolean;
  errorMessage?: string;
  label?: string;
  inputId: string;
}

type InputPropsWithDefault = Assign<InputProps, typeof Input.defaultProps>;

export class Input extends Component<InputPropsWithDefault, InputState> {
  public static readonly defaultProps: DefaultProps<InputProps, 'errors' | 'type'> = {
    errors: [],
    type: 'text'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isFormik: this.isFormik(),
      touched: this.isFormik() ? false : true,
      errorMessage: this.getErrorMessage(),
      label: this.getLabel(),
      inputId: this.getInputId()
    };
  }

  public componentDidUpdate(prevProps: InputPropsWithDefault): void {
    // touched
    if (
      this.state.isFormik &&
      prevProps.form!.touched[prevProps.field!.name] !==
        this.props.form!.touched[this.props.field!.name]
    ) {
      this.setState({ touched: !!this.props.form!.touched[this.props.field!.name] });
    }
    // error message
    if (
      this.state.isFormik &&
      prevProps.form!.errors[prevProps.field!.name] !==
        this.props.form!.errors[this.props.field!.name]
    ) {
      this.setState({ errorMessage: this.getErrorMessage() });
    }
    if (!this.state.isFormik && prevProps.errors[0] !== this.props.errors[0]) {
      this.setState({ errorMessage: this.getErrorMessage() });
    }
    // label
    if (prevProps.label !== this.props.label) {
      this.setState({ label: this.getLabel() });
    }
  }

  private isFormik(): boolean {
    return !!(this.props.form && this.props.field);
  }

  private getLabel(): string | undefined {
    if (this.isFormik() && typeof this.props.label === 'boolean') {
      return t(`${this.props.form!.values.translationPath}.${this.props.field!.name}`);
    } else if (typeof this.props.label === 'string') {
      return this.props.label;
    }
  }

  private getErrorMessage(): string | undefined {
    if (this.isFormik()) {
      return this.props.form!.errors[this.props.field!.name] as string | undefined;
    } else {
      return this.props.errors[0];
    }
  }

  private getInputId(): string {
    if (this.isFormik()) {
      return `input-${this.props.field!.name}`;
    } else if (this.props.name) {
      return `input-${this.props.name}`;
    } else {
      return `input-${_uniqueId()}`;
    }
  }

  private restInputProps(): any {
    if (this.state.isFormik) {
      return this.props.field;
    } else {
      return {
        value: this.props.value,
        onChange: this.props.onChange,
        onBlur: this.props.onBlur,
        onFocus: this.props.onFocus
      };
    }
  }

  public render(): ReactElement {
    const { errorMessage, touched, label, inputId } = this.state;
    const { type, id, className, style } = this.props;
    return (
      <div
        className={cn({
          [className || '']: className,
          [styles.inputWrapper]: true,
          [styles.error]: errorMessage && touched
        })}
        id={id}
        style={style}
      >
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} type={type} {...this.restInputProps()} />
        <div>{touched && errorMessage}</div>
      </div>
    );
  }
}
