import { useRouter } from 'next/router';
import { FC } from 'react';
import { t } from '../utils';

const ConfirmEmail: FC = () => {
  const { query } = useRouter();
  return (
    <>
      <div>{t()}</div>
      <pre>{JSON.stringify(query, null, 4)}</pre>
    </>
  );
};

export default ConfirmEmail;
