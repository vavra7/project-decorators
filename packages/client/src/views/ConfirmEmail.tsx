import { Route } from '@project-decorators/shared';
import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import { Link } from '../components/commons';
import { i18n, t } from '../utils';

const ConfirmEmail: NextPage = (props: any) => {
  const { query } = useRouter();
  console.log(i18n.locale);
  return (
    <>
      <div>{t('adsf')}</div>
      <div>{i18n.locale}</div>
      <Link to={Route.Home}>
        <button type="button">to locale home</button>
      </Link>
      <pre>{JSON.stringify(query, null, 4)}</pre>
    </>
  );
};

export default withRouter(ConfirmEmail);
