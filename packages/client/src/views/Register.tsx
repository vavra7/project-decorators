import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import { Container } from '../components/commons';
import Layout1 from '../components/layouts/Layout1';
import { RegisterUserForm } from '../model';
import { validator } from '../utils';

const Register: NextPage = () => {
  const onSubmit = (
    form: RegisterUserForm,
    { setSubmitting }: FormikHelpers<RegisterUserForm>
  ): void => {
    console.log('formik is submitting...');

    setTimeout(() => {
      console.log('sent');
      setSubmitting(false);
    }, 1000);
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
          {formik => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="email">Email</label>
              <Field name="email" />

              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" />

              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" />

              <button type="submit">submit</button>
              <pre>{JSON.stringify(formik, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout1>
  );
};

export default Register;
