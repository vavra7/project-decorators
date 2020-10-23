import { NextPage } from 'next';
import { Link } from '../components/commons';
import Layout1 from '../components/layouts/Layout1';
import { Route } from '../enums';
import { i18n } from '../utils';

const ConfirmEmail: NextPage = () => {
  return (
    <Layout1>
      <div>{i18n.lang}</div>
      <Link to={Route.Home}>
        <button type="button">to locale home</button>
      </Link>
    </Layout1>
  );
};

export default ConfirmEmail;
