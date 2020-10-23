import { FC, ReactNode } from 'react';
import { Route } from '../../enums';
import { i18n, t } from '../../utils';
import { Container, Link } from '../commons';
import LangSwitch from '../commons/header/LangSwitch';

interface Props {
  children: ReactNode;
}

const Layout1: FC<Props> = ({ children }) => {
  return (
    <>
      <Container
        className="py-2"
        flexDirection="row"
        fluid
        justifyContent="space-around"
        style={{ borderBottom: 'solid grey 1px' }}
      >
        <div>{i18n.lang}</div>
        <Link to={Route.Home}>{t(`commons.enums.route.${Route.Home}`)}</Link>
        <Link to={Route.Login}>{t(`commons.enums.route.${Route.Login}`)}</Link>
        <Link query={{ token: 'some-token-here' }} to={Route.ConfirmEmail}>
          {t(`commons.enums.route.${Route.ConfirmEmail}`)}
        </Link>
        <LangSwitch />
      </Container>
      {children}
    </>
  );
};

export default Layout1;
