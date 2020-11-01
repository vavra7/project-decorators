import { FieldProps } from 'formik';
import { Component, ComponentType, ReactNode } from 'react';
import { t } from '../utils/i18n';

interface FormikFieldProps extends Partial<FieldProps> {
  [key: string]: any;
}

interface AsFormikFieldState {
  isFormik: boolean;
  touched: boolean;
  error?: string;
}

export function FormikField(): any {
  return (WrappedTarget: ComponentType<any>) => {
    const WithRouterComponent = class extends Component<FormikFieldProps, AsFormikFieldState> {
      constructor(props: any) {
        super(props);
        this.state = {
          isFormik: this.isFormik(),
          touched: this.isFormik() ? false : true,
          error: this.getError()
        };
      }

      public componentDidUpdate(prevProps: FormikFieldProps): void {
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
          this.setState({ error: this.getError() });
        }
        if (!this.state.isFormik && prevProps.error !== this.props.error) {
          this.setState({ error: this.getError() });
        }
      }

      private isFormik(): boolean {
        return !!(this.props.form && this.props.field);
      }

      private getError(): string | undefined {
        if (this.isFormik()) {
          const errors = this.props.form!.errors[this.props.field!.name];
          return errors ? (errors as string[])[0] : undefined;
        } else {
          return this.props.error;
        }
      }

      private getLabel(): string | undefined {
        if (this.state.isFormik && typeof this.props.label === 'boolean' && this.props.label) {
          return t(`${this.props.form!.values.translationPath}.${this.props.field!.name}`);
        } else {
          return this.props.label;
        }
      }

      public render(): ReactNode {
        const { label, form, field, ...restProps } = this.props;
        const { error, touched } = this.state;
        return (
          <WrappedTarget
            error={touched ? error : undefined}
            label={this.getLabel()}
            {...field}
            {...restProps}
          />
        );
      }
    };
    return WithRouterComponent;
  };
}
