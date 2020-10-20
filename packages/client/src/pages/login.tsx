import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { router } from '../utils';

const test = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;

const login: NextPage = () => {
  const { loading, error, data } = useQuery(test);
  const onClick = (): void => {
    router.push('/home');
  };
  return (
    <>
      <h1>Login</h1>
      <br />
      <button onClick={onClick} type="button">
        test
      </button>
      <br />
      <pre>{JSON.stringify(loading, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};

export default login;
