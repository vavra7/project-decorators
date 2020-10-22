import { gql, useQuery } from '@apollo/client';
import { Route } from '@project-decorators/shared';
import { NextPage } from 'next';
import { Link } from '../components/commons';
import { i18n, router } from '../utils';

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
    router.push('home');
  };
  return (
    <>
      <h1>Login</h1>
      <div>{i18n.locale}</div>
      <Link to={Route.Home}>
        <button type="button">to locale home</button>
      </Link>
      <br />
      <pre>{JSON.stringify(loading, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};

export default login;
