import { useMutation } from '@apollo/client';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import { Button, Container, Input } from '../components/commons';
import Layout1 from '../components/layouts/Layout1';
import {
  RegisterUserMutation,
  registerUserMutation,
  RegisterUserMutationVariables
} from '../graphql';
import { RegisterUserForm } from '../model';
import { i18n, t, validator } from '../utils';

const Register: NextPage = () => {
  const [registerUser] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    registerUserMutation
  );

  const onSubmit = async (
    form: RegisterUserForm,
    { setSubmitting, resetForm }: FormikHelpers<RegisterUserForm>
  ): Promise<void> => {
    const { data } = await registerUser({
      variables: {
        data: {
          ...form.getData(),
          preferredLanguage: i18n.lang
        }
      }
    });
    if (data) {
      resetForm();
      console.log('Success');
    }
    setSubmitting(false);
  };

  return (
    <Layout1>
      <Container>
        <h1>Register</h1>
        <Formik
          initialValues={Object.assign(new RegisterUserForm(), {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
          } as { [index in keyof RegisterUserForm]: any })}
          onSubmit={onSubmit}
          validate={validator}
        >
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Field component={Input} label name="email" />
              <Field component={Input} label name="firstName" />
              <Field component={Input} label name="lastName" />
              <Field component={Input} label name="password" type="password" />
              <Field component={Input} label name="confirmPassword" type="password" />
              <div className="ta-right">
                <Button disabled={isSubmitting} type="submit">
                  {t('commons.buttons.submit')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout1>
  );
};

export default Register;
