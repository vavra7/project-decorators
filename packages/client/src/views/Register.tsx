import { useMutation } from '@apollo/client';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import { Container, Input } from '../components/commons';
import Layout1 from '../components/layouts/Layout1';
import {
  RegisterUserMutation,
  registerUserMutation,
  RegisterUserMutationVariables
} from '../graphql';
import { RegisterUserForm } from '../model';
import { validator } from '../utils';

const Register: NextPage = () => {
  const [registerUser] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    registerUserMutation
  );

  const onSubmit = async (
    form: RegisterUserForm,
    { setSubmitting, resetForm }: FormikHelpers<RegisterUserForm>
  ): Promise<void> => {
    console.log('formik is submitting...');
    const { data } = await registerUser({
      variables: {
        data: form.getData()
      }
    });
    if (data) resetForm();
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
          {formik => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="email">Email</label>
              <Field label="Email" name="email" />

              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" />

              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />

              <Field component={Input} label name="confirmPassword" type="password" />

              <button type="submit">submit</button>
              <pre>{JSON.stringify(formik, null, 4)}</pre>
            </Form>
          )}
        </Formik>
        <Input
          errors={['asd']}
          label="ad"
          name="bobek"
          onBlur={() => console.log('blur')}
          onChange={() => console.log('change')}
          onFocus={() => console.log('focus')}
          value="asdf sdfa fsdaf a"
        />
      </Container>
    </Layout1>
  );
};

export default Register;
