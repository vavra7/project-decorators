import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { Link } from '../components/commons';
import Layout1 from '../components/layouts/Layout1';
import { Route } from '../enums';
import { i18n, t } from '../utils';

const test = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;

const Login: NextPage = () => {
  const { loading, error, data } = useQuery(test);
  return (
    <Layout1>
      <h1>{t('views.login.title')}</h1>
      <div>{i18n.lang}</div>
      <Link to={Route.Home}>
        <button type="button">to locale home</button>
      </Link>
      <br />
      <pre>{JSON.stringify(loading, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout1>
  );
};

export default Login;
