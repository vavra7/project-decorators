import { useRouter } from 'next/router';
import { FC } from 'react';

const ConfirmEmail: FC = () => {
  const { query } = useRouter();
  return <pre>{JSON.stringify(query, null, 4)}</pre>;
};

export default ConfirmEmail;
