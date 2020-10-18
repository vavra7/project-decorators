import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';

const test = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;

const login: NextPage = () => {
  const { loading, error, data } = useQuery(test);
  return (
    <>
      <h1>Login</h1>
      <br />
      <pre>{JSON.stringify(loading, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};

export default login;
